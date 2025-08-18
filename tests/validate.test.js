// @ts-check

import { expect, it, describe } from "@jest/globals";
import {
  validateQueryStringParam,
  validateQueryStringParams,
  InvalidQueryStringParamsError,
} from "../src/common/validate";
import { themes } from "../themes/index.js";

/**
 * @typedef {import("../src/common/validate").DataTypes} DataTypes The data types.
 */

/**
 * @type {Map<string, DataTypes>} The query string params data type map.
 */
const QUERYSTRING_PARAMS_DATA_TYPE_MAP = new Map([
  ["username", "string"],
  ["hide", "enum-array"],
  ["hide_title", "boolean"],
  ["hide_border", "boolean"],
  ["card_width", "number"],
  ["hide_rank", "boolean"],
  ["show_icons", "boolean"],
  ["include_all_commits", "boolean"],
  ["line_height", "number"],
  ["title_color", "string"],
  ["ring_color", "string"],
  ["icon_color", "string"],
  ["text_color", "string"],
  ["text_bold", "boolean"],
  ["bg_color", "string"],
  ["theme", "enum"],
  ["cache_seconds", "number"],
  ["exclude_repo", "array"],
  ["custom_title", "string"],
  ["locale", "enum"],
  ["disable_animations", "boolean"],
  ["border_radius", "number"],
  ["border_color", "string"],
  ["number_format", "enum"],
  ["rank_icon", "enum"],
  ["show", "enum-array"],
]);

