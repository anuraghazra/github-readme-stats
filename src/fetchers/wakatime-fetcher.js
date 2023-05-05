import axios from "axios";
import { MissingParamError } from "../common/utils.js";

/**
 * WakaTime data fetcher.
 *
 * @param {{username: string, api_domain: string, range: string}} props Fetcher props.
 * @returns {Promise<WakaTimeData>} WakaTime data response.
 */
const fetchWakatimeStats = async ({ username, api_domain, range }) => {
  if (!username) throw new MissingParamError(["username"]);

  try {
    const { data } = await axios.get(
      `https://${
        api_domain ? api_domain.replace(/\/$/gi, "") : "wakatime.com"
      }/api/v1/users/${username}/stats/${range || ""}?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response.status == 403) {
      throw new Error(
        'History for this time period is not publicly available. Please ensure that the query parameter matches the value in the user\'s profile or try using the "last_7_days" range parameter.',
      );
    } else if (err.response.status < 200 || err.response.status > 299) {
      throw new Error(
        "Wakatime user not found, make sure you have a wakatime profile",
      );
    }
    throw err;
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
