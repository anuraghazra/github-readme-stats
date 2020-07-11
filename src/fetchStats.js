const { request } = require("./utils");
require("dotenv").config();

async function fetchStats(username) {
  if (!username) throw Error("Invalid username");

  const res = await request(`
    query userInfo($login: String!) {
      user(login: $login) {
        name
        repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
        }
        pullRequests(first: 100) {
          totalCount
        }
        issues(first: 100) {
          totalCount
        }
        repositories(first: 100) {
          nodes {
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `, { login: username });

  const stats = {
    name: "",
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 0,
  };

  if (res.data.errors) {
    console.log(res.data.errors);
    throw Error("Could not fetch user");
  }

  const user = res.data.data.user;

  stats.name = user.name;
  stats.totalIssues = user.issues.totalCount;
  stats.totalCommits = user.contributionsCollection.totalCommitContributions;
  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount;
  }, 0);

  return stats;
}

module.exports = fetchStats;
