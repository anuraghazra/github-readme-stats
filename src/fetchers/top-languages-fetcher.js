// @ts-check
import { retryer } from "../common/retryer.js";
import {
  CustomError,
  logger,
  MissingParamError,
  request,
  wrapTextMultiline,
} from "../common/utils.js";

/**
 * @typedef {import("axios").AxiosRequestHeaders} AxiosRequestHeaders Axios request headers.
 * @typedef {import("axios").AxiosResponse} AxiosResponse Axios response.
 */

/**
 * Top languages fetcher object.
 *
 * @param {AxiosRequestHeaders} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<AxiosResponse>} Languages fetcher response.
 */
const fetcher = (variables, token) => {
  console.log("Variables:", variables, "Token:", token);
  return request(
    {
      query: `
      query userInfo($login: String!, $isFork: Boolean!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: $isFork, first: 100) {
            nodes {
              name
              languages(first: 20, orderBy: {field: SIZE, direction: DESC}) {
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
 * @typedef {import("./types").TopLangData} TopLangData Top languages data.
 */

/**
 * Fetch top languages for a given username.
 *
 * @param {string} username GitHub username.
 * @param {string} language 要聚合的语言.
 * @param {string[]} exclude_repo List of repositories to exclude.
 * @param {number} size_weight Weightage to be given to size.
 * @param {number} count_weight Weightage to be given to count.
 * @param {boolean} isFork 是否计算Fork仓库
 * @returns {Promise<TopLangData>} Top languages data.
 */
const fetchTopLanguages = async (
  username,
  language,
  exclude_repo = [],
  size_weight = 1,
  count_weight = 0,
  isFork = false,
) => {
  console.log("Language:",language,language==undefined,language===undefined)
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const res = await retryer(fetcher, { login: username, isFork });

  if (res.data.errors) {
    logger.error(res.data.errors);
    if (res.data.errors[0].type === "NOT_FOUND") {
      throw new CustomError(
        res.data.errors[0].message || "Could not fetch user.",
        CustomError.USER_NOT_FOUND,
      );
    }
    if (res.data.errors[0].message) {
      throw new CustomError(
        wrapTextMultiline(res.data.errors[0].message, 90, 1)[0],
        res.statusText,
      );
    }
    throw new CustomError(
      "Something went wrong while trying to retrieve the language data using the GraphQL API.",
      CustomError.GRAPHQL_ERROR,
    );
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

  let repoCount = 0;
  const totalRepoCount = Object.keys(repoNodes).length;
  repoNodes = repoNodes.filter((node) => node.languages.edges.length > 0);
  const emptyRepoCount = totalRepoCount - Object.keys(repoNodes).length;
  console.log(`Repo(isFork:${isFork}): Total`, totalRepoCount, `Empty`, emptyRepoCount, "Left ", totalRepoCount - emptyRepoCount);
  if (language===undefined) {
    repoNodes = repoNodes
      // flatten the list of language nodes
      .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
      .reduce((acc, prev) => {
        // get the size of the language (bytes)
        let langSize = prev.size;

        // if we already have the language in the accumulator
        // & the current language name is same as previous name
        // add the size to the language size and increase repoCount.
        if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
          langSize = prev.size + acc[prev.node.name].size;
          repoCount += 1;
        } else {
          // reset repoCount to 1
          // language must exist in at least one repo to be detected
          repoCount = 1;
        }
        return {
          ...acc,
          [prev.node.name]: {
            name: prev.node.name,
            color: prev.node.color,
            size: langSize,
            count: repoCount,
          },
        };
      }, {});
    Object.keys(repoNodes).forEach((name) => {
      // comparison index calculation
      repoNodes[name].size =
        Math.pow(repoNodes[name].size, size_weight) *
        Math.pow(repoNodes[name].count, count_weight);
    });
  } else {
    repoNodes = repoNodes
      // flatten the list of language nodes
      .filter((node) => {
        const res = node.languages.edges.some(item=>item.node.name===language)
        console.log("node:",node.name, node.languages.edges,res);
        return res;
      }, []);
    console.log("RepoNodes after change:", repoNodes);
    Object.keys(repoNodes).forEach((name) => {
      // comparison index calculation
      repoNodes[name].size = repoNodes[name].languages.edges.find(item=>item.node.name===language).size;
    });
  }


  const topLangs = Object.keys(repoNodes)
    .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});
  console.log("TopLanguage:", Object.keys(topLangs).length, topLangs);
  return topLangs;
};

export { fetchTopLanguages };
export default fetchTopLanguages;
