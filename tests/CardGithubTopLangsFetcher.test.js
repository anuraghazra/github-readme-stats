import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fetchTopLanguages from "../src/cards/github-top-langs/fetcher";
import { CardError } from "../src/helpers/Error";
import { genUserNotFoundErrorData } from "./utils/mock";

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

describe("FetchTopLanguages", () => {
  it("should fetch correct language data", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_langs);

    let repo = await fetchTopLanguages("anuraghazra");
    expect(repo).toStrictEqual([
      {
        color: "#0f0",
        name: "HTML",
        size: 200,
      },
      {
        color: "#0ff",
        name: "javascript",
        size: 200,
      },
    ]);
  });

  it("should throw error", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .reply(200, genUserNotFoundErrorData());

    await expect(fetchTopLanguages("anuraghazra")).rejects.toThrow(
      new CardError(
        "Something wrong with fetch data",
        "Could not resolve to a User with the login of 'noname'.",
      ),
    );
  });
});
