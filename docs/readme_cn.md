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
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/discussions">提出问题</a>
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
<p align="center">喜欢这个项目？请考虑<a href="https://www.paypal.me/anuraghazra">捐赠</a>来帮助它完善！

# 特性

- [GitHub 统计卡片](#GitHub-统计卡片)
- [GitHub 更多置顶](#GitHub-更多置顶)
- [热门语言卡片](#热门语言卡片)
- [每周统计卡片](#每周统计卡片)
- [主题](#主题)
- [自定义](#自定义)
  - [常用选项](#常用选项)
  - [统计卡片专属选项](#统计卡片专属选项)
  - [Repo 卡片专属选项](#Repo-卡片专属选项)
  - [语言卡片专属选项](#语言卡片专属选项)
  - [每周统计卡片专属选项](#每周统计卡片专属选项)
- [自己部署](#自己部署)

# GitHub 统计卡片

将这行代码复制到你的 markdown 文件中，就是如此简单！

更改 `?username=` 的值为你的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注：注意：可用排名为 S+（前 1%）、S（前 25%）、A++（前 45%）、A+（前 60%）和 B+（所有人）。
这些值是通过使用提交、贡献、问题、星号、拉取请求、关注者和拥有的存储库的[累积分布函数](https://en.wikipedia.org/wiki/Cumulative_distribution_function)来计算的。
等级基于用户的统计信息计算得出，详见 [src/calculateRank.js](../src/calculateRank.js)_

### 隐藏指定统计

想要隐藏指定统计信息，你可以调用参数 `?hide=`，其值用 `,` 分隔。

> 选项：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 将私人项目贡献添加到总提交计数中

你可以使用参数 `?count_private=true` 把私人贡献计数添加到总提交计数中。

_注：如果你是自己部署本项目，私人贡献将会默认被计数，如果不是自己部署，你需要分享你的私人贡献计数。_

> 选项: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 显示图标

如果想要显示图标，你可以调用 `show_icons=true` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主题

你可以通过现有的主题进行卡片个性化，省去[手动自定义](#自定义)的麻烦。

通过调用 `?theme=THEME_NAME` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有现有主题

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

你可以预览[所有可用主题](../themes/README.md)或者签出[主题配置文件](../themes/index.js), 而且如果你喜欢, **你也可以贡献新的主题** :D

### 自定义

你可以通过使用 URL 参数的方式，为你的 `Stats Card` 或 `Repo Card` 自定义样式。

#### 常用选项:

- `title_color` - 卡片标题颜色 _（十六进制色码）_
- `text_color` - 内容文本颜色 _（十六进制色码）_
- `icon_color` - 图标颜色（如果可用）_（十六进制色码）_
- `border_color` - Card's border color _(hex color)_. (Does not apply when `hide_border` is enabled)
- `bg_color` - 卡片背景颜色 _（十六进制色码）_ **或者** 以 _angle,start,end_ 的形式渐变
- `hide_border` - 隐藏卡的边框 _(布尔值)_
- `theme` - 主题名称，从[所有可用主题](../themes/README.md)中选择
- `cache_seconds` - 手动设置缓存头 _（最小值: 1800，最大值: 86400）_
- `locale` - 在卡片中设置语言 _(例如 cn, de, es, 等等)_
- `border_radius` - Corner rounding on the card_

> 注意：目前`cache_seconds`的最小值是4小时，作为对PATs耗尽的一个临时修复。

##### bg_color 渐变

你可以在 bg_color 选项中提供多个逗号分隔的值来呈现渐变，渐变的格式是 :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> 缓存的注意事项: 如果 fork 数和 star 数 少于 1k , Repo 卡片默认缓存是 4 小时 （14400 秒） ，否则是 2 小时（7200）。另请注意缓存被限制为最短 2 小时，最长 24 小时。

#### 统计卡片专属选项:

- `hide` - 隐藏特定统计信息 _(以逗号分隔)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_
- `show_icons` - _(boolean)_
- `include_all_commits` - 统计总提交次数而不是仅统计今年的提交次数 _(boolean)_
- `count_private` - 统计私人提交 _(boolean)_
- `line_height` - 设置文本之间的行高 _(number)_
- `custom_title` - 为卡片设置一个自定义的标题
- `disable_animations` - 禁用卡片中的所有动画 _(boolean)_

#### Repo 卡片专属选项:

- `show_owner` - 显示 Repo 的所有者名字 _(boolean)_

#### 语言卡片专属选项:

- `hide` - 从卡片中隐藏指定语言 _(Comma seperated values)_
- `hide_title` - _(boolean)_
- `layout` - 在两个可用布局 `default` & `compact` 间切换
- `card_width` - 手动设置卡片的宽度 _(number)_
- `langs_count` - 在卡片上显示更多的语言，在1-10之间，默认为5 _(number)_
- `exclude_repo` - 排除指定的存储库 _(Comma-separated values)_
- `custom_title` - 为卡片设置一个自定义的标题

> :warning: **重要:**
> 如 [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding) 所指定，语言名称应使用 uri 转义。
> (例: `c++` 应该是 `c%2B%2B`, `jupyter notebook` 应该是 `jupyter%20notebook`, 等.)
> [urlencoder.org](https://www.urlencoder.org/) to help you do this automatically.

#### 每周统计卡片:

- `hide` - 隐藏卡片上的指定语言 _(Comma-separated values)_
- `hide_title` - _(boolean)_
- `line_height` - 设置文本之间的行高 _(number)_
- `hide_progress` - 隐藏进度条和百分比 _(boolean)_
- `custom_title` - 为卡片设置一个自定义的标题
- `layout` - 在两个可用的布局 `default` (默认)和 `compact` (紧凑)之间切换
- `langs_count` - 限制卡片上的语言数量，默认为所有报告语言
- `api_domain` - 为卡片设置一个自定义的 API 域，例如使用 [Hakatime](https://github.com/mujx/hakatime) 或 [Wakapi](https://github.com/muety/wakapi) 等服务。
- `range` – 要求一个与你的 WakaTime 默认值不同的范围，例如：`last_7_days`。请参阅 [WakaTime API docs](https://wakatime.com/developers#stats) 以获得可用选项的列表。

---

# GitHub 更多置顶

GitHub 更多置顶 允许你在使用 GitHub readme profile 时，在个人资料中置顶多于 6 个 repo 。

是的！你不再受限于置顶最多 6 个存储库了。

### 使用细则

复制粘贴这段代码到你的 README 文件中，并更改链接。

端点: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#自定义) 变量将 Repo 所有者的用户名包含在内。

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 热门语言卡片

热门语言卡片显示了 GitHub 用户常用的编程语言。

_注意：热门语言并不表示我的技能水平或类似的水平，它是用来衡量用户在 github 上拥有最多代码的语言的一项指标，它是 github-readme-stats 的新特性_

### 使用细则

将此代码复制粘贴到您的 `README.md` 文件中，并修改链接。

端点: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 排除指定存储库

你可以使用 `&exclude_repo=repo1,repo2` 参数来排除指定的存储库。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏指定语言

可以使用 `?hide=language1,language2` 参数来隐藏指定的语言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 显示更多语言

你可以使用 `&langs_count=` 选项来增加或减少卡片上显示的语言数量。有效值是 1 到 10（包括）之间的整数，默认值是 5。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 紧凑的语言卡片布局

你可以使用 `&layout=compact` 参数来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# 每周统计卡片

将 `?username=` 值改为你的 [Wakatime](https://wakatime.com) 用户名。

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

> 注意：请注意，我们目前仅显示来自 Wakatime 公开资料的数据。

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 全部 Demos

- 默认

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Hiding specific stats

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Showing icons

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Customize Border Color

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

- Include All Commits

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 主题

从[默认主题](#主题)中进行选择

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 渐变

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 自定义统计卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Setting card locale

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- 自定义 repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 热门语言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime card

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### 快速提示 (对齐 Repo 卡片)

你通常无法将图片靠边显示。为此，您可以使用以下方法：

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 自己部署

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

因为 GitHub 的 API 每个小时只允许 5 千次请求，我的 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制。如果你将其托管在自己的 Vercel 服务器上，那么你就不必为此担心。点击 deploy 按钮来开始你的部署！

注意: 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我们应该能够处理超过 5 千次的请求，并且不会出现宕机问题 :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>设置 Vercel 的指导</summary>

1. 前往 [vercel.com](https://vercel.com/)
1. 点击 `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. 点击 `Continue with GitHub` 通过 GitHub 进行登录
   ![](https://files.catbox.moe/btd78j.jpeg)
1. 登录 GitHub 并允许访问所有存储库（如果系统这样提示）
1. Fork 这个仓库
1. After forking the repo, open the [`vercel.json`](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json#L5) file and change the `maxDuration` field to `10`
1. 返回到你的 [Vercel dashboard](https://vercel.com/dashboard)
1. 选择 `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. 选择 `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. Create a personal access token (PAT) [here](https://github.com/settings/tokens/new) and enable the `repo` permissions (this allows access to see private repo stats)
1. Add the PAT as an environment variable named `PAT_1` (as shown).
   ![](https://files.catbox.moe/0ez4g7.png)
1. Click deploy, and you're good to go. See your domains to use the API!

</details>

## :sparkling_heart: 支持这个项目

我尽己所能地进行开源，并且我尽量回复每个在使用项目时需要帮助的人。
很明显，这需要时间，但你可以免费享受这些。

然而, 如果你正在使用这个项目并感觉良好，或只是想要支持我继续开发，你可以通过如下方式：

- 在你的 readme 中使用 github-readme-stats 时，链接指向这里 :D
- Star 并 分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款. 我多半会买一杯 ~~咖啡~~ 茶. :tea:

谢谢！ :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)


欢迎贡献！ <3

用 :heart: 发电，用 JavaScript 制作。
