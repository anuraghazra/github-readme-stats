require("dotenv").config();
const {
  parseBoolean,
  clampValue,
  CONSTANTS,
  isLocaleAvailable,
  ResponseType,
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
    hide_progress,
    custom_title,
    locale,
    layout,
    response_type,
    callback,
  } = req.query;
  const { contentType, error, render } = ResponseType({
    response_type,
    callback,
    renderCard: wakatimeCard,
  });

  res.setHeader("Content-Type", contentType);

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(error("Something went wrong", "Language not found"));
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
      render(last7Days, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        theme,
        hide_progress,
        locale: locale ? locale.toLowerCase() : null,
        layout,
      }),
    );
  } catch (err) {
    return res.send(error(err.message, err.secondaryMessage));
  }
};
