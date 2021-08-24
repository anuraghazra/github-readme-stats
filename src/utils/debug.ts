export const logger =
  process.env.NODE_ENV !== "test"
    ? console
    : { log: (...args: any[]) => void 0, error: (...args: any[]) => void 0 };
    