describe("test query string param validation", () => {
  // Tests for `validateQueryStringParam` function.
  it("should validate a string", () => {
    expect(validateQueryStringParam("string", "username", "anuraghazra")).toBe(
      true,
    );
  });
  it("should validate a boolean", () => {
    expect(validateQueryStringParam("boolean", "hide_title", "true")).toBe(
      true,
    );
    expect(validateQueryStringParam("boolean", "hide_title", "false")).toBe(
      true,
    );
    expect(validateQueryStringParam("boolean", "hide_title", "invalid")).toBe(
      false,
    );
  });
  it("should validate a number", () => {
    expect(validateQueryStringParam("number", "card_width", "300")).toBe(true);
    expect(validateQueryStringParam("number", "card_width", "300.000")).toBe(
      true,
    );
    expect(validateQueryStringParam("number", "card_width", "invalid")).toBe(
      false,
    );
  });
  it("should validate an enum", () => {
    expect(validateQueryStringParam("enum", "theme", "dark")).toBe(true);
    expect(validateQueryStringParam("enum", "theme", "merko")).toBe(true);
    expect(validateQueryStringParam("enum", "theme", "invalid")).toBe(false);

    expect(validateQueryStringParam("enum", "locale", "en")).toBe(true);
    expect(validateQueryStringParam("enum", "locale", "invalid")).toBe(false);

    expect(validateQueryStringParam("enum", "number_format", "short")).toBe(
      true,
    );
    expect(validateQueryStringParam("enum", "number_format", "invalid")).toBe(
      false,
    );

    expect(validateQueryStringParam("enum", "rank_icon", "github")).toBe(true);
    expect(validateQueryStringParam("enum", "rank_icon", "invalid")).toBe(
      false,
    );
  });
  it("should validate an enum-array", () => {
    expect(
      validateQueryStringParam("enum-array", "hide", "stars,commits,prs"),
    ).toBe(true);
    expect(
      validateQueryStringParam(
        "enum-array",
        "show",
        "reviews,discussions_started",
      ),
    ).toBe(true);
    expect(
      validateQueryStringParam(
        "enum-array",
        "hide",
        "stars,commits,prs,invalid",
      ),
    ).toBe(false);
    expect(validateQueryStringParam("enum-array", "hide", "invalid")).toBe(
      false,
    );
  });
  it("should validate an array", () => {
    expect(
      validateQueryStringParam("array", "exclude_repo", "repo1,repo2"),
    ).toBe(true);
  });

  // Tests for `validateQueryStringParams` function.
  it("should validate query string params", () => {
    expect(
      validateQueryStringParams(
        {
          username: "anuraghazra",
          hide: "stars,commits,prs",
          hide_title: "true",
          hide_border: "true",
          card_width: "300",
          hide_rank: "true",
          show_icons: "true",
          include_all_commits: "true",
          line_height: "25",
          title_color: "fff",
          ring_color: "fff",
          icon_color: "fff",
          text_color: "fff",
          text_bold: "true",
          bg_color: "fff",
          theme: "dark",
          cache_seconds: "300",
          exclude_repo: "repo1,repo2",
          custom_title: "My Custom Title",
          locale: "en",
          disable_animations: "true",
          border_radius: "0",
          number_format: "long",
          border_color: "fff",
          rank_icon: "github",
          show: "reviews,discussions_started",
        },
        QUERYSTRING_PARAMS_DATA_TYPE_MAP,
      ),
      // This function returns void on successful run and throws an error on invalid query string params.
    ).toBe(undefined);
  });
  it("should validate query string params with extra params", () => {
    expect(
      validateQueryStringParams(
        {
          username: "anuraghazra",
          hide: "stars,commits,prs",
          hide_title: "true",
          hide_border: "true",
          card_width: "300",
          hide_rank: "true",
          show_icons: "true",
          include_all_commits: "true",
          line_height: "25",
          title_color: "fff",
          ring_color: "fff",
          icon_color: "fff",
          text_color: "fff",
          text_bold: "true",
          bg_color: "fff",
          theme: "dark",
          cache_seconds: "300",
          exclude_repo: "repo1,repo2",
          custom_title: "My Custom Title",
          locale: "en",
          disable_animations: "true",
          border_radius: "0",
          number_format: "long",
          border_color: "fff",
          rank_icon: "github",
          show: "reviews,discussions_started",
          invalid: "invalid",
        },
        QUERYSTRING_PARAMS_DATA_TYPE_MAP,
      ),
      // This function returns void on successful run and throws an error on invalid query string params.
    ).toBe(undefined);
  });
  it("should throw correct error on invalid boolean param", () => {
    expect(() =>
      validateQueryStringParams(
        {
          hide_title: "invalid",
        },
        QUERYSTRING_PARAMS_DATA_TYPE_MAP,
      ),
    ).toThrow(
      new InvalidQueryStringParamsError(
        "Invalid query string param `hide_title` value: invalid",
        "Expected: true or false",
      ),
    );
  });
  it("should throw correct error on invalid number param", () => {
    expect(() =>
      validateQueryStringParams(
        {
          card_width: "invalid",
        },
        QUERYSTRING_PARAMS_DATA_TYPE_MAP,
      ),
    ).toThrow(
      new InvalidQueryStringParamsError(
        "Invalid query string param `card_width` value: invalid",
        "Expected: a number",
      ),
    );
  });
  it("should throw correct error on invalid enum param", () => {
    expect(() =>
      validateQueryStringParams(
        {
          theme: "invalid",
        },
        QUERYSTRING_PARAMS_DATA_TYPE_MAP,
      ),
    ).toThrow(
      new InvalidQueryStringParamsError(
        "Invalid query string param `theme` value: invalid",
        `Expected: ${Object.keys(themes).join(", ")}`,
      ),
    );
  });
  it("should throw correct error on invalid enum-array param", () => {
    expect(() =>
      validateQueryStringParams(
        {
          hide: "commits,prs,invalid",
        },
        QUERYSTRING_PARAMS_DATA_TYPE_MAP,
      ),
    ).toThrow(
      new InvalidQueryStringParamsError(
        "Invalid query string param `hide` value: commits,prs,invalid",
        "Expected: stars, commits, prs, issues, contribs",
      ),
    );
  });
});
