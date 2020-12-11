const axios = require("axios");

const wakaTimeEmbedData = async ({ username , embedCode}) => {
    try {
        const { data } = await axios.get(
            `https://wakatime.com/share/@${username}/${embedCode}.json`,
        );

        return data.data;
    } catch (err) {
        if (err.response.status === 404) {
            throw new Error(
                "Wakatime Data not found",
            );
        }
        throw err;
    }
};

module.exports = {
    wakaTimeEmbedData,
};
