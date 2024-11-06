/**
 * @file Contains end-to-end tests for the Vercel preview instance.
 */
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { renderRepoCard } from "../../src/cards/repo-card.js";
import { renderStatsCard } from "../../src/cards/stats-card.js";
import { renderTopLanguages } from "../../src/cards/top-languages-card.js";
import { renderWakatimeCard } from "../../src/cards/wakatime-card.js";
import { renderGistCard } from "../../src/cards/gist-card.js";
import { expect, describe, beforeAll, test } from "@jest/globals";

const REPO = "curly-fiesta";
const USER = "catelinemnemosyne";
const GIST_ID = "372cef55fd897b31909fdeb3a7262758";

const STATS_DATA = {
  name: "Cateline Mnemosyne",
  totalPRs: 2,
  totalReviews: 0,
  totalCommits: 8,
  totalIssues: 1,
  totalStars: 1,
  contributedTo: 1,
  rank: {
    level: "C",
    percentile: 98.06929469995667,
  },
};

const LANGS_DATA = {
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
  JavaScript: {
    color: "#f1e05a",
    name: "JavaScript",
    size: 1912,
  },
};

const WAKATIME_DATA = {
  human_readable_range: "last week",
  is_already_updating: false,
  is_coding_activity_visible: true,
  is_including_today: false,
  is_other_usage_visible: true,
  is_stuck: false,
  is_up_to_date: false,
  is_up_to_date_pending_future: false,
  percent_calculated: 0,
  range: "all_time",
  status: "pending_update",
  timeout: 15,
  username: USER,
  writes_only: false,
};

const REPOSITORY_DATA = {
  name: REPO,
  nameWithOwner: `${USER}/cra-test`,
  isPrivate: false,
  isArchived: false,
  isTemplate: false,
  stargazers: {
    totalCount: 1,
  },
  description: "Simple cra test repo.",
  primaryLanguage: {
    color: "#f1e05a",
    id: "MDg6TGFuZ3VhZ2UxNDA=",
    name: "JavaScript",
  },
  forkCount: 0,
  starCount: 1,
};

/**
 * @typedef {import("../../src/fetchers/types").GistData} GistData Gist data type.
 */

/**
 * @type {GistData}
 */
const GIST_DATA = {
  name: "link.txt",
  nameWithOwner: "qwerty541/link.txt",
  description:
    "Trying to access this path on Windown 10 ver. 1803+ will breaks NTFS",
  language: "Text",
  starsCount: 1,
  forksCount: 0,
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
  }, 15000);

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
  }, 15000);

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
  }, 15000);

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
  }, 15000);

  test("retrieve gist card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the Vercel preview instance Gist function is up and running.
    await expect(
      axios.get(
        `${VERCEL_PREVIEW_URL}/api/gist?id=${GIST_ID}&${CACHE_BURST_STRING}`,
      ),
    ).resolves.not.toThrow();

    // Get local gist card.
    const localGistCardSVG = renderGistCard(GIST_DATA);

    // Get the Vercel preview gist card response.
    const serverGistSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api/gist?id=${GIST_ID}&${CACHE_BURST_STRING}`,
    );

    // Check if Gist card from deployment matches the local Gist card.
    expect(serverGistSvg.data).toEqual(localGistCardSVG);
  }, 15000);
});
