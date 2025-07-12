// @ts-check
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Internal excluded repositories configuration.
 * This configuration can be used to exclude specific repositories from stats calculation
 * without needing to modify the API URL parameters.
 */
export const INTERNAL_EXCLUDED_REPOS = {
  // Exact repository names to exclude
  exact: [],
  
  // Regex patterns for repositories to exclude
  patterns: [],
  
  // Condition-based exclusions
  conditions: {
    archived: false,    // Whether to exclude archived repositories
    fork: false,       // Whether to exclude fork repositories
    private: false     // Whether to exclude private repositories
  }
};

/**
 * Get excluded repository names from environment variable.
 * 
 * @returns {string[]} Array of repository names to exclude.
 */
export const getExcludedReposFromEnv = () => {
  const excludedRepos = process.env.EXCLUDED_REPOS || "";
  return excludedRepos
    .split(",")
    .map(repo => repo.trim())
    .filter(repo => repo.length > 0);
};

/**
 * Get excluded patterns from environment variable.
 * 
 * @returns {RegExp[]} Array of regex patterns for repositories to exclude.
 */
export const getExcludedPatternsFromEnv = () => {
  const excludedPatterns = process.env.EXCLUDED_PATTERNS || "";
  return excludedPatterns
    .split(",")
    .map(pattern => pattern.trim())
    .filter(pattern => pattern.length > 0)
    .map(pattern => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        console.error(`Invalid regex pattern: ${pattern}`, e);
        return null;
      }
    })
    .filter(pattern => pattern !== null);
};

/**
 * Check if a repository should be excluded based on internal rules.
 * 
 * @param {object} repo Repository object.
 * @param {string} repo.name Repository name.
 * @param {boolean} [repo.isArchived] Whether the repository is archived.
 * @param {boolean} [repo.isFork] Whether the repository is a fork.
 * @param {boolean} [repo.isPrivate] Whether the repository is private.
 * @returns {boolean} True if the repository should be excluded.
 */
export const isRepoExcludedByInternalRules = (repo) => {
  // Check exact matches from config
  if (INTERNAL_EXCLUDED_REPOS.exact.includes(repo.name)) {
    return true;
  }
  
  // Check exact matches from environment
  const envExactExcludes = getExcludedReposFromEnv();
  if (envExactExcludes.includes(repo.name)) {
    return true;
  }
  
  // Check pattern matches from config
  for (const pattern of INTERNAL_EXCLUDED_REPOS.patterns) {
    if (pattern.test(repo.name)) {
      return true;
    }
  }
  
  // Check pattern matches from environment
  const envPatterns = getExcludedPatternsFromEnv();
  for (const pattern of envPatterns) {
    if (pattern.test(repo.name)) {
      return true;
    }
  }
  
  // Check condition-based exclusions
  if (INTERNAL_EXCLUDED_REPOS.conditions.archived && repo.isArchived) {
    return true;
  }
  
  if (INTERNAL_EXCLUDED_REPOS.conditions.fork && repo.isFork) {
    return true;
  }
  
  if (INTERNAL_EXCLUDED_REPOS.conditions.private && repo.isPrivate) {
    return true;
  }
  
  return false;
};

/**
 * Get all excluded repository names from both URL parameters and internal rules.
 * 
 * @param {string[]} urlExcludedRepos Repository names excluded via URL parameters.
 * @returns {Set<string>} Combined set of excluded repository names.
 */
export const getCombinedExcludedRepos = (urlExcludedRepos = []) => {
  const excludedSet = new Set(urlExcludedRepos);
  
  // Add exact matches from config
  INTERNAL_EXCLUDED_REPOS.exact.forEach(repo => excludedSet.add(repo));
  
  // Add exact matches from environment
  getExcludedReposFromEnv().forEach(repo => excludedSet.add(repo));
  
  return excludedSet;
};