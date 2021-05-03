const { request, logger, CustomError } = require("../common/utils");
const axios = require("axios");
const retryer = require("../common/retryer");
const calculateRank = require("../calculateRank");
const githubUsernameRegex = require("github-username-regex");

require("dotenv").config();

const yearsOfContribFetcher = `
      query userInfo($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionYears
          }
        }
      }
      `;
const queryParts = {
  yearTemplate: `
  year_{year}: contributionsCollection(from: "{year}-01-01T00:00:00Z", to: "{next_year}-01-01T00:00:00Z") {
    totalCommitContributions
    totalRepositoryContributions
    restrictedContributionsCount
    commitContributionsByRepository{
      repository{
        name
        stargazers{
          totalCount
        }
      }
    }
  }
  `,
  query: `
    query userInfo($login: String!) {
    user(login: $login) {
      name
      login
      {contributionsCollection}
      pullRequests(first: 1) {
        totalCount
      }
      issues(first: 1) {
        totalCount
      }
      followers {
        totalCount
      }
    }
  }`

}
const fetcher = (variables, token, query) => {
  return request(
    {
      query: query,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    },
  );
};

function buildQuery(contributionYears) {
  var buildedQuery = "";
  contributionYears.forEach(element => {
    // some crash happens before 2014
    if (element > 2013)
      buildedQuery += queryParts.yearTemplate.replace(/\{year\}/g, element).replace(/\{next_year\}/g, element + 1);
  });
  buildedQuery = queryParts.query.replace(/\{contributionsCollection\}/g, buildedQuery);
  return buildedQuery;
}

async function fetchStats(username, count_private) {
  if (!username) throw Error("Invalid username");

  const stats = {
    name: "",
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalRepos: 0,
    totalStars: 0,
    contributedTo: 0,
    rank: { level: "C", score: 0 },
  };

  let yearsOfContributions = await retryer(fetcher, { login: username }, yearsOfContribFetcher);

  if (yearsOfContributions.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
    );
  }
  let years = yearsOfContributions.data.data.user.contributionsCollection.contributionYears;
  let buildedQuery = buildQuery(years);

  let res = await retryer(fetcher, { login: username }, buildedQuery);
  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new CustomError(
      res.data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
    );
  }

  const user = res.data.data.user;

  stats.name = user.name || user.login;


  // total commits
  let repoStars = [];
  years.forEach(element => {
    let yearContributionCollection = user["year_" + element];
    if (yearContributionCollection) {
      stats.totalCommits += yearContributionCollection.totalCommitContributions;
      stats.totalRepos += yearContributionCollection.totalRepositoryContributions;
      // if count_private then add private commits to totalCommits so far.
      if (count_private) {
        stats.totalCommits += yearContributionCollection.restrictedContributionsCount;
      }
      let repo = yearContributionCollection.commitContributionsByRepository.map(m => m.repository);

      repoStars = repoStars.concat(repo).filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.name === item.name
        ))
      );
    }
  });

  repoStars.forEach(f => {
    stats.totalStars += f.stargazers.totalCount;
  });
  stats.contributedTo = repoStars.length;
  stats.totalPRs = user.pullRequests.totalCount;
  stats.totalIssues = user.issues.totalCount;

  stats.rank = calculateRank({
    totalCommits: stats.totalCommits,
    totalRepos: stats.totalRepos,
    followers: user.followers.totalCount,
    contributions: stats.contributedTo,
    stargazers: stats.totalStars,
    prs: stats.totalPRs,
    issues: stats.totalIssues,
  });

  return stats;


}

module.exports = fetchStats;
