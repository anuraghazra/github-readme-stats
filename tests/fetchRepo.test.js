import { afterEach, describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchRepo } from "../src/fetchers/repo.js";

const data_repo = {
  repository: {
    name: "convoychat",
    createdAt: "2020-01-01T00:00:00Z",
    pushedAt: "2020-01-02T00:00:00Z",
    stargazers: { totalCount: 38000 },
    issues: { totalCount: 12 },
    pullRequests: { totalCount: 3 },
    defaultBranchRef: {
      name: "main",
      target: {
        history: {
          nodes: [{ committedDate: "2019-12-01T00:00:00Z" }],
        },
      },
    },
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
  it("should fetch repository for user owner", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_user);

    let repo = await fetchRepo("anuraghazra", "convoychat");

    expect(repo).toStrictEqual({
      ...data_repo.repository,
      starCount: data_repo.repository.stargazers.totalCount,
      openIssuesCount: data_repo.repository.issues.totalCount,
      openPrsCount: data_repo.repository.pullRequests.totalCount,
      createdAt: data_repo.repository.createdAt,
      pushedAt: data_repo.repository.pushedAt,
      firstCommitDate: data_repo.repository.createdAt,
    });
  });

  it("should fetch repository for organization owner", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, data_org);

    let repo = await fetchRepo("anuraghazra", "convoychat");

    expect(repo).toStrictEqual({
      ...data_repo.repository,
      starCount: data_repo.repository.stargazers.totalCount,
      openIssuesCount: data_repo.repository.issues.totalCount,
      openPrsCount: data_repo.repository.pullRequests.totalCount,
      createdAt: data_repo.repository.createdAt,
      pushedAt: data_repo.repository.pushedAt,
      firstCommitDate: data_repo.repository.createdAt,
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

  it("should throw error if repo is null", async () => {
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
        user: {
          repository: { ...data_repo.repository, isPrivate: true },
        },
        organization: null,
      },
    });

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "User Repository Not found",
    );
  });
});
