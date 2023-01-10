<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Get dynamically generated GitHub stats on your READMEs!</p>
</p>
  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/anuraghazra/github-readme-stats" />
    </a>
    <a href="https://codecov.io/gh/anuraghazra/github-readme-stats">
      <img src="https://codecov.io/gh/anuraghazra/github-readme-stats/branch/master/graph/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <br />
    <br />
    <a href="https://a.paddle.com/v2/click/16413/119403?link=1227">
      <img src="https://img.shields.io/badge/Supported%20by-VSCode%20Power%20User%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    <a href="https://a.paddle.com/v2/click/16413/119403?link=2345">
      <img src="https://img.shields.io/badge/Supported%20by-Node%20Cli.com%20%E2%86%92-gray.svg?colorA=61c265&colorB=4CAF50&style=for-the-badge"/>
    </a>
  </p>

  <p align="center">
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Request Feature</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/discussions">Ask Question</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français </a>
    ·
    <a href="/docs/readme_cn.md">简体中文</a>
    ·
    <a href="/docs/readme_es.md">Español</a>
    ·
    <a href="/docs/readme_de.md">Deutsch</a>
    ·
    <a href="/docs/readme_ja.md">日本語</a>
    ·
    <a href="/docs/readme_pt-BR.md">Português Brasileiro</a>
    ·
    <a href="/docs/readme_it.md">Italiano</a>
    ·
    <a href="/docs/readme_kr.md">한국어</a>
    .
    <a href="/docs/readme_nl.md">Nederlands</a>
    .
    <a href="/docs/readme_np.md">नेपाली</a>
    .
    <a href="/docs/readme_tr.md">Türkçe</a>
  </p>
</p>

<p align="center">Love the project? Please consider <a href="https://www.paypal.me/anuraghazra">donating</a> to help it improve!</p>

<a href="https://indiafightscorona.giveindia.org">
  <img src="https://indiaspora.org/wp-content/uploads/2021/04/give-India-logo.png" alt="Give india logo" width="200" />
</a>

Are you considering supporting the project by donating? Please DO NOT!!

Instead, Help India fight the second deadly wave of COVID-19.
Thousands of people are dying in India because of a lack of Oxygen & also COVID-related infrastructure.

Visit <https://indiafightscorona.giveindia.org> and make a small donation to help us fight COVID and overcome this crisis. A small donation goes a long way. :heart:

</p>

# Features

