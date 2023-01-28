import "jest-svg-snapshot";
import "@testing-library/jest-dom";
import renderStatsCard from "../../src/cards/stats-card";
import prettier from "prettier";

const STATS_DATA = {
  name: "Cateline Mnemosyne",
  totalPRs: 1,
  totalCommits: 7,
  totalIssues: 1,
  totalStars: 1,
  contributedTo: 1,
  rank: {
    level: "A+",
    score: 50.893750297869225,
  },
};

const format = (svg) => prettier.format(svg, { parser: "html" });

describe("statsCard", () => {
  it("should match default stat card", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, { disable_animations: true }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option hide", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        hide: ["commits", "stars"],
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option hide_border", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        hide_border: true,
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option hide_title", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        hide_title: true,
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option hide_rank", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        hide_rank: true,
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option theme", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        theme: "radical",
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option card_width", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        card_width: 800,
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option custom_title", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        custom_title:
          "Hello world, this is a very very very very very long title",
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
  it("option custom_title hideRank", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        hide_rank: true,
        custom_title:
          "Hello world, this is a very very very very very long title",
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });

  it("option custom_title hideRank card_width", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        card_width: 300,
        hide_rank: true,
        custom_title:
          "Hello world, this is a very very very very very long title",
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });

  it("option line_height show_icons", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        line_height: 30,
        show_icons: true,
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });

  it("option locale", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        locale: "ru",
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });

  it("option colors", () => {
    const svg = format(
      renderStatsCard(STATS_DATA, {
        disable_animations: true,
        border_color: "0044ff",
        title_color: "abd200",
        icon_color: "b7d364",
        text_color: "68b587",
        bg_color: "0a0f0b",
        show_icons: true,
      }),
    );
    expect(svg).toMatchSVGSnapshot();
  });
});
