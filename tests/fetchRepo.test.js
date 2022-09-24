import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fetchRepo from "../src/fetchers/repo-fetcher.js";

const data_repo = {
  repository: {
    name: "convoychat",
    stargazers: { totalCount: 38000 },
    description: "Help us take over the world! React + TS + GraphQL Chat App",
    primaryLanguage: {
      color: "#2b7489",
      id: "MDg6TGFuZ3VhZ2UyODc=",
      name: "TypeScript",
    },
    forkCount: 100,
  },
};

const data_user = {
  data: {
    user: { repository: data_repo.repository },
    organization: null,
  },
};
const data_org = {
  data: {
    user: null,
    organization: { repository: data_repo.repository },
  },
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test fetchRepo", () => {
  it("should fetch correct user repo", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_user);

    let repo = await fetchRepo("anuraghazra", "convoychat");

    expect(repo).toStrictEqual({
      ...data_repo.repository,
      starCount: data_repo.repository.stargazers.totalCount,
    });
  });

  it("should fetch correct org repo", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_org);

    let repo = await fetchRepo("anuraghazra", "convoychat");
    expect(repo).toStrictEqual({
      ...data_repo.repository,
      starCount: data_repo.repository.stargazers.totalCount,
    });
  });

  it("should throw error if user is found but repo is null", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .reply(200, { data: { user: { repository: null }, organization: null } });

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "User Repository Not found",
    );
  });

  it("should throw error if org is found but repo is null", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .reply(200, { data: { user: null, organization: { repository: null } } });

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "Organization Repository Not found",
    );
  });

  it("should throw error if both user & org data not found", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .reply(200, { data: { user: null, organization: null } });

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "Not found",
    );
  });

  it("should throw error if repository is private", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, {
      data: {
        user: { repository: { ...data_repo, isPrivate: true } },
        organization: null,
      },
    });

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "User Repository Not found",
    );
  });
});
