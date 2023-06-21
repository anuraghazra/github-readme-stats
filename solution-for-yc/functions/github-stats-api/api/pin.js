const { renderRepoCard } = require("../src/cards/repo-card.js");
const { blacklist } = require("../src/common/blacklist.js");
const {
  clampValue,
  CONSTANTS,
  parseBoolean,
  renderError,
} = require("../src/common/utils.js");
const { fetchRepo } = require("../src/fetchers/repo-fetcher.js");
const { isLocaleAvailable } = require("../src/translations.js");

const repoCard = async (params) => {
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
    const repoData = await fetchRepo(username, repo);

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
    const stars = repoData.starCount;
    const forks = repoData.forkCount;
    const isBothOver1K = stars > 1000 && forks > 1000;
    const isBothUnder1 = stars < 1 && forks < 1;
    if (!cache_seconds && (isBothOver1K || isBothUnder1)) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    response.headers["Cache-Control"] = `max-age=${
      cacheSeconds / 2
    }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`;

    response.body = renderRepoCard(repoData, {
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
    });

    return response;
  } catch (err) {
    // Don't cache error responses.
    response.headers["Cache-Control"] = `no-cache, no-store, must-revalidate`;
    response.body = renderError(err.message, err.secondaryMessage);

    return response;
  }
};

exports.repoCard = repoCard;
