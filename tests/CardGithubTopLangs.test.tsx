import "@testing-library/jest-dom";
import {
  genGithubTopLangsMockData,
  mockGithubRequest,
  mockVercel,
} from "./utils/mock";
import api from "../api/[key]";
import GithubTopLangs from "../src/cards/github-top-langs";
import themes from "../themes";

import "@testing-library/jest-dom";
import cssToObject from "css-to-object";

describe("GithubTopLangsCard", () => {
  it("should work with correct route", async () => {
    const { req, res } = mockVercel({
      key: "top-langs",
    });
    mockGithubRequest(genGithubTopLangsMockData());
    await api(req, res);

    expect(res.send).toBeCalledWith(
      await new GithubTopLangs(req.query).generateSvgString(res.setHeader),
    );
  });

  it("should work with the query options", async () => {
    const { req, res } = mockVercel({
      key: "top-langs",
      hide_title: true,
      card_width: 100,
      title_color: "fff",
      icon_color: "fff",
      text_color: "fff",
      bg_color: "fff",
    });
    mockGithubRequest(genGithubTopLangsMockData());
    await api(req, res);

    expect(res.send).toBeCalledWith(
      await new GithubTopLangs(req.query).generateSvgString(res.setHeader),
    );
  });
});
