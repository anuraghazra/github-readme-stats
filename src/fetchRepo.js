const { request } = require("./utils");
const retryer = require("./retryer");

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      fragment RepoInfo on Repository {
        name
        nameWithOwner
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

  if (data.organization === null && data.user) {
    if (!data.user.repository) {
      throw new Error("User Repository Not found");
    }
    return data.user.repository;
  }

  if (data.user === null && data.organization) {
    if (!data.organization.repository) {
      throw new Error("Organization Repository Not found");
    }
    return data.organization.repository;
  }
}

module.exports = fetchRepo;
