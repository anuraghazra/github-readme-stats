/**
 * @file Contains a simple cloud function that can be used to check which PATs are no
 * longer working. It returns a list of valid PATs, expired PATs and PATs with errors.
 *
 * @description This function is currently rate limited to 1 request per 10 minutes.
 */

import { logger, request } from "../../src/common/utils.js";

export const RATE_LIMIT_SECONDS = 60 * 10; // 1 request per 10 minutes

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

const getAllPATs = () => {
  return Object.keys(process.env).filter((key) => /PAT_\d*$/.exec(key));
};

/**
 * Check whether any of the PATs is expired.
 */
const getPATInfo = async (fetcher, variables) => {
  const details = {};
  const PATs = getAllPATs();

  for (const pat of PATs) {
    try {
      const response = await fetcher(variables, process.env[pat]);
      const errors = response.data.errors;
      const hasErrors = Boolean(errors);
      const errorType = errors?.[0]?.type;
      const isRateLimited =
        (hasErrors && errorType === "RATE_LIMITED") ||
        response.data.data?.rateLimit?.remaining === 0;

      // Store PATs with errors.
      if (hasErrors && errorType !== "RATE_LIMITED") {
        details[pat] = {
          status: "error",
          error: {
            type: errors[0].type,
            message: errors[0].message,
          },
        };
        continue;
      } else if (isRateLimited) {
        details[pat] = {
          status: "exhausted",
          remaining: 0,
        };
      } else {
        details[pat] = {
          status: "valid",
          remaining: response.data.data.rateLimit.remaining,
        };
      }
    } catch (err) {
      // Store the PAT if it is expired.
      const errorMessage = err.response?.data?.message;
      if (errorMessage?.toLowerCase() === "bad credentials") {
        details[pat] = {
          status: "expired",
        };
      } else {
        throw err;
      }
    }
  }

  const filterPATsByStatus = (status) => {
    return Object.keys(details).filter((pat) => details[pat].status === status);
  };

  return {
    validPATs: filterPATsByStatus("valid"),
    expiredPATs: filterPATsByStatus("expired"),
    exhaustedPATS: filterPATsByStatus("exhausted"),
    errorPATs: filterPATsByStatus("error"),
    details,
  };
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
    res.send(JSON.stringify(pATsInfo, null, 2));
  } catch (err) {
    // Throw error if something went wrong.
    logger.error(err);
    res.setHeader("Cache-Control", "no-store");
    res.send("Something went wrong: " + err.message);
  }
};
