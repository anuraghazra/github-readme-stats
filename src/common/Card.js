import { encodeHTML, flexLayout } from "./utils.js";
import _ from "lodash";

class Card {
  /**
   * Creates a new card instance.
   *
   * @param {object} args Card arguments.
   * @param {number?=} args.width Card width.
   * @param {number?=} args.height Card height.
   * @param {number?=} args.border_radius Card border radius.
   * @param {string?=} args.customTitle Card custom title.
   * @param {string?=} args.defaultTitle Card default title.
   * @param {string?=} args.titlePrefixIcon Card title prefix icon.
   * @param {object?=} args.colors Card colors arguments.
   * @param {string} args.colors.titleColor Card title color.
   * @param {string} args.colors.textColor Card text color.
   * @param {string} args.colors.iconColor Card icon color.
   * @param {string|Array} args.colors.bgColor Card background color.
   * @param {string} args.colors.borderColor Card border color.
   * @returns {Card} Card instance.
   */
  constructor({
    width = 100,
    height = 100,
    border_radius = 4.5,
    colors = {},
    customTitle,
    defaultTitle = "",
    titlePrefixIcon,
    borderAnimation = false,
  }) {
    this.width = width;
    this.height = height;

    this.hideBorder = false;
    this.hideTitle = false;
    this.borderAnimation = borderAnimation;

    this.border_radius = border_radius;

    // returns theme based colors with proper overrides and defaults
    this.colors = colors;
    this.title =
      customTitle === undefined
        ? encodeHTML(defaultTitle)
        : encodeHTML(customTitle);

    this.css = "";

    this.paddingX = 25;
    this.paddingY = 35;
    this.titlePrefixIcon = titlePrefixIcon;
    this.animations = true;
    this.a11yTitle = "";
    this.a11yDesc = "";
  }

  /**
   * @returns {void}
   */
  disableAnimations() {
    this.animations = false;
  }

  /**
   * @param {Object} props The props object.
   * @param {string} props.title Accessibility title.
   * @param {string} props.desc Accessibility description.
   * @returns {void}
   */
  setAccessibilityLabel({ title, desc }) {
    this.a11yTitle = title;
    this.a11yDesc = desc;
  }

  /**
   * @param {string} value The CSS to add to the card.
   * @returns {void}
   */
  setCSS(value) {
    this.css = value;
  }

  /**
   * @param {boolean} value Whether to hide the border or not.
   * @returns {void}
   */
  setHideBorder(value) {
    this.hideBorder = value;
  }

