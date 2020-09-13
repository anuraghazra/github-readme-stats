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
      })
    ).toStrictEqual({ level: "A+", score: 49.16605417270399 });
  });
});

describe("Test A++ calculateRank", () => {
  it("should calculate rank correctly", () => {
    expect(
      calculateRank({
        totalCommits: 1000,
        totalRepos: 50,
        followers: 1000,
        contributions: 610,
        stargazers: 4000,
        prs: 3000,
        issues: 2000,
      })
    ).toStrictEqual({ level: "A++", score: 32.89583911952869 });
  });
});

describe("Test calculateRank for new account", () => {
  it("should calculate rank correctly", () => {
    expect(
      calculateRank({
        totalCommits: 0,
        totalRepos: 0,
        followers: 0,
        contributions: 0,
        stargazers: 0,
        prs: 0,
        issues: 0,
      })
    ).toStrictEqual({ level: "A+", score: 51.03597635931825 });
  });
});
