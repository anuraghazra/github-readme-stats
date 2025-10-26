// @ts-check

import { clampValue } from "./ops.js";

const MIN = 60;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/**
 * Common durations in seconds.
 */
const DURATIONS = {
  ONE_MINUTE: MIN,
  FIVE_MINUTES: 5 * MIN,
  TEN_MINUTES: 10 * MIN,
  FIFTEEN_MINUTES: 15 * MIN,
  THIRTY_MINUTES: 30 * MIN,

  TWO_HOURS: 2 * HOUR,
  FOUR_HOURS: 4 * HOUR,
  SIX_HOURS: 6 * HOUR,
  EIGHT_HOURS: 8 * HOUR,
  TWELVE_HOURS: 12 * HOUR,

  ONE_DAY: DAY,
  TWO_DAY: 2 * DAY,
  SIX_DAY: 6 * DAY,
  TEN_DAY: 10 * DAY,
};

/**
 * Common cache TTL values in seconds.
 */
const CACHE_TTL = {
  STATS_CARD: {
    DEFAULT: DURATIONS.ONE_DAY,
    MIN: DURATIONS.TWELVE_HOURS,
    MAX: DURATIONS.TWO_DAY,
  },
  TOP_LANGS_CARD: {
    DEFAULT: DURATIONS.SIX_DAY,
    MIN: DURATIONS.TWO_DAY,
    MAX: DURATIONS.TEN_DAY,
  },
  PIN_CARD: {
    DEFAULT: DURATIONS.TEN_DAY,
    MIN: DURATIONS.ONE_DAY,
    MAX: DURATIONS.TEN_DAY,
  },
  GIST_CARD: {
    DEFAULT: DURATIONS.TWO_DAY,
    MIN: DURATIONS.ONE_DAY,
    MAX: DURATIONS.TEN_DAY,
  },
  WAKATIME_CARD: {
    DEFAULT: DURATIONS.ONE_DAY,
    MIN: DURATIONS.TWELVE_HOURS,
    MAX: DURATIONS.TWO_DAY,
  },
  ERROR: DURATIONS.TEN_MINUTES,
};

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
 * @param {any} res The response object.
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
 * @param {any} res The response object.
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
      `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
  );
};

/**
 * Sets the Cache-Control headers for error responses on the response object.
 *
 * @param {any} res The response object.
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
    `max-age=${CACHE_TTL.ERROR}, ` +
      `s-maxage=${CACHE_TTL.ERROR}, ` +
      `stale-while-revalidate=${DURATIONS.ONE_DAY}`,
  );
};

export {
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
  DURATIONS,
  CACHE_TTL,
};
