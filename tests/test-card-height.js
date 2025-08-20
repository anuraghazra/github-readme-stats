import { renderStatsCard } from "./src/cards/stats-card.js";
import { renderTopLanguages } from "./src/cards/top-languages-card.js";
import { renderRepoCard } from "./src/cards/repo-card.js";
import { renderGistCard } from "./src/cards/gist-card.js";
import { renderWakatimeCard } from "./src/cards/wakatime-card.js";

// Mock data for testing
const mockStats = {
  name: "testuser",
  totalStars: 100,
  totalCommits: 500,
  totalIssues: 25,
  totalPRs: 30,
  totalPRsMerged: 28,
  mergedPRsPercentage: 93.33,
  totalReviews: 50,
  totalDiscussionsStarted: 10,
  totalDiscussionsAnswered: 15,
  contributedTo: 20,
  rank: { level: "A+", percentile: 15 },
};

const mockTopLangs = {
  langs: [
    { name: "JavaScript", size: 50000, color: "#f1e05a" },
    { name: "Python", size: 30000, color: "#3572A5" },
    { name: "HTML", size: 20000, color: "#e34c26" },
  ],
  totalLanguageSize: 100000,
};

const mockRepo = {
  name: "test-repo",
  nameWithOwner: "testuser/test-repo",
  description: "A test repository",
  primaryLanguage: { name: "JavaScript", color: "#f1e05a" },
  isArchived: false,
  isTemplate: false,
  starCount: 50,
  forkCount: 10,
};

const mockGist = {
  name: "test-gist",
  nameWithOwner: "testuser/test-gist",
  description: "A test gist",
  language: "JavaScript",
  starsCount: 25,
  forksCount: 5,
};

const mockWakatime = {
  languages: [
    { name: "JavaScript", hours: 10, minutes: 30, percent: 60 },
    { name: "Python", hours: 5, minutes: 15, percent: 30 },
    { name: "HTML", hours: 1, minutes: 45, percent: 10 },
  ],
  range: "last_7_days",
  is_coding_activity_visible: true,
  is_other_usage_visible: true,
};

console.log("Testing card_height parameter...\n");

// Test stats card
console.log("1. Testing Stats Card:");
const statsCardDefault = renderStatsCard(mockStats, {});
const statsCardCustomHeight = renderStatsCard(mockStats, { card_height: 300 });
console.log(
  `   Default height: ${statsCardDefault.includes('height="') ? "Custom height applied" : "No height attribute"}`,
);
console.log(
  `   Custom height (300): ${statsCardCustomHeight.includes('height="300"') ? "Custom height applied" : "No height attribute"}`,
);

// Test top languages card
console.log("\n2. Testing Top Languages Card:");
const topLangsDefault = renderTopLanguages(mockTopLangs, {});
const topLangsCustomHeight = renderTopLanguages(mockTopLangs, {
  card_height: 250,
});
console.log(
  `   Default height: ${topLangsDefault.includes('height="') ? "Custom height applied" : "No height attribute"}`,
);
console.log(
  `   Custom height (250): ${topLangsCustomHeight.includes('height="250"') ? "Custom height applied" : "No height attribute"}`,
);

// Test repo card
console.log("\n3. Testing Repo Card:");
const repoCardDefault = renderRepoCard(mockRepo, {});
const repoCardCustomHeight = renderRepoCard(mockRepo, { card_height: 200 });
console.log(
  `   Default height: ${repoCardDefault.includes('height="') ? "Custom height applied" : "No height attribute"}`,
);
console.log(
  `   Custom height (200): ${repoCardCustomHeight.includes('height="200"') ? "Custom height applied" : "No height attribute"}`,
);

// Test gist card
console.log("\n4. Testing Gist Card:");
const gistCardDefault = renderGistCard(mockGist, {});
const gistCardCustomHeight = renderGistCard(mockGist, { card_height: 180 });
console.log(
  `   Default height: ${gistCardDefault.includes('height="') ? "Custom height applied" : "No height attribute"}`,
);
console.log(
  `   Custom height (180): ${gistCardCustomHeight.includes('height="180"') ? "Custom height applied" : "No height attribute"}`,
);

// Test wakatime card
console.log("\n5. Testing WakaTime Card:");
const wakatimeCardDefault = renderWakatimeCard(mockWakatime, {});
const wakatimeCardCustomHeight = renderWakatimeCard(mockWakatime, {
  card_height: 280,
});
console.log(
  `   Default height: ${wakatimeCardDefault.includes('height="') ? "Custom height applied" : "No height attribute"}`,
);
console.log(
  `   Custom height (280): ${wakatimeCardCustomHeight.includes('height="280"') ? "Custom height applied" : "No height attribute"}`,
);

console.log("\nTest completed!");
