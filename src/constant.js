export function rank_to_level(rank) {
  const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const LEVELS = ["S", "A+", "A", "A-", "B+", "B", "B-", "C+", "C"];
  return LEVELS[THRESHOLDS.findIndex((t) => rank * 100 <= t)];
}
