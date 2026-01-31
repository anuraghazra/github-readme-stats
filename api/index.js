// @ts-check

import { renderStatsCard } from "../src/cards/stats.js";
import { guardAccess } from "../src/common/access.js";
import {
  CACHE_TTL,
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../src/common/cache.js";
import {
  MissingParamError,
  retrieveSecondaryMessage,
} from "../src/common/error.js";
import {parseArray, parseBoolean } from "../src/common/ops.js";
import { renderError } from "../src/common/render.js";
import { fetchStats } from "../src/fetchers/stats.js";
import { isLocaleAvailable } from "../src/translations.js";

// @ts-ignore
export default async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    hide_rank,
    show_icons,
    include_all_commits,
    commits_year,
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
    number_precision,
    border_color,
    rank_icon,
    show,
    all_time_contribs,
  } = req.query;
  
  res.setHeader("Content-Type", "image/svg+xml");

  const access = guardAccess({
    res,
    id: username,
    type: "username",
    colors: {
      title_color,
      text_color,
      bg_color,
      border_color,
      theme,
    },
  });
  
  if (!access.isPassed) {
    return access.result;
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(
      renderError({
        message: "Something went wrong",
        secondaryMessage: "Language not found",
        renderOptions: {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
        },
      }),
    );
  }

  try {
    const showStats = parseArray(show);
    const stats = await fetchStats(
      username,
      parseBoolean(include_all_commits),
      parseBoolean(all_time_contribs),
      parseArray(exclude_repo),
      showStats.includes("prs_merged") ||
        showStats.includes("prs_merged_percentage"),
      showStats.includes("discussions_started"),
      showStats.includes("discussions_answered"),
      commits_year ? parseInt(commits_year, 10) : undefined,
    );

    // Use appropriate cache TTL config based on whether all-time contribs is enabled
    const cacheTTL = parseBoolean(all_time_contribs)
      ? CACHE_TTL.ALL_TIME_STATS_CARD
      : CACHE_TTL.STATS_CARD;

    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: cacheTTL.DEFAULT,
      min: cacheTTL.MIN,
      max: cacheTTL.MAX,
    });

    // Set cache headers BEFORE sending response
    setCacheHeaders(res, cacheSeconds);

    // Render and send the card
    const renderedCard = renderStatsCard(stats, {
      hide: parseArray(hide),
      show_icons: parseBoolean(show_icons),
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      card_width: parseInt(card_width, 10),
      hide_rank: parseBoolean(hide_rank),
      include_all_commits: parseBoolean(include_all_commits),
      all_time_contribs: parseBoolean(all_time_contribs),
      commits_year: commits_year ? parseInt(commits_year, 10) : undefined,
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
      number_precision: number_precision ? parseInt(number_precision, 10) : undefined,
      locale: locale ? locale.toLowerCase() : null,
      disable_animations: parseBoolean(disable_animations),
      rank_icon,
      show: showStats,
    });

    return res.send(renderedCard);
    
  } catch (err) {
    // Set error cache headers BEFORE sending error response
    setErrorCacheHeaders(res);
    
    if (err instanceof Error) {
      return res.send(
        renderError({
          message: err.message,
          secondaryMessage: retrieveSecondaryMessage(err),
          renderOptions: {
            title_color,
            text_color,
            bg_color,
            border_color,
            theme,
            show_repo_link: !(err instanceof MissingParamError),
          },
        }),
      );
    }
    
    return res.send(
      renderError({
        message: "An unknown error occurred",
        renderOptions: {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
        },
      }),
    );
  }
};
