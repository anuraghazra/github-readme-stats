import GitHubStatsCard from "../src/cards/github-stats";
import {
  genGithubStatsMockData,
  mockGithubRequest,
  mockVercel,
} from "./utils/mock";
import { ServerError } from "../src/helpers/Error";
import Error from "../src/components/Error";
import SVGRender, { render } from "../src/helpers/SVGRender";

import "@testing-library/jest-dom";
import cssToObject from "css-to-object";
import GithubStatsCard from "../src/cards/github-stats";
import {
  getByTestId,
  queryByTestId,
  queryAllByTestId,
} from "@testing-library/dom";

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
      render(
        <Error error={new ServerError(ServerError.TYPE.UNEXPECTED)}></Error>,
      ),
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
    expect(getByTestId(document.body, "header").textContent).toBe(
      "Hello World",
    );
    expect(document.body.querySelectorAll(".icon").length).toBe(5);
    expect(getByTestId(document.body, "commits").textContent).toBe("200");
  });
});
