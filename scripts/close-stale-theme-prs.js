/**
 * @file Script that can be used to close stale theme PRs that have a `invalid` label.
 */
import * as dotenv from "dotenv";
dotenv.config();

import { debug, setFailed } from "@actions/core";
import github from "@actions/github";
import { RequestError } from "@octokit/request-error";
import { getGithubToken, getRepoInfo } from "./helpers.js";

// Script parameters
const CLOSING_COMMENT = `
	\rThis PR has been automatically closed due to inactivity. Please feel free to reopen it if you need to continue working on it.\
	\rThank you for your contributions.
`;

/**
 * Fetch open PRs from a given repository.
 * @param user The user name of the repository owner.
 * @param repo The name of the repository.
 * @returns The open PRs.
 */
export const fetchOpenPRs = async (octokit, user, repo) => {
  const openPRs = [];
  let hasNextPage = true;
  let endCursor;
  while (hasNextPage) {
    try {
      const { repository } = await octokit.graphql(
        `
            {
              repository(owner: "${user}", name: "${repo}") {
                open_prs: pullRequests(${
                  endCursor ? `after: "${endCursor}", ` : ""
                }
                  first: 100, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
                  nodes {
                    number
										commits(last:1){
											nodes{
												commit{
													pushedDate
												}
											}
										}
                    labels(first: 100, orderBy:{field: CREATED_AT, direction: DESC}) {
                      nodes {
												name
                      }
                    }
                    reviews(first: 1, states: CHANGES_REQUESTED, author: "github-actions[bot]") {
											nodes {
												updatedAt
											}
                    }
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                }
              }
            }
          `,
      );
      openPRs.push(...repository.open_prs.nodes);
      hasNextPage = repository.open_prs.pageInfo.hasNextPage;
      endCursor = repository.open_prs.pageInfo.endCursor;
    } catch (error) {
      if (error instanceof RequestError) {
        setFailed(`Could not retrieve top PRs using GraphQl: ${error.message}`);
      }
      throw error;
    }
  }
  return openPRs;
};

/**
 * Retrieve pull requests that have a given label.
 * @param pull The pull requests to check.
 * @param label The label to check for.
 */
export const pullsWithLabel = (pulls, label) => {
  return pulls.filter((pr) => {
    return pr.labels.nodes.some((lab) => lab.name === label);
  });
};

/**
 * Check if PR is stale. Meaning that it hasn't been updated in a given time.
 * @param {Object} pullRequest request object.
 * @param {number} days number of days.
 * @returns Boolean indicating if PR is stale.
 */
const isStale = (pullRequest, staleDays) => {
  const lastCommitDate = new Date(
    pullRequest.commits.nodes[0].commit.pushedDate,
  );
  if (pullRequest.reviews.nodes[0]) {
    const lastReviewDate = new Date(pullRequest.reviews.nodes[0].updatedAt);
    const lastUpdateDate =
      lastCommitDate >= lastReviewDate ? lastCommitDate : lastReviewDate;
    const now = new Date();
    return now - lastUpdateDate > 1000 * 60 * 60 * 24 * staleDays;
  } else {
    return false;
  }
};

/**
 * Main function.
 */
const run = async () => {
  try {
    // Create octokit client.
    const dryRun = process.env.DRY_RUN === "true" || false;
    const staleDays = process.env.STALE_DAYS || 15;
    debug("Creating octokit client...");
    const octokit = github.getOctokit(getGithubToken());
    const { owner, repo } = getRepoInfo(github.context);

    // Retrieve all theme pull requests.
    debug("Retrieving all theme pull requests...");
    const prs = await fetchOpenPRs(octokit, owner, repo);
    const themePRs = pullsWithLabel(prs, "themes");
    const invalidThemePRs = pullsWithLabel(themePRs, "invalid");
    debug("Retrieving stale theme PRs...");
    const staleThemePRs = invalidThemePRs.filter((pr) =>
      isStale(pr, staleDays),
    );
    const staleThemePRsNumbers = staleThemePRs.map((pr) => pr.number);
    debug(`Found ${staleThemePRs.length} stale theme PRs`);

    // Loop through all stale invalid theme pull requests and close them.
    for (const prNumber of staleThemePRsNumbers) {
      debug(`Closing #${prNumber} because it is stale...`);
      if (!dryRun) {
        await octokit.issues.createComment({
          owner,
          repo,
          issue_number: prNumber,
          body: CLOSING_COMMENT,
        });
        await octokit.pulls.update({
          owner,
          repo,
          pull_number: prNumber,
          state: "closed",
        });
      } else {
        debug("Dry run enabled, skipping...");
      }
    }
  } catch (error) {
    setFailed(error.message);
  }
};

run();
