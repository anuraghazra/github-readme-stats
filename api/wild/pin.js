import { renderRepoCard } from "../../src/cards/repo-card.js";
import {
  clampValue,
  CONSTANTS,
  parseBoolean,
  renderError,
} from "../../src/common/utils.js";

export default async (req, res) => {
  const {
    hide_border,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    border_radius,
    border_color,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const repoData = {
      name: req.query.title || "awesome/repo",
      description: req.query.description || "What an awesome repo!",
      primaryLanguage: {
        name: req.query.footer || "Awesome",
        color: req.query.badge ? `#${req.query.badge}` : "#4287f5",
      },
      starCount: req.query.stars || 12838,
      forkCount: req.query.forks || 8929,
      highlight: req.query.highlight || "AWESOME",
    };

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );

    /*
      if star count & fork count is over 1k then we are kFormating the text
      and if both are zero we are not showing the stats
      so we can just make the cache longer, since there is no need to frequent updates
    */
    const stars = repoData.starCount;
    const forks = repoData.forkCount;
    if (!isNaN(stars) && !isNaN(forks)) {
      const isBothOver1K = stars > 1000 && forks > 1000;
      const isBothUnder1 = stars < 1 && forks < 1;
      if (!cache_seconds && (isBothOver1K || isBothUnder1)) {
        cacheSeconds = CONSTANTS.FOUR_HOURS;
      }
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
      }),
    );
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`); // Don't cache error responses.
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
