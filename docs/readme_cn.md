<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在你的 README 中获取动态生成的 GitHub 统计信息！</p>
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
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">报告 Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">请求增加功能</a>
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
<p align="center">喜欢这个项目？请考虑<a href="https://www.paypal.me/anuraghazra">捐赠</a>来帮助完善吧！

# 特性

- [GitHub 统计卡片](#GitHub-统计卡片)
- [GitHub 更多置顶](#GitHub-更多置顶)
- [常用语言卡片](#常用语言卡片)
- [Wakatime 周统计](#Wakatime-周统计)
- [主题](#主题)
- [自定义](#自定义)
- [自行部署](#自行部署)

# GitHub 统计卡片

将这行代码复制到你的 markdown 文件中，就是如此简单！

更改 `?username=` 选项的值为你的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注：用户可获得的等级有 S+ （最顶尖 1%）、S （最顶尖 25%）、A++ （最顶尖 45%）、A+ （最顶尖 60%）及 B+ （剩余用户）。 等级是基于用户的提交（commit）、贡献（contribution）、问题（issue）、标星（star）、拉取请求（pull request）、追踪人數（follower）及拥有的仓库（repository）数量通过[累计分布函数（cumulative distribution function）](https://zh.wikipedia.org/wiki/%E7%B4%AF%E7%A7%AF%E5%88%86%E5%B8%83%E5%87%BD%E6%95%B0)计算得出。  
详细实践可在 [src/calculateRank.js](../src/calculateRank.js) 查阅_

### 隐藏指定统计

想要隐藏指定的统计信息，你可以调用 `?hide=` 选项，其值用 `,` 分隔。

> 参数：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 将私人项目贡献添加到总提交计数中

你可以使用 `?count_private=true` 参数把私人贡献计数添加到总提交计数中。

_注：如果你是自行部署本项目，私人贡献将会默认被计数，如果不是自行部署，你需要分享你的私人贡献计数。_

> 选项: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 显示图标

如果想要显示图标，你可以调用 `show_icons=true` 参数，例如：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主题

你可以使用现有的主题个性化卡片，省去[手动自定义](#自定义)的麻烦。

请调用 `?theme=THEME_NAME` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有现有主题

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

你可以预览[所有可用主题](../themes/README.md)或者签出[主题配置文件](../themes/index.js), 而且如果你喜欢, **你也可以贡献新的主题** :D

### 自定义

你可以通过使用 URL 参数的方式，为你的 `Stats Card` 或 `Repo Card` 自定义样式。

常用选项：

- `title_color` - 卡片标题颜色 _（十六进制色码）_
- `text_color` - 内容文本颜色 _（十六进制色码）_
- `icon_color` - 图标颜色（如果可用）_（十六进制色码）_
- `bg_color` - 卡片背景颜色 _（十六进制色码）_ **或者** `角度,起始颜色,結束颜色` 格式的漸變
- `hide_border` - 隐藏卡的边框 _(boolean)_
- `theme` - 主题名称，从[所有可用主题](../themes/README.md)中选择
- `cache_seconds` - 手动设置缓存头 _（最小值: 1800，最大值: 86400）_
- `locale` - 在卡片中设置在地化语言 _(例如 cn, de, es, 等等)_
- `border_radius` - 卡片圆角半径 _（数值）_

##### bg_color 渐变

你可以在 bg_color 选项中提供多个逗号分隔的值来呈现渐变，渐变的格式是 :-

```
&bg_color=角度,颜色1,颜色2,颜色3...颜色10
```

> 缓存注意事项: 如果分叉（fork）数和标星（star）数少于 1k，Repo 卡片默认缓存是 4 小时 （14400 秒） ，否则是 2 小时（7200 秒）。另请注意缓存时间限制为最短 2 小时，最长 24 小时。

#### 统计卡片专属选项:

- `hide` - 隐藏特定统计信息 _（逗号分隔值）_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_ 隐藏等级并自动改变卡片宽度
- `show_icons` - _(boolean)_
- `include_all_commits` - 统计总提交次数而不是仅统计今年的提交次数 _(boolean)_
- `count_private` - 统计私人提交 _(boolean)_
- `line_height` - 设置文本之间的行高 _（数值）_
- `custom_title` - 为卡片设置自定义标题
- `disable_animations` - 关闭卡片的所有动画效果 _(boolean)_

#### Repo 卡片专属选项:

- `show_owner` - 显示 Repo 的所有者名字 _(boolean)_

#### 语言卡片专属选项:

- `hide` - 从卡片中隐藏指定语言 _（逗号分隔值）_
- `hide_title` - _(boolean)_
- `layout` - 在两个可用布局 `default` & `compact` 间切换
- `card_width` - 手动设置卡片的宽度 _（数值）_
- `langs_count` - 卡片上显示更多语言，为 1 至 10 的整数，默认值 5 _（数值）_
- `exclude_repo` - 排除指定 repo _（逗号分隔值）_
- `custom_title` - 为卡片设置自定义标题

> :warning: **重要:**
> 语言名称应该使用[百分号编码](https://en.wikipedia.org/wiki/Percent-encoding) 指定的 uri 转义法。
> (例: `c++` 应转为 `c%2B%2B`、`jupyter notebook` 应转为 `jupyter%20notebook` 等等)
> 你可以使用 [urlencoder.org](https://www.urlencoder.org/) 自动帮你转换。

#### Wakatime 卡片专属选项：

- `hide_title` - _(boolean)_
- `line_height` - 设置文本之间的行高 _（数值）_
- `hide_progress` - 隐藏進度条及百分比 _(boolean)_
- `custom_title` - 为卡片设置自定义标题
- `layout` - 在两个可用布局 `default` 及 `compact` 间切换
- `api_domain` - 设置卡片使用的自定义 API，例如使用 [Hakatime](https://github.com/mujx/hakatime) 或 [Wakapi](https://github.com/muety/wakapi) 服务
- `range` – 使用跟 WakaTime 默认值不同的时间段，例如 `last_7_days`（过往 7 天）。参见 [WakaTime API 文獻](https://wakatime.com/developers#stats)以查看选项

---

# GitHub 更多置顶

GitHub 更多置顶允许你在使用 GitHub 个人资料 readme 时，在个人资料中置顶多于 6 个 repo 。

是的！你不再受限于置顶最多 6 个 repo 了。

### 使用细则

复制粘贴这段代码到你的 README 文件中，并更改链接。

端点: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#自定义) 选项以显示 Repo 所有者的用户名。

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 常用语言卡片

常用语言卡片显示了 GitHub 用户常用的编程语言。

_注意：常用语言并不代表我的技能水平或类似的信息，它是用来衡量用户在 github 上拥有最多代码的语言的一项指标，它是 github-readme-stats 的新特性。_

### 使用细则

将此代码复制粘贴到您的 README 文件中，并修改链接。

端点: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 排除单独 repo

你可以使用 `?exclude_repo=repo1,repo2` 参数以排除或不计算单独 repo。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏指定语言

你可以使用 `?hide=language1,language2` 参数来隐藏指定的语言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 显示更多语言

你可以使用 `&langs_count=` 选项以增加或减少卡片上的语言数量。参数为 1 至 10 的整数，默认值为 5。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 紧凑语言卡片布局

你可以使用 `&layout=compact` 参数来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime 周统计

请将 `?username=` 参数的值设为您的 [Wakatime](https://wakatime.com) 用户名。

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 全部 Demo

- 默认

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隐藏指定统计

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 显示图标

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 包含全部提交（commit）

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 主题

从[默认主题](#主题)中选择

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 渐变背景

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 自定义统计卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 设置卡片本地化语言（简中请用 `zhs` 或 `cn`，繁中请用 `zht` 或 `tw`）

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=cn)

- 自定义 repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 常用语言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime 卡片

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### 提示——对齐 Repo 卡片

你通常无法将图片左右显示。为此，您可以使用以下方法：

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 自行部署

#### [参见 @codeSTACKr 的教程（英文）](https://youtu.be/n6d4KHSKqGk?t=107)

因为 GitHub 的 API 每个小时只允许 5 千次请求，我的 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制。如果你将其托管在自己的 Vercel 服务器上，那么你就不必为此担心。点击 deploy 按钮来开始你的部署！

注意: 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我们应该能够处理超过 5 千次的请求，并且不会出现宕机问题 :D

[![在 Vercel 上部署](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Vercel 部署指南</summary>

1. 前往 [vercel.com](https://vercel.com/)
1. 点击 `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. 点击 `Continue with GitHub` 通过 GitHub 进行登录
   ![](https://files.catbox.moe/btd78j.jpeg)
1. 登录 GitHub 并允许访问所有存储库（如果系统这样提示）
1. Fork 这个仓库
1. 返回到你的 [Vercel dashboard](https://vercel.com/dashboard)
1. 选择 `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. 选择 `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. 选择 root 并将所有内容保持不变，并且只需添加名为 PAT_1 的环境变量（如图所示），其中将包含一个个人访问令牌（PAT），你可以在[这里](https://github.com/settings/tokens/new)轻松创建令牌（保留默认设置，只需要更改命名，名字随便）
   ![](https://files.catbox.moe/caem5b.png)
1. 点击 deploy 就完成了，查看你的域名就可使用 API 了！

</details>

## :sparkling_heart: 支持这个项目

我尽己所能地进行开源，并且我尽量回复每个在使用项目时需要帮助的人。很明显，这需要时间，但你可以免费享受这些。

然而, 如果你正在使用这个项目并感觉良好，或只是想要支持我继续开发，你可以通过如下方式：

- 在你的 readme 中使用 github-readme-stats 时，链接指向这里 :D
- 标星并分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款。我多半会买一杯 ~~咖啡~~ 茶。:tea:

谢谢！ :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

欢迎贡献！ <3

用 :heart: 发电，用 JavaScript 制作。
