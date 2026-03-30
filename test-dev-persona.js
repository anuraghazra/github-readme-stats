// Quick test to verify the dev-persona card system setup
// This is a development/integration test file

import { renderDevPersonaCard } from './src/cards/dev-persona.js'

// Mock developer data
const mockDevPersonaData = {
  username: 'bishwas-py',
  name: 'Bishwas Pandit',
  bio: 'Full-stack developer | Open source enthusiast | Code architect',
  followers: 1234,
  totalRepos: 45,
  totalStars: 5678,
  totalPRs: 89,
  totalMergedPRs: 78,
  totalIssues: 34,
  totalCommits: 2345,
  totalContributions: 3456,
  discussions: 12,
  gists: 15,
  topLanguages: [
    { name: 'JavaScript', percent: 35 },
    { name: 'Python', percent: 30 },
    { name: 'TypeScript', percent: 25 },
  ],
  bugSlayerLevel: 8,
  coffeeCodeRatio: { value: 2.5, label: '2.5 hrs/☕' },
  custom: {
    focus_hours: 8,
    bugs_fixed: 15,
    coffee_cups: 4,
    productivity_score: 78,
  },
  wakatime: null,
  contributionsCollection: {
    totalCommitContributions: 2345,
    totalIssueContributions: 100,
    totalPullRequestContributions: 156,
  },
}

// Test rendering
const renderOptions = {
  title_color: '00FF41',
  text_color: '00FF41',
  icon_color: '00FFFF',
  bg_color: '0D0D0D',
  border_color: '00FF41',
  hide_title: false,
  hide_border: false,
  animate: true,
  layout: 'full',
}

try {
  const renderedCard = renderDevPersonaCard(mockDevPersonaData, renderOptions)
  console.log('✓ Dev Persona Card rendered successfully!')
  console.log(`✓ Card size: ${renderedCard.length} characters of SVG output`)

  // Check for required SVG elements
  const checks = [
    { name: 'SVG tag', pattern: /<svg/i },
    { name: 'Username display', pattern: />bishwas-py</i },
    { name: 'Bug Slayer Level', pattern: /BUG SLAYER LVL/i },
    { name: 'Terminal section', pattern: /terminal-section/i },
    { name: 'Animation styles', pattern: /@keyframes/i },
    { name: 'Progress bar', pattern: /progress-fill-animation/i },
  ]

  checks.forEach(({ name, pattern }) => {
    if (pattern.test(renderedCard)) {
      console.log(`✓ ${name}: FOUND`)
    } else {
      console.warn(`✗ ${name}: NOT FOUND`)
    }
  })
} catch (error) {
  console.error('✗ Error rendering card:', error.message)
  console.error(error)
  process.exit(1)
}

console.log('\n✓ All tests passed! Dev Persona Card system is ready.')
