import { clampValue } from "./utils";

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
  let cacheSeconds = clampValue(parseInt(requested || def, 10), min, max);

  cacheSeconds = process.env.CACHE_SECONDS
    ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
    : cacheSeconds;

  return cacheSeconds;
};

export { resolveCacheSeconds };
