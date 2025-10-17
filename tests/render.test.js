// @ts-check

import { describe, expect, it } from "@jest/globals";
import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom/jest-globals";
import { renderError } from "../src/common/render.js";
import { encodeHTML } from "../src/common/html.js";

describe("Test render.js", () => {
  it("should test encodeHTML", () => {
    expect(encodeHTML(`<html>hello world<,.#4^&^@%!))`)).toBe(
      "&#60;html&#62;hello world&#60;,.#4^&#38;^@%!))",
    );
  });

  it("should test renderError", () => {
    document.body.innerHTML = renderError({ message: "Something went wrong" });
    expect(
      queryByTestId(document.body, "message")?.children[0],
    ).toHaveTextContent(/Something went wrong/gim);
    expect(
      queryByTestId(document.body, "message")?.children[1],
    ).toBeEmptyDOMElement();

    // Secondary message
    document.body.innerHTML = renderError({
      message: "Something went wrong",
      secondaryMessage: "Secondary Message",
    });
    expect(
      queryByTestId(document.body, "message")?.children[1],
    ).toHaveTextContent(/Secondary Message/gim);
  });
});
