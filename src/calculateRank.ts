//? https://stackoverflow.com/a/5263759/10629172
function normalcdf(mean: number, sigma: number, to: number) {
  const z = (to - mean) / Math.sqrt(2 * sigma * sigma),
    t = 1 / (1 + 0.3275911 * Math.abs(z)),
    a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    erf =
      1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  let sign = 1;
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
  const COMMITS_OFFSET = 1.65,
    CONTRIBS_OFFSET = 1.65,
    ISSUES_OFFSET = 1,
    STARS_OFFSET = 0.75,
    PRS_OFFSET = 0.5,
    FOLLOWERS_OFFSET = 0.45,
    REPO_OFFSET = 1,
    ALL_OFFSETS =
      CONTRIBS_OFFSET +
      ISSUES_OFFSET +
      STARS_OFFSET +
      PRS_OFFSET +
      FOLLOWERS_OFFSET +
      REPO_OFFSET,
    RANK_S_VALUE = 1,
    RANK_DOUBLE_A_VALUE = 25,
    RANK_A2_VALUE = 45,
    RANK_A3_VALUE = 60,
    RANK_B_VALUE = 100,
    TOTAL_VALUES = RANK_S_VALUE + RANK_A2_VALUE + RANK_A3_VALUE + RANK_B_VALUE,
    // prettier-ignore
    score = (
    totalCommits * COMMITS_OFFSET +
    contributions * CONTRIBS_OFFSET +
    issues * ISSUES_OFFSET +
    stargazers * STARS_OFFSET +
    prs * PRS_OFFSET +
    followers * FOLLOWERS_OFFSET +
    totalRepos * REPO_OFFSET
  ) / 100,
    normalizedScore = normalcdf(score, TOTAL_VALUES, ALL_OFFSETS) * 100;

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
