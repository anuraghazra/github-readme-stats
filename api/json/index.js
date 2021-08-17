require("dotenv").config();
const {
  renderError,
  parseBoolean,
  clampValue,
  CONSTANTS,
} = require("../../src/common/utils");
const fetchStats = require("../../src/fetchers/stats-fetcher");
const blacklist = require("../../src/common/blacklist");
const { isLocaleAvailable } = require("../../src/translations");

module.exports = async (req, res) => {
  const {
    username,
    count_private,
    include_all_commits,
    cache_seconds,
    locale,
  } = req.query;
  let stats;

  res.setHeader("Content-Type", "application/json");

  if (blacklist.includes(username)) {
    return res.send(renderError("Something went wrong"));
  }

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
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

    return res.send(stats);
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
