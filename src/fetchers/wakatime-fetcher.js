const axios = require("axios");

const fetchLast7Days = async (username) => {
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

const fetchCustomTime = async (username, time) => {
  try {
    const {
      data
    } = await axios.get(
      `https://wakatime.com/api/v1/users/${username}/stats/${time}?is_including_today=true`, {
        headers: {
          'Authorization': `Basic ${process.env.WAKATIME_API_KEY}`
        }
      }
    );

    delete data.data.machines
    delete data.data.projects

    return data.data;
  } catch (err) {
    switch (err.response.status) {
      case 404:
        throw new Error(
          "Wakatime user not found, make sure you have a wakatime profile",
        );
      case 403:
        throw new Error(
          "Wakatime API not found or not allowed to access this user data",
        );
      default:
        throw err;
    }
  }
};

const fetch = async ({
  username,
  time
}) => {
  if (time && time != "last_7_days") {
    return await fetchCustomTime(username, time)
  } else {
    return await fetchLast7Days(username)
  }
};

module.exports = {
  fetch
};
