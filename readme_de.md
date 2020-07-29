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
    <a href="#alle-beispiele">Beispiel ansehen</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">Fehler melden</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">Funktionalität anfragen</a>
  </p>
</p>
<p align="center">Du magst das Projekt? Wie wäre es mit einer kleinen <a href="https://www.paypal.me/anuraghazra">Spende</a> um es weiterhin am Leben zu erhalten?

# Funktionalitäten

- [GitHub Stats Card](#github-stats-card)
- [GitHub Extra Pins](#github-extra-pins)
- [Top Programmiersprachen Card](#top-programmiersprachen-card)
- [Erscheinungsbild/Themes](#erscheinungsbildthemes)
- [Anpassungen](#anpassungenpersonalisierung)
- [Selber betreiben](#betreibe-es-auf-deiner-eigenen-vercel-instanz)

# GitHub Stats Card

Kopiere einfach folgendes in dein Markdown und das wars. Echt simpel!

Passe den Wert des URL-Paramters `?username=` so an, dass dort dein GitHub Username steht.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Hinweis: Die Berechnung des Ranges basiert auf den jeweiligen Benutzerstatistiken, siehe [src/calculateRank.js](./src/calculateRank.js)_

### Verbergen individueller Statistiken

Um eine spezifische Statistik auszublenden, kann dem Query-Parameter `?hide=` ein Array an Dingen die nicht angezeigt werden sollen übergeben werden.

> Optionen: `&hide=["stars","commits","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### Icons anzeigen

Um Icons anzuzeigen kann der URL-Paramter `show_icons=true` wie folgt verwendet werden:

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Erscheinungsbild/Themes

Mithilfe der eingebauten Themes kann das Aussehen der Karten verändern werden ohne manuelle Anpassungen vornehmen zu müssen.

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

Du kannst das Erscheinungsbild deiner `Stats Card` oder `Repo Card`, mithilfe von URL-Parametern, nach deinen Vorlieben anpassen.

Anpassungsoptionen:

| Option           | Type      | Beschreibung                                         | Statistiken (default) | Repo (default)      | Top Programmiersprachen (default)  |
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

GitHub extra pins ermöglicht es, mit Hilfe eines GitHub-Readme-Profiles, mehr als 6 Repositories in deinen Profil anzuzeigen.

Und Bääm! Du bist nicht mehr auf 6 pinned Repositories limitiert.

### Benutzung

Füge diesen Code in deine Readme-Datei ein und passe die Links an.

Endpunkt: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Beispiele

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Benutze die [show_owner](#anpassungenpersonalisierung) Variable, um den Usernamen des Repo Eigentümers anzuzeigen.

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Top Programmiersprachen Card

Die Top Programmiersprachen Card visualisiert die am meisten benutzten Programmiersprachen eines GitHub-Nutzers.

_HINWEIS: Die Top Programmiersprachen treffen keine Aussage über persönliche Fähigkeiten oder der gleichen, es ist lediglich eine auf den GitHub-Statistiken des Nutzers basierende Kennzahl welche Programmiersprache wie häufig verwendet wurde._

### Benutzung

Füge diesen Code in deine Readme-Datei ein und passe die Links an.

Endpunkt: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Verberge Programmiersprachen unter einem bestimmten Schwellwert

Benutze den `?hide_langs_below=NUMBER` URL-Parameter um Programmiersprachen unter einem bestimmten prozentualen Schwellwert auszublenden.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide_langs_below=1)](https://github.com/anuraghazra/github-readme-stats)
```

### Beispiel

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Alle Beispiele

- Default

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Ausblenden bestimmter Statistiken

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- Icons anzeigen

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

- Erscheinungsbild/Themes

Choose from any of the [default themes](#themes)

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Stats Card anpassen

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Repo Card anpassen

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Top Programmiersprachen

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Kleiner Tip (Ausrichten der Repo Cards)

Üblicherweise ist es in `.md`-Dateien nicht möglich Bilder nebeneinander anzuzeigen. Um dies zu erreichen kann folgender Ansatz gewählt werden:

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Betreibe es auf deiner eigenen Vercel-Instanz

Da die GitHub API nur 5tsd Aufrufe pro Stunde zulässt, kann es passieren, dass meine `https://github-readme-stats.vercel.app/api` dieses Limit erreicht.
Wenn du es auf deinem eigenen Vercel-Server hostest, brauchst du dich darum nicht zu kümmern. Klicke auf den Deploy-Button um loszulegen!

Hinweis: Seit [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) sollte es möglich sein mehr als 5tsd Aufrufe pro Stunde ohne Downtimes zu verkraften :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Anleitung zum Einrichten von Vercel</summary>

1. Gehe zu [vercel.com](https://vercel.com/)
1. Klicke auf `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. Melde dich mit deinem GitHub-account an, indem du `Continue with GitHub` klickst
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Verbinde dich mit GitHub und erlaube den Zugriff auf alle Repositories, wenn gefordert
1. Forke dieses Repository
1. Gehe zurück zu deinem [Vercel dashboard](https://vercel.com/dashboard)
1. Klick `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. Klick `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. Wähle root und füge eine Umgebungsvariable namens PAT_1 (siehe Abbildung) die als Wert deinen persönlichen Access Token (PAT) hat hinzu, den du einfach [hier](https://github.com/settings/tokens/new) erzeugen kannst (lasse alles wie es ist, vergebe einen beliebigen Namen)
   ![](https://files.catbox.moe/0ez4g7.png)
1. Klicke deploy, und das wars. Besuche deine domains um die API zu benutzen!
</details>

## :sparkling_heart: Unterstütze das Projekt

Ich versuche alles was ich kann als Open-Source zur Verfügung zu stellen, als auch jedem der Hilfe bei der Benutzung dieses Projektes braucht zu antworten. Natürlich beansprucht sowas Zeit und Du kannst diesen Dienst kostenlos benutzen.

Dennoch, wenn Du dieses Projekt benutzt und damit zufrieden bist oder mich einfach nur motivieren möchtest weiterhin daran zu arbeiten, gibt es verschiedene Sachen die Du machen kannst:-

- Erwähne und verlinke das Projekt in deiner Readme wenn du es benutzt :D
- Geb dem Projekt einen Stern hier auf GitHub und teile es :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Du kannst einmalige Spenden via PayPal tätigen. Ich kaufe mir wahrscheinlich einen ~~Kaffee~~ Tee davon. :tea:

Vielen Dank! :heart:

---

Mitarbeit an dem Projekt is immer Willkommen! <3

Gebaut mit :heart: und JavaScript.
