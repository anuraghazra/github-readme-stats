/**
 * @file Tests for the status/up cloud function.
 */

import { afterEach, describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import up, { RATE_LIMIT_SECONDS } from "../api/status/up.js";

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

const bad_credentials_error = {
  message: "Bad credentials",
};

const shields_up = {
  schemaVersion: 1,
  label: "Public Instance",
  isError: true,
  message: "up",
  color: "brightgreen",
};
const shields_down = {
  schemaVersion: 1,
  label: "Public Instance",
  isError: true,
  message: "down",
  color: "red",
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/status/up", () => {
  it("should return `true` if request was successful", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, successData);

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("should return `false` if all PATs are rate limited", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, rate_limit_error);

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(false);
  });

  it("should return JSON `true` if request was successful and type='json'", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, successData);

    const { req, res } = faker({ type: "json" }, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith({ up: true });
  });

  it("should return JSON `false` if all PATs are rate limited and type='json'", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, rate_limit_error);

    const { req, res } = faker({ type: "json" }, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith({ up: false });
  });

  it("should return UP shields.io config if request was successful and type='shields'", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, successData);

    const { req, res } = faker({ type: "shields" }, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(shields_up);
  });

  it("should return DOWN shields.io config if all PATs are rate limited and type='shields'", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, rate_limit_error);

    const { req, res } = faker({ type: "shields" }, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(shields_down);
  });

  it("should return `true` if the first PAT is rate limited but the second PATs works", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, rate_limit_error)
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, successData);

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("should return `true` if the first PAT has 'Bad credentials' but the second PAT works", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .replyOnce(404, bad_credentials_error)
      .onPost("https://api.github.com/graphql")
      .replyOnce(200, successData);

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(true);
  });

  it("should return `false` if all pats have 'Bad credentials'", async () => {
    mock
      .onPost("https://api.github.com/graphql")
      .reply(404, bad_credentials_error);

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(false);
  });

  it("should throw an error if the request fails", async () => {
    mock.onPost("https://api.github.com/graphql").networkError();

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
    expect(res.send).toHaveBeenCalledWith(false);
  });

  it("should have proper cache when no error is thrown", async () => {
    mock.onPost("https://api.github.com/graphql").replyOnce(200, successData);

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "application/json"],
      ["Cache-Control", `max-age=0, s-maxage=${RATE_LIMIT_SECONDS}`],
    ]);
  });

  it("should have proper cache when error is thrown", async () => {
    mock.onPost("https://api.github.com/graphql").networkError();

    const { req, res } = faker({}, {});
    await up(req, res);

    expect(res.setHeader.mock.calls).toEqual([
      ["Content-Type", "application/json"],
      ["Cache-Control", "no-store"],
    ]);
  });
});
