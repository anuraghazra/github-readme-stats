require("dotenv").config();
const { renderError, parseBoolean } = require("../src/utils");
const fetchStats = require("../src/fetchStats");
const renderStatsCard = require("../src/renderStatsCard");

module.exports = async (req, res) => {
  const {
    username,
    hide,
    hide_border,
    hide_rank,
    show_icons,
    line_height,
    orientation,
    title_color,
    icon_color,
    text_color,
    bg_color,
  } = req.query;
  let stats;

  res.setHeader("Cache-Control", "public, max-age=1800");
  res.setHeader("Content-Type", "image/svg+xml");

  try {
    stats = await fetchStats(username);
  } catch (err) {
    return res.send(renderError(err.message));
  }

  res.send(
    renderStatsCard(stats, {
      hide: JSON.parse(hide || "[]"),
      show_icons: parseBoolean(show_icons),
      hide_border: parseBoolean(hide_border),
      hide_rank: parseBoolean(hide_rank),
      line_height,
      orientation,
      title_color,
      icon_color,
      text_color,
      bg_color,
    })
  );
};
