// @ts-check

import { Card } from '../common/Card.js'
import { getCardColors } from '../common/color.js'
import { kFormatter } from '../common/fmt.js'
import { flexLayout, measureText } from '../common/render.js'
import { encodeHTML } from '../common/html.js'

const CARD_MIN_WIDTH = 400
const CARD_DEFAULT_WIDTH = 495
const CARD_HEIGHT = 600

/**
 * Create animated SVG progress bar
 *
 * @param {object} params Progress bar parameters
 * @param {number} params.x X position
 * @param {number} params.y Y position
 * @param {number} params.width Bar width
 * @param {number} params.percent Filled percentage (0-100)
 * @param {string} params.color Bar color
 * @param {string} params.label Label text
 * @param {boolean} params.animate Enable animation
 * @returns {string} SVG progress bar
 */
const createProgressBar = ({
  x,
  y,
  width = 200,
  percent = 50,
  color = '#00FF41',
  label = '',
  animate = true,
}) => {
  const filledWidth = (width * percent) / 100
  const animationClass = animate ? 'class="progress-fill-animation"' : ''

  return `
    <g data-testid="progress-bar" transform="translate(${x}, ${y})">
      <!-- Background bar -->
      <rect x="0" y="0" width="${width}" height="8" rx="4" fill="#1a1a1a" stroke="${color}" stroke-width="0.5" opacity="0.3"/>
      <!-- Filled bar -->
      <rect ${animationClass} x="0" y="0" width="${filledWidth}" height="8" rx="4" fill="${color}" opacity="0.9"/>
      <!-- Glow effect -->
      <filter id="glow-${color.replace('#', '')}">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <rect filter="url(#glow-${color.replace(
        '#',
        '',
      )})" x="0" y="0" width="${filledWidth}" height="8" rx="4" fill="${color}" opacity="0.5"/>
      <!-- Label -->
      ${
        label
          ? `<text x="0" y="20" font-size="11" fill="${color}" font-family="monospace">${label}</text>`
          : ''
      }
    </g>
  `
}

/**
 * Create animated terminal text with typing effect
 *
 * @param {object} params Terminal text parameters
 * @param {number} params.x X position
 * @param {number} params.y Y position
 * @param {string[]} params.lines Array of text lines
 * @param {string} params.color Text color
 * @param {boolean} params.animate Enable animation
 * @returns {string} SVG terminal text
 */
const createTerminalText = ({
  x,
  y,
  lines = [],
  color = '#00FF41',
  animate = true,
}) => {
  const lineHeight = 16

  const linesElements = lines
    .map((line, index) => {
      const delay = animate ? index * 100 : 0
      const animationClass = animate
        ? `style="animation-delay: ${delay}ms"`
        : ''

      return `
        <text
          x="${x}"
          y="${y + index * lineHeight}"
          font-size="11"
          fill="${color}"
          font-family="monospace"
          opacity="0.9"
          class="terminal-text"
          ${animationClass}
        >${encodeHTML(line)}</text>
      `
    })
    .join('')

  return linesElements
}

/**
 * Create blinking cursor animation
 *
 * @param {object} params Cursor parameters
 * @param {number} params.x X position
 * @param {number} params.y Y position
 * @param {string} params.color Cursor color
 * @returns {string} SVG cursor
 */
const createBlinkingCursor = ({ x, y, color = '#00FF41' }) => {
  return `
    <g data-testid="blinking-cursor" transform="translate(${x}, ${y})">
      <rect class="cursor-blink" x="0" y="0" width="6" height="12" fill="${color}" opacity="0.8"/>
    </g>
  `
}

/**
 * Create stat item with icon and value
 *
 * @param {object} params Stat parameters
 * @param {number} params.x X position
 * @param {number} params.y Y position
 * @param {string} params.label Label text
 * @param {string|number} params.value Value text
 * @param {string} params.color Accent color
 * @param {string=} params.icon Icon SVG
 * @returns {string} SVG stat item
 */
const createStatItem = ({
  x,
  y,
  label = '',
  value = '',
  color = '#00FF41',
  icon = '',
}) => {
  const valueStr = String(value)
  return `
    <g data-testid="stat-item" transform="translate(${x}, ${y})">
      <!-- Label -->
      <text x="0" y="0" font-size="10" fill="#888888" font-family="monospace" text-anchor="start">
        ${encodeHTML(label)}
      </text>
      <!-- Value -->
      <text x="0" y="16" font-size="14" fill="${color}" font-family="monospace" font-weight="bold" text-anchor="start">
        ${encodeHTML(valueStr)}
      </text>
      <!-- Decorative line -->
      <line x1="0" y1="22" x2="80" y2="22" stroke="${color}" stroke-width="0.5" opacity="0.3"/>
    </g>
  `
}

