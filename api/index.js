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
    totalIssues: 0,
    totalStars: 0,
    contributedTo: 0,
  };
  if (res.data.error) return stats;

  const user = res.data.data.user;

  stats.name = user.name;
  stats.totalIssues = user.issues.totalCount;
  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount;
  }, 0);

  return stats;
}

const renderSVG = (stats, options) => {
  const { name, totalStars, totalIssues, totalPRs, contributedTo } = stats;
  const { hide } = options || {};
  const height = 150 - hide.length * 20;

  const STAT_MAP = {
    stars: `
      <tspan x="25" dy="20" class="stat bold"> Total Stars:</tspan>
      <tspan x="135" dy="0" class="stat">${totalStars}</tspan>
    `,
    prs: `
      <tspan x="25" dy="20" class="stat bold">Total PRs:</tspan>
      <tspan x="135" dy="0" class="stat">${totalPRs}</tspan>
    `,
    issues: `
      <tspan x="25" dy="20" class="stat bold">Total Issues:</tspan>
      <tspan x="135" dy="0" class="stat">${totalIssues}</tspan>
    `,
    contribs: `
      <tspan x="25" dy="20" class="stat bold">Contributed to:</tspan>
      <tspan x="135" dy="0" class="stat">${contributedTo} repos</tspan> 
    `,
  };

  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
      .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333 }
      .bold { font-weight: 700 }
      </style>
      <rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>

      <text x="25" y="35" class="header">${name}'s github stats</text>
      <text y="45">
        ${Object.keys(STAT_MAP)
          .filter((key) => !hide.includes(key))
          .map((key) => STAT_MAP[key])}
      </text>
    </svg>
  `;
};

module.exports = async (req, res) => {
  const username = req.query.username;
  const hide = req.query.hide;
  let {
    name,
    totalPRs,
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
        totalIssues,
        totalPRs,
        contributedTo,
      },
      { hide: JSON.parse(hide || "[]") }
    )
  );
};
