require("dotenv").config();
const {
  renderError,
  parseBoolean,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const fetchRepo = require("../src/fetchers/repo-fetcher");
const renderRepoCard = require("../src/cards/repo-card");
const allowlist = require("../src/common/allowlist");

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

  if (!allowlist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  try {
    repoData = await fetchRepo(username, repo);

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
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
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      renderRepoCard(repoData, {
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        show_owner: parseBoolean(show_owner),
      })
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
