require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchLast7Days = require("../src/fetchers/wakatime-fetcher");
const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

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
    const username = "francis";
    mock
      .onGet(
        `https://wakatime.com/api/v1/users/${username}/stats/last_7_days?is_including_today=true`,
      )
      .reply(200, wakaTimeData);

    const repo = await fetchLast7Days(username, top = 5, "other,html");
    expect(repo).toMatchInlineSnapshot(`
        categories: [
          {
            digital: '12:47',
            hours: 12,
            minutes: 47,
            name: 'Coding',
            percent: 100,
            text: '12 hrs 47 mins',
            total_seconds: 46058.269465
          }
        ],
        daily_average: 8689,
        daily_average_including_other_language: 9212,
        days_including_holidays: 7,
        days_minus_holidays: 5,
        editors: [
          {
            digital: '9:35',
            hours: 9,
            minutes: 35,
            name: 'IntelliJ',
            percent: 74.94,
            text: '9 hrs 35 mins',
            total_seconds: 34515.262
          },
          {
            digital: '3:12',
            hours: 3,
            minutes: 12,
            name: 'VS Code',
            percent: 25.06,
            text: '3 hrs 12 mins',
            total_seconds: 11543.007465
          }
        ],
        holidays: 2,
        human_readable_daily_average: '2 hrs 24 mins',
        human_readable_daily_average_including_other_language: '2 hrs 33 mins',
        human_readable_total: '12 hrs 4 mins',
        human_readable_total_including_other_language: '12 hrs 47 mins',
        id: '212b0f14-fd41-4602-a685-cc93c7cc803c',
        is_already_updating: false,
        is_coding_activity_visible: true,
        is_including_today: false,
        is_other_usage_visible: true,
        is_stuck: false,
        is_up_to_date: true,
        languages: [
          {
            digital: '3:41',
            hours: 3,
            minutes: 41,
            name: 'Java',
            percent: 28.89,
            text: '3 hrs 41 mins',
            total_seconds: 13306.43
          },
          {
            digital: '2:20',
            hours: 2,
            minutes: 20,
            name: 'Rust',
            percent: 18.35,
            text: '2 hrs 20 mins',
            total_seconds: 8451.63
          },
          {
            digital: '2:10',
            hours: 2,
            minutes: 10,
            name: 'Markdown',
            percent: 16.98,
            text: '2 hrs 10 mins',
            total_seconds: 7819.650704
          },
          {
            digital: '1:01',
            hours: 1,
            minutes: 1,
            name: 'Scala',
            percent: 8.06,
            text: '1 hr 1 min',
            total_seconds: 3711.607
          },
          {
            digital: '0:35',
            hours: 0,
            minutes: 35,
            name: 'TOML',
            percent: 4.6,
            text: '35 mins',
            total_seconds: 2118.856749
          },
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        operating_systems: [
          {
            digital: '12:47',
            hours: 12,
            minutes: 47,
            name: 'Windows',
            percent: 100,
            text: '12 hrs 47 mins',
            total_seconds: 46058.269465
          }
        ],
        percent_calculated: 100,
        range: 'last_7_days',
        status: 'ok',
        timeout: 15,
        total_seconds: 43447.176275,
        total_seconds_including_other_language: 46058.269465,
        user_id: '1bf6aefb-f3f2-4235-a756-8d95f261f481',
        username: 'francis',
        writes_only: false
      }
    `);
  });

  it("should throw error", async () => {
    mock.onGet(/\/https:\/\/wakatime\.com\/api/).reply(404, wakaTimeData);

    await expect(fetchLast7Days("francis", top = 5, "other,html")).rejects.toThrow(
      "Wakatime user not found, make sure you have a wakatime profile",
    );
  });
});

module.exports = { wakaTimeData };
