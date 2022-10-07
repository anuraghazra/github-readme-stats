import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { calculateRank } from "../src/calculateRank.js";
import { fetchStats } from "../src/fetchers/stats-fetcher.js";

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
      },
    },
  },
};

const firstRepositoriesData = {
  data: {
    user: {
      repositories: {
        nodes: [
          { name: "test-repo-1", stargazers: { totalCount: 100 } },
          { name: "test-repo-2", stargazers: { totalCount: 100 } },
          { name: "test-repo-3", stargazers: { totalCount: 100 } },
        ],
        pageInfo: {
          hasNextPage: true,
          cursor: "cursor",
        },
      },
    },
  },
};

const secondRepositoriesData = {
  data: {
    user: {
      repositories: {
        nodes: [
          { name: "test-repo-4", stargazers: { totalCount: 50 } },
          { name: "test-repo-5", stargazers: { totalCount: 50 } },
        ],
        pageInfo: {
          hasNextPage: false,
          cursor: "cursor",
        },
      },
    },
  },
};

const repositoriesWithZeroStarsData = {
  data: {
    user: {
      repositories: {
        nodes: [
          { name: "test-repo-1", stargazers: { totalCount: 100 } },
          { name: "test-repo-2", stargazers: { totalCount: 100 } },
          { name: "test-repo-3", stargazers: { totalCount: 100 } },
          { name: "test-repo-4", stargazers: { totalCount: 0 } },
          { name: "test-repo-5", stargazers: { totalCount: 0 } },
        ],
        pageInfo: {
          hasNextPage: true,
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
      message: "Could not resolve to a User with the login of 'noname'.",
    },
  ],
};

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock
    .onPost("https://api.github.com/graphql")
    .replyOnce(200, data)
    .onPost("https://api.github.com/graphql")
    .replyOnce(200, firstRepositoriesData)
    .onPost("https://api.github.com/graphql")
    .replyOnce(200, secondRepositoriesData);
});

afterEach(() => {
  mock.reset();
});

describe("Test fetchStats", () => {
  it("should fetch correct stats", async () => {
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

  it("should stop fetching when there are repos with zero stars", async () => {
    mock.reset();
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data)
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, repositoriesWithZeroStarsData);

    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      totalCommits: 100,
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
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 300,
      rank,
    });
  });

  it("should throw error", async () => {
    mock.reset();
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchStats("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'.",
    );
  });

  it("should fetch and add private contributions", async () => {
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
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { total_count: 1000 });

    let stats = await fetchStats("anuraghazra", true, true, ["test-repo-1"]);
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
