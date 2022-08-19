require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const fetchTopRepos = require("../src/fetchers/top-repos-fetcher");

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const data_repos = {
  data: {
    user: {
      repositories: {
        nodes: [
          {
            name: "test-repo-1",
            forkCount: 1,
            stargazerCount: 2,
          },
          {
            name: "test-repo-2",
            forkCount: 3,
            stargazerCount: 4,
          },
          {
            name: "test-repo-3",
            forkCount: 5,
            stargazerCount: 6,
          },
          {
            name: "test-repo-4",
            forkCount: 7,
            stargazerCount: 8,
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

describe("FetchTopRepos", () => {
  it("should fetch correct repo data sorted by stargazerCount", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_repos);

    let repo = await fetchTopRepos("anuraghazra");
    expect(repo).toStrictEqual([
        {
            name: "test-repo-1",
            forkCount: 1,
            stargazerCount: 2,
        },
        {
            name: "test-repo-2",
            forkCount: 3,
            stargazerCount: 4,
        },
        {
            name: "test-repo-3",
            forkCount: 5,
            stargazerCount: 6,
        },
        {
            name: "test-repo-4",
            forkCount: 7,
            stargazerCount: 8,
        },
    ]);
  });

  it("should fetch correct repo data sorted by forkCount", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_repos);

    let repo = await fetchTopRepos("anuraghazra", sortBy="fork");
    expect(repo).toStrictEqual([
        {
            name: "test-repo-4",
            forkCount: 7,
            stargazerCount: 8,
        },
        {
            name: "test-repo-3",
            forkCount: 5,
            stargazerCount: 6,
        },
        {
            name: "test-repo-2",
            forkCount: 3,
            stargazerCount: 4,
        },
        {
            name: "test-repo-1",
            forkCount: 1,
            stargazerCount: 2,
        },
    ]);
  });

  it("should fetch correct repo data while excluding the 'test-repo-1' repository", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_repos);

    let repo = await fetchTopRepos("anuraghazra", sortBy="star", exclude_repo=["test-repo-1"]);
    expect(repo).toStrictEqual([
        {
            name: "test-repo-2",
            forkCount: 3,
            stargazerCount: 4,
        },
        {
            name: "test-repo-3",
            forkCount: 5,
            stargazerCount: 6,
        },
        {
            name: "test-repo-4",
            forkCount: 7,
            stargazerCount: 8,
        },
    ]);
  });

  it("should fetch correct repo data while excluding multiple repositories", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_repos);

    let repo = await fetchTopRepos("anuraghazra", sortBy="fork", exclude_repo=["test-repo-1", "test-repo-4"]);
    expect(repo).toStrictEqual([
        {
            name: "test-repo-3",
            forkCount: 5,
            stargazerCount: 6,
        },
        {
            name: "test-repo-2",
            forkCount: 3,
            stargazerCount: 4,
        },
    ]);
  });

  it("should throw error", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, error);

    await expect(fetchTopRepos("anuraghazra")).rejects.toThrow(
      "Could not resolve to a User with the login of 'noname'.",
    );
  });
});
