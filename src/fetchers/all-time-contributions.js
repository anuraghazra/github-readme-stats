// @ts-check

import { retryer } from "../common/retryer.js";
import { MissingParamError, CustomError } from "../common/error.js";
import { request } from "../common/http.js";
import { logger } from "../common/log.js";
import { ALL_TIME_CONTRIBS_CONCURRENCY } from "../common/envs.js";

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
 * GraphQL query to fetch contributions for a specific year.
 * Note: GitHub API limits maxRepositories to 100 per contribution type.
 * For users with >100 repos per type per year, counts may be incomplete.
 * This is a known limitation of the GitHub GraphQL API.
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
 * Fetcher for contribution years query (compatible with retryer)
 * @param {Object} variables - Query variables
 * @param {string} token - GitHub PAT (provided by retryer)
 * @returns {Promise<import('axios').AxiosResponse>}
 */
const contributionYearsFetcher = (variables, token) => {
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

/**
 * Fetcher for year contributions query (compatible with retryer)
 * @param {Object} variables - Query variables
 * @param {string} token - GitHub PAT (provided by retryer)
 * @returns {Promise<import('axios').AxiosResponse>}
 */
const yearContributionsFetcher = (variables, token) => {
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

/**
 * Fetches all contribution years for a user
 * @param {string} login - GitHub username
 * @returns {Promise<number[]>} Array of years
 */
const fetchContributionYears = async (login) => {
  const res = await retryer(contributionYearsFetcher, { login });

  if (res.data.errors) {
    const errorDetails = Array.isArray(res.data.errors)
      ? res.data.errors
          .map((e) => (e && e.message ? e.message : JSON.stringify(e)))
          .join("; ")
      : JSON.stringify(res.data.errors);

    logger.error(
      `Failed to fetch contribution years for login '${login}': ${errorDetails}`,
    );

    throw new CustomError(
      `Failed to fetch contribution years: ${errorDetails}`,
      CustomError.GRAPHQL_ERROR,
    );
  }

  if (!res.data.data?.user?.contributionsCollection) {
    throw new CustomError("Invalid response structure", CustomError.GRAPHQL_ERROR);
  }

  const years =
    res.data.data.user.contributionsCollection.contributionYears || [];
  return years;
};

/**
 * Fetches contributions for a specific year
 * @param {string} login - GitHub username
 * @param {number} year - Year to fetch
 * @returns {Promise<Object>} Contribution data for the year
 */
const fetchYearContributions = async (login, year) => {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year + 1}-01-01T00:00:00Z`;

  const res = await retryer(yearContributionsFetcher, { login, from, to });

  if (res.data.errors) {
    throw new CustomError(
      `Failed to fetch year ${year}`,
      CustomError.GRAPHQL_ERROR,
    );
  }

  if (!res.data.data?.user?.contributionsCollection) {
    throw new CustomError(
      `Invalid response for year ${year}`,
      CustomError.GRAPHQL_ERROR,
    );
  }

  return res.data.data.user.contributionsCollection;
};

/**
 * Process items in batches with concurrency limit to avoid rate limiting.
 * @template T
 * @template R
 * @param {T[]} items - Items to process
 * @param {(item: T) => Promise<R>} fn - Async function to apply to each item
 * @param {number} concurrency - Maximum concurrent operations
 * @returns {Promise<R[]>} Results in order
 */
const processBatched = async (items, fn, concurrency) => {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
};

/**
 * Fetches all-time contribution statistics (deduplicated by default).
 *
 * Note: GitHub API limits each contribution type to 100 repositories per year.
 * For extremely active users (>100 repos per contribution type per year),
 * the count may be slightly underreported. This is a GitHub API limitation.
 *
 * @param {string} login - GitHub username
 * @returns {Promise<Object>} All-time contribution stats with unique repository count
 */
export const fetchAllTimeContributions = async (login) => {
  if (!login) {
    throw new MissingParamError(["login"]);
  }

  // Fetch all contribution years (uses retryer with token rotation)
  const years = await fetchContributionYears(login);

  if (years.length === 0) {
    return {
      totalRepositoriesContributedTo: 0,
      yearsAnalyzed: 0,
    };
  }

  // Count unique repositories across ALL years
  const allRepos = new Set();

  // Fetch years in batches to avoid rate limiting
  // Default concurrency is 3 to balance speed and API limits
  const concurrency = ALL_TIME_CONTRIBS_CONCURRENCY || 3;

  logger.log(
    `Fetching all-time contributions for ${login}: ${years.length} years with concurrency ${concurrency}`,
  );

  const yearDataResults = await processBatched(
    years,
    (year) => fetchYearContributions(login, year),
    concurrency,
  );

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