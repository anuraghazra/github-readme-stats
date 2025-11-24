// @ts-check

import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { RETRIES, retryer } from "../src/common/retryer.js";
import { logger } from "../src/common/log.js";

const fetcher = jest.fn((variables, token) => {
  logger.log(variables, token);
  return new Promise((res) => res({ data: "ok" }));
});

const fetcherFail = jest.fn(() => {
  return new Promise((res) =>
    res({ data: { errors: [{ type: "RATE_LIMITED" }] } }),
  );
});

const fetcherFailOnSecondTry = jest.fn((_vars, _token, retries) => {
  return new Promise((res) => {
    // faking rate limit
    // @ts-ignore
    if (retries < 1) {
      return res({ data: { errors: [{ type: "RATE_LIMITED" }] } });
    }
    return res({ data: "ok" });
  });
});

const fetcherFailWithMessageBasedRateLimitErr = jest.fn(
  (_vars, _token, retries) => {
    return new Promise((res) => {
      // faking rate limit
      // @ts-ignore
      if (retries < 1) {
        return res({
          data: {
            errors: [
              {
                type: "ASDF",
                message: "API rate limit already exceeded for user ID 11111111",
              },
            ],
          },
        });
      }
      return res({ data: "ok" });
    });
  },
);

describe("Test Retryer", () => {
  it("retryer should return value and have zero retries on first try", async () => {
    let res = await retryer(fetcher, {});

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(res).toStrictEqual({ data: "ok" });
  });

  it("retryer should return value and have 2 retries", async () => {
    let res = await retryer(fetcherFailOnSecondTry, {});

    expect(fetcherFailOnSecondTry).toHaveBeenCalledTimes(2);
    expect(res).toStrictEqual({ data: "ok" });
  });

  it("retryer should return value and have 2 retries with message based rate limit error", async () => {
    let res = await retryer(fetcherFailWithMessageBasedRateLimitErr, {});

    expect(fetcherFailWithMessageBasedRateLimitErr).toHaveBeenCalledTimes(2);
    expect(res).toStrictEqual({ data: "ok" });
  });

  it("retryer should throw specific error if maximum retries reached", async () => {
    try {
      await retryer(fetcherFail, {});
    } catch (err) {
      expect(fetcherFail).toHaveBeenCalledTimes(RETRIES + 1);
      // @ts-ignore
      expect(err.message).toBe("Downtime due to GitHub API rate limiting");
    }
  });
});
