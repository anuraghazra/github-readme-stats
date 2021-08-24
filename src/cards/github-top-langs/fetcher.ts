import githubUsernameRegex from "github-username-regex";
import { FetchStatError, URLQueryError } from "../../helpers/Error";
import { logger } from "../../utils/debug";
import { retry, request, Fetcher } from "../../utils/github";

const fetcher: Fetcher = (variables, token) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
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
    },
  );
};

export type IStats = Array<{
  name: string;
  color: string;
  size: number;
}>;

export default async function fetchTopLanguages(
  username: string,
  exclude_repo: string[] = [],
) {
  if (!githubUsernameRegex.test(username)) {
    throw new URLQueryError(URLQueryError.TYPE.INVALID, "username");
  }

  const res = await retry(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    throw new FetchStatError(
      FetchStatError.TYPE.USER_NOT_FOUND,
      res.data.errors[0].message,
    );
  }

  const hiddenRepoSet = new Set(exclude_repo);
  const responseRepoNodes: Array<{
    name: string;
    languages: {
      edges: Array<{
        size: number;
        node: {
          color: string;
          name: string;
        };
      }>;
    };
  }> = res.data.data.user.repositories.nodes;
  const repoNodes = responseRepoNodes.filter((repo) => {
    if (hiddenRepoSet.has(repo.name)) {
      return false;
    }
    if (repo.languages.edges.length <= 0) {
      return false;
    }
    return true;
  });

  const languageStats = repoNodes.reduce(
    (stat, repo) => {
      repo.languages.edges.forEach(({ size, node }) => {
        const { name, color } = node;
        if (stat.hasOwnProperty(name)) {
          stat[name]["size"] += size;
        } else {
          stat[name] = {
            name,
            color,
            size,
          };
        }
      });

      return stat;
    },
    {} as {
      [key: string]: IStats[0];
    },
  );

  return Object.values(languageStats).sort(
    ({ size: size1 }, { size: size2 }) => size2 - size1,
  );
}
