const axios = require("axios");
const githubUsernameRegex = require("github-username-regex");

const retryer = require("../common/retryer");
const calculateRank = require("../calculateRank");
const { request, logger, CustomError } = require("../common/utils");

require("dotenv").config();

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
    if (res.data.total_count) {
      return res.data.total_count;
    }
  } catch (err) {
    logger.log(err);
    // just return 0 if there is something wrong so that
    // we don't break the whole app
    return 0;
  }
};

// To get the all time number of repositories that the user has contributed to
const totalContributionsFetcher = async (username) => {
  if (!githubUsernameRegex.test(username)) {
    logger.log("Invalid username");
    return 0;
  }

  // To hold the repos the user has contributed to. The URL of the repo will be
  // the key, so that duplicates are automatically removed.
  let repos = {};

  const ITEMS_PER_PAGE = 100;

  const excludeReposOwnedByUser = `-user:${username}`;

  // https://developer.github.com/v3/search/#search-commits
  const fetchTotalCommits = (variables, token) => {
    return axios({
      method: "get",
      url: `https://api.github.com/search/commits?q=author:${variables.login} ${excludeReposOwnedByUser}&per_page=${ITEMS_PER_PAGE}&page=${variables.page}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `bearer ${token}`,
      },
    });
  };

  // https://developer.github.com/v3/search/#search-issues-and-pull-requests
  const fetchTotalIssues = (variables, token) => {
    return axios({
      method: "get",
      url: `https://api.github.com/search/issues?q=author:${variables.login} ${excludeReposOwnedByUser}&per_page=${ITEMS_PER_PAGE}&page=${variables.page}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `bearer ${token}`,
      },
    });
  };

  const fetchPage = async (fetcher, pageNum) => {
    let numPages = 0;

    let res = await retryer(fetcher, { login: username, page: pageNum });
    if (res === undefined) {
      logger.log("Response failed.");
      return numPages;
    }

    if (!res.data.items) {
      return numPages;
    }

    const numItems = res.data.total_count
    const numItemsPerPage = res.data.items.length;
    numPages = Math.ceil(numItems / numItemsPerPage);

    const items = res.data.items;

    items.forEach((item) => {
      let repoURL;

      switch(fetcher) {
        case fetchTotalCommits:
          repoURL = item.repository.url;
          break;
        case fetchTotalIssues:
          repoURL = item.repository_url;
          break;
      }

      if (repoURL) {
        repos[repoURL] = true;
      }
    });

    return numPages;
  }

  const fetchHandler = async (fetcher) => {
    // Fetch the first page to start with. This will give us the total number of
    // items we will have to find.
    const numPages = await fetchPage(fetcher, 1);

    let pageFetchers = [];
    for (let page = 2; page <= numPages; page++) {
      pageFetchers.push(fetchPage(fetcher, page));
    }

    await Promise.all(pageFetchers);
  }

  try {
    await Promise.all([
      fetchHandler(fetchTotalCommits),
      fetchHandler(fetchTotalIssues),
    ]);
  } catch(err) {
    logger.log(err);
  }

  return Object.keys(repos).length;
};

async function fetchStats(
  username,
  count_private = false,
  include_all_commits = false,
  include_all_contributions = false,
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

  let res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
    );
  }

  const user = res.data.data.user;

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

  if (include_all_contributions) {
    stats.contributedTo = await totalContributionsFetcher(username);
  } else {
    stats.contributedTo = user.repositoriesContributedTo.totalCount;
  }

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

module.exports = fetchStats;
