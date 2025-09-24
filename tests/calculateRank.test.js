import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";
import { expect, it, describe } from "@jest/globals";

const assertRank = (input, expected) => {
  const result = calculateRank(input);
  expect(result.level).toBe(expected.level);
  expect(result.percentile).toBeCloseTo(expected.percentile, 10);
};

describe("Test calculateRank", () => {
  it("new user gets C rank", () => {
    assertRank(
      {
        all_commits: false,
        commits: 0,
        prs: 0,
        issues: 0,
        reviews: 0,
        repos: 0,
        stars: 0,
        followers: 0,
      },
      { level: "C", percentile: 100 },
    );
  });

  it("beginner user gets B- rank", () => {
    assertRank(
      {
        all_commits: false,
        commits: 125,
        prs: 25,
        issues: 10,
        reviews: 5,
        repos: 0,
        stars: 25,
        followers: 5,
      },
      { level: "B-", percentile: 65.02918514848255 },
    );
  });

  it("median user gets B+ rank", () => {
    assertRank(
      {
        all_commits: false,
        commits: 250,
        prs: 50,
        issues: 25,
        reviews: 10,
        repos: 0,
        stars: 50,
        followers: 10,
      },
      { level: "B+", percentile: 46.09375 },
    );
  });

  it("average user gets B+ rank (include_all_commits)", () => {
    assertRank(
      {
        all_commits: true,
        commits: 1000,
        prs: 50,
        issues: 25,
        reviews: 10,
        repos: 0,
        stars: 50,
        followers: 10,
      },
      { level: "B+", percentile: 46.09375 },
    );
  });

  it("advanced user gets A rank", () => {
    assertRank(
      {
        all_commits: false,
        commits: 500,
        prs: 100,
        issues: 50,
        reviews: 20,
        repos: 0,
        stars: 200,
        followers: 40,
      },
      { level: "A", percentile: 20.841471354166664 },
    );
  });

  it("expert user gets A+ rank", () => {
    assertRank(
      {
        all_commits: false,
        commits: 1000,
        prs: 200,
        issues: 100,
        reviews: 40,
        repos: 0,
        stars: 800,
        followers: 160,
      },
      { level: "A+", percentile: 5.575988339442828 },
    );
  });

  it("sindresorhus gets S rank", () => {
    assertRank(
      {
        all_commits: false,
        commits: 1300,
        prs: 1500,
        issues: 4500,
        reviews: 1000,
        repos: 0,
        stars: 600000,
        followers: 50000,
      },
      { level: "S", percentile: 0.4578556547153667 },
    );
  });
});
