import "@testing-library/jest-dom";
import cssToObject from "css-to-object";

import { queryByTestId, queryAllByTestId } from "@testing-library/dom";
import {
  genGithubTopLangsMockData,
  mockGithubRequest,
  mockVercel,
} from "./utils/mock";
import GithubTopLangs from "../src/cards/github-top-langs";
import themes from "../themes";

describe("GitHubTopLangsRenderer", () => {
  async function render({ query = {}, statsHandler = (data) => data } = {}) {
    const { req, res } = mockVercel({
      repo: "convoychat",
      ...query,
    });
    const mockData = genGithubTopLangsMockData();
    const mockRestore = mockGithubRequest(statsHandler(mockData));

    const card = new GithubTopLangs(req.query);
    const svgString = await card.generateSvgString(res.setHeader);
    document.body.innerHTML = svgString;
    mockRestore();
  }

  it("should render correctly", async () => {
    await render();
    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    const langNames = queryAllByTestId(document.body, "lang-name");

    expect(langNames[0]).toHaveTextContent("HTML");
    expect(langNames[1]).toHaveTextContent("javascript");
    expect(langNames[2]).toHaveTextContent("css");
    expect(queryByTestId(langNames[0], "progress")).toHaveAttribute(
      "width",
      "40%",
    );
    expect(queryByTestId(langNames[1], "progress")).toHaveAttribute(
      "width",
      "40%",
    );
    expect(queryByTestId(langNames[2], "progress")).toHaveAttribute(
      "width",
      "20%",
    );
  });

  it("should hide languages when hide is passed", async () => {
    await render({
      query: {
        hide: ["HTML"],
      },
    });
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toBeInTheDocument(
      "css",
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).not.toBeDefined();

    // multiple languages passed
    await render({
      query: {
        hide: ["HTML", "css"],
      },
    });
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).not.toBeDefined();
  });

  it("should resize the height correctly depending on langs", async () => {
    await render();
    expect(document.querySelector("svg")).toHaveAttribute("height", "205");

    await render({
      statsHandler(stats) {
        stats.data.user.repositories.nodes.push({
          languages: {
            edges: [{ size: 100, node: { color: "#ff0", name: "python" } }],
          },
        });
        return stats;
      },
    });

    expect(document.querySelector("svg")).toHaveAttribute("height", "245");
  });

  it("should render with custom width set", async () => {
    await render();

    expect(document.querySelector("svg")).toHaveAttribute("width", "300");
    await render({
      query: {
        card_width: 400,
      },
    });

    expect(document.querySelector("svg")).toHaveAttribute("width", "400");
  });

  it("should render default colors properly", async () => {
    await render();
    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const primaryFill = stylesObject[".primary-fill"];
    const textFill = stylesObject[".text-fill"];

    expect(primaryFill.fill).toBe("#2f80ed");
    expect(textFill.fill).toBe("#333");
    expect(
      queryByTestId(document.body, "header").classList.contains("primary-fill"),
    ).toBe(true);
    expect(
      queryAllByTestId(document.body, "lang-name")[0].classList.contains(
        "text-fill",
      ),
    ).toBe(true);
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

    const primaryFill = stylesObject[".primary-fill"];
    const textFill = stylesObject[".text-fill"];

    expect(primaryFill.fill).toBe(`#${customColors.title_color}`);
    expect(textFill.fill).toBe(`#${customColors.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
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

    const primaryFill = stylesObject[".primary-fill"];
    const textFill = stylesObject[".text-fill"];

    expect(primaryFill.fill).toBe("#5a0");
    expect(textFill.fill).toBe(`#${themes.radical.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
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

      const primaryFill = stylesObject[".primary-fill"];
      const textFill = stylesObject[".text-fill"];

      expect(primaryFill.fill).toBe(`#${themes[name].title_color}`);
      expect(textFill.fill).toBe(`#${themes[name].text_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
    });

    for (const fn of fns) {
      await fn();
    }
  });

  it("should render with layout compact", async () => {
    await render({
      query: {
        layout: "compact",
      },
    });

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "120",
    );

    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "120",
    );

    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css 20.00%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "60",
    );
  });

  it("should render a translated title", async () => {
    await render({
      query: {
        locale: "cn",
      },
    });
    expect(queryByTestId(document.body, "header").textContent).toBe(
      "最常用的语言",
    );
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

  it("should render langs with specified langs_count", async () => {
    await render({
      query: {
        langs_count: "1",
      },
    });
    expect(queryAllByTestId(document.body, "lang-name").length).toBe(1);
  });

  it("should render langs with specified langs_count even when hide is set", async () => {
    await render({
      query: {
        hide: ["HTML"],
        langs_count: "2",
      },
    });
    expect(queryAllByTestId(document.body, "lang-name").length).toBe(2);
  });
});
