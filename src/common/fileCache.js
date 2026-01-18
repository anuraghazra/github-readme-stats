// @ts-check

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { logger } from "./log.js";

const CACHE_DIR = path.resolve(process.cwd(), "cache");
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Ensure cache directory exists.
 */
const ensureCacheDir = () => {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
};

/**
 * Generate a unique cache key based on type and parameters.
 *
 * @param {string} type The type of data being cached (e.g., 'stats', 'top-langs', 'repo').
 * @param {Record<string, any>} params The parameters that make this cache entry unique.
 * @returns {string} The cache key (filename without extension).
 */
const getCacheKey = (type, params) => {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      if (params[key] !== undefined && params[key] !== null) {
        acc[key] = params[key];
      }
      return acc;
    }, /** @type {Record<string, any>} */ ({}));

  const hash = crypto
    .createHash("md5")
    .update(JSON.stringify(sortedParams))
    .digest("hex");

  return `${type}_${hash}`;
};

/**
 * Get the cache file path for a given key.
 *
 * @param {string} key The cache key.
 * @returns {string} The full path to the cache file.
 */
const getCacheFilePath = (key) => {
  return path.join(CACHE_DIR, `${key}.json`);
};

/**
 * Get cached data if it exists and is not expired.
 *
 * @param {string} type The type of data being cached.
 * @param {Record<string, any>} params The parameters that make this cache entry unique.
 * @param {number} [ttl] The TTL in milliseconds (default: 24 hours).
 * @returns {any|null} The cached data or null if not found/expired.
 */
const getCachedData = (type, params, ttl = DEFAULT_TTL) => {
  try {
    const key = getCacheKey(type, params);
    const filePath = getCacheFilePath(key);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const cached = JSON.parse(fileContent);

    // Check if cache has expired
    const now = Date.now();
    if (now - cached.timestamp > ttl) {
      logger.log(`Cache expired for ${type}: ${key}`);
      // Optionally delete expired cache file
      try {
        fs.unlinkSync(filePath);
      } catch {
        // Ignore deletion errors
      }
      return null;
    }

    logger.log(`Cache hit for ${type}: ${key}`);
    return cached.data;
  } catch (error) {
    logger.log(`Cache read error: ${error}`);
    return null;
  }
};

/**
 * Save data to cache.
 *
 * @param {string} type The type of data being cached.
 * @param {Record<string, any>} params The parameters that make this cache entry unique.
 * @param {any} data The data to cache.
 */
const setCachedData = (type, params, data) => {
  try {
    ensureCacheDir();

    const key = getCacheKey(type, params);
    const filePath = getCacheFilePath(key);

    const cacheEntry = {
      timestamp: Date.now(),
      type,
      params,
      data,
    };

    fs.writeFileSync(filePath, JSON.stringify(cacheEntry, null, 2), "utf-8");
    logger.log(`Cache saved for ${type}: ${key}`);
  } catch (error) {
    logger.log(`Cache write error: ${error}`);
    // Don't throw - caching is best-effort
  }
};

/**
 * Clear all cached data or data of a specific type.
 *
 * @param {string} [type] Optional type to clear only specific cache entries.
 */
const clearCache = (type) => {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      return;
    }

    const files = fs.readdirSync(CACHE_DIR);
    for (const file of files) {
      if (!type || file.startsWith(`${type}_`)) {
        fs.unlinkSync(path.join(CACHE_DIR, file));
      }
    }
    logger.log(`Cache cleared${type ? ` for type: ${type}` : ""}`);
  } catch (error) {
    logger.log(`Cache clear error: ${error}`);
  }
};

/**
 * Get cache statistics.
 *
 * @returns {{ totalFiles: number, totalSize: number, types: Record<string, number> }} Cache statistics.
 */
const getCacheStats = () => {
  const stats = {
    totalFiles: 0,
    totalSize: 0,
    types: /** @type {Record<string, number>} */ ({}),
  };

  try {
    if (!fs.existsSync(CACHE_DIR)) {
      return stats;
    }

    const files = fs.readdirSync(CACHE_DIR);
    for (const file of files) {
      const filePath = path.join(CACHE_DIR, file);
      const fileStat = fs.statSync(filePath);
      stats.totalFiles++;
      stats.totalSize += fileStat.size;

      // Extract type from filename
      const type = file.split("_")[0];
      stats.types[type] = (stats.types[type] || 0) + 1;
    }
  } catch (error) {
    logger.log(`Cache stats error: ${error}`);
  }

  return stats;
};

export {
  getCacheKey,
  getCachedData,
  setCachedData,
  clearCache,
  getCacheStats,
  CACHE_DIR,
  DEFAULT_TTL,
};
