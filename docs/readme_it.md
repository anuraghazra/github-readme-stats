<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Mostra nei tuoi README file le statistiche GitHub generate dinamicamente!</p>
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
      <img src="https://img.shields.io/badge/Supportato%20da-VSCode%20Power%20User%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    <a href="https://a.paddle.com/v2/click/16413/119403?link=2345">
      <img src="https://img.shields.io/badge/Supportato%20da-Node%20Cli.com%20%E2%86%92-gray.svg?colorA=61c265&colorB=4CAF50&style=for-the-badge"/>
    </a>
  </p>

  <p align="center">
    <a href="#demo">Anteprima</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Segnala un errore</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Richiedi una nuova funzionalità</a>
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
<p align="center">Se ti piace questo progetto, considera la possibilità di <a href="https://www.paypal.me/anuraghazra">donare</a> per aiutare a renderlo migliore!

# Caratteristiche

- [Statistiche GitHub (GitHub Stats Card)](#github-stats-card)
- [GitHub Extra Pin](#github-extra-pins)
- [Linguaggi più usati (Top Languages Card)](#top-languages-card)
- [Temi](#temi)
- [Personalizzazione](#personalizzazione)
- [Effettua il Deploy](#deploy-su-vercel)

# GitHub Stats Card

Per creare una Card con le statistiche GitHub, copia e incolla nel tuo file markdown, tutto qua: è semplice!

Ricorda di cambiare il valore `?username=` con il tuo nome utente GitHub.

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Nota: I punteggi sono calcolati sulla base delle tue statistiche, dai un'occhiata a [src/calculateRank.js](../src/calculateRank.js) per ulteriori informazioni_

### Nascondere statistiche individuali

Per nascondere qualche dato, puoi aggiungere i parametri `?hide=`, separando i valori con una virgola.

> Opzioni: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Includere i contributi privati nel computo totale

Puoi aggiungere i tuoi contributi privati al totale dei commit, utilizzando il parametro `?count_private=true`.

_Nota: se hai deciso di fare il deploy del progetto, i contributi privati verranno inclusi in automatico._

> Opzioni: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Mostrare le icone

Per abilitare le icone, puoi specificare `show_icons=true`, ad esempio:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Temi

Esistono alcuni temi predefiniti coi quali è possibile personalizzare l'aspetto delle card. In alternativa, è possibile effettuare una [personalizzazione manuale](#personalizzazione).

Usa il parametro `?theme=NOME_TEMA` in questo modo:-

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Galleria dei temi:-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

Puoi avere un'anteprima di [tutti i temi supportati](../themes/README.md) o controllare il [file di configurazione dei temi](../themes/index.js) e **puoi anche contribuire creando un nuovo tema** se vuoi :D

### Personalizzazione

Puoi personalizzare l'aspetto delle tue `Stats Card` o delle `Repo Card` in qualsiasi modo, semplicemente modificando i parametri dell'URL.

#### Opzioni comuni:

- `title_color` - Colore del titolo _(in esadecimale)_
- `text_color` - Colore del testo _(in esadecimale)_
- `icon_color` - Colore delle icone, se disponibili _(in esadecimale)_
- `bg_color` - Colore dello sfondo _(in esadecimale)_ **oppure** un gradiente nella forma _angolo,inizio,fine_
- `hide_border` - Nasconde il bordo della carta _(booleano)_
- `theme` - Nome del tema, dai un'occhiata a [tutti i temi disponibili](../themes/README.md)
- `cache_seconds` - Specifica manualmente il valore di cache, in secondi _(min: 1800, max: 86400)_
- `locale` - Impostare la lingua nella scheda _(per esempio. cn, de, es, eccetera.)_

##### Gradiente nello sfondo

Puoi fornire valori separati da virgola nel parametro bg_color per creare un gradiente, il cui formato è:-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> Nota sulla cache: le card hanno un valore di cache di 4 ore (14400 seconds) di default se il numero di fork & il numero di stelle è inferiore a 1000; altrimenti è pari a 2 ore (7200).

#### Opzioni valide solo per le card delle statistiche:

- `hide` - Nasconde gli oggetti selezionati _(valori separati da virgola)_
- `hide_title` - Nasconde il titolo _(booleano)_
- `hide_rank` - Nasconde il punteggio _(booleano)_
- `show_icons` - Mostra le icone _(booleano)_
- `include_all_commits` - Mostra tutti i commit e non solo quelli dell'anno corrente _(booleano)_
- `count_private` - Include i contributi privati _(booleano)_
- `line_height` - Specifica il valore dell'altezza di riga _(numero)_

#### Opzioni valide solo per le Repo Card:

- `show_owner` - Mostra il nome utente del proprietario _(booleano)_

#### Opzioni valide solo per le card dei linguaggi:

- `hide` - Nasconde un linguaggio specifico _(valori separati da virgola)_
- `hide_title` - Nasconde il titolo _(booleano)_
- `layout` - Specifica il tipo di layout, `default` (esteso) o `compact` (compatto)
- `card_width` - Specifica il valore della larghezza _(numero)_

> :warning: **Importante:**
> Per i nomi dei linguaggi, assicurati di effettuare l'encoding giusto nell'uri, come specificato in [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)
> (ad esempio: `c++` diventa `c%2B%2B`, `jupyter notebook` diventa `jupyter%20notebook`, ecc.)

---

# GitHub Extra Pins

GitHub Extra Pins ti permette di fissare in alto più di 6 repository nel tuo profilo, sfruttando il README del profilo.

### Utilizzo

Copia e incolla il seguente codice, premurandoti di cambiare il link.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Usa la variabile [show_owner](#personalizzazione) per includere il nome utente del proprietario

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Top Languages Card

La Top Languages Card mostra i linguaggi che utilizzi di più su GitHub.

_NOTA: questa card non indica il livello di abilità, ma piuttosto quanto codice hai scritto in un determinato linguaggio_

### Utilizzo

Copia e incolla nel tuo file README, cambiando i link.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Nascondi linguaggi specifici

Puoi utilizzare il parametro `?hide=linguaggio1,linguaggio2` per nascondere alcuni linguaggi.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Layout compatto

Puoi utilizzare l'opzione `&layout=compact` per cambiare l'aspetto della card.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Layout Compatto

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Galleria di esempi

- Default

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Nascondere dati specifici

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Mostrare le icone

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Includere tutti i commit

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Temi

Scegli uno dei [temi di default](#themes)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Gradiente

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Personalizzare le Stats Card

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Personalizzare le Repo Card

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Linguaggi più usati

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Consiglio veloce (Allineare le Card)

Per allineare le card una accanto all'altra, puoi adottare questo approccio:

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Deploy su Vercel

#### [Guarda questo Video Tutorial, realizzato da @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Since the GitHub API only allows 5k requests per hour, it is possible that my `https://github-readme-stats.vercel.app/api` could hit the rate limiter. If you host it on your own Vercel server, then you don't have to worry about anything. Click on the deploy button to get started!

NOTE: Since [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) we should be able to handle more than 5k requests and have no issues with downtime :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Guide on setting up Vercel  🔨 </b></summary>

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

## :sparkling_heart: Supporta il progetto

Rendo open-source quasi tutto ciò che posso e provo a rispondere a chiunque sia in difficoltà nell'utilizzare questi progetti. Ovviamente, mi richiede del tempo.
Puoi utilizzare questo servizio gratuitamente.

Tuttavia, se usi il progetto e ti piace e vuoi sostenermi, puoi:-

- Dare il giusto riconoscimento quando usi github-readme-stats nei tuoi readme, includendo un link :D
- Mettere una stella e condividere il progetto :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Fare una donazione via PayPal. Probabilmente compreròun ~~caffè~~ tè. :tea:

Grazie! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

I contributi sono benvenuti! <3

Realizzato col :heart: e in JavaScript.
