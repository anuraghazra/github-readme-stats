require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const topTopics = require("../api/top-topics");
const renderTopTopics = require("../src/cards/top-topics-card");
const { renderError } = require("../src/common/utils");

const data_topics = {
  data: {
    user: {
      repositories: {
        nodes: [
          {
            repositoryTopics: {
              edges: [],
            },
          },
          {
            repositoryTopics: {
              edges: [
                { node: { topic: { name: "physics-engine" } } },
              ],
            },
          },
          {
            repositoryTopics: {
              edges: [
                { node: { topic: { name: "javascript-library" } } },
                { node: { topic: { name: "physics-engine" } } },
              ],
            },
          },
          {
            repositoryTopics: {
              edges: [
                { node: { topic: { name: "javascript-library" } } },
              ],
            },
          },
          {
            repositoryTopics: {
              edges: [
                { node: { topic: { name: "react" } } },
              ],
            },
          },
          {
            repositoryTopics: {
              edges: [
                { node: { topic: { name: "javascript-library" } } },
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

const topics = {
  "javascript-library": {
    name: "javascript-library",
    count: 3,
  },
  "physics-engine": {
    name: "physics-engine",
    count: 2,
  },
  "react": {
    name: "react",
    count: 1,
  },
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test /api/top-topics", () => {
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
    mock.onPost("https://api.github.com/graphql").reply(200, data_topics);

    await topTopics(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderTopTopics(topics));
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
    mock.onPost("https://api.github.com/graphql").reply(200, data_topics);

    await topTopics(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderTopTopics(topics, {
        hide_title: true,
        card_width: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      })
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

    await topTopics(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderError(error.errors[0].message));
  });
});
