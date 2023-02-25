<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在你的 README 中显示动态生成的 GitHub 统计信息！</p>
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

# 功能

- [GitHub 统计卡片](#GitHub-统计卡片)
- [GitHub 更多置顶](#GitHub-更多置顶)
- [常用语言卡片](#常用语言卡片)
- [Wakatime 周统计](#Wakatime-周统计)
- [主题](#主题)
- [自定义配置](#自定义配置)
    - [公共配置](#公共配置)
    - [统计卡片专属选项](#统计卡片专属选项)
    - [仓库卡片专属选项](#仓库卡片专属选项)
    - [语言卡片专属选项](#语言卡片专属选项)
    - [Wakatime 卡片专属选项](#Wakatime-卡片专属选项)
- [部署到自己的 Vercel 实例](#部署到自己的-Vercel-实例)

# GitHub 统计卡片

将这行代码复制到你的 markdown 文件中，就是如此简单！

把 `?username=` 的值修改为你的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注: 等级包括 S+ (高于 1%), S (高于 25%), A++ (高于 45%), A+ (高于 60%), 和 B+ (基本水平)。
等级值使用 [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) 算法，基于提交数、贡献数、issue 数量、star 数量、PR 数量、follower 数量 以及拥有的仓库数计算得出。
具体实现可见 [src/calculateRank.js](./src/calculateRank.js)_。

### 隐藏指定统计项

想要隐藏指定统计信息，你可以使用参数 `?hide=`，其值用 `,` 分隔。

> 参数配置：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 将私人项目贡献添加到总提交计数中

你可以使用参数 `?count_private=true` 把私人贡献计数添加到总提交计数中。

_注：如果你是自己部署本项目，私人贡献将会默认被计数，如果不是自己部署，你需要分享你的私人贡献计数。_

> 参数配置: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 显示图标

如果想要显示图标，你可以调用 `show_icons=true` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主题

使用现有主题，你可以直接得到个性化的卡片外观，省去[手动配置](#自定义配置)的麻烦。

通过调用 `?theme=THEME_NAME` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有现有主题

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

你可以预览[所有可用主题](../themes/README.md)或者查看[主题配置文件](../themes/index.js), 当然如果你喜欢, **也可以贡献新的主题** :D

### 自定义配置

你可以根据需要配置 URL 参数，来为你的 `统计卡片` 或 `仓库卡片` 自定义显示效果。

#### 公共配置

- `title_color` - 卡片标题颜色 _（十六进制色码）_
- `text_color` - 内容文本颜色 _（十六进制色码）_
- `icon_color` - 图标颜色（如果图标可用）_（十六进制色码）_
- `border_color` - 卡片边框颜色 _(十六进制色码)_. (请不要在 `hide_border` 开启时使用该配置)
- `bg_color` - 卡片背景颜色 _（十六进制色码）_ **或者** 以 _angle,start,end_ 的形式表示渐变色
- `hide_border` - 隐藏卡片边框 _(布尔值)_
- `theme` - 主题名称，从[所有可用主题](../themes/README.md)中选择
- `cache_seconds` - 手动设置缓存头 _（最小值: 1800，最大值: 86400）_
- `locale` - 设置在卡片中使用的语言 _(例如 cn, de, es, 等等)_
- `border_radius` - 卡片圆角弧度 _(数字)_

##### bg_color 渐变

你可以在 bg_color 配置项中提供多个逗号分隔的值来呈现渐变，渐变的格式是 :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> 缓存的注意事项: 如果 fork 数和 star 数 少于 1k , 仓库卡片默认缓存是 4 小时 （14400 秒） ，否则是 2 小时（7200）。另请注意缓存被限制为最短 2 小时，最长 24 小时。

#### 统计卡片专属选项:

- `hide` - 隐藏特定统计信息 _(以逗号分隔)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_ 隐藏等级排名并且自动调整卡片宽度
- `show_icons` - _(boolean)_
- `include_all_commits` - 统计总提交次数而不是仅统计今年的提交次数 _(boolean)_
- `count_private` - 统计私人提交 _(boolean)_
- `line_height` - 设置文本之间的行高 _(number)_
- `custom_title` - 自定义卡片标题
- `disable_animations` - 禁用卡片中的所有动画 _(boolean)_

#### 仓库卡片专属选项:

- `show_owner` - 显示仓库所有者的名字 _(boolean)_

#### 语言卡片专属选项:

- `hide` - 从卡片中隐藏指定语言 _(逗号分隔值)_
- `hide_title` - _(boolean)_
- `layout` - 在两个可用布局 `default` 和 `compact` 中切换选择
- `card_width` - 手动设置卡片的宽度 _(number)_
- `langs_count` - 在卡片中显示更多语言，数值范围 1-10，默认值是 5 _(number)_
- `exclude_repo` - 剔除指定仓库 _(逗号分隔值)_
- `custom_title` - 自定义卡片标题

> :warning: **重要:**
> 如 [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding) 所规定的，语言名称应该使用 uri 转义。
> (例如: `c++` 应该是 `c%2B%2B`, `jupyter notebook` 应该是 `jupyter%20notebook` 等等。
> 你可以使用 [urlencoder.org](https://www.urlencoder.org/) 来帮助你自动完成转义工作。

#### Wakatime 卡片专属选项:

- `hide_title` - _(boolean)_
- `line_height` - 设置文本之间的行高 _(number)_
- `hide_progress` - 隐藏进度条和百分比 _(boolean)_
- `custom_title` - 自定义卡片标题
- `layout` - 可在两个可用布局 `default` 和 `compact` 中切换选择
- `langs_count` - 限制卡片中显示的语言数量，默认使用报告中的所有语言
- `api_domain` - 自定义 API domain，比如使用 [Hakatime](https://github.com/mujx/hakatime) 或 [Wakapi](https://github.com/muety/wakapi) 之类的服务
- `range` – 设置与 WakaTime 默认值不同的时间范围，比如 `last_7_days`. 查看 [WakaTime API 文档](https://wakatime.com/developers#stats) 了解可用选项列表。


---

# GitHub 更多置顶

GitHub 更多置顶 允许你在使用 GitHub readme profile 时，在个人资料中置顶多于 6 个仓库。

是的！你不再受限于最多置顶 6 个仓库了。

### 使用方法

复制粘贴这段代码到你的 README 文件中，并更改链接。

端点: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#自定义配置) 变量将仓库所有者的用户名包含在内。

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 常用语言卡片

常用语言卡片显示了 GitHub 用户最常用的编程语言。

_注意：常用语言并不表示我的技能水平或类似的水平，它是用来衡量用户在 github 上拥有最多代码的语言的一项指标，它是 github-readme-stats 的新特性_

### 使用方法

将此代码复制粘贴到您的 `README.md` 文件中，并修改链接。

端点: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏指定语言

可以使用 `?hide=language1,language2` 参数来隐藏指定的语言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 显示更多语言

可以使用 `&langs_count=` 参数项来增加或减少卡片中显示的语言数量。合法的数值范围是 1 到 10（包含），默认值是 5。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 紧凑的语言卡片布局

你可以使用 `&layout=compact` 参数项来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime 周统计

将 `?username=`的值改变为你的 [Wakatime](https://wakatime.com) 用户名

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 全部 Demos

- 默认

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隐藏指定统计

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 显示图标

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 自定义边框颜色

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

- 包含全部提交

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 主题

从[默认主题](#主题)中进行选择

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 渐变

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 自定义统计卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 设置卡片语言

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- 自定义仓库卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 常用语言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime 卡片

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### 快速提示 (对齐仓库卡片)

您通常无法实现并排布局。为此，您可以使用以下方法：

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 部署到自己的 Vercel 实例

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

因为 GitHub 的 API 每个小时只允许 5 千次请求，我的 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制。如果你将其托管在自己的 Vercel 服务器上，那么你就不必为此担心。点击 deploy 按钮来开始你的部署！

注意: 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我们应该能够处理超过 5 千次的请求，并且不会出现宕机问题 :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Vercel 设置指南  🔨 </summary>

1. 前往 [vercel.com](https://vercel.com/)
2. 点击 `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
3. 点击 `Continue with GitHub` 通过 GitHub 进行登录
   ![](https://files.catbox.moe/btd78j.jpeg)
4. 登录 GitHub 并允许访问所有仓库
5. Fork 这个仓库
6. 返回到你的 [Vercel dashboard](https://vercel.com/dashboard)
7. 选择 `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
8. 选择 `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
9. 选择 root 并将所有内容保持不变，并且只需添加名为 PAT_1 的环境变量（如图所示），其中将包含一个个人访问令牌（PAT），你可以在[这里](https://github.com/settings/tokens/new)轻松创建（保留默认，只需要命名一下，名字随意）
   ![](https://files.catbox.moe/0ez4g7.png)
10. 点击 deploy，这就完成了，查看你的域名就可使用 API 了！

</details>

## :sparkling_heart: 支持这个项目

我尽己所能地进行开源，并且我尽量回复每个在使用项目时需要帮助的人。很明显，这需要时间，但你可以免费享受这些。

然而, 如果你正在使用这个项目并感觉良好，或只是想要支持我继续开发，你可以通过如下方式：

- 在你的 readme 中使用 github-readme-stats 时，链接指向这里 :D
- Star 并 分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款. 我多半会买一杯 ~~咖啡~~ 茶. :tea:

谢谢！ :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

欢迎贡献！ <3

用 :heart: 发电，用 JavaScript 制作。
