const { request } = require("./utils");

async function fetchRepo(username, reponame) {
  if (!username || !reponame) {
    throw new Error("Invalid username or reponame");
  }

  const res = await request(`
    fragment RepoInfo on Repository {
      name
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
  `, {
    login: username,
    repo: reponame,
  });

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
