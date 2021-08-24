import githubUsernameRegex from "github-username-regex";
import { URLQueryError } from "../../helpers/Error";
import { logger } from "../../utils/debug";
import { Fetcher, request, retry } from "../../utils/github";

const fetcher: Fetcher = (variables, token) => {
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
      Authorization: `bearer ${token}`,
    },
  );
};

export interface IStats {
  name: string;
  nameWithOwner: string;
  isPrivate: boolean;
  isArchived: boolean;
  isTemplate: boolean;
  stargazers: {
    totalCount: number;
  };
  description: string;
  primaryLanguage: {
    color: string;
    id: string;
    name: string;
  };
  forkCount: number;
}

export default async function fetchRepo(username: string, repo: string) {
  if (!githubUsernameRegex.test(username)) {
    throw new URLQueryError(URLQueryError.TYPE.INVALID, "username");
  }
  if (!repo) {
    throw new URLQueryError(URLQueryError.TYPE.INVALID, "repo");
  }

  let res = await retry(fetcher, { login: username, repo });

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
    return data.user.repository;
  }

  if (isOrg) {
    if (
      !data.organization.repository ||
      data.organization.repository.isPrivate
    ) {
      throw new Error("Organization Repository Not found");
    }
    return data.organization.repository;
  }
}
