import { CustomError, logger } from "./utils.js";

// Script variables.

// Count the number of GitHub API tokens available.
const PATs = Object.keys(process.env).filter((key) =>
  /PAT_\d*$/.exec(key),
).length;
const RETRIES = process.env.NODE_ENV === "test" ? 7 : PATs;

/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse Axios response.
 * @typedef {(variables: object, token: string) => Promise<AxiosResponse>} FetcherFunction Fetcher function.
 */

/**
 * Try to execute the fetcher function until it succeeds or the max number of retries is reached.
 *
 * @param {FetcherFunction} fetcher The fetcher function.
 * @param {object} variables Object with arguments to pass to the fetcher function.
 * @param {number} retries How many times to retry.
 * @returns {Promise<T>} The response from the fetcher function.
 */
const retryer = async (fetcher, variables, retries = 0) => {
  if (!RETRIES) {
    throw new CustomError("No GitHub API tokens found", CustomError.NO_TOKENS);
  }
  if (retries > RETRIES) {
    throw new CustomError(
      "Downtime due to GitHub API rate limiting",
      CustomError.MAX_RETRY,
    );
  }
  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    let response = await fetcher(
      variables,
      process.env[`PAT_${retries + 1}`],
      retries,
    );

    // prettier-ignore
    const isRateExceeded = response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

    // if rate limit is hit increase the RETRIES and recursively call the retryer
    // with username, and current RETRIES
    if (isRateExceeded) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }

    // finally return the response
    return response;
  } catch (err) {
    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    const isBadCredential = err.response.data && err.response.data.message === "Bad credentials";
    const isAccountSuspended =
      err.response.data &&
      err.response.data.message === "Sorry. Your account was suspended.";

    if (isBadCredential || isAccountSuspended) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    } else {
      return err.response;
    }
  }
};

export { retryer };
export default retryer;
