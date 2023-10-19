// @ts-check

import { availableLocales } from "../translations.js";
import { themes } from "../../themes/index.js";
import { parseArray } from "./utils.js";

/**
 * Class for handling invalid query string param errors.
 */
class InvalidQueryStringParamsError extends Error {
  /**
   * Constructor for InvalidQueryStringParamsError.
   *
   * @param {string} message - The error message.
   * @param {string} secondaryMessage - The secondary error message.
   */
  constructor(message, secondaryMessage) {
    super(message);
    this.secondaryMessage = secondaryMessage;
  }
}

const QUERYSTRING_PARAMS_ENUM_VALUES = {
  hide: ["stars", "commits", "prs", "issues", "contribs"],
  theme: Object.keys(themes),
  locale: availableLocales,
  number_format: ["short", "long"],
  rank_icon: ["github", "percentile", "default"],
  show: [
    "reviews",
    "discussions_started",
    "discussions_answered",
    "prs_merged",
    "prs_merged_percentage",
  ],
};

/**
 * Returns the secondary error message for an invalid query string param.
 *
 * @param {string} param - The invalid query string param.
 * @param {Map<string, string>} queryStringParamsDataTypeMap - The query string params data type map.
 * @returns {string} The secondary error message.
 */
const getInvalidQueryStringParamsErrorSecondaryMessage = (
  param,
  queryStringParamsDataTypeMap,
) => {
  const expectedDataType = queryStringParamsDataTypeMap.get(param);
  if (expectedDataType === "enum" || expectedDataType === "enum-array") {
    return `Expected: ${QUERYSTRING_PARAMS_ENUM_VALUES[param].join(", ")}`;
  } else if (expectedDataType === "number") {
    return "Expected: a number";
  } else if (expectedDataType === "boolean") {
    return "Expected: true or false";
  } else if (expectedDataType === "array") {
    return "Expected: an array";
  } else if (expectedDataType === "string") {
    return "Expected: a string";
  } else {
    throw new Error("Unexpected behavior");
  }
};

/**
 * Validates the query string params.
 * Throws an error if a query string param is invalid.
 * Does not return anything.
 *
 * @param {object} queryStringParams - The query string params.
 * @param {Map<string, string>} queryStringParamsDataTypeMap - The query string params data type map.
 * @returns {void}
 */
const validateQueryStringParams = (
  queryStringParams,
  queryStringParamsDataTypeMap,
) => {
  for (const [param, value] of Object.entries(queryStringParams)) {
    const expectedDataType = queryStringParamsDataTypeMap.get(param);
    if (!expectedDataType) {
      throw new InvalidQueryStringParamsError(
        `Invalid query string param: ${param}`,
        "Expected: a valid query string param",
      );
    }
    if (expectedDataType === "enum") {
      if (QUERYSTRING_PARAMS_ENUM_VALUES[param].includes(value)) {
        continue;
      }
    } else if (expectedDataType === "enum-array") {
      const values = parseArray(value);
      if (
        values.every((value) =>
          QUERYSTRING_PARAMS_ENUM_VALUES[param].includes(value),
        )
      ) {
        continue;
      }
    } else if (expectedDataType === "number") {
      if (!isNaN(value)) {
        continue;
      }
    } else if (expectedDataType === "boolean") {
      if (value === "true" || value === "false") {
        continue;
      }
    } else if (expectedDataType === "array") {
      if (Array.isArray(parseArray(value))) {
        continue;
      }
    } else if (expectedDataType === "string") {
      if (typeof value === "string") {
        continue;
      }
    }
    throw new InvalidQueryStringParamsError(
      `Invalid query string param: ${param}`,
      getInvalidQueryStringParamsErrorSecondaryMessage(
        param,
        queryStringParamsDataTypeMap,
      ),
    );
  }
};

export { validateQueryStringParams };
