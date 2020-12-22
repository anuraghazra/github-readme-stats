require("dotenv").config();
const {
  renderError,
  parseBoolean,
  clampValue,
  CONSTANTS,
  isLocaleAvailable,
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
    border_color,
    border_width,
    theme,
    cache_seconds,
    hide_title,
    hide_progress,
    custom_title,
    locale,
    layout,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }

  try {
    const last7Days = await fetchLast7Days({ username });

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    if (!cache_seconds) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      wakatimeCard(last7Days, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        border_color,
        border_width,
        theme,
        hide_progress,
        locale: locale ? locale.toLowerCase() : null,
        layout,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
