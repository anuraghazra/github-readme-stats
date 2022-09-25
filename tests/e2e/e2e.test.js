/**
 * @file Contains end-to-end tests for the vercel preview instance.
 */
import { describe } from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

describe("Fetch Cards", () => {
  let VERCEL_PREVIEW_URL;

  beforeAll(() => {
    VERCEL_PREVIEW_URL = process.env.VERCEL_PREVIEW_URL;
  });

  test("retrieve stats card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api?username=willianrod`),
    ).resolves.not.toThrow();
  });

  test("retrieve language card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api/top-langs/?username=willianrod`),
    ).resolves.not.toThrow();
  });

  test("retrieve WakaTime card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api/wakatime?username=willianrod`),
    ).resolves.not.toThrow();
  });

  test("retrieve repo card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();
    await expect(
      axios.get(
        `${VERCEL_PREVIEW_URL}/api/pin/?username=anuraghazra&repo=github-readme-stats`,
      ),
    ).resolves.not.toThrow();
  });
});
