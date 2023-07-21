import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";
import { expect, it, describe } from "@jest/globals";

describe("Test calculateRank", () => {
  it("new user gets C+ rank", () => {
    expect(
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
    ).toStrictEqual({ level: "C+", percentile: 78.26086956521738 });
  });

  it("beginner user gets B rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 50,
        prs: 5,
        issues: 5,
        reviews: 0,
        repos: 5,
        stars: 5,
        followers: 5,
      }),
    ).toStrictEqual({ level: "B", percentile: 51.97101449275363 });
  });

  it("advanced user gets A- rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 250,
        prs: 25,
        issues: 25,
        reviews: 0,
        repos: 25,
        stars: 25,
        followers: 25,
      }),
    ).toStrictEqual({ level: "A-", percentile: 27.07608695652174 });
  });

  it("advanced user gets A- rank (include_all_commits)", () => {
    expect(
      calculateRank({
        all_commits: true,
        commits: 1000,
        prs: 25,
        issues: 25,
        reviews: 0,
        repos: 25,
        stars: 25,
        followers: 25,
      }),
    ).toStrictEqual({ level: "A-", percentile: 27.55619360131255 });
  });

  it("expert user gets A+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 500,
        prs: 100,
        issues: 100,
        reviews: 0,
        repos: 100,
        stars: 100,
        followers: 100,
      }),
    ).toStrictEqual({ level: "A+", percentile: 10.794579333709752 });
  });

  it("sindresorhus gets S rank", () => {
    expect(
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
    ).toStrictEqual({ level: "S", percentile: 0.4312953010223719 });
  });
});
