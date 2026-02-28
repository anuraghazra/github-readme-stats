// @ts-check

import axios from "axios";

/**
 * Normalize response data to JSON object when possible.
 *
 * @param {unknown} payload The payload to normalize.
 * @returns {any} Normalized payload.
 */
const normalizeJsonPayload = (payload) => {
  if (typeof payload !== "string") {
    return payload;
  }

  try {
    return JSON.parse(payload);
  } catch {
    return payload;
  }
};

/**
 * Send GraphQL request to GitHub API.
 *
 * @param {import('axios').AxiosRequestConfig['data']} data Request data.
 * @param {import('axios').AxiosRequestConfig['headers']} headers Request headers.
 * @returns {Promise<any>} Request response.
 */
const request = async (data, headers) => {
  const requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "github-readme-stats",
    ...headers,
  };

  // Keep axios path only for tests where axios-mock-adapter is used.
  // For runtime, use fetch to avoid adapter differences across environments.
  if (process.env.NODE_ENV !== "test") {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });

    const rawBody = await response.text();
    const parsedBody = normalizeJsonPayload(rawBody);

    /** @type {any} */
    const axiosLikeResponse = {
      data: parsedBody,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    };

    // Preserve axios-like rejection semantics for non-2xx status.
    if (!response.ok) {
      const err = new Error(
        `Request failed with status code ${response.status}`,
      );
      // @ts-ignore
      err.response = axiosLikeResponse;
      throw err;
    }

    return axiosLikeResponse;
  }

  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: requestHeaders,
    data: JSON.stringify(data),
  }).then((response) => {
    response.data = normalizeJsonPayload(response.data);
    return response;
  });
};

export { request };
