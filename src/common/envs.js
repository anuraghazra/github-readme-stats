// @ts-check

const whitelist = process.env.WHITELIST
  ? process.env.WHITELIST.split(",")
  : undefined;

const gistWhitelist = process.env.GIST_WHITELIST
  ? process.env.GIST_WHITELIST.split(",")
  : undefined;

const ALL_TIME_CONTRIBS=process.env.ALL_TIME_CONTRIBS == "true";

const excludeRepositories = process.env.EXCLUDE_REPO
  ? process.env.EXCLUDE_REPO.split(",")
  : [];

export { whitelist, gistWhitelist, excludeRepositories, ALL_TIME_CONTRIBS };
