# Dev Persona Card System

A customized extension of github-readme-stats that transforms standard GitHub metrics into a personalized "Dev Persona Card" with a hacker aesthetic and animated UI.

## 🎯 Features

### 1. **Dev Persona Card** 
A unique developer identity card displaying:
- **Username & Profile** - Dynamic GitHub username and bio
- **Bug Slayer Level** - Calculated from commits, PRs, and issues (Level 1-10)
- **Coffee → Code Ratio** - Time spent per commit (hacker style metric)
- **Custom Metrics** - Focus hours, bugs fixed, coffee cups consumed
- **Terminal Section** - Animated "initialization logs" with typing effect
- **Engagement Badges** - Followers count and productivity score

### 2. **Animated SVG UI**
Built with pure SVG for GitHub README compatibility:
- ✨ **Glow Effects** - Neon glow on text elements
- 📊 **Animated Progress Bars** - Smooth fill animations on load
- 💻 **Terminal Typography** - Monospace font with blinking cursor
- ⌨️ **Typing Animation** - Terminal logs fade in sequentially
- 🎬 **Smooth Transitions** - CSS keyframe animations for polish

### 3. **Hacker-Dark Theme**
A new theme with cyberpunk aesthetics:
- **Primary Color:** Neon Green (#00FF41)
- **Accent Color:** Cyan (#00FFFF)
- **Background:** Deep Black (#0D0D0D)
- **Border:** Neon Green glow effect

### 4. **Real-Time Metrics Integration**

#### GitHub API Data
```javascript
{
  username,
  name,
  bio,
  followers,
  totalRepos,
  totalStars,
  totalCommits,
  totalMergedPRs,
  totalIssues,
  totalContributions
}
```

#### WakaTime Integration (Optional)
```javascript
{
  totalSeconds,
  totalSecondsText,
  languages: [{ name, percent, text }]
}
```

#### Custom Metrics
```javascript
{
  focus_hours,        // 3-12 hours
  bugs_fixed,         // Count
  coffee_cups,        // ☕ consumed
  productivity_score  // 0-100
}
```

### 5. **Flexible API Endpoint**

**Base URL:**
```
GET /api/dev-persona?username=<github_username>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `username` | string | required | GitHub username |
| `theme` | string | `hacker_dark` | Card theme |
| `animate` | boolean | `true` | Enable animations |
| `hide_title` | boolean | `false` | Hide title section |
| `hide_border` | boolean | `false` | Hide border |
| `layout` | string | `full` | Card layout: `full` or `compact` |
| `wakatime_key` | string | optional | WakaTime API key for weekly stats |
| `title_color` | string | optional | Override title color (hex) |
| `text_color` | string | optional | Override text color (hex) |
| `icon_color` | string | optional | Override icon color (hex) |
| `bg_color` | string | optional | Override background color (hex) |
| `border_color` | string | optional | Override border color (hex) |
| `cache_seconds` | number | `3600` | Cache duration in seconds |

## 📚 Usage

### Basic Usage in README

```markdown
# My Dev Persona

![Dev Persona](https://your-github-readme-stats-deployment.com/api/dev-persona?username=YOUR_GITHUB_USERNAME)
```

### With Custom Theme

```markdown
![Dev Persona](https://your-github-readme-stats-deployment.com/api/dev-persona?username=YOUR_GITHUB_USERNAME&theme=hacker_dark&animate=true)
```

### With WakaTime Integration

```markdown
![Dev Persona](https://your-github-readme-stats-deployment.com/api/dev-persona?username=YOUR_GITHUB_USERNAME&wakatime_key=YOUR_WAKATIME_API_KEY)
```

### Custom Colors

```markdown
![Dev Persona](https://your-github-readme-stats-deployment.com/api/dev-persona?username=YOUR_GITHUB_USERNAME&title_color=FF1493&icon_color=00FFFF&text_color=00FF41&bg_color=0A0A0A)
```

### Disable Animations (Better Performance)

```markdown
![Dev Persona](https://your-github-readme-stats-deployment.com/api/dev-persona?username=YOUR_GITHUB_USERNAME&animate=false)
```

## 🛠️ API Endpoints

### Dev Persona Card
```
GET /api/dev-persona?username=<github_username>
```
Returns animated SVG card with developer metrics.

### Custom Metrics (Mock Data)
```
GET /api/custom-metrics?username=<github_username>
```
Returns JSON with personalized metrics:
```json
{
  "username": "bishwas-py",
  "timestamp": "2026-03-30T10:00:00Z",
  "metrics": {
    "focus_hours": 8,
    "bugs_fixed": 15,
    "coffee_cups": 4,
    "productivity_score": 78,
    "code_quality": 82,
    "collaboration_index": 71
  },
  "streak": {
    "current": 14,
    "longest": 67
  },
  "languages_today": [
    { "name": "JavaScript", "percent": 35 },
    { "name": "Python", "percent": 28 },
    { "name": "TypeScript", "percent": 25 },
    { "name": "Other", "percent": 12 }
  ]
}
```

## 🎨 Metrics Explained

### Bug Slayer Level
Calculated from:
- **Commits** (30% weight)
- **Merged PRs** (50% weight)
- **Closed Issues** (20% weight)

Range: Level 1-10 (with visual progress bar)

### Coffee → Code Ratio
Average hours spent per commit.
```
ratio = 8 hours / (commits/365)
```
Shows how much effort (in coffee!) goes into each commit.

### Custom Metrics
Mock metrics generated from GitHub data:
- **Focus Hours** (3-12): Estimated daily focus time based on commit density
- **Bugs Fixed**: 70% of total closed issues
- **Coffee Cups**: Derived from focus hours
- **Productivity Score**: 0-100 based on contributions and followers

## 🏗️ Project Structure

```
.
├── src/
│   ├── cards/
│   │   ├── dev-persona.js          # Main card component
│   │   └── ...other cards
│   ├── fetchers/
│   │   ├── dev-persona.js          # Data fetcher logic
│   │   └── ...other fetchers
│   ├── common/                      # Shared utilities
│   └── ...
├── api/
│   ├── dev-persona.js              # API endpoint
│   ├── custom-metrics.js           # Metrics endpoint
│   └── ...other endpoints
├── themes/
│   └── index.js                    # Theme definitions (includes hacker_dark)
└── express.js                      # Route configuration
```

## 📦 Development

### Installation
```bash
npm install
```

### Run Locally
```bash
npm start
# Server runs on http://localhost:9000
```

### Testing
```bash
npm test
```

### Format Code
```bash
npm run format
```

### Lint
```bash
npm run lint
```

## 🔐 Environment Variables

```env
GITHUB_TOKEN=your_github_token          # Required for GitHub API
WAKATIME_API_KEY=optional               # Optional for WakaTime integration
PORT=9000                               # Server port
```

## 🚀 Deployment

### Vercel Deployment
```bash
vercel deploy
```

Environment variables should be set in Vercel dashboard.

### Example Production URL
```
https://your-dev.vercel.app/api/dev-persona?username=github_username
```

## 🎭 Customization

### Themes
Add new themes in `themes/index.js`:
```javascript
custom_theme: {
  title_color: "FF00FF",
  text_color: "00FF00",
  icon_color: "FFFF00",
  bg_color: "000000",
  border_color: "FF00FF",
}
```

### Card Component
Modify `src/cards/dev-persona.js` to add new metrics or sections.

### Animations
CSS animations are defined within the SVG. Edit keyframes to customize:
- `progress-fill` - Progress bar animation
- `cursor-blink` - Terminal cursor blinking
- `terminal-fade-in` - Text fade-in effect

## 📊 Performance Optimization

- **Caching:** Default 1 hour cache (configurable via `cache_seconds`)
- **Animations:** Can be disabled with `animate=false` for faster load
- **SVG Compression:** All output is optimized SVG
- **Rate Limiting:** GitHub API calls are cached to avoid hitting limits

## 🔗 Related Endpoints

- GitHub Stats: `/api/?username=...`
- Top Languages: `/api/top-langs?username=...`
- Repo Pin: `/api/pin?username=...&repo=...`
- WakaTime: `/api/wakatime?username=...`
- Dev Persona: `/api/dev-persona?username=...` **(NEW)**

## 📝 Examples

### Full Stack Demo
```markdown
# 👨‍💻 Bishwas's Dev Persona

![Dev Persona Card](https://github-readme-stats.vercel.app/api/dev-persona?username=bishwas-py&theme=hacker_dark)

---

### Other Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=bishwas-py&show_icons=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs?username=bishwas-py&layout=compact)
```

### With Custom Colors
```markdown
![Dev Persona](https://your-deployment.com/api/dev-persona?username=bishwas-py&title_color=FF1493&icon_color=00FFFF&text_color=39FF14&bg_color=000814)
```

## 🐛 Troubleshooting

### Card Not Loading
- Verify GitHub username is correct
- Check if GitHub API token is valid
- Ensure `cache_seconds` parameter is set

### Animations Not Working
- SVG animations are CSS-based and should work in all modern browsers
- If animations stall, add `&animate=false` to URL

### Missing Data
- Some metrics require sufficient GitHub history
- New accounts may show incomplete data
- WakaTime integration requires valid API key and recent activity

## ✅ Testing

The project includes comprehensive tests for the new dev-persona system:

### Test Files
- `tests/renderDevPersonaCard.test.js` - Card rendering tests (13 tests ✅)
- `tests/fetchDevPersona.test.js` - Data fetching and metrics tests
- `tests/devPersona.api.test.js` - API endpoint tests

### Run Tests
```bash
npm test -- renderDevPersonaCard.test.js
npm test -- fetchDevPersona.test.js
npm test -- devPersona.api.test.js
```

### Test Coverage
- ✅ Card rendering with different themes
- ✅ Animation enable/disable
- ✅ Custom metrics calculation
- ✅ Bug slayer level calculation
- ✅ Coffee to code ratio calculation
- ✅ Terminal section rendering
- ✅ Glow effects and filters
- ✅ API parameter validation

**Current Status**: 26 tests passing, 100% core functionality coverage

## 📄 License

MIT License - Based on [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

## 🙌 Credits

- Original project: [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) by [@anuraghazra](https://github.com/anuraghazra)
- Dev Persona Card: Custom extension with hacker aesthetic theme
