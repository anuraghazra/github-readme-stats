import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";

describe("Test calculateRank", () => {
  it("new user gets B rank", () => {
    expect(
      calculateRank({
        totalRepos: 0,
        totalCommits: 0,
        contributions: 0,
        followers: 0,
        prs: 0,
        issues: 0,
        stargazers: 0,
      }),
    ).toStrictEqual({ level: "B", score: 100 });
  });

  it("average user gets A rank", () => {
    expect(
      calculateRank({
        totalRepos: 10,
        totalCommits: 500,
        contributions: 500,
        followers: 50,
        prs: 12,
        issues: 13,
        stargazers: 100,
      }),
    ).toStrictEqual({ level: "A", score: 50 });
  });

  it("more than average user gets A+ rank", () => {
    expect(
      calculateRank({
        totalRepos: 50,
        totalCommits: 1500,
        contributions: 1500,
        followers: 150,
        prs: 50,
        issues: 50,
        stargazers: 300,
      }),
    ).toStrictEqual({ level: "A+", score: 11.458333333333332 });
  });

  it("expert user gets S rank", () => {
    expect(
      calculateRank({
        totalRepos: 100,
        totalCommits: 2000,
        contributions: 2000,
        followers: 500,
        prs: 100,
        issues: 100,
        stargazers: 500,
      }),
    ).toStrictEqual({ level: "S", score: 2.685546875 });
  });

  it("Linus Torvalds gets S+ rank", () => {
    expect(
      calculateRank({
        totalRepos: 4,
        totalCommits: 20000,
        contributions: 20000,
        followers: 132000,
        prs: 71,
        issues: 2,
        stargazers: 109100,
      }),
    ).toStrictEqual({ level: "S+", score: 2.2021209178513677 });
  });
});
