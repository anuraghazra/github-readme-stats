// eslint-disable-next-line no-unused-vars
import React from "preact";
import { kFormatter, getCardColors } from "../utils";
import { getRepoCardStyles } from "../styles";
import icons from "../icons";
import FlexLayout from "./flexLayout";

export default (repo, options = {}) => {
  const {
    name,
    nameWithOwner,
    description,
    primaryLanguage,
    stargazers,
    isArchived,
    isTemplate,
    forkCount,
  } = repo;
  const {
    title_color,
    icon_color,
    text_color,
    bg_color,
    show_owner,
    theme = "default_repocard",
  } = options;

  const langName = (primaryLanguage && primaryLanguage.name) || "Unspecified";
  const langColor = (primaryLanguage && primaryLanguage.color) || "#333";

  const height = 120;
  const shiftText = langName.length > 15 ? 0 : 30;

  let desc = description || "No description provided";
  if (desc.length > 55) {
    desc = `${description.slice(0, 55)}..`;
  }

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
  });

  const totalStars = kFormatter(stargazers.totalCount);
  const totalForks = kFormatter(forkCount);

  const getBadgeSVG = (label) => (
    <g data-testid="badge" class="badge" transform="translate(320, 38)">
      <rect
        stroke={textColor}
        stroke-width="1"
        width="70"
        height="20"
        x="-12"
        y="-14"
        ry="10"
        rx="10"
      />
      <text
        x="23"
        y="-5"
        alignment-baseline="central"
        dominant-baseline="central"
        text-anchor="middle"
        fill={textColor}
      >
        {label}
      </text>
    </g>
  );

  const svgStars = stargazers.totalCount > 0 && (
    <svg
      class="icon"
      y="-12"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
    >
      {icons.star}
      <text data-testid="stargazers" class="gray" x="25">
        {totalStars}
      </text>
    </svg>
  );
  const svgForks = forkCount > 0 && (
    <svg
      class="icon"
      y="-12"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
    >
      {icons.fork}
      <text data-testid="forkcount" class="gray" x="25">
        {totalForks}
      </text>
    </svg>
  );
  return (
    <svg
      version="1.1"
      width="400"
      height={height}
      viewBox={`0 0 400 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{getRepoCardStyles({ titleColor, textColor, iconColor })}</style>
      <rect
        data-testid="card-bg"
        x="0.5"
        y="0.5"
        width="399"
        height="99%"
        rx="4.5"
        fill={bgColor}
        stroke="#E4E2E2"
      />
      <svg
        class="icon"
        x="25"
        y="25"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
        data-testid="card-icons"
      >
        {icons.contribs}
      </svg>
      <text x="50" y="38" class="header" data-testid="card-header">
        {show_owner ? nameWithOwner : name}
      </text>
      {isTemplate
        ? getBadgeSVG("Template")
        : isArchived
        ? getBadgeSVG("Archived")
        : ""}
      <text class="description" x="25" y="70" data-testid="card-desc">
        {desc}
      </text>
      {primaryLanguage ? (
        <g data-testid="primary-lang" transform="translate(30, 100)">
          <circle
            data-testid="lang-color"
            cx="0"
            cy="-5"
            r="6"
            fill={langColor}
          />
          <text data-testid="lang-name" class="gray" x="15">
            {langName}
          </text>
        </g>
      ) : (
        ""
      )}
      <g
        data-testid="card-flex-wrapper"
        transform={`translate(${primaryLanguage ? 155 - shiftText : 25}, 100)`}
      >
        {FlexLayout({ items: [svgStars, svgForks], gap: 65 })}
      </g>
    </svg>
  );
};
