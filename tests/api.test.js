import { jest } from "@jest/globals";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import api from "../api/index.js";
import { calculateRank } from "../src/calculateRank.js";
import { renderStatsCard } from "../src/cards/stats-card.js";
import { CONSTANTS, renderError } from "../src/common/utils.js";

const stats = {
  name: "Anurag Hazra",
  totalStars: 100,
  totalCommits: 200,
  totalIssues: 300,
  totalPRs: 400,
  contributedTo: 500,
  rank: null,
};
stats.rank = calculateRank({
  totalCommits: stats.totalCommits,
  totalRepos: 1,
  followers: 0,
  contributions: stats.contributedTo,
  stargazers: stats.totalStars,
  prs: stats.totalPRs,
  issues: stats.totalIssues,
});

const data_stats = {
  data: {
    user: {
      name: stats.name,
      repositoriesContributedTo: { totalCount: stats.contributedTo },
      contributionsCollection: {
        totalCommitContributions: stats.totalCommits,
        restrictedContributionsCount: 100,
      },
      pullRequests: { totalCount: stats.totalPRs },
      openIssues: { totalCount: stats.totalIssues },
      closedIssues: { totalCount: 0 },
      followers: { totalCount: 0 },
      repositories: {
        totalCount: 1,
        nodes: [{ stargazers: { totalCount: 100 } }],
        pageInfo: {
          hasNextPage: false,
          cursor: "cursor",
        },
      },
    },
  },
};

const error = {
  errors: [
    {
      type: "NOT_FOUND",
      path: ["user"],
      locations: [],
      message: "Could not fetch user",
    },
  ],
};

const mock = new MockAdapter(axios);

const faker = (query, data) => {
  const req = {
    query: {
      username: "anuraghazra",
      ...query,
    },
  };
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
  };
  mock.onPost("https://api.github.com/graphql").replyOnce(200, data);

  return { req, res };
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/", () => {
  it("should test the request", async () => {
    const { req, res } = faker({}, data_stats);

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderStatsCard(stats, { ...req.query }));
  });

  it("should render error card on error", async () => {
    const { req, res } = faker({}, error);

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderError(
        error.errors[0].message,
        "Make sure the provided username is not an organization",
      ),
    );
  });

  it("should get the query options", async () => {
    const { req, res } = faker(
      {
        username: "anuraghazra",
        hide: "issues,prs,contribs",
        show_icons: true,
        hide_border: true,
        line_height: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      },
      data_stats,
    );

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderStatsCard(stats, {
        hide: ["issues", "prs", "contribs"],
        show_icons: true,
        hide_border: true,
        line_height: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      }),
    );
  });

  it("should have proper cache", async () => {
    const { req, res } = faker({}, data_stats);

    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      [
        "Cache-Control",
        `max-age=${CONSTANTS.FOUR_HOURS / 2}, s-maxage=${
          CONSTANTS.FOUR_HOURS
        }, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
      ],
    ]);
  });

  it("should set proper cache", async () => {
    const { req, res } = faker({ cache_seconds: 15000 }, data_stats);
    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      [
        "Cache-Control",
        `max-age=7500, s-maxage=${15000}, stale-while-revalidate=${
          CONSTANTS.ONE_DAY
        }`,
      ],
    ]);
  });

  it("should not store cache when error", async () => {
    const { req, res } = faker({}, error);
    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      ["Cache-Control", `no-cache, no-store, must-revalidate`],
    ]);
  });

  it("should set proper cache with clamped values", async () => {
    {
      let { req, res } = faker({ cache_seconds: 200000 }, data_stats);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        [
          "Cache-Control",
          `max-age=${CONSTANTS.ONE_DAY / 2}, s-maxage=${
            CONSTANTS.ONE_DAY
          }, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
        ],
      ]);
    }

    // note i'm using block scoped vars
    {
      let { req, res } = faker({ cache_seconds: 0 }, data_stats);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        [
          "Cache-Control",
          `max-age=${CONSTANTS.FOUR_HOURS / 2}, s-maxage=${
            CONSTANTS.FOUR_HOURS
          }, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
        ],
      ]);
    }

    {
      let { req, res } = faker({ cache_seconds: -10000 }, data_stats);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        [
          "Cache-Control",
          `max-age=${CONSTANTS.FOUR_HOURS / 2}, s-maxage=${
            CONSTANTS.FOUR_HOURS
          }, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
        ],
      ]);
    }
  });

  it("should add private contributions", async () => {
    const { req, res } = faker(
      {
        username: "anuraghazra",
        count_private: true,
      },
      data_stats,
    );

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderStatsCard(
        {
          ...stats,
          totalCommits: stats.totalCommits + 100,
          rank: calculateRank({
            totalCommits: stats.totalCommits + 100,
            totalRepos: 1,
            followers: 0,
            contributions: stats.contributedTo,
            stargazers: stats.totalStars,
            prs: stats.totalPRs,
            issues: stats.totalIssues,
          }),
        },
        {},
      ),
    );
  });

  it("should allow changing ring_color", async () => {
    const { req, res } = faker(
      {
        username: "anuraghazra",
        hide: "issues,prs,contribs",
        show_icons: true,
        hide_border: true,
        line_height: 100,
        title_color: "fff",
        ring_color: "0000ff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      },
      data,
    );

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderStatsCard(stats, {
        hide: ["issues", "prs", "contribs"],
        show_icons: true,
        hide_border: true,
        line_height: 100,
        title_color: "fff",
        ring_color: "0000ff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      }),
    );
  });
});
