import { renderRepoCard } from "../src/cards/repo-card.js";
import { blacklist } from "../src/common/blacklist.js";
import {
  clampValue,
  CONSTANTS,
  parseBoolean,
  renderError,
} from "../src/common/utils.js";
import { fetchRepo } from "../src/fetchers/repo-fetcher.js";
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

  if (blacklist.includes(username)) {
    return res.send(
      renderError("Something went wrong", "This username is blacklisted", {
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

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.CARD_CACHE_SECONDS, 10),
      CONSTANTS.SIX_HOURS,
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
    const stars = repoData.starCount;
    const forks = repoData.forkCount;
    const isBothOver1K = stars > 1000 && forks > 1000;
    const isBothUnder1 = stars < 1 && forks < 1;
    if (!cache_seconds && (isBothOver1K || isBothUnder1)) {
      cacheSeconds = CONSTANTS.SIX_HOURS;
    }

    res.setHeader(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
    );

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
