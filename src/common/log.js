// @ts-check

const noop = () => {};

/**
 * Return console instance based on the environment.
 *
 * @type {Console | {log: () => void, error: () => void}}
 */
const logger =
  process.env.NODE_ENV === "test" ? { log: noop, error: noop } : console;

export { logger };
export default logger;
