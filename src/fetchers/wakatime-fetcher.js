const axios = require("axios");

const fetchLast7Days = async ({ username }) => {
  try {
    const { data } = await axios.get(
      `https://wakatime.com/api/v1/users/${username}/stats/last_7_days?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response.status === 404) {
      throw new Error(
        "Wakatime user not found, make sure you have a wakatime profile",
      );
    }
    throw err;
  }
};

module.exports = {
  fetchLast7Days,
};
