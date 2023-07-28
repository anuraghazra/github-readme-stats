import {
  getByTestId,
  queryAllByTestId,
  queryByTestId,
} from "@testing-library/dom";
import { cssToObject } from "@uppercod/css-to-object";
import { renderStatsCard } from "../src/cards/stats-card.js";
import { expect, it, describe } from "@jest/globals";

// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom";

import { themes } from "../themes/index.js";

const stats = {
  name: "Anurag Hazra",
  totalStars: 100,
  totalCommits: 200,
  totalIssues: 300,
  totalPRs: 400,
  totalPRsMerged: 320,
  mergedPRsPercentage: 80,
  totalReviews: 50,
  totalDiscussionsStarted: 10,
  totalDiscussionsAnswered: 50,
  contributedTo: 500,
  rank: { level: "A+", percentile: 40 },
};

describe("Test renderStatsCard", () => {
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

    // Default hidden stats
    expect(queryByTestId(document.body, "reviews")).not.toBeInTheDocument();
    expect(
      queryByTestId(document.body, "discussions_started"),
    ).not.toBeInTheDocument();
    expect(
      queryByTestId(document.body, "discussions_answered"),
    ).not.toBeInTheDocument();
    expect(queryByTestId(document.body, "prs_merged")).not.toBeInTheDocument();
    expect(
      queryByTestId(document.body, "merged_prs_percentage"),
    ).not.toBeInTheDocument();
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
    expect(queryByTestId(document.body, "reviews")).toBeNull();
    expect(queryByTestId(document.body, "discussions_started")).toBeNull();
    expect(queryByTestId(document.body, "discussions_answered")).toBeNull();
    expect(queryByTestId(document.body, "prs_merged")).toBeNull();
    expect(queryByTestId(document.body, "merged_prs_percentage")).toBeNull();
  });

  it("should show additional stats", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      show: [
        "reviews",
        "discussions_started",
        "discussions_answered",
        "prs_merged",
        "merged_prs_percentage",
      ],
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height"),
    ).toBe("320");

    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(queryByTestId(document.body, "commits")).toBeDefined();
    expect(queryByTestId(document.body, "issues")).toBeDefined();
    expect(queryByTestId(document.body, "prs")).toBeDefined();
    expect(queryByTestId(document.body, "contribs")).toBeDefined();
    expect(queryByTestId(document.body, "reviews")).toBeDefined();
    expect(queryByTestId(document.body, "discussions_started")).toBeDefined();
    expect(queryByTestId(document.body, "discussions_answered")).toBeDefined();
    expect(queryByTestId(document.body, "prs_merged")).toBeDefined();
    expect(queryByTestId(document.body, "merged_prs_percentage")).toBeDefined();
  });

  it("should hide_rank", () => {
    document.body.innerHTML = renderStatsCard(stats, { hide_rank: true });

    expect(queryByTestId(document.body, "rank-circle")).not.toBeInTheDocument();
  });

  it("should render with custom width set", () => {
    document.body.innerHTML = renderStatsCard(stats);
    expect(document.querySelector("svg")).toHaveAttribute("width", "450");

    document.body.innerHTML = renderStatsCard(stats, { card_width: 500 });
    expect(document.querySelector("svg")).toHaveAttribute("width", "500");
  });

  it("should render with custom width set and limit minimum width", () => {
    document.body.innerHTML = renderStatsCard(stats, { card_width: 1 });
    expect(document.querySelector("svg")).toHaveAttribute("width", "420");

    // Test default minimum card width without rank circle.
    document.body.innerHTML = renderStatsCard(stats, {
      card_width: 1,
      hide_rank: true,
    });
    expect(document.querySelector("svg")).toHaveAttribute(
      "width",
      "305.81250000000006",
    );

    // Test minimum card width with rank and icons.
    document.body.innerHTML = renderStatsCard(stats, {
      card_width: 1,
      hide_rank: true,
      show_icons: true,
    });
    expect(document.querySelector("svg")).toHaveAttribute(
      "width",
      "322.81250000000006",
    );

    // Test minimum card width with icons but without rank.
    document.body.innerHTML = renderStatsCard(stats, {
      card_width: 1,
      hide_rank: false,
      show_icons: true,
    });
    expect(document.querySelector("svg")).toHaveAttribute("width", "437");

    // Test minimum card width without icons or rank.
    document.body.innerHTML = renderStatsCard(stats, {
      card_width: 1,
      hide_rank: false,
      show_icons: false,
    });
    expect(document.querySelector("svg")).toHaveAttribute("width", "420");
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderStatsCard(stats);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerClassStyles = stylesObject[":host"][".header "];
    const statClassStyles = stylesObject[":host"][".stat "];
    const iconClassStyles = stylesObject[":host"][".icon "];

    expect(headerClassStyles.fill.trim()).toBe("#2f80ed");
    expect(statClassStyles.fill.trim()).toBe("#434d58");
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

  it("should render custom ring_color properly", () => {
    const customColors = {
      title_color: "5a0",
      ring_color: "0000ff",
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
    const rankCircleStyles = stylesObject[":host"][".rank-circle "];
    const rankCircleRimStyles = stylesObject[":host"][".rank-circle-rim "];

    expect(headerClassStyles.fill.trim()).toBe(`#${customColors.title_color}`);
    expect(statClassStyles.fill.trim()).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill.trim()).toBe(`#${customColors.icon_color}`);
    expect(rankCircleStyles.stroke.trim()).toBe(`#${customColors.ring_color}`);
    expect(rankCircleRimStyles.stroke.trim()).toBe(
      `#${customColors.ring_color}`,
    );
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
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
    ).toBe("287");
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
    ).toMatchInlineSnapshot(`"累计提交数（commit） (2023):"`);
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
    ).toMatchInlineSnapshot(`"贡献于（去年）:"`);
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderStatsCard(stats, { border_radius: "0" });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderStatsCard(stats, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });

  it("should shorten values", () => {
    stats["totalCommits"] = 1999;

    document.body.innerHTML = renderStatsCard(stats);
    expect(getByTestId(document.body, "commits").textContent).toBe("2k");
    document.body.innerHTML = renderStatsCard(stats, { number_format: "long" });
    expect(getByTestId(document.body, "commits").textContent).toBe("1999");
  });

  it("should render default rank icon with level A+", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      rank_icon: "default",
    });
    expect(queryByTestId(document.body, "level-rank-icon")).toBeDefined();
    expect(
      queryByTestId(document.body, "level-rank-icon").textContent.trim(),
    ).toBe("A+");
  });

  it("should render github rank icon", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      rank_icon: "github",
    });
    expect(queryByTestId(document.body, "github-rank-icon")).toBeDefined();
  });

  it("should show the rank percentile", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      rank_icon: "percentile",
    });
    expect(queryByTestId(document.body, "percentile-top-header")).toBeDefined();
    expect(
      queryByTestId(document.body, "percentile-top-header").textContent.trim(),
    ).toBe("Top");
    expect(queryByTestId(document.body, "rank-percentile-text")).toBeDefined();
    expect(
      queryByTestId(document.body, "percentile-rank-value").textContent.trim(),
    ).toBe(stats.rank.percentile.toFixed(1) + "%");
  });
});
