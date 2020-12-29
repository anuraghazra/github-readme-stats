require("dotenv").config();
const {
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
  ResponseType,
} = require("../src/common/utils");
const fetchStats = require("../src/fetchers/stats-fetcher");
const renderStatsCard = require("../src/cards/stats-card");
const blacklist = require("../src/common/blacklist");
const { isLocaleAvailable } = require("../src/translations");

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
    custom_title,
    locale,
    disable_animations,
    response_type,
    callback,
  } = req.query;
  let stats;
  const { contentType, error, render } = ResponseType({
    response_type,
    callback,
    renderCard: renderStatsCard,
  });

  res.setHeader("Content-Type", contentType);

  if (blacklist.includes(username)) {
    return res.send(error("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(error("Something went wrong", "Language not found"));
  }

  try {
    stats = await fetchStats(
      username,
      parseBoolean(count_private),
      parseBoolean(include_all_commits),
    );

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      render(stats, {
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
        custom_title,
        locale: locale ? locale.toLowerCase() : null,
        disable_animations: parseBoolean(disable_animations),
      }),
    );
  } catch (err) {
    return res.send(error(err.message, err.secondaryMessage));
  }
};
