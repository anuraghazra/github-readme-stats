import("@testing-library/jest-dom");
import { queryByTestId } from "@testing-library/dom";
import SVGRender, { isValidElement, render } from "../src/helpers/SVGRender";

describe("HelperSVGRender", () => {
  describe("createElement", () => {
    describe("IntrinsicElements", () => {
      it("should work", () => {
        const element = <circle fill="#333" stroke-width={6} opacity={0.2} />;

        expect(element.content).toBe(
          `<circle fill="#333" stroke-width="6" opacity="0.2"></circle>`,
        );
      });
      it("should concat pairs with ';' when prop value is a object", () => {
        const element = (
          <circle
            data-testid="circle"
            style={{
              fill: "#333",
              "stroke-width": 6,
              opacity: 0.2,
            }}
          />
        );

        document.body.innerHTML = element.content;
        const circle = queryByTestId(document.body, "circle");
        expect(circle?.style?.cssText).toBe(
          `fill: #333; stroke-width: 6; opacity: 0.2;`,
        );
      });

      it("should pop css to closest svg style element", () => {
        const color = "#333";
        const element = (
          <svg>
            <text>Hello World</text>
            <svg>
              <g
                css={`
                  .center {
                    transform: translate(0, 20);
                  }
                `}
              >
                <text
                  data-testid="text"
                  css={`
                    .primary-fill {
                      color: ${color};
                    }
                  `}
                >
                  {new Date().toLocaleDateString()}
                </text>
              </g>
            </svg>
          </svg>
        );

        document.body.innerHTML = element.content;
        const style = document.querySelectorAll("svg>style");
        expect(style).toHaveLength(2);
        expect(style[0]).toHaveTextContent(``);
        expect(style[1]).toHaveTextContent(
          `center { transform: translate(0, 20); } .primary-fill { color: #333; }`,
        );
      });
    });

    describe("FunctionComponent", () => {
      interface Props {
        backgroundColor: string;
        fontColor: string;
      }
      const Button: SVGRender.FunctionComponent<Props> = (
        { backgroundColor, fontColor },
        children,
      ) => {
        return (
          <rect fill={backgroundColor} width="300" height="40">
            <text
              fill={fontColor}
              alignment-baseline="central"
              dominant-baseline="central"
              text-anchor="middle"
            >
              {children}
            </text>
          </rect>
        );
      };

      const Container: SVGRender.FunctionComponent<{
        title: string;
      }> = ({ title }, children) => {
        return (
          <g>
            <text
              x="0"
              y="0"
              style={{
                font: "600 18px 'Segoe UI', Ubuntu, Sans-Serif",
              }}
              class="primary-fill"
            >
              {title}
            </text>
            <g transform={`translate(0, 20)`}>{children}</g>
          </g>
        );
      };

      it("should pass props and children to component", () => {
        const element = (
          <Button backgroundColor="#096dd9" fontColor="#fff">
            Click me!
          </Button>
        );

        expect(element.content).toBe(
          `<rect fill="#096dd9" width="300" height="40"><text fill="#fff" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">Click me!</text></rect>`,
        );
      });

      it("should work with multiple child", () => {
        const icon = "🔴";
        const element = (
          <Button backgroundColor="#096dd9" fontColor="#fff">
            {icon}
            Click me!
          </Button>
        );

        expect(element.content).toBe(
          `<rect fill="#096dd9" width="300" height="40"><text fill="#fff" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">🔴Click me!</text></rect>`,
        );
      });

      it("should work with nesting elements", () => {
        const element = (
          <svg>
            <Container title="Game">
              <text fill="#333">
                Play the classic game, or mix it up with an all-new action mode:
                fireballs, blasters, gravity wells, and more!
              </text>
              <Button backgroundColor="#096dd9" fontColor="#fff">
                Start
              </Button>
            </Container>
          </svg>
        );

        expect(element.content).toBe(
          `<svg><style></style><g><text x="0" y="0" style="font:600 18px 'Segoe UI', Ubuntu, Sans-Serif" class="primary-fill">Game</text><g transform="translate(0, 20)"><text fill="#333">Play the classic game, or mix it up with an all-new action mode: fireballs, blasters, gravity wells, and more!</text><rect fill="#096dd9" width="300" height="40"><text fill="#fff" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">Start</text></rect></g></g></svg>`,
        );
      });
    });
  });

  describe("isValidElement", () => {
    it("should return true when input SVGElement", () => {
      expect(isValidElement(<svg></svg>)).toBe(true);
    });
    it("should return false when input null or undefined", () => {
      expect(isValidElement(null)).toBe(false);
      expect(isValidElement(undefined)).toBe(false);
    });

    it("should return false when input plain object", () => {
      expect(
        isValidElement({
          content: "abc",
          css: [
            `.a {
                fill: #333;
            }`,
          ],
          $$symbol: Symbol.for("SVGElement"),
        }),
      ).toBe(false);
    });
  });

  describe("render", () => {
    it("should return content when input SVGElement", () => {
      expect(
        render(
          <svg>
            <rect
              x="0.5"
              y="0.5"
              width="200"
              height="100"
              rx="5"
              fill="#333"
              stroke="#E4E2E2"
            />
            <text x="25" y="45" class="text">
              Hello world
            </text>
          </svg>,
        ),
      ).toBe(
        `<svg><style></style><rect x="0.5" y="0.5" width="200" height="100" rx="5" fill="#333" stroke="#E4E2E2"></rect><text x="25" y="45" class="text">Hello world</text></svg>`,
      );
    });

    it("should return string when input string", () => {
      expect(render(`<svg></svg>`)).toBe("<svg></svg>");
    });
  });
});
