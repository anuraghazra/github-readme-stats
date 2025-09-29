import process from "process";

/**
 * Formats time from nanoseconds to a human-readable string.
 * @param {number} ns Time in nanoseconds.
 * @returns {string} Formatted time string.
 */
const formatTime = (ns) => {
  if (ns < 10_000) {
    return `${Number(ns.toFixed(3))}ns`; // Return in nanoseconds if less than 0.01ms
  }
  return `${(Number(ns) / 1_000_000).toFixed(3)}ms`; // Convert nanoseconds to milliseconds
};

/**
 * Measures the execution time of a given function.
 * @param {function} fn The function to benchmark.
 * @returns {number} The duration in nanoseconds.
 */
export const measurePerformance = (fn) => {
  const start = process.hrtime.bigint(); // High-resolution time in nanoseconds
  fn();
  const end = process.hrtime.bigint();
  const durationNs = end - start;
  return Number(durationNs);
};

/**
 * Runs a function multiple times and returns statistics.
 * @param {string} fnName The function name.
 * @param {function} fn The function to benchmark.
 * @param {number} runs The number of times to run the function.
 * @returns {{average: number, min: number, max: number, runs: number, totalTime: number}} Performance statistics in milliseconds.
 */
export const runAndLogStats = (fnName, fn, runs = 100) => {
  if (runs <= 0) {
    throw new Error("Number of runs must be positive.");
  }

  const durations = [];
  for (let i = 0; i < runs; i++) {
    // Basic JIT warm-up: Run a few times before measuring for real
    if (i < Math.min(runs, 10)) {
      // Run 10 times or fewer if `runs` is small
      fn();
    }
    durations.push(measurePerformance(fn));
  }

  const totalTime = durations.reduce((sum, time) => sum + time, 0);
  const average = totalTime / runs;
  const min = Math.min(...durations);
  const max = Math.max(...durations);

  console.log(
    fnName + " - Average:",
    formatTime(average),
    "Min:",
    formatTime(min),
    "Max:",
    formatTime(max),
    "Runs:",
    runs,
  );
};
