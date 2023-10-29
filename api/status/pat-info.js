/**
 * @file Contains a simple cloud function that can be used to check which PATs are no
 * longer working. It returns a list of valid PATs, expired PATs and PATs with errors.
 *
 * @description This function is currently rate limited to 1 request per 5 minutes.
 */

import process from "node:process";
import { logger, request, dateDiff } from "../../src/common/utils.js";
export const RATE_LIMIT_SECONDS = 60 * 5; // 1 request per 5 minutes

/**
 * @typedef {import('axios').AxiosRequestHeaders} AxiosRequestHeaders Axios request headers.
 * @typedef {import('axios').AxiosResponse} AxiosResponse Axios response.
 */

/**
 * Simple uptime check fetcher for the PATs.
 *
 * @param {AxiosRequestHeaders} variables Fetcher variables.
 * @param {string} token GitHub token.
 * @param {boolean=} useFetch Use fetch instead of axios.
 * @returns {Promise<AxiosResponse>} The response.
 */
const uptimeFetcher = (variables, token, useFetch) => {
  return request(
    {
      query: `
        query {
          rateLimit {
            remaining
            resetAt
          },
        }`,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    },
    useFetch,
  );
};

const getAllPATs = (env) => {
  return Object.keys(env).filter((key) => /PAT_\d*$/.exec(key));
};

/**
 * @typedef {(variables: AxiosRequestHeaders, token: string) => Promise<AxiosResponse>} Fetcher The fetcher function.
 * @typedef {{validPATs: string[], expiredPATs: string[], exhaustedPATs: string[], suspendedPATs: string[], errorPATs: string[], details: any}} PATInfo The PAT info.
 */

/**
 * Check whether any of the PATs is expired.
 *
 * @param {Fetcher} fetcher The fetcher function.
 * @param {AxiosRequestHeaders} variables Fetcher variables.
 * @param {any} env The environment variables.
 * @returns {Promise<PATInfo>} The response.
 */
const getPATInfo = async (fetcher, variables, env) => {
  const details = {};
  const PATs = getAllPATs(env);

  for (const pat of PATs) {
    try {
      const response = await fetcher(variables, env[pat]);
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
        const date1 = new Date();
        const date2 = new Date(response.data?.data?.rateLimit?.resetAt);
        details[pat] = {
          status: "exhausted",
          remaining: 0,
          resetIn: dateDiff(date2, date1) + " minutes",
        };
      } else {
        details[pat] = {
          status: "valid",
          remaining: response.data.data.rateLimit.remaining,
        };
      }
    } catch (err) {
      // Store the PAT if it is expired.
      const errorMessage = err.response?.data?.message?.toLowerCase();
      if (errorMessage === "bad credentials") {
        details[pat] = {
          status: "expired",
        };
      } else if (errorMessage === "sorry. your account was suspended.") {
        details[pat] = {
          status: "suspended",
        };
      } else {
        throw err;
      }
    }
  }

  const filterPATsByStatus = (status) => {
    return Object.keys(details).filter((pat) => details[pat].status === status);
  };

  const sortedDetails = Object.keys(details)
    .sort()
    .reduce((obj, key) => {
      obj[key] = details[key];
      return obj;
    }, {});

  return {
    validPATs: filterPATsByStatus("valid"),
    expiredPATs: filterPATsByStatus("expired"),
    exhaustedPATs: filterPATsByStatus("exhausted"),
    suspendedPATs: filterPATsByStatus("suspended"),
    errorPATs: filterPATsByStatus("error"),
    details: sortedDetails,
  };
};

/**
 * Cloud function that returns information about the used PATs.
 *
 * @param {any} _ The request.
 * @param {any} res The response.
 * @param {any} env The environment variables.
 * @returns {Promise<void>} The response.
 */
export const handler = async (_, res, env) => {
  res.setHeader("Content-Type", "application/json");
  try {
    // Add header to prevent abuse.
    const PATsInfo = await getPATInfo(uptimeFetcher, {}, env);
    if (PATsInfo) {
      res.setHeader(
        "Cache-Control",
        `max-age=0, s-maxage=${RATE_LIMIT_SECONDS}`,
      );
    }
    res.send(JSON.stringify(PATsInfo, null, 2));
  } catch (err) {
    // Throw error if something went wrong.
    logger.error(err);
    res.setHeader("Cache-Control", "no-store");
    res.send("Something went wrong: " + err.message);
  }
};

export default async (req, res) => handler(req, res, process.env);
