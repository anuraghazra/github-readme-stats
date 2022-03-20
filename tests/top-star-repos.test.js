require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const topStarRepos = require("../api/top-star-repos");
const renderTopRepos = require("../src/cards/top-repos-card");
const { renderError } = require("../src/common/utils");

const data_repos = {
  data: {
    user: {
      repositories: {
        nodes: [
          {
            name: "test-repo-1",
            forkCount: 10,
            stargazerCount: 9,
          },
          {
            name: "test-repo-2",
            forkCount: 8,
            stargazerCount: 7,
          },
          {
            name: "test-repo-3",
            forkCount: 6,
            stargazerCount: 5,
          },
          {
            name: "test-repo-4",
            forkCount: 4,
            stargazerCount: 3,
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

const repos = [
  {
    name: "test-repo-1",
    forkCount: 10,
    stargazerCount: 9,
  },
  {
    name: "test-repo-2",
    forkCount: 8,
    stargazerCount: 7,
  },
  {
    name: "test-repo-3",
    forkCount: 6,
    stargazerCount: 5,
  },
  {
    name: "test-repo-4",
    forkCount: 4,
    stargazerCount: 3,
  },
];

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test /api/top-star-repos", () => {
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
    mock.onPost("https://api.github.com/graphql").reply(200, data_repos);

    await topStarRepos(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderTopRepos(repos));
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
    mock.onPost("https://api.github.com/graphql").reply(200, data_repos);

    await topStarRepos(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderTopRepos(repos, card_type="star", {
        hide_title: true,
        card_width: 100,
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
      }),
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

    await topStarRepos(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderError(error.errors[0].message));
  });
});
