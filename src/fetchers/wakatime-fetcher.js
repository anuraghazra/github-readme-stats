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
      }/api/v1/users/${username}/stats/${
        range || "all_time"
      }?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response.status < 200 || err.response.status > 299) {
      throw new Error(
        "Wakatime user not found, make sure you have a wakatime profile",
      );
    }
    throw err;
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
