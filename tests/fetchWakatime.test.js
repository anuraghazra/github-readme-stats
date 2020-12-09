require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchLast7Days = require("../src/fetchers/wakatime-fetcher");
const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const wakaTimeData = {
  categories: [
    {
      digital: "15:22",
      hours: 15,
      minutes: 22,
      name: "Coding",
      percent: 100,
      text: "15 hrs 22 mins",
      total_seconds: 55362.023335,
    },
  ],
  daily_average: 10444,
  daily_average_including_other_language: 11072,
  days_including_holidays: 7,
  days_minus_holidays: 5,
  editors: [
    {
      digital: "11:07",
      hours: 11,
      minutes: 7,
      name: "IntelliJ",
      percent: 72.36,
      text: "11 hrs 7 mins",
      total_seconds: 40057.758,
    },
    {
      digital: "4:15",
      hours: 4,
      minutes: 15,
      name: "VS Code",
      percent: 27.64,
      text: "4 hrs 15 mins",
      total_seconds: 15304.265335,
    },
  ],
  holidays: 2,
  human_readable_daily_average: "2 hrs 54 mins",
  human_readable_daily_average_including_other_language: "3 hrs 4 mins",
  human_readable_total: "14 hrs 30 mins",
  human_readable_total_including_other_language: "15 hrs 22 mins",
  id: "212b0f14-fd41-4602-a685-cc93c7cc803c",
  is_already_updating: false,
  is_coding_activity_visible: true,
  is_including_today: false,
  is_other_usage_visible: true,
  is_stuck: false,
  is_up_to_date: true,
  languages: [
    {
      digital: "4:11",
      hours: 4,
      minutes: 11,
      name: "Java",
      percent: 27.26,
      text: "4 hrs 11 mins",
      total_seconds: 15089.486,
    },
    {
      digital: "2:20",
      hours: 2,
      minutes: 20,
      name: "Rust",
      percent: 15.27,
      text: "2 hrs 20 mins",
      total_seconds: 8451.63,
    },
    {
      digital: "2:11",
      hours: 2,
      minutes: 11,
      name: "Markdown",
      percent: 14.24,
      text: "2 hrs 11 mins",
      total_seconds: 7881.637282,
    },
    {
      digital: "1:08",
      hours: 1,
      minutes: 8,
      name: "Scala",
      percent: 7.43,
      text: "1 hr 8 mins",
      total_seconds: 4113.482,
    },
    {
      digital: "1:03",
      hours: 1,
      minutes: 3,
      name: "XML",
      percent: 6.87,
      text: "1 hr 3 mins",
      total_seconds: 3805.044,
    },
  ],
  operating_systems: [
    {
      digital: "15:22",
      hours: 15,
      minutes: 22,
      name: "Windows",
      percent: 100,
      text: "15 hrs 22 mins",
      total_seconds: 55362.023335,
    },
  ],
  percent_calculated: 100,
  range: "last_7_days",
  status: "ok",
  timeout: 15,
  total_seconds: 52221.263621,
  total_seconds_including_other_language: 55362.023335,
  user_id: "1bf6aefb-f3f2-4235-a756-8d95f261f481",
  username: "francis",
  writes_only: false,
};

describe("Wakatime fetcher", () => {
  it("should fetch correct wakatime data", async () => {
    const username = "francis";
    mock
      .onGet(
        `https://wakatime.com/api/v1/users/${username}/stats/last_7_days?is_including_today=true`,
      )
      .reply(200, wakaTimeData);

    const repo = await fetchLast7Days(username, 5, "");
    expect(repo).toMatchInlineSnapshot(`undefined`);
  });

  it("should throw error", async () => {
    mock.onGet(/\/https:\/\/wakatime\.com\/api/).reply(404, wakaTimeData);

    await expect(fetchLast7Days("francis", 0, "")).rejects.toThrow(
      "Wakatime user not found, make sure you have a wakatime profile",
    );
  });
});

module.exports = { wakaTimeData };
