require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchStats = require("../src/fetchers/stats-fetcher");
const calculateRank = require("../src/calculateRank");

const yearsOfContribData = {
  data: {
    user: {
      contributionsCollection: {
        contributionYears: [
          2021
        ]
      },
    },
  }
};

const data = {
  data: {
    user: {
      name: "Anurag Hazra",
      year_2021: {
        totalCommitContributions: 100,
        totalRepositoryContributions: 61,
        restrictedContributionsCount: 20,
        commitContributionsByRepository: [
          {
            repository: {
              name: "ApplicationsDemo1",
              stargazers: {
                totalCount: 100
              }
            }
          },
          {
            repository: {
              name: "ApplicationsDemo2",
              stargazers: {
                totalCount: 100
              }
            }
          },
          {
            repository: {
              name: "ApplicationsDemo3",
              stargazers: {
                totalCount: 100
              }
            }
          },
          {
            repository: {
              name: "ApplicationsDemo4",
              stargazers: {
                totalCount: 50
              }
            }
          },
          {
            repository: {
              name: "ApplicationsDemo5",
              stargazers: {
                totalCount: 50
              }
            }
          }
        ]
      },
      pullRequests: { totalCount: 300 },
      issues: { totalCount: 200 },
      followers: { totalCount: 100 },
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

const faker = (data) => {

  mock
    .onPost("https://api.github.com/graphql")
    .reply((config) => {
      const request = JSON.parse(config.data);

      if (request.query && request.query.includes("contributionYears")) {
        return [200, yearsOfContribData];
      } else {
        // passThrough
        return [200, data];
      }
    });

};

afterEach(() => {
  mock.reset();
});

describe("Test fetchStats", () => {
  it("should fetch correct stats", async () => {
    faker(data);

    let stats = await fetchStats("anuraghazra");
    const rank = calculateRank({
      totalCommits: 100,
      totalRepos: 61,
      followers: 100,
      contributions: 5,
      stargazers: 400,
      prs: 300,
      issues: 200,
    });

    expect(stats).toStrictEqual({
      contributedTo: 5,
      name: "Anurag Hazra",
      totalCommits: 100,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 400,
      totalRepos: 61,
      rank,
    });
  });

  it("should throw error", async () => {
    faker(error)

    await expect(fetchStats("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'.",
    );
  });

  it("should fetch and add private contributions", async () => {
    faker(data);

    let stats = await fetchStats("anuraghazra", true);
    const rank = calculateRank({
      totalCommits: 120,
      totalRepos: 61,
      followers: 100,
      contributions: 5,
      stargazers: 400,
      prs: 300,
      issues: 200,
    });

    expect(stats).toStrictEqual({
      contributedTo: 5,
      name: "Anurag Hazra",
      totalCommits: 120,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 400,
      totalRepos: 61,
      rank,
    });
  });

  it("should fetch total commits", async () => {
    faker({
      data: {
        user: {
          name: "Anurag Hazra",
          year_2021: {
            totalCommitContributions: 1050,
            totalRepositoryContributions: 61,
            restrictedContributionsCount: 20,
            commitContributionsByRepository: [
              {
                repository: {
                  name: "ApplicationsDemo1",
                  stargazers: {
                    totalCount: 100
                  }
                }
              },
              {
                repository: {
                  name: "ApplicationsDemo2",
                  stargazers: {
                    totalCount: 100
                  }
                }
              },
              {
                repository: {
                  name: "ApplicationsDemo3",
                  stargazers: {
                    totalCount: 100
                  }
                }
              },
              {
                repository: {
                  name: "ApplicationsDemo4",
                  stargazers: {
                    totalCount: 50
                  }
                }
              },
              {
                repository: {
                  name: "ApplicationsDemo5",
                  stargazers: {
                    totalCount: 50
                  }
                }
              }
            ]
          },
          pullRequests: { totalCount: 300 },
          issues: { totalCount: 200 },
          followers: { totalCount: 100 },
        },
      }
    });

    let stats = await fetchStats("anuraghazra", true);
    const rank = calculateRank({
      totalCommits: 1070,
      totalRepos: 61,
      followers: 100,
      contributions: 5,
      stargazers: 400,
      prs: 300,
      issues: 200,
    });

    expect(stats).toStrictEqual({
      contributedTo: 5,
      name: "Anurag Hazra",
      totalCommits: 1070,
      totalIssues: 200,
      totalPRs: 300,
      totalStars: 400,
      totalRepos: 61,
      rank,
    });
  });
});
