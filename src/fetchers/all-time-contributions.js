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
  if (!login) {
    throw new MissingParamError(["login"]);
  }

  const res = await retryer(request, [
    {
      query: CONTRIBUTION_YEARS_QUERY,
      variables: { login },
    },
    {
      Authorization: `token ${token}`,
    },
  ]);

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch contribution years",
      CustomError.USER_NOT_FOUND,
    );
  }

  return res.data.data.user.contributionsCollection.contributionYears;
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

  const res = await retryer(request, [
    {
      query: YEAR_CONTRIBUTIONS_QUERY,
      variables: { login, from, to },
    },
    {
      Authorization: `token ${token}`,
    },
  ]);

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || `Could not fetch contributions for ${year}`,
      CustomError.GRAPHQL_ERROR,
    );
  }

  return res.data.data.user.contributionsCollection;
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

  logger.log(`Fetching all-time contributions for ${login}...`);

  // Fetch all contribution years
  const years = await fetchContributionYears(login, token);
  logger.log(`Found contribution years: ${years.join(", ")}`);

  if (deduplicate) {
    // Deduplicated mode - count unique repositories
    const allRepos = new Set();

    for (const year of years) {
      logger.log(`Fetching contributions for year ${year}...`);
      const yearData = await fetchYearContributions(login, year, token);
      
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
    }

    logger.log(`Total unique repositories: ${allRepos.size}`);

    return {
      totalRepositoriesContributedTo: allRepos.size,
      deduplicated: true,
      yearsAnalyzed: years.length,
    };
  } else {
    // Summed mode - sum all totals
    let totalCommits = 0;
    let totalIssues = 0;
    let totalPRs = 0;
    let totalReviews = 0;

    for (const year of years) {
      logger.log(`Fetching contributions for year ${year}...`);
      const yearData = await fetchYearContributions(login, year, token);

      totalCommits += yearData.totalRepositoriesWithContributedCommits || 0;
      totalIssues += yearData.totalRepositoriesWithContributedIssues || 0;
      totalPRs += yearData.totalRepositoriesWithContributedPullRequests || 0;
      totalReviews += yearData.totalRepositoriesWithContributedPullRequestReviews || 0;
    }

    const total = totalCommits + totalIssues + totalPRs + totalReviews;

    logger.log(`Total contributions: ${total} (Commits: ${totalCommits}, Issues: ${totalIssues}, PRs: ${totalPRs}, Reviews: ${totalReviews})`);

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