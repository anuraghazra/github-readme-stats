import { CustomError, logger, request } from "../common/utils";

import axios from "axios";
import { calculateRank } from "../calculateRank";
import { config } from "dotenv";
import githubUsernameRegex from "github-username-regex";
import { retryer } from "../common/retryer";

config();

function fetcher(variables: { login: string }, token: string) {
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
}

//? https://github.com/anuraghazra/github-readme-stats/issues/92#issuecomment-661026467
//? https://github.com/anuraghazra/github-readme-stats/pull/211/
async function totalCommitsFetcher(username: string) {
  if (!githubUsernameRegex.test(username)) {
    logger.log("Invalid username");
    return 0;
  }

  //? https://developer.github.com/v3/search/#search-commits
  function fetchTotalCommits(variables: { login: string }, token: string) {
    return axios({
      method: "get",
      url: `https://api.github.com/search/commits?q=author:${variables.login}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `bearer ${token}`,
      },
    });
  }

  try {
    const res = await retryer(fetchTotalCommits, { login: username });
    if (res.data.total_count) {
      return res.data.total_count;
    }
  } catch (err) {
    logger.log(err);
    //* just return 0 if there is something wrong so that
    //* we don't break the whole app
    return 0;
  }
}

export async function fetchStats(
  username: string,
  count_private = false,
  include_all_commits = false,
) {
  if (!username) throw Error("Invalid username");

  const stats = {
    name: "",
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 0,
    rank: { level: "C", score: 0 },
  };

  const res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
    );
  }

  const user = res.data.data.user;

  stats.name = user.name || user.login;
  stats.totalIssues = user.issues.totalCount;

  //* normal commits
  stats.totalCommits = user.contributionsCollection.totalCommitContributions;

  //* if include_all_commits then just get that,
  //* since totalCommitsFetcher already sends totalCommits no need to +=
  if (include_all_commits) {
    stats.totalCommits = await totalCommitsFetcher(username);
  }

  //* if count_private then add private commits to totalCommits so far.
  if (count_private) {
    stats.totalCommits +=
      user.contributionsCollection.restrictedContributionsCount;
  }

  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
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
}
