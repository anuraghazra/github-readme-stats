const calculateCircleProgress = (value) => {
  let radius = 40;
  let c = Math.PI * (radius * 2);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  let percentage = ((100 - value) / 100) * c;
  return percentage;
};

const getAnimations = ({ progress }) => `
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

const getFontStyle = ({ weight, size }) =>
  `font: ${weight} ${size}px 'Segoe UI', Ubuntu, Sans-Serif;`;

const getFontFillStyle = ({ weight, size, fillColor }) =>
  `${getFontStyle({ weight, size })} fill: ${fillColor};`;

const getTopLangsStyles = ({
  textColor,
  titleColor,
}) => `.header { ${getFontFillStyle({
  weight: 600,
  size: 18,
  fillColor: titleColor,
})} }
.lang-name { ${getFontFillStyle({
  weight: 400,
  size: 11,
  fillColor: textColor,
})} }`;

const getRepoCardStyles = ({
  titleColor,
  textColor,
  iconColor,
}) => `.header { ${getFontFillStyle({
  weight: 600,
  size: 18,
  fillColor: titleColor,
})} }
.description { ${getFontFillStyle({
  weight: 400,
  size: 13,
  fillColor: textColor,
})} }
.gray { ${getFontFillStyle({ weight: 400, size: 12, fillColor: textColor })} }
.icon { fill: ${iconColor} }
.badge { ${getFontStyle({ weight: 600, size: 11 })} }
.badge rect { opacity: 0.2 }`;

const getStatsCardStyles = ({
  titleColor,
  textColor,
  iconColor,
  show_icons,
  progress,
}) => `
  .header {
    ${getFontFillStyle({ weight: 600, size: 18, fillColor: titleColor })}
    animation: fadeIn 0.8s ease-in-out forwards;
  }
  .stat { 
    ${getFontFillStyle({ weight: 600, size: 14, fillColor: textColor })}
  }
  .stagger { 
    opacity: 0;
    animation: fadeIn 0.3s ease-in-out forwards;
  }
  .rank-text { 
    ${getFontFillStyle({ weight: 800, size: 24, fillColor: textColor })} 
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

  ${process.env.NODE_ENV === "test" ? "" : getAnimations({ progress })}
  `;

export { getTopLangsStyles, getStatsCardStyles, getRepoCardStyles };
