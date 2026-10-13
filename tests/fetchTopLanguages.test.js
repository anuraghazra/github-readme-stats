import { afterEach, describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchTopLanguages } from "../src/fetchers/top-languages.js";

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
  it("should count repositories separately for interleaved languages", async () => {
    const nodes = [
      {
        name: "mixed-repo",
        languages: {
          edges: [
            { size: 100, node: { color: "#00ADD8", name: "Go" } },
            { size: 200, node: { color: "#3572A5", name: "Python" } },
          ],
        },
      },
      {
        name: "go-repo",
        languages: {
          edges: [{ size: 50, node: { color: "#00ADD8", name: "Go" } }],
        },
      },
      {
        name: "python-css-repo",
        languages: {
          edges: [
            { size: 100, node: { color: "#3572A5", name: "Python" } },
            { size: 10, node: { color: "#563d7c", name: "CSS" } },
          ],
        },
      },
    ];
    mock.onPost("https://api.github.com/graphql").reply(200, {
      data: { user: { repositories: { nodes } } },
    });

    const languages = await fetchTopLanguages("anuraghazra", [], 1, 1);

    expect(languages).toStrictEqual({
      Python: { color: "#3572A5", count: 2, name: "Python", size: 600 },
      Go: { color: "#00ADD8", count: 2, name: "Go", size: 300 },
      CSS: { color: "#563d7c", count: 1, name: "CSS", size: 10 },
    });
  });

  it("should fetch correct language data while using the new calculation", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra", [], 0.5, 0.5);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 2,
        name: "HTML",
        size: 20.000000000000004,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 20.000000000000004,
      },
    });
  });

  it("should fetch correct language data while excluding the 'test-repo-1' repository", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra", ["test-repo-1"]);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 1,
        name: "HTML",
        size: 100,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 200,
      },
    });
  });

  it("should fetch correct language data while using the old calculation", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra", [], 1, 0);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 2,
        name: "HTML",
        size: 200,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 200,
      },
    });
  });

  it("should rank languages by the number of repositories they appear in", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra", [], 0, 1);
    expect(repo).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 2,
        name: "HTML",
        size: 2,
      },
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 2,
      },
    });
  });

  it("should throw specific error when user not found", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchTopLanguages("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'.",
    );
  });

  it("should throw other errors with their message", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, {
      errors: [{ message: "Some test GraphQL error" }],
    });

    await expect(fetchTopLanguages("anuraghazra")).rejects.toThrow(
      "Some test GraphQL error",
    );
  });

  it("should throw error with specific message when error does not contain message property", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, {
      errors: [{ type: "TEST" }],
    });

    await expect(fetchTopLanguages("anuraghazra")).rejects.toThrow(
      "Something went wrong while trying to retrieve the language data using the GraphQL API.",
    );
  });
});
