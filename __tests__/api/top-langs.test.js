import "@testing-library/jest-dom";
import renderToString from "preact-render-to-string";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import topLangsApi from "../../api/top-langs";
import topLangs from "../../src/components/topLangs";
import { renderError } from "../../src/utils";

const data_langs = {
  data: {
    user: {
      repositories: {
        nodes: [
          {
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
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
    size: 200,
  },
  javascript: {
    color: "#0ff",
    name: "javascript",
    size: 200,
  },
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test /api/top-langs", () => {
  it("should test the request", async () => {
    const req = {
      query: {
        username: "anuraghazra",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    await topLangsApi(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderToString(topLangs(langs)));
  });

  it("should work with the query options", async () => {
    const req = {
      query: {
        username: "anuraghazra",
        hide_title: true,
        card_width: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    await topLangsApi(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderToString(
        topLangs(langs, {
          hide_title: true,
          card_width: 100,
          title_color: "fff",
          icon_color: "fff",
          text_color: "fff",
          bg_color: "fff",
        })
      )
    );
  });

  it("should render error card on error", async () => {
    const req = {
      query: {
        username: "anuraghazra",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await topLangsApi(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderToString(renderError(error.errors[0].message))
    );
  });
});
