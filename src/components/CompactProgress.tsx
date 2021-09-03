import SVGRender from "../helpers/SVGRender";
import LanguageLabel from "./LanguageLabel";
export const getLayoutHeight = (count: number) => {
  return 90 + Math.round(count / 2) * 25;
};

interface Props {
  items: Array<{
    size: number;
    color?: string | null;
    name: string;
    [_: string]: any;
  }>;
  width: number;
  showLangInfo?: boolean;
  langInfoSpace?: number;
  langLabelFormatter?: (x: Props["items"][0]) => string;
  defaultTotalSize?: number;
}

const CompactProgress: SVGRender.FunctionComponent<Props> = ({
  items,
  width,
  showLangInfo = true,
  langInfoSpace = 150,
  langLabelFormatter,
}) => {
  // progressOffset holds the previous language's width and used to offset the next language
  // so that we can stack them one after another, like this: [--][----][---]
  let progressOffset = 0;
  const totalSize = items.reduce((acc, curr) => acc + curr.size, 0);
  const compactProgressBar = items.map((lang) => {
    const progress = parseFloat(((lang.size / totalSize) * width).toFixed(2));

    const output = (
      <rect
        mask="url(#rect-mask)"
        data-testid="lang-progress"
        x={progressOffset}
        y="0"
        width={progress}
        height="8"
        fill={lang.color || "#858585"}
      ></rect>
    );
    progressOffset += progress;
    return output;
  });
  const compactLangInfo = showLangInfo
    ? items.map((lang, index) => {
        const percentage = ((lang.size / totalSize) * 100).toFixed(2);
        const color = lang.color || "#858585";
        const x = index % 2 === 0 ? 0 : langInfoSpace;
        const y = index % 2 === 0 ? 12.5 * index + 25 : 12.5 * (index + 1);

        return (
          <LanguageLabel
            x={x}
            y={y}
            color={color}
            name={langLabelFormatter?.(lang) ?? `${lang.name} ${percentage}%`}
            size="small"
          />
        );
      })
    : null;
  return (
    <g>
      <mask id="rect-mask">
        <rect x="0" y="0" width={width} height="8" fill="white" rx="5" />
      </mask>
      {compactProgressBar}
      {compactLangInfo}
    </g>
  );
};

export default {
  component: CompactProgress,
  getHeight: getLayoutHeight,
};
