/**
 * @file Tests for the status/pat-info cloud function.
 */
import dotenv from "dotenv";
dotenv.config();

import { jest } from "@jest/globals";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import patInfo, { RATE_LIMIT_SECONDS } from "../api/status/pat-info.js";

const mock = new MockAdapter(axios);

const successData = {
  rateLimit: {
    remaining: 4986,
  },
};

const faker = (query) => {
  const req = {
    query: { ...query },
  };
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
  };

  return { req, res };
};

const rate_limit_error = {
  errors: [
    {
      type: "RATE_LIMITED",
    },
  ],
};

const other_error = {
  errors: [
    {
      type: "SOME_ERROR",
      message: "This is a error",
    },
  ],
};

const bad_credentials_error = {
  message: "Bad credentials",
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/status/pat-info", () => {
  beforeAll(() => {
    process.env.PAT_1 = "testPAT1";
    process.env.PAT_2 = "testPAT2";
    process.env.PAT_3 = "testPAT3";
    process.env.PAT_4 = "testPAT4";
  });

  it("should return only 'validPATs' if all PATs are valid", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, rate_limit_error)
      .onPost("https://api.github.com/graphql")
      .reply(200, successData);

    const { req, res } = faker({}, {});
    await patInfo(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "application/json");
    expect(res.send).toBeCalledWith({
      errorPATs: [],
      expiredPATs: [],
      validPATs: ["PAT_1", "PAT_2", "PAT_3", "PAT_4"],
    });
  });

  it("should return `errorPATs` if a PAT causes an error to be thrown", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, other_error)
      .onPost("https://api.github.com/graphql")
      .reply(200, successData);

    const { req, res } = faker({}, {});
    await patInfo(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "application/json");
    expect(res.send).toBeCalledWith({
      errorPATs: [
        { PAT_1: { type: "SOME_ERROR", message: "This is a error" } },
      ],
      expiredPATs: [],
      validPATs: ["PAT_2", "PAT_3", "PAT_4"],
    });
  });

  it("should return `expiredPaths` if a PAT returns a 'Bad credentials' error", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(404, bad_credentials_error)
      .onPost("https://api.github.com/graphql")
      .reply(200, successData);

    const { req, res } = faker({}, {});
    await patInfo(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "application/json");
    expect(res.send).toBeCalledWith({
      errorPATs: [],
      expiredPATs: ["PAT_1"],
      validPATs: ["PAT_2", "PAT_3", "PAT_4"],
    });
  });

  it("should throw an error if something goes wrong", async () => {
    mock.onPost("https://api.github.com/graphql").networkError();

    const { req, res } = faker({}, {});
    await patInfo(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "application/json");
    expect(res.send).toBeCalledWith("Something went wrong: Network Error");
  });

  it("should have proper cache when no error is thrown", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, successData);

    const { req, res } = faker({}, {});
    await patInfo(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "application/json"],
      ["Cache-Control", `max-age=0, s-maxage=${RATE_LIMIT_SECONDS}`],
    ]);
  });

  it("should have proper cache when error is thrown", async () => {
    mock.onPost("https://api.github.com/graphql").networkError();

    const { req, res } = faker({}, {});
    await patInfo(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "application/json"],
      ["Cache-Control", "no-store"],
    ]);
  });
});
