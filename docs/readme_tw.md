<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在你的 README 中獲取動態生成的 GitHub 統計信息！</p>
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
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">報告 Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">請求增加功能</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français</a>
    ·
    <a href="/docs/readme_cn.md">简体中文</a>
    ·
    <a href="/docs/readme_tw.md">繁體（正體）中文</a>
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
<p align="center">喜欢這個項目？請考慮<a href="https://www.paypal.me/anuraghazra">捐贈</a>來幫助完善吧！

# 特點

- [GitHub 統計卡片](#GitHub-統計卡片)
- [GitHub 額外置頂](#GitHub-額外置頂)
- [常用語言卡片](#常用語言卡片)
- [Wakatime 週統計](#Wakatime-週統計)
- [主題](#主題)
- [自定義](#自定義)
- [自行部署](#自行部署)

# GitHub 統計卡片

將這行代碼複製到你的 Markdown 文件中，就這麽簡單！

請將 `?username=` 選項的值設爲你的 GitHub 用戶名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注：用戶可獲得的等級有 S+ （最頂尖 1%）、S （最頂尖 25%）、A++ （最頂尖 45%）、A+ （最頂尖 60%）及 B+ （剩餘用戶）。 等級是基于用戶的提交（commit）、貢獻（contribution）、問題（issue）、標星（star）、拉取請求（pull request）、追蹤人數（follower）及擁有的倉庫（repository）數量通過[累計分佈函數（cumulative distribution function）](https://zh.wikipedia.org/wiki/%E7%B4%AF%E7%A7%AF%E5%88%86%E5%B8%83%E5%87%BD%E6%95%B0)計算得出。  
詳細實踐可在 [src/calculateRank.js](../src/calculateRank.js) 查閲_

### 隱藏指定統計

想要隱藏指定的統計信息，你可以調用 `?hide=` 選項，使用 `,` 分隔不同選項。

> 參數：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 將私人項目貢獻添加到總提交計數中

你可以使用 `?count_private=true` 參數把私人貢獻計數添加到總提交計數中。

_注：如果你是自行部署本項目，默認將會計數私人貢獻，如果不是自己部署，你需要分享你的私人貢獻計數。_

> 选项: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 顯示圖標

如果想要顯示圖標，你可以調用 `show_icons=true` 參數，例如：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主題

你可以使用現有的主題個性化卡片，省去[手動自定義](#自定義)的麻煩。

請調用 `?theme=THEME_NAME` 參數，例如：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有現有主題

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

你可以預覽[所有可用主題](../themes/README.md)或者查閲[主題配置文件](../themes/index.js), 而且如果你喜欢, **你也可以貢獻新的主題** :D

### 自定義

你可以通過使用 URL 参数的方式，自定義你的統計卡片（`Stats Card`）或 Repo 卡片（`Repo Card`）樣式。

常用選項：

- `title_color` - 卡片標題顔色 _（十六進制色碼）_
- `text_color` - 內容文本顔色 _（十六進制色碼）_
- `icon_color` - 圖標顔色（如果可用） _（十六進制色碼）_
- `bg_color` - 卡片背景顔色 _（十六進制色碼）_ **或者** `角度,起始顔色,結束顔色` 格式的漸變
- `hide_border` - 隱藏卡片邊框 _(boolean)_
- `theme` - 主題名称，从[所有可用主題](../themes/README.md)中選擇
- `cache_seconds` - 手動設置緩存數據時間 _（最小值: 1800，最大值: 86400）_
- `locale` - 在卡片中設置在地化語言 _(例如 cn, de, es, 等等)_
- `border_radius` - 卡片圓角半徑 _（數值）_

##### bg_color 漸變

你可以在 bg_color 選項中提供多個以逗號分隔的值來呈現漸變，漸變的格式是 :-

```
&bg_color=角度,顔色1,顔色2,顔色3……顔色10
```

> 緩存注意事項：如果分叉（fork）數和標星（star）數少于 1k，Repo 卡片默認緩存是 4 小時 （14400 秒） ，否則是 2 小時（7200 秒）。另請注意緩存時間限制爲最短 2 小時，最長 24 小時。

#### 統計卡片專屬選項：

- `hide` - 隱藏特定統計信息 _（逗號分隔值）_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_ 隱藏等級並自動改變卡片寬度
- `show_icons` - _(boolean)_
- `include_all_commits` - 統計總提交次數而不僅是統計今年的提交次數 _(boolean)_
- `count_private` - 統計私人提交次數 _(boolean)_
- `line_height` - 設置文本之間的行高 _（數值）_
- `custom_title` - 爲卡片設置自定義標題
- `disable_animations` - 關閉卡片的所有動畫效果 _(boolean)_

#### Repo 卡片專屬選項：

- `show_owner` - 顯示 Repo 的所有者名字 _(boolean)_

#### 語言卡片專屬選項：

- `hide` - 從卡片中隱藏指定語言 _（逗號分隔值）_
- `hide_title` - _(boolean)_
- `layout` - 在兩個可用佈局 `default` 及 `compact` 間切換
- `card_width` - 手動設置卡片寬度 _（數值）_
- `langs_count` - 卡片上顯示更多語言，爲 1 至 10 的整數，默認值爲 5 _（數值）_
- `exclude_repo` - 排除指定 repo _(逗號分隔值)_
- `custom_title` - 爲卡片設置自定義標題

> :warning: **重要:**
> 語言名稱應該使用[百分號編碼](https://en.wikipedia.org/wiki/Percent-encoding) 指定的 uri 轉義法。
> (例: `c++` 應轉爲 `c%2B%2B`、`jupyter notebook` 應轉爲 `jupyter%20notebook` 等等)
> 你可以使用 [urlencoder.org](https://www.urlencoder.org/) 自動幫你轉換。

#### Wakatime 卡片專屬選項：

- `hide_title` - _(boolean)_
- `line_height` - 設置文本之間的行高 _（數值）_
- `hide_progress` - 隱藏進度條及百分比 _(boolean)_
- `custom_title` - 爲卡片設置自定義標題
- `layout` - 在兩個可用佈局 `default` 及 `compact` 間切換
- `api_domain` - 設置卡片使用的自定義 API，例如使用 [Hakatime](https://github.com/mujx/hakatime) 或 [Wakapi](https://github.com/muety/wakapi) 服務
- `range` – 使用跟 WakaTime 默認值不同的時間段，例如 `last_7_days`（過往 7 天）。參見 [WakaTime API 文獻](https://wakatime.com/developers#stats)以查看選項

---

# GitHub 額外置頂

GitHub 額外置頂允許你在使用 GitHub 個人資料 readme 時，在個人資料中置頂多于 6 個 repo 。

是的！你不再受限于置頂最多 6 個 repo 了。

### 使用細則

複製粘貼這段代碼到你的 README 文件中，並更改鏈接。

端点: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#自定義) 選項以顯示 Repo 所有者的用戶名。

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 常用語言卡片

常用語言卡片顯示了該 GitHub 用戶常用的編程語言。

_注意：常用語言並不代表我的技能水平或类似的資訊，它是用來衡量用戶在 GitHub 上拥有最多代碼的語言的一項指標，它是 github-readme-stats 的新特性。_

### 使用細則

將此代碼复複製粘貼到您的 README 文件中，並修改鏈接。

端点: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 排除單獨 repo

你可以使用 `?exclude_repo=repo1,repo2` 參數以排除或不計算單獨 repo。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### 隱藏指定語言

你可以使用 `?hide=language1,language2` 參數來隱藏指定的語言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 顯示更多語言

你可以使用 `&langs_count=` 選項以增加或減少卡片上的語言數量。參數爲 1 至 10 的整數，默認值爲 5。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 緊凑語言卡片佈局

你可以使用 `&layout=compact` 參數来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑佈局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime 週統計

請將 `?username=` 參數的值設爲您的 [Wakatime](https://wakatime.com) 用戶名。

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑佈局

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 全部 Demo

- 默認

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隱藏指定統計

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 顯示圖標

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 包括全部提交（commit）

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 主題

從[默認主題](#主題)中選擇

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 漸變背景

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 自定義卡片統計

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 設置卡片在地化語言（簡中請用 `zhs` 或 `cn`，繁中請用 `zht` 或 `tw`）

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=tw)

- 自定義 Repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 常用語言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime 卡片

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### 提示——對齊 Repo 卡片

您通常無法將卡片左右顯示。爲此，您可以使用以下方法：

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 自行部署

#### [參見 @codeSTACKr 的教程（英文）](https://youtu.be/n6d4KHSKqGk?t=107)

因爲 GitHub 的 API 每個小時只允許 5 千次請求，我的 `https://github-readme-stats.vercel.app/api` 很有可能會觸發限制。如果你部署卡片在自己的 Vercel 伺服器上，那麼你就不必爲此担心。點擊 deploy 按鈕來開始部署吧！

備注: 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我們應該能夠處理超過 5 千次請求，並且不会出现宕機問題 :D

[![在 Vercel 上部署](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>部署 Vercel 指導</summary>

1. 前往 [vercel.com](https://vercel.com/)
1. 點擊 `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. 點擊 `Continue with GitHub` 通過 GitHub 登錄
   ![](https://files.catbox.moe/btd78j.jpeg)
1. 登錄 GitHub 並允許訪問所有 repo（如果系統提示）
1. 分叉（Fork）本 repo
1. 返回你的 [Vercel dashboard](https://vercel.com/dashboard)
1. 選擇 `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. 選擇 `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. 選擇 root 並將所有内容保持不变，只需添加名为 PAT_1 的環境變量（如圖所示），其中將包含個人訪問令牌（PAT），你可以在[這里](https://github.com/settings/tokens/new)輕鬆創建令牌（保留默認設置，只需要更改命名，名字随便）
   ![](https://files.catbox.moe/caem5b.png)
1. 點擊 deploy 就完成了，查看你的域名就可使用 API 了！

</details>

## :sparkling_heart: 支持這個項目

我盡己所能地開源所有東西，並且我盡量回覆每個使用項目時需要幫助的人。很明顯，這需要時間，但你可以免費享受這些服務。

然而, 如果你正在使用這個項目並覺得不錯，或只是想要支持我繼續開發，你可以通過如下方式：

- 在你的 readme 中使用 github-readme-stats 时，鏈接這裏 :D
- 標星並分享這個項目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通過 PayPal 一次性捐款。我多半會買一杯 ~~咖啡~~ 茶。:tea:

謝謝！ :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

歡迎貢獻！ <3

用 :heart: 發電，用 JavaScript 製作。
