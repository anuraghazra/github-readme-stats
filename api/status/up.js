/**
 * @file Contains a simple cloud function that can be used to check if the PATs are still
 * functional.
 *
 * @description This function is currently rate limited to 1 request per 10 minutes.
 */

import retryer from "../../src/common/retryer.js";
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
    let PATsValid = true;
    try {
      await retryer(uptimeFetcher, {});
    } catch (err) {
      PATsValid = false;
    }

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
