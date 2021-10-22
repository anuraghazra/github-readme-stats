/**
 * @param {number} value
 */
const calculateCircleProgress = (value) => {
  const radius = 40;
  const c = Math.PI * (radius * 2);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  return ((100 - value) / 100) * c;
};

/**
 *
 * @param {{progress: number}} param0
 * @returns
 */
const getProgressAnimation = ({ progress }) => {
  return `
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: ${calculateCircleProgress(0)};
      }
      to {
        stroke-dashoffset: ${calculateCircleProgress(progress)};
      }
    }
  `;
};

const getAnimations = () => {
  return `
    /* Animations */
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
    }
  `;
};

/**
 * @param {{
 *  titleColor: string;
 *  textColor: string;
 *  iconColor: string;
 *  show_icons: boolean;
 *  progress: number;
 * }} args
 */
const getStyles = ({
  titleColor,
  textColor,
  iconColor,
  show_icons,
  progress,
  label_bold,
  value_bold,
  rank_bold
}) => {
  return `
    .stat-label {
      font: 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
      font-weight: ${label_bold ? 700 : 600};
    }
    .stat-value {
      font: 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
      font-weight: ${value_bold ? 700 : 600};
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; 
      font-weight: ${rank_bold ? 800 : 600};
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    .icon {
      fill: ${iconColor};
      display: ${!!show_icons ? "block" : "none"};
    }
    
    .rank-circle-rim {
      stroke: ${titleColor};
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: ${titleColor};
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    ${process.env.NODE_ENV === "test" ? "" : getProgressAnimation({ progress })}
  `;
};

module.exports = { getStyles, getAnimations };
