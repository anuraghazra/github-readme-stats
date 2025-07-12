import { jest } from "@jest/globals";
import { expect, describe, it, beforeEach, afterEach } from "@jest/globals";
import {
  INTERNAL_EXCLUDED_REPOS,
  getExcludedReposFromEnv,
  getExcludedPatternsFromEnv,
  isRepoExcludedByInternalRules,
  getCombinedExcludedRepos,
} from "../src/common/excluded-repos.js";

describe("excluded-repos", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("getExcludedReposFromEnv", () => {
    it("should return empty array when EXCLUDED_REPOS is not set", () => {
      delete process.env.EXCLUDED_REPOS;
      expect(getExcludedReposFromEnv()).toEqual([]);
    });

    it("should parse comma-separated repository names", () => {
      process.env.EXCLUDED_REPOS = "repo1,repo2,repo3";
      expect(getExcludedReposFromEnv()).toEqual(["repo1", "repo2", "repo3"]);
    });

    it("should trim whitespace from repository names", () => {
      process.env.EXCLUDED_REPOS = " repo1 , repo2 , repo3 ";
      expect(getExcludedReposFromEnv()).toEqual(["repo1", "repo2", "repo3"]);
    });

    it("should filter out empty strings", () => {
      process.env.EXCLUDED_REPOS = "repo1,,repo2,";
      expect(getExcludedReposFromEnv()).toEqual(["repo1", "repo2"]);
    });
  });

  describe("getExcludedPatternsFromEnv", () => {
    it("should return empty array when EXCLUDED_PATTERNS is not set", () => {
      delete process.env.EXCLUDED_PATTERNS;
      expect(getExcludedPatternsFromEnv()).toEqual([]);
    });

    it("should parse comma-separated regex patterns", () => {
      process.env.EXCLUDED_PATTERNS = "^test-.*,.*-backup$";
      const patterns = getExcludedPatternsFromEnv();
      expect(patterns).toHaveLength(2);
      expect(patterns[0].test("test-repo")).toBe(true);
      expect(patterns[1].test("repo-backup")).toBe(true);
    });

    it("should handle invalid regex patterns gracefully", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      process.env.EXCLUDED_PATTERNS = "^test-.*,[invalid,.*-backup$";
      const patterns = getExcludedPatternsFromEnv();
      expect(patterns).toHaveLength(2);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("isRepoExcludedByInternalRules", () => {
    beforeEach(() => {
      // Reset internal config to defaults
      INTERNAL_EXCLUDED_REPOS.exact = [];
      INTERNAL_EXCLUDED_REPOS.patterns = [];
      INTERNAL_EXCLUDED_REPOS.conditions = {
        archived: false,
        fork: false,
        private: false,
      };
    });

    it("should not exclude repositories by default", () => {
      const repo = { name: "test-repo" };
      expect(isRepoExcludedByInternalRules(repo)).toBe(false);
    });

    it("should exclude repositories by exact match in config", () => {
      INTERNAL_EXCLUDED_REPOS.exact = ["test-repo", "old-project"];
      expect(isRepoExcludedByInternalRules({ name: "test-repo" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "old-project" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "other-repo" })).toBe(false);
    });

    it("should exclude repositories by exact match from environment", () => {
      process.env.EXCLUDED_REPOS = "env-repo1,env-repo2";
      expect(isRepoExcludedByInternalRules({ name: "env-repo1" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "env-repo2" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "other-repo" })).toBe(false);
    });

    it("should exclude repositories by pattern match in config", () => {
      INTERNAL_EXCLUDED_REPOS.patterns = [/^test-.*/, /.*-backup$/];
      expect(isRepoExcludedByInternalRules({ name: "test-repo" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "repo-backup" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "normal-repo" })).toBe(false);
    });

    it("should exclude repositories by pattern match from environment", () => {
      process.env.EXCLUDED_PATTERNS = "^temp-.*,.*-old$";
      expect(isRepoExcludedByInternalRules({ name: "temp-file" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "project-old" })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "normal-repo" })).toBe(false);
    });

    it("should exclude archived repositories when configured", () => {
      INTERNAL_EXCLUDED_REPOS.conditions.archived = true;
      expect(isRepoExcludedByInternalRules({ name: "repo", isArchived: true })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "repo", isArchived: false })).toBe(false);
    });

    it("should exclude fork repositories when configured", () => {
      INTERNAL_EXCLUDED_REPOS.conditions.fork = true;
      expect(isRepoExcludedByInternalRules({ name: "repo", isFork: true })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "repo", isFork: false })).toBe(false);
    });

    it("should exclude private repositories when configured", () => {
      INTERNAL_EXCLUDED_REPOS.conditions.private = true;
      expect(isRepoExcludedByInternalRules({ name: "repo", isPrivate: true })).toBe(true);
      expect(isRepoExcludedByInternalRules({ name: "repo", isPrivate: false })).toBe(false);
    });
  });

  describe("getCombinedExcludedRepos", () => {
    beforeEach(() => {
      INTERNAL_EXCLUDED_REPOS.exact = [];
    });

    it("should combine URL exclusions with internal config", () => {
      INTERNAL_EXCLUDED_REPOS.exact = ["config-repo1", "config-repo2"];
      const urlExclusions = ["url-repo1", "url-repo2"];
      const combined = getCombinedExcludedRepos(urlExclusions);
      
      expect(combined.has("config-repo1")).toBe(true);
      expect(combined.has("config-repo2")).toBe(true);
      expect(combined.has("url-repo1")).toBe(true);
      expect(combined.has("url-repo2")).toBe(true);
      expect(combined.size).toBe(4);
    });

    it("should combine URL exclusions with environment variables", () => {
      process.env.EXCLUDED_REPOS = "env-repo1,env-repo2";
      const urlExclusions = ["url-repo1"];
      const combined = getCombinedExcludedRepos(urlExclusions);
      
      expect(combined.has("env-repo1")).toBe(true);
      expect(combined.has("env-repo2")).toBe(true);
      expect(combined.has("url-repo1")).toBe(true);
      expect(combined.size).toBe(3);
    });

    it("should handle duplicates correctly", () => {
      INTERNAL_EXCLUDED_REPOS.exact = ["duplicate-repo"];
      process.env.EXCLUDED_REPOS = "duplicate-repo";
      const urlExclusions = ["duplicate-repo"];
      const combined = getCombinedExcludedRepos(urlExclusions);
      
      expect(combined.has("duplicate-repo")).toBe(true);
      expect(combined.size).toBe(1);
    });
  });
});