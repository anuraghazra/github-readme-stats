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

  const res = await retryer(fetcher, { login });

  if (res.data.errors) {
    throw new Error("Failed to fetch contribution years");
  }

  if (!res.data.data?.user?.contributionsCollection) {
    throw new Error("Invalid response structure");
  }

  const years = res.data.data.user.contributionsCollection.contributionYears || [];
  return years;
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

  const res = await retryer(fetcher, { login, from, to });

  if (res.data.errors) {
    throw new Error(`Failed to fetch year ${year}`);
  }

  if (!res.data.data?.user?.contributionsCollection) {
    throw new Error(`Invalid response for year ${year}`);
  }

  return res.data.data.user.contributionsCollection;
};

/**
 * Fetches all-time contribution statistics (deduplicated by default)
 * @param {string} login - GitHub username
 * @param {string} token - GitHub PAT
 * @returns {Promise<Object>} All-time contribution stats with unique repository count
 */
export const fetchAllTimeContributions = async (login, token) => {
  if (!login) {
    throw new MissingParamError(["login"]);
  }

  if (!token) {
    throw new Error("GitHub token not set");
  }

  // Fetch all contribution years
  const years = await fetchContributionYears(login, token);

  // Count unique repositories across ALL years
  const allRepos = new Set();

  // Fetch all years in PARALLEL for speed
  const yearDataPromises = years.map(year => fetchYearContributions(login, year, token));
  const yearDataResults = await Promise.all(yearDataPromises);

  yearDataResults.forEach((yearData) => {
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
    yearsAnalyzed: years.length,
  };
};