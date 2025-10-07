// @ts-check

import { CONSTANTS, renderError, parseBoolean } from "../src/common/utils.js";
import { isLocaleAvailable } from "../src/translations.js";
import { renderGistCard } from "../src/cards/gist.js";
import { fetchGist } from "../src/fetchers/gist.js";
import {
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../src/common/cache.js";
import { guardAccess } from "../src/common/access.js";

export default async (req, res) => {
  const {
    id,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    locale,
    border_radius,
    border_color,
    show_owner,
    hide_border,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  const access = guardAccess({
    res,
    id,
    type: "gist",
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
    const gistData = await fetchGist(id);
    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: CONSTANTS.TWO_DAY,
      min: CONSTANTS.TWO_DAY,
      max: CONSTANTS.SIX_DAY,
    });

    setCacheHeaders(res, cacheSeconds);

    return res.send(
      renderGistCard(gistData, {
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        border_radius,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
        show_owner: parseBoolean(show_owner),
        hide_border: parseBoolean(hide_border),
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
