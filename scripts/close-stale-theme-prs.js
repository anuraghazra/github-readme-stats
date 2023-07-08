/**
 * @file Script that can be used to close stale theme PRs that have a `invalid` label.
 */
import * as dotenv from "dotenv";
dotenv.config();

import { debug, setFailed } from "@actions/core";
import github from "@actions/github";
import { RequestError } from "@octokit/request-error";
import { getGithubToken, getRepoInfo } from "./helpers.js";

const CLOSING_COMMENT = `
	\rThis theme PR has been automatically closed due to inactivity. Please reopen it if you want to continue working on it.\
	\rThank you for your contributions.
`;
const REVIEWER = "github-actions[bot]";

/**
 * Retrieve the review user.
 * @returns {string} review user.
 */
const getReviewer = () => {
  return process.env.REVIEWER ? process.env.REVIEWER : REVIEWER;
};

/**
 * Fetch open PRs from a given repository.
 *
 * @param {module:@actions/github.Octokit} octokit The octokit client.
 * @param {string} user The user name of the repository owner.
 * @param {string} repo The name of the repository.
 * @param {string} reviewer The reviewer to filter by.
 * @returns {Promise<Object[]>} The open PRs.
 */
export const fetchOpenPRs = async (octokit, user, repo, reviewer) => {
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
                    reviews(first: 100, states: CHANGES_REQUESTED, author: "${reviewer}") {
											nodes {
                        submittedAt
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
 *
 * @param {Object[]} pulls The pull requests to check.
 * @param {string} label The label to check for.
 * @returns {Object[]} The pull requests that have the given label.
 */
export const pullsWithLabel = (pulls, label) => {
  return pulls.filter((pr) => {
    return pr.labels.nodes.some((lab) => lab.name === label);
  });
};

/**
 * Check if PR is stale. Meaning that it hasn't been updated in a given time.
 *
 * @param {Object} pullRequest request object.
 * @param {number} staleDays number of days.
 * @returns {boolean} indicating if PR is stale.
 */
const isStale = (pullRequest, staleDays) => {
  const lastCommitDate = new Date(
    pullRequest.commits.nodes[0].commit.pushedDate,
  );
  if (pullRequest.reviews.nodes[0]) {
    const lastReviewDate = new Date(
      pullRequest.reviews.nodes.sort((a, b) => (a < b ? 1 : -1))[0].submittedAt,
    );
    const lastUpdateDate =
      lastCommitDate >= lastReviewDate ? lastCommitDate : lastReviewDate;
    const now = new Date();
    return (now - lastUpdateDate) / (1000 * 60 * 60 * 24) >= staleDays;
  } else {
    return false;
  }
};

/**
 * Main function.
 *
 * @returns {Promise<void>} A promise.
 */
const run = async () => {
  try {
    // Create octokit client.
    const dryRun = process.env.DRY_RUN === "true" || false;
    const staleDays = process.env.STALE_DAYS || 20;
    debug("Creating octokit client...");
    const octokit = github.getOctokit(getGithubToken());
    const { owner, repo } = getRepoInfo(github.context);
    const reviewer = getReviewer();

    // Retrieve all theme pull requests.
    debug("Retrieving all theme pull requests...");
    const prs = await fetchOpenPRs(octokit, owner, repo, reviewer);
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
