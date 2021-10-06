<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Obtenez des statistiques GitHub générées dynamiquement sur vos Readme !</p>
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
      <img src="https://img.shields.io/badge/Supporté%20par-VSCode%20Power%20User%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    <a href="https://a.paddle.com/v2/click/16413/119403?link=2345">
      <img src="https://img.shields.io/badge/Supporté%20par-Node%20Cli.com%20%E2%86%92-gray.svg?colorA=61c265&colorB=4CAF50&style=for-the-badge"/>
    </a>
  </p>

  <p align="center">
    <a href="#démo">Voir la démo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Soumettre un bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Demander une nouveauté</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français</a>
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
    ·
    <a href="/docs/readme_nl.md">Nederlands</a>
    ·
    <a href="/docs/readme_np.md">नेपाली</a>
    ·
    <a href="/docs/readme_tr.md">Türkçe</a>
  </p>
</p>
<p align="center">Vous aimez ce projet? Pensez <a href="https://www.paypal.me/anuraghazra">à faire un don</a> pour l'améliorer!

# Features

- [Carte des stats GitHub](#carte-des-stats-github)
- [GitHub Extra Pins](#github-extra-pins)
- [Carte des meilleurs langages](#carte-des-langages-les--utilisés)
- [Themes](#thèmes)
- [Personnalisation](#personnalisation)
- [Deployer toi-même](#déployer-sur-votre-propre-instance-vercel)

# Carte des Stats GitHub

Copiez-collez ceci dans votre Markdown, et c'est tout. C'est simple !

Remplacez la valeur `?username=` par le nom d'utilisateur de votre GitHub.

```md
[![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Note: Les rangs sont calculés sur la base des statistiques de l'utilisateur, voir [src/calculateRank.js](../src/calculateRank.js)_

### Cacher les statistiques individuelles

Pour masquer des statistiques spécifiques, vous pouvez passer un paramètre de requête `?hide=` avec des valeurs séparées par des virgules.

> Options: `&hide=stars,commits,prs,issues,contribs`

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Ajouter le compte des contributions privées au compte des commits totaux

Vous pouvez ajouter le compte de toutes vos contributions privées au compte total des engagements en utilisant le paramètre de requête `?count_private=true`.

_Note: Si vous déployez vous-même ce projet, les contributions privées seront comptées par défaut ; sinon, vous devez choisir de partager les comptes de vos contributions privées._

> Options: `&count_private=true`

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Afficher les icônes

Pour activer les icônes, vous pouvez passer `show_icons=true` dans le paramètre de requête, comme ceci :

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Thèmes

Avec les thèmes intégrés, vous pouvez personnaliser l'apparence de la carte sans faire de [personnalisation manuelle](#customization).

Use `?theme=THEME_NAME` parameter like so :-

```md
![Les Stats GitHub de Anurag](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Tous les thèmes intégrés :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

Vous pouvez consulter un aperçu de [tous les thèmes disponibles](../themes/README.md) ou consulter le [fichier de configuration des thèmes](../themes/index.js) & **vous pouvez également ajouter de nouveaux thèmes** si vous le souhaitez :D

### Personnalisation

Vous pouvez personnaliser l'apparence de votre `Carte des stats` ou `Carte de dépôt` comme vous le souhaitez avec les paramètres d'URL.

#### Options principales:

- `title_color` - Couleur du titre de la carte _(hex color)_
- `text_color` - Couleur du texte _(hex color)_
- `icon_color` - Couleur des icônes si disponibles _(hex color)_
- `bg_color` - Couleur du fond de la carte _(hex color)_ **ou** un gradiant de la forme _angle,start,end_
- `hide_border` - Cache la bordure de la carte _(booléen)_
- `theme` - Nom du thème, parmis [tous les thèmes disponibles](../themes/README.md)
- `cache_seconds` - Paramétrer le cache manuellement _(min: 1800, max: 86400)_
- `locale` - définir la langue de la carte _(par exemple. cn, de, es, etc.)_

##### Gradient in bg_color

Vous pouvez fournir plusieurs valeurs (suivie d'une virgule) dans l'option bg_color pour rendre un degradé, le format du degradé est :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> Note relative: Les cartes dépôt ont un cache par défaut de 30 minutes (1800 secondes) si le nombre de bifurcations et d'étoiles est inférieur à 1K, alors il est de 2 heures (7200). Notez également que la mémoire cache est limitée à 30 minutes au minimum et à 24 heures au maximum.

#### Stats Card Exclusive Options:

-   `hide` - Masquer [les éléments spécifiés](#cacher-les-statistiques-individuelles) dans les statistiques _(Comma seperated values)_
-   `hide_title` - Masquer le titre _(boolean)_
-   `hide_rank` - Masquer le rang _(boolean)_
-   `show_icons` - Afficher les icônes _(boolean)_
-   `include_all_commits` - Compter le total de commits au lieu de ne compter que les commits de l'année en cours _(boolean)_
-   `count_private` - Compter les commits privés _(boolean)_
-   `line_height` - Fixer la hauteur de la ligne entre les textes _(number)_

#### Repo Card Exclusive Options:

-   `show_owner` - Affiche le nom du propriétaire du dépôt _(boolean)_

#### Language Card Exclusive Options:

-   `hide` - Masquer les langages spécifiés sur la carte _(Comma seperated values)_
-   `hide_title` - Masquer le titre _(boolean)_
-   `layout` - Alterner entre 2 mise en page `default` & `compact`
-   `card_width` - Fixer la largeur de la carte manuellement _(number)_

> :warning: **Important:**
> Les noms des langages doivent être en format uri, comme spécifié dans [Percent Encoding](https://fr.wikipedia.org/wiki/Percent-encoding)
> (c'est-à-dire que: `c++` devrait devenir `c%2B%2B`, `jupyter notebook` devrait devenir `jupyter%20notebook`, etc.)

---

# GitHub Extra Pins

Les épingles supplémentaires GitHub vous permettent d'épingler plus de 6 dépôts dans votre profil en utilisant un profil GitHub readme.

Et OUI ! Vous n'êtes plus limité à 6 dépôts épinglés.

### Usage

Copiez-collez ce code dans votre readme et modifiez les liens.

Extrémité: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Carte ReadMe](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Démo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Utiliser la variable [show_owner](#customization) pour inclure le nom d'utilisateur du propriétaire du dépôt.

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Carte des langages les + utilisés

La carte des langages principaux montre les langages les plus utilisés par les utilisateurs de GitHub.

_NOTE: Les langages affichés n'indiquent pas mon niveau de compétence ou quelque chose comme ça, c'est une métrique GitHub de quelles langages j'ai le plus de code sur GitHub, c'est une nouvelle fonctionnalité de github-readme-stats_

### Usage

Copiez-collez ce code dans votre readme et modifiez les liens.

Extrémité: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Cacher certaines langages

Vous pouvez utiliser le paramètre `?hide=language1,language2` pour masquer les langages individuels.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Carte compacte des langages

Vous pouvez utiliser l'option `&layout=compact` pour changer le style de la carte.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Démo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Carte compacte

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Toutes les démos

- Défaut

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Ne pas afficher des stats spécifiques

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Afficher les icônes

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Inclure tous les commits

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Thèmes

Choisissez parmi l'un des [thèmes par défaut](#themes)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Dégradé

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Personnaliser la carte des stats

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Personnaliser la carte dépôt

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Top Langages

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Conseil rapide (aligner les cartes des dépôts)

En général, vous ne pourrez pas mettre les images côte à côte. Pour ce faire, vous pouvez utiliser cette approche :

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Déployer sur votre propre instance Vercel

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Comme l'API GitHub ne permet que 5k requêtes par heure, il est possible que mon `https://github-readme-stats.vercel.app/api` puisse atteindre le limiteur de débit. Si vous l'hébergez sur votre propre serveur Vercel, alors vous n'avez pas à vous soucier de quoi que ce soit. Cliquez sur le bouton de déploiement pour commencer !

NOTE: Depuis [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) nous devrions être en mesure de traiter plus de 5 000 demandes et ne pas avoir de problèmes de temps d'arrêt :D

[![Deployer avec Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Guide pour la mise en place de Vercel  🔨 </b></summary>

1. Allez sur [vercel.com](https://vercel.com/)
1. Cliquez sur `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. Connectez-vous avec GitHub en cliquant `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Connectez-vous à GitHub et autorisez l'accès à tous les dépôts, si vous y êtes invité
1. Forkez ce dépôt
1. Retournez au [dashboard Vercel](https://vercel.com/dashboard)
1. Sélectionnez `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. Sélectionnez `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. Choisissez root et gardez tout tel quel, ajoutez simplement votre variable d'environnement nommée PAT_1 (comme indiqué), qui contiendra un jeton d'accès personnel (PAT), que vous pouvez facilement créer [ici](https://github.com/settings/tokens/new) (laissez tout tel quel, nommez le simplement quelque chose, cela peut être tout ce que vous voulez)
   ![](https://files.catbox.moe/0ez4g7.png)
1. Cliquez sur "Deploy" et vous êtes prêt à partir. Regardez vos domaines pour utiliser l'API !

</details>

## :sparkling_heart: Supporter le project

Je mets open-source presque tout ce que je peux, et j'essaie de répondre à tous ceux qui ont besoin d'aide en utilisant ces projets. Évidemment, cela prend du temps. Vous pouvez utiliser ce service gratuitement.

Cependant, si vous utilisez ce projet et que vous en êtes satisfait ou si vous voulez simplement m'encourager à continuer à créer, il y a quelques façons de le faire :-

- Donner un crédit approprié lorsque vous utilisez github-readme-stats sur votre readme, avec un lien vers celui-ci :D
- Mettre une étoile et partager le projet :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Vous pouvez faire des dons uniques via PayPal. Je vais probablement acheter un ~~café~~ thé. :tea:

Merci ! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)


Les contributions sont les bienvenues ! <3

Fait avec :heart: et JavaScript.
