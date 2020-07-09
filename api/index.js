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

  const stats = { totalStars: 0, contributedTo: 0, name: "", totalPRs: 0 };
  if (res.data.error) return stats;

  const user = res.data.data.user;
  stats.totalStars = user.repositories.nodes.reduce((prev, curr) => {
    return prev + curr.stargazers.totalCount;
  }, 0);

  stats.totalPRs = user.pullRequests.totalCount;
  stats.contributedTo = user.repositoriesContributedTo.totalCount;
  stats.name = user.name;
  return stats;
}

module.exports = async (req, res) => {
  const username = req.query.username;
  let { name, totalStars, totalPRs, contributedTo } = await fetchStats(
    username
  );

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(`
    <svg width="495" height="130" viewBox="0 0 495 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
    .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
    .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333 }
    .bold { font-weight: 700 }
    </style>
    <rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
    <text x="25" y="35" class="header">${name}'s github stats</text>
    <text x="25" y="70" class="stat bold">Total Stars:</text>
    <text x="135" y="70" class="stat">${totalStars}</text>
    <text x="25" y="90" class="stat bold">Total PRs:</text>
    <text x="135" y="90" class="stat">${totalPRs}</text>
    <text x="25" y="110" class="stat bold">Contributed to:</text>
    <text x="135" y="110" class="stat">${contributedTo} repos</text>
    </svg>
  `);
};
