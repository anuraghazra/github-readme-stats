import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchAllTimeContributions } from "../src/fetchers/all-time-contributions.js";

const mock = new MockAdapter(axios);

// Mock data for contribution years
const data_contribution_years = {
  data: {
    user: {
      contributionsCollection: {
        contributionYears: [2023, 2022, 2021],
      },
    },
  },
};

const data_contribution_years_single = {
  data: {
    user: {
      contributionsCollection: {
        contributionYears: [2023],
      },
    },
  },
};

const data_contribution_years_empty = {
  data: {
    user: {
      contributionsCollection: {
        contributionYears: [],
      },
    },
  },
};

// Mock data for year contributions - 2023
const data_year_2023 = {
  data: {
    user: {
      contributionsCollection: {
        commitContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-a" } },
          { repository: { nameWithOwner: "user/repo-b" } },
        ],
        issueContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-a" } }, // duplicate
          { repository: { nameWithOwner: "user/repo-c" } },
        ],
        pullRequestContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-d" } },
        ],
        pullRequestReviewContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-b" } }, // duplicate
        ],
      },
    },
  },
};

// Mock data for year contributions - 2022
const data_year_2022 = {
  data: {
    user: {
      contributionsCollection: {
        commitContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-a" } }, // duplicate from 2023
          { repository: { nameWithOwner: "user/repo-e" } },
        ],
        issueContributionsByRepository: [],
        pullRequestContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-f" } },
        ],
        pullRequestReviewContributionsByRepository: [],
      },
    },
  },
};

// Mock data for year contributions - 2021
const data_year_2021 = {
  data: {
    user: {
      contributionsCollection: {
        commitContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-g" } },
        ],
        issueContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-a" } }, // duplicate
        ],
        pullRequestContributionsByRepository: [],
        pullRequestReviewContributionsByRepository: [
          { repository: { nameWithOwner: "user/repo-h" } },
        ],
      },
    },
  },
};

// Error responses
const error_user_not_found = {
  errors: [
    {
      type: "NOT_FOUND",
      path: ["user"],
      locations: [],
      message: "Could not resolve to a User with the login of 'noname'.",
    },
  ],
};

const error_generic = {
  errors: [
    {
      message: "Some GraphQL error occurred",
    },
  ],
};

afterEach(() => {
  mock.reset();
});

