import {
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../src/common/utils.js";
import { fetchTopLanguages } from "../src/fetchers/top-languages-fetcher.js";
import { renderTopLanguages } from "../src/cards/top-languages-card.js";
import { isLocaleAvailable } from "../src/translations.js";
import { blacklist } from "../src/common/blacklist.js";

export default async (req, res) => {
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
    json,
  } = req.query;

  const returnJson = parseBoolean(json);

  res.setHeader(
    "Content-Type",
    returnJson ? "application/json" : "image/svg+xml",
  );

  if (blacklist.includes(username)) {
    return res.send(
      returnJson
        ? { error: "This username is blacklisted" }
        : renderError("Something went wrong", "This username is blacklisted", {
            title_color,
            text_color,
            bg_color,
            border_color,
            theme,
          }),
    );
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(
      returnJson
        ? { error: "Locale not found" }
        : renderError("Something went wrong", "Locale not found"),
    );
  }

  if (
    layout !== undefined &&
    (typeof layout !== "string" ||
      !["compact", "normal", "donut", "donut-vertical", "pie"].includes(layout))
  ) {
    return res.send(
      returnJson
        ? { error: "Incorrect layout input" }
        : renderError("Something went wrong", "Incorrect layout input"),
    );
  }

  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
      size_weight,
      count_weight,
    );

    let cacheSeconds = parseInt(
      cache_seconds || CONSTANTS.TOP_LANGS_CACHE_SECONDS,
      10,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;

    res.setHeader(
      "Cache-Control",
      `max-age=${cacheSeconds / 2}, s-maxage=${cacheSeconds}`,
    );

    if (returnJson) {
      return res.send(topLangs);
    }

    return res.send(
      renderTopLanguages(topLangs, {
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
      }),
    );
  } catch (err) {
    res.setHeader(
      "Cache-Control",
      `max-age=${CONSTANTS.ERROR_CACHE_SECONDS / 2}, s-maxage=${
        CONSTANTS.ERROR_CACHE_SECONDS
      }, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    ); // Use lower cache period for errors.
    return res.send(
      returnJson
        ? { error: err.message, secondaryMessage: err.secondaryMessage }
        : renderError(err.message, err.secondaryMessage, {
            title_color,
            text_color,
            bg_color,
            border_color,
            theme,
          }),
    );
  }
};
