require("dotenv").config();
import { request, logger } from "../utils";
import retryer from "../utils/retryer";

export default async function fetchTopLanguages(username) {
  if (!username) throw Error("Invalid username");

  let res = await retryer(
    (variables, token) => {
      return request(
        {
          query: `
        query userInfo($login: String!) {
          user(login: $login) {
            repositories(isFork: false, first: 100) {
              nodes {
                languages(first: 1) {
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
        }
      );
    },
    { login: username }
  );

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw Error(res.data.errors[0].message || "Could not fetch user");
  }

  let repoNodes = res.data.data.user.repositories.nodes;

  // TODO: perf improvement
  repoNodes = repoNodes
    .filter((node) => {
      return node.languages.edges.length > 0;
    })
    .sort((a, b) => {
      return b.languages.edges[0].size - a.languages.edges[0].size;
    })
    .map((node) => {
      return node.languages.edges[0];
    })
    .reduce((acc, prev) => {
      let langSize = prev.size;
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
    .slice(0, 5)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});

  return topLangs;
}
