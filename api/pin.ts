import {
  CONSTANTS,
  clampValue,
  parseBoolean,
  renderError,
} from "../src/common/utils";

import { blacklist } from "../src/common/blacklist";
import { config } from "dotenv";
import { fetchRepo } from "../src/fetchers/repo-fetcher";
import { isLocaleAvailable } from "../src/translations";
import { renderRepoCard } from "../src/cards/repo-card";

config();

module.exports = async (req, res) => {
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
  } = req.query;

  let repoData;

  res.setHeader("Content-Type", "image/svg+xml");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }

  try {
    repoData = await fetchRepo(username, repo);

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    /*
    if star count & fork count is over 1k then we are kFormating the text
    and if both are zero we are not showing the stats
    so we can just make the cache longer, since there is no need to frequent updates
    */
    const stars = repoData.stargazers.totalCount,
      forks = repoData.forkCount,
      isBothOver1K = stars > 1000 && forks > 1000,
      isBothUnder1 = stars < 1 && forks < 1;
    if (!cache_seconds && (isBothOver1K || isBothUnder1)) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      renderRepoCard(repoData, {
        hide_border,
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        show_owner: parseBoolean(show_owner),
        locale: locale ? locale.toLowerCase() : null,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
