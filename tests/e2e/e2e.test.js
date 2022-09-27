/**
 * @file Contains end-to-end tests for the vercel preview instance.
 */
import { describe } from "@jest/globals";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
// Script variables
const REPO = "github-readme-stats";
const USER = "anuraghazra";

describe("Fetch Cards", () => {
  let VERCEL_PREVIEW_URL;

  beforeAll(() => {
    VERCEL_PREVIEW_URL = process.env.VERCEL_PREVIEW_URL;
  });

  test("retrieve stats card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the vercel preview instance is up and running.
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api?username=willianrod`),
    ).resolves.not.toThrow();

    // Get the vercel preview stats card response.
    const serverSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api?username=willianrod`,
    );

    // Check if stats card from deployment matches the stats card from local.
    expect(serverSvg.data).toMatchSnapshot();
  });

  test("retrieve language card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the vercel preview instance is up and running.
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api/top-langs/?username=willianrod`),
    ).resolves.not.toThrow();

    // Get the vercel preview stats card response.
    const serverSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api/top-langs/?username=willianrod`,
    );

    // Check if stats card from deployment matches the stats card from local.
    expect(serverSvg.data).toMatchSnapshot();
  });

  test("retrieve WakaTime card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the vercel preview instance is up and running.
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api/wakatime?username=willianrod`),
    ).resolves.not.toThrow();

    // Get the vercel preview stats card response.
    const serverSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api/wakatime?username=willianrod`,
    );

    // Check if stats card from deployment matches the stats card from local.
    expect(serverSvg.data).toMatchSnapshot();
  });

  test("retrieve repo card", async () => {
    expect(VERCEL_PREVIEW_URL).toBeDefined();

    // Check if the vercel preview instance is up and running.
    await expect(
      axios.get(`${VERCEL_PREVIEW_URL}/api/pin/?username=${USER}&repo=${REPO}`),
    ).resolves.not.toThrow();

    // Get the vercel preview stats card response.
    const serverSvg = await axios.get(
      `${VERCEL_PREVIEW_URL}/api/pin/?username=${USER}&repo=${REPO}`,
    );

    // Check if stats card from deployment matches the stats card from local.
    expect(serverSvg.data).toMatchSnapshot();
  });
});
