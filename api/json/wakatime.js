require("dotenv").config();
const {
  renderError,
  clampValue,
  CONSTANTS,
  isLocaleAvailable,
} = require("../../src/common/utils");
const { fetchWakatimeStats } = require("../../src/fetchers/wakatime-fetcher");

module.exports = async (req, res) => {
  const {
    username,
    cache_seconds,
    locale,
    api_domain,
    range,
  } = req.query;

  res.setHeader("Content-Type", "application/json");

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError("Something went wrong", "Language not found"));
  }

  try {
    const stats = await fetchWakatimeStats({ username, api_domain, range });

    let cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY,
    );

    if (!cache_seconds) {
      cacheSeconds = CONSTANTS.FOUR_HOURS;
    }

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(stats);
  } catch (err) {
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};
