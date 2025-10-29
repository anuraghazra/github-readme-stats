// @ts-check

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import api from "../api/index.js";
import { calculateRank } from "../src/calculateRank.js";
import { renderStatsCard } from "../src/cards/stats.js";
import { renderError } from "../src/common/render.js";
import { CACHE_TTL, DURATIONS } from "../src/common/cache.js";

/**
 * @type {import("../src/fetchers/stats").StatsData}
 */
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
  totalDiscussionsAnswered: 40,
  contributedTo: 50,
  rank: { level: "DEV", percentile: 0 },
};

stats.rank = calculateRank({
  all_commits: false,
  commits: stats.totalCommits,
  prs: stats.totalPRs,
  reviews: stats.totalReviews,
  issues: stats.totalIssues,
  repos: 1,
  stars: stats.totalStars,
  followers: 0,
});

const data_stats = {
  data: {
    user: {
      name: stats.name,
      repositoriesContributedTo: { totalCount: stats.contributedTo },
      commits: {
        totalCommitContributions: stats.totalCommits,
      },
      reviews: {
        totalPullRequestReviewContributions: stats.totalReviews,
      },
      pullRequests: { totalCount: stats.totalPRs },
      mergedPullRequests: { totalCount: stats.totalPRsMerged },
      openIssues: { totalCount: stats.totalIssues },
      closedIssues: { totalCount: 0 },
      followers: { totalCount: 0 },
      repositoryDiscussions: { totalCount: stats.totalDiscussionsStarted },
      repositoryDiscussionComments: {
        totalCount: stats.totalDiscussionsAnswered,
      },
      repositories: {
        totalCount: 1,
        nodes: [{ stargazers: { totalCount: 100 } }],
        pageInfo: {
          hasNextPage: false,
          endCursor: "cursor",
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

// @ts-ignore
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

beforeEach(() => {
  process.env.CACHE_SECONDS = undefined;
});

afterEach(() => {
  mock.reset();
});

describe("Test /api/", () => {
  it("should test the request", async () => {
    const { req, res } = faker({}, data_stats);

    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
      renderStatsCard(stats, { ...req.query }),
    );
  });

  it("should render error card on error", async () => {
    const { req, res } = faker({}, error);

    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
      renderError({
        message: error.errors[0].message,
        secondaryMessage:
          "Make sure the provided username is not an organization",
      }),
    );
  });

  it("should render error card in same theme as requested card", async () => {
    const { req, res } = faker({ theme: "merko" }, error);

    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
      renderError({
        message: error.errors[0].message,
        secondaryMessage:
          "Make sure the provided username is not an organization",
        renderOptions: { theme: "merko" },
      }),
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

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
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
        `max-age=${CACHE_TTL.STATS_CARD.DEFAULT}, ` +
          `s-maxage=${CACHE_TTL.STATS_CARD.DEFAULT}, ` +
          `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
      ],
    ]);
  });

  it("should set proper cache", async () => {
    const cache_seconds = DURATIONS.TWELVE_HOURS;
    const { req, res } = faker({ cache_seconds }, data_stats);
    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      [
        "Cache-Control",
        `max-age=${cache_seconds}, ` +
          `s-maxage=${cache_seconds}, ` +
          `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
      ],
    ]);
  });

  it("should set shorter cache when error", async () => {
    const { req, res } = faker({}, error);
    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      [
        "Cache-Control",
        `max-age=${CACHE_TTL.ERROR}, ` +
          `s-maxage=${CACHE_TTL.ERROR}, ` +
          `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
      ],
    ]);
  });

  it("should properly set cache using CACHE_SECONDS env variable", async () => {
    const cacheSeconds = "10000";
    process.env.CACHE_SECONDS = cacheSeconds;

    const { req, res } = faker({}, data_stats);
    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      [
        "Cache-Control",
        `max-age=${cacheSeconds}, ` +
          `s-maxage=${cacheSeconds}, ` +
          `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
      ],
    ]);
  });

  it("should disable cache when CACHE_SECONDS is set to 0", async () => {
    process.env.CACHE_SECONDS = "0";

    const { req, res } = faker({}, data_stats);
    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      [
        "Cache-Control",
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      ],
      ["Pragma", "no-cache"],
      ["Expires", "0"],
    ]);
  });

  it("should set proper cache with clamped values", async () => {
    {
      let { req, res } = faker({ cache_seconds: 200_000 }, data_stats);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        [
          "Cache-Control",
          `max-age=${CACHE_TTL.STATS_CARD.MAX}, ` +
            `s-maxage=${CACHE_TTL.STATS_CARD.MAX}, ` +
            `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
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
          `max-age=${CACHE_TTL.STATS_CARD.MIN}, ` +
            `s-maxage=${CACHE_TTL.STATS_CARD.MIN}, ` +
            `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
        ],
      ]);
    }

    {
      let { req, res } = faker({ cache_seconds: -10_000 }, data_stats);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        [
          "Cache-Control",
          `max-age=${CACHE_TTL.STATS_CARD.MIN}, ` +
            `s-maxage=${CACHE_TTL.STATS_CARD.MIN}, ` +
            `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
        ],
      ]);
    }
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
      data_stats,
    );

    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
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

  it("should render error card if username in blacklist", async () => {
    const { req, res } = faker({ username: "renovate-bot" }, data_stats);

    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
      renderError({
        message: "This username is blacklisted",
        secondaryMessage: "Please deploy your own instance",
        renderOptions: { show_repo_link: false },
      }),
    );
  });

  it("should render error card when wrong locale is provided", async () => {
    const { req, res } = faker({ locale: "asdf" }, data_stats);

    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
      renderError({
        message: "Something went wrong",
        secondaryMessage: "Language not found",
      }),
    );
  });

  it("should render error card when include_all_commits true and upstream API fails", async () => {
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { error: "Some test error message" });

    const { req, res } = faker(
      { username: "anuraghazra", include_all_commits: true },
      data_stats,
    );

    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toHaveBeenCalledWith(
      renderError({
        message: "Could not fetch total commits.",
        secondaryMessage: "Please try again later",
      }),
    );
    // Received SVG output should not contain string "https://tiny.one/readme-stats"
    expect(res.send.mock.calls[0][0]).not.toContain(
      "https://tiny.one/readme-stats",
    );
  });
});
