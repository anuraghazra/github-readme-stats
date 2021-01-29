require("@testing-library/jest-dom");
const renderWakatimeCard = require("../src/cards/wakatime-card");

const { wakaTimeData } = require("./fetchWakatime.test");

describe("Test Render Wakatime Card", () => {
  it("should render correctly", () => {
    const card = renderWakatimeCard(wakaTimeData.data);

    expect(card).toMatchSnapshot();
  });

  it("should render correctly with compact layout", () => {
    const card = renderWakatimeCard(wakaTimeData.data, { layout: "compact" });

    expect(card).toMatchSnapshot();
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
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, { rx: "0" });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, { });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });
});
