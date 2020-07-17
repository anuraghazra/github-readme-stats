require("@testing-library/jest-dom");
const cssToObject = require("css-to-object");
const renderStatsCard = require("../src/renderStatsCard");

const {
  getByTestId,
  queryByTestId,
  queryAllByTestId,
} = require("@testing-library/dom");

describe("Test renderStatsCard", () => {
  const stats = {
    name: "Anurag Hazra",
    totalStars: 100,
    totalCommits: 200,
    totalIssues: 300,
    totalPRs: 400,
    contributedTo: 500,
    rank: { level: "A+", score: 40 },
  };

  it("should render correctly", () => {
    document.body.innerHTML = renderStatsCard(stats);

    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Anurag Hazra's GitHub Stats"
    );

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height")
    ).toBe("195");
    expect(getByTestId(document.body, "stars").textContent).toBe("100");
    expect(getByTestId(document.body, "commits").textContent).toBe("200");
    expect(getByTestId(document.body, "issues").textContent).toBe("300");
    expect(getByTestId(document.body, "prs").textContent).toBe("400");
    expect(getByTestId(document.body, "contribs").textContent).toBe("500");
    expect(queryByTestId(document.body, "card-border")).toBeInTheDocument();
    expect(queryByTestId(document.body, "rank-circle")).toBeInTheDocument();
  });

  it("should hide individual stats", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide: "['issues', 'prs', 'contribs']",
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height")
    ).toBe("150"); // height should be 150 because we clamped it.

    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(queryByTestId(document.body, "commits")).toBeDefined();
    expect(queryByTestId(document.body, "issues")).toBeNull();
    expect(queryByTestId(document.body, "prs")).toBeNull();
    expect(queryByTestId(document.body, "contribs")).toBeNull();
  });

  it("should hide_border", () => {
    document.body.innerHTML = renderStatsCard(stats, { hide_border: true });

    expect(queryByTestId(document.body, "card-border")).not.toBeInTheDocument();
  });

  it("should hide_rank", () => {
    document.body.innerHTML = renderStatsCard(stats, { hide_rank: true });

    expect(queryByTestId(document.body, "rank-circle")).not.toBeInTheDocument();
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderStatsCard(stats);

    const styleTag = document.querySelector("style");
    console.log(styleTag.textContent);
    const stylesObject = cssToObject(styleTag.textContent);

    const headerClassStyles = stylesObject[".header"];
    const statClassStyles = stylesObject[".stat"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe("#2f80ed");
    expect(statClassStyles.fill).toBe("#333");
    expect(iconClassStyles.fill).toBe("#4c71f2");
    expect(queryByTestId(document.body, "card-border")).toHaveAttribute(
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

    document.body.innerHTML = renderStatsCard(stats, { ...customColors });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const statClassStyles = stylesObject[".stat"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe(`#${customColors.title_color}`);
    expect(statClassStyles.fill).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-border")).toHaveAttribute(
      "fill",
      "#252525"
    );
  });

  it("should hide the title", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide_title: true,
    });

    expect(document.getElementsByClassName("header")[0]).toBeUndefined();
    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "165"
    );
    expect(queryByTestId(document.body, "card-body-content")).toHaveAttribute(
      "transform",
      "translate(0, -30)"
    );
  });

  it("should not hide the title", () => {
    document.body.innerHTML = renderStatsCard(stats, {});

    expect(document.getElementsByClassName("header")[0]).toBeDefined();
    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "195"
    );
    expect(queryByTestId(document.body, "card-body-content")).toHaveAttribute(
      "transform",
      "translate(0, 0)"
    );
  });

  it("should render icons correctly", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      show_icons: true,
    });

    expect(queryAllByTestId(document.body, "icon")[0]).toBeDefined();
    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(
      queryByTestId(document.body, "stars").previousElementSibling // the label
    ).toHaveAttribute("x", "25");
  });

  it("should not have icons if show_icons is false", () => {
    document.body.innerHTML = renderStatsCard(stats, { show_icons: false });

    console.log(queryAllByTestId(document.body, "icon"));
    expect(queryAllByTestId(document.body, "icon")[0]).not.toBeDefined();
    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(
      queryByTestId(document.body, "stars").previousElementSibling // the label
    ).not.toHaveAttribute("x");
  });
});
