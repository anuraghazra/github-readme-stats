import { benchmarkSuite } from "jest-bench";
import { calculateRank } from "../../src/calculateRank.js";

benchmarkSuite("calculateRank", {
  ["calculateRank"]: () => {
    calculateRank({
      all_commits: false,
      commits: 1300,
      prs: 1500,
      issues: 4500,
      reviews: 1000,
      repos: 0,
      stars: 600000,
      followers: 50000,
    });
  },
});
