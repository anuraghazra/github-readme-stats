import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchTopLanguages } from "../src/fetchers/top-languages-fetcher.js";
import { expect, it, describe, afterEach } from "@jest/globals";

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
            isArchived: false,
            isFork: false,
            isPrivate: false,
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            name: "test-repo-2",
            isArchived: false,
            isFork: false,
            isPrivate: false,
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            name: "test-repo-3",
            isArchived: false,
            isFork: false,
            isPrivate: false,
            languages: {
              edges: [
                { size: 100, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
          {
            name: "test-repo-4",
            isArchived: false,
            isFork: false,
            isPrivate: false,
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

  it("should exclude repositories based on internal rules (archived repos)", async () => {
    const data_with_archived = {
      data: {
        user: {
          repositories: {
            nodes: [
              {
                name: "active-repo",
                isArchived: false,
                isFork: false,
                isPrivate: false,
                languages: {
                  edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
                },
              },
              {
                name: "archived-repo",
                isArchived: true,
                isFork: false,
                isPrivate: false,
                languages: {
                  edges: [{ size: 200, node: { color: "#0ff", name: "JavaScript" } }],
                },
              },
            ],
          },
        },
      },
    };

    mock.onPost("https://api.github.com/graphql").reply(200, data_with_archived);
    
    // Set internal config to exclude archived repos
    const { INTERNAL_EXCLUDED_REPOS } = await import("../src/common/excluded-repos.js");
    INTERNAL_EXCLUDED_REPOS.conditions.archived = true;

    const languages = await fetchTopLanguages("anuraghazra");
    
    // Should only include HTML from active-repo, not JavaScript from archived-repo
    expect(languages).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 1,
        name: "HTML",
        size: 100,
      },
    });
    
    // Reset config
    INTERNAL_EXCLUDED_REPOS.conditions.archived = false;
  });

  it("should combine URL exclusions with environment variable exclusions", async () => {
    // Set environment variable
    process.env.EXCLUDED_REPOS = "test-repo-2";
    
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    const languages = await fetchTopLanguages("anuraghazra", ["test-repo-1"]);
    
    // Should exclude both test-repo-1 (URL param) and test-repo-2 (env var)
    // Only test-repo-3 and test-repo-4 should be counted
    expect(languages).toStrictEqual({
      javascript: {
        color: "#0ff",
        count: 2,
        name: "javascript",
        size: 200,
      },
    });
    
    // Clean up
    delete process.env.EXCLUDED_REPOS;
  });

  it("should exclude repositories based on pattern matching", async () => {
    // Set environment variable with pattern
    process.env.EXCLUDED_PATTERNS = "test-repo-[34]";
    
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    const languages = await fetchTopLanguages("anuraghazra");
    
    // Should exclude test-repo-3 and test-repo-4
    // Only test-repo-1 and test-repo-2 should be counted
    expect(languages).toStrictEqual({
      HTML: {
        color: "#0f0",
        count: 2,
        name: "HTML",
        size: 200,
      },
    });
    
    // Clean up
    delete process.env.EXCLUDED_PATTERNS;
  });
});
