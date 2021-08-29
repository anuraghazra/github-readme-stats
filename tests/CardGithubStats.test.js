import GitHubStatsCard from "../src/cards/github-stats";
import {
  genGithubStatsMockData,
  mockGithubRequest,
  mockVercel,
} from "./utils/mock";
import { ServerError } from "../src/helpers/Error";
import "@testing-library/jest-dom";
import { getByTestId } from "@testing-library/dom";
import { renderError } from "../src/helpers/CardRenderer";

const githubStats = genGithubStatsMockData();
const mockRestore = mockGithubRequest(githubStats);
afterAll(() => {
  mockRestore();
});

describe("GithubStatsCard", () => {
  it("should render server unexpected error when user in blacklist", async () => {
    const { res } = mockVercel();
    const card = new GitHubStatsCard({ username: "technote-space" });
    const svgString = await card.generateSvgString(res.setHeader);
    expect(svgString).toBe(
      renderError(new ServerError(ServerError.TYPE.UNEXPECTED)),
    );
  });

  it("should render github stats card", async () => {
    const { req, res } = mockVercel({
      show_icons: "true",
      count_private: "false",
      custom_title: "Hello World",
    });
    const card = new GitHubStatsCard(req.query);
    const svgString = await card.generateSvgString(res.setHeader);
    document.body.innerHTML = svgString;
    expect(document.body.querySelector("svg")).toBeInTheDocument();
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Hello World",
    );
    expect(document.body.querySelectorAll(".icon").length).toBe(5);
    expect(getByTestId(document.body, "commits").textContent).toBe("200");
  });
});
