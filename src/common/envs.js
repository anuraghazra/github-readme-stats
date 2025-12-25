// @ts-check

const whitelist = process.env.WHITELIST
  ? process.env.WHITELIST.split(",")
  : undefined;

const gistWhitelist = process.env.GIST_WHITELIST
  ? process.env.GIST_WHITELIST.split(",")
  : undefined;

const ALL_TIME_CONTRIBS=process.env.ALL_TIME_CONTRIBS !== "false";

const ALL_TIME_CONTRIBS_TIMEOUT_MS = parseInt(
  process.env.ALL_TIME_CONTRIBS_TIMEOUT_MS || "9000",
  10,
);

const ALL_TIME_CONTRIBS_CONCURRENCY = parseInt(
  process.env.ALL_TIME_CONTRIBS_CONCURRENCY || "3",
  10,
);

const excludeRepositories = process.env.EXCLUDE_REPO
  ? process.env.EXCLUDE_REPO.split(",")
  : [];

export { whitelist, gistWhitelist, excludeRepositories, ALL_TIME_CONTRIBS, ALL_TIME_CONTRIBS_TIMEOUT_MS, ALL_TIME_CONTRIBS_CONCURRENCY };
