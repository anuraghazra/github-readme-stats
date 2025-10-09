# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub Readme Stats is a serverless application that dynamically generates SVG cards displaying GitHub statistics. It's deployed on Vercel as a public API and serves millions of requests. The project generates stats cards, repository cards, language cards, Gist cards, and WakaTime cards.

## Development Commands

### Setup
```bash
npm install                    # Install dependencies
vercel                        # Link to Vercel project (first time only)
vercel dev                    # Start local development server at http://localhost:3000
```

Create `.env` file with `NODE_ENV=development` to disable caching during local development.

### Testing
```bash
npm test                      # Run all tests with coverage
npm run test:watch            # Run tests in watch mode
npm run test:update:snapshot  # Update test snapshots
npm run test:e2e             # Run end-to-end tests
npm run bench                # Run benchmark tests
```

### Code Quality
```bash
npm run lint                 # Lint JavaScript files with ESLint
npm run format               # Format code with Prettier
npm run format:check         # Check formatting without changes
```

### Utilities
```bash
npm run theme-readme-gen      # Generate theme documentation
npm run preview-theme         # Preview a theme locally
npm run generate-langs-json   # Generate language colors JSON
```

### Testing Single Tests
To run a specific test file:
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js tests/fetchStats.test.js
```

### Alternative Deployment (Non-Vercel)
For platforms other than Vercel:
1. Move `express` from devDependencies to dependencies in package.json
2. Run `npm i`
3. Run `node express.js` to start the Express server

## Architecture

### Request Flow
1. **API Endpoints** (`api/*.js`) - Vercel serverless functions that handle HTTP requests
2. **Fetchers** (`src/fetchers/*.js`) - Retrieve data from GitHub GraphQL/REST APIs or WakaTime
3. **Renderers** (`src/cards/*.js`) - Generate SVG cards from fetched data
4. **Common Utilities** (`src/common/*.js`) - Shared utilities for rendering, caching, theming, etc.

### Key Components

**Fetchers Pattern**: All fetchers (`src/fetchers/*.js`) use a retryer utility to handle rate limiting and transient errors. They make GraphQL or REST API calls to GitHub and transform responses into normalized data structures.

**Card Rendering**: Cards (`src/cards/*.js`) use the `Card` class (`src/common/Card.js`) as a base. They build SVG elements using template strings and the `flexLayout` utility for positioning elements. Each card type has specific rendering logic for its data visualization.

**Caching Strategy**: Cache headers are set based on environment variables and card type. Public instance uses longer cache times (24h for stats, 6 days for languages) to avoid rate limits. Cache utilities are in `src/common/cache.js`.

**Theme System**: Themes (`themes/index.js`) define color schemes. The `getCardColors` function in `src/common/utils.js` handles theme resolution, allowing individual color overrides via query parameters. Gradient backgrounds are supported via the `bg_color` parameter.

**Access Control**: `guardAccess` (`src/common/access.js`) enforces whitelists for usernames and gist IDs when configured via environment variables. It also blocks certain color/theme combinations to prevent abuse.

**Error Handling**: Custom error classes (`CustomError`, `MissingParamError`) provide structured error responses. Errors render as SVG cards using `renderError` to maintain consistent user experience.

### Data Flow Example (Stats Card)
1. User requests `/api?username=anuraghazra`
2. `api/index.js` parses query parameters and validates access
3. `fetchStats` retrieves user data via GitHub GraphQL API
4. `calculateRank` computes user rank from stats
5. `renderStatsCard` generates SVG with themed colors
6. Cache headers are set based on configuration
7. SVG is returned to user

### Multi-Page Fetching
Star counts support pagination when `FETCH_MULTI_PAGE_STARS=true` (disabled on public instance). The `statsFetcher` function iteratively fetches repository pages until no more data or rate limits are reached.

### GraphQL Query Structure
Stats are fetched using conditional includes (`@include(if: $variable)`) to minimize API usage. Queries are in `src/fetchers/stats.js` with variables controlling what data is retrieved (merged PRs, discussions, etc.).

### Language Detection
Top languages card uses GitHub's language detection from repositories. The algorithm supports weighting by size and/or count of repositories using `size_weight` and `count_weight` parameters.

## Important Patterns

**Testing with Jest**: Tests use `@testing-library/jest-dom` for DOM assertions. Mock axios responses with `axios-mock-adapter`. Set `NODE_ENV=test` to disable animations in generated SVGs.

**Environment Variables**:
- `PAT_1`: GitHub Personal Access Token (required)
- `CACHE_SECONDS`: Override default cache duration
- `WHITELIST`: Comma-separated list of allowed usernames
- `GIST_WHITELIST`: Comma-separated list of allowed gist IDs
- `EXCLUDE_REPO`: Default excluded repositories (not exposed in URLs)
- `FETCH_MULTI_PAGE_STARS`: Enable multi-page star fetching
- `NODE_ENV=development`: Disable caching for local development

**SVG Rendering**: All cards return SVG with embedded CSS. Animations use `@keyframes`. The `flexLayout` utility positions SVG groups. Text wrapping uses `word-wrap` package or custom logic for CJK languages.

**i18n Support**: Translations are in `src/translations.js`. The `I18n` class (`src/common/I18n.js`) handles locale-specific strings. Cards support 40+ locales via the `locale` parameter.

**Rank Calculation**: User ranking uses exponential and log-normal distributions based on commits, PRs, reviews, issues, stars, and followers. Implementation is in `src/calculateRank.js`.

## Common Tasks

### Adding a New Stat to Stats Card
1. Update GraphQL query in `src/fetchers/stats.js` to fetch the data
2. Add the stat to the `stats` object returned by `fetchStats`
3. Add stat metadata to `STATS` object in `src/cards/stats.js`
4. Handle the stat in `statItems` array (respecting hide/show logic)
5. Add translation strings to `src/translations.js`
6. Add tests in `tests/fetchStats.test.js` and `tests/renderStatsCard.test.js`

### Debugging Rate Limits
Check if API tokens are configured. On Vercel, add `PAT_1` environment variable. For self-hosted instances, multiple tokens (`PAT_1`, `PAT_2`, etc.) can be rotated. The retryer in `src/common/retryer.js` handles automatic retry with backoff.

### Working with Themes
Themes are frozen - no new themes accepted. For custom colors, use query parameters (`title_color`, `text_color`, `icon_color`, `bg_color`, `border_color`, `ring_color`). Values must be hex colors without `#` prefix.

## Testing Strategy

Tests are organized by component:
- `tests/fetch*.test.js` - Test data fetching logic
- `tests/render*.test.js` - Test SVG rendering
- `tests/api.test.js` - Test API endpoints
- `tests/e2e/*.test.js` - End-to-end integration tests

Mock GitHub API responses in tests to avoid real API calls. Use snapshot testing for SVG output validation.

## Special Notes

- **No new themes**: Theme PRs will be closed. Use customization options instead.
- **Year-specific commits**: Use `commits_year` parameter to count commits from a specific year
- **Private stats**: Deploy your own instance with PAT to show private repository stats
- **Language card limitations**: Only first 100 repositories are counted (GitHub API constraint)
- **Rank calculation**: Based on weighted percentiles, not absolute values
- **URL encoding**: Custom titles and language names must be URL-encoded (use `encodeURIComponent`)

## Scripts (`scripts/`)

- `generate-langs-json.js` - Fetches language colors from GitHub's linguist library
- `generate-theme-doc.js` - Generates theme preview documentation
- `preview-theme.js` - Previews themes locally during development
- `close-stale-theme-prs.js` - GitHub Action script to close theme PRs
- `helpers.js` - Shared utilities for scripts
