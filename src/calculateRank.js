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

  const FIRST_STEP = 0;
  const SECOND_STEP = 5;
  const THIRD_STEP = 20;
  const FOURTH_STEP = 50;
  const FIFTH_STEP = 130;

  // prettier-ignore
  const score = (
    totalCommits * COMMITS_OFFSET +
    contributions * CONTRIBS_OFFSET +
    issues * ISSUES_OFFSET +
    stargazers * STARS_OFFSET +
    prs * PRS_OFFSET +
    followers * FOLLOWERS_OFFSET
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
