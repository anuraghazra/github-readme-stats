require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const topLangs = require("../api/top-langs");
const renderTopLanguages = require("../src/cards/top-languages-card");
const { renderError } = require("../src/common/utils");

const data_langs = {
  data: {
    user: {
      repositories: {
        nodes: [
          {
            languages: {
              edges: [{ size: 150, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            languages: {
              edges: [
                { size: 100, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
          {
            languages: {
              edges: [
                { size: 100, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
        ],
      },
    },
  },
};

const error = {
  errors: [
    {
      type: "NOT_FOUND",
      path: ["user"],
      locations: [],
      message: "Could not fetch user",
    },
  ],
};

const langs = {
  HTML: {
    color: "#0f0",
    name: "HTML",
    size: 250,
  },
  javascript: {
    color: "#0ff",
    name: "javascript",
    size: 200,
  },
};

const mock = new MockAdapter(axios);

const faker = (query, data) => {
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
  mock.onPost("https://api.github.com/graphql").reply(200, data);
  return { req, res };
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/top-langs", () => {
  it("should test the request", async () => {
    const { req, res } = faker({}, data_langs);

    await topLangs(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderTopLanguages(langs));
  });

  it("should work with the query options", async () => {
    const { req, res } = faker(
      {
        hide_title: true,
        card_width: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      },
      data_langs,
    );

    await topLangs(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderTopLanguages(langs, {
        hide_title: true,
        card_width: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      }),
    );
  });

  it("should render error card on error", async () => {
    const { req, res } = faker({}, error);

    await topLangs(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderError(error.errors[0].message));
  });

  it("should handle response_type", async () => {
    const TestResponseType = require("./ResponseType");
    await TestResponseType({
      faker: (query) => faker(query, data_langs),
      api: topLangs,
      data: langs,
      renderCard: renderTopLanguages,
    });
  });
});
