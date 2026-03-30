// @ts-check

/**
 * Custom metrics endpoint - Returns mock developer metrics
 * This endpoint can be extended to integrate with real metrics services
 *
 * @param {object} req Express request
 * @param {object} res Express response
 * @returns {void}
 */
export default async (req, res) => {
  const { username } = req.query

  res.setHeader('Content-Type', 'application/json')

  if (!username) {
    return res.status(400).json({
      error: 'Username is required',
      code: 'MISSING_PARAM',
    })
  }

  try {
    // Mock custom metrics based on username hash for variation
    const hash = username
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const customMetrics = {
      username: username,
      timestamp: new Date().toISOString(),
      metrics: {
        focus_hours: Math.max(3, Math.min(12, (hash % 10) + 3)),
        bugs_fixed: Math.max(5, (hash % 30) + 5),
        coffee_cups: Math.max(2, (hash % 8) + 2),
        productivity_score: Math.max(50, (hash % 50) + 50),
        code_quality: Math.max(60, (hash % 40) + 60),
        collaboration_index: Math.max(55, (hash % 45) + 55),
      },
      streak: {
        current: Math.max(1, (hash % 30) + 1),
        longest: Math.max(30, (hash % 100) + 30),
      },
      languages_today: [
        { name: 'JavaScript', percent: 30 + (hash % 20) },
        { name: 'Python', percent: 25 + (hash % 15) },
        { name: 'TypeScript', percent: 20 + (hash % 15) },
        { name: 'Other', percent: 25 - ((hash % 20) + (hash % 15)) },
      ],
    }

    // Set cache headers to avoid hitting rate limits
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.setHeader('X-Metrics-Generated', new Date().toISOString())

    return res.json(customMetrics)
  } catch (error) {
    console.error('Custom metrics error:', error)
    return res.status(500).json({
      error: 'Failed to generate custom metrics',
      message: error.message,
    })
  }
}
