require("@testing-library/jest-dom");
const cssToObject = require("css-to-object");
const { queryByTestId } = require("@testing-library/dom");

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
      document.querySelector('g[transform="translate(0, 0)"]>text.stat-label')
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

  it("should render items as bold properly", () => {
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {
      label_bold: true,
      value_bold: true
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const statLabelClassStyles = stylesObject[".stat-label"];
    const statValueClassStyles = stylesObject[".stat-value"];

    expect(statLabelClassStyles['font-weight']).toBe("700");
    expect(statValueClassStyles['font-weight']).toBe("700");
  });

  it("should render items without bold properly", () => {
    document.body.innerHTML = renderWakatimeCard(wakaTimeData.data, {
      label_bold: false,
      value_bold: false
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const statLabelClassStyles = stylesObject[".stat-label"];
    const statValueClassStyles = stylesObject[".stat-value"];

    expect(statLabelClassStyles['font-weight']).toBe("600");
    expect(statValueClassStyles['font-weight']).toBe("600");
  });
});
