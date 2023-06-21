const { renderTopLanguages } = require("../src/cards/top-languages-card.js");
const { blacklist } = require("../src/common/blacklist.js");
const {
  clampValue,
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} = require("../src/common/utils.js");
const {
  fetchTopLanguages,
} = require("../src/fetchers/top-languages-fetcher.js");
const { isLocaleAvailable } = require("../src/translations.js");

const langCard = async (params) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout,
    langs_count,
    exclude_repo,
    size_weight,
    count_weight,
    custom_title,
    locale,
    border_radius,
    border_color,
    disable_animations,
    hide_progress,
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

  if (
    layout !== undefined &&
    (typeof layout !== "string" ||
      !["compact", "normal", "donut", "donut-vertical", "pie"].includes(layout))
  ) {
    response.body = renderError(
      "Something went wrong",
      "Incorrect layout input",
    );
    return response;
  }

  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
      size_weight,
      count_weight,
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

    response.body = renderTopLanguages(topLangs, {
      custom_title,
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      card_width: parseInt(card_width, 10),
      hide: parseArray(hide),
      title_color,
      text_color,
      bg_color,
      theme,
      layout,
      langs_count,
      border_radius,
      border_color,
      locale: locale ? locale.toLowerCase() : null,
      disable_animations: parseBoolean(disable_animations),
      hide_progress: parseBoolean(hide_progress),
    });

    return response;
  } catch (err) {
    // Don't cache error responses.
    response.headers["Cache-Control"] = `no-cache, no-store, must-revalidate`;
    response.body = renderError(err.message, err.secondaryMessage);

    return response;
  }
};

exports.langCard = langCard;
