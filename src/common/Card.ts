import { getAnimations } from "../getStyles";
import { encodeHTML, flexLayout } from "./utils";

/** Card colors. */
export interface CardColors {
  /** Title color. */
  titleColor: string;
  /** Text color. */
  textColor: string;
  /** Icon color. */
  iconColor: string;
  /** Background color. */
  bgColor: string;
  /** Border color. */
  borderColor: string;
}

/** Accessibility label. */
interface AccessibilityLabel {
  /** The label to display. */
  title: string;
  /** The value to display. */
  desc: string;
}

/** Card properties. */
interface CardProps {
  /** Card width. */
  width: number;
  /** Card height. */
  height: number;
  /** Card border radius. */
  border_radius: number;
  /** Card colors. */
  colors: CardColors | {};
  /** Card title. */
  customTitle?: string;
  /** Card default title. */
  defaultTitle?: string;
  /** Card title prefix icon. */
  titlePrefixIcon?: string;
}

/**
 * Card class.
 */
export class Card {
  /** Card width. */
  width: number;
  /** Card height. */
  height: number;
  /** Whether the card border is hidden. */
  hideBorder: boolean;
  /** Whether the card title is hidden. */
  hideTitle: boolean;
  /** Border radius. */
  border_radius: number;
  /** Card colors. */
  colors: CardColors | {};
  /** Card title. */
  title: string;
  /** Card css. */
  css: string;
  /** Card x padding. */
  paddingX: number;
  /** Card y padding. */
  paddingY: number;
  /** Card title prefix icon. */
  titlePrefixIcon: string | undefined;
  /** Whether the card is animated. */
  animations: boolean;
  /** Accessibility label title. */
  a11yTitle: string;
  /** Accessibility label description. */
  a11yDesc: string;
  /**
   * @param {object} args
   * @param {number?=} args.width
   * @param {number?=} args.height
   * @param {number?=} args.border_radius
   * @param {string?=} args.customTitle
   * @param {string?=} args.defaultTitle
   * @param {string?=} args.titlePrefixIcon
   * @param {ReturnType<import('./utils').getCardColors>?=} args.colors
   */
  constructor({
    width = 100,
    height = 100,
    border_radius = 4.5,
    colors = {},
    customTitle,
    defaultTitle = "",
    titlePrefixIcon,
  }: CardProps) {
    this.width = width;
    this.height = height;

    this.hideBorder = false;
    this.hideTitle = false;

    this.border_radius = border_radius;

    // returns theme based colors with proper overrides and defaults
    this.colors = colors;
    this.title =
      customTitle !== undefined
        ? encodeHTML(customTitle)
        : encodeHTML(defaultTitle);

    this.css = "";

    this.paddingX = 25;
    this.paddingY = 35;
    this.titlePrefixIcon = titlePrefixIcon;
    this.animations = true;
    this.a11yTitle = "";
    this.a11yDesc = "";
  }

  disableAnimations() {
    this.animations = false;
  }

  /**
   * @param {{title: string, desc: string}} prop
   */
  setAccessibilityLabel({ title, desc }: AccessibilityLabel) {
    this.a11yTitle = title;
    this.a11yDesc = desc;
  }

  /**
   * @param {string} value
   */
  setCSS(value: string) {
    this.css = value;
  }

  /**
   * @param {boolean} value
   */
  setHideBorder(value: boolean) {
    this.hideBorder = value;
  }

  /**
   * @param {boolean} value
   */
  setHideTitle(value: boolean) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }

  /**
   * @param {string} text
   */
  setTitle(text: string) {
    this.title = text;
  }

  renderTitle() {
    const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >${this.title}</text>
    `;

    const prefixIcon = `
      <svg
        class="icon"
        x="0"
        y="-13"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
      >
        ${this.titlePrefixIcon}
      </svg>
    `;
    return `
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX}, ${this.paddingY})"
      >
        ${flexLayout({
          items: [this.titlePrefixIcon && prefixIcon, titleText],
          gap: 25,
        }).join("")}
      </g>
    `;
  }

  renderGradient() {
    if (typeof this.colors.bgColor !== "object") return "";

    const gradients = this.colors.bgColor.slice(1);
    return typeof this.colors.bgColor === "object"
      ? `
        <defs>
          <linearGradient
            id="gradient"
            gradientTransform="rotate(${this.colors.bgColor[0]})"
            gradientUnits="userSpaceOnUse"
          >
            ${gradients.map((grad: string, index: number) => {
              let offset = (index * 100) / (gradients.length - 1);
              return `<stop offset="${offset}%" stop-color="#${grad}" />`;
            })}
          </linearGradient>
        </defs>
        `
      : "";
  }

  /**
   * @param {string} body
   */
  render(body: string) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
      >
        <title id="titleId">${this.a11yTitle}</title>
        <desc id="descId">${this.a11yDesc}</desc>
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: ${this.colors.titleColor};
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          @supports(-moz-appearance: auto) {
            /* Selector detects Firefox */
            .header { font-size: 15.5px; }
          }
          ${this.css}

          ${process.env.NODE_ENV === "test" ? "" : getAnimations()}
          ${
            this.animations === false
              ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
              : ""
          }
        </style>

        ${this.renderGradient()}

        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="${this.border_radius}"
          height="99%"
          stroke="${this.colors.borderColor}"
          width="${this.width - 1}"
          fill="${
            typeof this.colors.bgColor === "object"
              ? "url(#gradient)"
              : this.colors.bgColor
          }"
          stroke-opacity="${this.hideBorder ? 0 : 1}"
        />

        ${this.hideTitle ? "" : this.renderTitle()}

        <g
          data-testid="main-card-body"
          transform="translate(0, ${
            this.hideTitle ? this.paddingX : this.paddingY + 20
          })"
        >
          ${body}
        </g>
      </svg>
    `;
  }
}
