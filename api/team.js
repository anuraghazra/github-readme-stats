import { renderStatsCard } from "../src/cards/stats-card.js";
import { blacklist } from "../src/common/blacklist.js";
import {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../src/common/utils.js";
import { fetchStats } from "../src/fetchers/stats-fetcher.js";
import { isLocaleAvailable } from "../src/translations.js";
import { rank_to_level } from "../src/constant.js";

export default async (req, res) => {
  const {
    usernames,
    hide,
    hide_title,
    hide_border,
    card_width,
    hide_rank,
    show_icons,
    include_all_commits,
    line_height,
    title_color,
    ring_color,
    icon_color,
    text_color,
    text_bold,
    bg_color,
    theme,
    cache_seconds,
    exclude_repo,
    custom_title,
    locale,
    disable_animations,
    border_radius,
    number_format,
    border_color,
    rank_icon,
    show,
    team_name,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  const username_list = usernames.split(",");

  for (const username of username_list) {
    if (blacklist.includes(username)) {
      return res.send(renderError("Something went wrong"));
    }
  }
  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }

  const team_stats = {
    name: "",
    totalPRs: 0,
    totalPRsMerged: 0,
    mergedPRsPercentage: 0,
    totalReviews: 0,
    totalCommits: 0,
    totalIssues: 0,
    totalStars: 0,
    totalDiscussionsStarted: 0,
    totalDiscussionsAnswered: 0,
    contributedTo: 0,
    rank: { level: "C", percentile: 0 },
  };

  try {
    for (let username of username_list) {
      const stats = await fetchStats(
        username,
        parseBoolean(include_all_commits),
        parseArray(exclude_repo),
      );
      team_stats.totalPRs += stats.totalPRs;
      team_stats.totalPRsMerged += stats.totalPRsMerged;
      team_stats.mergedPRsPercentage += stats.mergedPRsPercentage;
      team_stats.totalReviews += stats.totalReviews;
      team_stats.totalCommits += stats.totalCommits;
      team_stats.totalIssues += stats.totalIssues;
      team_stats.totalStars += stats.totalStars;
      team_stats.totalDiscussionsStarted += stats.totalDiscussionsStarted;
      team_stats.totalDiscussionsAnswered += stats.totalDiscussionsAnswered;
      team_stats.contributedTo += stats.contributedTo;
      team_stats.rank.percentile += stats.rank.percentile;
    }
    team_stats.name = `${team_name ? team_name : username_list[0]} team `;

    team_stats.rank.level = rank_to_level(
      team_stats.rank.percentile / 100 / username_list.length,
    );

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;

    res.setHeader(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    );

    return res.send(
      renderStatsCard(team_stats, {
        hide: parseArray(hide),
        show_icons: parseBoolean(show_icons),
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide_rank: parseBoolean(hide_rank),
        include_all_commits: parseBoolean(include_all_commits),
        line_height,
        title_color,
        ring_color,
        icon_color,
        text_color,
        text_bold: parseBoolean(text_bold),
        bg_color,
        theme,
        custom_title,
        border_radius,
        border_color,
        number_format,
        locale: locale ? locale.toLowerCase() : null,
        disable_animations: parseBoolean(disable_animations),
        rank_icon,
        show: parseArray(show),
      }),
    );
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`); // Don't cache error responses.
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
