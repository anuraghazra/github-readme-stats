// @ts-check

import { MissingParamError } from "../common/error.js";
import { request } from "../common/http.js";
import { retryer } from "../common/retryer.js";

/**
 * Repo data fetcher.
 *
 * @param {object} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>} The response.
 */
const fetcher = (variables, token) => {
  return request(
    {
      query: `
      fragment RepoInfo on Repository {
        name
        nameWithOwner
        isPrivate
        isArchived
        isTemplate
        createdAt
        pushedAt
        stargazers { totalCount }
        issues(states: OPEN) { totalCount }
        pullRequests(states: OPEN) { totalCount }
        description
        primaryLanguage { color id name }
        forkCount
      }
      query getRepo($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          ...RepoInfo
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

const urlExample = "/api/pin?username=USERNAME&amp;repo=REPO_NAME";

/**
 * @typedef {import("./types").RepositoryData} RepositoryData Repository data.
 */

/**
 * Fetch repository data.
 *
 * @param {string} username GitHub username.
 * @param {string} reponame GitHub repository name.
 * @returns {Promise<RepositoryData>} Repository data.
 */
const fetchRepo = async (username, reponame) => {
  if (!username && !reponame) {
    throw new MissingParamError(["username", "repo"], urlExample);
  }
  if (!username) {
    throw new MissingParamError(["username"], urlExample);
  }
  if (!reponame) {
    throw new MissingParamError(["repo"], urlExample);
  }

  let res = await retryer(fetcher, { owner: username, repo: reponame });

  const data = res && res.data ? res.data.data : null;
  const errors = (res && res.data && res.data.errors) || [];

  if (errors.length) {
    throw new Error(errors[0].message || "GitHub GraphQL error");
  }

  if (!data) {
    throw new Error("Invalid response from GitHub API");
  }

  const repo = data.repository;
  if (!repo || repo.isPrivate) {
    throw new Error("Repository Not found");
  }

  return {
    ...repo,
    starCount: repo.stargazers.totalCount,
    ...(repo.issues ? { openIssuesCount: repo.issues.totalCount } : {}),
    ...(repo.pullRequests
      ? { openPrsCount: repo.pullRequests.totalCount }
      : {}),
    ...(repo.createdAt ? { createdAt: repo.createdAt } : {}),
    ...(repo.pushedAt ? { pushedAt: repo.pushedAt } : {}),
    firstCommitDate: repo.createdAt || null,
  };
};

export { fetchRepo };
export default fetchRepo;
