const { request, logger } = require("../common/utils");
const retryer = require("../common/retryer");
require("dotenv").config();

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!, $first: Int!, $after: String) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(
            ownerAffiliations: OWNER, isFork: false, 
            first: $first, after: $after
          ) {
            edges {
              cursor
            }
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
      Authorization: `bearer ${token}`,
    },
  );
};

async function fetchTopLanguages(username, exclude_repo = []) {
  if (!username) throw Error("Invalid username");

  const pageSize = 100;
  let pageCursor = null;

  let repoNodes = [];

  while (true) {
    const variables = { login: username, first: pageSize, after: pageCursor };
    const res = await retryer(fetcher, variables);

    if (res.data.errors) {
      logger.error(res.data.errors);
      throw Error(res.data.errors[0].message || "Could not fetch user");
    }

    repoNodes = repoNodes.concat(res.data.data.user.repositories.nodes);
    if (!res.data.data.user.repositories.edges ||
      res.data.data.user.repositories.edges.length < pageSize) {
      break;
    }
    pageCursor = res.data.data.user.repositories.edges[pageSize - 1].cursor;
  }

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
    .filter((name) => {
      return !repoToHide[name.name];
    });

  repoNodes = repoNodes
    .filter((node) => {
      return node.languages.edges.length > 0;
    })
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
