import "@testing-library/jest-dom";
import WakaTimeCard from "../src/cards/wakatime";
import {
  genWakatimeMockData,
  mockVercel,
  mockWakaTimeRequest,
} from "./utils/mock";

describe("Test Render Wakatime Card", () => {
  async function render({ query = {}, stats = {} } = {}) {
    const { req, res } = mockVercel(query);
    const mockRestore = mockWakaTimeRequest({
      ...genWakatimeMockData(),
      ...stats,
    });
    const svgString = await new WakaTimeCard(req.query).generateSvgString(
      res.setHeader,
    );
    mockRestore();
    return svgString;
  }
  it("should render correctly", async () => {
    const svgString = await render();
    expect(svgString).toMatchSnapshot();
  });

  it("should render correctly with compact layout", async () => {
    const card = await render({
      query: {
        layout: "compact",
      },
    });
    expect(card).toMatchSnapshot();
  });

  it("should render translations", async () => {
    document.body.innerHTML = await render({
      query: {
        locale: "cn",
      },
      stats: {
        data: {},
      },
    });
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Wakatime 周统计",
    );
    expect(
      document.querySelector('g[transform="translate(0, 0)"]>text.stat.bold')
        .textContent,
    ).toBe("本周没有编程活动");
  });

  it("should render without rounding", async () => {
    document.body.innerHTML = await render({
      query: {
        border_radius: "0",
      },
    });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = await render();
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });
});
