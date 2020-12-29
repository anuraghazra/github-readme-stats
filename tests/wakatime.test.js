require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const wakatime = require("../api/wakatime");
const renderWakatimeCard = require("../src/cards/wakatime-card");
const { renderError } = require("../src/common/utils");

const wakatimeData = {
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

const mock = new MockAdapter(axios);

const faker = (query, data, status = 200) => {
  const req = {
    query: {
      username: "anuraghazra",
      ...query,
    },
  };
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
  };
  mock
    .onGet(
      `https://wakatime.com/api/v1/users/${req.query.username}/stats/last_7_days?is_including_today=true`,
    )
    .reply(status, data);
  return { req, res };
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/wakatime", () => {
  it("should test the request", async () => {
    const { req, res } = faker({}, wakatimeData);

    await wakatime(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderWakatimeCard(wakatimeData.data, {}));
  });

  it("should get the query options", async () => {
    const { req, res } = faker(
      {
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      },
      wakatimeData,
    );

    await wakatime(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderWakatimeCard(wakatimeData.data, { ...req.query }),
    );
  });

  it("should render error card if wakatime user not found", async () => {
    const { req, res } = faker({}, { error: "Not found." }, 404);

    await wakatime(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderError(
        "Wakatime user not found, make sure you have a wakatime profile",
      ),
    );
  });

  it("should handle response_type", async () => {
    const TestResponseType = require("./ResponseType");
    await TestResponseType({
      faker: (query) => faker(query, wakatimeData),
      api: wakatime,
      data: wakatimeData.data,
      renderCard: renderWakatimeCard,
    });
  });
});
