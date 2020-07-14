function calculateRank({
  totalRepos,
  totalCommits,
  contributions,
  followers,
  prs,
  issues,
  stargazers,
}) {
  const CONTRIBS_OFFSET = 1.65;
  const STARS_OFFSET = 1.25;
  const REPPO_OFFSET = 1.10;
  const ISSUES_OFFSET = 1;
  const PRS_OFFSET = 0.99;
  const COMMITS_OFFSET = 0.75;
  const FOLLOWERS_OFFSET = 0.45;

  const FIRST_STEP = 0;
  const SECOND_STEP = 7;
  const THIRD_STEP = 23;
  const FOURTH_STEP = 45;
  const FIFTH_STEP = 120;

  // prettier-ignore
  const score = (
    totalCommits * COMMITS_OFFSET +
    contributions * CONTRIBS_OFFSET +
    issues * ISSUES_OFFSET +
    stargazers * STARS_OFFSET +
    prs * PRS_OFFSET +
    followers * FOLLOWERS_OFFSET +
    totalRepos * REPPO_OFFSET
  ) / totalRepos;

  let level = "";

  if (score == FIRST_STEP) {
    level = "B";
  } else if (score > FIRST_STEP && score <= SECOND_STEP) {
    level = "B+";
  } else if (score > SECOND_STEP && score <= THIRD_STEP) {
    level = "A";
  } else if (score > THIRD_STEP && score <= FOURTH_STEP) {
    level = "A+";
  } else if (score > FOURTH_STEP && score <= FIFTH_STEP) {
    level = "A++";
  } else if (score > FIFTH_STEP) {
    level = "S+";
  }

  return { level, score };
}

module.exports = calculateRank;
