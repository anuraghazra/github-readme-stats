// @ts-check

import axios from "axios";
import * as dotenv from "dotenv";
import githubUsernameRegex from "github-username-regex";
import { calculateRank } from "../calculateRank.js";
import { retryer } from "../common/retryer.js";
import { logger } from "../common/log.js";
import { excludeRepositories } from "../common/envs.js";
import { CustomError, MissingParamError } from "../common/error.js";
import { wrapTextMultiline } from "../common/fmt.js";
import { request } from "../common/http.js";

dotenv.config();

// GraphQL queries.
const GRAPHQL_REPOS_FIELD = `
  repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}, after: $after) {
    totalCount
    nodes {
      name
      stargazers {
        totalCount
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`;

const GRAPHQL_REPOS_QUERY = `
  query userInfo($login: String!, $after: String) {
    user(login: $login) {
      ${GRAPHQL_REPOS_FIELD}
    }
  }
`;

const GRAPHQL_SHARED_STATS_FIELDS = `
  name
  login
  reviews: contributionsCollection {
    totalPullRequestReviewContributions
  }
  repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
    totalCount
  }
  pullRequests(first: 1) {
    totalCount
  }
  mergedPullRequests: pullRequests(states: MERGED) @include(if: $includeMergedPullRequests) {
    totalCount
  }
  openIssues: issues(states: OPEN) {
    totalCount
  }
  closedIssues: issues(states: CLOSED) {
    totalCount
  }
  followers {
    totalCount
  }
  repositoryDiscussions @include(if: $includeDiscussions) {
    totalCount
  }
  repositoryDiscussionComments(onlyAnswers: true) @include(if: $includeDiscussionsAnswers) {
    totalCount
  }
  ${GRAPHQL_REPOS_FIELD}
`;

/**
 * Helper function for wrapping fields in the basic GraphQL userInfo query.
 * Prevents duplication of the root structure and query parameters.
 *
 * @param {string} innerFields Internal GraphQL fields to query on the user object.
 * @param {boolean} [hasStartTime=false] Flag to dynamically add the $startTime argument to the header.
 * @returns {string} Full text of the GraphQL query.
 */
const wrapInUserInfoQuery = (innerFields, hasStartTime = false) => {
  const startTimeArg = hasStartTime ? ", $startTime: DateTime = null" : "";
  return `
    query userInfo($login: String!, $after: String, $includeMergedPullRequests: Boolean!, $includeDiscussions: Boolean!, $includeDiscussionsAnswers: Boolean!${startTimeArg}) {
      user(login: $login) {
        ${innerFields}
      }
    }
  `;
};

const GRAPHQL_STATS_QUERY = wrapInUserInfoQuery(
  `
  commits: contributionsCollection (from: $startTime) {
    totalCommitContributions,
  }
  ${GRAPHQL_SHARED_STATS_FIELDS}
`,
  true,
);

const GRAPHQL_CREATION_QUERY = `
  query userCreation($login: String!) {
    user(login: $login) {
      createdAt
    }
  }
`;

/**
 * Dynamic generation of ONE packed GraphQL query for a range of years.
 *
 * @param {number} startYear Starting year of the range.
 * @param {number} endYear End year of the range.
 * @param {boolean} includeAllCommits Flag for including private commits in the query.
 * @returns {string} GraphQL query text.
 */
const generateAdvancedStatsQuery = (startYear, endYear, includeAllCommits) => {
  let yearlyCommitsFields = "";
  const privateField = includeAllCommits ? "restrictedContributionsCount" : "";
  for (let year = startYear; year <= endYear; year++) {
    yearlyCommitsFields += `
      year_${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
        totalCommitContributions
        ${privateField}
      }
    `;
  }

  return wrapInUserInfoQuery(`
    ${yearlyCommitsFields}
    ${GRAPHQL_SHARED_STATS_FIELDS}
  `);
};

/**
 * Stats fetcher object.
 *
 * @param {object & { after: string | null, query?: string }} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response.
 */
const fetcher = (variables, token) => {
  const query =
    variables.query ||
    (variables.after ? GRAPHQL_REPOS_QUERY : GRAPHQL_STATS_QUERY);
  return request(
    {
      query,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    },
  );
};

/**
 * Fetch stats information for a given username.
 *
 * @param {object} variables Fetcher variables.
 * @param {string} variables.username GitHub username.
 * @param {boolean} variables.includeMergedPullRequests Include merged pull requests.
 * @param {boolean} variables.includeDiscussions Include discussions.
 * @param {boolean} variables.includeDiscussionsAnswers Include discussions answers.
 * @param {string|undefined} variables.startTime Time to start the count of total commits.
 * @param {string} [variables.query] An external GraphQL query that is forced into the fetcher (e.g. for an advanced API).
 * @returns {Promise<import('axios').AxiosResponse>} Axios response.
 *
 * @description This function supports multi-page fetching if the 'FETCH_MULTI_PAGE_STARS' environment variable is set to true.
 */
