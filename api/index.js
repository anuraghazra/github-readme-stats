require("dotenv").config();
const useragent = require("useragent");
const { renderError } = require("../src/utils");
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
    title_color,
    icon_color,
    text_color,
    bg_color,
  } = req.query;
  let stats;

  const uaHeader = req.headers && req.headers["user-agent"];
  const isFirefox = useragent.is(uaHeader).firefox;

  res.setHeader("Content-Type", "image/svg+xml");
  try {
    stats = await fetchStats(username);
  } catch (err) {
    return res.send(renderError(err.message));
  }

  res.send(
    renderStatsCard(stats, {
      isFirefox,
      hide: JSON.parse(hide || "[]"),
      show_icons,
      hide_border,
      hide_rank,
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
    })
  );
};
