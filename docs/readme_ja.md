<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">あなたのREADMEに動的に生成されたGitHubの統計情報を載せましょう！</p>
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
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Request Feature</a>
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
    <a href="/docs/readme_kr.md">한국어</a>
  </p>
</p>
<p align="center">このプロジェクトを気に入っていただけましたか？<br>もしよろしければ、プロジェクトのさらなる改善のために<a href="https://www.paypal.me/anuraghazra">寄付</a>を検討して頂けると嬉しいです！</p>

# Features

- [GitHub Stats Card](#github-stats-card)
- [GitHub Extra Pins](#github-extra-pins)
- [Top Languages Card](#top-languages-card)
- [Themes](#themes)
- [Customization](#customization)
- [Deploy Yourself](#deploy-on-your-own-vercel-instance)

# GitHub Stats Card

以下の構文をコピーして、あなたの Markdown ファイルに貼り付けるだけです。
簡単ですね！

`?username=` の値は、あなたの GitHub アカウントのユーザー名に変更してください。

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Note: カードに表示されるランクはユーザの統計情報に基づいて計算されています。詳しくは、[src/calculateRank.js](../src/calculateRank.js)を見てください。_

### Hiding individual stats

クエリパラメータ `?hide=` にカンマ区切りの値を渡すことで、特定の統計情報を隠すことができます。

> Options: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Adding private contributions count to total commits count

クエリパラメータ `?count_private=true` を使用することで、private contributions の数をコミット総数に追加することができます。

_Note: このプロジェクトを自分でデプロイしている場合、デフォルトでは非公開の貢献がカウントされます。_

> Options: `&count_private=true`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Showing icons

クエリパラメータ `?show_icons=true` を使用することで、アイコンが表示が有効になります。

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Themes

内蔵されているテーマを使用することで、任意の[手動のカスタマイズ](#customization)を行うことなく、カードの外観をカスタマイズすることができます。

`?theme=THEME_NAME` は以下のように使います。

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### All inbuilt themes :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

用意されている全てのテーマの[プレビュー](../themes/README.md)や[設定ファイル](../themes/index.js)を見ることができます。もしよろしければ、**新しいテーマを投稿してみてください** (´∀` )

### Customization

`Stats Card` や `Repo Card` の外観を URL パラメーターを使って好きなようにカスタマイズすることができます。

Customization Options:

| Option        | type      | description                                  | Stats Card (default) | Repo Card (default) | Top Lang Card (default) |
| ------------- | --------- | -------------------------------------------- | -------------------- | ------------------- | ----------------------- |
| title_color   | hex color | タイトルの色                                 | 2f80ed               | 2f80ed              | 2f80ed                  |
| text_color    | hex color | 文字の色                                     | 333                  | 333                 | 333                     |
| icon_color    | hex color | アイコンの色                                 | 4c71f2               | 586069              | 586069                  |
| bg_color      | hex color | カードの背景色                               | FFFEFE               | FFFEFE              | FFFEFE                  |
| line_height   | number    | 字間距離                                     | 30                   | N/A                 | N/A                     |
| hide          | CSV       | 項目の非表示                                 | undefined            | N/A                 | undefined               |
| hide_rank     | boolean   | ranking の非表示                             | false                | N/A                 | N/A                     |
| hide_title    | boolean   | タイトルの非表示                             | false                | N/A                 | false                   |
| hide_border   | boolean   | 枠線の非表示                                 | false                | N/A                 | N/A                     |
| show_owner    | boolean   | オーナー名の表示                             | N/A                  | false               | N/A                     |
| show_icons    | boolean   | アイコンの表示                               | false                | N/A                 | N/A                     |
| theme         | string    | 用意されているテーマ                         | 'default'            | 'default_repocard'  | 'default'               |
| cache_seconds | number    | キャッシュコントロール                       | 1800                 | 1800                | 1800                    |
| count_private | boolean   | private contributions 数をコミット総数に追加 | false                | N/A                 | N/A                     |
| layout        | string    | レイアウトのオプション選択                   | N/A                  | N/A                 | 'default'               |

> キャッシュに関する注意点: Repo cards のデフォルトのキャッシュは、フォーク数とスター数が 1k 未満の場合は 30 分(1800 秒) で、それ以外の場合は 2 時間(7200) です。また、キャッシュは最低でも 30 分、最大でも 24 時間に制限されていることに注意してください。

# GitHub Extra Pins

GitHub extra pins を使うと、GitHub の readme プロフィールを使って、自分のプロフィールに 6 つ以上のリポジトリをピン留めすることができます。

イェーイ! もはや 6 つのピン留めされたリポジトリに制限されることはありません。

### Usage

以下のコードをあなたの readme にコピー & ペーストし、リンクを変更してください。

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

リポジトリのオーナーのユーザー名を含める場合は、show_owner 変数を使用します。

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Top Languages Card

Top languages card には、その GitHub ユーザーが最も利用している Top languages が表示されます。

_NOTE: Top languages は、ユーザのスキルレベルを示すものではなく、GitHub 上でどの言語で最も多くのコードを書いているかを示す GitHub の指標です。_

### Usage

以下のコードをあなたの readme にコピー & ペーストし、リンクを変更してください。

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Hide individual languages

クエリパラメータ `?hide=language1,language2` 使用することで、個々の言語を非表示にすることができます。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Compact Language Card Layout

クエリパラメータ `&layout=compact` を使用することで、カードのデザインを変更することができます。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Compact layout

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### All Demos

- Default

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Hiding specific stats

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Showing icons

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Themes

任意の[テーマ](#themes)を選択できます。

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Customizing stats card

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Customizing repo card

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Top languages

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Quick Tip (Align The Repo Cards)

通常、画像を並べてレイアウトすることはできません。そのためには、次のような方法があります。

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Deploy on your own Vercel instance

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

GitHub API は 1 時間あたり 5k リクエストしか受け付けていないので、私の `https://github-readme-stats.vercel.app/api` がレートリミッターを超えてしまう可能性があります。自分の Vercel サーバーでホストしているのであれば、何も心配する必要はありません。デプロイボタンをクリックして始めましょう！

NOTE: [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 以降は 5k 以上のリクエストに対応できるようになり、ダウンタイムの問題もなくなりました (´∀` )

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Vercelの設定ガイド</summary>

1. [vercel.com](https://vercel.com/)に行きます。
1. `Log in`をクリックします。  
   ![](https://files.catbox.moe/tct1wg.png)
1. `Continue with GitHub` を押して GitHub にサインインします。  
   ![](https://files.catbox.moe/btd78j.jpeg)
1. GitHub にサインインし、すべてのリポジトリへのアクセスを許可します。
1. このリポジトリをフォークします。
1. [Vercel dashboard](https://vercel.com/dashboard)に戻ります。
1. `Import Project` を選択します。  
   ![](https://files.catbox.moe/qckos0.png)
1. `Import Git Repository` を選択します。  
   ![](https://files.catbox.moe/pqub9q.png)
1. root を選択して、すべてをそのままにしておき、PAT_1 という名前の環境変数を（下図のように）追加します。これには個人アクセストークン (PAT) が含まれており、[ここ](https://github.com/settings/tokens/new)で簡単に作成することができます (すべてをそのままにしておいて、何かに名前を付けてください。)
   ![](https://files.catbox.moe/0ez4g7.png)
1. デプロイをクリックすれば完了です。API を使用するためにあなたのドメインを参照してください!

</details>

## :sparkling_heart: Support the project

私はできる限りのことをオープンソースで行い、これらのプロジェクトを利用して支援を必要としている皆さんに返信するようにしています。
もちろんそれには時間が掛かる場合がありますが、無料でご利用いただけます。

しかし、もしあなたがこのプロジェクトを使っていて、それに満足しているのであれば、あるいは単に私にものを作り続けることを奨励したいのであれば、いくつかの方法があります。

- あなたの readme で github-readme-stats を使用して適切なクレジットを付与し、それにリンクします (´∀` )
- このプロジェクトにスターを贈り、他の人達にもシェアしてください :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - PayPal を介して 1 回限りの寄付を行うことができます。私はおそらく ~~コーヒー~~ お茶を買うでしょう。 :tea:

Thanks! :heart:

---

Contributions を歓迎します！ <3

このプロジェクトは :heart: と JavaScript で作られています。