/**
 * Render the Dev Persona Card
 *
 * @param {object} devPersonaData Developer persona data
 * @param {object} options Render options
 * @returns {string} Rendered card SVG
 */
export const renderDevPersonaCard = (devPersonaData, options = {}) => {
  const {
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    card_width = CARD_DEFAULT_WIDTH,
    hide_title = false,
    hide_border = false,
    animate = true,
    layout = 'full', // full or compact
    custom_title = null,
  } = options

  // Validate width
  let width = parseInt(card_width, 10)
  if (Number.isNaN(width) || width < CARD_MIN_WIDTH) {
    width = CARD_DEFAULT_WIDTH
  }

  const height = CARD_HEIGHT
  const colors = {
    titleColor: title_color || '#00FF41',
    textColor: text_color || '#00FF41',
    iconColor: icon_color || '#00FFFF',
    bgColor: bg_color || '#0D0D0D',
    borderColor: border_color || '#00FF41',
  }

  const card = new Card({
    width,
    height,
    colors,
    customTitle: custom_title || undefined,
    defaultTitle: 'Dev Persona Card',
  })

  if (hide_title) {
    card.setHideTitle(true)
  }

  if (hide_border) {
    card.setHideBorder(true)
  }

  if (!animate) {
    card.disableAnimations()
  }

  // Build card content
  let content = renderDevPersonaContent(devPersonaData, {
    colors,
    width,
    height,
    animate,
    layout,
  })

  // Combine with card
  const cardWithContent = card.renderWithContent(content)

  return cardWithContent
}

/**
 * Render the internal content of the dev persona card
 *
 * @param {object} devPersonaData Developer persona data
 * @param {object} renderOptions Render options with colors, dimensions, animation
 * @returns {string} SVG content
 */
