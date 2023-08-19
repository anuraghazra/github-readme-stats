// @ts-check

import { request } from "../common/utils.js";
import { retryer } from "../common/retryer.js";

/**
 * @typedef {import('axios').AxiosRequestHeaders} AxiosRequestHeaders Axios request headers.
 * @typedef {import('axios').AxiosResponse} AxiosResponse Axios response.
 */

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
 * @param {AxiosRequestHeaders} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @returns {Promise<AxiosResponse>} The response.
 */
const fetcher = async (variables, token) => {
  return await request(
    { query: QUERY, variables },
    { Authorization: `token ${token}` },
  );
};

/**
 * @typedef {import('./types').GistData} GistData Gist data.
 */

/**
 * Fetch GitHub gist information by given username and ID.
 *
 * @param {string} id Github gist ID.
 * @returns {Promise<GistData>} Gist data.
 */
const fetchGist = async (id) => {
  const res = await retryer(fetcher, { gistName: id });
  if (res.data.errors) throw new Error(res.data.errors[0].message);
  if (!res.data.data.viewer.gist) throw new Error("Gist not found");
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

export { fetchGist };
export default fetchGist;
