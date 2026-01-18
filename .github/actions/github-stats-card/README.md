# GitHub Stats Card Action

Generate GitHub stats cards (stats, repo-pins, top-languages) as static SVG files in your repository. The cards are updated automatically via GitHub Actions and can be referenced directly in your README.

## Features

- 📊 **Static SVG files** - Cards are stored as regular files in your repo
- 🚀 **No external services** - Uses GitHub's own file distribution
- 🔄 **Automatic updates** - Runs on schedule or manually
- 🎨 **Fully customizable** - All themes and options supported
- 📦 **Multiple card types** - Stats, repo-pins, and top-languages cards

## Quick Start

### Stats Card

Create `.github/workflows/stats-card.yml`:

```yaml
name: Update Stats Card

on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-stats:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
        with:
          username: ${{ github.repository_owner }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Top Languages Card

Create `.github/workflows/langs-card.yml`:

```yaml
name: Update Languages Card

on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-langs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
        with:
          username: ${{ github.repository_owner }}
          card_type: langs
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Repo Pin Card

Create `.github/workflows/repo-card.yml`:

```yaml
name: Update Repo Card

on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-repo:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
        with:
          username: ${{ github.repository_owner }}
          card_type: repo
          repo: github-readme-stats
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Usage in README

After the workflow runs, reference your cards in your README:

```markdown
![Stats](./github-stats/stats.svg)
![Languages](./github-stats/langs.svg)
![Repo](./github-stats/repo.svg)
```

## Card Types

Use `card_type` to specify which card to generate:

| Type | Description | Required Parameters |
|------|-------------|---------------------|
| `stats` | GitHub stats card (default) | `username` |
| `langs` | Top languages card | `username` |
| `repo` | Repository pin card | `username`, `repo` |

## Inputs

### Common Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `username` | GitHub username | Yes | - |
| `card_type` | Card type: `stats`, `repo`, or `langs` | No | `stats` |
| `token` | GitHub token | Yes | `${{ github.token }}` |
| `output` | Output directory | No | `github-stats` |
| `filename` | Output filename | No | `stats.svg` (or `langs.svg`, `repo.svg`) |
| `commit_message` | Commit message | No | `Update stats card` |
| `branch` | Target branch | No | Current branch |
| `theme` | Card theme | No | - |
| `hide_border` | Hide card border | No | `false` |
| `hide_title` | Hide card title | No | `false` |
| `custom_title` | Custom card title | No | - |
| `bg_color` | Background color | No | - |
| `title_color` | Title color | No | - |
| `text_color` | Text color | No | - |
| `icon_color` | Icon color | No | - |
| `border_color` | Border color | No | - |
| `border_radius` | Border radius | No | - |
| `locale` | Locale | No | - |
| `disable_animations` | Disable animations | No | `false` |

### Stats Card Options

| Input | Description |
|-------|-------------|
| `show_icons` | Show icons next to stats |
| `hide_rank` | Hide rank level circle |
| `include_all_commits` | Include all commits (slower) |
| `exclude_repo` | Comma-separated repos to exclude |
| `hide` | Comma-separated stats to hide (e.g., `issues,contribs`) |
| `show` | Comma-separated stats to show (e.g., `prs_merged,reviews`) |

### Repo Card Options

| Input | Description |
|-------|-------------|
| `repo` | Repository name (`owner/repo` or just `repo-name`) |
| `show_owner` | Show owner in card title |
| `description_lines_count` | Number of description lines (1-3) |

### Top Languages Card Options

| Input | Description |
|-------|-------------|
| `langs_count` | Number of languages to show (1-20) |
| `hide_progress` | Hide progress bar |
| `layout` | Layout: `normal`, `compact`, `donut`, `donut-vertical`, `pie` |
| `stats_format` | Format: `percentages` or `bytes` |
| `exclude_repo` | Comma-separated repos to exclude |
| `hide` | Comma-separated languages to hide |

## Examples

### Stats Card with Theme

```yaml
- uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
  with:
    username: ${{ github.repository_owner }}
    card_type: stats
    theme: dracula
    show_icons: true
    hide_rank: true
```

### Top Languages - Donut Layout

```yaml
- uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
  with:
    username: ${{ github.repository_owner }}
    card_type: langs
    layout: donut
    langs_count: 8
```

### Top Languages - Pie Layout

```yaml
- uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
  with:
    username: ${{ github.repository_owner }}
    card_type: langs
    layout: pie
```

### Multiple Cards in One Workflow

```yaml
jobs:
  cards:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Stats Card
        uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
        with:
          username: ${{ github.repository_owner }}
          card_type: stats
          filename: stats.svg

      - name: Languages Card
        uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
        with:
          username: ${{ github.repository_owner }}
          card_type: langs
          filename: langs.svg

      - name: Repo Card
        uses: anuraghazra/github-readme-stats/.github/actions/github-stats-card@master
        with:
          username: ${{ github.repository_owner }}
          card_type: repo
          repo: ${{ github.repository }}
          filename: repo.svg
```

## Available Themes

See [THEMES.md](../../docs/themes.md) for all available themes.

Common themes: `default`, `dark`, `dracula`, `tokyonight`, `monokai`, `vue`, `nord`, `radical`

## Permissions

The action requires `contents: write` permission to commit the generated SVG:

```yaml
permissions:
  contents: write
```

## Build the Action

If you modify the action source, rebuild the bundled entry and commit it:

```bash
cd .github/actions/github-stats-card
npm install
npm run build
```

This updates `dist/index.js`, which is the file referenced by `action.yml`.

## How It Works

1. The action runs on schedule (e.g., every 6 hours) or manually
2. It fetches data from GitHub via the GitHub API
3. It generates an SVG card and saves it to your repository
4. The action commits and pushes the changes automatically
5. Your README displays the updated card via GitHub's file hosting
