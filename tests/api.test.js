require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const api = require("../api/index");
const renderStatsCard = require("../src/cards/stats-card");
const { renderError, CONSTANTS } = require("../src/common/utils");
const calculateRank = require("../src/calculateRank");

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

const data = {
  data: {
    user: {
      name: stats.name,
      repositoriesContributedTo: { totalCount: stats.contributedTo },
      contributionsCollection: {
        totalCommitContributions: stats.totalCommits,
        restrictedContributionsCount: 100,
      },
      pullRequests: { totalCount: stats.totalPRs },
      issues: { totalCount: stats.totalIssues },
      followers: { totalCount: 0 },
      repositories: {
        totalCount: 1,
        nodes: [{ stargazers: { totalCount: 100 } }],
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
  mock.onPost("https://api.github.com/graphql").reply(200, data);

  return { req, res };
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/", () => {
  it("should test the request", async () => {
    const { req, res } = faker({}, data);

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
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      }),
    );
  });

  it("should have proper cache", async () => {
    const { req, res } = faker({}, data);
    mock.onPost("https://api.github.com/graphql").reply(200, data);

    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      ["Cache-Control", `public, max-age=${CONSTANTS.TWO_HOURS}`],
    ]);
  });

  it("should set proper cache", async () => {
    const { req, res } = faker({ cache_seconds: 8000 }, data);
    await api(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "image/svg+xml"],
      ["Cache-Control", `public, max-age=${8000}`],
    ]);
  });

  it("should set proper cache with clamped values", async () => {
    {
      let { req, res } = faker({ cache_seconds: 200000 }, data);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        ["Cache-Control", `public, max-age=${CONSTANTS.ONE_DAY}`],
      ]);
    }

    // note i'm using block scoped vars
    {
      let { req, res } = faker({ cache_seconds: 0 }, data);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        ["Cache-Control", `public, max-age=${CONSTANTS.TWO_HOURS}`],
      ]);
    }

    {
      let { req, res } = faker({ cache_seconds: -10000 }, data);
      await api(req, res);

      expect(res.setHeader.mock.calls).toEqual([
        ["Content-Type", "image/svg+xml"],
        ["Cache-Control", `public, max-age=${CONSTANTS.TWO_HOURS}`],
      ]);
    }
  });

  it("should add private contributions", async () => {
    const { req, res } = faker(
      {
        username: "anuraghazra",
        count_private: true,
      },
      data,
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
});
