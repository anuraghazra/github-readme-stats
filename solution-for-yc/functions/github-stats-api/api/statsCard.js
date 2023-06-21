const { renderStatsCard } = require("../src/cards/stats-card.js");
const { blacklist } = require("../src/common/blacklist.js");
const {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} = require("../src/common/utils.js");
const { fetchStats } = require("../src/fetchers/stats-fetcher.js");
const { isLocaleAvailable } = require("../src/translations.js");

const statsCard = async (params) => {
  const {
    username,
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
    show_total_reviews,
  } = params;

  const response = {
    statusCode: 200,
    headers: {},
  };

  response.headers["Content-Type"] = "image/svg+xml; charset=utf-8";

  if (blacklist.includes(username)) {
    response.body = renderError("Something went wrong");
    return response;
  }

  if (locale && !isLocaleAvailable(locale)) {
    response.body = renderError("Something went wrong", "Language not found");
    return response;
  }

  try {
    const stats = await fetchStats(
      username,
      parseBoolean(include_all_commits),
      parseArray(exclude_repo),
    );

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;

    response.headers["Cache-Control"] = `max-age=${
      cacheSeconds / 2
    }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`;

    response.body = renderStatsCard(stats, {
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
      show_total_reviews: parseBoolean(show_total_reviews),
    });

    return response;
  } catch (err) {
    // Don't cache error responses.
    response.headers["Cache-Control"] = `no-cache, no-store, must-revalidate`;
    response.body = renderError(err.message, err.secondaryMessage);

    return response;
  }
};

exports.statsCard = statsCard;
