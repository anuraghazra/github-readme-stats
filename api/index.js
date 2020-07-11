require("dotenv").config();
const { renderError } = require("../src/utils");
const fetchStats = require("../src/fetchStats");
const renderStatsCard = require("../src/renderStatsCard");

module.exports = async (req, res) => {
  const {
    username,
    hide,
    hide_border,
    show_icons,
    line_height,
    title_color,
    icon_color,
    text_color,
  } = req.query;
  let stats;

  res.setHeader("Content-Type", "image/svg+xml");
  try {
    stats = await fetchStats(username);
  } catch (err) {
    return res.send(renderError(err.message));
  }

  res.send(
    renderStatsCard(stats, {
      hide: JSON.parse(hide || "[]"),
      show_icons,
      hide_border,
      line_height,
      title_color,
      icon_color,
      text_color,
    })
  );
};
