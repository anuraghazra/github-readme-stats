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
    ).toStrictEqual({ level: "A++", score: 37.035320318128086 });
  });
  
  it("new user gets B+ rank", () => {
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
  
  it("Linus Torvalds gets S+ rank", () => {
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
