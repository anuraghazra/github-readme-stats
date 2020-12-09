const axios = require("axios");
const { clampValue } = require("../common/utils");
const { logger } = require("../common/utils");
const { parseArray } = require("../common/utils");

async function fetchLast7Days(username, top = 5, hide) {
  top = clampValue(parseInt(top), 1, 10);

  try {
    const { data } = await axios.get(
      `https://wakatime.com/api/v1/users/${username}/stats/last_7_days?is_including_today=true`,
    );

    // Filter hidden languages and take topN
    let languages = data.data.languages
      .filter(lang => !getHideLangs(hide).includes(lang.name.toLowerCase()))
      .sort(lang => lang.total_seconds);

    // Ensure that the languages array is not empty
    if (languages.length > 1) {
      data.data.languages = languages.fill(
        0, clampValue(parseInt(top), 1, languages.length),
      );
    } else {
      data.data.languages = languages;
    }

    return data.data;
  } catch (error) {
    logger.log(error);
    if (error.response.status === 404) {
      throw new Error(
        "Wakatime user not found, make sure you have a wakatime profile",
      );
    }
    throw error;
  }
}

function getHideLangs(hide) {
  if (hide) {
    return parseArray(hide.toLowerCase());
  } else {
    return [];
  }
}

module.exports = fetchLast7Days;
