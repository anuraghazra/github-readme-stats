import "@testing-library/jest-dom";
import renderToString from "preact-render-to-string";
import cssToObject from "css-to-object";
import topLangs from "../../src/components/topLangs";

import { queryByTestId, queryAllByTestId } from "@testing-library/dom";
import themes from "../../themes";

describe("Test topLangs", () => {
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
    document.body.innerHTML = renderToString(topLangs(langs));

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Top Languages"
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML"
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript"
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css"
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "40%"
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "40%"
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "20%"
    );
  });

  it("should hide languages when hide is passed", () => {
    document.body.innerHTML = renderToString(
      topLangs(langs, {
        hide: ["HTML"],
      })
    );
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript"
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toBeInTheDocument(
      "css"
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).not.toBeDefined();

    // multiple languages passed
    document.body.innerHTML = renderToString(
      topLangs(langs, {
        hide: ["HTML", "css"],
      })
    );
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript"
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).not.toBeDefined();
  });

  it("should resize the height correctly depending on langs", () => {
    document.body.innerHTML = renderToString(topLangs(langs, {}));
    expect(document.querySelector("svg")).toHaveAttribute("height", "205");

    document.body.innerHTML = renderToString(
      topLangs(
        {
          ...langs,
          python: {
            color: "#ff0",
            name: "python",
            size: 100,
          },
        },
        {}
      )
    );
    expect(document.querySelector("svg")).toHaveAttribute("height", "245");
  });

  it("should hide_title", () => {
    document.body.innerHTML = renderToString(
      topLangs(langs, { hide_title: false })
    );
    expect(document.querySelector("svg")).toHaveAttribute("height", "205");
    expect(queryByTestId(document.body, "lang-items")).toHaveAttribute(
      "y",
      "55"
    );

    // Lets hide now
    document.body.innerHTML = renderToString(
      topLangs(langs, { hide_title: true })
    );
    expect(document.querySelector("svg")).toHaveAttribute("height", "175");

    expect(queryByTestId(document.body, "header")).not.toBeInTheDocument();
    expect(queryByTestId(document.body, "lang-items")).toHaveAttribute(
      "y",
      "25"
    );
  });

  it("should render with custom width set", () => {
    document.body.innerHTML = renderToString(topLangs(langs, {}));

    expect(document.querySelector("svg")).toHaveAttribute("width", "300");

    document.body.innerHTML = renderToString(
      topLangs(langs, { card_width: 400 })
    );
    expect(document.querySelector("svg")).toHaveAttribute("width", "400");
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderToString(topLangs(langs));

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerStyles = stylesObject[".header"];
    const langNameStyles = stylesObject[".lang-name"];

    expect(headerStyles.fill).toBe("#2f80ed");
    expect(langNameStyles.fill).toBe("#333");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#FFFEFE"
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderToString(
      topLangs(langs, { ...customColors })
    );

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[".header"];
    const langNameStyles = stylesObject[".lang-name"];

    expect(headerStyles.fill).toBe(`#${customColors.title_color}`);
    expect(langNameStyles.fill).toBe(`#${customColors.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525"
    );
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderToString(
      topLangs(langs, {
        title_color: "5a0",
        theme: "radical",
      })
    );

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[".header"];
    const langNameStyles = stylesObject[".lang-name"];

    expect(headerStyles.fill).toBe("#5a0");
    expect(langNameStyles.fill).toBe(`#${themes.radical.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderToString(
        topLangs(langs, {
          theme: name,
        })
      );

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerStyles = stylesObject[".header"];
      const langNameStyles = stylesObject[".lang-name"];

      expect(headerStyles.fill).toBe(`#${themes[name].title_color}`);
      expect(langNameStyles.fill).toBe(`#${themes[name].text_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`
      );
    });
  });
});
