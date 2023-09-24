import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";
import { expect, it, describe } from "@jest/globals";

describe("Test calculateRank", () => {
  it("new user gets C rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 0,
        prs: 0,
        issues: 0,
        repos: 0,
        stars: 0,
        followers: 0,
      }),
    ).toStrictEqual({ level: "C", percentile: 100 });
  });

  it("beginner user gets B- rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 125,
        prs: 25,
        issues: 10,
        repos: 0,
        stars: 25,
        followers: 5,
      }),
    ).toStrictEqual({ level: "B-", percentile: 69.333868386557 });
  });

  it("median user gets B+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 250,
        prs: 50,
        issues: 25,
        repos: 0,
        stars: 50,
        followers: 10,
      }),
    ).toStrictEqual({ level: "B+", percentile: 50 });
  });

  it("average user gets B+ rank (include_all_commits)", () => {
    expect(
      calculateRank({
        all_commits: true,
        commits: 1000,
        prs: 50,
        issues: 25,
        repos: 0,
        stars: 50,
        followers: 10,
      }),
    ).toStrictEqual({ level: "B+", percentile: 50 });
  });

  it("advanced user gets A rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 500,
        prs: 100,
        issues: 50,
        repos: 0,
        stars: 200,
        followers: 40,
      }),
    ).toStrictEqual({ level: "A", percentile: 22.72727272727273 });
  });

  it("expert user gets A+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 1000,
        prs: 200,
        issues: 100,
        repos: 0,
        stars: 800,
        followers: 160,
      }),
    ).toStrictEqual({ level: "A+", percentile: 6.082887700534744 });
  });

  it("sindresorhus gets S rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 1300,
        prs: 1500,
        issues: 4500,
        repos: 0,
        stars: 600000,
        followers: 50000,
      }),
    ).toStrictEqual({ level: "S", percentile: 0.49947889605312934 });
  });
});
