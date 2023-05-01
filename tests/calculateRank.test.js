import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";

describe("Test calculateRank", () => {
  it("new user gets B rank", () => {
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
    ).toStrictEqual({ level: "B", score: 100 });
  });

  it("average user gets A rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 100,
        prs: 50,
        issues: 10,
        repos: 0,
        stars: 100,
        followers: 25,
      }),
    ).toStrictEqual({ level: "A", score: 50 });
  });

  it("average user gets A rank (include_all_commits)", () => {
    expect(
      calculateRank({
        all_commits: true,
        commits: 500,
        prs: 50,
        issues: 10,
        repos: 0,
        stars: 100,
        followers: 25,
      }),
    ).toStrictEqual({ level: "A", score: 50 });
  });

  it("more than average user gets A+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 200,
        prs: 100,
        issues: 20,
        repos: 0,
        stars: 200,
        followers: 50,
      }),
    ).toStrictEqual({ level: "A+", score: 25 });
  });

  it("expert user gets S rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 400,
        prs: 200,
        issues: 40,
        repos: 0,
        stars: 400,
        followers: 100,
      }),
    ).toStrictEqual({ level: "S", score: 6.25 });
  });

  it("ezyang gets S+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 1000,
        prs: 4000,
        issues: 2000,
        repos: 0,
        stars: 5000,
        followers: 2000,
      }),
    ).toStrictEqual({ level: "S+", score: 0.013950892857180923 });
  });
});
