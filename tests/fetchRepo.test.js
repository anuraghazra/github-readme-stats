import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchRepo } from "../src/fetchers/repo-fetcher.js";
import { expect, it, describe, afterEach } from "@jest/globals";

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

const data_languages = {
  languagesBreakdown: {
    HTML: {
      color: "#0f0",
      name: "HTML",
      size: 200,
      count: 1,
    },
    javascript: {
      color: "#0ff",
      name: "javascript",
      size: 200,
      count: 1,
    },
    css: {
      color: "#ff0",
      name: "css",
      size: 100,
      count: 1,
    },
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

const data_languages_resp = {
  data: {
    repository: {
      languages: {
        edges: [
          { node: { name: "HTML", color: "#0f0" }, size: 200 },
          { node: { name: "javascript", color: "#0ff" }, size: 200 },
          { node: { name: "css", color: "#ff0" }, size: 100 },
        ],
      },
    },
  },
};
const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test fetchRepo", () => {
  it("should fetch correct user repo", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, data_user);
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_languages_resp);

    let repo = await fetchRepo("anuraghazra", "convoychat");

    console.log(repo);
    expect(repo).toStrictEqual({
      ...data_repo.repository,
      languagesBreakdown: data_languages.languagesBreakdown,
      starCount: data_repo.repository.stargazers.totalCount,
    });
  });

  it("should fetch correct org repo", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, data_org);
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_languages_resp);

    let repo = await fetchRepo("anuraghazra", "convoychat");
    expect(repo).toStrictEqual({
      ...data_repo.repository,
      starCount: data_repo.repository.stargazers.totalCount,
      languagesBreakdown: data_languages.languagesBreakdown,
    });
  });

  it("should throw error if user is found but repo is null", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, {
      data: { user: { repository: null }, organization: null },
    });
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_languages_resp);

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "User Repository Not found",
    );
  });

  it("should throw error if org is found but repo is null", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, {
      data: { user: null, organization: { repository: null } },
    });
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_languages_resp);

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "Organization Repository Not found",
    );
  });

  it("should throw error if both user & org data not found", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, { data: { user: null, organization: null } });
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_languages_resp);

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "Not found",
    );
  });

  it("should throw error if repository is private", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, {
      data: {
        user: { repository: { ...data_repo, isPrivate: true } },
        organization: null,
      },
    });
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, data_languages_resp);

    await expect(fetchRepo("anuraghazra", "convoychat")).rejects.toThrow(
      "User Repository Not found",
    );
  });
});
