const axios = require("axios");
const { renderError, kFormatter, encodeHTML } = require("../utils");
require("dotenv").config();

async function fetchRepo(username, reponame) {
  const res = await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    data: {
      query: `
        fragment RepoInfo on Repository {
          name
          stargazers {
            totalCount
          }
          description
          primaryLanguage {
            color
            id
            name
          }
          forkCount
        }
        query getRepo($login: String!, $repo: String!) {
          user(login: $login) {
            repository(name: $repo) {
              ...RepoInfo
            }
          }
          organization(login: $login) {
            repository(name: $repo) {
              ...RepoInfo
            }
          }
        }
      `,
      variables: {
        login: username,
        repo: reponame,
      },
    },
  });

  const data = res.data.data;

  if (!data.user && !data.organization) {
    throw new Error("Not found");
  }

  if (data.organization === null && data.user) {
    if (!data.user.repository) {
      throw new Error("User Repository Not found");
    }
    return data.user.repository;
  }

  if (data.user === null && data.organization) {
    if (!data.organization.repository) {
      throw new Error("Organization Repository Not found");
    }
    return data.organization.repository;
  }
}

const renderRepoCard = (repo) => {
  const { name, description, primaryLanguage, stargazers, forkCount } = repo;
  const height = 120;
  const shiftText = primaryLanguage.name.length > 15 ? 0 : 30;

  let desc = description || "No description provided";
  if (desc.length > 55) {
    desc = `${description.slice(0, 55)}..`;
  }

  return `
    <svg width="400" height="${height}" viewBox="0 0 400 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
      .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
      .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333 }
      .star-icon { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; }
      .bold { font-weight: 700 }
      .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: #586069 }
      .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #586069 }
      </style>
      <rect x="0.5" y="0.5" width="399" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
      <svg x="25" y="25" viewBox="0 0 16 16" version="1.1" width="16" height="16" fill="#586069">
        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
      </svg>

      <text x="50" y="38" class="header">${name}</text>
      <text class="description" x="25" y="70">${encodeHTML(desc)}</text>
      
      <g transform="translate(30, 100)">
        <circle cx="0" cy="-5" r="6" fill="${primaryLanguage.color}" />
        <text class="gray" x="15">${primaryLanguage.name}</text>
      </g>
      
      <g transform="translate(${155 - shiftText}, 100)">
        <svg y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16" fill="#586069">
          <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>
        <text class="gray" x="25">${kFormatter(stargazers.totalCount)}</text>
      </g>

      <g transform="translate(${220 - shiftText}, 100)">
        <svg y="-12" viewBox="0 0 16 16" version="1.1" width="16" height="16" fill="#586069">
          <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
        </svg>
        <text class="gray" x="25">${kFormatter(forkCount)}</text>
      </g>
    </svg>
  `;
};

module.exports = async (req, res) => {
  const { username, repo } = req.query;

  let repoData;
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    repoData = await fetchRepo(username, repo);
  } catch (err) {
    console.log(err);
    return res.send(renderError(err.message));
  }

  res.send(renderRepoCard(repoData));
};
