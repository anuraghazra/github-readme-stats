import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import pin from "../api/pin.js";
import { renderRepoCard } from "../src/cards/repo-card.js";
import { renderError } from "../src/common/utils.js";
import { expect, it, describe, afterEach } from "@jest/globals";

const data_repo = {
  repository: {
    username: "anuraghazra",
    name: "convoychat",
    stargazers: {
      totalCount: 38000,
    },
    description: "Help us take over the world! React + TS + GraphQL Chat App",
    primaryLanguage: {
      color: "#2b7489",
      id: "MDg6TGFuZ3VhZ2UyODc=",
      name: "TypeScript",
    },
    forkCount: 100,
    isTemplate: false,
  },
};

const data_user = {
  data: {
    user: { repository: data_repo.repository },
    organization: null,
  },
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test /api/pin", () => {
  it("should test the request", async () => {
    const req = {
      query: {
        username: "anuraghazra",
        repo: "convoychat",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, data_user);

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderRepoCard({
        ...data_repo.repository,
        starCount: data_repo.repository.stargazers.totalCount,
      }),
    );
  });

  it("should get the query options", async () => {
    const req = {
      query: {
        username: "anuraghazra",
        repo: "convoychat",
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
        full_name: "1",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, data_user);

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderRepoCard(
        {
          ...data_repo.repository,
          starCount: data_repo.repository.stargazers.totalCount,
        },
        { ...req.query },
      ),
    );
  });

  it("should render error card if user repo not found", async () => {
    const req = {
      query: {
        username: "anuraghazra",
        repo: "convoychat",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock
      .onPost("https://api.github.com/graphql")
      .reply(200, { data: { user: { repository: null }, organization: null } });

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderError("User Repository Not found"));
  });

  it("should render error card if org repo not found", async () => {
    const req = {
      query: {
        username: "anuraghazra",
        repo: "convoychat",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock
      .onPost("https://api.github.com/graphql")
      .reply(200, { data: { user: null, organization: { repository: null } } });

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderError("Organization Repository Not found"),
    );
  });

  it("should render error card if username in blacklist", async () => {
    const req = {
      query: {
        username: "renovate-bot",
        repo: "convoychat",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, data_user);

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderError("Something went wrong"));
  });
});
