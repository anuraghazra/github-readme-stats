#!/usr/bin/env node
// Generates the stats / top-langs cards as static SVG files by calling the
// fetchers and renderers directly, without going through the HTTP API.
// Runs inside GitHub Actions with PAT_1 set to the workflow's GITHUB_TOKEN,
// so no personal access token is required.
//
// Environment variables:
//   PAT_1          GitHub token used by the fetchers (required)
//   CARD_USERNAME  GitHub username to render (required)
//   CARD_OUT_DIR   Output directory (default: current directory)
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { renderStatsCard } from "../src/cards/stats-card.js";
import { renderTopLanguages } from "../src/cards/top-languages-card.js";
import { fetchStats } from "../src/fetchers/stats-fetcher.js";
import { fetchTopLanguages } from "../src/fetchers/top-languages-fetcher.js";

const username = process.env.CARD_USERNAME;
if (!username) {
  console.error("CARD_USERNAME is required.");
  process.exit(1);
}
const outDir = process.env.CARD_OUT_DIR || ".";
mkdirSync(outDir, { recursive: true });

const THEMES = [
  ["gotham", "dark"],
  ["default", "light"],
];

// Data is fetched once per card type and rendered per theme.
const stats = await fetchStats(username);
const langs = await fetchTopLanguages(username, [], 0.7, 0.3);

for (const [theme, suffix] of THEMES) {
  const statsSvg = renderStatsCard(stats, {
    theme,
    show_icons: true,
    hide_title: true,
    hide_border: true,
    line_height: 24,
    show: ["reviews"],
    disable_animations: true,
  });
  const statsPath = path.join(outDir, `github-readme-stats-api-${suffix}.svg`);
  writeFileSync(statsPath, statsSvg);
  console.log(`wrote ${statsPath}`);

  const langsSvg = renderTopLanguages(langs, {
    theme,
    layout: "compact",
    langs_count: 10,
    hide_title: true,
    hide_border: true,
    hide: ["html", "css", "shell", "makefile"],
    disable_animations: true,
  });
  const langsPath = path.join(outDir, `top-langs-${suffix}.svg`);
  writeFileSync(langsPath, langsSvg);
  console.log(`wrote ${langsPath}`);
}
