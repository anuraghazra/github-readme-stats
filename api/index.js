require("dotenv").config();
const {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} = require("../src/utils");
const fetchStats = require("../src/fetchStats");
const renderStatsCard = require("../src/renderStatsCard");

module.exports = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    hide_rank,
    show_icons,
    count_private,
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
  } = req.query;
  let stats;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    stats = await fetchStats(username, parseBoolean(count_private));
  } catch (err) {
    return res.send(
      renderError(
        err.message,
        "Make sure the provided username is not an organization"
      )
    );
  }

  const cacheSeconds = clampValue(
    parseInt(cache_seconds || CONSTANTS.THIRTY_MINUTES, 10),
    CONSTANTS.THIRTY_MINUTES,
    CONSTANTS.ONE_DAY
  );

  res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

  res.send(
    renderStatsCard(stats, {
      hide: parseArray(hide),
      show_icons: parseBoolean(show_icons),
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      hide_rank: parseBoolean(hide_rank),
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
    })
  );
};
