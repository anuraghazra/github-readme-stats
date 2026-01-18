#!/usr/bin/env node
/**
 * GitHub Stats Card Action
 *
 * Generates GitHub stats cards as SVG files and commits them to the repository.
 * Supports three card types: stats, repo (repo-pins), and langs (top-languages).
 */

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import core modules
import { fetchStats } from "../../../src/fetchers/stats.js";
import { fetchRepo } from "../../../src/fetchers/repo.js";
import { fetchTopLanguages } from "../../../src/fetchers/top-languages.js";
import { renderStatsCard } from "../../../src/cards/stats.js";
import { renderRepoCard } from "../../../src/cards/repo.js";
import { renderTopLanguages } from "../../../src/cards/top-languages.js";

/**
 * Parse environment variables and get options
 */
function getOptions() {
  const {
    INPUT_USERNAME,
    INPUT_CARD_TYPE,
    INPUT_FILENAME,
    INPUT_TOKEN,
    INPUT_COMMIT_MESSAGE,
    INPUT_BRANCH,
    INPUT_THEME,
    INPUT_HIDE_BORDER,
    INPUT_SHOW_ICONS,
    INPUT_HIDE_TITLE,
    INPUT_HIDE_RANK,
    INPUT_INCLUDE_ALL_COMMITS,
    INPUT_EXCLUDE_REPO,
    INPUT_CUSTOM_TITLE,
    INPUT_BG_COLOR,
    INPUT_TITLE_COLOR,
    INPUT_TEXT_COLOR,
    INPUT_ICON_COLOR,
    INPUT_BORDER_COLOR,
    INPUT_BORDER_RADIUS,
    INPUT_LOCALE,
    INPUT_DISABLE_ANIMATIONS,
    INPUT_HIDE,
    INPUT_SHOW,
    // Repo card options
    INPUT_REPO,
    INPUT_SHOW_OWNER,
    INPUT_DESCRIPTION_LINES_COUNT,
    // Langs card options
    INPUT_LANGS_COUNT,
    INPUT_HIDE_PROGRESS,
    INPUT_LAYOUT,
    INPUT_STATS_FORMAT,
    GITHUB_REPOSITORY,
    GITHUB_REF_NAME,
  } = process.env;

  const cardType = INPUT_CARD_TYPE || "stats";

  return {
    username: INPUT_USERNAME,
    cardType,
    outputDir: "github-stats",
    filename: INPUT_FILENAME || getDefaultFilename(cardType),
    token: INPUT_TOKEN,
    commitMessage: INPUT_COMMIT_MESSAGE || "Update stats card",
    branch: INPUT_BRANCH || GITHUB_REF_NAME,
    theme: INPUT_THEME,
    hideBorder: INPUT_HIDE_BORDER === "true",
    showIcons: INPUT_SHOW_ICONS === "true",
    hideTitle: INPUT_HIDE_TITLE === "true",
    hideRank: INPUT_HIDE_RANK === "true",
    includeAllCommits: INPUT_INCLUDE_ALL_COMMITS === "true",
    excludeRepo: INPUT_EXCLUDE_REPO ? INPUT_EXCLUDE_REPO.split(",") : [],
    customTitle: INPUT_CUSTOM_TITLE,
    bgColor: INPUT_BG_COLOR,
    titleColor: INPUT_TITLE_COLOR,
    textColor: INPUT_TEXT_COLOR,
    iconColor: INPUT_ICON_COLOR,
    borderColor: INPUT_BORDER_COLOR,
    borderRadius: INPUT_BORDER_RADIUS,
    locale: INPUT_LOCALE,
    disableAnimations: INPUT_DISABLE_ANIMATIONS === "true",
    hide: INPUT_HIDE ? INPUT_HIDE.split(",") : [],
    show: INPUT_SHOW ? INPUT_SHOW.split(",") : [],
    // Repo card options
    repo: INPUT_REPO,
    showOwner: INPUT_SHOW_OWNER === "true",
    descriptionLinesCount: parseOptionalInt(INPUT_DESCRIPTION_LINES_COUNT),
    // Langs card options
    langsCount: parseOptionalInt(INPUT_LANGS_COUNT),
    hideProgress: INPUT_HIDE_PROGRESS === "true",
    layout: INPUT_LAYOUT,
    statsFormat: INPUT_STATS_FORMAT,
    repoFullName: GITHUB_REPOSITORY,
  };
}

