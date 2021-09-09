const axios = require("axios");

const fetchCodetimeStats = async ({username, api_domain, range}) => {
    try {
        const {data} = await.axios.get(`https://${api_domain ? api_domain.replace(/\/$/gi, "") : "app.software.com"}/api/v1/users/${username}/stats/${range || ''}?is_including_today=true`);

        return data.data;

    } catch (err) {
        if(err.response.status < 200 || err.response.status > 299){
            throw new Error("CodeTime user not found, make sure you have a CodeTime profile");
        }

        throw err;
    }
};

module.exports = {fetchCodetimeStats};