const statsFetcher = async ({
  username,
  includeMergedPullRequests,
  includeDiscussions,
  includeDiscussionsAnswers,
  startTime,
  query,
}) => {
  let stats;
  let hasNextPage = true;
  let endCursor = null;
  while (hasNextPage) {
    const variables = {
      login: username,
      first: 100,
      after: endCursor,
      includeMergedPullRequests,
      includeDiscussions,
      includeDiscussionsAnswers,
      startTime,
      query,
    };
    let res = await retryer(fetcher, variables);
    if (res.data.errors) {
      return res;
    }

    // Store stats data.
    const repoNodes = res.data.data.user.repositories.nodes;
    if (stats) {
      stats.data.data.user.repositories.nodes.push(...repoNodes);
    } else {
      stats = res;
    }

    // Disable multi page fetching on public Vercel instance due to rate limits.
    const repoNodesWithStars = repoNodes.filter(
      (node) => node.stargazers.totalCount !== 0,
    );
    hasNextPage =
      process.env.FETCH_MULTI_PAGE_STARS === "true" &&
      repoNodes.length === repoNodesWithStars.length &&
      res.data.data.user.repositories.pageInfo.hasNextPage;
    endCursor = res.data.data.user.repositories.pageInfo.endCursor;
  }

  return stats;
};

/**
 * Fetch total commits using the REST API.
 *
 * @param {object} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response.
 *
 * @see https://developer.github.com/v3/search/#search-commits
 */
