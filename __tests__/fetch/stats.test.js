import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fetchStats from "../../src/fetch/stats";
import calculateRank from "../../src/utils/calculateRank";

const data = {
  data: {
    user: {
      name: "Anurag Hazra",
      repositoriesContributedTo: { totalCount: 61 },
      contributionsCollection: { totalCommitContributions: 100 },
      pullRequests: { totalCount: 300 },
      issues: { totalCount: 200 },
      followers: { totalCount: 100 },
      repositories: {
        totalCount: 5,
        nodes: [
          { stargazers: { totalCount: 100 } },
          { stargazers: { totalCount: 100 } },
          { stargazers: { totalCount: 100 } },
          { stargazers: { totalCount: 50 } },
          { stargazers: { totalCount: 50 } },
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
      "Could not resolve to a User with the login of 'noname'."
    );
  });
});
