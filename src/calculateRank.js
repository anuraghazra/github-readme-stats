function expsf(lambda, to) {
  return Math.exp(-lambda * to);
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
  const COMMITS_VALUE = 1 / 10000;
  const CONTRIBS_VALUE = 1 / 1000;
  const ISSUES_VALUE = 1 / 100;
  const STARS_VALUE = 1 / 400;
  const PRS_VALUE = 1 / 300;
  const FOLLOWERS_VALUE = 1 / 100;
  const REPO_VALUE = 1 / 20;

  const RANK_S_VALUE = 1;
  const RANK_DOUBLE_A_VALUE = 25;
  const RANK_A2_VALUE = 45;
  const RANK_A3_VALUE = 60;
  const RANK_B_VALUE = 100;

  const normalizedScore = 700 / (
      1 / expsf(COMMITS_VALUE, totalCommits) +
      1 / expsf(CONTRIBS_VALUE, contributions) +
      1 / expsf(ISSUES_VALUE, issues) +
      1 / expsf(STARS_VALUE, stargazers) +
      1 / expsf(PRS_VALUE, prs) +
      1 / expsf(FOLLOWERS_VALUE, followers) +
      1 / expsf(REPO_VALUE, totalRepos))

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
