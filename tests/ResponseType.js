module.exports = async ({ faker, api, data, renderCard }) => {
  {
    const { req, res } = faker({ response_type: "svg" });
    await api(req, res);
    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(renderCard(data, {}));
  }

  {
    const { req, res } = faker({ response_type: "json" });
    await api(req, res);
    expect(res.setHeader).toBeCalledWith("Content-Type", "application/json");
    expect(JSON.parse(res.send.mock.calls[0][0])).toStrictEqual(data);
  }

  {
    const { Parser, Builder } = require("xml2js");
    const parser = new Parser();
    const builder = new Builder();
    const { req, res } = faker({ response_type: "xml" });
    await api(req, res);
    expect(res.setHeader).toBeCalledWith("Content-Type", "application/xml");
    expect(
      await parser.parseStringPromise(res.send.mock.calls[0][0]),
    ).toStrictEqual(await parser.parseStringPromise(builder.buildObject(data)));
  }

  {
    const { req, res } = faker({ response_type: "jsonp", callback: "data" });
    await api(req, res);
    expect(res.setHeader).toBeCalledWith(
      "Content-Type",
      "application/javascript",
    );
    expect(
      JSON.parse(res.send.mock.calls[0][0].match(/^data\((.*)\)$/)[1]),
    ).toStrictEqual(data);
  }

  {
    const { safeLoad } = require("js-yaml");
    const { req, res } = faker({ response_type: "yaml" });
    await api(req, res);
    const parsed = safeLoad(res.send.mock.calls[0][0]);
    expect(res.setHeader).toBeCalledWith("Content-Type", "application/x-yaml");
    expect(parsed).toStrictEqual(data);
  }
};
