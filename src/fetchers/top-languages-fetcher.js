const { request, logger, clampValue } = require("../common/utils");
const retryer = require("../common/retryer");
require("dotenv").config();

const fetcher = (variables, token, retries, count_forks) => {
  const forks = count_forks == "true" ? `` : `isFork: false, `;
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos
          repositories(ownerAffiliations: OWNER, ${forks}first: 100) {
            nodes {
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
      variables
    },
    {
      Authorization: `bearer ${token}`
    }
  );
};

async function fetchTopLanguages(
  username,
  langsCount = 5,
  count_forks = false
) {
  if (!username) throw Error("Invalid username");

  langsCount = clampValue(parseInt(langsCount), 1, 10);

  const res = await retryer(fetcher, { login: username }, 0, count_forks);

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  let repoNodes = res.data.data.user.repositories.nodes;

  repoNodes = repoNodes
    .filter((node) => {
      return node.languages.edges.length > 0;
    })
    // flatten the list of language nodes
    .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
    .sort((a, b) => b.size - a.size)
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
          size: langSize
        }
      };
    }, {});

  const topLangs = Object.keys(repoNodes)
    .slice(0, langsCount)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});

  return topLangs;
}

module.exports = fetchTopLanguages;
