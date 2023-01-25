require("dotenv").config();
const {
  renderError,
  clampValue,
  parseBoolean,
  parseArray,
  CONSTANTS,
} = require("../../src/common/utils");
const fetchTopLanguages = require("../../src/fetchers/top-languages-fetcher");
const renderTopLanguages = require("../../src/cards/top-languages-card");
const blacklist = require("../../src/common/blacklist");
const { isLocaleAvailable } = require("../../src/translations");

module.exports = async (req, res) => {
  const {
    username,
    hide,
    cache_seconds,
    exclude_repo,
    locale,
  } = req.query;
  let topLangs;

  res.setHeader("Content-Type", "application/json");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Locale not found"));
  }

  try {
    topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
      parseArray(hide),
    );

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      topLangs
    );
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
