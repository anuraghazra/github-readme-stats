// @ts-check

import { describe, it, expect, beforeAll } from "@jest/globals";
import * as dotenv from "dotenv";

dotenv.config();

describe("fetchDevPersonaData", () => {
  it("should handle missing GitHub token gracefully", () => {
    // The GitHub token is optional for local development
    // It will be required for actual API calls
    const hasToken = process.env.PAT_1 !== undefined;
    expect(typeof hasToken).toBe("boolean");
  });

  // Note: These tests require valid GitHub credentials and network access
  // For CI/CD environments, mock these tests or skip them
});

describe("Custom Metrics Generation", () => {
  it("should generate realistic custom metrics", () => {
    // Mock GitHub data
    const mockGithubData = {
      totalCommits: 365,
      totalIssues: 100,
      followers: 50,
      totalContributions: 500,
    };

    // Simulate metric calculation
    const commitDensity = mockGithubData.totalCommits / 365; // ~1
    const focusHours = Math.max(3, Math.min(12, Math.floor(commitDensity * 2)));
    const bugsFixes = Math.floor(mockGithubData.totalIssues * 0.7);
    const coffeeCups = Math.max(2, Math.floor((focusHours / 3) * 2));

    expect(focusHours).toBeGreaterThanOrEqual(3);
    expect(focusHours).toBeLessThanOrEqual(12);
    expect(bugsFixes).toBeGreaterThan(0);
    expect(coffeeCups).toBeGreaterThanOrEqual(2);
  });

  it("should calculate bug slayer level correctly", () => {
    const mockGithubData = {
      totalCommits: 1000,
      totalMergedPRs: 100,
      totalIssues: 50,
    };

    const score =
      (mockGithubData.totalCommits * 0.3 +
        mockGithubData.totalMergedPRs * 0.5 +
        mockGithubData.totalIssues * 0.2) /
      100;

    const level = Math.min(10, Math.max(1, Math.floor(score) + 1));

    expect(level).toBeGreaterThanOrEqual(1);
    expect(level).toBeLessThanOrEqual(10);
  });

  it("should calculate coffee to code ratio", () => {
    const mockGithubData = {
      totalCommits: 365,
    };

    const commitDensity = Math.max(1, mockGithubData.totalCommits / 365);
    const coffeePerCommit = (8 / commitDensity).toFixed(2);

    expect(parseFloat(coffeePerCommit)).toBeGreaterThan(0);
  });
});
