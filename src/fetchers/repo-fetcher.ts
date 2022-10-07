// @ts-check
import { AxiosRequestHeaders } from "axios";
import { retryer } from "../common/retryer";
import { MissingParamError, request } from "../common/utils";

/**
 * @param {AxiosRequestHeaders} variables
 * @param {string} token
 */
const fetcher = (variables: AxiosRequestHeaders, token: string) => {
  return request(
    {
      query: `
      fragment RepoInfo on Repository {
        name
        nameWithOwner
        isPrivate
        isArchived
        isTemplate
        stargazers {
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
 * @param {string} username
 * @param {string} reponame
 * @returns {Promise<import("./types").RepositoryData>}
 */
async function fetchRepo(username: string, reponame: string) {
  if (!username && !reponame) {
    throw new MissingParamError(["username", "repo"], urlExample);
  }
  if (!username) throw new MissingParamError(["username"], urlExample);
  if (!reponame) throw new MissingParamError(["repo"], urlExample);

  let res = await retryer(fetcher, { login: username, repo: reponame });

  const data = res.data.data;

  if (!data.user && !data.organization) {
    throw new Error("Not found");
  }

  const isUser = data.organization === null && data.user;
  const isOrg = data.user === null && data.organization;

  if (isUser) {
    if (!data.user.repository || data.user.repository.isPrivate) {
      throw new Error("User Repository Not found");
    }
    return {
      ...data.user.repository,
      starCount: data.user.repository.stargazers.totalCount,
    };
  }

  if (isOrg) {
    if (
      !data.organization.repository ||
      data.organization.repository.isPrivate
    ) {
      throw new Error("Organization Repository Not found");
    }
    return {
      ...data.organization.repository,
      starCount: data.organization.repository.stargazers.totalCount,
    };
  }
}

export { fetchRepo };
export default fetchRepo;
