import axios from "axios";

/**
 * @typedef {import('axios').AxiosRequestConfig['data']} AxiosRequestConfigData Axios request data.
 * @typedef {import('axios').AxiosRequestConfig['headers']} AxiosRequestConfigHeaders Axios request headers.
 */

/**
 * Send GraphQL request to GitHub API.
 *
 * @param {AxiosRequestConfigData} data Request data.
 * @param {AxiosRequestConfigHeaders} headers Request headers.
 * @returns {Promise<any>} Request response.
 */
const request = (data, headers) => {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};

export { request };
