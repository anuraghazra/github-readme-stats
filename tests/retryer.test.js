require("@testing-library/jest-dom");
const retryer = require("../src/common/retryer");
const { logger } = require("../src/common/utils");

const fetcher = jest.fn((variables, token) => {
  logger.log(variables, token);
  return new Promise((res, rej) => res({ data: "ok" }));
});

const fetcherFail = jest.fn(() => {
  return new Promise((res, rej) =>
    res({ data: { errors: [{ type: "RATE_LIMITED" }] } }),
  );
});

const fetcherFailOnSecondTry = jest.fn((_vars, _token, query, retries) => {
  return new Promise((res, rej) => {
    // faking rate limit
    if (retries < 1) {
      return res({ data: { errors: [{ type: "RATE_LIMITED" }] } });
    }
    return res({ data: "ok" });
  });
});

describe("Test Retryer", () => {
  it("retryer should return value and have zero retries on first try", async () => {
    let res = await retryer(fetcher, {}, "");

    expect(fetcher).toBeCalledTimes(1);
    expect(res).toStrictEqual({ data: "ok" });
  });

  it("retryer should return value and have 2 retries", async () => {
    let res = await retryer(fetcherFailOnSecondTry, {}, "");

    expect(fetcherFailOnSecondTry).toBeCalledTimes(2);
    expect(res).toStrictEqual({ data: "ok" });
  });

  it("retryer should throw error if maximum retries reached", async () => {
    let res;

    try {
      res = await retryer(fetcherFail, {}, "");
    } catch (err) {
      expect(fetcherFail).toBeCalledTimes(8);
      expect(err.message).toBe("Maximum retries exceeded");
    }
  });
});
