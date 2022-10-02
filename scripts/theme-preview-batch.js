/**
 * @file Apply preview-theme script to all theme pull requests.
 */

import { debug, setFailed } from "@actions/core";
import { getGithubToken, getRepoInfo } from "./helpers.js";
import { run as previewTheme } from "./preview-theme.js";
import github from "@actions/github";
import { fetchOpenPRs, pullsWithLabel } from "./close-stale-theme-prs.js";

/**
 * Get all pull request that do not contain a given label.
 * @param pull The pull requests to check.
 * @param label The label to check for.
 * @returns Whether the pull request contains the label.
 */
export const pullsWithoutLabel = (pulls, label) => {
  return pulls.filter((pr) => {
    return pr.labels.nodes.some((lab) => lab.name !== label);
  });
};

/**
 * Main function.
 */
const run = async () => {
  try {
    // Create octokit client.
    const dryRun = process.env.DRY_RUN === "true" || false;
    debug("Creating octokit client...");
    const octokit = github.getOctokit(getGithubToken());
    const { owner, repo } = getRepoInfo(github.context);

    // Retrieve all theme pull requests.
    debug("Retrieving all theme pull requests...");
    const prs = await fetchOpenPRs(octokit, owner, repo);
    let themePRs = pullsWithLabel(prs, "themes");
    themePRs = pullsWithoutLabel(themePRs, "invalid");
    debug(`Found ${themePRs.length} theme PRs`);

    // Loop through all theme PR and execute the theme-preview script.
    for (const pr of themePRs) {
      debug(`Applying theme-preview to #${pr.number}...`);
      console.log("Pull request number: ", pr.number);
      if (!dryRun) {
        await previewTheme(pr.number);
      }
    }
  } catch (error) {
    setFailed(error.message);
  }
};

run();
