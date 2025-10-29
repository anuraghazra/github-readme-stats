// @ts-check

import { retryer } from "../common/retryer.js";
import { MissingParamError } from "../common/error.js";
import { request } from "../common/http.js";

const QUERY = `
query gistInfo($gistName: String!) {
    viewer {
        gist(name: $gistName) {
            description
            owner {
                login
            }
            stargazerCount
            forks {
                totalCount
            }
            files {
                name
                language {
                    name
                }
                size
            }
        }
    }
}
`;

/**
 * Gist data fetcher.
 *
 * @param {object} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<import('axios').AxiosResponse>} The response.
 */
const fetcher = async (variables, token) => {
  return await request(
    { query: QUERY, variables },
    { Authorization: `token ${token}` },
  );
};

/**
 * @typedef {{ name: string; language: { name: string; }, size: number }} GistFile Gist file.
 */

/**
 * This function calculates the primary language of a gist by files size.
 *
 * @param {GistFile[]} files Files.
 * @returns {string} Primary language.
 */
const calculatePrimaryLanguage = (files) => {
  /** @type {Record<string, number>} */
  const languages = {};

  for (const file of files) {
    if (file.language) {
      if (languages[file.language.name]) {
        languages[file.language.name] += file.size;
      } else {
        languages[file.language.name] = file.size;
      }
    }
  }

  let primaryLanguage = Object.keys(languages)[0];
  for (const language in languages) {
    if (languages[language] > languages[primaryLanguage]) {
      primaryLanguage = language;
    }
  }

  return primaryLanguage;
};

/**
 * @typedef {import('./types').GistData} GistData Gist data.
 */

/**
 * Fetch GitHub gist information by given username and ID.
 *
 * @param {string} id GitHub gist ID.
 * @returns {Promise<GistData>} Gist data.
 */
const fetchGist = async (id) => {
  if (!id) {
    throw new MissingParamError(["id"], "/api/gist?id=GIST_ID");
  }
  const res = await retryer(fetcher, { gistName: id });
  if (res.data.errors) {
    throw new Error(res.data.errors[0].message);
  }
  if (!res.data.data.viewer.gist) {
    throw new Error("Gist not found");
  }
  const data = res.data.data.viewer.gist;
  return {
    name: data.files[Object.keys(data.files)[0]].name,
    nameWithOwner: `${data.owner.login}/${
      data.files[Object.keys(data.files)[0]].name
    }`,
    description: data.description,
    language: calculatePrimaryLanguage(data.files),
    starsCount: data.stargazerCount,
    forksCount: data.forks.totalCount,
  };
};

export { fetchGist };
export default fetchGist;