-   [GitHub Stats Card](#github-stats-card)
-   [GitHub Extra Pins](#github-extra-pins)
-   [Top Languages Card](#top-languages-card)
-   [Wakatime Week Stats](#wakatime-week-stats)
-   [Themes](#themes)
    -   [Responsive Card Theme](#responsive-card-theme)
-   [Customization](#customization)
    -   [Common Options](#common-options)
    -   [Stats Card Exclusive Options](#stats-card-exclusive-options)
    -   [Repo Card Exclusive Options](#repo-card-exclusive-options)
    -   [Language Card Exclusive Options](#language-card-exclusive-options)
    -   [Wakatime Card Exclusive Option](#wakatime-card-exclusive-options)
-   [Deploy Yourself](#deploy-on-your-own-vercel-instance)
    - [Keep your fork up to date](#keep-your-fork-up-to-date)   

# GitHub Stats Card

Copy-paste this into your markdown content, and that is it. Simple!

Change the `?username=` value to your GitHub username.

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

> **Note**
> Available ranks are S+ (top 1%), S (top 25%), A++ (top 45%), A+ (top 60%), and B+ (everyone). The values are calculated by using the [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) using commits, contributions, issues, stars, pull requests, followers, and owned repositories. The implementation can be investigated at [src/calculateRank.js](./src/calculateRank.js).

### Hiding individual stats

You can pass a query parameter `&hide=` to hide any specific stats with comma-separated values.

> Options: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Adding private contributions count to total commits count

You can add the count of all your private contributions to the total commits count by using the query parameter `&count_private=true`.

> **Note**
> If you are deploying this project yourself, the private contributions will be counted by default. If you are using the public Vercel instance, you need to choose to [share your private contributions](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/showing-your-private-contributions-and-achievements-on-your-profile).

> Options: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Showing icons

To enable icons, you can pass `show_icons=true` in the query param, like so:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Themes

With inbuilt themes, you can customize the look of the card without doing any [manual customization](#customization).

Use `&theme=THEME_NAME` parameter like so :

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### All inbuilt themes

GitHub readme stats comes with several built-in themes (e.g. `dark`, `radical`, `merko`, `gruvbox`, `tokyonight`, `onedark`, `cobalt`, `synthwave`, `highcontrast`, `dracula`).

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stats Themes" width="600px"/>

You can look at a preview for [all available themes](./themes/README.md) or checkout the [theme config file](./themes/index.js) & **you can also contribute new themes** if you like :D

#### Responsive Card Theme

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

Since GitHub will re-upload the cards and serve them from their [CDN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls), we can not infer the browser/GitHub theme on the server side. There are, however, four methods you can use to create dynamics themes on the client side.

##### Use the transparent theme

We have included a `transparent` theme that has a transparent background. This theme is optimized to look good on GitHub's dark and light default themes. You can enable this theme using the `&theme=transparent` parameter like so:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)
```

<details>
<summary>:eyes: Show example</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)

</details>

##### Add transparent alpha channel to a themes bg_color

You can use the `bg_color` parameter to make any of [the available themes](./themes/README.md) transparent. This is done by setting the `bg_color` to a colour with a transparent alpha channel (i.e. `bg_color=00000000`):

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)
```

<details>
<summary>:eyes: Show example</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)

</details>

##### Use GitHub's theme context tag

You can use [GitHub's theme context](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/) tags to switch the theme based on the user GitHub theme automatically. This is done by appending `#gh-dark-mode-only` or `#gh-light-mode-only` to the end of an image URL. This tag will define whether the image specified in the markdown is only shown to viewers using a light or a dark GitHub theme:

```md
[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)
```

<details>
<summary>:eyes: Show example</summary>

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

</details>

##### Use GitHub's new media feature

You can use [GitHub's new media feature](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/) in HTML to specify whether to display images for light or dark themes. This is done using the HTML `<picture>` element in combination with the `prefers-color-scheme` media feature.
  
```html
<picture>
<source 
  srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark"
  media="(prefers-color-scheme: dark)"
/>
<source
  srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true"
  media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
/>
<img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true" />
</picture>
```

<details>
<summary>:eyes: Show example</summary>

<picture>
<source 
  srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark"
  media="(prefers-color-scheme: dark)"
/>
<source
  srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true"
  media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
/>
<img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true" />
</picture>

</details>

### Customization

You can customize the appearance of your `Stats Card` or `Repo Card` however you wish with URL parameters.

#### Common Options

-   `title_color` - Card's title color _(hex color)_. Default: `2f80ed`.
-   `text_color` - Body text color _(hex color)_. Default: `434d58`.
-   `icon_color` - Icons color if available _(hex color)_. Default: `4c71f2`.
-   `border_color` - Card's border color _(hex color)_. Default: `e4e2e2` (Does not apply when `hide_border` is enabled).
-   `bg_color` - Card's background color _(hex color)_ **or** a gradient in the form of _angle,start,end_. Default: `fffefe`
-   `hide_border` - Hides the card's border _(boolean)_. Default: `false`
-   `theme` - name of the theme, choose from [all available themes](./themes/README.md). Default: `default` theme. 
-   `cache_seconds` - set the cache header manually _(min: 7200, max: 86400)_. Default: `14400 seconds (4 hours)`.
-   `locale` - set the language in the card _(e.g. cn, de, es, etc.)_. Default: `en`.
-   `border_radius` - Corner rounding on the card. Default: `4.5`.

> **Warning**
> We use caching to decrease the load on our servers (see https://github.com/anuraghazra/github-readme-stats/issues/1471#issuecomment-1271551425). Our cards have a default cache of 4 hours (14400 seconds). Also, note that the cache is clamped to a minimum of 4 hours and a maximum of 24 hours.

##### Gradient in bg_color

You can provide multiple comma-separated values in the bg_color option to render a gradient with the following format:

    &bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10

#### Stats Card Exclusive Options

-   `hide` - Hides the [specified items](#hiding-individual-stats) from stats _(Comma-separated values)_. Default: `[] (blank array)`.
-   `hide_title` - _(boolean)_. Default: `false`.
-   `card_width` - Set the card's width manually _(number)_. Default: `500px  (approx.)`.
-   `hide_rank` - _(boolean)_ hides the rank and automatically resizes the card width. Default: `false`.
-   `show_icons` - _(boolean)_. Default: `false`.
-   `include_all_commits` - Count total commits instead of just the current year commits _(boolean)_. Default: `false`.
-   `count_private` - Count private commits _(boolean)_. Default: `false`.
-   `line_height` - Sets the line height between text _(number)_. Default: `25`.
-   `exclude_repo` - Exclude stars from specified repositories _(Comma-separated values)_. Default: `[] (blank array)`.
-   `custom_title` - Sets a custom title for the card. Default:  `<username> GitHub Stats`.
-   `text_bold` - Use bold text _(boolean)_. Default: `true`.
-   `disable_animations` - Disables all animations in the card _(boolean)_. Default: `false`.
-   `ring_color` - Color of the rank circle _(hex color)_. Defaults to the theme ring color if it exists and otherwise the title color.

> **Note**
> When hide_rank=`true`, the minimum card width is 270 px + the title length and padding.

#### Repo Card Exclusive Options

-   `show_owner` - Show the repo's owner name _(boolean)_. Default: `false`.

#### Language Card Exclusive Options

-   `hide` - Hide the languages specified from the card _(Comma-separated values)_. Default: `[] (blank array)`.
-   `hide_title` - _(boolean)_. Default: `false`.
-   `layout` - Switch between two available layouts `default` & `compact`. Default: `default`.
-   `card_width` - Set the card's width manually _(number)_. Default `300`.
-   `langs_count` - Show more languages on the card, between 1-10 _(number)_. Default `5`.
-   `exclude_repo` - Exclude specified repositories _(Comma-separated values)_. Default: `[] (blank array)`.
-   `custom_title` - Sets a custom title for the card _(string)_. Default `Most Used Languages`.

> **Warning**
> Language names should be URI-escaped, as specified in [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)
> (i.e: `c++` should become `c%2B%2B`, `jupyter notebook` should become `jupyter%20notebook`, etc.) You can use
> [urlencoder.org](https://www.urlencoder.org/) to help you do this automatically.

#### Wakatime Card Exclusive Options

-   `hide` - Hide the languages specified from the card _(Comma-separated values)_. Default: `[] (blank array)`.
-   `hide_title` - _(boolean)_. Default `false`.
-   `line_height` - Sets the line height between text _(number)_. Default `25`.
-   `hide_progress` - Hides the progress bar and percentage _(boolean)_. Default `false`.
-   `custom_title` - Sets a custom title for the card _(string)_. Default `Wakatime Stats`.
-   `layout` - Switch between two available layouts `default` & `compact`.  Default `default`.
-   `langs_count` - Limit the number of languages on the card, defaults to all reported languages _(number)_.
-   `api_domain` - Set a custom API domain for the card, e.g. to use services like [Hakatime](https://github.com/mujx/hakatime) or [Wakapi](https://github.com/muety/wakapi) _(string)_. Default `Waka API`.
-   `range` – Request a range different from your WakaTime default, e.g. `last_7_days`. See [WakaTime API docs](https://wakatime.com/developers#stats) for a list of available options. _(YYYY-MM, last_7_days, last_30_days, last_6_months, last_year, or all_time)_. Default `all_time`.

* * *

# GitHub Extra Pins

GitHub extra pins allow you to pin more than six repositories in your profile using a GitHub readme profile.

Yay! You are no longer limited to 6 pinned repositories.

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Use [show_owner](#customization) variable to include the repo's owner username

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Top Languages Card

The top languages card shows a GitHub user's most frequently used top language.

> **Note**
> Top Languages does not indicate my skill level or anything like that; it's a GitHub metric to determine which languages have the most code on GitHub. It is a new feature of github-readme-stats._

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Exclude individual repositories

You can use the `&exclude_repo=repo1,repo2` parameter to exclude individual repositories.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### Hide individual languages

You can use `&hide=language1,language2` parameter to hide individual languages.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Show more languages

You can use the `&langs_count=` option to increase or decrease the number of languages shown on the card. Valid values are integers between 1 and 10 (inclusive), and the default is 5.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### Compact Language Card Layout

You can use the `&layout=compact` option to change the card design.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

-   Compact layout

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime Week Stats

Change the `?username=` value to your [Wakatime](https://wakatime.com) username.

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

> **Note**:
> Please be aware that we currently only show data from Wakatime profiles that are public.

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

-   Compact layout

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

* * *

### All Demos

-   Default

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

-   Hiding specific stats

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

-   Showing icons

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

-   Customize Border Color

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

-   Include All Commits

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

-   Themes

Choose from any of the [default themes](#themes)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

-   Gradient

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

-   Customizing stats card

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

-   Setting card locale

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

-   Customizing repo card

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

-   Top languages

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

-   WakaTime card

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

* * *

### Quick Tip (Align The Repo Cards)

By default, GitHub does not lay out the cards side by side. To do that, you can use this approach:

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Deploy on your own Vercel instance

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

> **Warning**
> If you are on the [hobby (i.e. free)](https://vercel.com/pricing) Vercel plan, please make sure you change the `maxDuration` parameter in the [vercel.json](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json) file from `30` to `10` (see [#1416](https://github.com/anuraghazra/github-readme-stats/issues/1416#issuecomment-950275476) for more information).

Since the GitHub API only allows 5k requests per hour, my `https://github-readme-stats.vercel.app/api` could possibly hit the rate limiter. If you host it on your own Vercel server, then you do not have to worry about anything. Click on the deploy button to get started!

> **Note**
> Since [#58](https://github.com/anuraghazra/github-readme-stats/pull/58), we should be able to handle more than 5k requests and have fewer issues with downtime :grin:.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b>:hammer_and_wrench: Step-by-step guide on setting up your own Vercel instance</b></summary>

1.  Go to [vercel.com](https://vercel.com/).
2.  Click on `Log in`.
    ![](https://files.catbox.moe/pcxk33.png)
3.  Sign in with GitHub by pressing `Continue with GitHub`.
    ![](https://files.catbox.moe/b9oxey.png)
4.  Sign in to GitHub and allow access to all repositories if prompted.
5.  Fork this repo.
6.  After forking the repo, open the [`vercel.json`](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json#L5) file and change the `maxDuration` field to `10`.
7.  Go back to your [Vercel dashboard](https://vercel.com/dashboard).
8.  To import a project, click the `Add New...` button and select the `Project` option.
    ![](https://files.catbox.moe/3n76fh.png)
9.  Click the `Continue with GitHub` button, search for the required Git Repository and import it by clicking the `Import` button. Alternatively, you can import a Third-Party Git Repository using the `Import Third-Party Git Repository ->` link at the bottom of the page.
    ![](https://files.catbox.moe/mg5p04.png)
10. Create a personal access token (PAT) [here](https://github.com/settings/tokens/new) and enable the `repo` permissions (this allows access to see private repo stats).
11. Add the PAT as an environment variable named `PAT_1` (as shown).
    ![](https://files.catbox.moe/0yclio.png)
12. Click deploy, and you're good to go. See your domains to use the API!

</details>

### Keep your fork up to date

You can keep your fork, and thus your private Vercel instance up to date with the upstream using GitHubs' [Sync Fork button](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork). You can also use the [pull](https://github.com/wei/pull) package created by [@wei](https://github.com/wei) to automate this process.

## :sparkling_heart: Support the project

I open-source almost everything I can and try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and are happy with it or just want to encourage me to continue creating stuff, there are a few ways you can do it:

-   Giving proper credit when you use github-readme-stats on your readme, linking back to it :D
-   Starring and sharing the project :rocket:
-   [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:

Thanks! :heart:

* * *

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](./powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

Contributions are welcome! &lt;3

Made with :heart: and JavaScript.
