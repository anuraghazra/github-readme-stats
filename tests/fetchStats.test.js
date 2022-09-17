require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchStats = require("../src/fetchers/stats-fetcher");
const calculateRank = require("../src/calculateRank");

const data = {
  data: {
    user: {
      name: "Anurag Hazra",
      repositoriesContributedTo: { totalCount: 61 },
      contributionsCollection: {
        totalCommitContributions: 100,
        restrictedContributionsCount: 50,
      },
      pullRequests: { totalCount: 300 },
      openIssues: { totalCount: 100 },
      closedIssues: { totalCount: 100 },
      followers: { totalCount: 100 },
      repositories: {
        totalCount: 5,
        nodes: [
          { name: "test-repo-1", stargazers: { totalCount: 100 } },
          { name: "test-repo-2", stargazers: { totalCount: 100 } },
          { name: "test-repo-3", stargazers: { totalCount: 100 } },
          { name: "test-repo-4", stargazers: { totalCount: 50 } },
          { name: "test-repo-5", stargazers: { totalCount: 50 } },
        ],
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
      message: "Could not resolve to a User with the login of 'noname'.",
    },
  ],
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test fetchStats", () => {
  it("should fetch correct stats", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data);

    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      totalCommits: 100,
      totalRepos: 5,
      followers: 100,
      contributions: 61,
      stargazers: 400,
      prs: 300,
      issues: 200,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 400,
      rank,
    });
  });

  it("should throw error", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchStats("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'.",
    );
  });

  it("should fetch and add private contributions", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data);

    let stats = await fetchStats("anuraghazra", true);
    const rank = calculateRank({
      totalCommits: 150,
      totalRepos: 5,
      followers: 100,
      contributions: 61,
      stargazers: 400,
      prs: 300,
      issues: 200,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 150,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 400,
      rank,
    });
  });

  it("should fetch total commits", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data);
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { total_count: 1000 });

    let stats = await fetchStats("anuraghazra", true, true);
    const rank = calculateRank({
      totalCommits: 1050,
      totalRepos: 5,
      followers: 100,
      contributions: 61,
      stargazers: 400,
      prs: 300,
      issues: 200,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 1050,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 400,
      rank,
    });
  });

  it("should exclude stars of the `test-repo-1` repository", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data);
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { total_count: 1000 });

    let stats = await fetchStats(
      "anuraghazra",
      true,
      true,
      (exclude_repo = ["test-repo-1"]),
    );
    const rank = calculateRank({
      totalCommits: 1050,
      totalRepos: 5,
      followers: 100,
      contributions: 61,
      stargazers: 300,
      prs: 300,
      issues: 200,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 1050,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 300,
      rank,
    });
  });
});
