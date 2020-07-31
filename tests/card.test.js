require("@testing-library/jest-dom");
const cssToObject = require("css-to-object");
const Card = require("../src/Card");
const icons = require("../src/icons");
const { getCardColors } = require("../src/utils");
const { queryByTestId } = require("@testing-library/dom");

describe("Card", () => {
  it("should hide border", () => {
    const card = new Card({});
    card.setHideBorder(true);

    document.body.innerHTML = card.render(``);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "stroke-opacity",
      "0"
    );
  });

  it("should not hide border", () => {
    const card = new Card({});
    card.setHideBorder(false);

    document.body.innerHTML = card.render(``);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "stroke-opacity",
      "1"
    );
  });

  it("should hide title", () => {
    const card = new Card({});
    card.setHideTitle(true);

    document.body.innerHTML = card.render(``);
    expect(queryByTestId(document.body, "card-title")).toBeNull();
  });

  it("should not hide title", () => {
    const card = new Card({});
    card.setHideTitle(false);

    document.body.innerHTML = card.render(``);
    expect(queryByTestId(document.body, "card-title")).toBeInTheDocument();
  });

  it("title should have prefix icon", () => {
    const card = new Card({ title: "ok", titlePrefixIcon: icons.contribs });

    document.body.innerHTML = card.render(``);
    expect(document.getElementsByClassName("icon")[0]).toBeInTheDocument();
  });

  it("title should not have prefix icon", () => {
    const card = new Card({ title: "ok" });

    document.body.innerHTML = card.render(``);
    expect(document.getElementsByClassName("icon")[0]).toBeUndefined();
  });

  it("should have proper height, width", () => {
    const card = new Card({ height: 200, width: 200, title: "ok" });
    document.body.innerHTML = card.render(``);
    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "200"
    );
    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "200"
    );
  });

  it("should have less height after title is hidden", () => {
    const card = new Card({ height: 200, title: "ok" });
    card.setHideTitle(true);

    document.body.innerHTML = card.render(``);
    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "170"
    );
  });

  it("main-card-body should have proper when title is visible", () => {
    const card = new Card({ height: 200 });
    document.body.innerHTML = card.render(``);
    expect(queryByTestId(document.body, "main-card-body")).toHaveAttribute(
      "transform",
      "translate(0, 55)"
    );
  });

  it("main-card-body should have proper position after title is hidden", () => {
    const card = new Card({ height: 200 });
    card.setHideTitle(true);

    document.body.innerHTML = card.render(``);
    expect(queryByTestId(document.body, "main-card-body")).toHaveAttribute(
      "transform",
      "translate(0, 25)"
    );
  });

  it("should render with correct colors", () => {
    // returns theme based colors with proper overrides and defaults
    const { titleColor, textColor, iconColor, bgColor } = getCardColors({
      title_color: "f00",
      icon_color: "0f0",
      text_color: "00f",
      bg_color: "fff",
      theme: "default",
    });

    const card = new Card({
      height: 200,
      colors: {
        titleColor,
        textColor,
        iconColor,
        bgColor,
      },
    });
    document.body.innerHTML = card.render(``);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);
    const headerClassStyles = stylesObject[".header"];

    expect(headerClassStyles.fill).toBe("#f00");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fff"
    );
  });
});
