/**
 * @file Contains a simple cloud function that can be used to check if the PATs are still
 * functional.
 *
 * @description This function is currently rate limited to 1 request per 10 minutes.
 */

import { logger, request } from "../../src/common/utils.js";

// Script variables.
const PATs = Object.keys(process.env).filter((key) =>
  /PAT_\d*$/.exec(key),
).length;
const RETRIES = PATs ? PATs : 7;
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
 * Check whether any of the PATs is still functional.
 *
 * @param {Object} fetcher Fetcher object.
 * @param {Object} variables Fetcher variables.
 * @param {number} retries How many times to retry.
 */
const PATsWorking = async (fetcher, variables, retries = 0) => {
  if (retries > RETRIES) {
    // Return false if no PAT is working.
    return false;
  }

  // Loop through PATs to see if any of them are working.
  try {
    const response = await fetcher(
      variables,
      process.env[`PAT_${retries + 1}`],
    );

    const isRateLimited =
      (response.data.errors &&
        response.data.errors[0]?.type === "RATE_LIMITED") ||
      response.data.data?.rateLimit?.remaining === 0;

    // If rate limit is hit increase RETRIES and recursively call the PATsWorking
    // with username, and current RETRIES
    if (isRateLimited) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      return PATsWorking(fetcher, variables, retries);
    }

    return true; // Return true if a PAT was working.
  } catch (err) {
    // also checking for bad credentials if any tokens gets invalidated
    if (err.response?.data?.message === "Bad credentials") {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return PATsWorking(fetcher, variables, retries);
    } else {
      throw err;
    }
  }
};

/**
 * Creates Json response that can be used for shields.io dynamic card generation.
 *
 * @param {*} up Whether the PATs are up or not.
 * @returns Dynamic shields.io JSON response object.
 *
 * @see https://shields.io/endpoint.
 */
const shieldsUptimeBadge = (up) => {
  const schemaVersion = 1;
  const isError = true;
  const label = "Public Instance";
  const message = up ? "up" : "down";
  const color = up ? "brightgreen" : "red";
  return {
    schemaVersion,
    label,
    message,
    color,
    isError,
  };
};

/**
 * Cloud function that returns whether the PATs are still functional.
 */
export default async (req, res) => {
  let { type } = req.query;
  type = type ? type.toLowerCase() : "boolean";

  res.setHeader("Content-Type", "application/json");
  try {
    // Add header to prevent abuse.
    const PATsValid = await PATsWorking(uptimeFetcher, {});
    if (PATsValid) {
      res.setHeader(
        "Cache-Control",
        `max-age=0, s-maxage=${RATE_LIMIT_SECONDS}`,
      );
    }
    switch (type) {
      case "shields":
        res.send(shieldsUptimeBadge(PATsValid));
        break;
      case "json":
        res.send({ up: PATsValid });
        break;
      default:
        res.send(PATsValid);
        break;
    }
  } catch (err) {
    // Return fail boolean if something went wrong.
    logger.error(err);
    res.setHeader("Cache-Control", "no-store");
    res.send("Something went wrong: " + err.message);
  }
};
