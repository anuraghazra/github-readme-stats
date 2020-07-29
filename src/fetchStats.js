const { request, logger, testPrimaryLanguage } = require("./utils");
const retryer = require("./retryer");
const calculateRank = require("./calculateRank");
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
          issues(first: 1) {
            totalCount
          }
          followers {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {direction: DESC, field: STARGAZERS}) {
            totalCount
            nodes {
              stargazers {
                totalCount
              }  
              primaryLanguage {
                name
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
    }
  );
};

async function fetchStats(username, count_private = false) {
  if (!username) throw Error("Invalid username");

  const stats = {
    name: "",
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 0,
    rank: { level: "C", score: 0 },
    primaryLanguages: [],
  };

  let res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  const user = res.data.data.user;
  const contributionCount = user.contributionsCollection;

  stats.name = user.name || user.login;
  stats.totalIssues = user.issues.totalCount;

  stats.totalCommits = contributionCount.totalCommitContributions;
  if (count_private) {
    stats.totalCommits =
      contributionCount.totalCommitContributions +
      contributionCount.restrictedContributionsCount;
  }

  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount;
  }, 0);
  stats.primaryLanguages = Array.from(
    new Set([
      // ...testPrimaryLanguage  // comment out for testing
      ...user.repositories.nodes
        .map((n) => n.primaryLanguage && n.primaryLanguage)
        .filter((n) => n)
        .map((n) => n["name"] && n["name"].toLowerCase()),
    ])
  ) || [];

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
