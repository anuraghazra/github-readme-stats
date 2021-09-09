require("@testing-library/jest-dom");
const { queryByTestId } = require("@testing-library/dom");

const renderCodetimeCard = require("../src/cards/codetime-card");
const { codeTimeData } = require("./fetchCodetime.test");

describe("Test Render CodeTime Card", () => {
    it("should render correctly", () => {
        const card = renderCodetimeCard(codeTimeData.data);

        expect(card).toMatchSnapshot();
    });

    it("should render correctly with compact layout", () => {
        const card = renderCodetimeCard(codeTimeData.data, { layout: "compact" });

        expect(card).toMatchSnapshot();
    });

    it("should hide languages when hide is passed", () => {
        document.body.innerHTML = renderCodeTimeCard(codeTimeData.data, {
            hide: ["YAML", "Other"],
        });

        expect(queryByTestId(document.body, /YAML/i)).toBeNull();
        expect(queryByTestId(document.body, /Other/i)).toBeNull();
        expect(queryByTestId(document.body, /TypeScript/i)).not.toBeNull();
    });

    it("should render translations", () => {
        document.body.innerHTML = renderCodeTimeCard({}, { locale: "cn" });
        expect(document.getElementsByClassName("header")[0].textContent).toBe(
            "Wakatime 周统计",
        );
        expect(
            document.querySelector('g[transform="translate(0, 0)"]>text.stat.bold')
                .textContent,
        ).toBe("本周没有编程活动");
    });

    it("should render without rounding", () => {
        document.body.innerHTML = renderCodeTimeCard(codeTimeData.data, {
            border_radius: "0",
        });
        expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
        document.body.innerHTML = renderCodeTimeCard(codeTimeData.data, {});
        expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
    });
});