const { renderWakatimeCard } = require("../src/cards/wakatime-card.js");
const {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} = require("../src/common/utils.js");
const { fetchWakatimeStats } = require("../src/fetchers/wakatime-fetcher.js");
const { isLocaleAvailable } = require("../src/translations.js");

const wakatimeCard = async (params) => {
  const {
    username,
    title_color,
    icon_color,
    hide_border,
    line_height,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    hide_title,
    hide_progress,
    custom_title,
    locale,
    layout,
    langs_count,
    hide,
    api_domain,
    border_radius,
    border_color,
  } = params;

  const response = {
    statusCode: 200,
    headers: {},
  };

  response.headers["Content-Type"] = "image/svg+xml; charset=utf-8";

  if (locale && !isLocaleAvailable(locale)) {
    response.body = renderError("Something went wrong", "Language not found");
    return response;
  }

  try {
    const stats = await fetchWakatimeStats({ username, api_domain });

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;

    if (!cache_seconds) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    response.headers["Cache-Control"] = `max-age=${
      cacheSeconds / 2
    }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`;

    response.body = renderWakatimeCard(stats, {
      custom_title,
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      hide: parseArray(hide),
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
      hide_progress,
      border_radius,
      border_color,
      locale: locale ? locale.toLowerCase() : null,
      layout,
      langs_count,
    });

    return response;
  } catch (err) {
    // Don't cache error responses.
    response.headers["Cache-Control"] = `no-cache, no-store, must-revalidate`;
    response.body = renderError(err.message, err.secondaryMessage);

    return response;
  }
};

exports.wakatimeCard = wakatimeCard;
