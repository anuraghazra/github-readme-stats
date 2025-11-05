// @ts-check

import { retryer } from "../common/retryer.js";
import { MissingParamError, CustomError } from "../common/error.js";
import { request } from "../common/http.js";
import { logger } from "../common/log.js";

/**
 * GraphQL query to fetch contribution years for a user
 */
const CONTRIBUTION_YEARS_QUERY = `
  query contributionYears($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionYears
      }
    }
  }
`;

/**
 * GraphQL query to fetch contributions for a specific year
 */
const YEAR_CONTRIBUTIONS_QUERY = `
  query yearContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalRepositoriesWithContributedCommits
        totalRepositoriesWithContributedIssues
        totalRepositoriesWithContributedPullRequests
        totalRepositoriesWithContributedPullRequestReviews
        commitContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
          }
        }
        issueContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
          }
        }
        pullRequestContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
          }
        }
        pullRequestReviewContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
          }
        }
      }
    }
  }
`;

/**
 * Fetches all contribution years for a user
 * @param {string} login - GitHub username
 * @param {string} token - GitHub PAT
 * @returns {Promise<number[]>} Array of years
 */
const fetchContributionYears = async (login, token) => {
  logger.log(`Fetching contribution years for ${login}...`);

  const fetcher = (variables) => {
    return request(
      {
        query: CONTRIBUTION_YEARS_QUERY,
        variables,
      },
      {
        Authorization: `bearer ${token}`,
      },
    );
  };

  try {
    const res = await retryer(fetcher, { login });

    // Check for errors in the response
    if (res.data.errors) {
      throw new Error(
        res.data.errors[0]?.message || "Failed to fetch contribution years"
      );
    }

    // Check if data exists
    if (!res.data.data) {
      throw new Error("Invalid response structure - missing data field");
    }

    // Check if user exists
    if (!res.data.data.user) {
      throw new Error(`User not found: ${login}`);
    }

    // Check if contributionsCollection exists
    if (!res.data.data.user.contributionsCollection) {
      throw new Error("Missing contributionsCollection in response");
    }

    const years = res.data.data.user.contributionsCollection.contributionYears || [];

    return years;
  } catch (err) {
    throw err;
  }
};

/**
 * Fetches contributions for a specific year
 * @param {string} login - GitHub username
 * @param {number} year - Year to fetch
 * @param {string} token - GitHub PAT
 * @returns {Promise<Object>} Contribution data for the year
 */
const fetchYearContributions = async (login, year, token) => {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const fetcher = (variables) => {
    return request(
      {
        query: YEAR_CONTRIBUTIONS_QUERY,
        variables,
      },
      {
        Authorization: `bearer ${token}`,
      },
    );
  };

  try {
    const res = await retryer(fetcher, { login, from, to });
    // Check for errors
    if (res.data.errors) {
      throw new Error(
        res.data.errors[0]?.message || `Failed to fetch contributions for year ${year}`
      );
    }

    // Validate response structure
    if (!res.data.data) {
      throw new Error(`Invalid response structure for year ${year} - missing data field`);
    }

    if (!res.data.data.user) {
      throw new Error(`User not found for year ${year}: ${login}`);
    }

    if (!res.data.data.user.contributionsCollection) {
      throw new Error(`Missing contributionsCollection for year ${year}`);
    }

    return res.data.data.user.contributionsCollection;
  } catch (err) {
    throw err;
  }
};

/**
 * Deduplicates repositories across all contribution types
 * @param {Object} yearData - Contribution data for a year
 * @returns {number} Count of unique repositories
 */
const deduplicateRepositories = (yearData) => {
  const uniqueRepos = new Set();

  const addRepos = (contributions) => {
    contributions?.forEach((contrib) => {
      if (contrib.repository?.nameWithOwner) {
        uniqueRepos.add(contrib.repository.nameWithOwner);
      }
    });
  };

  addRepos(yearData.commitContributionsByRepository);
  addRepos(yearData.issueContributionsByRepository);
  addRepos(yearData.pullRequestContributionsByRepository);
  addRepos(yearData.pullRequestReviewContributionsByRepository);

  return uniqueRepos.size;
};

/**
 * Fetches all-time contribution statistics
 * @param {string} login - GitHub username
 * @param {string} token - GitHub PAT
 * @param {boolean} deduplicate - Whether to deduplicate repositories
 * @returns {Promise<Object>} All-time contribution stats
 */
export const fetchAllTimeContributions = async (login, token, deduplicate = false) => {

  if (!login) {
    throw new MissingParamError(["login"]);
  }

  if (!token) {
    throw new Error("GitHub token (PAT_1) is not set in environment variables");
  }

  // Fetch all contribution years
  const years = await fetchContributionYears(login, token);

  if (deduplicate) {
    // Deduplicated mode - count unique repositories across ALL years
    const allRepos = new Set();

    // Fetch all years in PARALLEL instead of sequentially
    const yearDataPromises = years.map(year => fetchYearContributions(login, year, token));
    const yearDataResults = await Promise.all(yearDataPromises);

    yearDataResults.forEach((yearData, index) => {
      
      const addRepos = (contributions) => {
        contributions?.forEach((contrib) => {
          if (contrib.repository?.nameWithOwner) {
            allRepos.add(contrib.repository.nameWithOwner);
          }
        });
      };

      addRepos(yearData.commitContributionsByRepository);
      addRepos(yearData.issueContributionsByRepository);
      addRepos(yearData.pullRequestContributionsByRepository);
      addRepos(yearData.pullRequestReviewContributionsByRepository);
    });

    return {
      totalRepositoriesContributedTo: allRepos.size,
      deduplicated: true,
      yearsAnalyzed: years.length,
    };
  } else {
    // Non-deduplicated mode - sum yearly totals
    let totalCommits = 0;
    let totalIssues = 0;
    let totalPRs = 0;
    let totalReviews = 0;

    // Fetch all years in PARALLEL instead of sequentially
    const yearDataPromises = years.map(year => fetchYearContributions(login, year, token));
    const yearDataResults = await Promise.all(yearDataPromises);

    yearDataResults.forEach((yearData, index) => {
      
      totalCommits += yearData.totalRepositoriesWithContributedCommits || 0;
      totalIssues += yearData.totalRepositoriesWithContributedIssues || 0;
      totalPRs += yearData.totalRepositoriesWithContributedPullRequests || 0;
      totalReviews += yearData.totalRepositoriesWithContributedPullRequestReviews || 0;
    });

    const total = totalCommits + totalIssues + totalPRs + totalReviews;

    logger.log(`Total contributions (summed): ${total}`);
    logger.log(`  Commits: ${totalCommits}, Issues: ${totalIssues}, PRs: ${totalPRs}, Reviews: ${totalReviews}`);

    return {
      totalRepositoriesContributedTo: total,
      totalRepositoriesWithContributedCommits: totalCommits,
      totalRepositoriesWithContributedIssues: totalIssues,
      totalRepositoriesWithContributedPullRequests: totalPRs,
      totalRepositoriesWithContributedPullRequestReviews: totalReviews,
      deduplicated: false,
      yearsAnalyzed: years.length,
    };
  }
};