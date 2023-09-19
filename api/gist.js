import {
  clampValue,
  CONSTANTS,
  renderError,
  parseBoolean,
} from "../src/common/utils.js";
import { isLocaleAvailable } from "../src/translations.js";
import { renderGistCard } from "../src/cards/gist-card.js";
import { fetchGist } from "../src/fetchers/gist-fetcher.js";

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

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }

  try {
    const gistData = await fetchGist(id);

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );
    cacheSeconds = process.env.CACHE_SECONDS
      ? parseInt(process.env.CACHE_SECONDS, 10) || cacheSeconds
      : cacheSeconds;

    /*
      if star count & fork count is over 1k then we are kFormating the text
      and if both are zero we are not showing the stats
      so we can just make the cache longer, since there is no need to frequent updates
    */
    const stars = gistData.starsCount;
    const forks = gistData.forksCount;
    const isBothOver1K = stars > 1000 && forks > 1000;
    const isBothUnder1 = stars < 1 && forks < 1;
    if (!cache_seconds && (isBothOver1K || isBothUnder1)) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    res.setHeader(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    );

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
    res.setHeader(
      "Cache-Control",
      `max-age=${CONSTANTS.ERROR_CACHE_SECONDS / 2}, s-maxage=${
        CONSTANTS.ERROR_CACHE_SECONDS
      }, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    ); // Use lower cache period for errors.
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
