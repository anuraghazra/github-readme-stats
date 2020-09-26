require("dotenv").config();
const {
  renderError,
  parseBoolean,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const fetchRepos = require("../src/fetchers/repos-fetcher");
const renderReposCard = require("../src/cards/repos-card");
const blacklist = require("../src/common/blacklist");

module.exports = async (req, res) => {
  const {
    username,
    top=5,
    date_format='DD-MM-YYYY',
    hide_title,
    hide_border,
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

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  try {
    
    let count = top <= 0 ? 5 : top;
    repoData = await fetchRepos(username, count*1);

    //res.setHeader("Cache-Control", `public, max-age=${CONSTANTS.FOUR_HOURS}`);

    return res.send(
      renderReposCard(repoData, {
        date_format,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
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