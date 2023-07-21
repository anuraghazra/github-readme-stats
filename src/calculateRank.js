function score(x, quantiles) {
  const i = quantiles.findIndex((q) => x < q);

  if (i == 0) {
    return 0.0;
  } else if (i == -1) {
    return 1.0;
  }

  const a = quantiles[i - 1];
  const b = quantiles[i];

  return ((x - a) / (b - a) + i - 1) / (quantiles.length - 1);
}

const QUANTILES = {
  commits: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3,
    4, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 19, 20, 22, 23, 25, 27,
    29, 31, 33, 35, 38, 40, 43, 45, 48, 51, 54, 57, 60, 64, 67, 71, 76, 80, 85,
    89, 94, 99, 105, 111, 118, 125, 132, 140, 147, 155, 164, 173, 184, 195, 207,
    220, 233, 249, 265, 284, 304, 326, 353, 380, 411, 451, 495, 545, 611, 691,
    794, 933, 1195, 1704, 9722,
  ],
  all_commits: [
    0, 0, 0, 0, 2, 4, 8, 11, 15, 19, 23, 27, 32, 36, 41, 45, 50, 55, 60, 65, 71,
    76, 82, 87, 93, 99, 105, 111, 117, 124, 131, 137, 145, 151, 159, 166, 174,
    182, 190, 198, 207, 215, 225, 234, 244, 253, 264, 274, 285, 296, 306, 318,
    330, 342, 355, 368, 382, 396, 409, 424, 440, 457, 475, 493, 512, 531, 551,
    570, 593, 618, 643, 667, 695, 723, 752, 784, 815, 857, 893, 934, 984, 1037,
    1094, 1152, 1217, 1289, 1379, 1475, 1576, 1696, 1851, 2023, 2232, 2480,
    2835, 3242, 3885, 4868, 6614, 11801, 792319,
  ],
  prs: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7,
    8, 8, 9, 10, 10, 11, 11, 12, 13, 14, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24,
    25, 27, 28, 30, 32, 34, 36, 38, 40, 43, 46, 50, 53, 57, 61, 65, 70, 76, 83,
    90, 99, 110, 123, 139, 159, 185, 219, 273, 360, 562, 2291,
  ],
  issues: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3,
    4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 14, 15,
    16, 17, 19, 20, 21, 23, 24, 26, 28, 30, 32, 35, 38, 41, 45, 49, 54, 59, 66,
    73, 82, 92, 106, 123, 150, 186, 255, 409, 1590,
  ],
  reviews: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 5, 6, 8, 11, 15, 23, 36, 61,
    129, 764,
  ],
  repos: [
    0, 0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9, 10, 10, 11,
    11, 12, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20,
    20, 21, 21, 22, 22, 23, 24, 24, 25, 25, 26, 27, 28, 28, 29, 30, 30, 31, 32,
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 49, 50, 52, 54, 56,
    58, 60, 62, 65, 68, 70, 74, 77, 82, 86, 92, 98, 105, 115, 127, 144, 170,
    211, 316, 2002,
  ],
  stars: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6,
    7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24,
    26, 28, 30, 31, 33, 35, 38, 41, 44, 48, 52, 56, 61, 67, 74, 83, 93, 104,
    117, 134, 154, 181, 215, 257, 321, 417, 565, 818, 1298, 2599, 18304,
  ],
  followers: [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
    5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 12, 12,
    13, 13, 14, 14, 15, 15, 16, 16, 17, 18, 18, 19, 20, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 32, 33, 35, 36, 38, 40, 42, 44, 46, 49, 51, 54, 57, 61,
    65, 70, 75, 81, 88, 97, 108, 121, 139, 161, 193, 240, 334, 569, 3583,
  ],
};

const WEIGHT = {
  commits: 2.0,
  prs: 3.0,
  issues: 1.0,
  reviews: 0.5,
  repos: 0.0,
  stars: 4.0,
  followers: 1.0,
};

/**
 * Calculates the users rank.
 *
 * @param {object} params Parameters on which the user's rank depends.
 * @param {boolean} params.all_commits Whether `include_all_commits` was used.
 * @param {number} params.commits Number of commits.
 * @param {number} params.prs The number of pull requests.
 * @param {number} params.issues The number of issues.
 * @param {number} params.reviews The number of reviews.
 * @param {number} params.repos Total number of repos.
 * @param {number} params.stars The number of stars.
 * @param {number} params.followers The number of followers.
 * @returns {{level: string, percentile: number}}} The users rank.
 */
function calculateRank({
  all_commits,
  commits,
  prs,
  issues,
  reviews,
  repos,
  stars,
  followers,
}) {
  const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const LEVELS = ["S", "A+", "A", "A-", "B+", "B", "B-", "C+", "C"];

  const total_weight =
    WEIGHT.commits +
    WEIGHT.prs +
    WEIGHT.issues +
    WEIGHT.reviews +
    WEIGHT.repos +
    WEIGHT.stars +
    WEIGHT.followers;

  const total_score =
    WEIGHT.commits *
      score(commits, all_commits ? QUANTILES.all_commits : QUANTILES.commits) +
    WEIGHT.prs * score(prs, QUANTILES.prs) +
    WEIGHT.issues * score(issues, QUANTILES.issues) +
    WEIGHT.reviews * score(reviews, QUANTILES.reviews) +
    WEIGHT.repos * score(repos, QUANTILES.repos) +
    WEIGHT.stars * score(stars, QUANTILES.stars) +
    WEIGHT.followers * score(followers, QUANTILES.followers);

  const percentile = 100 * (1 - total_score / total_weight);
  const level = LEVELS[THRESHOLDS.findIndex((t) => percentile <= t)];

  return { level, percentile };
}

export { calculateRank };
export default calculateRank;
