import axios from "axios";
import { CustomError, MissingParamError } from "../common/utils.js";

/**
 * WakaTime data fetcher.
 *
 * @param {{username: string, api_domain: string, allowed_domains: string }} props Fetcher props.
 * @returns {Promise<WakaTimeData>} WakaTime data response.
 */
const fetchWakatimeStats = async ({
  username,
  api_domain,
  allowed_domains,
}) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }
  if (
    typeof username !== "string" ||
    username.includes("?") ||
    username.includes("#") ||
    username.includes("/")
  ) {
    throw new CustomError("username must not contain ? or # or /");
  }

  if (api_domain && typeof api_domain !== "string") {
    // avoid type confusion attack, since later on `slice` method also works on arrays
    throw new TypeError("api_domain must be a string");
  } else {
    // default value
    api_domain = "wakatime.com";
  }
  if (api_domain.includes("?") || api_domain.includes("#")) {
    throw new CustomError("api_domain must not contain ? or #");
  }
  if (api_domain.endsWith("/")) {
    api_domain = api_domain.slice(0, -1);
  }

  let is_domain_allowed = false;
  if (allowed_domains === undefined) {
    is_domain_allowed = true;
  } else {
    const domains = allowed_domains.split(",");
    for (const domain of domains) {
      if (domain === api_domain) {
        is_domain_allowed = true;
        break;
      }
    }
  }
  if (!is_domain_allowed) {
    throw new CustomError(
      `api_domain '${api_domain}' is not in allowed domain list.`,
    );
  }

  try {
    const { data } = await axios.get(
      `https://${api_domain}/api/v1/users/${username}/stats?is_including_today=true`,
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
