import "@testing-library/jest-dom";
import { fetchWakaTime } from "../src/cards/wakatime";
import { CardError } from "../src/helpers/Error";
import {
  genWakatimeMockData,
  mockWakaTimeErrorRequest,
  mockWakaTimeRequest,
} from "./utils/mock";

describe("Wakatime fetcher", () => {
  it("should fetch correct wakatime data", async () => {
    const username = "anuraghazra";
    const mockRestore = mockWakaTimeRequest(genWakatimeMockData());
    const repo = await fetchWakaTime(username);
    expect(repo).toMatchInlineSnapshot(`
      Object {
        "categories": Array [
          Object {
            "digital": "22:40",
            "hours": 22,
            "minutes": 40,
            "name": "Coding",
            "percent": 100,
            "text": "22 hrs 40 mins",
            "total_seconds": 81643.570077,
          },
        ],
        "daily_average": 16095,
        "daily_average_including_other_language": 16329,
        "days_including_holidays": 7,
        "days_minus_holidays": 5,
        "editors": Array [
          Object {
            "digital": "22:40",
            "hours": 22,
            "minutes": 40,
            "name": "VS Code",
            "percent": 100,
            "text": "22 hrs 40 mins",
            "total_seconds": 81643.570077,
          },
        ],
        "holidays": 2,
        "human_readable_daily_average": "4 hrs 28 mins",
        "human_readable_daily_average_including_other_language": "4 hrs 32 mins",
        "human_readable_total": "22 hrs 21 mins",
        "human_readable_total_including_other_language": "22 hrs 40 mins",
        "id": "random hash",
        "is_already_updating": false,
        "is_coding_activity_visible": true,
        "is_including_today": false,
        "is_other_usage_visible": true,
        "is_stuck": false,
        "is_up_to_date": true,
        "languages": Array [
          Object {
            "digital": "0:19",
            "hours": 0,
            "minutes": 19,
            "name": "Other",
            "percent": 1.43,
            "text": "19 mins",
            "total_seconds": 1170.434361,
          },
          Object {
            "digital": "0:01",
            "hours": 0,
            "minutes": 1,
            "name": "TypeScript",
            "percent": 0.1,
            "text": "1 min",
            "total_seconds": 83.293809,
          },
          Object {
            "digital": "0:00",
            "hours": 0,
            "minutes": 0,
            "name": "YAML",
            "percent": 0.07,
            "text": "0 secs",
            "total_seconds": 54.975151,
          },
        ],
        "operating_systems": Array [
          Object {
            "digital": "22:40",
            "hours": 22,
            "minutes": 40,
            "name": "Mac",
            "percent": 100,
            "text": "22 hrs 40 mins",
            "total_seconds": 81643.570077,
          },
        ],
        "percent_calculated": 100,
        "range": "last_7_days",
        "status": "ok",
        "timeout": 15,
        "total_seconds": 80473.135716,
        "total_seconds_including_other_language": 81643.570077,
        "user_id": "random hash",
        "username": "anuraghazra",
        "writes_only": false,
      }
    `);

    mockRestore();
  });

  it("should throw error", async () => {
    const mockRestore = mockWakaTimeErrorRequest(404, {});
    await expect(fetchWakaTime("noone")).rejects.toThrow(
      new CardError(
        "Something wrong with fetch data",
        "Wakatime user not found, make sure you have a wakatime profile",
      ),
    );
    mockRestore();
  });
});