const fetchTotalCommits = (variables, token) => {
  return axios({
    method: "get",
    url: `https://api.github.com/search/commits?q=author:${variables.login}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.cloak-preview",
      Authorization: `token ${token}`,
    },
  });
};

/**
 * Fetch all the commits for all the repositories of a given username.
 *
 * @param {string} username GitHub username.
 * @returns {Promise<number>} Total commits.
 *
 * @description Done like this because the GitHub API does not provide a way to fetch all the commits. See
 * #92#issuecomment-661026467 and #211 for more information.
 */
const totalCommitsFetcher = async (username) => {
  if (!githubUsernameRegex.test(username)) {
    logger.log("Invalid username provided.");
    throw new Error("Invalid username provided.");
  }

  let res;
  try {
    res = await retryer(fetchTotalCommits, { login: username });
  } catch (err) {
    logger.log(err);
    throw new Error(err);
  }

  const totalCount = res.data.total_count;
  if (!totalCount || isNaN(totalCount)) {
    throw new CustomError(
      "Could not fetch total commits.",
      CustomError.GITHUB_REST_API_ERROR,
    );
  }
  return totalCount;
};

/**
 * Check GraphQL response for errors, log them, and throw corresponding CustomError.
 *
 * @param {import('axios').AxiosResponse} res The Axios/Fetch response object.
 * @throws {CustomError} If the response contains GraphQL errors.
 */
const handleGraphQLErrors = (res) => {
  if (!res.data.errors) {
    return;
  }

  logger.error(res.data.errors);
  const firstError = res.data.errors[0];

  if (firstError.type === "NOT_FOUND") {
    throw new CustomError(
      firstError.message || "Could not fetch user.",
      CustomError.USER_NOT_FOUND,
    );
  }
  if (firstError.message) {
    throw new CustomError(
      wrapTextMultiline(firstError.message, 90, 1)[0],
      res.statusText,
    );
  }
  throw new CustomError(
    "Something went wrong while trying to retrieve the stats data using the GraphQL API.",
    CustomError.GRAPHQL_ERROR,
  );
};

/**
 * Determines whether the advanced commit count API should be used
 * and dynamically generates the corresponding GraphQL query.
 *
 * @param {string} username GitHub username.
 * @param {boolean} include_all_commits Flag for counting commits over time (including private ones).
 * @param {number|undefined} commits_year Start year of the range or a specific year.
 * @param {number|undefined} commits_end_year The end year of the range of years.
 * @returns {Promise<{ query?: string, startYear?: number, endYear?: number }>} An object containing the generated query and resolved year boundaries if conditions are met; an empty object otherwise.
 */
const resolveAdvancedStatsQuery = async (
  username,
  include_all_commits,
  commits_year,
  commits_end_year,
) => {
  const useYearRange =
    commits_year !== undefined &&
    commits_end_year !== undefined &&
    !isNaN(commits_year) &&
    !isNaN(commits_end_year) &&
    commits_end_year >= commits_year;

  if (useYearRange) {
    return {
      query: generateAdvancedStatsQuery(
        commits_year,
        commits_end_year,
        include_all_commits,
      ),
      startYear: commits_year,
      endYear: commits_end_year,
    };
  }

  if (!include_all_commits) {
    return {};
  }

  if (commits_year) {
    return {
      query: generateAdvancedStatsQuery(
        commits_year,
        commits_year,
        include_all_commits,
      ),
      startYear: commits_year,
      endYear: commits_year,
    };
  }

  const res = await retryer(fetcher, {
    login: username,
    query: GRAPHQL_CREATION_QUERY,
  });

  // Catch GraphQL errors.
  handleGraphQLErrors(res);

  const startYear = new Date(res.data.data.user.createdAt).getFullYear();
  const endYear = new Date().getFullYear();

  return {
    query: generateAdvancedStatsQuery(startYear, endYear, include_all_commits),
    startYear,
    endYear,
  };
};

const commitsApiValue = {
  advanced: "advanced",
  default: "default",
};

/**
 * Returns the validated value for the Commits API.
 *
 * @param {string|undefined} value commits api value.
 * @returns {string} validated commits api value.
 */
const getValidatedCommitsApiValue = (value) => {
  switch (value) {
    case commitsApiValue.advanced:
      return value;
    default:
      return commitsApiValue.default;
  }
};

/**
 * Fetch stats for a given username.
 *
 * @param {string} username GitHub username.
 * @param {boolean} include_all_commits Include all commits.
 * @param {string[]} exclude_repo Repositories to exclude.
 * @param {boolean} include_merged_pull_requests Include merged pull requests.
 * @param {boolean} include_discussions Include discussions.
 * @param {boolean} include_discussions_answers Include discussions answers.
 * @param {number|undefined} commits_year Year to count total commits
 * @param {number|undefined} [commits_end_year] End year of the range
 * @param {string} [commits_api] API execution mode for the statistics card (e.g., "advanced").
 * @returns {Promise<import("./types").StatsData>} Stats data.
 */
const fetchStats = async (
  username,
  include_all_commits = false,
  exclude_repo = [],
  include_merged_pull_requests = false,
  include_discussions = false,
  include_discussions_answers = false,
  commits_year,
  commits_end_year,
  commits_api,
) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const stats = {
    name: "",
    totalPRs: 0,
    totalPRsMerged: 0,
    mergedPRsPercentage: 0,
    totalReviews: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    totalDiscussionsStarted: 0,
    totalDiscussionsAnswered: 0,
    contributedTo: 0,
    rank: { level: "C", percentile: 100 },
  };

  const commitsApi = getValidatedCommitsApiValue(commits_api);
  const isAdvancedDisabled = process.env.DISABLE_ADVANCED_COMMITS === "true";

  const advancedStatsQueryInfo =
    commitsApi === commitsApiValue.advanced && !isAdvancedDisabled
      ? await resolveAdvancedStatsQuery(
          username,
          include_all_commits,
          commits_year,
          commits_end_year,
        )
      : {};

  const res = await statsFetcher({
    username,
    includeMergedPullRequests: include_merged_pull_requests,
    includeDiscussions: include_discussions,
    includeDiscussionsAnswers: include_discussions_answers,
    startTime: commits_year ? `${commits_year}-01-01T00:00:00Z` : undefined,
    query: advancedStatsQueryInfo.query,
  });

  // Catch GraphQL errors.
  handleGraphQLErrors(res);

  const user = res.data.data.user;

  stats.name = user.name || user.login;

  if (advancedStatsQueryInfo.query) {
    const startYear = advancedStatsQueryInfo.startYear || 0;
    const endYear = advancedStatsQueryInfo.endYear || -1;

    let totalCommits = 0;

    for (let year = startYear; year <= endYear; year++) {
      const yearBlock = user[`year_${year}`];
      if (yearBlock) {
        totalCommits +=
          (yearBlock.totalCommitContributions || 0) +
          (yearBlock.restrictedContributionsCount || 0);
      }
    }

    stats.totalCommits = totalCommits;
  } else if (include_all_commits) {
    // if include_all_commits, fetch all commits using the REST API.
    stats.totalCommits = await totalCommitsFetcher(username);
  } else {
    stats.totalCommits = user.commits.totalCommitContributions;
  }

  stats.totalPRs = user.pullRequests.totalCount;
  if (include_merged_pull_requests) {
    stats.totalPRsMerged = user.mergedPullRequests.totalCount;
    stats.mergedPRsPercentage =
      (user.mergedPullRequests.totalCount / user.pullRequests.totalCount) *
        100 || 0;
  }
  stats.totalReviews = user.reviews.totalPullRequestReviewContributions;
  stats.totalIssues = user.openIssues.totalCount + user.closedIssues.totalCount;
  if (include_discussions) {
    stats.totalDiscussionsStarted = user.repositoryDiscussions.totalCount;
  }
  if (include_discussions_answers) {
    stats.totalDiscussionsAnswered =
      user.repositoryDiscussionComments.totalCount;
  }
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  // Retrieve stars while filtering out repositories to be hidden.
  const allExcludedRepos = [...exclude_repo, ...excludeRepositories];
  let repoToHide = new Set(allExcludedRepos);

  stats.totalStars = user.repositories.nodes
    .filter((data) => {
      return !repoToHide.has(data.name);
    })
    .reduce((prev, curr) => {
      return prev + curr.stargazers.totalCount;
    }, 0);

  stats.rank = calculateRank({
    all_commits: include_all_commits,
    commits: stats.totalCommits,
    prs: stats.totalPRs,
    reviews: stats.totalReviews,
    issues: stats.totalIssues,
    repos: user.repositories.totalCount,
    stars: stats.totalStars,
    followers: user.followers.totalCount,
  });

  return stats;
};

export { fetchStats };
export default fetchStats;
