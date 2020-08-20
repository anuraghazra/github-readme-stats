require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchTopTopics = require("../src/fetchers/top-topics-fetcher");

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

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
      message: "Could not resolve to a User with the login of 'noname'.",
    },
  ],
};

describe("FetchTopTopics", () => {
  it("should fetch correct topic data", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_topics);

    let repo = await fetchTopTopics("anuraghazra");
    expect(repo).toStrictEqual({
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
    });
  });

  it("should throw error", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchTopTopics("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'."
    );
  });
});