function parseOptionalInt(value) {
  if (!value) {
    return undefined;
  }

  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Get default filename based on card type
 */
function getDefaultFilename(cardType) {
  switch (cardType) {
    case "repo":
      return "repo.svg";
    case "langs":
      return "langs.svg";
    default:
      return "stats.svg";
  }
}

/**
 * Generate stats card
 */
async function generateStatsCard(options) {
  console.log(`Generating stats card for @${options.username}...`);

  const stats = await fetchStats(
    options.username,
    options.includeAllCommits,
    options.excludeRepo,
    options.show.includes("prs_merged") ||
      options.show.includes("prs_merged_percentage"),
    options.show.includes("discussions_started"),
    options.show.includes("discussions_answered"),
  );

  return renderStatsCard(stats, {
    hide: options.hide,
    show_icons: options.showIcons,
    hide_title: options.hideTitle,
    hide_border: options.hideBorder,
    hide_rank: options.hideRank,
    include_all_commits: options.includeAllCommits,
    custom_title: options.customTitle,
    bg_color: options.bgColor,
    title_color: options.titleColor,
    text_color: options.textColor,
    icon_color: options.iconColor,
    border_color: options.borderColor,
    border_radius: options.borderRadius,
    theme: options.theme,
    locale: options.locale,
    disable_animations: options.disableAnimations,
    show: options.show,
  });
}

/**
 * Generate repo card
 */
async function generateRepoCard(options) {
  // Parse repo parameter
  let repoOwner = options.username;
  let repoName = options.repo;

  if (options.repo && options.repo.includes("/")) {
    [repoOwner, repoName] = options.repo.split("/");
  }

  console.log(`Generating repo card for ${repoOwner}/${repoName}...`);

  const repoData = await fetchRepo(repoOwner, repoName);

  return renderRepoCard(repoData, {
    hide_border: options.hideBorder,
    title_color: options.titleColor,
    icon_color: options.iconColor,
    text_color: options.textColor,
    bg_color: options.bgColor,
    border_color: options.borderColor,
    border_radius: options.borderRadius,
    theme: options.theme,
    show_owner: options.showOwner,
    locale: options.locale,
    description_lines_count: options.descriptionLinesCount,
  });
}

/**
 * Generate top languages card
 */
async function generateLangsCard(options) {
  console.log(`Generating top languages card for @${options.username}...`);

  const topLangs = await fetchTopLanguages(
    options.username,
    options.excludeRepo,
  );

  return renderTopLanguages(topLangs, {
    hide_title: options.hideTitle,
    hide_border: options.hideBorder,
    card_width: undefined,
    title_color: options.titleColor,
    text_color: options.textColor,
    bg_color: options.bgColor,
    border_color: options.borderColor,
    border_radius: options.borderRadius,
    theme: options.theme,
    custom_title: options.customTitle,
    locale: options.locale,
    hide: options.hide,
    hide_progress: options.hideProgress,
    layout: options.layout,
    langs_count: options.langsCount,
    disable_animations: options.disableAnimations,
    stats_format: options.statsFormat,
  });
}

/**
 * Generate card based on type
 */
async function generateCard(options) {
  switch (options.cardType) {
    case "repo":
      return await generateRepoCard(options);
    case "langs":
      return await generateLangsCard(options);
    case "stats":
    default:
      return await generateStatsCard(options);
  }
}

/**
 * Commit and push changes
 */
async function commitAndPush(outputRelative, commitMessage, branch, repoRoot) {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["status", "--porcelain", "--", outputRelative],
      { cwd: repoRoot },
    );

    if (stdout.trim()) {
      console.log("Committing changes...");

      // Configure git
      await execFileAsync(
        "git",
        ["config", "user.name", "github-actions[bot]"],
        {
          cwd: repoRoot,
        },
      );
      await execFileAsync(
        "git",
        [
          "config",
          "user.email",
          "github-actions[bot]@users.noreply.github.com",
        ],
        { cwd: repoRoot },
      );

      // Add and commit
      await execFileAsync("git", ["add", "--", outputRelative], {
        cwd: repoRoot,
      });
      await execFileAsync("git", ["commit", "-m", commitMessage], {
        cwd: repoRoot,
      });

      // Push to specified branch
      await execFileAsync("git", ["check-ref-format", "--branch", branch], {
        cwd: repoRoot,
      });
      await execFileAsync("git", ["push", "origin", "--", branch], {
        cwd: repoRoot,
      });

      console.log("Changes committed and pushed!");
      return true;
    } else {
      console.log("No changes detected, skipping commit.");
      return false;
    }
  } catch (error) {
    console.error("Error committing changes:", error.message);
    throw error;
  }
}

