// @ts-check

import axios from "axios";
import { createRequire } from "module";
import { retryer } from "../common/retryer.js";
import { CustomError, MissingParamError } from "../common/error.js";

const require = createRequire(import.meta.url);
const languageColors = require("../common/languageColors.json");

const GITHUB_API_URL = "https://api.github.com";
const DEFAULT_PAGES = 2;
const MAX_PAGES = 10;

const SPECIAL_FILENAMES = {
  "dockerfile": "Dockerfile",
  "dockerfile.dev": "Dockerfile",
  "dockerfile.prod": "Dockerfile",
  "makefile": "Makefile",
  "cmakelists.txt": "CMake",
  "gemfile": "Ruby",
  "rakefile": "Ruby",
  "jenkinsfile": "Groovy",
  "procfile": "Procfile",
  "vagrantfile": "Ruby",
  "composer.json": "JSON",
  "package.json": "JSON",
  "tsconfig.json": "JSON",
};

const EXTENSION_LANGUAGES = {
  ".astro": "Astro",
  ".bat": "Batchfile",
  ".c": "C",
  ".cc": "C++",
  ".clj": "Clojure",
  ".cljs": "Clojure",
  ".cpp": "C++",
  ".cs": "C#",
  ".css": "CSS",
  ".dart": "Dart",
  ".ex": "Elixir",
  ".exs": "Elixir",
  ".go": "Go",
  ".graphql": "GraphQL",
  ".gql": "GraphQL",
  ".groovy": "Groovy",
  ".h": "C",
  ".hpp": "C++",
  ".html": "HTML",
  ".java": "Java",
  ".js": "JavaScript",
  ".json": "JSON",
  ".jsx": "JavaScript",
  ".kt": "Kotlin",
  ".kts": "Kotlin",
  ".less": "Less",
  ".lua": "Lua",
  ".md": "Markdown",
  ".mjs": "JavaScript",
  ".php": "PHP",
  ".pl": "Perl",
  ".prisma": "Prisma",
  ".py": "Python",
  ".r": "R",
  ".rb": "Ruby",
  ".rs": "Rust",
  ".sass": "Sass",
  ".scala": "Scala",
  ".scss": "SCSS",
  ".sh": "Shell",
  ".sql": "SQL",
  ".svelte": "Svelte",
  ".swift": "Swift",
  ".tsx": "TypeScript",
  ".ts": "TypeScript",
  ".vue": "Vue",
  ".xml": "XML",
  ".yaml": "YAML",
  ".yml": "YAML",
};

const IGNORED_EXTENSIONS = new Set([
  ".gif",
  ".ico",
  ".jpg",
  ".jpeg",
  ".lock",
  ".map",
  ".pdf",
  ".png",
  ".svg",
  ".webp",
]);

const IGNORED_FILENAMES = new Set([
  "composer.lock",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
]);

const IGNORED_PATH_PARTS = new Set([
  "dist",
  "build",
  "coverage",
  "node_modules",
  "vendor",
]);

/**
 * @param {number | string | undefined} pages Requested number of Search API pages.
 * @returns {number} A bounded page count.
 */
const normalizePages = (pages) => {
  const parsedPages = parseInt(String(pages || DEFAULT_PAGES), 10);

  if (Number.isNaN(parsedPages) || parsedPages < 1) {
    return DEFAULT_PAGES;
  }

  return Math.min(parsedPages, MAX_PAGES);
};

/**
 * @param {string} filename File path returned by the GitHub commit API.
 * @returns {string | null} Lowercase file extension, or null when absent.
 */
const getExtension = (filename) => {
  const lastPathPart = filename.split("/").pop() || filename;
  const dotIndex = lastPathPart.lastIndexOf(".");

  if (dotIndex <= 0) {
    return null;
  }

  return lastPathPart.slice(dotIndex).toLowerCase();
};

/**
 * @param {string} filename File path returned by the GitHub commit API.
 * @returns {boolean} Whether the file should be skipped from language totals.
 */
const shouldIgnoreFile = (filename) => {
  const normalizedParts = filename.toLowerCase().split("/");
  const lastPathPart = normalizedParts[normalizedParts.length - 1];

  if (IGNORED_FILENAMES.has(lastPathPart)) {
    return true;
  }

  if (normalizedParts.some((part) => IGNORED_PATH_PARTS.has(part))) {
    return true;
  }

  const extension = getExtension(filename);
  return extension ? IGNORED_EXTENSIONS.has(extension) : false;
};

/**
 * @param {string} filename File path returned by the GitHub commit API.
 * @returns {string | null} Detected language name, or null when unknown.
 */
