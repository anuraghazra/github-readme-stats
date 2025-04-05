// @ts-check

import { availableLocales } from "../translations.js";
import { themes } from "../../themes/index.js";
import { parseArray } from "./utils.js";

/**
 * Class for handling invalid query string param errors.
 */
export class InvalidQueryStringParamsError extends Error {
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
 * @typedef {import("./validate").DataTypes} DataTypes The data types.
 */

/**
 * Returns the secondary error message for an invalid query string param.
 *
 * @param {string} param - The invalid query string param.
 * @param {Map<string, DataTypes>} queryStringParamsDataTypeMap - The query string params data type map.
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
 * Validates a query string param.
 *
 * @param {DataTypes} expectedDataType - The expected data type of the query string param.
 * @param {string} param - The query string param.
 * @param {string} value - The query string param value.
 * @returns {boolean} Whether the query string param is valid.
 */
export const validateQueryStringParam = (expectedDataType, param, value) => {
  if (expectedDataType === "enum") {
    return QUERYSTRING_PARAMS_ENUM_VALUES[param].includes(value);
  } else if (expectedDataType === "enum-array") {
    return parseArray(value).every((value) =>
      QUERYSTRING_PARAMS_ENUM_VALUES[param].includes(value),
    );
  } else if (expectedDataType === "number") {
    return !isNaN(parseFloat(value));
  } else if (expectedDataType === "boolean") {
    return value === "true" || value === "false";
  } else if (expectedDataType === "array") {
    return Array.isArray(parseArray(value));
  } else if (expectedDataType === "string") {
    return typeof value === "string";
  } else {
    return false;
  }
};

/**
 * Validates the query string params.
 * Throws an error if a query string param is invalid.
 * Does not return anything.
 *
 * @param {object} queryStringParams - The query string params.
 * @param {Map<string, DataTypes>} queryStringParamsDataTypeMap - The query string params data type map.
 * @returns {void}
 */
export const validateQueryStringParams = (
  queryStringParams,
  queryStringParamsDataTypeMap,
) => {
  for (const [param, value] of Object.entries(queryStringParams)) {
    const expectedDataType = queryStringParamsDataTypeMap.get(param);
    if (!expectedDataType) {
      // Absence of data type means that the query string param is not supported.
      // Currently we allow addition of extra query string params.
      continue;
    }
    if (validateQueryStringParam(expectedDataType, param, value)) {
      continue;
    }
    throw new InvalidQueryStringParamsError(
      `Invalid query string param \`${param}\` value: ${value}`,
      getInvalidQueryStringParamsErrorSecondaryMessage(
        param,
        queryStringParamsDataTypeMap,
      ),
    );
  }
};