  /**
   * @param {boolean} value Whether to hide the title or not.
   * @returns {void}
   */
  setHideTitle(value) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }

  /**
   * @param {string} text The title to set.
   * @returns {void}
   */
  setTitle(text) {
    this.title = text;
  }

  /**
   * @returns {string} The rendered card title.
   */
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

  /**
   * @returns {string} The rendered card gradient.
   */
  renderGradient() {
    if (typeof this.colors.bgColor !== "object") {
      return "";
    }

    const gradients = this.colors.bgColor.slice(1);
    return typeof this.colors.bgColor === "object"
      ? `
        <defs>
          <linearGradient
            id="gradient"
            gradientTransform="rotate(${this.colors.bgColor[0]})"
            gradientUnits="userSpaceOnUse"
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

  /**
   * Renders decorative elements around the card
   * @returns {string} SVG elements for decoration
   */
  renderDecorations() {
    const decorSize = _.random(15, 25);
    const decorations = [];
    const spacing = this.width / 6;

    // Ensure decorations are within the viewBox
    const positions = [
      { x: spacing, y: decorSize / 2 },
      { x: this.width - spacing, y: decorSize / 2 },
      { x: decorSize / 2, y: this.height / 3 },
      { x: decorSize / 2, y: (this.height / 3) * 2 },
      { x: this.width - decorSize / 2, y: this.height / 3 },
      { x: this.width - decorSize / 2, y: (this.height / 3) * 2 },
      { x: spacing, y: this.height - decorSize / 2 },
      { x: this.width - spacing, y: this.height - decorSize / 2 },
    ];

    positions.forEach((pos) => {
      const shapeType = _.random(0, 3); // 0: hexagon, 1: circle, 2: square, 3: triangle
      const opacity = _.random(0.5, 0.9); // Ensure higher opacity for visibility
      const strokeWidth = _.random(1, 2);
      const rotation = _.random(0, 360);

      let shape = "";

      switch (shapeType) {
        case 0: // Hexagon
          const hexPoints = _.range(6)
            .map((i) => {
              const angle = (i * Math.PI) / 3;
              const x = decorSize / 2 + (decorSize / 2) * Math.cos(angle);
              const y = decorSize / 2 + (decorSize / 2) * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ");
          shape = `<polygon 
            points="${hexPoints}"
            fill="${this.colors.borderColor}"
            opacity="${opacity}"
            stroke="${this.colors.titleColor}"
            stroke-width="${strokeWidth}"
          />`;
          break;

        case 1: // Circle
          shape = `<circle 
            cx="${decorSize / 2}" 
            cy="${decorSize / 2}" 
            r="${decorSize / 3}"
            fill="${this.colors.borderColor}"
            opacity="${opacity}"
            stroke="${this.colors.titleColor}"
            stroke-width="${strokeWidth}"
          />`;
          break;

        case 2: // Square
          shape = `<rect 
            x="${decorSize / 4}"
            y="${decorSize / 4}"
            width="${decorSize / 2}"
            height="${decorSize / 2}"
            fill="${this.colors.borderColor}"
            opacity="${opacity}"
            stroke="${this.colors.titleColor}"
            stroke-width="${strokeWidth}"
          />`;
          break;

        case 3: // Triangle
          const trianglePoints = _.range(3)
            .map((i) => {
              const angle = (i * 2 * Math.PI) / 3;
              const x = decorSize / 2 + (decorSize / 3) * Math.cos(angle);
              const y = decorSize / 2 + (decorSize / 3) * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ");
          shape = `<polygon 
            points="${trianglePoints}"
            fill="${this.colors.borderColor}"
            opacity="${opacity}"
            stroke="${this.colors.titleColor}"
            stroke-width="${strokeWidth}"
          />`;
          break;
      }

      decorations.push(`
        <g transform="translate(${pos.x}, ${pos.y}) rotate(${rotation}, ${decorSize / 2}, ${decorSize / 2})" 
           class="decoration" 
           style="--tx:${pos.x}px; --ty:${pos.y}px;">
          ${shape}
        </g>
      `);
    });

    return decorations.join("");
  }

  /**
   * Retrieves css animations for a card.
   *
   * @returns {string} Animation css.
   */
  getAnimations = () => {
    return `
      /* Animations */
      @keyframes floatAnimation {
        0%, 100% { transform: translate(var(--tx), var(--ty)); }
        50% { transform: translate(
          calc(var(--tx) + ${_.random(-15, 15)}px), 
          calc(var(--ty) - ${_.random(10, 25)}px)
        ); }
      }
      .decoration {
        animation: floatAnimation ${_.random(8, 12)}s ease-in-out infinite;
        --tx: 0;
        --ty: 0;
      }
      .decoration:nth-child(1) { animation-delay: ${_.random(0, 1)}s; }
      .decoration:nth-child(2) { animation-delay: ${_.random(0, 1)}s; }
      .decoration:nth-child(3) { animation-delay: ${_.random(0, 1)}s; }
      .decoration:nth-child(4) { animation-delay: ${_.random(0, 1)}s; }
      .decoration:nth-child(5) { animation-delay: ${_.random(0, 1)}s; }
      .decoration:nth-child(6) { animation-delay: ${_.random(0, 1)}s; }
      .decoration:nth-child(7) { animation-delay: ${_.random(0, 1)}s; }
      .decoration:nth-child(8) { animation-delay: ${_.random(0, 1)}s; }
    `;
  };

  setBorderAnimation(value) {
    this.borderAnimation = value;
  }

  /**
   * @param {string} body The inner body of the card.
   * @returns {string} The rendered card.
   */
  render(body) {
    const customDesign = `
      <g transform="translate(0,0)">
        ${this.renderDecorations()}
        <rect
          width="${this.width}"
          height="${this.height}"
          rx="${this.border_radius}"
          fill="none"
          ${this.borderAnimation ? 'class="animated-border"' : ""}
        />
      </g>
    `;

    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
        class="card-border"
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

          ${process.env.NODE_ENV === "test" ? "" : this.getAnimations()}
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
          class="card-border"
          fill="${
            typeof this.colors.bgColor === "object"
              ? "url(#gradient)"
              : this.colors.bgColor
          }"
          stroke-opacity="${this.hideBorder ? 0 : 1}"
        />

        ${this.hideTitle ? "" : this.renderTitle()}
        <rect
          data-testid="card-border-glow"
          x="0.5"
          y="0.5"
          rx="${this.border_radius}"
          height="99%"
          width="${this.width - 1}"
          fill="none"
          class="card-border-glow"
        />

        <g
          data-testid="main-card-body"
          transform="translate(${this.width / 2}, ${
            this.hideTitle ? this.paddingX : this.paddingY + 20
          })"
          style="transform: translate(${(this.paddingX / this.width) * 100}%, ${
            this.hideTitle
              ? (this.paddingX / this.height) * 100
              : ((this.paddingY + 20) / this.height) * 100
          }%);"
        >
          ${body}
        </g>

        ${customDesign}
      </svg>
    `;
  }
}

export { Card };
export default Card;
