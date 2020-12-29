const { safeDump } = require("js-yaml");
const { Builder } = require("xml2js");
const { renderError } = require("./utils");

/**
 * @param {String} [response_type = svg] The response type.
 * @param {String} [response_type = githubReadmeStats] A callback for jsonp.
 * @param {Function} renderCard A function to render the svg card
 * @returns {Object} [responseType]
 * @returns {String} [responseType.contentType] The MIME type for the `response_type`
 * @returns {Function} [responseType.render] Renders the card with the `response_type`
 * @returns {Function} [responseType.error] Renders an error card with the `response_type`
 */
module.exports = ({
  response_type = "svg",
  callback = "githubReadmeStats",
  renderCard,
}) => {
  const responseTypes = {
    svg: {
      contentType: "image/svg+xml",
      render: renderCard,
      error: renderError,
    },
    json: {
      contentType: "application/json",
      render: (json) => JSON.stringify(json),
      error: (message, secondaryMessage = "") =>
        JSON.stringify({ error: { message, secondaryMessage } }),
    },
    xml: {
      contentType: "application/xml",
      render: (json) => new Builder().buildObject(json),
      error: (message, secondaryMessage = "") =>
        new Builder().buildObject({ error: { message, secondaryMessage } }),
    },
    jsonp: {
      contentType: "application/javascript",
      render: (json) =>
        // https://stackoverflow.com/a/19782287
        `${callback.replace(/^[^a-zA-Z_$]|[^\w$]/g, "_")}(${JSON.stringify(
          json,
        )})`,
      error: (message, secondaryMessage = "") =>
        `${callback.replace(/^[^a-zA-Z_$]|[^\w$]/g, "_")}(${JSON.stringify({
          error: { message, secondaryMessage },
        })})`,
    },
    yaml: {
      contentType: "application/x-yaml",
      render: (json) => safeDump(json),
      error: (message, secondaryMessage = "") =>
        safeDump({
          error: { message, secondaryMessage },
        }),
    },
  };
  return responseTypes[response_type] || responseTypes.svg;
};