const detectLanguage = (filename) => {
  const lastPathPart = filename.split("/").pop()?.toLowerCase() || filename;

  if (SPECIAL_FILENAMES[lastPathPart]) {
    return SPECIAL_FILENAMES[lastPathPart];
  }

  const extension = getExtension(filename);

  if (!extension) {
    return null;
  }

  return EXTENSION_LANGUAGES[extension] || null;
};

/**
 * @param {string} path GitHub REST API path.
 * @param {string} token GitHub token used for private repository access.
 * @param {Record<string, string | number>} params Query string parameters.
 * @returns {Promise<import("axios").AxiosResponse>} GitHub REST API response.
 */
const githubGet = (path, token, params = {}) => {
  return axios({
    url: `${GITHUB_API_URL}${path}`,
    method: "get",
    headers: {
      Accept: "application/vnd.github.cloak-preview+json, application/vnd.github+json",
      Authorization: `token ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    params,
  });
};

/**
 * @param {string} token GitHub token used for private repository access.
 * @param {string} query Search query.
 * @param {number} page Search result page number.
 * @returns {Promise<any[]>} Commit search result items.
 */
const searchCommits = async (token, query, page) => {
  const res = await githubGet("/search/commits", token, {
    q: query,
    per_page: 100,
    page,
  });

  return res.data.items || [];
};

/**
 * @param {string} token GitHub token used for private repository access.
 * @param {string} owner Repository owner login.
 * @param {string} repo Repository name.
 * @param {string} sha Commit SHA.
 * @returns {Promise<any[]>} Files changed in the commit.
 */
const fetchCommitFiles = async (token, owner, repo, sha) => {
  const res = await githubGet(`/repos/${owner}/${repo}/commits/${sha}`, token);
  return res.data.files || [];
};

/**
 * @param {{ username: string, orgs: string[], pages: number }} variables Fetcher variables.
 * @param {string} token GitHub token used for private repository access.
 * @returns {Promise<{ data: Record<string, { name: string, color: string, size: number, count: number }> }>} Aggregated language data.
 */
const fetcher = async ({ username, orgs, pages }, token) => {
  const languageStats = {};
  const seenCommits = new Set();
  const searchScopes = orgs.length > 0 ? orgs.map((org) => `org:${org}`) : [""];

  for (const scope of searchScopes) {
    const query = ["author:" + username, scope]
      .filter(Boolean)
      .join(" ")
      .trim();

    for (let page = 1; page <= pages; page++) {
      const commits = await searchCommits(token, query, page);

      if (commits.length === 0) {
        break;
      }

      for (const commit of commits) {
        const repository = commit.repository;
        const sha = commit.sha;

        if (!repository?.full_name || !sha || seenCommits.has(sha)) {
          continue;
        }

        seenCommits.add(sha);

        const [owner, repo] = repository.full_name.split("/");
        const files = await fetchCommitFiles(token, owner, repo, sha);
        const languagesInCommit = new Set();

        for (const file of files) {
          if (!file.filename || shouldIgnoreFile(file.filename)) {
            continue;
          }

          const language = detectLanguage(file.filename);
          const additions = Number(file.additions || 0);

          if (!language || additions <= 0) {
            continue;
          }

          if (!languageStats[language]) {
            languageStats[language] = {
              name: language,
              color: languageColors[language] || "#858585",
              size: 0,
              count: 0,
            };
          }

          languageStats[language].size += additions;
          languagesInCommit.add(language);
        }

        languagesInCommit.forEach((language) => {
          languageStats[language].count += 1;
        });
      }
    }
  }

  return { data: languageStats };
};

/**
 * Fetch top languages from commits authored by a given username.
 *
 * @param {string} username GitHub username.
 * @param {string[]} orgs Organization logins to include. Empty means all accessible commits.
 * @param {number | string | undefined} pages Search pages to scan, 100 commits per page.
 * @returns {Promise<import("./types").TopLangData>} Top languages data.
 */
const fetchPersonalContributionLanguages = async (
  username,
  orgs = [],
  pages = DEFAULT_PAGES,
) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const res = await retryer(fetcher, {
    username,
    orgs,
    pages: normalizePages(pages),
  });

  if (res.status && res.status >= 400) {
    throw new CustomError(
      res.data?.message || "Could not fetch contribution language data",
      CustomError.GITHUB_REST_API_ERROR,
    );
  }

  if (!res.data || Object.keys(res.data).length === 0) {
    throw new CustomError(
      "No contribution language data found",
      CustomError.GITHUB_REST_API_ERROR,
    );
  }

  return Object.keys(res.data)
    .sort((a, b) => res.data[b].size - res.data[a].size)
    .reduce((result, key) => {
      result[key] = res.data[key];
      return result;
    }, {});
};

export {
  detectLanguage,
  fetchPersonalContributionLanguages,
  normalizePages,
  shouldIgnoreFile,
};
export default fetchPersonalContributionLanguages;
