import { CardError } from "../helpers/Error";
import SVGRender from "../helpers/SVGRender";
import { encodeHTML } from "../utils/string";

interface Props {
  error: Error;
}
const Error: SVGRender.FunctionComponent<Props> = ({ error }) => {
  return (
    <svg
      width="495"
      height="120"
      viewBox="0 0 495 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={`
        .text {
          font: 600 16px "Segoe UI", Ubuntu, Sans-Serif;
          fill: #2f80ed;
        }
        .small {
          font: 600 12px "Segoe UI", Ubuntu, Sans-Serif;
          fill: #252525;
        }
        .gray {
          fill: #858585;
        }
      `}
    >
      <rect
        x="0.5"
        y="0.5"
        width="494"
        height="99%"
        rx="4.5"
        fill="#FFFEFE"
        stroke="#E4E2E2"
      />
      <text x="25" y="45" class="text">
        Something went wrong! file an issue at https://git.io/JJmN9
      </text>
      <text data-testid="message" x="25" y="55" class="text small">
        <tspan x="25" dy="18">
          {encodeHTML(error.message)}
        </tspan>
        <tspan x="25" dy="18" class="gray">
          {error.secondaryMessage}
        </tspan>
      </text>
    </svg>
  );
};

export default Error;
