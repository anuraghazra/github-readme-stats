const { request } = require("./utils");
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
          publicOwnedRepo:repositories(privacy: PUBLIC,ownerAffiliations:OWNER,isFork: false) {
            totalCount
          }
          privateOwnedRepo:repositories(privacy: PRIVATE,ownerAffiliations:OWNER,isFork: false) {
            totalCount
          }
          publicGist:gists(privacy: PUBLIC) {
            totalCount
          }
          secretGist:gists(privacy: SECRET) {
            totalCount
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

  let res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    console.log(res.data.errors);
    if(res.data.errors[0].message!=="You don't have permission to see gists."){
      throw Error(res.data.errors[0].message || "Could not fetch user");
    }
  }

  const user = res.data.data.user;

  stats.name = user.name || user.login;
  stats.totalIssues = user.issues.totalCount;
  stats.totalCommits = user.contributionsCollection.totalCommitContributions;
  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;
  stats.publicRepos = user.publicOwnedRepo.totalCount;
  stats.privateRepos = user.privateOwnedRepo.totalCount;
  stats.publicGists = user.publicGist.totalCount;
  stats.secretGists = user.secretGist.totalCount;

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
