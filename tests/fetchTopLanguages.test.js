require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchTopLanguages = require("../src/fetchers/top-languages-fetcher");

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const data_langs = {
  data: {
    user: {
      repositories: {
        nodes: [
          {
            name: "test-repo-1",
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            name: "test-repo-2",
            languages: {
              edges: [{ size: 150, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            name: "test-repo-3",
            languages: {
              edges: [
                { size: 100, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
          {
            name: "test-repo-4",
            languages: {
              edges: [
                { size: 150, node: { color: "#0ff", name: "javascript" } },
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

describe("FetchTopLanguages", () => {
  it("should fetch correct language data", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra");
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        name: "HTML",
        size: 250,
      },
      javascript: {
        color: "#0ff",
        name: "javascript",
        size: 250,
      },
    });
  });

  it("should fetch correct language data while excluding the 'test-repo-1' and 'test-repo-3' repositories", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra", exclude_repo=["test-repo-1", "test-repo-3"], include_repo=[]);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        name: "HTML",
        size: 150,
      },
      javascript: {
        color: "#0ff",
        name: "javascript",
        size: 150,
      },
    });
  });

  it("should fetch correct language data while only including the 'test-repo-1' and 'test-repo-3' repository", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra", exclude_repo=[], include_repo=["test-repo-1", "test-repo-3"]);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        name: "HTML",
        size: 100,
      },
      javascript: {
        color: "#0ff",
        name: "javascript",
        size: 100,
      },
    });
  });

  it("should throw error", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchTopLanguages("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'.",
    );
  });
});
