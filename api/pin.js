require("dotenv").config();
const {
  renderError,
  parseBoolean,
  clampValue,
  CONSTANTS,
  logger,
} = require("../src/common/utils");
const fetchRepo = require("../src/fetchers/repo-fetcher");
const renderRepoCard = require("../src/cards/repo-card");

module.exports = async (req, res) => {
  const {
    username,
    repo,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    show_owner,
    cache_seconds,
  } = req.query;

  let repoData;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    repoData = await fetchRepo(username, repo);
  } catch (err) {
    logger.error(err);
    return res.send(renderError(err.message));
  }

  let cacheSeconds = clampValue(
    parseInt(cache_seconds || CONSTANTS.THIRTY_MINUTES, 10),
    CONSTANTS.THIRTY_MINUTES,
    CONSTANTS.ONE_DAY
  );

  /*
    if star count & fork count is over 1k then we are kFormating the text
    and if both are zero we are not showing the stats
    so we can just make the cache longer, since there is no need to frequent updates
  */
  const stars = repoData.stargazers.totalCount;
  const forks = repoData.forkCount;
  const isBothOver1K = stars > 1000 && forks > 1000;
  const isBothUnder1 = stars < 1 && forks < 1;
  if (!cache_seconds && (isBothOver1K || isBothUnder1)) {
    cacheSeconds = CONSTANTS.TWO_HOURS;
  }

  res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

  res.send(
    renderRepoCard(repoData, {
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
      show_owner: parseBoolean(show_owner),
    })
  );
};
