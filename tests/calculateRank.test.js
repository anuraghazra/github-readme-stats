require("@testing-library/jest-dom");
const calculateRank = require("../src/calculateRank");

describe("Test calculateRank", () => {
  it("should calculate rank correctly", () => {
    expect(
      calculateRank({
        ghIndex: 4,
        totalCommits: 100,
        totalRepos: 5,
        followers: 100,
        contributions: 61,
        stargazers: 400,
        prs: 300,
        issues: 200,
      })
    ).toStrictEqual({ level: "A+", score: 51.11796226386711 });
  });
});
