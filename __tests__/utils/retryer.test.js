import "@testing-library/jest-dom";
import retryer from "../../src/utils/retryer";
import { logger } from "../../src/utils";

const fetcher = jest.fn((variables, token) => {
  logger.log(variables, token);
  return new Promise((res) => res({ data: "ok" }));
});

const fetcherFail = jest.fn(() => {
  return new Promise((res) =>
    res({ data: { errors: [{ type: "RATE_LIMITED" }] } })
  );
});

const fetcherFailOnSecondTry = jest.fn((_vars, _token, retries) => {
  return new Promise((res) => {
    // faking rate limit
    if (retries < 1) {
      return res({ data: { errors: [{ type: "RATE_LIMITED" }] } });
    }
    return res({ data: "ok" });
  });
});

describe("Test Retryer", () => {
  it("retryer should return value and have zero retries on first try", async () => {
    let res = await retryer(fetcher, {});

    expect(fetcher).toBeCalledTimes(1);
    expect(res).toStrictEqual({ data: "ok" });
  });

  it("retryer should return value and have 2 retries", async () => {
    let res = await retryer(fetcherFailOnSecondTry, {});

    expect(fetcherFailOnSecondTry).toBeCalledTimes(2);
    expect(res).toStrictEqual({ data: "ok" });
  });

  it("retryer should throw error if maximum retries reached", async () => {
    await expect(retryer(fetcherFail, {})).rejects.toThrow(
      /Maximum retries exceeded/
    );
    expect(fetcherFail).toBeCalledTimes(8);
  });
});