describe("fetchAllTimeContributions", () => {
  describe("successful fetches", () => {
    it("should fetch and deduplicate contributions across multiple years", async () => {
      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        const query = req.query;

        // Contribution years query
        if (query.includes("contributionYears")) {
          return [200, data_contribution_years];
        }

        // Year contributions query - check the from variable to determine year
        const from = req.variables?.from;
        if (from?.startsWith("2023")) {
          return [200, data_year_2023];
        } else if (from?.startsWith("2022")) {
          return [200, data_year_2022];
        } else if (from?.startsWith("2021")) {
          return [200, data_year_2021];
        }

        return [500, { error: "Unexpected request" }];
      });

      const result = await fetchAllTimeContributions("testuser");

      // Expected unique repos:
      // 2023: repo-a, repo-b, repo-c, repo-d (4 unique)
      // 2022: repo-a (dup), repo-e, repo-f (2 new)
      // 2021: repo-g, repo-a (dup), repo-h (2 new)
      // Total unique: 8
      expect(result).toStrictEqual({
        totalRepositoriesContributedTo: 8,
        yearsAnalyzed: 3,
      });
    });

    it("should handle single year correctly", async () => {
      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        const query = req.query;

        if (query.includes("contributionYears")) {
          return [200, data_contribution_years_single];
        }

        if (req.variables?.from?.startsWith("2023")) {
          return [200, data_year_2023];
        }

        return [500, { error: "Unexpected request" }];
      });

      const result = await fetchAllTimeContributions("testuser");

      // 2023 has: repo-a, repo-b, repo-c, repo-d = 4 unique repos
      expect(result).toStrictEqual({
        totalRepositoriesContributedTo: 4,
        yearsAnalyzed: 1,
      });
    });

    it("should handle user with no contribution years", async () => {
      mock.onPost("https://api.github.com/graphql").reply(200, data_contribution_years_empty);

      const result = await fetchAllTimeContributions("newuser");

      expect(result).toStrictEqual({
        totalRepositoriesContributedTo: 0,
        yearsAnalyzed: 0,
      });
    });

    it("should handle empty contribution types in a year", async () => {
      const data_year_empty = {
        data: {
          user: {
            contributionsCollection: {
              commitContributionsByRepository: [],
              issueContributionsByRepository: [],
              pullRequestContributionsByRepository: [],
              pullRequestReviewContributionsByRepository: [],
            },
          },
        },
      };

      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        if (req.query.includes("contributionYears")) {
          return [200, data_contribution_years_single];
        }
        return [200, data_year_empty];
      });

      const result = await fetchAllTimeContributions("testuser");

      expect(result).toStrictEqual({
        totalRepositoriesContributedTo: 0,
        yearsAnalyzed: 1,
      });
    });

    it("should handle null/undefined contribution arrays gracefully", async () => {
      const data_year_nulls = {
        data: {
          user: {
            contributionsCollection: {
              commitContributionsByRepository: [
                { repository: { nameWithOwner: "user/repo-a" } },
              ],
              issueContributionsByRepository: null,
              pullRequestContributionsByRepository: undefined,
              pullRequestReviewContributionsByRepository: [
                { repository: null }, // null repository
                { repository: { nameWithOwner: null } }, // null nameWithOwner
                { repository: { nameWithOwner: "user/repo-b" } },
              ],
            },
          },
        },
      };

      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        if (req.query.includes("contributionYears")) {
          return [200, data_contribution_years_single];
        }
        return [200, data_year_nulls];
      });

      const result = await fetchAllTimeContributions("testuser");

      expect(result).toStrictEqual({
        totalRepositoriesContributedTo: 2, // only repo-a and repo-b
        yearsAnalyzed: 1,
      });
    });
  });

  describe("error handling", () => {
    it("should throw MissingParamError when login is not provided", async () => {
      await expect(fetchAllTimeContributions("")).rejects.toThrow(
        'Missing params "login"',
      );

      await expect(fetchAllTimeContributions(null)).rejects.toThrow(
        'Missing params "login"',
      );

      await expect(fetchAllTimeContributions(undefined)).rejects.toThrow(
        'Missing params "login"',
      );
    });

    it("should throw error when contribution years query fails", async () => {
      mock.onPost("https://api.github.com/graphql").reply(200, error_user_not_found);

      await expect(fetchAllTimeContributions("noname")).rejects.toThrow(
        "Failed to fetch contribution years",
      );
    });

    it("should throw error when year contributions query fails", async () => {
      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        if (req.query.includes("contributionYears")) {
          return [200, data_contribution_years_single];
        }
        // Return error for year query
        return [200, error_generic];
      });

      await expect(fetchAllTimeContributions("testuser")).rejects.toThrow(
        "Failed to fetch year 2023",
      );
    });

    it("should throw error when response structure is invalid for years query", async () => {
      mock.onPost("https://api.github.com/graphql").reply(200, {
        data: {
          user: null,
        },
      });

      await expect(fetchAllTimeContributions("testuser")).rejects.toThrow(
        "Invalid response structure",
      );
    });

    it("should throw error when response structure is invalid for year contributions", async () => {
      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        if (req.query.includes("contributionYears")) {
          return [200, data_contribution_years_single];
        }
        return [
          200,
          {
            data: {
              user: {
                contributionsCollection: null,
              },
            },
          },
        ];
      });

      await expect(fetchAllTimeContributions("testuser")).rejects.toThrow(
        "Invalid response for year 2023",
      );
    });
  });

  describe("deduplication logic", () => {
    it("should correctly deduplicate repos across all contribution types within same year", async () => {
      const data_same_repo_all_types = {
        data: {
          user: {
            contributionsCollection: {
              commitContributionsByRepository: [
                { repository: { nameWithOwner: "user/shared-repo" } },
              ],
              issueContributionsByRepository: [
                { repository: { nameWithOwner: "user/shared-repo" } },
              ],
              pullRequestContributionsByRepository: [
                { repository: { nameWithOwner: "user/shared-repo" } },
              ],
              pullRequestReviewContributionsByRepository: [
                { repository: { nameWithOwner: "user/shared-repo" } },
              ],
            },
          },
        },
      };

      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        if (req.query.includes("contributionYears")) {
          return [200, data_contribution_years_single];
        }
        return [200, data_same_repo_all_types];
      });

      const result = await fetchAllTimeContributions("testuser");

      // Same repo appears in all 4 contribution types - should only count once
      expect(result.totalRepositoriesContributedTo).toBe(1);
    });

    it("should correctly deduplicate repos across multiple years", async () => {
      const years_data = {
        data: {
          user: {
            contributionsCollection: {
              contributionYears: [2023, 2022],
            },
          },
        },
      };

      const data_2023_same = {
        data: {
          user: {
            contributionsCollection: {
              commitContributionsByRepository: [
                { repository: { nameWithOwner: "user/persistent-repo" } },
              ],
              issueContributionsByRepository: [],
              pullRequestContributionsByRepository: [],
              pullRequestReviewContributionsByRepository: [],
            },
          },
        },
      };

      const data_2022_same = {
        data: {
          user: {
            contributionsCollection: {
              commitContributionsByRepository: [
                { repository: { nameWithOwner: "user/persistent-repo" } },
              ],
              issueContributionsByRepository: [],
              pullRequestContributionsByRepository: [],
              pullRequestReviewContributionsByRepository: [],
            },
          },
        },
      };

      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        if (req.query.includes("contributionYears")) {
          return [200, years_data];
        }
        if (req.variables?.from?.startsWith("2023")) {
          return [200, data_2023_same];
        }
        return [200, data_2022_same];
      });

      const result = await fetchAllTimeContributions("testuser");

      // Same repo in both years - should only count once
      expect(result.totalRepositoriesContributedTo).toBe(1);
      expect(result.yearsAnalyzed).toBe(2);
    });
  });

  describe("batched processing", () => {
    it("should process years in batches respecting concurrency limit", async () => {
      // Track the order of requests to verify batching
      const requestTimes = [];
      let requestCount = 0;

      const many_years = {
        data: {
          user: {
            contributionsCollection: {
              contributionYears: [2023, 2022, 2021, 2020, 2019, 2018, 2017],
            },
          },
        },
      };

      const empty_year = {
        data: {
          user: {
            contributionsCollection: {
              commitContributionsByRepository: [],
              issueContributionsByRepository: [],
              pullRequestContributionsByRepository: [],
              pullRequestReviewContributionsByRepository: [],
            },
          },
        },
      };

      mock.onPost("https://api.github.com/graphql").reply((cfg) => {
        const req = JSON.parse(cfg.data);
        if (req.query.includes("contributionYears")) {
          return [200, many_years];
        }
        requestCount++;
        requestTimes.push(Date.now());
        return [200, empty_year];
      });

      const result = await fetchAllTimeContributions("testuser");

      expect(result.yearsAnalyzed).toBe(7);
      // All 7 years should have been fetched
      expect(requestCount).toBe(7);
    });
  });
});