require("@testing-library/jest-dom");
const calculateRank = require("../src/calculateRank");

describe("Test calculateRank", () => {
  it("should calculate rank correctly", () => {
    expect(
      calculateRank({
        totalCommits: 100,
        totalRepos: 5,
        followers: 100,
        contributions: 61,
        stargazers: 400,
        prs: 300,
        issues: 200,
      }),
    ).toStrictEqual({ level: "A+", score: 46.164852607446775 });
  });
  
  it("should be able to get B+ rank", () => {
    expect(
      calculateRank({
        totalCommits: 0,
        totalRepos: 0,
        followers: 0,
        contributions: 0,
        stargazers: 0,
        prs: 0,
        issues: 0,
      }),
    ).toStrictEqual({ level: "B+", score: 100 });
  });
  
  it("should be able to get S+ rank for Linus Torvalds", () => {
    expect(
      calculateRank({
        totalCommits: 2700,
        totalRepos: 2,
        followers: 132000,
        contributions: 2700,
        stargazers: 109100,
        prs: 71,
        issues: 2,
      }),
    ).toStrictEqual({ level: "S+", score: 0 });
  });
});
