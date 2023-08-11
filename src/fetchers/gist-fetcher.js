// @ts-check

import axios from "axios";
import { parseHTML } from "linkedom";

/**
 * @typedef {import('./types').GistData} GistData Gist data.
 */

/**
 * Fetch GitHub gist information by given username and ID.
 *
 * @param {string} username Github username.
 * @param {string} id Github gist ID.
 * @returns {Promise<GistData>} Gist data.
 */
const fetchGist = async (username, id) => {
  const response = (
    await axios({
      method: "get",
      url: `https://api.github.com/gists/${id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
      },
    })
  ).data;
  const { starsCount, forksCount } = await fetchGistStargazers(username, id);

  return {
    name: response.files[Object.keys(response.files)[0]].filename,
    nameWithOwner: `${username}/${
      response.files[Object.keys(response.files)[0]].filename
    }`,
    description: response.description,
    language: response.files[Object.keys(response.files)[0]].language,
    starsCount,
    forksCount,
  };
};

/**
 * Fetch GitHub gist stargazers and forks count by given username and ID.
 *
 * @param {string} username Github username.
 * @param {string} id Github gist ID.
 * @returns {Promise<{starsCount: number, forksCount: number}>} Gist stargazers and forks count.
 */
const fetchGistStargazers = async (username, id) => {
  let starsCount = 0;
  let forksCount = 0;

  try {
    await axios({
      method: "get",
      url: `https://gist.github.com/${username}/${id}/stargazers`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
      },
    }).then((dom) => {
      const { document } = parseHTML(dom.data);
      let nav = document.querySelector('[aria-label="Gist"]');
      if (!nav) throw new Error("No nav found");
      let starsBox = nav.querySelector('[data-hotkey="g s"] span.Counter');
      let forksBox = nav.querySelector('[data-hotkey="g f"] span.Counter');
      // @ts-ignore
      starsCount = starsBox ? starsBox.title : 0;
      // @ts-ignore
      forksCount = forksBox ? forksBox.title : 0;
    });
  } catch (error) {
    starsCount = 0;
    forksCount = 0;
  }

  return {
    starsCount,
    forksCount,
  };
};

export { fetchGist };
export default fetchGist;
