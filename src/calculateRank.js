const { erf } = require("mathjs");
const invSqrt2 = 1 / Math.sqrt(2);
// https://mathworld.wolfram.com/NormalDistribution.html
function normalcdf(mean, sigma, to) {
  const a = (invSqrt2 * (to - mean)) / sigma;
  return (1 + erf(a)) / 2;
}

function calculateRank({
  totalRepos,
  totalCommits,
  contributions,
  followers,
  prs,
  issues,
  stargazers,
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

module.exports = calculateRank;
