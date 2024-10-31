import { renderGistCard } from "../src/cards/gist-card";
import { describe, expect, it } from "@jest/globals";
import { queryByTestId } from "@testing-library/dom";
import { cssToObject } from "@uppercod/css-to-object";
import { themes } from "../themes/index.js";
import "@testing-library/jest-dom";

/**
 * @type {import("../src/fetchers/gist-fetcher").GistData}
 */
const data = {
  name: "test",
  nameWithOwner: "anuraghazra/test",
  description: "Small test repository with different Python programs.",
  language: "Python",
  starsCount: 163,
  forksCount: 19,
};

describe("test renderGistCard", () => {
  it("should render correctly", () => {
    document.body.innerHTML = renderGistCard(data);

    const [header] = document.getElementsByClassName("header");

    expect(header).toHaveTextContent("test");
    expect(header).not.toHaveTextContent("anuraghazra");
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Small test repository with different Python programs.",
    );
    expect(queryByTestId(document.body, "starsCount")).toHaveTextContent("163");
    expect(queryByTestId(document.body, "forksCount")).toHaveTextContent("19");
    expect(queryByTestId(document.body, "lang-name")).toHaveTextContent(
      "Python",
    );
    expect(queryByTestId(document.body, "lang-color")).toHaveAttribute(
      "fill",
      "#3572A5",
    );
  });

  it("should display username in title if show_owner is true", () => {
    document.body.innerHTML = renderGistCard(data, { show_owner: true });
    const [header] = document.getElementsByClassName("header");
    expect(header).toHaveTextContent("anuraghazra/test");
  });

  it("should trim header if name is too long", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      name: "some-really-long-repo-name-for-test-purposes",
    });
    const [header] = document.getElementsByClassName("header");
    expect(header).toHaveTextContent("some-really-long-repo-name-for-test...");
  });

  it("should trim description if description os too long", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      description:
        "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet",
    });
    expect(
      document.getElementsByClassName("description")[0].children[0].textContent,
    ).toBe("The quick brown fox jumps over the lazy dog is an");

    expect(
      document.getElementsByClassName("description")[0].children[1].textContent,
    ).toBe("English-language pangram—a sentence that contains all");
  });

  it("should not trim description if it is short", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      description: "Small text should not trim",
    });
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Small text should not trim",
    );
  });

  it("should render emojis in description", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      description: "This is a test gist description with :heart: emoji.",
    });
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "This is a test gist description with ❤️ emoji.",
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderGistCard(data, {
      ...customColors,
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const descClassStyles = stylesObject[":host"][".description "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe(`#${customColors.title_color}`);
    expect(descClassStyles.fill.trim()).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderGistCard(data, {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerClassStyles = stylesObject[":host"][".header "];
      const descClassStyles = stylesObject[":host"][".description "];
      const iconClassStyles = stylesObject[":host"][".icon "];

      expect(headerClassStyles.fill.trim()).toBe(
        `#${themes[name].title_color}`,
      );
      expect(descClassStyles.fill.trim()).toBe(`#${themes[name].text_color}`);
      expect(iconClassStyles.fill.trim()).toBe(`#${themes[name].icon_color}`);
      const backgroundElement = queryByTestId(document.body, "card-bg");
      const backgroundElementFill = backgroundElement.getAttribute("fill");
      expect([`#${themes[name].bg_color}`, "url(#gradient)"]).toContain(
        backgroundElementFill,
      );
    });
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderGistCard(data, {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const descClassStyles = stylesObject[":host"][".description "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe("#5a0");
    expect(descClassStyles.fill.trim()).toBe(`#${themes.radical.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render custom colors with themes and fallback to default colors if invalid", () => {
    document.body.innerHTML = renderGistCard(data, {
      title_color: "invalid color",
      text_color: "invalid color",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const descClassStyles = stylesObject[":host"][".description "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe(
      `#${themes.default.title_color}`,
    );
    expect(descClassStyles.fill.trim()).toBe(`#${themes.default.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should not render star count or fork count if either of the are zero", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      starsCount: 0,
    });

    expect(queryByTestId(document.body, "starsCount")).toBeNull();
    expect(queryByTestId(document.body, "forksCount")).toBeInTheDocument();

    document.body.innerHTML = renderGistCard({
      ...data,
      starsCount: 1,
      forksCount: 0,
    });

    expect(queryByTestId(document.body, "starsCount")).toBeInTheDocument();
    expect(queryByTestId(document.body, "forksCount")).toBeNull();

    document.body.innerHTML = renderGistCard({
      ...data,
      starsCount: 0,
      forksCount: 0,
    });

    expect(queryByTestId(document.body, "starsCount")).toBeNull();
    expect(queryByTestId(document.body, "forksCount")).toBeNull();
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderGistCard(data, {
      border_radius: "0",
    });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderGistCard(data, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });

  it("should fallback to default description", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      description: undefined,
    });
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "No description provided",
    );
  });
});
