import {
  clampValue,
  CONSTANTS,
  parseBoolean,
  renderError,
} from "../src/common/utils.js";
import { fetchRepo } from "../src/fetchers/repo-fetcher.js";
import { renderRepoCard } from "../src/cards/repo-card.js";
import { isLocaleAvailable } from "../src/translations.js";
import { blacklist } from "../src/common/blacklist.js";

export default async (req, res) => {
  const {
    username,
    repo,
    hide_border,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    show_owner,
    cache_seconds,
    locale,
    border_radius,
    border_color,
    description_lines_count,
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
        ? { error: "Language not found" }
        : renderError("Something went wrong", "Language not found", {
            title_color,
            text_color,
            bg_color,
            border_color,
            theme,
          }),
    );
  }

  try {
    const repoData = await fetchRepo(username, repo);

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.PIN_CARD_CACHE_SECONDS, 10),
      CONSTANTS.ONE_DAY,
      CONSTANTS.TEN_DAY,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;

    res.setHeader(
      "Cache-Control",
      `max-age=${cacheSeconds}, s-maxage=${cacheSeconds}`,
    );

    if (returnJson) {
      return res.send(repoData);
    }

    return res.send(
      renderRepoCard(repoData, {
        hide_border: parseBoolean(hide_border),
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        border_radius,
        border_color,
        show_owner: parseBoolean(show_owner),
        locale: locale ? locale.toLowerCase() : null,
        description_lines_count,
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
