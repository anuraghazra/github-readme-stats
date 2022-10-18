/**
 * @file Contains a simple cloud function that can be used to check which PATs are no
 * longer working. It returns a list of valid PATs, expired PATs and PATs with errors.
 *
 * @description This function is currently rate limited to 1 request per 15 minutes.
 */

import { logger, request } from "../../src/common/utils.js";

export const RATE_LIMIT_SECONDS = 60 * 15; // 1 request per 15 minutes

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
          },
        }`,
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
  let PATsInfo = { expiredPATs: [], errorPATs: [], validPATs: [], details: {} };
  const PATs = Object.keys(process.env).filter((key) => /PAT_\d*$/.exec(key));
  for (const pat of PATs) {
    try {
      const response = await fetcher(variables, process.env[pat]);
      const isRateLimited =
        (response.data.errors &&
          response.data.errors[0]?.type === "RATE_LIMITED") ||
        response.data.data?.rateLimit?.remaining === 0;

      // Store PATs with errors.
      if (
        response.data.errors &&
        !(response.data.errors[0]?.type === "RATE_LIMITED")
      ) {
        PATsInfo.details[pat] = {
          status: "error",
          error: {
            type: response.data.errors[0].type,
            message: response.data.errors[0].message,
          },
        };
        PATsInfo.errorPATs.push(pat);
        continue;
      } else if (isRateLimited) {
        PATsInfo.details[pat] = {
          status: "limited",
          remaining: 0,
        };
      } else {
        PATsInfo.details[pat] = {
          status: "valid",
          remaining: response.data.data.rateLimit.remaining,
        };
      }

      // Store valid PATs.
      PATsInfo.validPATs.push(pat);
    } catch (err) {
      // Store the PAT if it is expired.
      if (err.response?.data?.message === "Bad credentials") {
        PATsInfo.details[pat] = {
          status: "expired",
        };
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
