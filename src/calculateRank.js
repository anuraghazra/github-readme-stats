function expsf(x, lambda=1.) {
  return Math.exp(-lambda * x);
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
  const REPOS_MEAN = 10, REPOS_WEIGHT = 0.125;
  const CONTRIBS_MEAN = 1000, CONTRIBS_WEIGHT = 0.125;
  const FOLLOWERS_MEAN = 50, FOLLOWERS_WEIGHT = 0.5;
  const PRS_ISSUES_MEAN = 50, PRS_ISSUES_WEIGHT = 0.25;
  const STARS_MEAN = 100, STARS_WEIGHT = 1.0;

  const TOTAL_WEIGHT = (
    REPOS_WEIGHT +
    CONTRIBS_WEIGHT +
    FOLLOWERS_WEIGHT +
    PRS_ISSUES_WEIGHT +
    STARS_WEIGHT
  );

  const rank = (
    REPOS_WEIGHT * expsf(totalRepos / REPOS_MEAN) +
    CONTRIBS_WEIGHT * expsf(contributions / CONTRIBS_MEAN) +
    FOLLOWERS_WEIGHT * expsf(followers / FOLLOWERS_MEAN) +
    PRS_ISSUES_WEIGHT * expsf((prs + issues) / PRS_ISSUES_MEAN) +
    STARS_WEIGHT * expsf(stargazers / STARS_MEAN)
  ) / TOTAL_WEIGHT;

  const RANK_S_PLUS = 0.01;
  const RANK_S = 0.1;
  const RANK_A_PLUS = 0.25;
  const RANK_A = 0.50;
  const RANK_B_PLUS = 0.75;

  let level = "";

  if (rank < RANK_S_PLUS)
    level = "S+";
  else if (rank < RANK_S)
    level = "S";
  else if (rank < RANK_A_PLUS)
    level = "A+";
  else if (rank < RANK_A)
    level = "A";
  else if (rank < RANK_B_PLUS)
    level = "B+";
  else
    level = "B";

  return {level, score: rank * 100};
}

module.exports = calculateRank;
