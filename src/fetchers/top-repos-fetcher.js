// @ts-check
const { request, logger, MissingParamError } = require("../common/utils");
const retryer = require("../common/retryer");
require("dotenv").config();

/**
 * @param {import('Axios').AxiosRequestHeaders} variables
 * @param {string} token
 */
const fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          repositories(
            ownerAffiliations: OWNER
            isFork: false
            first: 10
            orderBy: {field: STARGAZERS, direction: DESC}
          ) {
            nodes {
              name
              forkCount
              stargazerCount
            }
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `token ${token}`,
    },
  );
};

/**
 * @param {string} username
 * @param {string} sortBy
 * @param {string[]} exclude_repo
 * @returns {Promise<import("./types").TopRepoData>}
 */
async function fetchTopRepos(username, sortBy, exclude_repo = []) {
  if (!username) throw new MissingParamError(["username"]);

  const res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  let repoNodes = res.data.data.user.repositories.nodes;
  let repoToHide = {};

  // populate repoToHide map for quick lookup
  // while filtering out
  if (exclude_repo) {
    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  // filter out repositories to be hidden
  if (sortBy === "fork") {
    repoNodes = repoNodes
      .sort((a, b) => b.forkCount - a.forkCount)
      .filter((name) => {
        return !repoToHide[name.name];
      });
  } else {
    repoNodes = repoNodes
      .filter((name) => {
        return !repoToHide[name.name];
      });
  }
  return repoNodes;
}

module.exports = fetchTopRepos;