const renderDevPersonaContent = (devPersonaData, renderOptions) => {
  const { colors, width, height, animate, layout } = renderOptions
  const {
    username,
    name,
    bio,
    followers,
    totalStars,
    totalCommits,
    totalMergedPRs,
    totalIssues,
    bugSlayerLevel,
    coffeeCodeRatio,
    custom,
    contributionsCollection,
  } = devPersonaData

  // Extract top languages if available
  const topLangs = devPersonaData.topLanguages
    ? devPersonaData.topLanguages.slice(0, 3)
    : []

  let yOffset = 50

  // Title section
  const titleSection = `
    <g>
      <!-- Username as main title -->
      <text
        x="25"
        y="${yOffset}"
        font-size="24"
        fill="${colors.titleColor}"
        font-family="monospace"
        font-weight="bold"
      >&gt; ${encodeHTML(username)}</text>
      
      <!-- Real name subtitle -->
      <text
        x="25"
        y="${yOffset + 25}"
        font-size="12"
        fill="${colors.textColor}"
        font-family="monospace"
        opacity="0.7"
      >// ${encodeHTML(name || username)}</text>

      <!-- Bio/Tagline -->
      <text
        x="25"
        y="${yOffset + 45}"
        font-size="11"
        fill="${colors.iconColor}"
        font-family="monospace"
        opacity="0.8"
      >${encodeHTML(
        bio.substring(0, 50) || 'Building chaos into structure...',
      )}</text>

      <!-- Decorative line -->
      <line
        x1="25"
        y1="${yOffset + 55}"
        x2="${width - 25}"
        y2="${yOffset + 55}"
        stroke="${colors.borderColor}"
        stroke-width="1"
        opacity="0.3"
      />
    </g>
  `

  yOffset += 80

  // Metrics section
  const metricsSection = `
    <g>
      <!-- Bug Slayer Level -->
      ${createStatItem({
        x: 25,
        y: yOffset,
        label: '🐛 BUG SLAYER LVL',
        value: `${bugSlayerLevel}/10`,
        color: colors.titleColor,
      })}

      <!-- Level progress bar -->
      ${createProgressBar({
        x: 25,
        y: yOffset + 35,
        width: 150,
        percent: bugSlayerLevel * 10,
        color: colors.titleColor,
        animate,
      })}

      <!-- Coffee to Code Ratio -->
      ${createStatItem({
        x: width - 200,
        y: yOffset,
        label: '☕ CODE RATIO',
        value: coffeeCodeRatio?.value || '0.5 hrs/☕',
        color: colors.iconColor,
      })}

      <!-- Total Commits -->
      ${createStatItem({
        x: 25,
        y: yOffset + 70,
        label: '[commitCount]',
        value: kFormatter(totalCommits, 1),
        color: colors.textColor,
      })}

      <!-- Total PRs -->
      ${createStatItem({
        x: 180,
        y: yOffset + 70,
        label: '[pullRequests]',
        value: kFormatter(totalMergedPRs, 1),
        color: colors.textColor,
      })}

      <!-- Stars Earned -->
      ${createStatItem({
        x: width - 150,
        y: yOffset + 70,
        label: '[⭐ earned]',
        value: kFormatter(totalStars, 1),
        color: colors.textColor,
      })}
    </g>
  `

  yOffset += 165

  // Terminal section with fake logs
  const terminalLogs = [
    '> Initializing ' + username + '.exe...',
    '> Loading modules [████████░░] 80%',
    '> Focus Hours: ' + custom.focus_hours + 'h',
    '> Bugs Fixed: ' + custom.bugs_fixed,
    '> Coffee Cups: ☕ x ' + custom.coffee_cups,
    '> ' + (username + ' is online').toUpperCase(),
  ]

  const terminalSection = `
    <g data-testid="terminal-section">
      <!-- Terminal background -->
      <rect
        x="20"
        y="${yOffset}"
        width="${width - 40}"
        height="140"
        rx="4"
        fill="#0A0A0A"
        stroke="${colors.borderColor}"
        stroke-width="1"
        opacity="0.5"
      />

      <!-- Terminal text -->
      ${createTerminalText({
        x: 30,
        y: yOffset + 15,
        lines: terminalLogs,
        color: colors.titleColor,
        animate,
      })}

      <!-- Blinking cursor -->
      ${createBlinkingCursor({
        x: 30 + (terminalLogs[terminalLogs.length - 1]?.length || 0) * 7,
        y: yOffset + 15 + (terminalLogs.length - 1) * 16,
        color: colors.titleColor,
      })}
    </g>
  `

  yOffset += 160

  // Followers and engagement badges
  const badgesSection = `
    <g data-testid="badges-section">
      <!-- Followers badge -->
      <g transform="translate(25, ${yOffset})">
        <circle cx="8" cy="8" r="8" fill="${colors.titleColor}" opacity="0.2"/>
        <text x="22" y="12" font-size="11" fill="${
          colors.textColor
        }" font-family="monospace">
          ${kFormatter(followers, 1)} followers
        </text>
      </g>

      <!-- Productivity score badge -->
      <g transform="translate(${width - 180}, ${yOffset})">
        <circle cx="8" cy="8" r="8" fill="${colors.iconColor}" opacity="0.2"/>
        <text x="22" y="12" font-size="11" fill="${
          colors.iconColor
        }" font-family="monospace">
          ${custom.productivity_score}% productive
        </text>
      </g>
    </g>
  `

  // Combine all sections
  return titleSection + metricsSection + terminalSection + badgesSection
}

/**
 * Custom renderWithContent method for Card
 * This extends the Card class temporarily to support content rendering
 */
Card.prototype.renderWithContent = function (content) {
  const bgColor = Array.isArray(this.colors.bgColor)
    ? this.colors.bgColor[0]
    : this.colors.bgColor

  const borderColor = this.colors.borderColor || this.colors.titleColor

  const cardContent = `
    <svg
      data-testid="dev-persona-card"
      width="${this.width}"
      height="${this.height}"
      viewBox="0 0 ${this.width} ${this.height}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Glow effect filters -->
        <filter id="glow-neon">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- Animation keyframes -->
        <style>
          @keyframes progress-fill {
            0% { width: 0; }
            100% { width: 100%; }
          }
          @keyframes cursor-blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes terminal-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .progress-fill-animation {
            animation: progress-fill 1.5s ease-in-out forwards;
          }
          .cursor-blink {
            animation: cursor-blink 1s infinite;
          }
          .terminal-text {
            animation: terminal-fade-in 0.6s ease-out forwards;
            opacity: 0;
          }
          .header {
            animation: terminal-fade-in 0.8s ease-out forwards;
          }
        </style>
      </defs>

      <!-- Background -->
      <rect
        width="${this.width}"
        height="${this.height}"
        rx="${this.border_radius}"
        ry="${this.border_radius}"
        fill="${bgColor}"
      />

      <!-- Border -->
      ${
        !this.hideBorder
          ? `<rect
        width="${this.width}"
        height="${this.height}"
        rx="${this.border_radius}"
        ry="${this.border_radius}"
        fill="none"
        stroke="${borderColor}"
        stroke-width="1.5"
        opacity="0.5"
      />`
          : ''
      }

      <!-- Card content -->
      ${content}
    </svg>
  `

  return cardContent
}
