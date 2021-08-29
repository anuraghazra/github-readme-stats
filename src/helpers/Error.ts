export class CardError extends Error {
  secondaryMessage;
  constructor(message: string, description?: string) {
    super(message);
    this.secondaryMessage = description ?? "";
  }
}

enum URLQueryErrorType {
  MISSING,
  INVALID,
  NOT_SUPPORTED,
}
export class URLQueryError extends CardError {
  static readonly TYPE = URLQueryErrorType;
  constructor(type: URLQueryErrorType, parameter: string) {
    const type2Message = {
      [URLQueryErrorType.MISSING]: `Missing ${parameter}`,
      [URLQueryErrorType.INVALID]: `Parameter "${parameter}" is invalid.`,
      [URLQueryErrorType.NOT_SUPPORTED]: `${parameter} is not supported`,
    };
    super("Please Check URL", type2Message[type]);
    this.name = "URLQueryError";
  }
}

enum ServerErrorType {
  UNEXPECTED,
}
export class ServerError extends CardError {
  static readonly TYPE = ServerErrorType;
  constructor(type: ServerErrorType) {
    const type2Message = {
      [ServerErrorType.UNEXPECTED]: `Unexpected Error`,
    };
    super("Something went wrong", type2Message[type]);
    this.name = "ServerError";
  }
}

enum FetchStatErrorType {
  RETRY_UPPER_LIMIT,
  USER_NOT_FOUND,
  UNEXPECTED,
}
export class FetchStatError extends CardError {
  static readonly TYPE = FetchStatErrorType;
  constructor(type: FetchStatErrorType, additionMessage?: string) {
    const type2Message = {
      [FetchStatErrorType.RETRY_UPPER_LIMIT]: `Over the limit of re-request`,
      [FetchStatErrorType.USER_NOT_FOUND]: "Could not fetch user",
      [FetchStatErrorType.UNEXPECTED]: "Unexpected Fetch Error",
    };
    super(
      "Something wrong with fetch data",
      additionMessage ?? type2Message[type],
    );
    this.name = "FetchStatError";
  }
}
