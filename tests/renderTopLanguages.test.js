import { queryAllByTestId, queryByTestId } from "@testing-library/dom";
import { cssToObject } from "@uppercod/css-to-object";
import {
  getLongestLang,
  degreesToRadians,
  radiansToDegrees,
  polarToCartesian,
  cartesianToPolar,
  getCircleLength,
  calculateCompactLayoutHeight,
  calculateNormalLayoutHeight,
  calculateDonutLayoutHeight,
  calculateDonutVerticalLayoutHeight,
  calculatePieLayoutHeight,
  donutCenterTranslation,
  trimTopLanguages,
  renderTopLanguages,
  MIN_CARD_WIDTH,
  getDefaultLanguagesCountByLayout,
} from "../src/cards/top-languages-card.js";

// adds special assertions like toHaveTextContent
import "@testing-library/jest-dom";

import { themes } from "../themes/index.js";

const langs = {
  HTML: {
    color: "#0f0",
    name: "HTML",
    size: 200,
  },
  javascript: {
    color: "#0ff",
    name: "javascript",
    size: 200,
  },
  css: {
    color: "#ff0",
    name: "css",
    size: 100,
  },
};

/**
 * Retrieve number array from SVG path definition string.
 *
 * @param {string} d SVG path definition string.
 * @return {number[]} Resulting numbers array.
 */
const getNumbersFromSvgPathDefinitionAttribute = (d) => {
  return d
    .split(" ")
    .filter((x) => !isNaN(x))
    .map((x) => parseFloat(x));
};

/**
 * Retrieve the language percentage from the donut chart SVG.
 *
 * @param {string} d The SVG path element.
 * @param {number} centerX The center X coordinate of the donut chart.
 * @param {number} centerY The center Y coordinate of the donut chart.
 * @returns {number} The percentage of the language.
 */
const langPercentFromDonutLayoutSvg = (d, centerX, centerY) => {
  const dTmp = getNumbersFromSvgPathDefinitionAttribute(d);
  const endAngle =
    cartesianToPolar(centerX, centerY, dTmp[0], dTmp[1]).angleInDegrees + 90;
  let startAngle =
    cartesianToPolar(centerX, centerY, dTmp[7], dTmp[8]).angleInDegrees + 90;
  if (startAngle > endAngle) startAngle -= 360;
  return (endAngle - startAngle) / 3.6;
};

/**
 * Calculate language percentage for donut vertical chart SVG.
 *
 * @param {number} partLength Length of current chart part..
 * @param {number} totalCircleLength Total length of circle.
 * @return {number} Chart part percentage.
 */
const langPercentFromDonutVerticalLayoutSvg = (
  partLength,
  totalCircleLength,
) => {
  return (partLength / totalCircleLength) * 100;
};

/**
 * Retrieve the language percentage from the pie chart SVG.
 *
 * @param {string} d The SVG path element.
 * @param {number} centerX The center X coordinate of the pie chart.
 * @param {number} centerY The center Y coordinate of the pie chart.
 * @returns {number} The percentage of the language.
 */
const langPercentFromPieLayoutSvg = (d, centerX, centerY) => {
  const dTmp = getNumbersFromSvgPathDefinitionAttribute(d);
  const startAngle = cartesianToPolar(
    centerX,
    centerY,
    dTmp[2],
    dTmp[3],
  ).angleInDegrees;
  let endAngle = cartesianToPolar(
    centerX,
    centerY,
    dTmp[9],
    dTmp[10],
  ).angleInDegrees;
  return ((endAngle - startAngle) / 360) * 100;
};

