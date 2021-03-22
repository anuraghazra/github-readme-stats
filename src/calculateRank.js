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
  const STARS_VALUE = 1 / 50;
  const PRS_VALUE = 1 / 300;
  const FOLLOWERS_VALUE = 1 / 25;
  const REPO_VALUE = 1 / 20;

  const RANK_S_VALUE = 1;
  const RANK_DOUBLE_A_VALUE = 25;
  const RANK_A2_VALUE = 45;
  const RANK_A3_VALUE = 60;
  const RANK_B_VALUE = 100;

  const normalizedScore = (expsf(COMMITS_VALUE, totalCommits) +
                           expsf(CONTRIBS_VALUE, contributions) +
                           expsf(ISSUES_VALUE, issues) +
                           expsf(STARS_VALUE, stargazers) +
                           expsf(PRS_VALUE, prs) +
                           expsf(FOLLOWERS_VALUE, followers) +
                           expsf(REPO_VALUE, totalRepos)) / 7 * 100

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
