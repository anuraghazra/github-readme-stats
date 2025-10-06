// @ts-check

import { renderRepoCard } from "../src/cards/repo.js";
import { blacklist } from "../src/common/blacklist.js";
import {
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../src/common/cache.js";
import { whitelist } from "../src/common/envs.js";
import { CONSTANTS, parseBoolean, renderError } from "../src/common/utils.js";
import { fetchRepo } from "../src/fetchers/repo.js";
import { isLocaleAvailable } from "../src/translations.js";

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
    return res.send(
      renderError("Something went wrong", "Language not found", {
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
    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: CONSTANTS.PIN_CARD_CACHE_SECONDS,
      min: CONSTANTS.ONE_DAY,
      max: CONSTANTS.TEN_DAY,
    });

    setCacheHeaders(res, cacheSeconds);

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
