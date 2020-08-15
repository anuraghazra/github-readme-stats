const axios = require('axios');

const { WAKATIME_KEY } = process.env;

const fetchLast7Days = async ({ username }) => {
    const { data } = await axios.get(`https://wakatime.com/api/v1/users/${username}/stats/last_7_days`);

    return data.data;
};

module.exports = {
    fetchLast7Days,
};