import axios from "axios";
import { MissingParamError } from "../common/utils.js";

/**
 * WakaTime data fetcher.
 *
 * @param {{username: string, api_domain: string}} props Fetcher props.
 * @returns {Promise<WakaTimeData>} WakaTime data response.
 */
const fetchWakatimeStats = async ({ username, api_domain }) => {
  if (!username) throw new MissingParamError(["username"]);

  // Loop through available ranges to get user data.
  for (const range of ["all_time", "last_year", "last_7_days"]) {
    try {
      const { data } = await axios.get(
        `https://${
          api_domain ? api_domain.replace(/\/$/gi, "") : "wakatime.com"
        }/api/v1/users/${username}/stats/${range}?is_including_today=true`,
      );

      return data.data;
    } catch (err) {
      if (err.response.status === 403 && range !== "last_year") {
        continue;
      } else if (err.response.status < 200 || err.response.status > 299) {
        throw new Error(i18n.t("wakatimecard.nouser"));
      }
      throw err;
    }
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
