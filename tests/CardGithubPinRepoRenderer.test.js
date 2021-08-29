import "@testing-library/jest-dom";
import cssToObject from "css-to-object";
import GithubPinRepoCard from "../src/cards/gituhb-pin-repo";

import { queryByTestId } from "@testing-library/dom";
import themes from "../themes";
import {
  mockVercel,
  mockGithubRequest,
  genGithubPinRepoMockData,
} from "./utils/mock";

describe("GithubPinRepoRenderer", () => {
  async function render({ query = {}, statsHandler = (data) => data } = {}) {
    const { req, res } = mockVercel({
      repo: "convoychat",
      ...query,
    });
    const mockData = genGithubPinRepoMockData();
    const mockRestore = mockGithubRequest(statsHandler(mockData));

    const card = new GithubPinRepoCard(req.query);
    const svgString = await card.generateSvgString(res.setHeader);
    document.body.innerHTML = svgString;
    mockRestore();
  }

  it("should render pin repo card", async () => {
    await render();
    const [header] = document.getElementsByClassName("header");

    expect(header).toHaveTextContent("convoychat");
    expect(header).not.toHaveTextContent("anuraghazra");
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Help us take over the world! React + TS + GraphQL Chat App",
    );
    expect(queryByTestId(document.body, "stargazers")).toHaveTextContent("38k");
    expect(queryByTestId(document.body, "forkcount")).toHaveTextContent("100");
    expect(queryByTestId(document.body, "lang-name")).toHaveTextContent(
      "TypeScript",
    );
    expect(queryByTestId(document.body, "lang-color")).toHaveAttribute(
      "fill",
      "#2b7489",
    );
  });

  it("should display username in title (full repo name)", async () => {
    await render({
      query: { show_owner: "true" },
    });
    expect(document.getElementsByClassName("header")[0]).toHaveTextContent(
      "anuraghazra/convoychat",
    );
  });

  it("should trim description", async () => {
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          description:
            "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet",
        });
        return stats;
      },
    });

    expect(
      document.getElementsByClassName("description")[0].children[0].textContent,
    ).toBe("The quick brown fox jumps over the lazy dog is an");

    expect(
      document.getElementsByClassName("description")[0].children[1].textContent,
    ).toBe("English-language pangram—a sentence that contains all");

    // Should not trim
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          description: "Small text should not trim",
        });
        return stats;
      },
    });
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Small text should not trim",
    );
  });

  it("should render emojis", async () => {
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          description: "This is a text with a :poop: poo emoji",
        });
        return stats;
      },
    });

    // poop emoji may not show in all editors but it's there between "a" and "poo"
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "This is a text with a 💩 poo emoji",
    );
  });

  it("should shift the text position depending on language length", async () => {
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          primaryLanguage: {
            ...stats.data.user.repository.primaryLanguage,
            name: "Jupyter Notebook",
          },
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "primary-lang")).toBeInTheDocument();
    expect(queryByTestId(document.body, "star-fork-group")).toHaveAttribute(
      "transform",
      "translate(155, 0)",
    );

    // Small lang
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          primaryLanguage: {
            ...stats.data.user.repository.primaryLanguage,
            name: "Ruby",
          },
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "star-fork-group")).toHaveAttribute(
      "transform",
      "translate(125, 0)",
    );
  });

  it("should hide language if primaryLanguage is null & fallback to correct values", async () => {
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          primaryLanguage: null,
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "primary-lang")).toBeNull();

    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          primaryLanguage: { color: null, name: null },
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "primary-lang")).toBeInTheDocument();
    expect(queryByTestId(document.body, "lang-color")).toHaveAttribute(
      "fill",
      "#333",
    );

    expect(queryByTestId(document.body, "lang-name")).toHaveTextContent(
      "Unspecified",
    );
  });

  it("should render default colors properly", async () => {
    await render();

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe("#2f80ed");
    expect(descClassStyles.fill).toBe("#333");
    expect(iconClassStyles.fill).toBe("#586069");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fffefe",
    );
  });

  it("should render custom colors properly", async () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    await render({
      query: customColors,
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe(`#${customColors.title_color}`);
    expect(descClassStyles.fill).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
  });

  it("should render with all the themes", async () => {
    const fns = Object.keys(themes).map((name) => async () => {
      await render({
        query: {
          theme: name,
        },
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerClassStyles = stylesObject[".header"];
      const descClassStyles = stylesObject[".description"];
      const iconClassStyles = stylesObject[".icon"];

      expect(headerClassStyles.fill).toBe(`#${themes[name].title_color}`);
      expect(descClassStyles.fill).toBe(`#${themes[name].text_color}`);
      expect(iconClassStyles.fill).toBe(`#${themes[name].icon_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
    });

    for (const fn of fns) {
      await fn();
    }
  });

  it("should render custom colors with themes", async () => {
    await render({
      query: {
        title_color: "5a0",
        theme: "radical",
      },
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe("#5a0");
    expect(descClassStyles.fill).toBe(`#${themes.radical.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render custom colors with themes and fallback to default colors if invalid", async () => {
    await render({
      query: {
        title_color: "invalid color",
        text_color: "invalid color",
        theme: "radical",
      },
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe(`#${themes.default.title_color}`);
    expect(descClassStyles.fill).toBe(`#${themes.default.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should not render star count or fork count if either of the are zero", async () => {
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          stargazers: { totalCount: 0 },
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "stargazers")).toBeNull();
    expect(queryByTestId(document.body, "forkcount")).toBeInTheDocument();

    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          stargazers: { totalCount: 1 },
          forkCount: 0,
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "stargazers")).toBeInTheDocument();
    expect(queryByTestId(document.body, "forkcount")).toBeNull();

    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          stargazers: { totalCount: 0 },
          forkCount: 0,
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "stargazers")).toBeNull();
    expect(queryByTestId(document.body, "forkcount")).toBeNull();
  });

  it("should render badges", async () => {
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          isArchived: true,
        });
        return stats;
      },
    });

    expect(queryByTestId(document.body, "badge")).toHaveTextContent("Archived");

    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          isTemplate: true,
        });
        return stats;
      },
    });
    expect(queryByTestId(document.body, "badge")).toHaveTextContent("Template");
  });

  it("should not render template", async () => {
    await render();
    expect(queryByTestId(document.body, "badge")).toBeNull();
  });

  it("should render translated badges", async () => {
    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          isArchived: true,
        });
        return stats;
      },
      query: {
        locale: "cn",
      },
    });

    expect(queryByTestId(document.body, "badge")).toHaveTextContent("已归档");

    await render({
      statsHandler: (stats) => {
        Object.assign(stats.data.user.repository, {
          isTemplate: true,
        });
        return stats;
      },
      query: {
        locale: "cn",
      },
    });
    expect(queryByTestId(document.body, "badge")).toHaveTextContent("模板");
  });

  it("should render without rounding", async () => {
    await render({
      query: {
        border_radius: "0",
      },
    });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    await render();
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });
});
