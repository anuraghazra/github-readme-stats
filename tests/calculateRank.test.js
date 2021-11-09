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
        totalCommits: 500,
        contributions: 500,
        followers: 50,
        prs: 12,
        issues: 13,
        stargazers: 100,
      }),
    ).toStrictEqual({level: "A", score: 50.});
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
    ).toStrictEqual({level: "S+", score: 1.8875322153011722});
  });
});
