require("dotenv").config();
const {
  renderError,
  clampValue,
  parseBoolean,
  parseArray,
  CONSTANTS,
} = require("../src/common/utils");
const fetchTopLanguages = require("../src/fetchers/top-languages-fetcher");
const renderTopLanguages = require("../src/cards/top-languages-card");
const blacklist = require("../src/common/blacklist");
const fonts = require('../fonts')

module.exports = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout,
    langs_count,
    exclude_repo,
    custom_title,
    font,
  } = req.query;
  let topLangs;

  res.setHeader("Content-Type", "image/svg+xml");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (font && !fonts.includes(font.toLowerCase())) {
    return res.send(renderError("Font not found"));
  }

  try {
    topLangs = await fetchTopLanguages(
      username,
      langs_count,
      parseArray(exclude_repo),
    );

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      renderTopLanguages(topLangs, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        title_color,
        text_color,
        bg_color,
        theme,
        layout,
        font: font ? font.toLowerCase() : null,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
