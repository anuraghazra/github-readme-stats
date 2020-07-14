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
              contributionYears
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

  // FETCH ALL COMMITS
  let commitPromises = user.contributionsCollection.contributionYears.map(
    async (year) => {
      // Don't fetch contributions older than 2008 (Perf optimization)
      if (year < 2008) {
        return {
          user: { contributionsCollection: { totalCommitContributions: 0 } },
        };
      }

      const currentDate = new Date();
      currentDate.setFullYear(year, 0, 0);

      const res = await axios({
        url: "https://api.github.com/graphql",
        method: "post",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        data: {
          query: `
          query userInfo($login: String!, $from: DateTime!) {
            user(login: $login) {
              contributionsCollection(from: $from) {
                totalCommitContributions
              }
            }
          }
        `,
          variables: {
            login: username,
            from: currentDate.toISOString(),
          },
        },
      });

      console.log(
        currentDate.toDateString(),
        res.data.data.user.contributionsCollection.totalCommitContributions
      );
      return res.data.data;
    }
  );

  const allCommits = await Promise.all(commitPromises);

  const totalCommits = allCommits.reduce((preYear, currYear) => {
    return (
      preYear + currYear.user.contributionsCollection.totalCommitContributions
    );
  }, 0);

  stats.name = user.name;
  stats.totalIssues = user.issues.totalCount;
  stats.totalCommits = totalCommits;
  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;

  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount;
  }, 0);

  return stats;
}

const createTextNode = (icon, label, value, lheight) => {
  return `
    <tspan x="25" dy="${lheight}" class="stat bold">
    <tspan class="icon ${
      icon === "★" && "star-icon"
    }" fill="#4C71F2">${icon}</tspan> ${label}:</tspan>
    <tspan x="155" dy="0" class="stat">${value}</tspan>
  `;
};

const renderSVG = (stats, options) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    contributedTo,
  } = stats;
  const { hide, show_icons, hide_border, line_height } = options || {};

  const lheight = line_height || 25;

  const STAT_MAP = {
    stars: createTextNode("★", "Total Stars", totalStars, lheight),
    commits: createTextNode("🕗", "Total Commits", totalCommits, lheight),
    prs: createTextNode("🔀", "Total PRs", totalPRs, lheight),
    issues: createTextNode("ⓘ", "Total Issues", totalIssues, lheight),
    contribs: createTextNode("📕", "Contributed to", contributedTo, lheight),
  };

  const statItems = Object.keys(STAT_MAP)
    .filter((key) => !hide.includes(key))
    .map((key) => STAT_MAP[key]);

  const height = 45 + (statItems.length + 1) * lheight;

  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
      .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333 }
      .star-icon { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; }
      .bold { font-weight: 700 }
      .icon {
        display: none;
        ${!!show_icons && "display: block"}
      }
      </style>
      ${
        !hide_border &&
        `<rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>`
      }
     
      <text x="25" y="35" class="header">${name}'s GitHub Stats</text>
      <text y="45">
        ${statItems}
      </text>
    </svg>
  `;
};

module.exports = async (req, res) => {
  const username = req.query.username;
  const hide = req.query.hide;
  const hide_border = req.query.hide_border;
  const show_icons = req.query.show_icons;
  const line_height = req.query.line_height;

  const stats = await fetchStats(username);

  res.setHeader('Cache-Control', 's-maxage=300');
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(
    renderSVG(stats, {
      hide: JSON.parse(hide || "[]"),
      show_icons,
      hide_border,
      line_height,
    })
  );
};
