import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";

/**
 * Assert a rank, comparing the percentile approximately.
 *
 * The percentile is the result of a chain of floating point operations whose
 * last digits differ between V8 versions, so an exact comparison is brittle.
 *
 * @param {object} rank Rank returned by `calculateRank`.
 * @param {string} level Expected level.
 * @param {number} percentile Expected percentile.
 * @returns {void}
 */
const expectRank = (rank, level, percentile) => {
  expect(rank.level).toStrictEqual(level);
  expect(rank.percentile).toBeCloseTo(percentile, 10);
};

describe("Test calculateRank", () => {
  it("new user gets C rank", () => {
    expectRank(
      calculateRank({
        all_commits: false,
        commits: 0,
        prs: 0,
        issues: 0,
        reviews: 0,
        repos: 0,
        stars: 0,
        followers: 0,
      }),
      "C",
      100,
    );
  });

  it("beginner user gets B- rank", () => {
    expectRank(
      calculateRank({
        all_commits: false,
        commits: 125,
        prs: 25,
        issues: 10,
        reviews: 5,
        repos: 0,
        stars: 25,
        followers: 5,
      }),
      "B-",
      65.02918514848255,
    );
  });

  it("median user gets B+ rank", () => {
    expectRank(
      calculateRank({
        all_commits: false,
        commits: 250,
        prs: 50,
        issues: 25,
        reviews: 10,
        repos: 0,
        stars: 50,
        followers: 10,
      }),
      "B+",
      46.09375,
    );
  });

  it("average user gets B+ rank (include_all_commits)", () => {
    expectRank(
      calculateRank({
        all_commits: true,
        commits: 1000,
        prs: 50,
        issues: 25,
        reviews: 10,
        repos: 0,
        stars: 50,
        followers: 10,
      }),
      "B+",
      46.09375,
    );
  });

  it("advanced user gets A rank", () => {
    expectRank(
      calculateRank({
        all_commits: false,
        commits: 500,
        prs: 100,
        issues: 50,
        reviews: 20,
        repos: 0,
        stars: 200,
        followers: 40,
      }),
      "A",
      20.841471354166664,
    );
  });

  it("expert user gets A+ rank", () => {
    expectRank(
      calculateRank({
        all_commits: false,
        commits: 1000,
        prs: 200,
        issues: 100,
        reviews: 40,
        repos: 0,
        stars: 800,
        followers: 160,
      }),
      "A+",
      5.575988339442828,
    );
  });

  it("sindresorhus gets S rank", () => {
    expectRank(
      calculateRank({
        all_commits: false,
        commits: 1300,
        prs: 1500,
        issues: 4500,
        reviews: 1000,
        repos: 0,
        stars: 600000,
        followers: 50000,
      }),
      "S",
      0.4578556547153667,
    );
  });
});
