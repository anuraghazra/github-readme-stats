/**
 * @file Contains a simple cloud function that can be used to check which PATs are no
 * longer working. It returns a list of valid PATs, expired PATs and PATs with errors.
 *
 * @description This function is currently rate limited to 1 request per day.
 */

import { logger, request } from "../../src/common/utils.js";

export const RATE_LIMIT_SECONDS = 60 * 60 * 24; // 1 request per day.

/**
 * Simple uptime check fetcher for the PATs.
 *
 * @param {import('axios').AxiosRequestHeaders} variables
 * @param {string} token
 */
const uptimeFetcher = (variables, token) => {
  return request(
    {
      query: `
         query {
           rateLimit {
               remaining
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

/**
 * Check whether any of the PATs is expired.
 */
const getPATInfo = async (fetcher, variables) => {
  let PATsInfo = { expiredPATs: [], errorPATs: [], validPATs: [] };
  const PATs = Object.keys(process.env).filter((key) => /PAT_\d*$/.exec(key));
  for (const pat of PATs) {
    try {
      const response = await fetcher(variables, process.env[pat]);
      response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

      // Store PATs with errors.
      if (
        response.data.errors &&
        !(response.data.errors[0].type === "RATE_LIMITED")
      ) {
        PATsInfo.errorPATs.push({
          [pat]: {
            type: response.data.errors[0].type,
            message: response.data.errors[0].message,
          },
        });
        continue;
      }

      // Store remaining PATs.
      PATsInfo.validPATs.push(pat);
    } catch (err) {
      const isBadCredential =
        err.response &&
        err.response.data &&
        err.response.data.message === "Bad credentials";

      // Store the PAT if it is expired.
      if (isBadCredential) {
        PATsInfo.expiredPATs.push(pat);
      } else {
        throw err;
      }
    }
  }
  return PATsInfo;
};

/**
 * Cloud function that returns information about the used PATs.
 */
export default async (_, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    // Add header to prevent abuse.
    const pATsInfo = await getPATInfo(uptimeFetcher, {});
    if (pATsInfo) {
      res.setHeader(
        "Cache-Control",
        `max-age=0, s-maxage=${RATE_LIMIT_SECONDS}`,
      );
    }
    res.send(pATsInfo);
  } catch (err) {
    // Throw error if something went wrong.
    logger.error(err);
    res.setHeader("Cache-Control", "no-store");
    res.send("Something went wrong: " + err.message);
  }
};
