const { request } = require("./utils");
const retryer = require("./retryer");

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      fragment RepoInfo on Repository {
        name
        nameWithOwner
        isPrivate
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
    }
  );
};

async function fetchRepo(username, reponame) {
  if (!username || !reponame) {
    throw new Error("Invalid username or reponame");
  }

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

module.exports = fetchRepo;
