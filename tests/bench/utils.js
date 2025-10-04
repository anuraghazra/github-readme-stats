// @ts-check

const DEFAULT_RUNS = 1000;
const DEFAULT_WARMUPS = 50;

/**
 * Formats a duration in nanoseconds to a compact human-readable string.
 *
 * @param {bigint} ns Duration in nanoseconds.
 * @returns {string} Formatted time string.
 */
const formatTime = (ns) => {
  if (ns < 1_000n) {
    return `${ns}ns`;
  }
  if (ns < 1_000_000n) {
    return `${Number(ns) / 1_000}µs`;
  }
  if (ns < 1_000_000_000n) {
    return `${(Number(ns) / 1_000_000).toFixed(3)}ms`;
  }
  return `${(Number(ns) / 1_000_000_000).toFixed(3)}s`;
};

/**
 * Measures synchronous or async function execution time.
 *
 * @param {Function} fn Function to measure.
 * @returns {Promise<bigint>} elapsed nanoseconds
 */
const measurePerformance = async (fn) => {
  const start = process.hrtime.bigint();
  const ret = fn();
  if (ret instanceof Promise) {
    await ret;
  }
  const end = process.hrtime.bigint();
  return end - start;
};

/**
 * Computes basic & extended statistics.
 *
 * @param {bigint[]} samples Array of samples in nanoseconds.
 * @returns {object} Stats
 */
const computeStats = (samples) => {
  const sorted = [...samples].sort((a, b) => (a < b ? -1 : 1));
  const toNumber = (b) => Number(b); // safe for typical short benches
  const n = sorted.length;
  const sum = sorted.reduce((a, b) => a + b, 0n);
  const avg = Number(sum) / n;
  const median =
    n % 2
      ? toNumber(sorted[(n - 1) / 2])
      : (toNumber(sorted[n / 2 - 1]) + toNumber(sorted[n / 2])) / 2;
  const p = (q) => {
    const idx = Math.min(n - 1, Math.floor((q / 100) * n));
    return toNumber(sorted[idx]);
  };
  const min = toNumber(sorted[0]);
  const max = toNumber(sorted[n - 1]);
  const variance =
    sorted.reduce((acc, v) => acc + (toNumber(v) - avg) ** 2, 0) / n;
  const stdev = Math.sqrt(variance);

  return {
    runs: n,
    min,
    max,
    average: avg,
    median,
    p75: p(75),
    p95: p(95),
    p99: p(99),
    stdev,
    totalTime: toNumber(sum),
  };
};

/**
 * Benchmark a function.
 *
 * @param {string} fnName Name of the function (for logging).
 * @param {Function} fn Function to benchmark.
 * @param {object} [opts] Options.
 * @param {number} [opts.runs] Number of measured runs.
 * @param {number} [opts.warmup] Warm-up iterations (not measured).
 * @param {boolean} [opts.trimOutliers] Drop top & bottom 1% before stats.
 * @returns {Promise<object>} Stats (nanoseconds for core metrics).
 */
export const runAndLogStats = async (
  fnName,
  fn,
  { runs = DEFAULT_RUNS, warmup = DEFAULT_WARMUPS, trimOutliers = false } = {},
) => {
  if (runs <= 0) {
    throw new Error("Number of runs must be positive.");
  }

  // Warm-up
  for (let i = 0; i < warmup; i++) {
    const ret = fn();
    if (ret instanceof Promise) {
      await ret;
    }
  }

  const samples = [];
  for (let i = 0; i < runs; i++) {
    samples.push(await measurePerformance(fn));
  }

  let processed = samples;
  if (trimOutliers && samples.length > 10) {
    const sorted = [...samples].sort((a, b) => (a < b ? -1 : 1));
    const cut = Math.max(1, Math.floor(sorted.length * 0.01));
    processed = sorted.slice(cut, sorted.length - cut);
  }

  const stats = computeStats(processed);

  const fmt = (ns) => formatTime(BigInt(Math.round(ns)));
  console.log(
    `${fnName} | runs=${stats.runs} avg=${fmt(stats.average)} median=${fmt(
      stats.median,
    )} p95=${fmt(stats.p95)} min=${fmt(stats.min)} max=${fmt(
      stats.max,
    )} stdev=${fmt(stats.stdev)}`,
  );

  return stats;
};
