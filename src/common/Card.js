const { FlexLayout, encodeHTML } = require("../common/utils");
const { getAnimations } = require("../getStyles");

class Card {
  constructor({
    width = 100,
    height = 100,
    borderWidth = 1,
    colors = {},
    customTitle,
    defaultTitle = "",
    titlePrefixIcon,
  }) {
    this.width = width;
    this.height = height;
    this.borderWidth = isNaN(borderWidth) ? 1 : borderWidth;

    this.hideBorder = false;
    this.hideTitle = false;

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
  }

  disableAnimations() {
    this.animations = false;
  }

  setCSS(value) {
    this.css = value;
  }

  setHideBorder(value) {
    this.hideBorder = value;
  }

  setHideTitle(value) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }

  setTitle(text) {
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
        transform="translate(${this.paddingX + this.borderWidth}, ${this.paddingY + this.borderWidth})"
      >
        ${FlexLayout({
          items: [this.titlePrefixIcon && prefixIcon, titleText],
          gap: 25,
        }).join("")}
      </g>
    `;
  }

  renderGradient() {
    if (typeof this.colors.bgColor !== "object") return;

    const gradients = this.colors.bgColor.slice(1);
    return typeof this.colors.bgColor === "object"
      ? `
      <linearGradient
        id="gradient"
        gradientTransform="rotate(${this.colors.bgColor[0]})"
      >
        ${gradients.map((grad, index) => {
          let offset = (index * 100) / (gradients.length - 1);
          return `<stop offset="${offset}%" stop-color="#${grad}" />`;
        })}
      </linearGradient>
        `
      : "";
  }
  
  renderStrokeGradient() {
    if (typeof this.colors.borderColor !== "object") return;
    
    const gradients = this.colors.borderColor.slice(1);
    return typeof this.colors.borderColor === "object"
        ? `
        <linearGradient
          id="strokeGradient"
          gradientTransform="rotate(${this.colors.borderColor[0]})"
        >
          ${gradients.map((grad, index) => {
            let offset = (index * 100) / (gradients.length - 1);
            return `<stop offset="${offset}%" stop-color="#${grad}" />`;
          })}
        </linearGradient>
        `
        : "";
  }

  render(body) {
    return `
      <svg
        width="${this.width + this.borderWidth*2}"
        height="${this.height + this.borderWidth*2}"

        viewBox="0 0 ${this.width + this.borderWidth*2} ${this.height + this.borderWidth*2}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: ${this.colors.titleColor};
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          ${this.css}

          ${process.env.NODE_ENV === "test" ? "" : getAnimations()}
          ${
            this.animations === false
              ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
              : ""
          }
        </style>

        <defs>
            ${this.renderGradient()}
            ${this.renderStrokeGradient()}
        </defs>

        <rect
          data-testid="card-bg"
          x="${this.borderWidth/2}"
          y="${this.borderWidth/2}"
          rx="4.5"
          height="${this.height + this.borderWidth}"
          stroke="${
            typeof this.colors.borderColor === "object"
              ? "url(#strokeGradient)"
              : this.colors.borderColor
          }"
          stroke-width="${this.borderWidth}"
          width="${this.width - 1 + this.borderWidth}"
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
          transform="translate(${this.borderWidth}, ${
                (this.hideTitle ? this.paddingX : this.paddingY + 20) + this.borderWidth
          })"
        >
          ${body}
        </g>
      </svg>
    `;
  }
}

module.exports = Card;