function isSubPath(root, target) {
  const relative = path.relative(root, target);
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

function resolveOutputPaths(repoRoot, outputDir, filename) {
  if (outputDir !== "github-stats") {
    throw new Error('Output directory must be "github-stats".');
  }

  if (path.isAbsolute(outputDir) || path.isAbsolute(filename)) {
    throw new Error("Output path must be relative to the repository root.");
  }

  const outputDirPath = path.resolve(repoRoot, outputDir);
  const outputPath = path.resolve(outputDirPath, filename);

  if (!isSubPath(repoRoot, outputDirPath) || !isSubPath(repoRoot, outputPath)) {
    throw new Error("Output path must stay within the repository.");
  }

  const outputRelative = path.relative(repoRoot, outputPath);
  if (
    !outputRelative ||
    outputRelative.startsWith("..") ||
    path.isAbsolute(outputRelative)
  ) {
    throw new Error("Output path must stay within the repository.");
  }

  return { outputDirPath, outputPath, outputRelative };
}

/**
 * Main function
 */
async function main() {
  const options = getOptions();

  if (!options.username) {
    console.error("Error: username is required");
    process.exit(1);
  }

  if (options.cardType === "repo" && !options.repo) {
    console.error("Error: repo parameter is required for repo card type");
    process.exit(1);
  }

  if (!options.branch) {
    console.error("Error: branch is required (set branch input or GITHUB_REF_NAME)");
    process.exit(1);
  }

  // Set token for API requests
  process.env.PAT_1 = options.token;

  try {
    // Generate card
    const svg = await generateCard(options);

    // Ensure output directory exists
    const repoRoot = process.env.GITHUB_WORKSPACE
      ? path.resolve(process.env.GITHUB_WORKSPACE)
      : path.resolve(__dirname, "../../..");
    const { outputDirPath, outputPath, outputRelative } = resolveOutputPaths(
      repoRoot,
      options.outputDir,
      options.filename,
    );
    await fs.mkdir(outputDirPath, { recursive: true });

    // Write SVG to file
    await fs.writeFile(outputPath, svg, "utf8");

    console.log(`Card generated: ${outputPath}`);

    // Commit and push if changes were made
    await commitAndPush(
      outputRelative,
      options.commitMessage,
      options.branch,
      repoRoot,
    );

    console.log("Done!");

    // Set outputs using environment files (set-output is deprecated)
    const outputFile = outputRelative.split(path.sep).join("/");
    const outputLines =
      [
        `card_type=${options.cardType}`,
        `path=${outputFile}`,
        `url=https://github.com/${options.repoFullName}/blob/${options.branch}/${outputFile}`,
      ].join("\n") + "\n";

    if (process.env.GITHUB_OUTPUT) {
      await fs.appendFile(process.env.GITHUB_OUTPUT, outputLines, "utf8");
    } else {
      console.log(outputLines);
    }
  } catch (error) {
    console.error("Error generating card:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