describe("Test renderTopLanguages helper functions", () => {
  it("getLongestLang", () => {
    const langArray = Object.values(langs);
    expect(getLongestLang(langArray)).toBe(langs.javascript);
  });

  it("degreesToRadians", () => {
    expect(degreesToRadians(0)).toBe(0);
    expect(degreesToRadians(90)).toBe(Math.PI / 2);
    expect(degreesToRadians(180)).toBe(Math.PI);
    expect(degreesToRadians(270)).toBe((3 * Math.PI) / 2);
    expect(degreesToRadians(360)).toBe(2 * Math.PI);
  });

  it("radiansToDegrees", () => {
    expect(radiansToDegrees(0)).toBe(0);
    expect(radiansToDegrees(Math.PI / 2)).toBe(90);
    expect(radiansToDegrees(Math.PI)).toBe(180);
    expect(radiansToDegrees((3 * Math.PI) / 2)).toBe(270);
    expect(radiansToDegrees(2 * Math.PI)).toBe(360);
  });

  it("polarToCartesian", () => {
    expect(polarToCartesian(100, 100, 60, 0)).toStrictEqual({ x: 160, y: 100 });
    expect(polarToCartesian(100, 100, 60, 45)).toStrictEqual({
      x: 142.42640687119285,
      y: 142.42640687119285,
    });
    expect(polarToCartesian(100, 100, 60, 90)).toStrictEqual({
      x: 100,
      y: 160,
    });
    expect(polarToCartesian(100, 100, 60, 135)).toStrictEqual({
      x: 57.573593128807154,
      y: 142.42640687119285,
    });
    expect(polarToCartesian(100, 100, 60, 180)).toStrictEqual({
      x: 40,
      y: 100.00000000000001,
    });
    expect(polarToCartesian(100, 100, 60, 225)).toStrictEqual({
      x: 57.57359312880714,
      y: 57.573593128807154,
    });
    expect(polarToCartesian(100, 100, 60, 270)).toStrictEqual({
      x: 99.99999999999999,
      y: 40,
    });
    expect(polarToCartesian(100, 100, 60, 315)).toStrictEqual({
      x: 142.42640687119285,
      y: 57.57359312880714,
    });
    expect(polarToCartesian(100, 100, 60, 360)).toStrictEqual({
      x: 160,
      y: 99.99999999999999,
    });
  });

  it("cartesianToPolar", () => {
    expect(cartesianToPolar(100, 100, 160, 100)).toStrictEqual({
      radius: 60,
      angleInDegrees: 0,
    });
    expect(
      cartesianToPolar(100, 100, 142.42640687119285, 142.42640687119285),
    ).toStrictEqual({ radius: 60.00000000000001, angleInDegrees: 45 });
    expect(cartesianToPolar(100, 100, 100, 160)).toStrictEqual({
      radius: 60,
      angleInDegrees: 90,
    });
    expect(
      cartesianToPolar(100, 100, 57.573593128807154, 142.42640687119285),
    ).toStrictEqual({ radius: 60, angleInDegrees: 135 });
    expect(cartesianToPolar(100, 100, 40, 100.00000000000001)).toStrictEqual({
      radius: 60,
      angleInDegrees: 180,
    });
    expect(
      cartesianToPolar(100, 100, 57.57359312880714, 57.573593128807154),
    ).toStrictEqual({ radius: 60, angleInDegrees: 225 });
    expect(cartesianToPolar(100, 100, 99.99999999999999, 40)).toStrictEqual({
      radius: 60,
      angleInDegrees: 270,
    });
    expect(
      cartesianToPolar(100, 100, 142.42640687119285, 57.57359312880714),
    ).toStrictEqual({ radius: 60.00000000000001, angleInDegrees: 315 });
    expect(cartesianToPolar(100, 100, 160, 99.99999999999999)).toStrictEqual({
      radius: 60,
      angleInDegrees: 360,
    });
  });

  it("calculateCompactLayoutHeight", () => {
    expect(calculateCompactLayoutHeight(0)).toBe(90);
    expect(calculateCompactLayoutHeight(1)).toBe(115);
    expect(calculateCompactLayoutHeight(2)).toBe(115);
    expect(calculateCompactLayoutHeight(3)).toBe(140);
    expect(calculateCompactLayoutHeight(4)).toBe(140);
    expect(calculateCompactLayoutHeight(5)).toBe(165);
    expect(calculateCompactLayoutHeight(6)).toBe(165);
    expect(calculateCompactLayoutHeight(7)).toBe(190);
    expect(calculateCompactLayoutHeight(8)).toBe(190);
    expect(calculateCompactLayoutHeight(9)).toBe(215);
    expect(calculateCompactLayoutHeight(10)).toBe(215);
  });

  it("calculateNormalLayoutHeight", () => {
    expect(calculateNormalLayoutHeight(0)).toBe(85);
    expect(calculateNormalLayoutHeight(1)).toBe(125);
    expect(calculateNormalLayoutHeight(2)).toBe(165);
    expect(calculateNormalLayoutHeight(3)).toBe(205);
    expect(calculateNormalLayoutHeight(4)).toBe(245);
    expect(calculateNormalLayoutHeight(5)).toBe(285);
    expect(calculateNormalLayoutHeight(6)).toBe(325);
    expect(calculateNormalLayoutHeight(7)).toBe(365);
    expect(calculateNormalLayoutHeight(8)).toBe(405);
    expect(calculateNormalLayoutHeight(9)).toBe(445);
    expect(calculateNormalLayoutHeight(10)).toBe(485);
  });

  it("calculateDonutLayoutHeight", () => {
    expect(calculateDonutLayoutHeight(0)).toBe(215);
    expect(calculateDonutLayoutHeight(1)).toBe(215);
    expect(calculateDonutLayoutHeight(2)).toBe(215);
    expect(calculateDonutLayoutHeight(3)).toBe(215);
    expect(calculateDonutLayoutHeight(4)).toBe(215);
    expect(calculateDonutLayoutHeight(5)).toBe(215);
    expect(calculateDonutLayoutHeight(6)).toBe(247);
    expect(calculateDonutLayoutHeight(7)).toBe(279);
    expect(calculateDonutLayoutHeight(8)).toBe(311);
    expect(calculateDonutLayoutHeight(9)).toBe(343);
    expect(calculateDonutLayoutHeight(10)).toBe(375);
  });

  it("calculateDonutVerticalLayoutHeight", () => {
    expect(calculateDonutVerticalLayoutHeight(0)).toBe(300);
    expect(calculateDonutVerticalLayoutHeight(1)).toBe(325);
    expect(calculateDonutVerticalLayoutHeight(2)).toBe(325);
    expect(calculateDonutVerticalLayoutHeight(3)).toBe(350);
    expect(calculateDonutVerticalLayoutHeight(4)).toBe(350);
    expect(calculateDonutVerticalLayoutHeight(5)).toBe(375);
    expect(calculateDonutVerticalLayoutHeight(6)).toBe(375);
    expect(calculateDonutVerticalLayoutHeight(7)).toBe(400);
    expect(calculateDonutVerticalLayoutHeight(8)).toBe(400);
    expect(calculateDonutVerticalLayoutHeight(9)).toBe(425);
    expect(calculateDonutVerticalLayoutHeight(10)).toBe(425);
  });

  it("calculatePieLayoutHeight", () => {
    expect(calculatePieLayoutHeight(0)).toBe(300);
    expect(calculatePieLayoutHeight(1)).toBe(325);
    expect(calculatePieLayoutHeight(2)).toBe(325);
    expect(calculatePieLayoutHeight(3)).toBe(350);
    expect(calculatePieLayoutHeight(4)).toBe(350);
    expect(calculatePieLayoutHeight(5)).toBe(375);
    expect(calculatePieLayoutHeight(6)).toBe(375);
    expect(calculatePieLayoutHeight(7)).toBe(400);
    expect(calculatePieLayoutHeight(8)).toBe(400);
    expect(calculatePieLayoutHeight(9)).toBe(425);
    expect(calculatePieLayoutHeight(10)).toBe(425);
  });

  it("donutCenterTranslation", () => {
    expect(donutCenterTranslation(0)).toBe(-45);
    expect(donutCenterTranslation(1)).toBe(-45);
    expect(donutCenterTranslation(2)).toBe(-45);
    expect(donutCenterTranslation(3)).toBe(-45);
    expect(donutCenterTranslation(4)).toBe(-45);
    expect(donutCenterTranslation(5)).toBe(-45);
    expect(donutCenterTranslation(6)).toBe(-29);
    expect(donutCenterTranslation(7)).toBe(-13);
    expect(donutCenterTranslation(8)).toBe(3);
    expect(donutCenterTranslation(9)).toBe(19);
    expect(donutCenterTranslation(10)).toBe(35);
  });

  it("getCircleLength", () => {
    expect(getCircleLength(20)).toBeCloseTo(125.663);
    expect(getCircleLength(30)).toBeCloseTo(188.495);
    expect(getCircleLength(40)).toBeCloseTo(251.327);
    expect(getCircleLength(50)).toBeCloseTo(314.159);
    expect(getCircleLength(60)).toBeCloseTo(376.991);
    expect(getCircleLength(70)).toBeCloseTo(439.822);
    expect(getCircleLength(80)).toBeCloseTo(502.654);
    expect(getCircleLength(90)).toBeCloseTo(565.486);
    expect(getCircleLength(100)).toBeCloseTo(628.318);
  });

  it("trimTopLanguages", () => {
    expect(trimTopLanguages([])).toStrictEqual({
      langs: [],
      totalLanguageSize: 0,
    });
    expect(trimTopLanguages([langs.javascript])).toStrictEqual({
      langs: [langs.javascript],
      totalLanguageSize: 200,
    });
    expect(
      trimTopLanguages([langs.javascript, langs.HTML], 5, []),
    ).toStrictEqual({
      langs: [langs.javascript, langs.HTML],
      totalLanguageSize: 400,
    });
    expect(trimTopLanguages(langs, 5, [])).toStrictEqual({
      langs: Object.values(langs),
      totalLanguageSize: 500,
    });
    expect(trimTopLanguages(langs, 2, [])).toStrictEqual({
      langs: Object.values(langs).slice(0, 2),
      totalLanguageSize: 400,
    });
    expect(trimTopLanguages(langs, 5, ["javascript"])).toStrictEqual({
      langs: [langs.HTML, langs.css],
      totalLanguageSize: 300,
    });
  });

  it("getDefaultLanguagesCountByLayout", () => {
    expect(
      getDefaultLanguagesCountByLayout({ layout: "normal" }),
    ).toStrictEqual(5);
    expect(getDefaultLanguagesCountByLayout({})).toStrictEqual(5);
    expect(
      getDefaultLanguagesCountByLayout({ layout: "compact" }),
    ).toStrictEqual(6);
    expect(
      getDefaultLanguagesCountByLayout({ hide_progress: true }),
    ).toStrictEqual(6);
    expect(getDefaultLanguagesCountByLayout({ layout: "donut" })).toStrictEqual(
      5,
    );
    expect(
      getDefaultLanguagesCountByLayout({ layout: "donut-vertical" }),
    ).toStrictEqual(6);
    expect(getDefaultLanguagesCountByLayout({ layout: "pie" })).toStrictEqual(
      6,
    );
  });
});

