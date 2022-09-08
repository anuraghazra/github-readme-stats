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
      query userInfo($login: String!, $ownerAffiliations: [RepositoryAffiliation]) {
        user(login: $login) {
          # do not fetch forks
          repositories(ownerAffiliations: $ownerAffiliations, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
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
 * @param {string[]} ownerAffiliations
 * @param {string[]} exclude_repo
 * @returns {Promise<import("./types").TopLangData>}
 */
async function fetchTopLanguages(username, ownerAffiliations, exclude_repo = []) {
  if (!username) throw new MissingParamError(["username"]);

  // Set default value for ownerAffiliations in GraphQL query won't work because
  // parseArray() will always return an empty array even nothing was specified
  // and GraphQL would consider that empty arr as a valid value. Nothing will be
  // queried in that case as no affiliation is presented.
  ownerAffiliations = ownerAffiliations.length > 0 ? ownerAffiliations : ["OWNER"];
  const res = await retryer(fetcher, { login: username, ownerAffiliations });

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
  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((name) => !repoToHide[name.name]);

  repoNodes = repoNodes
    .filter((node) => node.languages.edges.length > 0)
    // flatten the list of language nodes
    .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
    .reduce((acc, prev) => {
      // get the size of the language (bytes)
      let langSize = prev.size;

      // if we already have the language in the accumulator
      // & the current language name is same as previous name
      // add the size to the language size.
      if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
        langSize = prev.size + acc[prev.node.name].size;
      }
      return {
        ...acc,
        [prev.node.name]: {
          name: prev.node.name,
          color: prev.node.color,
          size: langSize,
        },
      };
    }, {});

  const topLangs = Object.keys(repoNodes)
    .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});

  return topLangs;
}

module.exports = fetchTopLanguages;
