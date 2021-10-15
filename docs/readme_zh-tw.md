<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在你的 README 中取得動態產生的 GitHub 統計資訊！</p>
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
    <a href="#demo">查看 Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">回報 Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">申請增加功能</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Francais</a>
    ·
    <a href="/docs/readme_cn.md">簡體中文</a>
    ·
    <a href="/docs/readme_zh-tw.md">繁體中文</a>
    ·
    <a href="/docs/readme_es.md">Espanol</a>
    ·
    <a href="/docs/readme_de.md">Deutsch</a>
    ·
    <a href="/docs/readme_ja.md">日本語</a>
    ·
    <a href="/docs/readme_pt-BR.md">Portugues Brasileiro</a>
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
<p align="center">喜歡這個專案？請考慮<a href="https://www.paypal.me/anuraghazra">捐贈</a>來幫助它做得更好！

# 特性

- [GitHub 統計卡片](#GitHub-統計卡片)
- [GitHub 更多置頂](#GitHub-更多置頂)
- [熱門語言卡片](#熱門語言卡片)
- [主題](#主題)
- [自定義](#自定義)
- [私有部署](#私有部署)

# GitHub 統計卡片

將這行程式碼複製到你的 markdown 文件中，就是如此簡單！

更改 `?username=` 的值為你的 GitHub 用戶名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注: 等級基於用戶的統計資訊計算得出，詳見 [src/calculateRank.js](../src/calculateRank.js)_

### 隱藏指定統計

想要隱藏指定統計資訊，你可以調用參數 `?hide=`，其值用 `,` 分隔。

> 選項：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 將私人專案貢獻加入增加到總提交計數中

你可以使用參數 `?count_private=true` 把私人貢獻計數增加到總提交計數中。

_註：如果你是私有部署本專案，私人貢獻將會預設被計數，如果不是私有部署，你需要分享你的私人貢獻計數。_

> 選項: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 顯示圖標

如果想要顯示圖標，你可以調用 `show_icons=true` 參數，像這樣：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主題

你可以通過現有的主題進行卡片個性化，省去[手動自定義](#自定義)的麻煩。

通過調用 `?theme=THEME_NAME` 參數，像這樣：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有現有主題

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

你可以預覽[所有可用主題](../themes/README.md)或者簽出[主題設定檔](../themes/index.js)，而且如果你喜歡，**你也可以貢獻新的主題** :D

### 自定義

你可以通過使用 URL 參數的方式，為你的 `Stats Card` 或 `Repo Card` 自定義樣式。

常用選項：

- `title_color` - 卡片標題顏色 _（十六進制色碼）_
- `text_color` - 內容文字顏色 _（十六進制色碼）_
- `icon_color` - 圖標顏色（如果可用）_（十六進制色碼）_
- `bg_color` - 卡片背景顏色 _（十六進制色碼）_ **或者** 以 _angle,start,end_ 的形式漸變
- `hide_border` - 隱藏卡的邊框 _(布爾值)_
- `theme` - 主題名稱，從[所有可用主題](../themes/README.md)中選擇
- `cache_seconds` - 手動設定快取 Header _（最小值: 1800，最大值: 86400）_
- `locale` - 在卡片中設定語言 _(例如 cn、de、es 等等)_

##### bg_color 漸變

你可以在 bg_color 選項中提供多個逗號分隔的值來呈現漸變，漸變的格式是 :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> 快取的注意事項: 如果 fork 數和 star 數少於 1k，Repo 卡片預設快取是 4 小時（14400 秒），否則是 2 小時（7200）。另請注意快取被限制為最短 2 小時，最長 24 小時。

#### 統計卡片專屬選項:

- `hide` - 隱藏特定統計資訊 _(以逗號分隔)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_
- `show_icons` - _(boolean)_
- `include_all_commits` - 統計總提交次數而不是僅統計今年的提交次數 _(boolean)_
- `count_private` - 統計私人提交 _(boolean)_
- `line_height` - 設定文字之間的行高 _(number)_

#### Repo 卡片專屬選項:

- `show_owner` - 顯示 Repo 的所有者名字 _(boolean)_

#### 語言卡片專屬選項:

- `hide` - 從卡片中隱藏指定語言 _(Comma seperated values)_
- `hide_title` - _(boolean)_
- `layout` - 在兩個可用佈局 `default` & `compact` 間切換
- `card_width` - 手動設定卡片的寬度 _(number)_

> :warning: **重要:**
> 如 [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding) 所指定，語言名稱應使用 uri 轉換字元。
> (例: `c++` 應該是 `c%2B%2B`，`jupyter notebook` 應該是 `jupyter%20notebook` 等)

---

# GitHub 更多置頂

GitHub 更多置頂 允許你在使用 GitHub readme profile 時，在個人資料中置頂多於 6 個 repo 。

是的！你不再受限於置頂最多 6 個存儲庫了。

### 使用細則

複製貼上這段程式碼到你的 README 文件中，並更改連結。

端點: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#自定義) 變數將 Repo 所有者的用戶名包含在內。

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 熱門語言卡片

熱門語言卡片顯示了 GitHub 用戶常用的程式語言。

_注意：熱門語言並不表示我的技能水平或類似的水平，它是用來衡量用戶在 github 上擁有最多程式碼的語言的一項指標，它是 github-readme-stats 的新特性_

### 使用細則

將此程式碼複製貼上到您的 `README.md` 文件中，並修改連結。

端點: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 隱藏指定語言

可以使用 `?hide=language1,language2` 參數來隱藏指定的語言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 緊湊的語言卡片佈局

你可以使用 `&layout=compact` 參數來改變卡片的樣式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 緊湊佈局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 全部 Demos

- 預設

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隱藏指定統計

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 顯示圖標

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 包含全部提交

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 主題

從[預設主題](#主題)中進行選擇

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 漸變

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 自定義統計卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 自定義 repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 熱門語言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### 快速提示 (對齊 Repo 卡片)

你通常無法將圖片靠邊顯示。為此，您可以使用以下方法：

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 私有部署

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

因為 GitHub 的 API 每個小時只允許 5 千次請求，我的 `https://github-readme-stats.vercel.app/api` 很有可能會觸發限制。如果你將其托管在自己的 Vercel 服務器上，那麼你就不必為此擔心。點擊 deploy 按鈕來開始你的部署！

注意: 從 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 開始，我們應該能夠處理超過 5 千次的請求，並且不會出現當機問題 :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>設定 Vercel 的教學</summary>

1. 前往 [vercel.com](https://vercel.com/)
1. 點擊 `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. 點擊 `Continue with GitHub` 通過 GitHub 進行登錄
   ![](https://files.catbox.moe/btd78j.jpeg)
1. 登錄 GitHub 並允許訪問所有存儲庫（如果系統這樣提示）
1. Fork 這個存儲庫
1. 返回到你的 [Vercel dashboard](https://vercel.com/dashboard)
1. 選擇 `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. 選擇 `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. 選擇 root 並將所有內容保持不變，並且只需增加名為 PAT_1 的環境變數（如圖所示），其中將包含一個個人訪問令牌（PAT），你可以在[這裡](https://github.com/settings/tokens/new)輕鬆建立（可以都保留預設值，只需要簡單命名一下）
   ![](https://files.catbox.moe/0ez4g7.png)
1. 點擊 deploy，這就完成了，查看你的域名就可使用 API 了！

</details>

## :sparkling_heart: 支持這個專案

我盡己所能地進行開源，並且我盡量回覆每個在使用專案時需要幫助的人。很明顯，這需要時間，但你可以免費享受這些。

然而，如果你正在使用這個專案並感覺良好，或只是想要支持我繼續開發，你可以通過如下方式：

- 在你的 readme 中使用 github-readme-stats 時，連結指向這裡 :D
- Star 並 分享這個專案 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通過 PayPal 一次性捐款，我應該會拿來買杯 ~~咖啡~~ 茶 :tea:

謝謝！ :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

歡迎貢獻！ <3

用 :heart: 發電，用 JavaScript 製作。
