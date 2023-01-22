/**
 * @file GRS Exception/Errors.
 */

const SECONDARY_ERROR_MESSAGES = {
  MAX_RETRY:
    "Please add an env variable called PAT_1 with your github token in vercel",
  USER_NOT_FOUND: "Make sure the provided username is not an organization",
  GRAPHQL_ERROR: "Please try again later",
};

/**
 * Custom error class to handle custom GRS errors.
 *
 * @extends Error
 */
class CustomError extends Error {
  /**
   * @param {string} message Error message.
   * @param {string} type Error type.
   */
  constructor(message, type) {
    super(message);
    this.type = type;
    this.secondaryMessage = SECONDARY_ERROR_MESSAGES[type] || type;
  }

  static MAX_RETRY = "MAX_RETRY";
  static USER_NOT_FOUND = "USER_NOT_FOUND";
  static GRAPHQL_ERROR = "GRAPHQL_ERROR";
}

/**
 * Missing query parameter class.
 *
 * @extends Error
 */
class MissingParamError extends Error {
  /**
   * @param {string[]} missedParams
   * @param {string?=} secondaryMessage
   */
  constructor(missedParams, secondaryMessage) {
    const msg = `Missing params ${missedParams
      .map((p) => `"${p}"`)
      .join(", ")} make sure you pass the parameters in URL`;
    super(msg);
    this.missedParams = missedParams;
    this.secondaryMessage = secondaryMessage;
  }
}

/**
 * HttpException class.
 *
 * @extends Error
 */
class HttpException extends Error {
  /**
   * Create a HttpException.
   *
   * @param {number} statusCode - The status code.
   * @param {string} message - The error message.
   * @param {string[]} errors - The errors.
   */
  constructor(
    statusCode,
    message = "Exception occurred during the processing of HTTP requests.",
    errors = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export {
  SECONDARY_ERROR_MESSAGES,
  CustomError,
  MissingParamError,
  HttpException,
};
