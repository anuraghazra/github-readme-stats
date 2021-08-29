import "@testing-library/jest-dom";
import { calculateRank, retry } from "../src/utils/github";
import { logger } from "../src/utils/debug";

describe("Test Github Utils", () => {
  describe("Test calculateRank", () => {
    it("should calculate rank correctly", () => {
      expect(
        calculateRank({
          totalCommits: 100,
          totalRepos: 5,
          followers: 100,
          contributions: 61,
          stargazers: 400,
          prs: 300,
          issues: 200,
        }),
      ).toStrictEqual({ level: "A+", score: 49.16605417270399 });
    });
  });

  describe("Test Retry", () => {
    it("retry should return value and have zero retries on first try", async () => {
      const fetcher = jest.fn((variables, token) => {
        logger.log(variables, token);
        return Promise.resolve({ data: "ok" });
      });

      let res = await retry(fetcher, {});

      expect(fetcher).toBeCalledTimes(1);
      expect(res).toStrictEqual({ data: "ok" });
    });

    it("retry should return value and have 2 retries", async () => {
      const fetcherFailOnSecondTry = jest
        .fn()
        .mockReturnValueOnce(
          Promise.resolve({ data: { errors: [{ type: "RATE_LIMITED" }] } }),
        )
        .mockReturnValueOnce(Promise.resolve({ data: "ok" }));
      let res = await retry(fetcherFailOnSecondTry, {});

      expect(fetcherFailOnSecondTry).toBeCalledTimes(2);
      expect(res).toStrictEqual({ data: "ok" });
    });

    it("retry should throw error if maximum retries reached", async () => {
      const fetcher = jest.fn().mockReturnValue(
        Promise.resolve({
          data: { errors: [{ type: "RATE_LIMITED" }] },
        }),
      );
      try {
        res = await retry(fetcher, {});
      } catch (err) {
        expect(fetcher).toBeCalledTimes(8);
        expect(err.message).toBe("Something wrong with fetch data");
        expect(err.secondaryMessage).toBe(
          "Please add an env variable called PAT_1 with your github token in vercel",
        );
      }
    });

    it("should retry when bad credentials", async () => {
      const fetcher = jest
        .fn()
        .mockReturnValueOnce(
          Promise.reject({
            response: {
              data: { message: "Bad credentials" },
            },
          }),
        )
        .mockReturnValueOnce(Promise.resolve({ data: "ok" }));
      const res = await retry(fetcher, {});
      expect(fetcher).toBeCalledTimes(2);
      expect(res).toStrictEqual({ data: "ok" });
    });
  });
});
