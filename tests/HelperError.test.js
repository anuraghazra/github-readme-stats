import {
  URLQueryError,
  ServerError,
  FetchStatError,
} from "../src/helpers/Error";

describe("Errors", () => {
  describe("URLQueryError", () => {
    it("should return correct type message when assign exist type", () => {
      const error = new URLQueryError(URLQueryError.TYPE.MISSING, "name");
      expect(error.message).toBe("Please Check URL");
      expect(error.secondaryMessage).toBe("Missing name");
    });
  });

  describe("ServerError", () => {
    it("should return correct type message when assign exist type", () => {
      const error = new ServerError(ServerError.TYPE.UNEXPECTED);
      expect(error.message).toBe("Something went wrong");
      expect(error.secondaryMessage).toBe("Unexpected Error");
    });
  });

  describe("FetchStatError", () => {
    it("should return correct type message when assign exist type", () => {
      const error = new FetchStatError(FetchStatError.TYPE.USER_NOT_FOUND);
      expect(error.message).toBe("Something wrong with fetch data");
      expect(error.secondaryMessage).toBe("Could not fetch user");
    });

    it("should return correct type message when assign additionMessage", () => {
      const error = new FetchStatError(
        FetchStatError.TYPE.USER_NOT_FOUND,
        "username is empty",
      );
      expect(error.message).toBe("Something wrong with fetch data");
      expect(error.secondaryMessage).toBe("username is empty");
    });
  });
});
