const { request } = require("./utils");
const calculateRank = require("./calculateRank");
require("dotenv").config();

// creating a fetcher function to reduce duplication
const fetcher = (username, token) => {
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
          repositories(first: 100, orderBy: { direction: DESC, field: STARGAZERS }) {
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
      variables: { login: username },
    },
    {
      // set the token
      Authorization: `bearer ${token}`,
    }
  );
};

async function retryer(username, RETRIES) {
  try {
    console.log(`Trying PAT_${RETRIES + 1}`);

    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    let response = await fetcher(username, process.env[`PAT_${RETRIES + 1}`]);

    // if rate limit is hit increase the RETRIES and recursively call the retryer
    // with username, and current RETRIES
    if (
      response.data.errors &&
      response.data.errors[0].type === "RATE_LIMITED"
    ) {
      console.log(`PAT_${RETRIES} Failed`);
      RETRIES++;
      // directly return from the function
      return await retryer(username, RETRIES);
    }

    // finally return the response
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function fetchStats(username) {
  let RETRIES = 0;
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

  let res = await retryer(username, RETRIES);

  if (res.data.errors) {
    console.log(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  const user = res.data.data.user;

  stats.name = user.name || user.login;
  stats.totalIssues = user.issues.totalCount;
  stats.totalCommits = user.contributionsCollection.totalCommitContributions;
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
