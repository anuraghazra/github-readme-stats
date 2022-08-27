<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Näytä dynaamisesti luodut GitHub-tilastot README-tiedostoissasi!</p>
</p>
  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Testit läpäisty" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://codecov.io/gh/anuraghazra/github-readme-stats">
      <img src="https://codecov.io/gh/anuraghazra/github-readme-stats/branch/master/graph/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/pulls">
      <img alt="GitHubin vetopyynnöt" src="https://img.shields.io/github/issues-pr/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <br />
    <br />
    <a href="https://a.paddle.com/v2/click/16413/119403?link=1227">
      <img src="https://img.shields.io/badge/Tue%20VSCodea-VSCode%20Power%20User%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    <a href="https://a.paddle.com/v2/click/16413/119403?link=2345">
      <img src="https://img.shields.io/badge/Tue%20Nodea-Node%20Cli.com%20%E2%86%92-gray.svg?colorA=61c265&colorB=4CAF50&style=for-the-badge"/>
    </a>
  </p>

  <p align="center">
    <a href="#demo">Esikatselu</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Ilmoita virheestä</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Pyydä uusi ominaisuus</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français</a>
    ·
    <a href="/docs/readme_cn.md">简体中文</a>
    ·
    <a href="/docs/readme_fi.md">Finnish</a>
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
  </p>
</p>
<p align="center">Jos pidät tästä projektista, harkitse mahdollisuutta <a href="https://www.paypal.me/anuraghazra">Lahjoitamalla</a> auttaa parantamaan sitä!

# Ominaisuudet

