require("dotenv").config();
const {
  renderError,
  parseBoolean,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const { fetchLast7Days } = require("../src/fetchers/wakatime-fetcher");
const wakatimeCard = require("../src/cards/wakatime-card");

module.exports = async (req, res) => {
  const {
    username,
    title_color,
    icon_color,
    hide_border,
    line_height,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    hide_title,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const last7Days = await fetchLast7Days({ username });

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY
    );

    if (!cache_seconds) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      wakatimeCard(last7Days, {
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
      })
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
