require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const api = require("../api/index");
const renderStatsCard = require("../src/renderStatsCard");
const { renderError } = require("../src/utils");
const calculateRank = require("../src/calculateRank");

const stats = {
  name: "Anurag Hazra",
  totalStars: 100,
  totalCommits: 200,
  totalIssues: 300,
  totalPRs: 400,
  contributedTo: 500,
  publicRepos: 100,
  privateRepos: 50,
  publicGists: 10,
  secretGists: 5,
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
      contributionsCollection: { totalCommitContributions: stats.totalCommits },
      pullRequests: { totalCount: stats.totalPRs },
      issues: { totalCount: stats.totalIssues },
      followers: { totalCount: 0 },
      repositories: {
        totalCount: 1,
        nodes: [{ stargazers: { totalCount: 100 } }],
      },
      publicOwnedRepo: {
        totalCount: stats.publicRepos
      },
      privateOwnedRepo: {
        totalCount: stats.privateRepos
      },
      publicGist: {
        totalCount: stats.publicGists
      },
      secretGist: {
        totalCount: stats.secretGists
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

afterEach(() => {
  mock.reset();
});

describe("Test /api/", () => {
  it("should test the request", async () => {
    const req = {
      query: {
        username: "anuraghazra",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, data);

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderStatsCard(stats, { ...req.query }));
  });

  it("should render error card on error", async () => {
    const req = {
      query: {
        username: "anuraghazra",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await api(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderError(error.errors[0].message));
  });

  it("should get the query options", async () => {
    const req = {
      query: {
        username: "anuraghazra",
        hide: `["issues","prs","contribs"]`,
        show_icons: true,
        hide_border: true,
        line_height: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, data);

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
      })
    );
  });
});
