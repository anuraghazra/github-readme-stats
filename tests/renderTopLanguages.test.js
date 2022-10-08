import { queryAllByTestId, queryByTestId } from "@testing-library/dom";
import { cssToObject } from "@uppercod/css-to-object";
import {
  MIN_CARD_WIDTH,
  renderTopLanguages,
} from "../src/cards/top-languages-card.js";
// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom";

import { themes } from "../themes/index.js";

describe("Test renderTopLanguages", () => {
  const langs = {
    HTML: {
      color: "#0f0",
      name: "HTML",
      size: 200,
    },
    javascript: {
      color: "#0ff",
      name: "javascript",
      size: 200,
    },
    css: {
      color: "#ff0",
      name: "css",
      size: 100,
    },
  };

  it("should render correctly", () => {
    document.body.innerHTML = renderTopLanguages(langs);

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "40%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "40%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "20%",
    );
  });

  const langs2 = {
    python: {
      color: "#f00",
      name: "python",
      size: 500,
    },
    HTML: {
      color: "#0f0",
      name: "HTML",
      size: 200,
    },
    javascript: {
      color: "#0ff",
      name: "javascript",
      size: 200,
    },
    css: {
      color: "#ff0",
      name: "css",
      size: 100,
    },
  };

  it("should merge others when langs is more than langs_count", () => {
    document.body.innerHTML = renderTopLanguages(langs2, {
      langs_count: 3,
      merge_others: true,
    });

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "python",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "HTML",
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "Others",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "50%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "20%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "30%",
    );
  });

  it("shouldn't merge others when langs is less than langs_count", () => {
    document.body.innerHTML = renderTopLanguages(langs2, {
      langs_count: 4,
      merge_others: true,
    });

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "python",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "HTML",
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[3]).toHaveTextContent(
      "css",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "50%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "20%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "20%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[3]).toHaveAttribute(
      "width",
      "10%",
    );
  });

  it("should hide languages when hide is passed", () => {
    document.body.innerHTML = renderTopLanguages(langs, {
      hide: ["HTML"],
    });
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toBeInTheDocument(
      "css",
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).not.toBeDefined();

    // multiple languages passed
    document.body.innerHTML = renderTopLanguages(langs, {
      hide: ["HTML", "css"],
    });
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).not.toBeDefined();
  });

  it("should resize the height correctly depending on langs", () => {
    document.body.innerHTML = renderTopLanguages(langs, {});
    expect(document.querySelector("svg")).toHaveAttribute("height", "205");

    document.body.innerHTML = renderTopLanguages(
      {
        ...langs,
        python: {
          color: "#ff0",
          name: "python",
          size: 100,
        },
      },
      {},
    );
    expect(document.querySelector("svg")).toHaveAttribute("height", "245");
  });

  it("should render with custom width set", () => {
    document.body.innerHTML = renderTopLanguages(langs, {});

    expect(document.querySelector("svg")).toHaveAttribute("width", "300");

    document.body.innerHTML = renderTopLanguages(langs, { card_width: 400 });
    expect(document.querySelector("svg")).toHaveAttribute("width", "400");
  });

  it("should render with min width", () => {
    document.body.innerHTML = renderTopLanguages(langs, { card_width: 190 });

    expect(document.querySelector("svg")).toHaveAttribute(
      "width",
      MIN_CARD_WIDTH.toString(),
    );

    document.body.innerHTML = renderTopLanguages(langs, { card_width: 100 });
    expect(document.querySelector("svg")).toHaveAttribute(
      "width",
      MIN_CARD_WIDTH.toString(),
    );
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderTopLanguages(langs);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".lang-name "];

    expect(headerStyles.fill.trim()).toBe("#2f80ed");
    expect(langNameStyles.fill.trim()).toBe("#434d58");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fffefe",
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderTopLanguages(langs, { ...customColors });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".lang-name "];

    expect(headerStyles.fill.trim()).toBe(`#${customColors.title_color}`);
    expect(langNameStyles.fill.trim()).toBe(`#${customColors.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderTopLanguages(langs, {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".lang-name "];

    expect(headerStyles.fill.trim()).toBe("#5a0");
    expect(langNameStyles.fill.trim()).toBe(`#${themes.radical.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderTopLanguages(langs, {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerStyles = stylesObject[":host"][".header "];
      const langNameStyles = stylesObject[":host"][".lang-name "];

      expect(headerStyles.fill.trim()).toBe(`#${themes[name].title_color}`);
      expect(langNameStyles.fill.trim()).toBe(`#${themes[name].text_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
    });
  });

  it("should render with layout compact", () => {
    document.body.innerHTML = renderTopLanguages(langs, { layout: "compact" });

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

  it("should render a translated title", () => {
    document.body.innerHTML = renderTopLanguages(langs, { locale: "cn" });
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "最常用的语言",
    );
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderTopLanguages(langs, { border_radius: "0" });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderTopLanguages(langs, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });

  it("should render langs with specified langs_count", async () => {
    const options = {
      langs_count: 1,
    };
    document.body.innerHTML = renderTopLanguages(langs, { ...options });
    expect(queryAllByTestId(document.body, "lang-name").length).toBe(
      options.langs_count,
    );
  });

  it("should render langs with specified langs_count even when hide is set", async () => {
    const options = {
      hide: ["HTML"],
      langs_count: 2,
    };
    document.body.innerHTML = renderTopLanguages(langs, { ...options });
    expect(queryAllByTestId(document.body, "lang-name").length).toBe(
      options.langs_count,
    );
  });
});
