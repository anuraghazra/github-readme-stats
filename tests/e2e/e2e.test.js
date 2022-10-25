/**
 * @file Contains end-to-end tests for the Vercel preview instance.
 */
import dotenv from "dotenv";
dotenv.config();

import { describe } from "@jest/globals";
import axios from "axios";
import { renderRepoCard } from "../../src/cards/repo-card.js";
import { renderStatsCard } from "../../src/cards/stats-card.js";
import { renderTopLanguages } from "../../src/cards/top-languages-card.js";
import { renderWakatimeCard } from "../../src/cards/wakatime-card.js";

const REPO = "dummy-cra";
const USER = "grsdummy";
const STATS_DATA = {
  name: "grsdummy",
  totalPRs: 2,
  totalCommits: 2,
  totalIssues: 1,
  totalStars: 1,
  contributedTo: 2,
  rank: {
    level: "A+",
    score: 51.01013099671447,
  },
};

const LANGS_DATA = {
  TypeScript: {
    color: "#3178c6",
    name: "TypeScript",
    size: 2049,
  },
  HTML: {
    color: "#e34c26",
    name: "HTML",
    size: 1721,
  },
  CSS: {
    color: "#563d7c",
    name: "CSS",
    size: 930,
  },
  Python: {
    color: "#3572A5",
    name: "Python",
    size: 671,
  },
};

const WAKATIME_DATA = {
  human_readable_range: "last week",
  is_already_updating: false,
  is_coding_activity_visible: false,
  is_including_today: false,
  is_other_usage_visible: false,
  is_stuck: false,
  is_up_to_date: false,
  is_up_to_date_pending_future: false,
  percent_calculated: 0,
  range: "last_7_days",
  status: "pending_update",
  timeout: 15,
  username: "grsdummy",
  writes_only: false,
};

const REPOSITORY_DATA = {
  name: "dummy-cra",
  nameWithOwner: "grsdummy/dummy-cra",
  isPrivate: false,
  isArchived: false,
  isTemplate: false,
  stargazers: {
    totalCount: 1,
  },
  description: "Dummy create react app.",
  primaryLanguage: {
    color: "#3178c6",
    id: "MDg6TGFuZ3VhZ2UyODc=",
    name: "TypeScript",
  },
  forkCount: 0,
  starCount: 1,
};

const CACHE_BURST_STRING = `v=${new Date().getTime()}`;

describe("Fetch Cards", () => {
  let VERCEL_PREVIEW_URL;

  beforeAll(() => {
    process.env.NODE_ENV = "development";
    VERCEL_PREVIEW_URL = process.env.VERCEL_PREVIEW_URL;
  });

  test("retrieve stats card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the Vercel preview instance stats card function is up and running.
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api?username=${USER}`),
    ).resolves.not.toThrow();

    // Get local stats card.
    const localStatsCardSVG = renderStatsCard(STATS_DATA);

    // Get the Vercel preview stats card response.
    const serverStatsSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api?username=${USER}&${CACHE_BURST_STRING}`,
    );

    // Check if stats card from deployment matches the stats card from local.
    expect(serverStatsSvg.data).toEqual(localStatsCardSVG);
  }, 7000);

  test("retrieve language card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the Vercel preview instance language card function is up and running.
    console.log(
      `${VERCEL_PREVIEW_URL}/api/top-langs/?username=${USER}&${CACHE_BURST_STRING}`,
    );
    await expect(
      axios.get(
        `${VERCEL_PREVIEW_URL}/api/top-langs/?username=${USER}&${CACHE_BURST_STRING}`,
      ),
    ).resolves.not.toThrow();

    // Get local language card.
    const localLanguageCardSVG = renderTopLanguages(LANGS_DATA);

    // Get the Vercel preview language card response.
    const severLanguageSVG = await axios.get(
      `${VERCEL_PREVIEW_URL}/api/top-langs/?username=${USER}&${CACHE_BURST_STRING}`,
    );

    // Check if language card from deployment matches the local language card.
    expect(severLanguageSVG.data).toEqual(localLanguageCardSVG);
  });

  test("retrieve WakaTime card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the Vercel preview instance WakaTime function is up and running.
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api/wakatime?username=${USER}`),
    ).resolves.not.toThrow();

    // Get local WakaTime card.
    const localWakaCardSVG = renderWakatimeCard(WAKATIME_DATA);

    // Get the Vercel preview WakaTime card response.
    const serverWakaTimeSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api/wakatime?username=${USER}&${CACHE_BURST_STRING}`,
    );

    // Check if WakaTime card from deployment matches the local WakaTime card.
    expect(serverWakaTimeSvg.data).toEqual(localWakaCardSVG);
  });

  test("retrieve repo card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the Vercel preview instance Repo function is up and running.
    await expect(
      axios.get(
        `${VERCEL_PREVIEW_URL}/api/pin/?username=${USER}&repo=${REPO}&${CACHE_BURST_STRING}`,
      ),
    ).resolves.not.toThrow();

    // Get local repo card.
    const localRepoCardSVG = renderRepoCard(REPOSITORY_DATA);

    // Get the Vercel preview repo card response.
    const serverRepoSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api/pin/?username=${USER}&repo=${REPO}&${CACHE_BURST_STRING}`,
    );

    // Check if Repo card from deployment matches the local Repo card.
    expect(serverRepoSvg.data).toEqual(localRepoCardSVG);
  });
});
