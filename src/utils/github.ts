import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { FetchStatError } from "../helpers/Error";
import { logger } from "../utils/debug";

export const request = (
  data: AxiosRequestConfig["data"],
  headers: AxiosRequestConfig["headers"],
) => {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};

export type Variables = { [key: string]: any };
export type Fetcher = (variables: Variables, token: string) => AxiosPromise;

const MAX_RETRY_TIMES = 7;
export const retry = async (
  fetcher: Fetcher,
  variables: Variables,
  retryTimes = 0,
): Promise<AxiosResponse> => {
  if (retryTimes > MAX_RETRY_TIMES) {
    throw new FetchStatError(
      FetchStatError.TYPE.RETRY_UPPER_LIMIT,
      "Please add an env variable called PAT_1 with your github token in vercel",
    );
  }
  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    const response = await fetcher(
      variables,
      `${process.env[`PAT_${retryTimes + 1}`]}`,
    );

    // prettier-ignore
    const isRateExceeded = response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

    // if rate limit is hit increase the RETRIES and recursively call the retry
    // with username, and current RETRIES
    if (isRateExceeded) {
      logger.log(`PAT_${retryTimes + 1} Failed`);
      retryTimes++;
      // directly return from the function
      return retry(fetcher, variables, retryTimes);
    }

    // finally return the response
    return response;
  } catch (err) {
    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    const isBadCredential = err.response.data && err.response.data.message === "Bad credentials";

    if (isBadCredential) {
      logger.log(`PAT_${retryTimes + 1} Failed`);
    }
    retryTimes++;
    // directly return from the function
    return retry(fetcher, variables, retryTimes);
  }
};

// https://stackoverflow.com/a/5263759/10629172
function normalcdf(mean: number, sigma: number, to: number): number {
  var z = (to - mean) / Math.sqrt(2 * sigma * sigma);
  var t = 1 / (1 + 0.3275911 * Math.abs(z));
  var a1 = 0.254829592;
  var a2 = -0.284496736;
  var a3 = 1.421413741;
  var a4 = -1.453152027;
  var a5 = 1.061405429;
  var erf =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  var sign = 1;
  if (z < 0) {
    sign = -1;
  }
  return (1 / 2) * (1 + sign * erf);
}

export function calculateRank({
  totalRepos,
  totalCommits,
  contributions,
  followers,
  prs,
  issues,
  stargazers,
}: {
  totalRepos: number;
  totalCommits: number;
  contributions: number;
  followers: number;
  prs: number;
  issues: number;
  stargazers: number;
}) {
  const COMMITS_OFFSET = 1.65;
  const CONTRIBS_OFFSET = 1.65;
  const ISSUES_OFFSET = 1;
  const STARS_OFFSET = 0.75;
  const PRS_OFFSET = 0.5;
  const FOLLOWERS_OFFSET = 0.45;
  const REPO_OFFSET = 1;

  const ALL_OFFSETS =
    CONTRIBS_OFFSET +
    ISSUES_OFFSET +
    STARS_OFFSET +
    PRS_OFFSET +
    FOLLOWERS_OFFSET +
    REPO_OFFSET;

  const RANK_S_VALUE = 1;
  const RANK_DOUBLE_A_VALUE = 25;
  const RANK_A2_VALUE = 45;
  const RANK_A3_VALUE = 60;
  const RANK_B_VALUE = 100;

  const TOTAL_VALUES =
    RANK_S_VALUE + RANK_A2_VALUE + RANK_A3_VALUE + RANK_B_VALUE;

  // prettier-ignore
  const score = (
    totalCommits * COMMITS_OFFSET +
    contributions * CONTRIBS_OFFSET +
    issues * ISSUES_OFFSET +
    stargazers * STARS_OFFSET +
    prs * PRS_OFFSET +
    followers * FOLLOWERS_OFFSET + 
    totalRepos * REPO_OFFSET 
  ) / 100;

  const normalizedScore = normalcdf(score, TOTAL_VALUES, ALL_OFFSETS) * 100;

  let level = "";

  if (normalizedScore < RANK_S_VALUE) {
    level = "S+";
  }
  if (
    normalizedScore >= RANK_S_VALUE &&
    normalizedScore < RANK_DOUBLE_A_VALUE
  ) {
    level = "S";
  }
  if (
    normalizedScore >= RANK_DOUBLE_A_VALUE &&
    normalizedScore < RANK_A2_VALUE
  ) {
    level = "A++";
  }
  if (normalizedScore >= RANK_A2_VALUE && normalizedScore < RANK_A3_VALUE) {
    level = "A+";
  }
  if (normalizedScore >= RANK_A3_VALUE && normalizedScore < RANK_B_VALUE) {
    level = "B+";
  }

  return { level, score: normalizedScore };
}

export const BLACKLIST = ["renovate-bot", "technote-space", "sw-yx"];
