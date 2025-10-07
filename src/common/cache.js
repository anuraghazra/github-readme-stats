// @ts-check

import { clampValue, CONSTANTS } from "./utils.js";

/**
 * Resolves the cache seconds based on the requested, default, min, and max values.
 *
 * @param {Object} args The parameters object.
 * @param {number} args.requested The requested cache seconds.
 * @param {number} args.def The default cache seconds.
 * @param {number} args.min The minimum cache seconds.
 * @param {number} args.max The maximum cache seconds.
 * @returns {number} The resolved cache seconds.
 */
const resolveCacheSeconds = ({ requested, def, min, max }) => {
  let cacheSeconds = clampValue(isNaN(requested) ? def : requested, min, max);

  if (process.env.CACHE_SECONDS) {
    const envCacheSeconds = parseInt(process.env.CACHE_SECONDS, 10);
    if (!isNaN(envCacheSeconds)) {
      cacheSeconds = envCacheSeconds;
    }
  }

  return cacheSeconds;
};

/**
 * Disables caching by setting appropriate headers on the response object.
 *
 * @param {Object} res The response object.
 */
const disableCaching = (res) => {
  // Disable caching for browsers, shared caches/CDNs, and GitHub Camo.
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
};

/**
 * Sets the Cache-Control headers on the response object.
 *
 * @param {Object} res The response object.
 * @param {number} cacheSeconds The cache seconds to set in the headers.
 */
const setCacheHeaders = (res, cacheSeconds) => {
  if (cacheSeconds < 1 || process.env.NODE_ENV === "development") {
    disableCaching(res);
    return;
  }

  res.setHeader(
    "Cache-Control",
    `max-age=${cacheSeconds}, ` +
      `s-maxage=${cacheSeconds}, ` +
      `stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
  );
};

/**
 * Sets the Cache-Control headers for error responses on the response object.
 *
 * @param {Object} res The response object.
 */
const setErrorCacheHeaders = (res) => {
  const envCacheSeconds = process.env.CACHE_SECONDS
    ? parseInt(process.env.CACHE_SECONDS, 10)
    : NaN;
  if (
    (!isNaN(envCacheSeconds) && envCacheSeconds < 1) ||
    process.env.NODE_ENV === "development"
  ) {
    disableCaching(res);
    return;
  }

  // Use lower cache period for errors.
  res.setHeader(
    "Cache-Control",
    `max-age=${CONSTANTS.ERROR_CACHE_SECONDS}, ` +
      `s-maxage=${CONSTANTS.ERROR_CACHE_SECONDS}, ` +
      `stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
  );
};

export { resolveCacheSeconds, setCacheHeaders, setErrorCacheHeaders };
