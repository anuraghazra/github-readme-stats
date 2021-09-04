import axios from "axios";
import githubUsernameRegex from "github-username-regex";

import { retry, request, Fetcher, calculateRank } from "../../utils/github";
import { logger } from "../../utils/debug";
import { FetchStatError, URLQueryError } from "../../helpers/Error";

const fetcher: Fetcher = (variables, token) => {
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
          repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
          pullRequests(first: 1) {
            totalCount
          }
          issues(first: 1) {
            totalCount
          }
          followers {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
            totalCount
            nodes {
              stargazers {
                totalCount
              }
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
const totalCommitsFetcher = async (username: string) => {
  if (!githubUsernameRegex.test(username)) {
    throw new URLQueryError(URLQueryError.TYPE.INVALID, "username");
  }

  // https://developer.github.com/v3/search/#search-commits
  const fetchTotalCommits: Fetcher = (variables, token) => {
    return axios({
      method: "get",
      url: `https://api.github.com/search/commits?q=author:${variables.login}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `bearer ${token}`,
      },
    });
  };

  try {
    let res = await retry(fetchTotalCommits, { login: username });
    return res?.data?.total_count;
  } catch (err) {
    logger.log(err);
    // just return 0 if there is something wrong so that
    // we don't break the whole app
    return 0;
  }
};


export interface IStats {
    name: string,
    totalPRs: number,
    totalCommits: number,
    totalIssues: number,
    totalStars: number,
    contributedTo: number,
    rank: { level: string, score: number },
}
export default async function fetchStats(
  username: string,
  count_private = false,
  include_all_commits = false,
): Promise<IStats> {
  const stats = {
    name: "",
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 0,
    rank: { level: "C", score: 0 },
  };

  let res = await retry(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new FetchStatError(
      FetchStatError.TYPE.USER_NOT_FOUND,
      res.data.errors[0].message,
    );
  }

  const user = res.data.data.user;

  stats.name = user.name || user.login;
  stats.totalIssues = user.issues.totalCount;

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

  stats.totalStars = user.repositories.nodes.reduce(
    (prev: number, curr: { stargazers: { totalCount: number } }) => {
      return prev + curr.stargazers.totalCount;
    },
    0,
  );

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
