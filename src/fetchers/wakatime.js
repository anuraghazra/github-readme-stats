// @ts-check

import axios from "axios";
import { CustomError, MissingParamError } from "../common/error.js";

/**
 * Normalize and validate the WakaTime API hostname.
 *
 * Only allows the default host "wakatime.com" or its subdomains.
 *
 * @param {string | undefined} api_domain
 * @returns {string}
 */
const normalizeWakatimeHost = (api_domain) => {
  if (!api_domain) {
    return "wakatime.com";
  }

  // Remove trailing slashes and surrounding whitespace.
  const trimmed = String(api_domain).trim().replace(/\/+$/g, "");

  // Disallow obvious dangerous characters (paths, ports, schemes).
  if (/[\/:]/.test(trimmed)) {
    throw new CustomError(
      "Invalid WakaTime API domain.",
      "WAKATIME_INVALID_API_DOMAIN",
    );
  }

  // Only allow wakatime.com or its subdomains.
  if (
    trimmed !== "wakatime.com" &&
    !/^[a-zA-Z0-9.-]+\.wakatime\.com$/.test(trimmed)
  ) {
    throw new CustomError(
      "Invalid WakaTime API domain.",
      "WAKATIME_INVALID_API_DOMAIN",
    );
  }

  return trimmed;
};

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

  const apiHost = normalizeWakatimeHost(api_domain);
  const encodedUsername = encodeURIComponent(username);

  try {
    const { data } = await axios.get(
      `https://${apiHost}/api/v1/users/${encodedUsername}/stats?is_including_today=true`,
    );

    return data.data;
  } catch (err) {
    if (err.response.status < 200 || err.response.status > 299) {
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
