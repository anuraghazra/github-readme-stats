const calculateCircleProgress = (value) => {
  let radius = 40;
  let c = Math.PI * (radius * 2);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  let percentage = ((100 - value) / 100) * c;
  return percentage;
};

const getAnimations = ({ progress }) => {
  return `
    /* Animations */
    @keyframes scaleIn {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
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

const getStyles = ({
  titleColor,
  textColor,
  iconColor,
  show_icons,
  progress,
}) => {
  return `
    .header {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; 
      animation: fadeIn 0.8s ease-in-out forwards;
    }
    .stat { 
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
    }
    .stagger { 
      opacity: 0;
      animation: fadeIn 0.3s ease-in-out forwards;
    }
    .rank-text { 
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; 
      animation: scaleIn 0.3s ease-in-out forwards;
    }
    
    .bold { font-weight: 700 }
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

    @media (prefers-color-scheme: dark) {
      .stat { fill: white; }
      .rank-text { fill: white; }
      [data-testid="card-bg"] {
        fill: black;
      }
    }
    ${process.env.NODE_ENV === "test" ? "" : getAnimations({ progress })}
  `;
};

module.exports = getStyles;