- [GitHubin tilastot (GitHubin tilastokortti)](#github-stats-card)
- [GitHub Extra Pin](#github-extra-pins)
- [Eniten käytetyt kielet (Suosituimmat kielet -kortti)](#top-languages-card)
- [Teemat](#temi)
- [Personointi](#personalizzazione)
- [Ota käyttöön](#deploy-su-vercel)

# GitHubin tilastokortti

Jos haluat luoda kortin GitHub-tilastoilla, kopioi ja liitä se markdown-tiedostoosi, siinä kaikki: se on helppoa!

Muista vaihtaa `? Username =` -arvo GitHub-käyttäjänimeksi.

```md
[![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Huomaa: Pisteet lasketaan tilastojesi perusteella, katso [src/calculateRank.js](../src/calculateRank.js) Lisätietoja_

### Piilota yksittäiset tilastot

Voit piilottaa joitakin tietoja lisäämällä parametrit `?hide=`,erottamalla arvot pilkulla.

> Vaihtoehdot: `&hide=stars,commits,prs,issues,contribs`

```md
![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Sisällytä yksityiset lahjoitukset kokonaislaskelmaan

Voit lisätä yksityiset lahjoituksesi sitoumusten kokonaismäärään käyttämällä parametria `?count_private=true`.

_Huomaa: jos olet päättänyt ottaa projektin käyttöön, yksityiset lahjoitukset sisällytetään automaattisesti._

> Vaihtoehdot: `&count_private=true`

```md
![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Näytä kuvakkeet

Ota kuvakkeet käyttöön määrittämällä `show_icons=true`, esimerkki:

```md
![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Temi

On olemassa joitain ennalta määritettyjä teemoja, joilla voit muokata korttien ulkoasua. Vaihtoehtoisesti voit tehdä sellaisen [manuaalinen räätälöinti](#personalizzazione).

Käytä parametria `?theme=NOME_TEMA` niin:-

```md
![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Teemagalleria: -

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

Voit esikatsella [kaikki tuetut teemat](../themes/README.md) tai tarkistaa [teeman määritystiedostosta](../themes/index.js) ja **voit myös osallistua luomalla uuden teeman** jos haluat :D

### Personointi

Voit muokata `Tilastokorttien` tai `Repokorttien` ulkoasua millä tahansa tavalla yksinkertaisesti muuttamalla URL-parametreja.

#### Yleiset vaihtoehdot:

- `title_color` - Otsikon väri _(heksadesimaalimuodossa)_
- `text_color` - Tekstin väri _(heksadesimaalilukuina)_
- `icon_color` - Kuvakkeen väri, jos saatavilla _(heksadesimaalilukuina)_
- `bg_color` - Taustaväri _(heksadesimaalilukuina)_ **tai** gradientti muodossa _kulma, alku, loppu_
- `hide_border` - Piilota kortin reuna _(boolean)_
- `theme` - Teeman nimi, katso [kaikki käytettävissä olevat teemat](../themes/README.md)
- `cache_seconds` - Määritä välimuistin arvo manuaalisesti sekunneissa _(min: 1800, maksimi: 86400)_
- `locale` - Aseta kieli välilehdelle _(esimerkiksi Cn, de, es jne.)_

##### Gradientti taustalla

Voit antaa pilkuilla erotetut arvot bg_color-parametrissa luodaksesi gradientin, jonka muoto on: -

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> Välimuistin huomautus: korttien oletusvälimuistin arvo on 4 tuntia (14400 sekuntia), jos haarukoiden ja tähtien määrä on alle 1000; muuten se on 2 tuntia (7200).

#### Vaihtoehdot voimassa vain tilastokorteille:

- `hide` - Piilottaa valitut objektit _(pilkuilla erotetut arvot)_
- `hide_title` - Piilota otsikko _(boolean)_
- `hide_rank` - Piilota pisteet _(boolean)_
- `show_icons` - Näytä kuvakkeet _(boolean)_
- `include_all_commits` - Näytä kaikki sitoumukset, ei vain kuluvan vuoden sitoumukset _(boolean)_
- `count_private` - Sisältää yksityisen lahjoituksen _(boolean)_
- `line_height` - Määrittää rivin korkeuden arvon _(numero)_

#### Vaihtoehdot koskevat vain Repo-kortteja:

- `show_owner` - Näyttää omistajan käyttäjänimen _(boolean)_

#### Vaihtoehdot koskevat vain kielikortteja:

- `hide` - Se piilottaa tietyn kielen _(pilkuilla erotetut arvot)_
- `hide_title` - Piilota otsikko _(boolean)_
- `layout` - Määritä asettelun tyyppi, `oletus` (laajennettu) tai`compact` (kompakti)
- `card_width` - Määrittää leveyden arvon _(numero)_

> :warning: **Tärkeä:**
> Varmista kielten nimissä, että koodaat oikean uri:n [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding) -kohdassa määritetyllä tavalla.
> (esimerkiksi: `c++` tulee `c%2B%2B`, `jupyter notebook` tulee `jupyter%20notebook`, jne.)

---

# GitHub Extra Pins

GitHub Extra Pinsin avulla voit kiinnittää profiiliisi yli 6 tietovarastoa käyttämällä profiilin README-komentoa.

### Käyttö

Kopioi ja liitä seuraava koodi niin, että vaihdat linkin.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Usa la variabile [show_owner](#personalizzazione) sisällyttääksesi omistajan käyttäjänimen

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Suosituimmat kielet -kortti

Suosituimmat kielet -kortti näyttää kielet, joita käytät eniten GitHubissa.

_HUOM: tämä kortti ei ilmoita taitotasoa, vaan pikemminkin kuinka paljon koodia olet kirjoittanut tietyllä kielellä_

### Käyttö

Kopioi ja liitä README-tiedostoon ja muuta linkkejä.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Piilota tietyt kielet

Voit piilottaa joitain kieliä parametrilla `?hide=kieli1,kieli2`.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Kompakti asettelu

Voit muuttaa kortin ulkoasua vaihtoehdolla `&layout=compact`.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Kompakti asettelu

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Esimerkkigalleria

- Default

![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Piilota tietyt tiedot

![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Näytä kuvakkeet

![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Sisällytä kaikki sitoumukset

![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Teemat

Valitse yksi niistä [oletusteemoja](#themes)

![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Kaltevuus

![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Mukauta tilastokortteja

![Anuragin GitHub-tilastot](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Mukauta Repo-kortteja

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Eniten käytetyt kielet

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Pikavinkki (Kohdista kortit)

Voit asettaa kortit vierekkäin seuraavasti:

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Ota käyttöön Vercelissä

#### [Katso tämä opetusvideo, jonka on tehnyt @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Koska GitHub API sallii vain 5 000 pyyntöä tunnissa, on mahdollista, että `https://github-readme-stats.vercel.app/api` saattaa osua nopeuden rajoittimeen. Jos isännöit sitä omalla Vercel-palvelimellasi, sinun ei tarvitse huolehtia mistään. Aloita napsauttamalla käyttöönottopainiketta!

HUOMAA: [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) jälkeen meidän pitäisi pystyä käsittelemään yli 5 000 pyyntöä eikä meillä ole ongelmia seisokkien kanssa :D

[![Ota käyttöön Verceliin](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Ohje Vercelin käyttöönottoon  🔨 </b></summary>

1. Mene [vercel.com](https://vercel.com/)
2. Klikkaa `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
3. Kirjaudu sisään GitHubilla painamalla `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
4. Kirjaudu GitHubiin ja salli pääsy kaikkiin tietovarastoihin pyydettäessä
5. Forkaa tämä repo
6. Palaa [Vercelin dashboardiin](https://vercel.com/dashboard)
7. Valitse `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
8. Valitse `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
9. Valitse root ja säilytä kaikki ennallaan, lisää vain ympäristömuuttuja nimeltä PAT_1 (kuten kuvassa), joka sisältää henkilökohtaisen käyttötunnuksen (PAT), jonka voit helposti luoda [tässä](https://github.com/settings/tokens/new) (jätä kaikki ennalleen, anna sille vain nimi, se voi olla mitä tahansa)
   ![](https://files.catbox.moe/0ez4g7.png)
10. Napsauta käyttöönottoa ja olet valmis. Katso verkkotunnuksesi käyttääksesi APIa!

</details>

## :sparkling_heart: Tue projektia

Avaan lähdekoodin lähes kaiken, minkä voin ja yritän vastata kaikille, joilla on vaikeuksia käyttää näitä projekteja. Ilmeisesti se vie minulta jonkin aikaa.
Voit käyttää tätä palvelua ilmaiseksi.

Jos kuitenkin käytät projektia ja pidät siitä ja haluat tukea minua, voit: -

- Anna asianmukainen tunnustus, kun käytät github-readme-statsia readme-tiedostossasi, mukaan lukien linkki: D
- Laita tähti ja jaa projekti :rocket:


- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Tee lahjoitus PayPalin kautta. Luultavasti ostan ~~Kahvia~~ tai. :tea:

Kiitos! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

Lahjoitukset ovat tervetulleita! <3

Valmistettu :heart: ja JavaScriptillä.
