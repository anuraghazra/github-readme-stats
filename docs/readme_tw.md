<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">透過你的 README 動態產生您專屬的 GitHub 統計資訊!</p>
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
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">回報錯誤</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">建議新功能</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français </a>
    ·
    <a href="/docs/readme_cn.md">简体中文</a>
    ·
    <a href="/docs/readme_tw.md">繁體中文</a>
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
<p align="center">您喜歡這個項目嗎? 您可以考慮透過 <a href="https://www.paypal.me/anuraghazra">贊助</a> 方式讓我能更持續的改善這個專案!


<p>
<a href="https://indiafightscorona.giveindia.org">
<img src="https://d2wvdrxmr8p0wf.cloudfront.net/static/giveindia.svg" alt="Give india logo" width="200" />
</a>

如果您已經考慮要贊助這個項目，請先等等!!  

目前印度有數千人因為缺乏氧氣、COVID 相關不可或缺的基礎設施正在死去, 請幫助我們對抗第二波致命的 COVID 病毒的侵襲

您可以到 [https://indiafightscorona.giveindia.org](https://indiafightscorona.giveindia.org) 並且贊助一些金額來幫助我們對抗 COVID 以及克服這場危機  
您的小小的贊助可以大大的幫助到我們. :heart:
</p>


# 功能

- [GitHub 個人統計面版](#github-個人統計面版)
- [GitHub 更多置頂](#github-更多置頂)
- [熱門開發語言](#熱門開發語言)
- [Wakatime 每週動態](#Wakatime-每週動態)
- [佈景主題](#佈景主題)
- [個性化自訂外觀](#個性化自訂外觀)
  - [通用選項](#通用選項)
  - [個人統計面版設定](#個人統計面版設定)
  - [存儲庫面版設定](#存儲庫面版設定)
  - [開發語言面版設定](#開發語言面版設定)
  - [Wakatime 面版設定](#wakatime-面版設定)
- [個人部署](#部署您自己的-vercel-執行個體)

# GitHub 個人統計面版

使用複製貼上方式放到您要顯示的 README 內容裡，就是這個簡單!

請將 `?username=` 的值變更成您的 GitHub 帳號名稱.

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注意: 目前現有的排名有 S+ (前 1%), S (前 25%), A++ (前 45%), A+ (前 60%), 以及 B+ (全部).
排名數值主要使用 [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) 來計算 commits, contributions, issues, stars, pull requests, followers, 以及自己擁有的 repositories 數.
更完整的實作方式您可以點 [src/calculateRank.js](./src/calculateRank.js)._ 做更進一步的研究

### 隱藏個人統計面版

想要隱藏任何特定統計資訊, 你可以在參數入丟入 `?hide=` 並使用逗點區隔參數.

> 選項: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 將私人貢獻數(constributions count)加總到提交次數(commits count)中

您可以透過加入 `?count_private=true` 參數將您私人的貢獻數加總到總提交次數中.

_注意: 如果您是自己部署這個專案,預設貢獻數會被納入統計,如果不是,您就必須先開放分享您私人的貢獻統計._

> 選項: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 顯示小圖示(Icons)

要啟用小圖示,你可以透過傳遞 `show_icons=true` 到參數中, 像是:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 佈景主題

使用內建的佈景主題, 你可以自訂面版外觀而不需要做任何 [個性化自訂外觀](#個性化自訂外觀).

使用 `&theme=THEME_NAME` 參數像是 :-

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 現有的佈景主題 :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stats 佈景主題" width="600px"/>

你可以預覽一下 [可用的佈景主題](./themes/README.md) 或者檢查一下 [佈景主題設定檔](./themes/index.js) & 如果可以的話, **您也可以貢獻新的佈景主題**  :D

### 個性化自訂外觀

您也可以用使用網址參數的方式，定義您想要自訂 `個人統計面版` 或是 `存儲庫面版` 的外觀.

#### 通用選項:

- `title_color` - 面版的標題顏色 _(hex color)_
- `text_color` - 內文文字顏色 _(hex color)_
- `icon_color` - Icon 顏色(如果有的話) _(hex color)_
- `border_color` - 面版的框線顏色 _(hex color)_. (當 `hide_border` 啟用時請勿套用此選項)
- `bg_color` - 面版的背景顏色 _(hex color)_ **或者**  _angle,start,end_ 形式的漸層顏色
- `hide_border` - 隱藏面版框線 _(boolean)_
- `theme` - 佈景主題名稱, 從 [可用的佈景主題](./themes/README.md) 挑選一個名稱
- `cache_seconds` - 手動設定標頭暫存 _(最小: 1800, 最大: 86400)_
- `locale` - 設定面版的語系 _(例如 tw, cn, de, es 諸如此類.)_
- `border_radius` - 面版的四邊圓角半徑_

##### 背景漸層顏色

你可以提供多個使用逗號區隔的顏色值在 bg_color 的選項中來描繪漸層顏色，格式如下 :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> 請注意暫存: 如果 Fork 數以及星星數少於1千存儲庫預設有四小時的暫存 (14400 秒), 其他則有 2 小時暫存 (7200 秒). 另外請注意暫存時間最短 2 小時最長到 24 小時.

#### 個人統計面版設定:

- `hide` - 從個人統計面版中隱藏特定的項目 _(Comma-separated values)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_ 隱藏排名並自動調整面版寬度
- `show_icons` - _(boolean)_
- `include_all_commits` - 以總提交數取代僅計算當年年度提交數 _(boolean)_
- `count_private` - 計算私人提交 _(boolean)_
- `line_height` - 設定文字的行間高度 _(number)_
- `custom_title` - 設定自訂的面版標題
- `disable_animations` - 停用面版的動畫 _(boolean)_

#### 存儲庫面版設定:

- `show_owner` - 顯示存儲庫的擁有人名稱 _(boolean)_

#### 開發語言面版設定:

- `hide` - 從面版中隱藏特定開發語言 _(以逗號,區隔參數)_
- `hide_title` - _(boolean)_
- `layout` - 切換到 `default` 或 `compact` 版面
- `card_width` - 手動設定面版寬度 _(number)_
- `langs_count` - 顯示更多開發語言, 可以是1-10, 預設為 5 _(number)_
- `exclude_repo` - 排除特定的存儲庫 _(使用逗號,區隔參數)_
- `custom_title` - 設定面版自訂標題

> :warning: **重要:**
> 開發語言名稱可能是 uri-escaped, 如 [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding) 上說的
> (例如: `c++` 會變成 `c%2B%2B`, `jupyter notebook` 會變成 `jupyter%20notebook` 等等.) 您可以使用
> [urlencoder.org](https://www.urlencoder.org/) 來協助您自動地做這件事.

#### Wakatime 面版設定:

- `hide` - 隱藏面版上面的特定開發語言 _(使用逗點,隔開)_
- `hide_title` - _(boolean)_
- `line_height` - 設定文字間的行高 _(number)_
- `hide_progress` - 隱藏進度條及百分比 _(boolean)_
- `custom_title` - 給面版設定一個自訂的標題
- `layout` - 切換現有的 `default` & `compact` 排版
- `langs_count` - 限制面版上的開發語言數, 預設顯示全部抓出的開發語言
- `api_domain` - 設定一組自訂的API網域給面版, 例如使用 [Hakatime](https://github.com/mujx/hakatime) 或 [Wakapi](https://github.com/muety/wakapi) 這類的服務
- `range` – 從 WakaTime 請求一段預設時間區間內的狀態, 例如 `last_7_days`. 請參閱 [WakaTime API docs](https://wakatime.com/developers#stats) 以取得更多可用的選項列表.

---

# GitHub 更多置頂

GitHub 更多置頂(extra pins) 允許您使用  Github README 的個人基本資料(Profile)功能，將超過6個以上的存儲庫置頂於您的個人基本資料中.

Ya! 你不用再被6個置頂存儲庫限制住.

### 使用方式

複製貼上到您的 README 檔案並且變更超連結內容.

端點: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### 展示

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#個性化自訂外觀) 變數來包含存儲庫的擁有人帳號名稱

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 熱門開發語言

熱門開發語言面版顯示 GitHub 使用者最常用的開發語言.

_注意: 熱門語言不會指出我的能力等級或任何相關的資訊; 他僅用來評估在 Github 有哪一些上常用的程式開發語言.這是 github-readme-stats 的新功能._

### 使用方式

複製貼上到您的 README 檔案並且變更超連結內容.

端點: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 排除個人存儲庫(Repository)

您可以使用 `?exclude_repo=repo1,repo2` 參數來排除個人的存儲庫(Repository).

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### 隱藏個人開發語言

您可以使用 `?hide=language1,language2` 參數來隱藏個人的開發語言.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 顯示更多語言

您可以使用 `&langs_count=` 選項來增加或減少語言顯示在面版上面的語言數. 可以接受的數值為1-10(包含), 預設是5.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 緊湊的開發語言面版版面

你也可以使用 `&layout=compact` 的選項來壓縮面版的設計.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### 展示

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 緊湊版面

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime 每週動態

請將變更 `?username=` 變更為您 [Wakatime](https://wakatime.com) 的帳號名稱.

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### 展示

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 緊湊版面

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 全部功能展示

- 預設

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隱藏特定資訊

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 顯示圖示

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 自訂框線顏色

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

- 包含全部的提交

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 佈景主題

從 [default themes](#themes) 選取任何佈景主題

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 漸層背景

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 個性化自訂外觀

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 設定面版語系

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- 自訂存儲庫面版

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 熱門開發語言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime 資訊面版

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### 快速提示 (Align The Repo Cards)

您通常不需要用並排方式排版圖片，如果你需要可以用這個方法:

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 部署您自己的 Vercel 執行個體

#### [請一步一步查看 @codeSTACKr 的教學影片](https://youtu.be/n6d4KHSKqGk?t=107)

自從 GitHub API 僅支援每小時5千次請求, 我的 `https://github-readme-stats.vercel.app/api` 有可能會達到這個速率限制. 如果您想要將這個功能放置在您自己的 Vercel 伺服器, 您就不用擔心任何問題. 點一下部署按鈕開始吧!

注意: 自從 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 之後，我們應該可以處理超過5千次請求並且沒有任何停機問題了 :D

[![部署到 Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> 設定 Vercel 導引 🔨 </b></summary>

1. 先到 [vercel.com](https://vercel.com/)
1. 點一下 `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. 使用 GitHub 登入，請按一下 `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
1. 登入 GitHub . (如果有提示的話，請允許存取全部的存儲庫)
1. Fork 這個存儲庫
1. 在 fork 這個存儲庫之後, 請開啟 [`vercel.json`](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json#L5) 檔案並且變更 `maxDuration` 欄位到 `10`
1. 回到您的 [Vercel dashboard](https://vercel.com/dashboard)
1. 選取 `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. 選取 `Import Git Repository`. 選取 root , 其他請維持預設的設定.
   ![](https://files.catbox.moe/pqub9q.png)
1. 建立一個私人的 access token (PAT) [here](https://github.com/settings/tokens/new) 並且啟用 `repo` 權限 (可以允許存取您的私人存儲庫狀態)
1. Add the PAT as an environment variable named `PAT_1` (as shown).
   ![](https://files.catbox.moe/0ez4g7.png)
1. 按一下部署 deploy, 這樣就萬事OK了. 您的網域就能使用 API 了!

</details>

## :sparkling_heart: 支持這個專案

我幾乎把所有我能開放的來源都開放了, 並且我已經盡力回應每個使用這些專案需要協助的人. 很顯然的這需要花很多時間. 您可以免費使用這些服務.

然而<，如果您正在使用這個專案並且用得開心的話，請給我一些鼓勵來支持我持續創造一些東西，您可以透過幾個方式 :-

- 使用 github-readme-stats 時請給它一些正面的評價並且將提供這個專案的超連結 :D
- 給專案星星並且幫忙分享出去 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 您也可以透過 PayPal 提供一次性的贊助. 我可能可以買一杯 ~~咖啡~~ 茶. :tea:

甘溫! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](./powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)


非常歡迎有意願的貢獻者加入! <3

本專案使用 :heart: 跟 JavaScript 做開發.
