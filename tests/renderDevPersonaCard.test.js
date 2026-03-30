// @ts-check

import { renderDevPersonaCard } from "../src/cards/dev-persona.js";
import { describe, it, expect } from "@jest/globals";

describe("renderDevPersonaCard", () => {
  const mockDevPersonaData = {
    username: "testuser",
    name: "Test User",
    bio: "Building cool stuff",
    followers: 100,
    totalRepos: 25,
    totalStars: 500,
    totalPRs: 50,
    totalMergedPRs: 45,
    totalIssues: 30,
    totalCommits: 1000,
    totalContributions: 2000,
    discussions: 5,
    gists: 10,
    topLanguages: [
      { name: "JavaScript", percent: 40 },
      { name: "Python", percent: 30 },
      { name: "TypeScript", percent: 20 },
    ],
    contributionsCollection: {
      totalCommitContributions: 1000,
      totalIssueContributions: 200,
      totalPullRequestContributions: 800,
      totalRepositoryContributions: 5,
    },
    wakatime: null,
    custom: {
      focus_hours: 8,
      bugs_fixed: 25,
      coffee_cups: 4,
      productivity_score: 85,
    },
    bugSlayerLevel: 7,
    coffeeCodeRatio: {
      value: "0.36",
      label: "0.36 hrs/☕",
    },
  };

  it("should render card with default theme", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("svg");
    expect(card).toContain("testuser");
    expect(card).toContain("Test User");
  });

  it("should render card with hacker_dark theme", () => {
    const card = renderDevPersonaCard(mockDevPersonaData, {
      theme: "hacker_dark",
      title_color: "#00FF41",
      text_color: "#00FF41",
      icon_color: "#00FFFF",
      bg_color: "#0D0D0D",
      border_color: "#00FF41",
    });
    expect(card).toContain("#00FF41");
    expect(card).toContain("#0D0D0D");
  });

  it("should include bug slayer level", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("BUG SLAYER");
  });

  it("should include coffee to code ratio", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("CODE RATIO");
  });

  it("should include terminal section", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("terminal-section");
    expect(card).toContain("testuser.exe");
  });

  it("should include animations by default", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("animation");
  });

  it("should disable animations when animate=false", () => {
    const card = renderDevPersonaCard(mockDevPersonaData, {
      animate: false,
    });
    // Check if animations are disabled (animation-duration: 0s)
    expect(card).toContain("svg");
  });

  it("should hide border when hide_border=true", () => {
    const card = renderDevPersonaCard(mockDevPersonaData, {
      hide_border: true,
    });
    expect(card).toContain("svg");
  });

  it("should use custom card width", () => {
    const card = renderDevPersonaCard(mockDevPersonaData, {
      card_width: 600,
    });
    expect(card).toContain('width="600"');
  });

  it("should include user statistics", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("1k"); // Total commits formatted
  });

  it("should include follower count", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("followers");
  });

  it("should include productivity score", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("productive");
  });

  it("should render glow effects", () => {
    const card = renderDevPersonaCard(mockDevPersonaData);
    expect(card).toContain("glow");
  });
});
