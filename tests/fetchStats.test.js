import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { calculateRank } from "../src/calculateRank.js";
import { fetchStats } from "../src/fetchers/stats.js";

// Test parameters.
const data_stats = {
  data: {
    user: {
      name: "Anurag Hazra",
      repositoriesContributedTo: { totalCount: 61 },
      commits: {
        totalCommitContributions: 100,
      },
      reviews: {
        totalPullRequestReviewContributions: 50,
      },
      pullRequests: { totalCount: 300 },
      mergedPullRequests: { totalCount: 240 },
      openIssues: { totalCount: 100 },
      closedIssues: { totalCount: 100 },
      followers: { totalCount: 100 },
      repositoryDiscussions: { totalCount: 10 },
      repositoryDiscussionComments: { totalCount: 40 },
      repositories: {
        totalCount: 5,
        nodes: [
          { name: "test-repo-1", stargazers: { totalCount: 100 } },
          { name: "test-repo-2", stargazers: { totalCount: 100 } },
          { name: "test-repo-3", stargazers: { totalCount: 100 } },
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: "cursor",
        },
      },
    },
  },
};

const data_year2003 = JSON.parse(JSON.stringify(data_stats));
data_year2003.data.user.commits.totalCommitContributions = 428;

const data_without_pull_requests = {
  data: {
    user: {
      ...data_stats.data.user,
      pullRequests: { totalCount: 0 },
      mergedPullRequests: { totalCount: 0 },
    },
  },
};

const data_repo = {
  data: {
    user: {
      repositories: {
        nodes: [
          { name: "test-repo-4", stargazers: { totalCount: 50 } },
          { name: "test-repo-5", stargazers: { totalCount: 50 } },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: "cursor",
        },
      },
    },
  },
};

const data_repo_zero_stars = {
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
      message: "Could not resolve to a User with the login of 'noname'.",
    },
  ],
};

const mock = new MockAdapter(axios);

beforeEach(() => {
  process.env.FETCH_MULTI_PAGE_STARS = "false"; // Set to `false` to fetch only one page of stars.
  mock.onPost("https://api.github.com/graphql").reply((cfg) => {
    let req = JSON.parse(cfg.data);

    if (
      req.variables &&
      req.variables.startTime &&
      req.variables.startTime.startsWith("2003")
    ) {
      return [200, data_year2003];
    }
    return [
      200,
      req.query.includes("totalCommitContributions") ? data_stats : data_repo,
    ];
  });
});

afterEach(() => {
  mock.reset();
});

