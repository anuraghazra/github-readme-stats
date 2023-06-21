const dotenv = require("dotenv").config();
const log = require("logger-for-yc-functions")(module);
const { statsCard } = require("./api/statsCard");
const { repoCard } = require("./api/pin.js");
const { langCard } = require("./api/top-langs.js");
const { wakatimeCard } = require("./api/wakatime.js");

//плохой, ошибочный шлюз
const status502 = {
  statusCode: 502,
  headers: {
    "Content-Type": "text/plain; charset=utf-8",
  },
  body: "Bad Gateway",
};

module.exports.handler = async function (event, context) {
  log.debug(event.httpMethod, "httpMethod");
  log.debug(event.headers.Origin, "headers.Origin");
  log.debug(event.url, "url");
  log.debug(event.params, "params");
  log.debug(event.queryStringParameters, "queryStringParameters");
  log.debug(event.requestContext.requestTime, "requestContext.requestTime");
  log.debug(event.body, "body");
  log.debug(event.path, "path");

  switch (event.httpMethod) {
    case "GET":
      switch (event.path) {
        case "/":
          return await statsCard(event.params);

        case "/pin":
          return await repoCard(event.params);

        case "/top-langs":
          return await langCard(event.params);

        case "/wakatime":
          return await wakatimeCard(event.params);

        default:
          break;
      }
      break;

    default:
      break;
  }

  return status502;
};
