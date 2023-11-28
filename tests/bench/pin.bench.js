import { benchmarkSuite } from "jest-bench";
import pin from "../../api/pin.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { jest } from "@jest/globals";

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
mock.onPost("https://api.github.com/graphql").reply(200, data_user);

benchmarkSuite("test /api/pin", {
  ["simple request"]: async () => {
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

    await pin(req, res);
  },
});
