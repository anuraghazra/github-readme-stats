import { kFormatter } from "../utils/string";
import SVGRender from "../helpers/SVGRender";

interface Props {
  id: string;
  icon: string;
  label: string;
  value: number;
  index: number;
  showIcons: boolean;
  shiftValuePos: number;
}

export default function StatRow({
  icon,
  label,
  value,
  index,
  showIcons,
  shiftValuePos,
  id,
}: Props): SVGRender.SVGElement {
  const kValue = kFormatter(value);
  const fadeInDelay = (index + 3) * 150;

  const iconSvg = showIcons ? (
    <svg
      data-testid="icon"
      class="icon"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
    >
      {icon}
    </svg>
  ) : null;
  return (
    <g
      class="fadeIn"
      style={{ "animation-delay": `${fadeInDelay}ms` }}
      transform="translate(25, 0)"
    >
      {iconSvg}
      <text
        class="text-fill font-bold font-sans"
        x={showIcons ? 25 : 0}
        y="12.5"
      >
        {label}:
      </text>
      <text
        class="text-fill font-semibold font-sans"
        x={(showIcons ? 140 : 120) + shiftValuePos}
        y="12.5"
        data-testid={id}
      >
        {kValue}
      </text>
    </g>
  );
}
