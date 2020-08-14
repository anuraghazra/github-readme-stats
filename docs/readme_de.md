<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" /> 
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
    <a href="#demo">Beispiel ansehen</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Fehler melden</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Funktion wünschen</a>
  </p>
  <p align="center">
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
    <a href="/docs/readme_kr.md">한국어</a>
  </p>
</p>
<p align="center">Du magst das Projekt? Wie wäre es mit einer kleinen <a href="https://www.paypal.me/anuraghazra">Spende</a> um es weiterhin am Leben zu erhalten?

# Funktionen

- [GitHub Statistiken-Karte](#github-statistiken-karte)
- [GitHub Extra Pins](#github-extra-pins)
- [Top Programmiersprachen-Karte](#top-programmiersprachen-karte)
- [Erscheinungsbild/Themes](#erscheinungsbildthemes)
- [Anpassungen/Personalisierung](#anpassungenpersonalisierung)
- [Selber betreiben](#betreibe-es-auf-deiner-eigenen-vercel-instanz)

# GitHub Statistiken-Karte

Kopiere einfach folgendes in dein Markdown und das wars. Echt simpel!

Passe den Wert des URL-Parameters `?username=` so an, dass dort dein GitHub Nutzername steht.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Hinweis: Die Berechnung des Ranges basiert auf den jeweiligen Benutzerstatistiken, siehe [src/calculateRank.js](../src/calculateRank.js)_

### Verbergen individueller Statistiken

Um eine spezifische Statistik auszublenden, kann dem Query-Parameter `?hide=` ein Array an Optionen, die nicht angezeigt werden sollen, übergeben werden.

> Optionen: `&hide=["stars","commits","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### Symbole anzeigen

Um Symbole anzuzeigen kann der URL-Paramter `show_icons=true` wie folgt verwendet werden:

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

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

Du kannst dir eine Vorschau [aller verfügbaren Themes](../themes/README.md) ansehen oder die [theme config Datei](../themes/index.js) ansehen.  
Außerdem **kannst du neue Themes beisteuern**, Beiträge sind gern gesehen :D

### Anpassungen/Personalisierung

Du kannst das Erscheinungsbild deiner `Stats Card` oder `Repo Card`, mithilfe von URL-Parametern, nach deinen Vorlieben anpassen.

#### Verbreitete Optionen:

- `title_color` - Titelfarbe _(hex color)_
- `text_color` - Textkörperfarbe _(hex color)_
- `icon_color` - Symbolfarbe (falls verfügbar) _(hex color)_
- `bg_color` - Hintergrundfarbe _(hex color)_ **oder** ein Farbverlauf in der Form von _winkel,start,ende_
- `theme` - Name des Erscheinungsbildes/Themes [alle verfügbaren Themes](./themes/README.md)
- `cache_seconds` - manuelles festlegen der Cachezeiten _(min: 1800, max: 86400)_

##### Farbverlauf in bg_color

Du kannst mehrere, mit Kommas separierte, Werte in der bg_color Option angeben, um einen Farbverlauf anzuzeigen. Das Format ist:-

```
&bg_color=WINKEL,FARBE1,FARBE2,FARBE3...FARBE10
```

> Hinweis bzgl. des Caches: Wenn die Anzahl der Forks und Stars geringer als 1 Tsd ist, haben die Repo-Cards eine Standard-Cachezeit von 30 Minuten (1800 Sekunden), ansonsten beträgt diese 2 Stunden (7200 Sekunden). Außerdem ist der Cache auf ein Minimum von 30 Minuten und ein Maximum von 24 Stunden begrenzt.

#### Exklusive Optionen der Statistiken-Karte:

- `hide` - Verbirgt die angegeben Elemente _(mit Komma abgegrenzte Werte)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_
- `show_icons` - _(boolean)_
- `include_all_commits` - Zähle alle Beiträge anstatt nur das aktuelle Jahr _(boolean)_
- `count_private` - Zähle private Beiträge _(boolean)_
- `line_height` - Legt die Zeilenhöhe zwischen Text fest  _(Zahl)_

#### Exklusive Optionen der Repo-Karte:

- `show_owner` - Zeigt den Besitzer des Repos _(boolean)_

#### Exklusive Optionen der Sprachen-Karte:

- `hide` - Verbirgt die angegebenen Sprachen von der Karte _(Komma separierte Werte)_
- `hide_title` - _(boolean)_
- `layout` - Wechsel zwischen den zwei verfügbaren Layouts `default` & `compact`
- `card_width` - Lege die Breite der Karte manuell fest _(Zahl)_

> :warning: **Wichtig:**  
> Sprachennamen sollten uri-escaped sein, wie hier angegeben: [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)  
> (z.B.: `c++` sollte zu `c%2B%2B` werden, `jupyter notebook` sollte zu `jupyter%20notebook` werden, usw.)

---

# GitHub Extra Pins

GitHub extra pins ermöglicht es mit Hilfe einer Readme auf deinem Profil mehr als 6 Repositories anzuzeigen.

Und Bääm! Du bist nicht mehr auf 6 angeheftete Repositories limitiert.

### Benutzung

Füge diesen Code in deine Readme-Datei ein und passe die Links an.

Endpunkt: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Beispiele

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Benutze die [show_owner](#anpassungenpersonalisierung) Variable, um den Nutzernamen des Repo Eigentümers anzuzeigen.

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Top Programmiersprachen-Karte

Die Top Programmiersprachen Card visualisiert die am meisten benutzten Programmiersprachen eines GitHub-Nutzers.

_HINWEIS: Die Top Programmiersprachen treffen keine Aussage über persönliche Fähigkeiten oder dergleichen, es ist lediglich eine auf den GitHub-Statistiken des Nutzers basierende Kennzahl, welche Programmiersprache wie häufig verwendet wurde._

### Benutzung

Füge diesen Code in deine Readme-Datei ein und passe die Links an.

Endpunkt: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Verbirg einzelne Sprachen

Du kannst den `?hide=language1,language2` URL-Parameter benutzen, um einzelne Sprachen auszublenden.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Kompaktes Sprachen-Karte Layout

Du kannst die `&layout=compact` Option nutzen, um das Karten Design zu ändern.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Beispiel

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Kompaktes Layout

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Alle Beispiele

- Default

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Ausblenden bestimmter Statistiken

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- Symbole anzeigen

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

- Alle Beiträge anzeigen

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Erscheinungsbild/Themes

Wähle Eines von den [Standard-Themes](#themes)

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Farbverlauf

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Statistiken-Karte anpassen

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Repo-Karte anpassen

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Top Programmiersprachen

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Kleiner Tipp (Ausrichten der Repo-Karte)

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

Da die GitHub API nur 5 Tsd Aufrufe pro Stunde zulässt, kann es passieren, dass meine `https://github-readme-stats.vercel.app/api` dieses Limit erreicht.
Wenn du es auf deinem eigenen Vercel-Server hostest, brauchst du dich darum nicht zu kümmern. Klicke auf den Deploy-Knopf um loszulegen!

Hinweis: Seit [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) sollte es möglich sein, mehr als 5 Tsd Aufrufe pro Stunde ohne Downtimes zu verkraften :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b>Anleitung zum Einrichten von Vercel 🔨 </b></summary>

1. Gehe zu [vercel.com](https://vercel.com/)
1. Klicke auf `Log in`  
   ![](https://files.catbox.moe/tct1wg.png)
1. Melde dich mit deinem GitHub-account an, indem du `Continue with GitHub` klickst
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Verbinde dich mit GitHub und erlaube den Zugriff auf alle Repositories (falls gefordert)
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

Mitarbeit an dem Projekt ist immer Willkommen! <3

Gebaut mit :heart: und JavaScript.
