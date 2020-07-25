import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import topLangs from "../../src/fetch/topLangs";

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
      message: "Could not resolve to a User with the login of 'noname'.",
    },
  ],
};

describe("topLangs", () => {
  it("should fetch correct language data", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await topLangs("anuraghazra");
    expect(repo).toStrictEqual({
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
    });
  });

  it("should throw error", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(topLangs("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'."
    );
  });
});
