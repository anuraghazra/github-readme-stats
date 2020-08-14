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
    include_lang = "",
    exclude_lang = "",
    cache_seconds,
    layout,
  } = req.query;
  let topLangs;

  let includeLangs = include_lang == "" ? [] : include_lang.split(" ");
  let excludeLangs = exclude_lang == "" ? [] : exclude_lang.split(" ");

  if (includeLangs.length) {
    includeLangs.forEach(function (lang, index, langs) {
      langs[index] = lang
        .toLowerCase()
        .replace("plusplus", "++")
        .replace("sharp", "#");
    });
  } else if (excludeLangs.length) {
    excludeLangs.forEach(function (lang, index, langs) {
      langs[index] = lang
        .toLowerCase()
        .replace("plusplus", "++")
        .replace("sharp", "#");
    });
  }
  res.setHeader("Content-Type", "image/svg+xml");

  let isInclude = includeLangs.length > excludeLangs.length;
  try {
    topLangs = await fetchTopLanguages(username, {
      names: isInclude ? includeLangs : excludeLangs,
      include: isInclude,
    });

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      renderTopLanguages(topLangs, {
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        title_color,
        text_color,
        bg_color,
        theme,
        layout,
      })
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
