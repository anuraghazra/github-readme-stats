import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchWakatimeStats } from "../src/fetchers/wakatime-fetcher.js";
const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const wakaTimeUserData = {
  data: {
    id: "aa437823-82d1-4b37-9b84-ab4ed89c8688",
    user_id: "c7e2e900-858b-400e-bc1c-016345cf59b6",
    range: "all_time",
    timeout: 15,
    writes_only: false,
    holidays: 134,
    status: "ok",
    is_up_to_date: true,
    days_minus_holidays: 231,
    days_including_holidays: 365,
    percent_calculated: 100,
    human_readable_total: "691 hrs 5 mins",
    is_already_updating: false,
    is_stuck: false,
    total_seconds_including_other_language: 2508467.924346,
    is_up_to_date_pending_future: false,
    total_seconds: 2487938.453846,
    human_readable_daily_average: "2 hrs 59 mins",
    human_readable_total_including_other_language: "696 hrs 47 mins",
    daily_average_including_other_language: 10859.0,
    daily_average: 10770.0,
    human_readable_daily_average_including_other_language: "3 hrs",
    username: "rickstaa",
    is_including_today: false,
    human_readable_range: "last year",
    is_coding_activity_visible: true,
    is_other_usage_visible: false,
  },
};
const wakaTimeData = {
  data: {
    categories: [
      {
        digital: "22:40",
        hours: 22,
        minutes: 40,
        name: "Coding",
        percent: 100,
        text: "22 hrs 40 mins",
        total_seconds: 81643.570077,
      },
    ],
    daily_average: 16095,
    daily_average_including_other_language: 16329,
    days_including_holidays: 7,
    days_minus_holidays: 5,
    editors: [
      {
        digital: "22:40",
        hours: 22,
        minutes: 40,
        name: "VS Code",
        percent: 100,
        text: "22 hrs 40 mins",
        total_seconds: 81643.570077,
      },
    ],
    holidays: 2,
    human_readable_daily_average: "4 hrs 28 mins",
    human_readable_daily_average_including_other_language: "4 hrs 32 mins",
    human_readable_total: "22 hrs 21 mins",
    human_readable_total_including_other_language: "22 hrs 40 mins",
    id: "random hash",
    is_already_updating: false,
    is_coding_activity_visible: true,
    is_including_today: false,
    is_other_usage_visible: true,
    is_stuck: false,
    is_up_to_date: true,
    languages: [
      {
        digital: "0:19",
        hours: 0,
        minutes: 19,
        name: "Other",
        percent: 1.43,
        text: "19 mins",
        total_seconds: 1170.434361,
      },
      {
        digital: "0:01",
        hours: 0,
        minutes: 1,
        name: "TypeScript",
        percent: 0.1,
        text: "1 min",
        total_seconds: 83.293809,
      },
      {
        digital: "0:00",
        hours: 0,
        minutes: 0,
        name: "YAML",
        percent: 0.07,
        text: "0 secs",
        total_seconds: 54.975151,
      },
    ],
    operating_systems: [
      {
        digital: "22:40",
        hours: 22,
        minutes: 40,
        name: "Mac",
        percent: 100,
        text: "22 hrs 40 mins",
        total_seconds: 81643.570077,
      },
    ],
    percent_calculated: 100,
    range: "last_7_days",
    status: "ok",
    timeout: 15,
    total_seconds: 80473.135716,
    total_seconds_including_other_language: 81643.570077,
    user_id: "random hash",
    username: "anuraghazra",
    writes_only: false,
  },
};

describe("Wakatime fetcher", () => {
  it("should fetch correct wakatime data", async () => {
    const username = "anuraghazra";
    mock
      .onGet(`https://wakatime.com/api/v1/users/${username}/stats`)
      .reply(200, wakaTimeUserData);
    mock
      .onGet(
        `https://wakatime.com/api/v1/users/${username}/stats/all_time?is_including_today=true`,
      )
      .reply(200, wakaTimeData);

    const repo = await fetchWakatimeStats({ username });
    expect(repo).toMatchInlineSnapshot(`
      {
        "categories": [
          {
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
        "editors": [
          {
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
        "languages": [
          {
            "digital": "0:19",
            "hours": 0,
            "minutes": 19,
            "name": "Other",
            "percent": 1.43,
            "text": "19 mins",
            "total_seconds": 1170.434361,
          },
          {
            "digital": "0:01",
            "hours": 0,
            "minutes": 1,
            "name": "TypeScript",
            "percent": 0.1,
            "text": "1 min",
            "total_seconds": 83.293809,
          },
          {
            "digital": "0:00",
            "hours": 0,
            "minutes": 0,
            "name": "YAML",
            "percent": 0.07,
            "text": "0 secs",
            "total_seconds": 54.975151,
          },
        ],
        "operating_systems": [
          {
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
  });

  it("should throw error", async () => {
    mock.onGet(/\/https:\/\/wakatime\.com\/api/).reply(404, wakaTimeData);

    await expect(fetchWakatimeStats("noone")).rejects.toThrow(
      'Missing params "username" make sure you pass the parameters in URL',
    );
  });
});

export { wakaTimeData };
