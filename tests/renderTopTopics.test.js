require("@testing-library/jest-dom");
const cssToObject = require("css-to-object");
const renderTopTopics = require("../src/cards/top-topics-card");

const { queryByTestId, queryAllByTestId } = require("@testing-library/dom");
const themes = require("../themes");

describe("Test renderTopTopics", () => {
  const topics = {
    "javascript-library": {
      name: "javascript-library",
      count: 3,
    },
    "physics-engine": {
      name: "physics-engine",
      count: 2,
    },
    "react": {
      name: "react",
      count: 1,
    },
  };

  it("should render correctly", () => {
    document.body.innerHTML = renderTopTopics(topics);

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Topics"
    );

    expect(queryAllByTestId(document.body, "topic-name")[0]).toHaveTextContent(
      "javascript-library"
    );
    expect(queryAllByTestId(document.body, "topic-name")[1]).toHaveTextContent(
      "physics-engine"
    );
    expect(queryAllByTestId(document.body, "topic-name")[2]).toHaveTextContent(
      "react"
    );
    expect(queryAllByTestId(document.body, "topic-progress")[0]).toHaveAttribute(
      "width",
      "50%"
    );
    expect(queryAllByTestId(document.body, "topic-progress")[1]).toHaveAttribute(
      "width",
      "33.33%"
    );
    expect(queryAllByTestId(document.body, "topic-progress")[2]).toHaveAttribute(
      "width",
      "16.67%"
    );
  });

  it("should hide topics when hide is passed", () => {
    document.body.innerHTML = renderTopTopics(topics, {
      hide: ["javascript-library"],
    });
    expect(queryAllByTestId(document.body, "topic-name")[0]).toBeInTheDocument(
      "physics-engine"
    );
    expect(queryAllByTestId(document.body, "topic-name")[1]).toBeInTheDocument(
      "react"
    );
    expect(queryAllByTestId(document.body, "topic-name")[2]).not.toBeDefined();

    // multiple topics passed
    document.body.innerHTML = renderTopTopics(topics, {
      hide: ["javascript-library", "physics-engine"],
    });
    expect(queryAllByTestId(document.body, "topic-name")[0]).toBeInTheDocument(
      "react"
    );
    expect(queryAllByTestId(document.body, "topic-name")[1]).not.toBeDefined();
  });

  it("should resize the height correctly depending on topics", () => {
    document.body.innerHTML = renderTopTopics(topics, {});
    expect(document.querySelector("svg")).toHaveAttribute("height", "205");

    document.body.innerHTML = renderTopTopics(
      {
        ...topics,
        python: {
          color: "#ff0",
          name: "python",
          size: 100,
        },
      },
      {}
    );
    expect(document.querySelector("svg")).toHaveAttribute("height", "245");
  });

  it("should render with custom width set", () => {
    document.body.innerHTML = renderTopTopics(topics, {});

    expect(document.querySelector("svg")).toHaveAttribute("width", "300");

    document.body.innerHTML = renderTopTopics(topics, { card_width: 400 });
    expect(document.querySelector("svg")).toHaveAttribute("width", "400");
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderTopTopics(topics);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerStyles = stylesObject[".header"];
    const topicNameStyles = stylesObject[".topic-name"];

    expect(headerStyles.fill).toBe("#2f80ed");
    expect(topicNameStyles.fill).toBe("#333");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fffefe"
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderTopTopics(topics, { ...customColors });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[".header"];
    const topicNameStyles = stylesObject[".topic-name"];

    expect(headerStyles.fill).toBe(`#${customColors.title_color}`);
    expect(topicNameStyles.fill).toBe(`#${customColors.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525"
    );
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderTopTopics(topics, {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[".header"];
    const topicNameStyles = stylesObject[".topic-name"];

    expect(headerStyles.fill).toBe("#5a0");
    expect(topicNameStyles.fill).toBe(`#${themes.radical.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderTopTopics(topics, {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerStyles = stylesObject[".header"];
      const topicNameStyles = stylesObject[".topic-name"];

      expect(headerStyles.fill).toBe(`#${themes[name].title_color}`);
      expect(topicNameStyles.fill).toBe(`#${themes[name].text_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`
      );
    });
  });

  it("should render with layout compact", () => {
    document.body.innerHTML = renderTopTopics(topics, { layout: "compact" });

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Topics"
    );

    expect(queryAllByTestId(document.body, "topic-name")[0]).toHaveTextContent(
      "javascript-library 50.00%"
    );
    expect(queryAllByTestId(document.body, "topic-progress")[0]).toHaveAttribute(
      "width",
      "150.00"
    );

    expect(queryAllByTestId(document.body, "topic-name")[1]).toHaveTextContent(
      "physics-engine 33.33%"
    );
    expect(queryAllByTestId(document.body, "topic-progress")[1]).toHaveAttribute(
      "width",
      "100.00"
    );

    expect(queryAllByTestId(document.body, "topic-name")[2]).toHaveTextContent(
      "react 16.67%"
    );
    expect(queryAllByTestId(document.body, "topic-progress")[2]).toHaveAttribute(
      "width",
      "50.00"
    );
  });
});
