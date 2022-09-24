import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";
import renderWakatimeCard from "../src/cards/wakatime-card.js";
import { getCardColors } from "../src/common/utils.js";
import { wakaTimeData } from "./fetchWakatime.test.js";

describe("Test Render Wakatime Card", () => {
  it("should render correctly", () => {
    const card = renderWakatimeCard(wakaTimeData.data);
    expect(getCardColors).toMatchSnapshot();
  });

  it("should render correctly with compact layout", () => {
    const card = renderWakatimeCard(wakaTimeData.data, { layout: "compact" });

    expect(card).toMatchSnapshot();
  });

  it("should hide languages when hide is passed", () => {
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {
      hide: ["YAML", "Other"],
    });

    expect(queryByTestId(document.body, /YAML/i)).toBeNull();
    expect(queryByTestId(document.body, /Other/i)).toBeNull();
    expect(queryByTestId(document.body, /TypeScript/i)).not.toBeNull();
  });

  it("should render translations", () => {
    document.body.innerHTML = renderWakatimeCard({}, { locale: "cn" });
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Wakatime 周统计",
    );
    expect(
      document.querySelector('g[transform="translate(0, 0)"]>text.stat.bold')
        .textContent,
    ).toBe("本周没有编程活动");
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {
      border_radius: "0",
    });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });

  it('should show "no coding activitiy this week" message when there hasn not been activity', () => {
    document.body.innerHTML = renderWakatimeCard(
      {
        ...wakaTimeData.data,
        languages: undefined,
      },
      {},
    );
    expect(document.querySelector(".stat").textContent).toBe(
      "No coding activity this week",
    );
  });
});
