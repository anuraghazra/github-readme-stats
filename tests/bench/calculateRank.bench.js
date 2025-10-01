import { calculateRank } from "../../src/calculateRank.js";
import { it } from "@jest/globals";
import { runAndLogStats } from "./utils.js";

it("calculateRank", async () => {
  await runAndLogStats("calculateRank", () => {
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
  });
});
