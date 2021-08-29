import("@testing-library/jest-dom");
import {
  genGithubPinRepoMockData,
  mockGithubRequest,
  mockVercel,
} from "./utils/mock";
import GithubPinRepoCard from "../src/cards/gituhb-pin-repo";
import { renderError } from "../src/helpers/CardRenderer";
import cssToObject from "css-to-object";
import { queryByTestId } from "@testing-library/dom";

describe("GithubPinRepoCard", () => {
  it("should render pin repo card", async () => {
    const { req, res } = mockVercel({
      repo: "convoychat",
    });
    const mockRestore = mockGithubRequest(genGithubPinRepoMockData());

    const card = new GithubPinRepoCard(req.query);
    const svgString = await card.generateSvgString(res.setHeader);
    document.body.innerHTML = svgString;
    expect(document.body.querySelector("svg")).toBeInTheDocument();
    const [header] = document.getElementsByClassName("header");
    expect(header).toHaveTextContent("convoychat");
    expect(header).not.toHaveTextContent("anuraghazra");

    mockRestore();
  });

  it("should render pin repo card with the query options", async () => {
    const { req, res } = mockVercel({
      repo: "convoychat",
      title_color: "fff",
      icon_color: "fff",
      text_color: "fff",
      bg_color: "fff",
    });
    const mockRestore = mockGithubRequest(genGithubPinRepoMockData());

    const card = new GithubPinRepoCard(req.query);
    const svgString = await card.generateSvgString(res.setHeader);
    document.body.innerHTML = svgString;
    expect(document.body.querySelector("svg")).toBeInTheDocument();
    const [header] = document.getElementsByClassName("header");
    expect(header).toHaveTextContent("convoychat");
    expect(header).not.toHaveTextContent("anuraghazra");
    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe(`#fff`);
    expect(descClassStyles.fill).toBe(`#fff`);
    expect(iconClassStyles.fill).toBe(`#fff`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fff",
    );

    mockRestore();
  });

  it("should render error card if user repo not found", async () => {
    const { req, res } = mockVercel({
      repo: "convoychat",
    });
    const mockRestore = mockGithubRequest({
      data: {
        user: { repository: null },
        organization: null,
      },
    });

    const card = new GithubPinRepoCard(req.query);
    const svgString = await card.generateSvgString(res.setHeader);
    document.body.innerHTML = svgString;
    expect(svgString).toBe(renderError(new Error("User Repository Not found")));

    mockRestore();
  });

  it("should render error card if org repo not found", async () => {
    const { req, res } = mockVercel({
      repo: "convoychat",
    });
    const mockRestore = mockGithubRequest({
      data: { user: null, organization: { repository: null } },
    });

    const card = new GithubPinRepoCard(req.query);
    const svgString = await card.generateSvgString(res.setHeader);
    document.body.innerHTML = svgString;
    expect(svgString).toBe(
      renderError(new Error("Organization Repository Not found")),
    );

    mockRestore();
  });
});
