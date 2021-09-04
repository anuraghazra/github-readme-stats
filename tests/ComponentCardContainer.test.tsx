import "@testing-library/jest-dom";
import cssToObject from "css-to-object";
import { getCardColors } from "../src/utils/render";
import icons from "../src/icons/github";
import { queryByTestId } from "@testing-library/dom";
import { CardError } from "../src/helpers/Error";
import SVGRender, { render } from "../src/helpers/SVGRender";
import CardContainer from "../src/components/CardContainer";
import Error from "../src/components/Error";

describe("ComponentCardContainer", () => {
  it("should hide border", () => {
    document.body.innerHTML = render(
      <CardContainer hideBorder={true}></CardContainer>,
    );
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "stroke-opacity",
      "0",
    );
  });

  it("should not hide border", () => {
    document.body.innerHTML = render(
      <CardContainer hideBorder={false}></CardContainer>,
    );
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "stroke-opacity",
      "1",
    );
  });

  it("should have a custom title", () => {
    document.body.innerHTML = render(
      <CardContainer
        customTitle="custom title"
        defaultTitle="default title"
      ></CardContainer>,
    );
    expect(queryByTestId(document.body, "card-title")).toHaveTextContent(
      "custom title",
    );
  });

  it("should hide title", () => {
    document.body.innerHTML = render(<CardContainer hideTitle></CardContainer>);
    expect(queryByTestId(document.body, "card-title")).toBeNull();
  });

  it("should not hide title", () => {
    document.body.innerHTML = render(
      <CardContainer hideTitle={false}></CardContainer>,
    );
    expect(queryByTestId(document.body, "card-title")).toBeInTheDocument();
  });

  it("title should have prefix icon", () => {
    document.body.innerHTML = render(
      <CardContainer
        defaultTitle="ok"
        titlePrefixIcon={icons.contribs}
      ></CardContainer>,
    );

    expect(document.getElementsByClassName("icon")[0]).toBeInTheDocument();
  });

  it("title should not have prefix icon", () => {
    document.body.innerHTML = render(
      <CardContainer defaultTitle="ok"></CardContainer>,
    );
    expect(document.getElementsByClassName("icon")[0]).toBeUndefined();
  });

  it("should have proper height, width", () => {
    document.body.innerHTML = render(
      <CardContainer
        height={200}
        width={200}
        defaultTitle="ok"
      ></CardContainer>,
    );

    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "200",
    );
    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "200",
    );
  });

  it("should have less height after title is hidden", () => {
    document.body.innerHTML = render(
      <CardContainer height={200} defaultTitle="ok" hideTitle></CardContainer>,
    );

    expect(document.getElementsByTagName("svg")[0]).toHaveAttribute(
      "height",
      "170",
    );
  });

  it("main-card-body should have proper when title is visible", () => {
    document.body.innerHTML = render(
      <CardContainer height={200}></CardContainer>,
    );
    expect(queryByTestId(document.body, "main-card-body")).toHaveAttribute(
      "transform",
      "translate(0, 55)",
    );
  });

  it("main-card-body should have proper position after title is hidden", () => {
    document.body.innerHTML = render(
      <CardContainer height={200} hideTitle></CardContainer>,
    );

    expect(queryByTestId(document.body, "main-card-body")).toHaveAttribute(
      "transform",
      "translate(0, 25)",
    );
  });

  it("should render with correct colors", () => {
    // returns theme based colors with proper overrides and defaults
    const { titleColor, textColor, iconColor, bgColor, borderColor } =
      getCardColors({
        title_color: "f00",
        icon_color: "0f0",
        text_color: "00f",
        bg_color: "fff",
        theme: "default",
      });

    document.body.innerHTML = render(
      <CardContainer
        height={200}
        colors={{
          titleColor,
          textColor,
          iconColor,
          bgColor,
          borderColor,
        }}
      ></CardContainer>,
    );

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag?.innerHTML);
    const primaryFill = stylesObject[".primary-fill"];

    expect(primaryFill.fill).toBe("#f00");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fff",
    );
  });
  it("should render gradient backgrounds", () => {
    const { titleColor, textColor, iconColor, bgColor, borderColor } =
      getCardColors({
        title_color: "f00",
        icon_color: "0f0",
        text_color: "00f",
        bg_color: "90,fff,000,f00",
        theme: "default",
      });

    document.body.innerHTML = render(
      <CardContainer
        height={200}
        colors={{
          titleColor,
          textColor,
          iconColor,
          bgColor,
          borderColor,
        }}
      ></CardContainer>,
    );
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "url(#gradient)",
    );
    expect(document.querySelector("defs linearGradient")).toHaveAttribute(
      "gradientTransform",
      "rotate(90)",
    );
    expect(
      document.querySelector("defs linearGradient stop:nth-child(1)"),
    ).toHaveAttribute("stop-color", "#fff");
    expect(
      document.querySelector("defs linearGradient stop:nth-child(2)"),
    ).toHaveAttribute("stop-color", "#000");
    expect(
      document.querySelector("defs linearGradient stop:nth-child(3)"),
    ).toHaveAttribute("stop-color", "#f00");
  });
});

describe("renderError", () => {
  it("should render correct content", () => {
    document.body.innerHTML = render(
      <Error error={new CardError("Something went wrong")}></Error>,
    );
    expect(
      queryByTestId(document.body, "message")?.children[0],
    ).toHaveTextContent(/Something went wrong/gim);
    expect(
      queryByTestId(document.body, "message")?.children[1],
    ).toBeEmptyDOMElement();

    // Secondary message
    document.body.innerHTML = render(
      <Error
        error={new CardError("Something went wrong", "Secondary Message")}
      ></Error>,
    );
    expect(
      queryByTestId(document.body, "message")?.children[1],
    ).toHaveTextContent(/Secondary Message/gim);
  });
});