describe("Test fetchStats", () => {
  it("should fetch correct stats", async () => {
    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should stop fetching when there are repos with zero stars", async () => {
    mock.reset();
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_stats)
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_repo_zero_stars);

    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
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

  it("should fetch total commits", async () => {
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { total_count: 1000 });

    let stats = await fetchStats("anuraghazra", true);
    const rank = calculateRank({
      all_commits: true,
      commits: 1000,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 1000,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should throw specific error when include_all_commits true and invalid username", async () => {
    expect(fetchStats("asdf///---", true)).rejects.toThrow(
      new Error("Invalid username provided."),
    );
  });

  it("should throw specific error when include_all_commits true and API returns error", async () => {
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { error: "Some test error message" });

    expect(fetchStats("anuraghazra", true)).rejects.toThrow(
      new Error("Could not fetch total commits."),
    );
  });

  it("should exclude stars of the `test-repo-1` repository", async () => {
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { total_count: 1000 });

    let stats = await fetchStats("anuraghazra", true, ["test-repo-1"]);
    const rank = calculateRank({
      all_commits: true,
      commits: 1000,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 200,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 1000,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 200,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should fetch two pages of stars if 'FETCH_MULTI_PAGE_STARS' env variable is set to `true`", async () => {
    process.env.FETCH_MULTI_PAGE_STARS = true;

    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 400,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 400,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should fetch one page of stars if 'FETCH_MULTI_PAGE_STARS' env variable is set to `false`", async () => {
    process.env.FETCH_MULTI_PAGE_STARS = "false";

    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should fetch one page of stars if 'FETCH_MULTI_PAGE_STARS' env variable is not set", async () => {
    process.env.FETCH_MULTI_PAGE_STARS = undefined;

    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should not fetch additional stats data when it not requested", async () => {
    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should fetch additional stats when it requested", async () => {
    let stats = await fetchStats("anuraghazra", false, [], true, true, true);
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 240,
      mergedPRsPercentage: 80,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 10,
      totalDiscussionsAnswered: 40,
      rank,
    });
  });

  it("should get commits of provided year", async () => {
    let stats = await fetchStats(
      "anuraghazra",
      false,
      [],
      false,
      false,
      false,
      2003,
    );

    const rank = calculateRank({
      all_commits: false,
      commits: 428,
      prs: 300,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 428,
      totalIssues: 200,
      totalPRs: 300,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });

  it("should return correct data when user don't have any pull requests", async () => {
    mock.reset();
    mock
      .onPost("https://api.github.com/graphql")
      .reply(200, data_without_pull_requests);
    const stats = await fetchStats("anuraghazra", false, [], true);
    const rank = calculateRank({
      all_commits: false,
      commits: 100,
      prs: 0,
      reviews: 50,
      issues: 200,
      repos: 5,
      stars: 300,
      followers: 100,
    });

    expect(stats).toStrictEqual({
      contributedTo: 61,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 0,
      totalPRsMerged: 0,
      mergedPRsPercentage: 0,
      totalReviews: 50,
      totalStars: 300,
      totalDiscussionsStarted: 0,
      totalDiscussionsAnswered: 0,
      rank,
    });
  });
});

describe("Test fetchStats with all_time_contribs", () => {
  // Mock data for all-time contributions
  const data_contribution_years = {
    data: {
      user: {
        contributionsCollection: {
          contributionYears: [2023, 2022],
        },
      },
    },
  };

  const data_year_contributions = {
    data: {
      user: {
        contributionsCollection: {
          commitContributionsByRepository: [
            { repository: { nameWithOwner: "user/repo-a" } },
            { repository: { nameWithOwner: "user/repo-b" } },
          ],
          issueContributionsByRepository: [
            { repository: { nameWithOwner: "user/repo-c" } },
          ],
          pullRequestContributionsByRepository: [
            { repository: { nameWithOwner: "user/repo-a" } }, // duplicate
          ],
          pullRequestReviewContributionsByRepository: [],
        },
      },
    },
  };

  let fetchStats;

  beforeEach(async () => {
    // Reset modules to pick up fresh env values
    jest.resetModules();

    // Enable ALL_TIME_CONTRIBS feature by default for these tests
    process.env.ALL_TIME_CONTRIBS = "true";

    // Re-import fetchStats after resetting modules
    const statsModule = await import("../src/fetchers/stats.js");
    fetchStats = statsModule.fetchStats;
  });

  afterEach(() => {
    delete process.env.ALL_TIME_CONTRIBS;
    delete process.env.ALL_TIME_CONTRIBS_TIMEOUT_MS;
    mock.reset();
  });

  it("should fetch all-time contributions when all_time_contribs is true", async () => {
    mock.reset();
    mock.onPost("https://api.github.com/graphql").reply((cfg) => {
      const req = JSON.parse(cfg.data);
      const query = req.query;

      // Main stats query
      if (query.includes("totalCommitContributions")) {
        return [200, data_stats];
      }
      // Contribution years query
      if (query.includes("contributionYears")) {
        return [200, data_contribution_years];
      }
      // Year contributions query
      if (query.includes("commitContributionsByRepository")) {
        return [200, data_year_contributions];
      }
      return [200, data_repo];
    });

    let stats = await fetchStats(
      "anuraghazra",
      false, // include_all_commits
      true, // all_time_contribs
    );

    // Should have deduplicated count: repo-a, repo-b, repo-c = 3 unique per year
    // But same repos in both years, so still 3 unique total
    expect(stats.contributedTo).toBe(3);
  });

  it("should use last year's count when all_time_contribs is false", async () => {
    mock.reset();
    mock.onPost("https://api.github.com/graphql").reply((cfg) => {
      const req = JSON.parse(cfg.data);
      if (req.query.includes("totalCommitContributions")) {
        return [200, data_stats];
      }
      return [200, data_repo];
    });

    let stats = await fetchStats(
      "anuraghazra",
      false, // include_all_commits
      false, // all_time_contribs
    );

    // Should use repositoriesContributedTo.totalCount from main stats query
    expect(stats.contributedTo).toBe(61);
  });

  it("should fallback to last year's count when ALL_TIME_CONTRIBS env is false", async () => {
    // Reset modules and set env BEFORE importing
    jest.resetModules();
    process.env.ALL_TIME_CONTRIBS = "false";

    const statsModule = await import("../src/fetchers/stats.js");
    const fetchStatsDisabled = statsModule.fetchStats;

    mock.reset();
    mock.onPost("https://api.github.com/graphql").reply((cfg) => {
      const req = JSON.parse(cfg.data);
      if (req.query.includes("totalCommitContributions")) {
        return [200, data_stats];
      }
      return [200, data_repo];
    });

    let stats = await fetchStatsDisabled(
      "anuraghazra",
      false, // include_all_commits
      true, // all_time_contribs - requested but env disabled
    );

    // Should fallback to last year's count since env is disabled
    expect(stats.contributedTo).toBe(61);
  });

  it("should fallback gracefully when all-time contributions fetch fails", async () => {
    mock.reset();
    mock.onPost("https://api.github.com/graphql").reply((cfg) => {
      const req = JSON.parse(cfg.data);
      if (req.query.includes("totalCommitContributions")) {
        return [200, data_stats];
      }
      if (req.query.includes("contributionYears")) {
        // Return an error for the all-time contributions query
        return [200, { errors: [{ message: "Rate limited" }] }];
      }
      return [200, data_repo];
    });

    let stats = await fetchStats(
      "anuraghazra",
      false, // include_all_commits
      true, // all_time_contribs
    );

    // Should fallback to last year's count
    expect(stats.contributedTo).toBe(61);
  });

  it("should fallback when all-time contributions fetch times out", async () => {
    // Reset modules and set short timeout BEFORE importing
    jest.resetModules();
    process.env.ALL_TIME_CONTRIBS = "true";
    process.env.ALL_TIME_CONTRIBS_TIMEOUT_MS = "1"; // 1ms timeout

    const statsModule = await import("../src/fetchers/stats.js");
    const fetchStatsWithTimeout = statsModule.fetchStats;

    mock.reset();
    mock.onPost("https://api.github.com/graphql").reply((cfg) => {
      const req = JSON.parse(cfg.data);
      if (req.query.includes("totalCommitContributions")) {
        return [200, data_stats];
      }
      if (req.query.includes("contributionYears")) {
        // Simulate slow response by returning after a delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([200, data_contribution_years]);
          }, 100); // 100ms delay, longer than 1ms timeout
        });
      }
      return [200, data_repo];
    });

    let stats = await fetchStatsWithTimeout(
      "anuraghazra",
      false, // include_all_commits
      true, // all_time_contribs
    );

    // Should fallback to last year's count due to timeout
    expect(stats.contributedTo).toBe(61);
  });
});
