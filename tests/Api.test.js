import api from "../api/[key]";
import GitHubStatsCard from "../src/cards/github-stats";
import {
  genGithubStatsMockData,
  mockVercel,
  mockGithubRequest,
} from "./utils/mock";

const mockRestore = mockGithubRequest(genGithubStatsMockData());
afterAll(() => {
  mockRestore();
});

describe("API", () => {
  it("should return svg when request to /api", async () => {
    const { req, res } = mockVercel();
    await api(req, res);
    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
  });

  it("should return stat card svg when request to /api", async () => {
    const { req, res } = mockVercel();
    await api(req, res);
    expect(res.send).toBeCalledWith(
      await new GitHubStatsCard(req.query).generateSvgString(res.setHeader),
    );
  });

  it("should return 404 when request to /api/xxx", async () => {
    const { req, res } = mockVercel({
      key: "xxx",
    });
    await api(req, res);
    expect(res.status).toBeCalledWith(404);
  });

  it("should pass setHeader to generate function", async () => {
    const { req, res } = mockVercel();
    await api(req, res);
    expect(res.setHeader).toBeCalled();
  });
});
