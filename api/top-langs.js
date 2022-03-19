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
const { isLocaleAvailable } = require("../src/translations");

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
    include_repo,
    custom_title,
    locale,
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  // Validate input arguments.
  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }
  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Locale not found"));
  }
  if (include_repo && exclude_repo) {
    return res.send(
      renderError(
        "Something went wrong",
        "'include_repo' and 'exclude_repo' options can't be used in the same query.",
      ),
    );
  }

  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
      parseArray(include_repo),
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
        langs_count,
        border_radius,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
