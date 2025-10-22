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
        stargazers {
          totalCount
        }
        issues(states: OPEN) {
          totalCount
        }
        pullRequests(states: OPEN) {
          totalCount
        }
        description
        primaryLanguage {
          color
          id
          name
        }
        forkCount
      }
      query getRepo($login: String!, $repo: String!) {
        user(login: $login) {
          repository(name: $repo) {
            ...RepoInfo
          }
        }
        organization(login: $login) {
          repository(name: $repo) {
            ...RepoInfo
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

  let res = await retryer(fetcher, { login: username, repo: reponame });

  const data = res.data.data;

  if (!data.user && !data.organization) {
    throw new Error("Not found");
  }

  const isUser = data.organization === null && data.user;
  const isOrg = data.user === null && data.organization;

  if (isUser) {
    const repository = data.user.repository;
    if (!repository || repository.isPrivate) {
      throw new Error("User Repository Not found");
    }
    return {
      ...repository,
      starCount: repository.stargazers.totalCount,
      ...(repository.issues
        ? { openIssuesCount: repository.issues.totalCount }
        : {}),
      ...(repository.pullRequests
        ? { openPrsCount: repository.pullRequests.totalCount }
        : {}),
      ...(repository.createdAt ? { createdAt: repository.createdAt } : {}),
      ...(repository.pushedAt ? { pushedAt: repository.pushedAt } : {}),
      firstCommitDate: repository.createdAt || null,
    };
  }

  if (isOrg) {
    const repository = data.organization.repository;
    if (!repository || repository.isPrivate) {
      throw new Error("Organization Repository Not found");
    }
    return {
      ...repository,
      starCount: repository.stargazers.totalCount,
      ...(repository.issues
        ? { openIssuesCount: repository.issues.totalCount }
        : {}),
      ...(repository.pullRequests
        ? { openPrsCount: repository.pullRequests.totalCount }
        : {}),
      ...(repository.createdAt ? { createdAt: repository.createdAt } : {}),
      ...(repository.pushedAt ? { pushedAt: repository.pushedAt } : {}),
      firstCommitDate: repository.createdAt || null,
    };
  }

  throw new Error("Unexpected behavior");
};

export { fetchRepo };
export default fetchRepo;
