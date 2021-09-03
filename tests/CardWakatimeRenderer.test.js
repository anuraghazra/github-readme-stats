import { queryByTestId } from "@testing-library/dom";
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

  it("should hide languages when hide is passed", async () => {
    document.body.innerHTML = await render({
      query: {
        hide: ["YAML", "Other"],
      },
    });

    expect(queryByTestId(document.body, /YAML/i)).toBeNull();
    expect(queryByTestId(document.body, /Other/i)).toBeNull();
    expect(queryByTestId(document.body, /TypeScript/i)).not.toBeNull();
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
    expect(queryByTestId(document.body, "header").textContent).toBe(
      "Wakatime 周统计",
    );
    expect(queryByTestId(document.body, "nocoding").textContent).toBe(
      "本周没有编程活动",
    );
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
