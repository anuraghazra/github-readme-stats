// @ts-check

import { renderTopLanguages } from "../src/cards/top-languages.js";
import { blacklist } from "../src/common/blacklist.js";
import {
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../src/common/cache.js";
import { whitelist } from "../src/common/envs.js";
import {
  CONSTANTS,
  parseArray,
  parseBoolean,
  renderError,
} from "../src/common/utils.js";
import { fetchTopLanguages } from "../src/fetchers/top-languages.js";
import { isLocaleAvailable } from "../src/translations.js";

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
    stats_format,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  if (whitelist && !whitelist.includes(username)) {
    return res.send(
      renderError(
        "This username is not whitelisted",
        "Please deploy your own instance",
        {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
          show_repo_link: false,
        },
      ),
    );
  }

  if (whitelist === undefined && blacklist.includes(username)) {
    return res.send(
      renderError(
        "This username is blacklisted",
        "Please deploy your own instance",
        {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
          show_repo_link: false,
        },
      ),
    );
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Locale not found"));
  }

  if (
    layout !== undefined &&
    (typeof layout !== "string" ||
      !["compact", "normal", "donut", "donut-vertical", "pie"].includes(layout))
  ) {
    return res.send(
      renderError("Something went wrong", "Incorrect layout input"),
    );
  }

  if (
    stats_format !== undefined &&
    (typeof stats_format !== "string" ||
      !["bytes", "percentages"].includes(stats_format))
  ) {
    return res.send(
      renderError("Something went wrong", "Incorrect stats_format input"),
    );
  }

  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
      size_weight,
      count_weight,
    );
    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: CONSTANTS.TOP_LANGS_CACHE_SECONDS,
      min: CONSTANTS.TWO_DAY,
      max: CONSTANTS.TEN_DAY,
    });

    setCacheHeaders(res, cacheSeconds);

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
        stats_format,
      }),
    );
  } catch (err) {
    setErrorCacheHeaders(res);
    return res.send(
      renderError(err.message, err.secondaryMessage, {
        title_color,
        text_color,
        bg_color,
        border_color,
        theme,
      }),
    );
  }
};
