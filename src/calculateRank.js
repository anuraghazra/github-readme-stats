function expsf(x, lambda = 1) {
  return 2 ** (-lambda * x);
}

/**
 * Calculates the users rank.
 *
 * @param {object} params Parameters on which the user's rank depends.
 * @param {boolean} params.all_commits Whether `include_all_commits` was used.
 * @param {number} params.commits Number of commits.
 * @param {number} params.prs The number of pull requests.
 * @param {number} params.issues The number of issues.
 * @param {number} params.repos Total number of repos.
 * @param {number} params.stars The number of stars.
 * @param {number} params.followers The number of followers.
 * @returns {{level: string, score: number}}} The users rank.
 */
function calculateRank({
  all_commits,
  commits,
  prs,
  issues,
  repos, // unused
  stars,
  followers,
}) {
  const COMMITS_MEAN = all_commits ? 500 : 100,
    COMMITS_WEIGHT = 2;
  const PRS_MEAN = 50,
    PRS_WEIGHT = 4;
  const ISSUES_MEAN = 10,
    ISSUES_WEIGHT = 1;
  const STARS_MEAN = 100,
    STARS_WEIGHT = 6;
  const FOLLOWERS_MEAN = 25,
    FOLLOWERS_WEIGHT = 1;

  const TOTAL_WEIGHT =
    COMMITS_WEIGHT +
    PRS_WEIGHT +
    ISSUES_WEIGHT +
    STARS_WEIGHT +
    FOLLOWERS_WEIGHT;

  const rank =
    (COMMITS_WEIGHT * expsf(commits, 1 / COMMITS_MEAN) +
      PRS_WEIGHT * expsf(prs, 1 / PRS_MEAN) +
      ISSUES_WEIGHT * expsf(issues, 1 / ISSUES_MEAN) +
      STARS_WEIGHT * expsf(stars, 1 / STARS_MEAN) +
      FOLLOWERS_WEIGHT * expsf(followers, 1 / FOLLOWERS_MEAN)) /
    TOTAL_WEIGHT;

  const RANK_S_PLUS = 0.025;
  const RANK_S = 0.1;
  const RANK_A_PLUS = 0.25;
  const RANK_A = 0.5;
  const RANK_B_PLUS = 0.75;

  const level = (() => {
    if (rank <= RANK_S_PLUS) return "S+";
    if (rank <= RANK_S) return "S";
    if (rank <= RANK_A_PLUS) return "A+";
    if (rank <= RANK_A) return "A";
    if (rank <= RANK_B_PLUS) return "B+";
    return "B";
  })();

  return { level, score: rank * 100 };
}

export { calculateRank };
export default calculateRank;
