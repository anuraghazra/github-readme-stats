const { request } = require("./utils");
const retryer = require("./retryer");
const calculateRank = require("./calculateRank");
require("dotenv").config();

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!,$startDate: DateTime!,$endDate: DateTime!) {
        user(login: $login) {
          name
          login
          contributionsCollection(from: $startDate, to: $endDate) {
            contributionCalendar {
              totalContributions
            }
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

async function fetchStats(username) {
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

  // Contribution start and end date
  var currDate=new Date()
  var endDate=currDate.toISOString();
  var startDate=new Date(currDate.setYear(currDate.getUTCFullYear() - 1)).toISOString();

  let res = await retryer(fetcher, { login: username, startDate: startDate, endDate: endDate });

  if (res.data.errors) {
    console.log(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  const user = res.data.data.user;

  stats.name = user.name || user.login;
  stats.totalIssues = user.issues.totalCount;
  stats.totalCommits = user.contributionsCollection.contributionCalendar.totalContributions;
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

module.exports = fetchStats;
