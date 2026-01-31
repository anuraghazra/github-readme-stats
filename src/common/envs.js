// @ts-check

const whitelist = process.env.WHITELIST
  ? process.env.WHITELIST.split(",")
  : undefined;

const gistWhitelist = process.env.GIST_WHITELIST
  ? process.env.GIST_WHITELIST.split(",")
  : undefined;

/**
 * Whether the all-time contributions feature is enabled.
 * Defaults to true if not explicitly set to "false".
 * Set ALL_TIME_CONTRIBS=false to disable the feature entirely.
 * @returns {boolean}
 */
const isAllTimeContribsEnabled = () =>
  process.env.ALL_TIME_CONTRIBS !== "false";

/**
 * Timeout for all-time contributions fetch in milliseconds.
 * Defaults to 9000ms (9 seconds) to stay within Vercel's 10s limit.
 * @returns {number}
 */
const getAllTimeContribsTimeoutMs = () => {
  const timeout = parseInt(
    process.env.ALL_TIME_CONTRIBS_TIMEOUT_MS || "9000",
    10,
  );
  return isNaN(timeout) ? 9000 : timeout;
};

/**
 * Maximum concurrent year fetches for all-time contributions.
 * Limits parallel API requests to avoid rate limiting.
 * Defaults to 3 concurrent requests.
 * @returns {number}
 */
const getAllTimeContribsConcurrency = () => {
  const concurrency = parseInt(
    process.env.ALL_TIME_CONTRIBS_CONCURRENCY || "3",
    10,
  );
  return isNaN(concurrency) ? 3 : concurrency;
};

const excludeRepositories = process.env.EXCLUDE_REPO
  ? process.env.EXCLUDE_REPO.split(",")
  : [];

export {
  whitelist,
  gistWhitelist,
  excludeRepositories,
  isAllTimeContribsEnabled,
  getAllTimeContribsTimeoutMs,
  getAllTimeContribsConcurrency,
};
