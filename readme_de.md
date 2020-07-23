<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="Github Readme Stats" /> 
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Zeige dynamisch generierte GitHub-Statistiken in deinen Readmes!</p>
</p>

  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
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
  </p>

  <p align="center">
    <a href="#demo">Beispiel ansehen</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">Fehler melden</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">Funktionalität anfragen</a>
  </p>
</p>
<p align="center">Du magst das Projekt? Wie wäre es mit einer kleinen <a href="https://www.paypal.me/anuraghazra">Spende</a> um es weiterhin am Leben zu erhalten?

# Funktionalitäten

- [GitHub Statistik](#github-stats-card)
- [GitHub Repo Pins](#github-extra-pins)
- [Top Sprachen](#top-languages-card)
- [Aussehen/Themes](#themes)
- [Anpassungen/Personalisierung](#customization)
- [Selber bereitstellen](#deploy-on-your-own-vercel-instance)

# GitHub Statistik

Kopiere einfach folgendes in dein Markdown und das wars. Echt simpel!

Passe den Wert des URL-Paramters `?username=` so an, dass dort dein GitHub Username steht.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Hinweis: Die Berechnung des Ranges basiert auf den jeweiligen Benutzerstatistiken, siehe [src/calculateRank.js](./src/calculateRank.js)_

### Verbergen individueller Statistiken

Um eine spezifische Statistik auszublenden, kann dem Query-Parameter `?hide=` mit einem Array an Dingen die nicht angezeigt werden sollen übergeben werden.

> Optionen: `&hide=["stars","commits","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### Icons anzeigen

To enable icons, you can pass `show_icons=true` in the query param, like so:

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Aussehen/Themes

Mithilfe der eingebauten Themes kannst das Aussehen der Karten verändern ohne manuelle Anpassungen vornehmen zu müssen.

Benutze den `?theme=THEME_NAME`-Parameter wie folgt :-

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Alle eingebauten Themes :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="Github Readme Stat Themes" width="600px"/>

Du kannst dir eine Vorschau [aller verfügbaren Themes](./themes/README.md) ansehen oder die [theme config Datei](./themes/index.js) auschecken.
Außerdem **kannst du neue Themes beisteuern** wenn du möchtest, contributions sind gern gesehen :D

### Anpassungen/Personalisierung

Du kannst das Erscheinungsbild deiner `Stats Card` oder `Repo Card`, mithilfe von URL-Parameters, nach deinen Vorlieben anpassen.

Anpassungsoptionen:

| Option           | Type      | Beschreibung                                         | Statistiken (default) | Repo (default)      | Top Sprachen (default)  |
| ---------------- | --------- | -----------------------------------------------------| --------------------- | ------------------- | ----------------------- |
| title_color      | hex color | Titelfarbe                                          | 2f80ed                | 2f80ed              | 2f80ed                  |
| text_color       | hex color | Textkörperfarbe                                     | 333                   | 333                 | 333                     |
| icon_color       | hex color | Iconfarbe                                           | 4c71f2                | 586069              | 586069                  |
| bg_color         | hex color | Hintergrundfarbe                                     | FFFEFE                | FFFEFE              | FFFEFE                  |
| line_height      | number    | kontrolliert die Zeilenhöhe zwischen dem Text        | 30                    | N/A                 | N/A                     |
| hide_rank        | boolean   | blendet das Ranking aus                              | false                 | N/A                 | N/A                     |
| hide_title       | boolean   | blendet den Statistik-Titel aus                      | false                 | N/A                 | false                   |
| hide_border      | boolean   | blendet den Rahmen aus                               | false                 | N/A                 | N/A                     |
| show_owner       | boolean   | zeigt den Namen des Besitzers in der Repo-Karte      | N/A                   | false               | N/A                     |
| show_icons       | boolean   | zeige Icons an                                       | false                 | N/A                 | N/A                     |
| theme            | string    | setze eingebaute themes                              | 'default'             | 'default_repocard'  | 'default'               |
| cache_seconds    | number    | manuelles setzen der Cachezeiten                     | 1800                  | 1800                | '1800'                  |
| hide_langs_below | number    | verberge Sprachen unter einem bestimmten Schwellwert | N/A                   | N/A                 | undefined               |

> Hinweis bzgl. des Caches: Wenn die Anzahl der Forks und Stars geringer als 1Tsd ist, haben die Repo-Cards eine default Cachezeit von 30 Minuten (1800 Sekunden), ansonsten beträgt diese 2 Stunden (7200 Sekunden). Außerdem ist der Cache auf eine Minimum von 30 Minuten und ein Maximum von 24 Stunden begrenzt.

# GitHub Extra Pins

GitHub extra pins allow you to pin more than 6 repositories in your profile using a GitHub readme profile.

Yey! You are no longer limited to 6 pinned repositories.

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Use [show_owner](#customization) variable to include the repo's owner username

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Top Languages Card

Top languages card shows github user's top langauges which has been mostly used.

_NOTE: Top languages does not indicate my skill level or something like that, it's a github metric of which languages i have the most code on github, it's a new feature of github-readme-stats_

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Hide languages below certain threshold

You can use `?hide_langs_below=NUMBER` parameter to hide languages below a specified threshold percentage.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide_langs_below=1)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### All Demos

- Default

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Hiding specific stats

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- Showing icons

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

- Themes

Choose from any of the [default themes](#themes)

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Customizing stats card

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Customizing repo card

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Top languages

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Quick Tip (Align The Repo Cards)

You usually won't be able to layout the images side by side. To do that you can use this approach:

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Deploy on your own Vercel instance

Since the GitHub API only allows 5k requests per hour, it is possible that my `https://github-readme-stats.vercel.app/api` could hit the rate limiter. If you host it on your own Vercel server, then you don't have to worry about anything. Click on the deploy button to get started!

NOTE: Since [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) we should be able to handle more than 5k requests and have no issues with downtime :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Guide on setting up Vercel</summary>

1. Go to [vercel.com](https://vercel.com/)
1. Click on `Log in`  
   ![](https://files.catbox.moe/tct1wg.png)
1. Sign in with GitHub by pressing `Continue with GitHub`  
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Sign into GitHub and allow access to all repositories, if prompted
1. Fork this repo
1. Go back to your [Vercel dashboard](https://vercel.com/dashboard)
1. Select `Import Project`  
   ![](https://files.catbox.moe/qckos0.png)
1. Select `Import Git Repository`  
   ![](https://files.catbox.moe/pqub9q.png)
1. Select root and keep everything as is, just add your environment variable named PAT_1 (as shown), which will contain a personal access token (PAT), which you can easily create [here](https://github.com/settings/tokens/new) (leave everything as is, just name it something, it can be anything you want)
   ![](https://files.catbox.moe/0ez4g7.png)
1. Click deploy, and you're good to go. See your domains to use the API!
</details>

## :sparkling_heart: Support the project

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use github-readme-stats on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:

Thanks! :heart:

---

Contributions are welcomed! <3

Made with :heart: and JavaScript.
