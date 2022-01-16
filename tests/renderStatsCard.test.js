require("@testing-library/jest-dom");
const cssToObject = require("@uppercod/css-to-object").cssToObject;
const renderStatsCard = require("../src/cards/stats-card");

const {
  getByTestId,
  queryByTestId,
  queryAllByTestId,
} = require("@testing-library/dom");
const themes = require("../themes");

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
      "Anurag Hazra's GitHub Stats",
    );

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height"),
    ).toBe("195");
    expect(getByTestId(document.body, "stars").textContent).toBe("100");
    expect(getByTestId(document.body, "commits").textContent).toBe("200");
    expect(getByTestId(document.body, "issues").textContent).toBe("300");
    expect(getByTestId(document.body, "prs").textContent).toBe("400");
    expect(getByTestId(document.body, "contribs").textContent).toBe("500");
    expect(queryByTestId(document.body, "card-bg")).toBeInTheDocument();
    expect(queryByTestId(document.body, "rank-circle")).toBeInTheDocument();
  });

  it("should have proper name apostrophe", () => {
    document.body.innerHTML = renderStatsCard({ ...stats, name: "Anil Das" });

    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Anil Das' GitHub Stats",
    );

    document.body.innerHTML = renderStatsCard({ ...stats, name: "Felix" });

    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Felix' GitHub Stats",
    );
  });

  it("should hide individual stats", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide: ["issues", "prs", "contribs"],
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height"),
    ).toBe("150"); // height should be 150 because we clamped it.

    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(queryByTestId(document.body, "commits")).toBeDefined();
    expect(queryByTestId(document.body, "issues")).toBeNull();
    expect(queryByTestId(document.body, "prs")).toBeNull();
    expect(queryByTestId(document.body, "contribs")).toBeNull();
  });

  it("should hide_rank", () => {
    document.body.innerHTML = renderStatsCard(stats, { hide_rank: true });

    expect(queryByTestId(document.body, "rank-circle")).not.toBeInTheDocument();
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderStatsCard(stats);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe("#2f80ed");
    expect(statClassStyles.fill.trim()).toBe("#333");
    expect(iconClassStyles.fill.trim()).toBe("#4c71f2");
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

    document.body.innerHTML = renderStatsCard(stats, { ...customColors });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe(`#${customColors.title_color}`);
    expect(statClassStyles.fill.trim()).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe("#5a0");
    expect(statClassStyles.fill.trim()).toBe(`#${themes.radical.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderStatsCard(stats, {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerClassStyles = stylesObject[":host"][".header "];
      const statClassStyles = stylesObject[":host"][".stat "];
      const iconClassStyles = stylesObject[":host"][".icon "];

      expect(headerClassStyles.fill.trim()).toBe(
        `#${themes[name].title_color}`,
      );
      expect(statClassStyles.fill.trim()).toBe(`#${themes[name].text_color}`);
      expect(iconClassStyles.fill.trim()).toBe(`#${themes[name].icon_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
    });
  });

  it("should render custom colors with themes and fallback to default colors if invalid", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      title_color: "invalid color",
      text_color: "invalid color",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe(
      `#${themes.default.title_color}`,
    );
    expect(statClassStyles.fill.trim()).toBe(`#${themes.default.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render icons correctly", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      show_icons: true,
    });

    expect(queryAllByTestId(document.body, "icon")[0]).toBeDefined();
    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(
      queryByTestId(document.body, "stars").previousElementSibling, // the label
    ).toHaveAttribute("x", "25");
  });

  it("should not have icons if show_icons is false", () => {
    document.body.innerHTML = renderStatsCard(stats, { show_icons: false });

    expect(queryAllByTestId(document.body, "icon")[0]).not.toBeDefined();
    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(
      queryByTestId(document.body, "stars").previousElementSibling, // the label
    ).not.toHaveAttribute("x");
  });

  it("should auto resize if hide_rank is true", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide_rank: true,
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("width"),
    ).toBe("305.81250000000006");
  });

  it("should auto resize if hide_rank is true & custom_title is set", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide_rank: true,
      custom_title: "Hello world",
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("width"),
    ).toBe("270");
  });

  it("should render translations", () => {
    document.body.innerHTML = renderStatsCard(stats, { locale: "cn" });
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Anurag Hazra 的 GitHub 统计数据",
    );
    expect(
      document.querySelector(
        'g[transform="translate(0, 0)"]>.stagger>.stat.bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"获标星数（star）:"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 25)"]>.stagger>.stat.bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"累计提交数（commit） (${new Date().getFullYear()}):"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 50)"]>.stagger>.stat.bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"拉取请求数（PR）:"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 75)"]>.stagger>.stat.bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"指出问题数（issue）:"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 100)"]>.stagger>.stat.bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"参与项目数:"`);
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderStatsCard(stats, { border_radius: "0" });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderStatsCard(stats, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });
});
