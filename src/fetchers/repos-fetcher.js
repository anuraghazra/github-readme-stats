const { request } = require("../common/utils");
const retryer = require("../common/retryer");

const fetcher = (variables, token) => {
    return request(
        {
            query: `
      query getRepositories($login: String!,$top: Int=5) {
        user(login: $login) {
          repositories(first: $top, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            edges {
                node {
                  id
                  name
                  url
                  updatedAt
                }
            }
          }
        }
        organization(login: $login) {
          repositories(first: $top, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            edges {
                node {
                  id
                  name
                  url
                  updatedAt
                }
            }
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

async function fetchRepos(username,count) {
    if (!username) {
        throw new Error("Invalid username");
    }

    let res = await retryer(fetcher, { login: username, top: count });

    const data = res.data.data;

    if (!data.user && !data.organization) {
        throw new Error("Not found");
    }

    const isUser = data.organization === null && data.user;
    const isOrg = data.user === null && data.organization;

    if (isUser) {
        if (!data.user.repositories || data.user.repositories.isPrivate) {
            throw new Error("User Repository Not found");
        }
        return data.user.repositories;
    }

    if (isOrg) {
        if (
            !data.organization.repositories ||
            data.organization.repositories.isPrivate
        ) {
            throw new Error("Organization Repository Not found");
        }
        return data.organization.repositories;
    }
}

module.exports = fetchRepos;
