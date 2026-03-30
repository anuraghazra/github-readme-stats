// @ts-check

import { renderDevPersonaCard } from '../src/cards/dev-persona.js'
import { guardAccess } from '../src/common/access.js'
import {
  CACHE_TTL,
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from '../src/common/cache.js'
import {
  MissingParamError,
  retrieveSecondaryMessage,
} from '../src/common/error.js'
import { parseBoolean } from '../src/common/ops.js'
import { renderError } from '../src/common/render.js'
import { fetchDevPersonaData } from '../src/fetchers/dev-persona.js'

// @ts-ignore
export default async (req, res) => {
  const {
    username,
    hide_title = false,
    hide_border = false,
    title_color,
    ring_color,
    icon_color,
    text_color,
    bg_color,
    theme = 'hacker_dark',
    cache_seconds,
    border_radius,
    border_color,
    animate = true,
    layout = 'full',
    wakatime_key,
  } = req.query

  res.setHeader('Content-Type', 'image/svg+xml')

  // Guard access
  const access = guardAccess({
    res,
    id: username,
    type: 'username',
    colors: {
      title_color,
      text_color,
      bg_color,
      border_color,
      theme,
    },
  })

  if (!access.isPassed) {
    return access.result
  }

  if (!username) {
    return res.send(
      renderError({
        message: 'Something went wrong',
        secondaryMessage: 'Please provide a GitHub username.',
        renderOptions: {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
        },
      }),
    )
  }

  try {
    // Fetch dev persona data
    const devPersonaData = await fetchDevPersonaData(username, wakatime_key)

    // Get card colors from theme
    const cardColors = {
      title_color: title_color,
      text_color: text_color,
      icon_color: icon_color || ring_color,
      bg_color: bg_color,
      border_color: border_color,
      theme: theme,
    }

    // Render the card
    const renderedCard = renderDevPersonaCard(devPersonaData, {
      ...cardColors,
      hide_title: parseBoolean(hide_title),
      hide_border: parseBoolean(hide_border),
      card_width: 495,
      animate: parseBoolean(animate),
      layout: layout,
      border_radius: border_radius,
    })

    // Set cache headers
    const cacheSeconds = resolveCacheSeconds(cache_seconds, CACHE_TTL)
    setCacheHeaders(res, cacheSeconds)

    return res.send(renderedCard)
  } catch (error) {
    // Log error
    console.error('Dev Persona Card Error:', error)

    // Return error card
    return res.send(
      renderError({
        message: 'Something went wrong',
        secondaryMessage: retrieveSecondaryMessage(error),
        renderOptions: {
          title_color,
          text_color,
          bg_color,
          border_color,
          theme,
        },
      }),
    )
  }
}
