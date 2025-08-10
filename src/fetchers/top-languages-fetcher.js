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
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
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
 * @typedef {import("./types").TopLangData} TopLangData Top languages data.
 */

/**
 * Fetch top languages for a given username.
 *
 * @param {string} username GitHub username.
 * @param {string[]} exclude_repo List of repositories to exclude.
 * @param {number} size_weight Weightage to be given to size.
 * @param {number} count_weight Weightage to be given to count.
 * @returns {Promise<TopLangData>} Top languages data.
 */
const fetchTopLanguages = async (
  username,
  exclude_repo = [],
  size_weight = 1,
  count_weight = 0,
) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const res = await retryer(fetcher, { login: username });

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
    .filter((name) => !repoToHide[name.name])
    .filter((node) => node.languages.edges.length > 0);

  // New normalized statistics logic: each repository contributes equal weight
  const normalizedLanguages = {};
  let totalRepoCount = 0;

  // Process each repository, normalize its language distribution
  repoNodes.forEach((repo) => {
    // Calculate total bytes for this repository
    const repoTotalSize = repo.languages.edges.reduce((sum, edge) => sum + edge.size, 0);
    
    if (repoTotalSize === 0) return; // Skip empty repositories
    
    totalRepoCount += 1;

    // Calculate normalized proportion for each language in this repository
    repo.languages.edges.forEach((edge) => {
      const langName = edge.node.name;
      const langColor = edge.node.color;
      const normalizedSize = edge.size / repoTotalSize; // Language proportion in current repository
      
      if (!normalizedLanguages[langName]) {
        normalizedLanguages[langName] = {
          name: langName,
          color: langColor,
          size: 0,
          count: 0,
        };
      }
      
      // Accumulate normalized proportions
      normalizedLanguages[langName].size += normalizedSize;
      normalizedLanguages[langName].count += 1;
    });
  });

  // Divide accumulated proportions by total repository count to get average proportions
  Object.keys(normalizedLanguages).forEach((langName) => {
    const lang = normalizedLanguages[langName];
    // Average proportion of this language across all repositories, then apply weights
    const avgProportion = lang.size / totalRepoCount;
    lang.size = Math.pow(avgProportion, size_weight) * Math.pow(lang.count, count_weight);
  });

  const topLangs = Object.keys(normalizedLanguages)
    .sort((a, b) => normalizedLanguages[b].size - normalizedLanguages[a].size)
    .reduce((result, key) => {
      result[key] = normalizedLanguages[key];
      return result;
    }, {});

  return topLangs;
};

export { fetchTopLanguages };
export default fetchTopLanguages;
