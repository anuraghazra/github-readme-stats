/**
 * @file Contains helper functions used in the scripts.
 */

import { getInput } from "@actions/core";

const OWNER = "anuraghazra";
const REPO = "github-readme-stats";

/**
 * Retrieve information about the repository that ran the action.
 *
 * @param {Object} context Action context.
 * @returns {Object} Repository information.
 */
export const getRepoInfo = (ctx) => {
  try {
    return {
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
    };
  } catch (error) {
    return {
      owner: OWNER,
      repo: REPO,
    };
  }
};

/**
 * Retrieve github token and throw error if it is not found.
 *
 * @returns {string} Github token.
 */
export const getGithubToken = () => {
  const token = getInput("github_token") || process.env.GITHUB_TOKEN;
  if (!token) {
    throw Error("Could not find github token");
  }
  return token;
};
