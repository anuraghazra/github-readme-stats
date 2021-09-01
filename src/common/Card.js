const { getAnimations } = require("../getStyles");
const { flexLayout, encodeHTML } = require("../common/utils");

class Card {
  constructor({
    width = 100,
    height = 100,
    border_radius = 4.5,
    colors = {},
    customTitle,
    defaultTitle = "",
    titlePrefixIcon,
    bg_img = "",
    bg_img_height = "200",
    bg_img_width = "200",
    bg_img_blurness = "2"
  }) {
    this.width = width;
    this.height = height;

    this.hideBorder = false;
    this.hideTitle = false;

    this.border_radius = border_radius;

    this.bg_img =bg_img;
    this.bg_img_width = bg_img_width;
    this.bg_img_height = bg_img_height;
    this.bg_img_blurness = bg_img_blurness;
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
          >
            ${gradients.map((grad, index) => {
              let offset = (index * 100) / (gradients.length - 1);
              return `<stop offset="${offset}%" stop-color="#${grad}" />`;
            })}
          </linearGradient>
        </defs>
        `
      : "";
  }

  renderBackground(){

    const {bg_img,bg_img_blurness,bg_img_height,bg_img_width} = this;

      return bg_img?`<filter id="blur-image">
                <feGaussianBlur in="SourceGraphic" stdDeviation="${bg_img_blurness}"></feGaussianBlur>
        </filter>
        <image 
         filter="url(#blur-image)" 
         width="${bg_img_width}" 
         height="${bg_img_height}" 
         href="${bg_img}"
        />`:''
    
  
    

  }

  render(body) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

      ${this.renderBackground()}

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

        ${this.renderGradient()}

        ${!this.bg_img?`<rect
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
      />`:''}

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

module.exports = Card;
