import FlexLayout from "./FlexLayout";
import SVGRender from "../helpers/SVGRender";
import { encodeHTML } from "../utils/string";

export interface CardColors {
  titleColor: string;
  textColor: string;
  iconColor: string;
  bgColor: string | string[];
  borderColor: string;
}

const getGlobalStyles = (colors: CardColors) => {
  const { titleColor, textColor, iconColor } = colors;
  return `
      .font-bold { font-weight: 700 }
      .fadeIn {
        opacity: 0;
        animation: fadeInAnimation 0.3s ease-in-out forwards;
      }
  
      .icon {
        fill: ${iconColor};
      }
      .primary-stroke {
        stroke: ${titleColor}
      }
      .primary-fill {
        fill: ${titleColor}
      }
      .text-fill {
        fill: ${textColor}
      }
      .text-stroke {
        stroke: ${textColor}
      }

    @keyframes scaleInAnimation {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeInAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }`;
};

function Gradient({ colors }: { colors: CardColors }) {
  const { bgColor } = colors;
  if (typeof bgColor !== "object") return "";

  const gradients = bgColor.slice(1);
  return typeof bgColor === "object" ? (
    <defs>
      <linearGradient id="gradient" gradientTransform={`rotate(${bgColor[0]})`}>
        $
        {gradients.map((grad, index) => {
          const offset = (index * 100) / (gradients.length - 1);
          return <stop offset={`${offset}%`} stop-color={`#${grad}`} />;
        })}
      </linearGradient>
    </defs>
  ) : null;
}

function Title({
  title,
  icon,
  paddingX,
  paddingY,
}: {
  title: string;
  icon?: string;
  paddingX: number;
  paddingY: number;
}) {
  const titleText = (
    <text
      x="0"
      y="0"
      data-testid="header"
      style={{
        animation: "fadeInAnimation 0.8s ease-in-out forwards",
        font: "600 18px 'Segoe UI', Ubuntu, Sans-Serif",
      }}
      class="primary-fill"
    >
      {title}
    </text>
  );

  const prefixIcon = icon ? (
    <svg
      class="icon"
      x="0"
      y="-13"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
    >
      {icon}
    </svg>
  ) : null;

  const content = (
    <FlexLayout gap={25} items={[prefixIcon, titleText]}></FlexLayout>
  );
  return (
    <g
      data-testid="card-title"
      transform={`translate(${paddingX}, ${paddingY})`}
    >
      {content}
    </g>
  );
}

interface Props {
  width?: number;
  height?: number;
  colors?: CardColors;
  borderRadius?: number;
  hideBorder?: boolean;
  hideTitle?: boolean;
  isDisableAnimation?: boolean;
  titlePrefixIcon?: string;
  customTitle?: string;
  defaultTitle?: string;
}

const CardContainer: SVGRender.FunctionComponent<Props> = (
  {
    width = 100,
    height = 100,
    borderRadius = 4.5,
    colors = {
      titleColor: "",
      textColor: "",
      iconColor: "",
      bgColor: "",
      borderColor: "",
    },
    hideBorder,
    hideTitle,
    isDisableAnimation = false,
    titlePrefixIcon,
    customTitle,
    defaultTitle = "",
  }: Props,
  children,
) => {
  const { borderColor, bgColor } = colors;
  const cardHeight = (height -= hideTitle ? 30 : 0);
  return (
    <svg
      width={width}
      height={cardHeight}
      viewBox={`0 0 ${width} ${cardHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={`
        ${getGlobalStyles(colors)}
        ${isDisableAnimation === true
          ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
          : ""}
      `}
    >
      <Gradient colors={colors} />

      <rect
        data-testid="card-bg"
        x="0.5"
        y="0.5"
        rx={borderRadius}
        height="99%"
        stroke={borderColor}
        width={width - 1}
        fill={typeof bgColor === "object" ? "url(#gradient)" : bgColor}
        stroke-opacity={hideBorder ? 0 : 1}
      />

      {hideTitle ? null : (
        <Title
          title={encodeHTML(customTitle ?? defaultTitle)}
          icon={titlePrefixIcon}
          paddingX={25}
          paddingY={35}
        />
      )}

      <g
        data-testid="main-card-body"
        transform={`translate(0, ${hideTitle ? 25 : 20 + 35})`}
      >
        {children}
      </g>
    </svg>
  );
};

export default CardContainer;
