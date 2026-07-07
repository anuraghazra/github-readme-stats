// @ts-check

import axios from "axios";
import { CustomError, MissingParamError } from "../common/error.js";

const ALLOWED_WAKATIME_DOMAINS = ["wakatime.com", "wakapi.dev"];

/**
 * WakaTime data fetcher.
 *
 * @param {{username: string, api_domain: string }} props Fetcher props.
 * @returns {Promise<import("./types").WakaTimeData>} WakaTime data response.
 */
const fetchWakatimeStats = async ({ username, api_domain }) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const sanitizedDomain = api_domain
    ? api_domain.replace(/\/$/gi, "").toLowerCase()
    : "wakatime.com";

  if (!ALLOWED_WAKATIME_DOMAINS.includes(sanitizedDomain)) {
    throw new CustomError(
      `Invalid api_domain. Allowed domains: ${ALLOWED_WAKATIME_DOMAINS.join(", ")}`,
      CustomError.WAKATIME_ERROR,
    );
  }

  try {
    const { data } = await axios.get(
      `https://${sanitizedDomain}/api/v1/users/${username}/stats?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response?.status < 200 || err.response?.status > 299) {
      throw new CustomError(
        `Could not resolve to a User with the login of '${username}'`,
        "WAKATIME_USER_NOT_FOUND",
      );
    }
    throw err;
  }
};

export { fetchWakatimeStats };
export default fetchWakatimeStats;
