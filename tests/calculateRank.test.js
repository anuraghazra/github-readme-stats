require("@testing-library/jest-dom");
const calculateRank = require("../src/calculateRank");

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
    ).toStrictEqual({level: "B", score: 100.});
  });

  it("average user gets A rank", () => {
    expect(
      calculateRank({
        totalRepos: 10,
        totalCommits: 1000,
        contributions: 1000,
        followers: 50,
        prs: 25,
        issues: 25,
        stargazers: 100,
      }),
    ).toStrictEqual({"A", score: 36.787944117144235});
  });

  it("Linus Torvalds gets S rank", () => {
    expect(
      calculateRank({
        totalRepos: 4, // few repos
        totalCommits: 20000,
        contributions: 20000,
        followers: 132000,
        prs: 71,
        issues: 2,
        stargazers: 109100,
      }),
    ).toStrictEqual({ level: "S", score: 7.092453734726941});
  });
});
