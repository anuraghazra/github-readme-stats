function expsf(lambda, x) {
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
  // value of statistics should be equal to 1 / <average number per user> (see https://en.wikipedia.org/wiki/Exponential_distribution#Mean,_variance,_moments_and_median)
  const COMMITS_LAMBDA = 1 / 10000;
  const CONTRIBS_LAMBDA = 1 / 1000;
  const ISSUES_LAMBDA = 1 / 100;
  const STARS_LAMBDA = 1 / 400;
  const PRS_LAMBDA = 1 / 300;
  const FOLLOWERS_LAMBDA = 1 / 100;
  const REPO_LAMBDA = 1 / 20;

  const RANK_S_VALUE = 1;
  const RANK_DOUBLE_A_VALUE = 25;
  const RANK_A2_VALUE = 45;
  const RANK_A3_VALUE = 60;
  const RANK_B_VALUE = 100;

  const normalizedScore = 700 / (
      1 / expsf(COMMITS_LAMBDA, totalCommits) +
      1 / expsf(CONTRIBS_LAMBDA, contributions) +
      1 / expsf(ISSUES_LAMBDA, issues) +
      1 / expsf(STARS_LAMBDA, stargazers) +
      1 / expsf(PRS_LAMBDA, prs) +
      1 / expsf(FOLLOWERS_LAMBDA, followers) +
      1 / expsf(REPO_LAMBDA, totalRepos))

  let level = "";

  if (normalizedScore < RANK_S_VALUE) {
    level = "S+";
  } else if (normalizedScore < RANK_DOUBLE_A_VALUE) {
    level = "S";
  } else if (normalizedScore < RANK_A2_VALUE) {
    level = "A++";
  } else if (normalizedScore < RANK_A3_VALUE) {
    level = "A+";
  } else {
    level = "B+";
  }

  return { level, score: normalizedScore };
}

module.exports = calculateRank;
