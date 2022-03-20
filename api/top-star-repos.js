require("dotenv").config();
const {
  renderError,
  clampValue,
  parseBoolean,
  parseArray,
  CONSTANTS,
} = require("../src/common/utils");
const fetchTopRepos = require("../src/fetchers/top-repos-fetcher");
const renderTopRepos = require("../src/cards/top-repos-card");
const blacklist = require("../src/common/blacklist");
const { isLocaleAvailable } = require("../src/translations");

module.exports = async (req, res) => {
  const {
    username,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    repo_count,
    exclude_repo,
    custom_title,
    locale,
    border_radius,
    border_color,
  } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Locale not found"));
  }

  try {
    const sortType = "star";
    const topStars = await fetchTopRepos(
      username,
      sortType,
      parseArray(exclude_repo),
    );

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
    
    return res.send(
      renderTopRepos(topStars, card_type=sortType, {
        custom_title,
        default_title: "topStars.title",
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        title_color,
        text_color,
        bg_color,
        theme,
        repo_count,
        border_radius,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
      }),
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
