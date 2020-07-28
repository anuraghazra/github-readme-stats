require("dotenv").config();
const {
  renderError,
  clampValue,
  parseBoolean,
  parseArray,
  CONSTANTS,
} = require("../src/utils");
const fetchTopLanguages = require("../src/fetchTopLanguages");
const renderTopLanguages = require("../src/renderTopLanguages");

module.exports = async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    layout
  } = req.query;
  let topLangs;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    topLangs = await fetchTopLanguages(username);
  } catch (err) {
    return res.send(renderError(err.message));
  }

  const cacheSeconds = clampValue(
    parseInt(cache_seconds || CONSTANTS.THIRTY_MINUTES, 10),
    CONSTANTS.THIRTY_MINUTES,
    CONSTANTS.ONE_DAY
  );

  res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

  res.send(
    renderTopLanguages(topLangs, {
      theme,
      hide_title: parseBoolean(hide_title),
      card_width: parseInt(card_width, 10),
      hide: parseArray(hide),
      title_color,
      text_color,
      bg_color,
      theme,
      layout
    })
  );
};
