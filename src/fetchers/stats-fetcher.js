// @ts-check
import * as dotenv from "dotenv";
import githubUsernameRegex from "github-username-regex";
import { calculateRank } from "../calculateRank.js";
import { retryer } from "../common/retryer.js";
import {
  CustomError,
  logger,
  MissingParamError,
  request,
  wrapTextMultiline,
} from "../common/utils.js";

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

const GRAPHQL_STATS_QUERY = `
  query userInfo($login: String!, $after: String) {
    user(login: $login) {
      name
      login
      contributionsCollection {
        totalCommitContributions
        restrictedContributionsCount
        contributionYears
      }
      repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        totalCount
      }
      pullRequests(first: 1) {
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
      ${GRAPHQL_REPOS_FIELD}
    }
  }
`;

/**
 * Stats fetcher object.
 *
 * @param {import('axios').AxiosRequestHeaders} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('../common/types').Fetcher>} Stats fetcher response.
 */
const fetcher = (variables, token) => {
  const query = !variables.after ? GRAPHQL_STATS_QUERY : GRAPHQL_REPOS_QUERY;
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

const fetchYearCommits = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!, $from_time: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from_time) {
            totalCommitContributions
            restrictedContributionsCount
          }
        }
      }
      `,
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
 * @param {string} username Github username.
 * @returns {Promise<import('../common/types').StatsFetcher>} GraphQL Stats object.
 *
 * @description This function supports multi-page fetching if the 'FETCH_MULTI_PAGE_STARS' environment variable is set to true.
 */
const statsFetcher = async (username) => {
  let stats;
  let hasNextPage = true;
  let endCursor = null;
  while (hasNextPage) {
    const variables = { login: username, first: 100, after: endCursor };
    let res = await retryer(fetcher, variables);
    if (res.data.errors) return res;

    // Store stats data.
    const repoNodes = res.data.data.user.repositories.nodes;
    if (!stats) {
      stats = res;
    } else {
      stats.data.data.user.repositories.nodes.push(...repoNodes);
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
 * Fetch all the commits for all the repositories of a given username.
 *
 * @param {*} username GitHub username.
 * @param {number[]} contributionYears Array of years for which to fetch commits.
 * @returns {Promise<{totalPublicCommits: number, totalPrivateCommits: number}>} Total commits.
 *
 * @description Done like this because the GitHub API does not provide a way to fetch all the commits at once. See
 * #92#issuecomment-661026467, #211 and #564 for more information.
 */
const totalCommitsFetcher = async (username, contributionYears) => {
  if (!githubUsernameRegex.test(username))
    throw new CustomError("Invalid username");

  let totalPublicCommits = 0;
  let totalPrivateCommits = 0;

  await Promise.all(
    contributionYears.map(async (year) => {
      const variables = {
        login: username,
        from_time: `${year}-01-01T00:00:00.000Z`,
      };
      const res = await retryer(fetchYearCommits, variables);
      if (res.data.errors) {
        logger.error(res.data.errors);
        throw new CustomError(
          "Something went while trying to retrieve the stats data using the GraphQL API.",
          CustomError.GRAPHQL_ERROR,
        );
      }
      totalPublicCommits +=
        res.data.data.user.contributionsCollection.totalCommitContributions;
      totalPrivateCommits +=
        res.data.data.user.contributionsCollection.restrictedContributionsCount;
    }),
  );
  return {
    totalPublicCommits,
    totalPrivateCommits,
  };
};

/**
 * Fetch stats for a given username.
 *
 * @param {string} username GitHub username.
 * @param {boolean} count_private Include private contributions.
 * @param {boolean} include_all_commits Include all commits.
 * @param {string[]} exclude_repo Repositories to exclude.
 * @returns {Promise<import("./types").StatsData>} Stats data.
 */
const fetchStats = async (
  username,
  count_private = false,
  include_all_commits = false,
  exclude_repo = [],
) => {
  if (!username) throw new MissingParamError(["username"]);

  const stats = {
    name: "",
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 0,
    rank: { level: "C", score: 0 },
  };

  let res = await statsFetcher(username);

  // Catch GraphQL errors.
  if (res.data.errors) {
    logger.error(res.data.errors);
    if (res.data.errors[0].type === "NOT_FOUND") {
      throw new CustomError(
        res.data.errors[0].message || "Could not fetch user.",
        CustomError.USER_NOT_FOUND,
      );
    }
    if (res.data.errors[0].message) {
      throw new CustomError(
        wrapTextMultiline(res.data.errors[0].message, 90, 1)[0],
        res.statusText,
      );
    }
    throw new CustomError(
      "Something went wrong while trying to retrieve the stats data using the GraphQL API.",
      CustomError.GRAPHQL_ERROR,
    );
  }

  const user = res.data.data.user;

  // populate repoToHide map for quick lookup
  // while filtering out
  let repoToHide = {};
  if (exclude_repo) {
    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  stats.name = user.name || user.login;
  stats.totalIssues = user.openIssues.totalCount + user.closedIssues.totalCount;

  // normal commits
  stats.totalCommits = user.contributionsCollection.totalCommitContributions;

  let privateCommits =
    user.contributionsCollection.restrictedContributionsCount;

  // if include_all_commits then just get that,
  // since totalCommitsFetcher already sends totalCommits no need to +=
  if (include_all_commits) {
    const { totalPublicCommits, totalPrivateCommits } =
      await totalCommitsFetcher(
        username,
        user.contributionsCollection.contributionYears,
      );
    stats.totalCommits = totalPublicCommits;
    privateCommits = totalPrivateCommits;
  }

  // if count_private then add private commits to totalCommits so far.
  if (count_private) {
    stats.totalCommits += privateCommits;
  }

  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  // Retrieve stars while filtering out repositories to be hidden
  stats.totalStars = user.repositories.nodes
    .filter((data) => {
      return !repoToHide[data.name];
    })
    .reduce((prev, curr) => {
      return prev + curr.stargazers.totalCount;
    }, 0);

  stats.rank = calculateRank({
    totalCommits: stats.totalCommits,
    totalRepos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    contributions: stats.contributedTo,
    stargazers: stats.totalStars,
    prs: stats.totalPRs,
    issues: stats.totalIssues,
  });

  return stats;
};

export { fetchStats };
export default fetchStats;
