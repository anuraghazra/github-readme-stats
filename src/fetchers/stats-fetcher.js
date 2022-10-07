// @ts-check
import axios from "axios";
import * as dotenv from "dotenv";
import githubUsernameRegex from "github-username-regex";
import { calculateRank } from "../calculateRank.js";
import { retryer } from "../common/retryer.js";
import {
  CustomError,
  logger,
  MissingParamError,
  request,
} from "../common/utils.js";

dotenv.config();

/**
 * @param {import('axios').AxiosRequestHeaders} variables
 * @param {string} token
 */
const fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          name
          login
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
          repositoriesContributedTo(contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
          pullRequests {
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
          repositories(ownerAffiliations: OWNER) {
            totalCount
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
 * @param {import('axios').AxiosRequestHeaders} variables
 * @param {string} token
 */
const repositoriesFetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!, $after: String) {
        user(login: $login) {
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}, after: $after) {
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

// https://github.com/anuraghazra/github-readme-stats/issues/92#issuecomment-661026467
// https://github.com/anuraghazra/github-readme-stats/pull/211/
const totalCommitsFetcher = async (username) => {
  if (!githubUsernameRegex.test(username)) {
    logger.log("Invalid username");
    return 0;
  }

  // https://developer.github.com/v3/search/#search-commits
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

  try {
    let res = await retryer(fetchTotalCommits, { login: username });
    let total_count = res.data.total_count;
    if (!!total_count && !isNaN(total_count)) {
      return res.data.total_count;
    }
  } catch (err) {
    logger.log(err);
  }
  // just return 0 if there is something wrong so that
  // we don't break the whole app
  return 0;
};

/**
 * Fetch all the stars for all the repositories of a given username
 * @param {string} username
 * @param {array} repoToHide
 */
const totalStarsFetcher = async (username, repoToHide) => {
  let nodes = [];
  let hasNextPage = true;
  let endCursor = null;
  while (hasNextPage) {
    const variables = { login: username, first: 100, after: endCursor };
    let res = await retryer(repositoriesFetcher, variables);

    if (res.data.errors) {
      logger.error(res.data.errors);
      throw new CustomError(
        res.data.errors[0].message || "Could not fetch user",
        CustomError.USER_NOT_FOUND,
      );
    }

    const allNodes = res.data.data.user.repositories.nodes;
    const nodesWithStars = allNodes.filter(
      (node) => node.stargazers.totalCount !== 0,
    );
    nodes.push(...nodesWithStars);
    // hasNextPage =
    //   allNodes.length === nodesWithStars.length &&
    //   res.data.data.user.repositories.pageInfo.hasNextPage;
    hasNextPage = false // NOTE: Temporarily disable fetching of multiple pages.
    endCursor = res.data.data.user.repositories.pageInfo.endCursor;
  }

  return nodes
    .filter((data) => !repoToHide[data.name])
    .reduce((prev, curr) => prev + curr.stargazers.totalCount, 0);
};

/**
 * @param {string} username
 * @param {boolean} count_private
 * @param {boolean} include_all_commits
 * @returns {Promise<import("./types").StatsData>}
 */
async function fetchStats(
  username,
  count_private = false,
  include_all_commits = false,
  exclude_repo = [],
) {
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

  let res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
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

  // if include_all_commits then just get that,
  // since totalCommitsFetcher already sends totalCommits no need to +=
  if (include_all_commits) {
    stats.totalCommits = await totalCommitsFetcher(username);
  }

  // if count_private then add private commits to totalCommits so far.
  if (count_private) {
    stats.totalCommits +=
      user.contributionsCollection.restrictedContributionsCount;
  }

  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  // Retrieve stars while filtering out repositories to be hidden
  stats.totalStars = await totalStarsFetcher(username, repoToHide);

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
}

export { fetchStats };
export default fetchStats;
