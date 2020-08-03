require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchStats = require("../src/fetchers/stats-fetcher");
const calculateRank = require("../src/calculateRank");
const { svgFetcher } = require("../src/common/utils");

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
      issues: { totalCount: 200 },
      followers: { totalCount: 100 },
      repositories: {
        totalCount: 5,
        nodes: [
          {
            stargazers: { totalCount: 100 },
            primaryLanguage: {
              name: "lang1",
            },
          },
          {
            stargazers: { totalCount: 100 },
            primaryLanguage: {
              name: "lang2",
            },
          },
          {
            stargazers: { totalCount: 100 },
            primaryLanguage: {
              name: "lang3",
            },
          },
          { stargazers: { totalCount: 50 }, primaryLanguage: null },
          {
            stargazers: { totalCount: 50 },
            primaryLanguage: {
              name: "lang1",
            },
          },
        ],
      },
    },
  },
};

const _contributionsCollection = data.data.user.contributionsCollection;

const totalCommitsCount =
  _contributionsCollection.restrictedContributionsCount +
  _contributionsCollection.totalCommitContributions;

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

async function primaryLanguagesMockData() {
  return [
    (await svgFetcher("lang1")).data,
    (await svgFetcher("lang2")).data,
    (await svgFetcher("lang3")).data,
  ]
}

function callMockSVGFetcherApi() {
  mock
    .onGet(
      `https://devicons.github.io/devicon/devicon.git/icons/lang1/lang1-original.svg`
    )
    .reply(200, "<svg><Text></Text></svg>")
    .onGet(
      `https://devicons.github.io/devicon/devicon.git/icons/lang2/lang2-original.svg`
    )
    .reply(200, "<svg><Text></Text></svg>")
    .onGet(
      `https://devicons.github.io/devicon/devicon.git/icons/lang3/lang3-original.svg`
    )
    .reply(200, "<svg><Text></Text></svg>");
}

describe("Test fetchStats", () => {
  it("should fetch correct stats", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data);
    callMockSVGFetcherApi();
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
      primaryLanguages: await primaryLanguagesMockData(),
    });
  });

  it("should throw error", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchStats("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'."
    );
  });

  it("should fetch and add private contributions", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data);
    callMockSVGFetcherApi();
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
      primaryLanguages: await primaryLanguagesMockData(),
    });
  });

  it("should fetch total commits", async () => {
    callMockSVGFetcherApi();
    mock.onPost("https://api.github.com/graphql").reply(200, data);
    mock
      .onGet("https://api.github.com/search/commits?q=author:anuraghazra")
      .reply(200, { total_count: 1000 });

    let stats = await fetchStats("anuraghazra", true, true);
    const rank = calculateRank({
      totalCommits: 1000 + totalCommitsCount,
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
      totalCommits: 1000 + totalCommitsCount,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 400,
      rank,
      primaryLanguages: await primaryLanguagesMockData(),
    });
  });
});
