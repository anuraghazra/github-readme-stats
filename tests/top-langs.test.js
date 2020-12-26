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
    {
      const { req, res } = faker({ response_type: "svg" }, data_langs);
      await topLangs(req, res);
      expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
      expect(res.send).toBeCalledWith(renderTopLanguages(langs, {}));
    }

    {
      const { req, res } = faker({ response_type: "json" }, data_langs);
      await topLangs(req, res);
      expect(res.setHeader).toBeCalledWith("Content-Type", "application/json");
      expect(JSON.parse(res.send.mock.calls[0][0])).toStrictEqual(langs);
    }

    // {
    //   const { Parser } = require("xml2js");
    //   const { parseStringPromise } = new Parser();
    //   const { req, res } = faker({ response_type: "xml" }, data_langs);
    //   await api(req, res);
    //   const { root } = await parseStringPromise(res.send.mock.calls[0][0]);
    //   expect(res.setHeader).toBeCalledWith("Content-Type", "application/xml");
    //   expect(
    //     root,
    //   ).toStrictEqual(langs);
    // }

    {
      const { req, res } = faker(
        { response_type: "jsonp", callback: "topLangs" },
        data_langs,
      );
      await topLangs(req, res);
      expect(res.setHeader).toBeCalledWith(
        "Content-Type",
        "application/javascript",
      );
      expect(
        JSON.parse(res.send.mock.calls[0][0].match(/^topLangs\((.*)\)$/)[1]),
      ).toStrictEqual(langs);
    }

    {
      const { safeLoad } = require("js-yaml");
      const { req, res } = faker({ response_type: "yaml" }, data_langs);
      await topLangs(req, res);
      const parsed = safeLoad(res.send.mock.calls[0][0]);
      expect(res.setHeader).toBeCalledWith(
        "Content-Type",
        "application/x-yaml",
      );
      expect(parsed).toStrictEqual(langs);
    }
  });
});
