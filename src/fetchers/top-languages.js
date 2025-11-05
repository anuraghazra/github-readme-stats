// @ts-check

import { retryer } from "../common/retryer.js";
import { logger } from "../common/log.js";
import { excludeRepositories } from "../common/envs.js";
import { CustomError, MissingParamError } from "../common/error.js";
import { wrapTextMultiline } from "../common/fmt.js";
import { request } from "../common/http.js";

/**
 * Top languages fetcher object.
 *
 * @param {any} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import("axios").AxiosResponse>} Languages fetcher response.
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
                  }
                }
              }
            }
          }
          # fetch user gists (public only) - NEW: Include gists in language calculation
          gists(first: 100, privacy: PUBLIC, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              files(first: 10) {
                name
                language {
                  name
                  color
                }
                size
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
  const gistNodes = res.data.data.user.gists.nodes; // NEW: Extract gist nodes from GraphQL response
  /** @type {Record<string, boolean>} */
  let repoToHide = {};
  const allExcludedRepos = [...exclude_repo, ...excludeRepositories];

  // populate repoToHide map for quick lookup
  // while filtering out
  if (allExcludedRepos) {
    allExcludedRepos.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  // filter out repositories to be hidden
  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((name) => !repoToHide[name.name]);

  let repoCount = 0;

  repoNodes = repoNodes
    .filter((node) => node.languages.edges.length > 0)
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

  // Process gists - NEW: Aggregate languages from user's public gists
  // Unlike repositories which have pre-aggregated language stats, gists have individual files
  // that need to be processed to calculate language usage
  const gistLanguages = gistNodes
    .filter((node) => node.files && node.files.length > 0) // Only gists with files
    .reduce((acc, gist) => {
      // Group files by language within this gist
      const gistLangs = gist.files
        .filter((file) => file.language) // only files with detected languages
        .reduce((gistAcc, file) => {
          const langName = file.language.name;
          if (gistAcc[langName]) {
            gistAcc[langName].size += file.size;
          } else {
            gistAcc[langName] = {
              name: langName,
              color: file.language.color,
              size: file.size,
            };
          }
          return gistAcc;
        }, {});

      // For each language in this gist, add to the global accumulator
      Object.keys(gistLangs).forEach((langName) => {
        if (acc[langName]) {
          // Language already exists - add size and increment count
          acc[langName].size += gistLangs[langName].size;
          acc[langName].count += 1; // Count represents number of gists containing this language
        } else {
          // First time seeing this language
          acc[langName] = {
            name: langName,
            color: gistLangs[langName].color,
            size: gistLangs[langName].size,
            count: 1, // Count represents number of gists containing this language
          };
        }
      });

      return acc;
    }, {});

  // Merge repo and gist languages - NEW: Combine language data from both sources
  // This ensures that languages used in both repositories and gists are properly aggregated
  // Languages only in gists will be added, and languages in both will have their stats combined
  const allLanguages = { ...repoNodes };
  Object.keys(gistLanguages).forEach((langName) => {
    if (allLanguages[langName]) {
      // Language exists in both repos and gists - combine the stats
      allLanguages[langName].size += gistLanguages[langName].size;
      allLanguages[langName].count += gistLanguages[langName].count;
    } else {
      // Language only in gists - add it to the combined results
      allLanguages[langName] = gistLanguages[langName];
    }
  });

  Object.keys(allLanguages).forEach((name) => {
    // comparison index calculation
    allLanguages[name].size =
      Math.pow(allLanguages[name].size, size_weight) *
      Math.pow(allLanguages[name].count, count_weight);
  });

  const topLangs = Object.keys(allLanguages)
    .sort((a, b) => allLanguages[b].size - allLanguages[a].size)
    .reduce((result, key) => {
      result[key] = allLanguages[key];
      return result;
    }, {});

  return topLangs;
};

export { fetchTopLanguages };
export default fetchTopLanguages;
