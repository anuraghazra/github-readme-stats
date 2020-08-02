require("dotenv").config();
const {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const fetchStats = require("../src/fetchers/stats-fetcher");
const renderStatsCard = require("../src/cards/stats-card");

module.exports = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    hide_rank,
    show_icons,
    count_private,
    include_all_commits,
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    // plang
    hide_plang,
    plang_animation,
    plang_row_items,
    show_plang_color,
  } = req.query;
  let stats;

  const cacheSeconds = clampValue(
    parseInt(cache_seconds || CONSTANTS.THIRTY_MINUTES, 10),
    CONSTANTS.THIRTY_MINUTES,
    CONSTANTS.ONE_DAY
  );

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
  
  try {
    stats = await fetchStats(
      username,
      parseBoolean(count_private),
      parseBoolean(include_all_commits)
    );
  } catch (err) {
    return res.send(
      renderError(
        err.message,
        "Make sure the provided username is not an organization"
      )
    );
  }

  res.send(
    renderStatsCard(stats, {
      hide: parseArray(hide),
      show_icons: parseBoolean(show_icons),
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      hide_rank: parseBoolean(hide_rank),
      include_all_commits: parseBoolean(include_all_commits),
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
      theme,
      // plang
      hide_plang: parseBoolean(hide_plang),
      plang_animation: parseBoolean(plang_animation),
      plang_row_items: parseInt(plang_row_items, 10),
      show_plang_color: parseBoolean(show_plang_color),
    })
  );
};
