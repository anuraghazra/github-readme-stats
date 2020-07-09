const axios = require("axios");
require("dotenv").config();

async function fetchStats(username) {
  const res = await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    data: {
      query: `
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
      `,
      variables: {
        login: username,
      },
    },
  });

  const stats = {
    name: "",
    totalPRs: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 0,
  };
  if (res.data.error) return stats;

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

const renderSVG = (stats, options) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    contributedTo,
  } = stats;
  const { hide, show_icons } = options || {};

  const STAT_MAP = {
    stars: `
      <tspan x="25" dy="25" class="stat bold">
      <tspan class="icon star-icon" fill="#4C71F2">★</tspan> Total Stars:</tspan>
      <tspan x="155" dy="0" class="stat">${totalStars}</tspan>
    `,
    commits: `
      <tspan x="25" dy="25" class="stat bold">
      <tspan class="icon" fill="#4C71F2">🕗</tspan> Total Commits:</tspan>
      <tspan x="155" dy="0" class="stat">${totalCommits}</tspan>
    `,
    prs: `
      <tspan x="25" dy="25" class="stat bold">
      <tspan class="icon" fill="#4C71F2">🔀</tspan> Total PRs:</tspan>
      <tspan x="155" dy="0" class="stat">${totalPRs}</tspan>
    `,
    issues: `
      <tspan x="25" dy="25" class="stat bold">
      <tspan class="icon" fill="#4C71F2">ⓘ</tspan> Total Issues:</tspan>
      <tspan x="155" dy="0" class="stat">${totalIssues}</tspan>
    `,
    contribs: `
      <tspan x="25" dy="25" class="stat bold"><tspan class="icon" fill="#4C71F2">📕</tspan> Contributed to:</tspan>
      <tspan x="155" dy="0" class="stat">${contributedTo} repos</tspan> 
    `,
  };

  const statItems = Object.keys(STAT_MAP)
    .filter((key) => !hide.includes(key))
    .map((key) => STAT_MAP[key]);

  const height = 45 + (statItems.length + 1) * 25;

  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
      .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333 }
      .star-icon { font: 600 17px 'Segoe UI', Ubuntu, Sans-Serif; }
      .bold { font-weight: 700 }
      .icon {
        display: none;
        ${show_icons && "display: block"}
      }
      </style>
      <rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
     
      <text x="25" y="35" class="header">${name}'s github stats</text>
      <text y="45">
        ${statItems}
      </text>
    </svg>
  `;
};

module.exports = async (req, res) => {
  const username = req.query.username;
  const hide = req.query.hide;
  const show_icons = req.query.show_icons;
  let {
    name,
    totalPRs,
    totalCommits,
    totalStars,
    totalIssues,
    contributedTo,
  } = await fetchStats(username);

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(
    renderSVG(
      {
        name,
        totalStars,
        totalCommits,
        totalIssues,
        totalPRs,
        contributedTo,
      },
      { hide: JSON.parse(hide || "[]"), show_icons }
    )
  );
};