describe("Test renderTopLanguages", () => {
  it("should render correctly", () => {
    document.body.innerHTML = renderTopLanguages(langs);

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "40%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "40%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "20%",
    );
  });

  it("should hide languages when hide is passed", () => {
    document.body.innerHTML = renderTopLanguages(langs, {
      hide: ["HTML"],
    });
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).toBeInTheDocument(
      "css",
    );
    expect(queryAllByTestId(document.body, "lang-name")[2]).not.toBeDefined();

    // multiple languages passed
    document.body.innerHTML = renderTopLanguages(langs, {
      hide: ["HTML", "css"],
    });
    expect(queryAllByTestId(document.body, "lang-name")[0]).toBeInTheDocument(
      "javascript",
    );
    expect(queryAllByTestId(document.body, "lang-name")[1]).not.toBeDefined();
  });

  it("should resize the height correctly depending on langs", () => {
    document.body.innerHTML = renderTopLanguages(langs, {});
    expect(document.querySelector("svg")).toHaveAttribute("height", "205");

    document.body.innerHTML = renderTopLanguages(
      {
        ...langs,
        python: {
          color: "#ff0",
          name: "python",
          size: 100,
        },
      },
      {},
    );
    expect(document.querySelector("svg")).toHaveAttribute("height", "245");
  });

  it("should render with custom width set", () => {
    document.body.innerHTML = renderTopLanguages(langs, {});

    expect(document.querySelector("svg")).toHaveAttribute("width", "300");

    document.body.innerHTML = renderTopLanguages(langs, { card_width: 400 });
    expect(document.querySelector("svg")).toHaveAttribute("width", "400");
  });

  it("should render with min width", () => {
    document.body.innerHTML = renderTopLanguages(langs, { card_width: 190 });

    expect(document.querySelector("svg")).toHaveAttribute(
      "width",
      MIN_CARD_WIDTH.toString(),
    );

    document.body.innerHTML = renderTopLanguages(langs, { card_width: 100 });
    expect(document.querySelector("svg")).toHaveAttribute(
      "width",
      MIN_CARD_WIDTH.toString(),
    );
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderTopLanguages(langs);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".lang-name "];

    expect(headerStyles.fill.trim()).toBe("#2f80ed");
    expect(langNameStyles.fill.trim()).toBe("#434d58");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fffefe",
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderTopLanguages(langs, { ...customColors });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".lang-name "];

    expect(headerStyles.fill.trim()).toBe(`#${customColors.title_color}`);
    expect(langNameStyles.fill.trim()).toBe(`#${customColors.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderTopLanguages(langs, {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".lang-name "];

    expect(headerStyles.fill.trim()).toBe("#5a0");
    expect(langNameStyles.fill.trim()).toBe(`#${themes.radical.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderTopLanguages(langs, {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerStyles = stylesObject[":host"][".header "];
      const langNameStyles = stylesObject[":host"][".lang-name "];

      expect(headerStyles.fill.trim()).toBe(`#${themes[name].title_color}`);
      expect(langNameStyles.fill.trim()).toBe(`#${themes[name].text_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
    });
  });

  it("should render with layout compact", () => {
    document.body.innerHTML = renderTopLanguages(langs, { layout: "compact" });

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "100",
    );

    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "100",
    );

    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css 20.00%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "50",
    );
  });

  it("should render with layout donut", () => {
    document.body.innerHTML = renderTopLanguages(langs, { layout: "donut" });

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[0]).toHaveAttribute(
      "size",
      "40",
    );
    const d = getNumbersFromSvgPathDefinitionAttribute(
      queryAllByTestId(document.body, "lang-donut")[0].getAttribute("d"),
    );
    const center = { x: d[7], y: d[7] };
    const HTMLLangPercent = langPercentFromDonutLayoutSvg(
      queryAllByTestId(document.body, "lang-donut")[0].getAttribute("d"),
      center.x,
      center.y,
    );
    expect(HTMLLangPercent).toBeCloseTo(40);

    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[1]).toHaveAttribute(
      "size",
      "40",
    );
    const javascriptLangPercent = langPercentFromDonutLayoutSvg(
      queryAllByTestId(document.body, "lang-donut")[1].getAttribute("d"),
      center.x,
      center.y,
    );
    expect(javascriptLangPercent).toBeCloseTo(40);

    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css 20.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[2]).toHaveAttribute(
      "size",
      "20",
    );
    const cssLangPercent = langPercentFromDonutLayoutSvg(
      queryAllByTestId(document.body, "lang-donut")[2].getAttribute("d"),
      center.x,
      center.y,
    );
    expect(cssLangPercent).toBeCloseTo(20);

    expect(HTMLLangPercent + javascriptLangPercent + cssLangPercent).toBe(100);

    // Should render full donut (circle) if one language is 100%.
    document.body.innerHTML = renderTopLanguages(
      { HTML: langs.HTML },
      { layout: "donut" },
    );
    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 100.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[0]).toHaveAttribute(
      "size",
      "100",
    );
    expect(queryAllByTestId(document.body, "lang-donut")).toHaveLength(1);
    expect(queryAllByTestId(document.body, "lang-donut")[0].tagName).toBe(
      "circle",
    );
  });

  it("should render with layout donut vertical", () => {
    document.body.innerHTML = renderTopLanguages(langs, {
      layout: "donut-vertical",
    });

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[0]).toHaveAttribute(
      "size",
      "40",
    );

    const totalCircleLength = queryAllByTestId(
      document.body,
      "lang-donut",
    )[0].getAttribute("stroke-dasharray");

    const HTMLLangPercent = langPercentFromDonutVerticalLayoutSvg(
      queryAllByTestId(document.body, "lang-donut")[1].getAttribute(
        "stroke-dashoffset",
      ) -
        queryAllByTestId(document.body, "lang-donut")[0].getAttribute(
          "stroke-dashoffset",
        ),
      totalCircleLength,
    );
    expect(HTMLLangPercent).toBeCloseTo(40);

    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[1]).toHaveAttribute(
      "size",
      "40",
    );
    const javascriptLangPercent = langPercentFromDonutVerticalLayoutSvg(
      queryAllByTestId(document.body, "lang-donut")[2].getAttribute(
        "stroke-dashoffset",
      ) -
        queryAllByTestId(document.body, "lang-donut")[1].getAttribute(
          "stroke-dashoffset",
        ),
      totalCircleLength,
    );
    expect(javascriptLangPercent).toBeCloseTo(40);

    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css 20.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[2]).toHaveAttribute(
      "size",
      "20",
    );
    const cssLangPercent = langPercentFromDonutVerticalLayoutSvg(
      totalCircleLength -
        queryAllByTestId(document.body, "lang-donut")[2].getAttribute(
          "stroke-dashoffset",
        ),
      totalCircleLength,
    );
    expect(cssLangPercent).toBeCloseTo(20);

    expect(HTMLLangPercent + javascriptLangPercent + cssLangPercent).toBe(100);
  });

  it("should render with layout donut vertical full donut circle of one language is 100%", () => {
    document.body.innerHTML = renderTopLanguages(
      { HTML: langs.HTML },
      { layout: "donut-vertical" },
    );
    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 100.00%",
    );
    expect(queryAllByTestId(document.body, "lang-donut")[0]).toHaveAttribute(
      "size",
      "100",
    );
    const totalCircleLength = queryAllByTestId(
      document.body,
      "lang-donut",
    )[0].getAttribute("stroke-dasharray");

    const HTMLLangPercent = langPercentFromDonutVerticalLayoutSvg(
      totalCircleLength -
        queryAllByTestId(document.body, "lang-donut")[0].getAttribute(
          "stroke-dashoffset",
        ),
      totalCircleLength,
    );
    expect(HTMLLangPercent).toBeCloseTo(100);
  });

  it("should render with layout pie", () => {
    document.body.innerHTML = renderTopLanguages(langs, { layout: "pie" });

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Most Used Languages",
    );

    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-pie")[0]).toHaveAttribute(
      "size",
      "40",
    );

    const d = getNumbersFromSvgPathDefinitionAttribute(
      queryAllByTestId(document.body, "lang-pie")[0].getAttribute("d"),
    );
    const center = { x: d[0], y: d[1] };
    const HTMLLangPercent = langPercentFromPieLayoutSvg(
      queryAllByTestId(document.body, "lang-pie")[0].getAttribute("d"),
      center.x,
      center.y,
    );
    expect(HTMLLangPercent).toBeCloseTo(40);

    expect(queryAllByTestId(document.body, "lang-name")[1]).toHaveTextContent(
      "javascript 40.00%",
    );
    expect(queryAllByTestId(document.body, "lang-pie")[1]).toHaveAttribute(
      "size",
      "40",
    );
    const javascriptLangPercent = langPercentFromPieLayoutSvg(
      queryAllByTestId(document.body, "lang-pie")[1].getAttribute("d"),
      center.x,
      center.y,
    );
    expect(javascriptLangPercent).toBeCloseTo(40);

    expect(queryAllByTestId(document.body, "lang-name")[2]).toHaveTextContent(
      "css 20.00%",
    );
    expect(queryAllByTestId(document.body, "lang-pie")[2]).toHaveAttribute(
      "size",
      "20",
    );
    const cssLangPercent = langPercentFromPieLayoutSvg(
      queryAllByTestId(document.body, "lang-pie")[2].getAttribute("d"),
      center.x,
      center.y,
    );
    expect(cssLangPercent).toBeCloseTo(20);

    expect(HTMLLangPercent + javascriptLangPercent + cssLangPercent).toBe(100);

    // Should render full pie (circle) if one language is 100%.
    document.body.innerHTML = renderTopLanguages(
      { HTML: langs.HTML },
      { layout: "pie" },
    );
    expect(queryAllByTestId(document.body, "lang-name")[0]).toHaveTextContent(
      "HTML 100.00%",
    );
    expect(queryAllByTestId(document.body, "lang-pie")[0]).toHaveAttribute(
      "size",
      "100",
    );
    expect(queryAllByTestId(document.body, "lang-pie")).toHaveLength(1);
    expect(queryAllByTestId(document.body, "lang-pie")[0].tagName).toBe(
      "circle",
    );
  });

  it("should render a translated title", () => {
    document.body.innerHTML = renderTopLanguages(langs, { locale: "cn" });
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "最常用的语言",
    );
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderTopLanguages(langs, { border_radius: "0" });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderTopLanguages(langs, {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });

  it("should render langs with specified langs_count", () => {
    const options = {
      langs_count: 1,
    };
    document.body.innerHTML = renderTopLanguages(langs, { ...options });
    expect(queryAllByTestId(document.body, "lang-name").length).toBe(
      options.langs_count,
    );
  });

  it("should render langs with specified langs_count even when hide is set", () => {
    const options = {
      hide: ["HTML"],
      langs_count: 2,
    };
    document.body.innerHTML = renderTopLanguages(langs, { ...options });
    expect(queryAllByTestId(document.body, "lang-name").length).toBe(
      options.langs_count,
    );
  });

  it('should show "No languages data." message instead of empty card when nothing to show', () => {
    document.body.innerHTML = renderTopLanguages({});
    expect(document.querySelector(".stat").textContent).toBe(
      "No languages data.",
    );
  });
});
