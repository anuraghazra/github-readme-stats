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
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
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
        size: 200,
        url: "https://github.com/search?l=HTML&amp;q=user%3Aanuraghazra&amp;type=code",
      },
      javascript: {
        color: "#0ff",
        name: "javascript",
        size: 200,
        url: "https://github.com/search?l=javascript&amp;q=user%3Aanuraghazra&amp;type=code",
      },
    });
  });

  it("should fetch correct language data while excluding the 'test-repo-1' repository", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra", exclude_repo=["test-repo-1"]);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        name: "HTML",
        size: 100,
        url: "https://github.com/search?l=HTML&amp;q=user%3Aanuraghazra&amp;type=code",
      },
      javascript: {
        color: "#0ff",
        name: "javascript",
        size: 200,
        url: "https://github.com/search?l=javascript&amp;q=user%3Aanuraghazra&amp;type=code",
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
