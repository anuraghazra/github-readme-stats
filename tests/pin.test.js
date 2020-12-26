require("@testing-library/jest-dom");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const pin = require("../api/pin");
const renderRepoCard = require("../src/cards/repo-card");
const { renderError } = require("../src/common/utils");

const data_repo = {
  repository: {
    username: "anuraghazra",
    name: "convoychat",
    stargazers: { totalCount: 38000 },
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

const faker = (query, data) => {
  const req = {
    query: {
      username: "anuraghazra",
      repo: "convoychat",
      ...query,
    },
  };
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
  };
  mock.onPost("https://api.github.com/graphql").reply(200, data);
  return { req, res };
};

afterEach(() => {
  mock.reset();
});

describe("Test /api/pin", () => {
  it("should test the request", async () => {
    const { req, res } = faker({}, data_user);

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderRepoCard(data_repo.repository));
  });

  it("should get the query options", async () => {
    const { req, res } = faker(
      {
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
        full_name: "1",
      },
      data_user,
    );

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderRepoCard(data_repo.repository, { ...req.query }),
    );
  });

  it("should render error card if user repo not found", async () => {
    const { req, res } = faker(
      {},
      { data: { user: { repository: null }, organization: null } },
    );

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderError("User Repository Not found"));
  });

  it("should render error card if org repo not found", async () => {
    const { req, res } = faker(
      {},
      { data: { user: null, organization: { repository: null } } },
    );

    await pin(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderError("Organization Repository Not found"),
    );
  });

  it("should handle response_type", async () => {
    {
      const { req, res } = faker({ response_type: "svg" }, data_user);
      await pin(req, res);
      expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
      expect(res.send).toBeCalledWith(renderRepoCard(data_repo.repository, {}));
    }

    {
      const { req, res } = faker({ response_type: "json" }, data_user);
      await pin(req, res);
      expect(res.setHeader).toBeCalledWith("Content-Type", "application/json");
      expect(JSON.parse(res.send.mock.calls[0][0])).toStrictEqual(
        data_repo.repository,
      );
    }

    // {
    //   const { Parser } = require("xml2js");
    //   const { parseStringPromise } = new Parser();
    //   const { req, res } = faker({ response_type: "xml" }, data_user);
    //   await api(req, res);
    //   const { root } = await parseStringPromise(res.send.mock.calls[0][0]);
    //   expect(res.setHeader).toBeCalledWith("Content-Type", "application/xml");
    //   expect(
    //     root,
    //   ).toStrictEqual(data_repo.repository);
    // }

    {
      const { req, res } = faker(
        { response_type: "jsonp", callback: "pin" },
        data_user,
      );
      await pin(req, res);
      expect(res.setHeader).toBeCalledWith(
        "Content-Type",
        "application/javascript",
      );
      expect(
        JSON.parse(res.send.mock.calls[0][0].match(/^pin\((.*)\)$/)[1]),
      ).toStrictEqual(data_repo.repository);
    }

    {
      const { safeLoad } = require("js-yaml");
      const { req, res } = faker({ response_type: "yaml" }, data_user);
      await pin(req, res);
      const parsed = safeLoad(res.send.mock.calls[0][0]);
      expect(res.setHeader).toBeCalledWith(
        "Content-Type",
        "application/x-yaml",
      );
      expect(parsed).toStrictEqual(data_repo.repository);
    }
  });
});
