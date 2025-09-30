<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在您的 README 上获取动态生成的 GitHub 统计数据！</p>
</p>

<p align="center">
  <a href="https://github.com/anuraghazra/github-readme-stats/actions">
    <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
  </a>
  <a href="https://github.com/anuraghazra/github-readme-stats/graphs/contributors">
    <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/anuraghazra/github-readme-stats" />
  </a>
  <a href="https://codecov.io/gh/anuraghazra/github-readme-stats">
    <img alt="Tests Coverage" src="https://codecov.io/gh/anuraghazra/github-readme-stats/branch/master/graph/badge.svg" />
  </a>
  <a href="https://github.com/anuraghazra/github-readme-stats/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/anuraghazra/github-readme-stats?color=0088ff" />
  </a>
  <a href="https://github.com/anuraghazra/github-readme-stats/pulls">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/anuraghazra/github-readme-stats?color=0088ff" />
  </a>
  <a href="https://securityscorecards.dev/viewer/?uri=github.com/anuraghazra/github-readme-stats">
    <img alt="OpenSSF Scorecard" src="https://api.securityscorecards.dev/projects/github.com/anuraghazra/github-readme-stats/badge" />
  </a>
  <br />
  <br />
  <a href="https://vercel.com?utm\_source=github\_readme\_stats\_team\&utm\_campaign=oss">
    <img src="./powered-by-vercel.svg"/>
  </a>
</p>

<p align="center">
  <a href="#all-demos">查看演示</a>
  ·
  <a href="https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml">报告错误</a>
  ·
  <a href="https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml">请求功能</a>
  ·
  <a href="https://github.com/anuraghazra/github-readme-stats/discussions/1770">常见问题</a>
  ·
  <a href="https://github.com/anuraghazra/github-readme-stats/discussions/new?category=q-a">提问</a>
</p>


<p align="center">喜欢这个项目？请考虑<a href="https://www.paypal.me/anuraghazra">捐赠</a>来帮助它改进！</p>

<details>
<summary>目录 (点击展开)</summary>

- [GitHub 统计卡片](#github-统计卡片)
    - [隐藏个别统计数据](#隐藏个别统计数据)
    - [显示额外的个别统计数据](#显示额外的个别统计数据)
    - [显示图标](#显示图标)
    - [显示指定年份的提交次数](#显示指定年份的提交次数)
    - [主题](#主题)
    - [自定义](#自定义)
- [GitHub 额外固定](#github-额外固定)
    - [使用方法](#使用方法)
    - [选项](#选项)
    - [演示](#演示)
- [GitHub Gist 固定](#github-gist-固定)
    - [使用方法](#使用方法-1)
    - [选项](#选项-1)
    - [演示](#演示-1)
- [热门语言卡片](#热门语言卡片)
    - [使用方法](#使用方法-2)
    - [选项](#选项-2)
    - [语言统计算法](#语言统计算法)
    - [排除个别仓库](#排除个别仓库)
    - [隐藏个别语言](#隐藏个别语言)
    - [显示更多语言](#显示更多语言)
    - [紧凑语言卡片布局](#紧凑语言卡片布局)
    - [环形图语言卡片布局](#环形图语言卡片布局)
    - [垂直环形图语言卡片布局](#垂直环形图语言卡片布局)
    - [饼图语言卡片布局](#饼图语言卡片布局)
    - [隐藏进度条](#隐藏进度条)
    - [更改语言统计的格式](#更改语言统计的格式)
    - [演示](#演示-2)
- [WakaTime 统计卡片](#wakatime-统计卡片)
    - [选项](#选项-3)
    - [演示](#演示-3)
- [所有演示](#所有演示)
  - [快速提示（对齐卡片）](#快速提示对齐卡片)
    - [统计和热门语言卡片](#统计和热门语言卡片)
    - [固定仓库](#固定仓库)
- [自行部署](#自行部署)
  - [第一步：获取个人访问令牌 (PAT)](#第一步获取个人访问令牌-pat)
    - [经典令牌](#经典令牌)
    - [细粒度令牌](#细粒度令牌)
  - [在 Vercel 上](#在-vercel-上)
    - [:film\_projector: 查看 @codeSTACKr 的逐步视频教程](#film_projector-查看-codestackr-的逐步视频教程)
  - [在其他平台上](#在其他平台上)
  - [可用的环境变量](#可用的环境变量)
  - [保持您的Fork更新](#保持您的fork更新)
- [:sparkling\_heart: 支持项目](#sparkling_heart-支持项目)
</details>

# 重要通知 <!-- omit in toc -->

> [!IMPORTANT]\
> 由于 GitHub API 每个用户账户每小时仅[允许 5000 个请求](https://docs.github.com/en/graphql/overview/resource-limitations)，托管在 `https://github-readme-stats.vercel.app/api` 上的公共 Vercel 实例可能会达到速率限制（参见 [#1471](https://github.com/anuraghazra/github-readme-stats/issues/1471)）。我们使用缓存来防止这种情况发生（参见 https://github.com/anuraghazra/github-readme-stats#common-options）。您可以通过部署[您自己的 Vercel 实例](#disable-rate-limit-protections)来关闭这些速率限制保护。

<img alt="Uptime Badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgithub-readme-stats-git-monitoring-github-readme-stats-team.vercel.app%2Fapi%2Fstatus%2Fup%3Ftype%3Dshields">

> [!IMPORTANT]\
> 我们是一个小团队，为了确定优先级，我们依赖点赞 :+1:。我们使用热门问题仪表板来跟踪社区需求（参见 [#1935](https://github.com/anuraghazra/github-readme-stats/issues/1935)）。请不要犹豫为您感兴趣的问题和拉取请求点赞。我们将优先处理获得最多点赞的项目。

# GitHub 统计卡片

将以下代码复制粘贴到您的 Markdown 中即可。很简单！

将 `?username=` 的值更改为您的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

> [!WARNING]\
> 默认情况下，统计卡片仅显示来自公共仓库的统计数据，如星标、提交和拉取请求。要在统计卡片上显示私人统计数据，您应该使用您自己的 GitHub API 令牌[部署您自己的实例](#deploy-on-your-own)。

> [!NOTE]\
> 可用的等级有 S（前 1%）、A+（12.5%）、A（25%）、A-（37.5%）、B+（50%）、B（62.5%）、B-（75%）、C+（87.5%）和 C（所有人）。此排名方案基于[日本学术评分](https://wikipedia.org/wiki/Academic_grading_in_Japan)系统。全球百分位数是根据每个统计数据（提交次数、拉取请求、审查、问题、星标和关注者）的百分位数计算的加权总和，基于[指数](https://wikipedia.org/wiki/exponential_distribution)和[对数正态](https://wikipedia.org/wiki/Log-normal_distribution)分布的累积分布函数。实现可以在 [src/calculateRank.js](https://github.com/anuraghazra/github-readme-stats/blob/master/src/calculateRank.js) 中查看。等级周围的圆圈显示 100 减去全球百分位数。

### 隐藏个别统计数据

您可以传递查询参数 `&hide=` 来隐藏任何特定的统计数据，用逗号分隔。

> 选项：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 显示额外的个别统计数据

您可以传递查询参数 `&show=` 来显示任何特定的额外统计数据，用逗号分隔。

> 选项：`&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage)
```

### 显示图标

要启用图标，您可以在查询参数中传递 `&show_icons=true`，如下所示：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 显示指定年份的提交次数

您可以通过传递 `&commits_year=YYYY` 参数来指定年份并仅获取该年份的提交。

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&commits_year=2020)
```

### 主题

使用内置主题，您可以自定义卡片的外观，而无需进行任何[手动自定义](#customization)。

使用 `&theme=THEME_NAME` 参数，如下所示：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有内置主题

GitHub Readme Stats 带有几个内置主题（例如 `dark`、`radical`、`merko`、`gruvbox`、`tokyonight`、`onedark`、`cobalt`、`synthwave`、`highcontrast`、`dracula`）。

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stats Themes" width="600px"/>

您可以查看[所有可用主题](themes/README.md)的预览或查看[主题配置文件](themes/index.js)。请注意，我们暂停了新主题的添加以减少维护工作；所有与新主题相关的拉取请求将被关闭。

#### 响应式卡片主题

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#responsive-card-theme#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#responsive-card-theme#gh-light-mode-only)

由于 GitHub 会重新上传卡片并通过其[CDN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls)提供服务，我们无法在服务器端推断浏览器/GitHub 主题。但是，有四种方法可以在客户端创建动态主题。

##### 使用透明主题

我们包含了一个具有透明背景的 `transparent` 主题。此主题经过优化，可在 GitHub 的深色和浅色默认主题上看起来很好。您可以使用 `&theme=transparent` 参数启用此主题，如下所示：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)
```

<details>
<summary>:eyes: 显示示例</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=transparent)

</details>

##### 为主题添加透明 alpha 通道

您可以使用 `bg_color` 参数使任何[可用主题](themes/README.md)透明。这是通过将 `bg_color` 设置为具有透明 alpha 通道的颜色来完成的（即 `bg_color=00000000`）：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)
```

<details>
<summary>:eyes: 显示示例</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&bg_color=00000000)

</details>

##### 使用 GitHub 的主题上下文标签

您可以使用 [GitHub 的主题上下文](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/)标签根据用户 GitHub 主题自动切换主题。这是通过在图像 URL 末尾附加 `#gh-dark-mode-only` 或 `#gh-light-mode-only` 来完成的。此标签将定义 Markdown 中指定的图像是否仅对使用浅色或深色 GitHub 主题的查看者显示：

```md
[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)
```

<details>
<summary>:eyes: 显示示例</summary>

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

</details>

##### 使用 GitHub 的新媒体功能

您可以使用 [GitHub 的新媒体功能](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/)在 HTML 中指定是否为浅色或深色主题显示图像。这是通过使用 HTML `<picture>` 元素结合 `prefers-color-scheme` 媒体功能来完成的。

```html
<picture>
  <source
    srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true" />
</picture>
```

<details>
<summary>:eyes: 显示示例</summary>

<picture>
  <source
    srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark"
    media="(prefers-color-scheme: dark)"
  />
  <source
    srcset="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img src="https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true" />
</picture>

</details>

### 自定义

您可以使用 URL 参数随心所欲地自定义所有卡片的外观。

#### 通用选项

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title_color` | 卡片标题颜色。 | 字符串（十六进制颜色） | `2f80ed` |
| `text_color` | 正文文本颜色。 | 字符串（十六进制颜色） | `434d58` |
| `icon_color` | 图标颜色（如果可用）。 | 字符串（十六进制颜色） | `4c71f2` |
| `border_color` | 卡片边框颜色。启用 `hide_border` 时不适用。 | 字符串（十六进制颜色） | `e4e2e2` |
| `bg_color` | 卡片背景颜色。 | 字符串（十六进制颜色或*角度,开始,结束*形式的渐变） | `fffefe` |
| `hide_border` | 隐藏卡片边框。 | 布尔值 | `false` |
| `theme` | 主题名称，从[所有可用主题](themes/README.md)中选择。 | 枚举 | `default` |
| `cache_seconds` | 手动设置缓存头（最小：21600，最大：86400）。 | 整数 | `21600` |
| `locale` | 设置卡片中的语言，您可以在[此处](#available-locales)查看可用语言环境的完整列表。 | 枚举 | `en` |
| `border_radius` | 卡片上的圆角。 | 数字 | `4.5` |

> [!WARNING]\
> 我们使用缓存来减少服务器负载（参见 <https://github.com/anuraghazra/github-readme-stats/issues/1471#issuecomment-1271551425>）。我们的卡片有以下默认缓存小时数：统计卡片 - 24 小时，热门语言卡片 - 144 小时（6 天），固定卡片 - 240 小时（10 天），Gist 卡片 - 48 小时（2 天）。如果您希望统计卡片上的数据更频繁更新，您可以[部署您自己的实例](#deploy-on-your-own)并设置[环境变量](#disable-rate-limit-protections) `CACHE_SECONDS` 为您选择的值。

##### bg_color 中的渐变

您可以在 bg_color 选项中提供多个逗号分隔的值，以以下格式渲染渐变：

    &bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10

##### 可用的语言环境

以下是所有可用语言环境的列表：

<table>
<tr><td>

| 代码 | 语言环境 |
| --- | --- |
| `ar` | 阿拉伯语 |
| `az` | 阿塞拜疆语 |
| `bn` | 孟加拉语 |
| `my` | 缅甸语 |
| `ca` | 加泰罗尼亚语 |
| `cn` | 中文 |
| `zh-tw` | 中文（台湾） |
| `cs` | 捷克语 |
| `nl` | 荷兰语 |
| `en` | 英语 |
| `fi` | 芬兰语 |
| `fr` | 法语 |
| `de` | 德语 |

</td><td>

| 代码 | 语言环境 |
| --- | --- |
| `el` | 希腊语 |
| `hi` | 印地语 |
| `hu` | 匈牙利语 |
| `id` | 印度尼西亚语 |
| `it` | 意大利语 |
| `ja` | 日语 |
| `kr` | 韩语 |
| `ml` | 马拉雅拉姆语 |
| `np` | 尼泊尔语 |
| `no` | 挪威语 |
| `fa` | 波斯语（波斯语） |
| `pl` | 波兰语 |
| `pt-br` | 葡萄牙语（巴西） |

</td><td>

| 代码 | 语言环境 |
| --- | --- |
| `pt-pt` | 葡萄牙语（葡萄牙） |
| `ro` | 罗马尼亚语 |
| `ru` | 俄语 |
| `sr` | 塞尔维亚语（西里尔文） |
| `sr-latn` | 塞尔维亚语（拉丁文） |
| `sk` | 斯洛伐克语 |
| `es` | 西班牙语 |
| `se` | 瑞典语 |
| `th` | 泰语 |
| `tr` | 土耳其语 |
| `uk-ua` | 乌克兰语 |
| `uz` | 乌兹别克语 |
| `vi` | 越南语 |

</td></tr>
</table>

如果我们不支持您的语言，请考虑贡献！您可以在我们的[贡献指南](CONTRIBUTING.md#translations-contribution)中找到有关如何操作的更多信息。

#### 统计卡片专属选项

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `hide` | 从统计中隐藏[指定项目](#hiding-individual-stats)。 | 字符串（逗号分隔的值） | `null` |
| `hide_title` | 隐藏统计卡片的标题。 | 布尔值 | `false` |
| `card_width` | 手动设置卡片宽度。 | 数字 | `500px  (大约)` |
| `hide_rank` | 隐藏等级并自动调整卡片宽度。 | 布尔值 | `false` |
| `rank_icon` | 显示替代等级图标（即 `github`、`percentile` 或 `default`）。 | 枚举 | `default` |
| `show_icons` | 在所有统计数据旁显示图标。 | 布尔值 | `false` |
| `include_all_commits` | 计算总提交数而不是仅当前年份的提交数。 | 布尔值 | `false` |
| `line_height` | 设置文本之间的行高。 | 整数 | `25` |
| `exclude_repo` | 排除指定仓库。 | 字符串（逗号分隔的值） | `null` |
| `custom_title` | 为卡片设置自定义标题。 | 字符串 | `<username> GitHub Stats` |
| `text_bold` | 使用粗体文本。 | 布尔值 | `true` |
| `disable_animations` | 禁用卡片中的所有动画。 | 布尔值 | `false` |
| `ring_color` | 等级圆圈的颜色。 | 字符串（十六进制颜色） | `2f80ed` |
| `number_format` | 在两种可用格式之间切换以显示卡片值 `short`（即 `6.6k`）和 `long`（即 `6626`）。 | 枚举 | `short` |
| `show` | 在统计卡片上显示[额外项目](#showing-additional-individual-stats)（即 `reviews`、`discussions_started`、`discussions_answered`、`prs_merged` 或 `prs_merged_percentage`）。 | 字符串（逗号分隔的值） | `null` |
| `commits_year` | 仅筛选和计算指定年份的提交。 | 整数 _(YYYY)_ | `<current year> (年初至今)` |

> [!NOTE]\
> 当 hide_rank=`true` 时，最小卡片宽度为 270 px + 标题长度和内边距。

***

# GitHub 额外固定

GitHub 额外固定允许您使用 GitHub readme 个人资料在个人资料中固定超过 6 个仓库。

太好了！您不再局限于 6 个固定的仓库。

### 使用方法

将此代码复制粘贴到您的 readme 中并更改链接。

端点：`api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### 选项

您可以使用下表中列出的[通用选项](#common-options)和专属选项来自定义固定仓库卡片的外观和行为。

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `show_owner` | 显示仓库所有者名称。 | 布尔值 | `false` |
| `description_lines_count` | 手动设置描述的行数。指定值将被限制在 1 到 3 之间。如果未指定此参数，行数将根据描述的实际长度自动调整。 | 数字 | `null` |

### 演示

![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra\&repo=github-readme-stats)

使用 `show_owner` 查询选项包含仓库所有者用户名

![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra\&repo=github-readme-stats\&show_owner=true)

# GitHub Gist 固定

GitHub gist 固定允许您使用 GitHub readme 个人资料在 GitHub 个人资料中固定 gist。

### 使用方法

将此代码复制粘贴到您的 readme 中并更改链接。

端点：`api/gist?id=bbfce31e0217a3689c8d961a356cb10d`

```md
[![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)](https://gist.github.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/)
```

### 选项

您可以使用下表中列出的[通用选项](#common-options)和专属选项来自定义 gist 卡片的外观和行为。

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `show_owner` | 显示 gist 所有者名称。 | 布尔值 | `false` |

### 演示

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)

使用 `show_owner` 查询选项包含 gist 所有者用户名

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d\&show_owner=true)

# 热门语言卡片

热门语言卡片显示 GitHub 用户最常使用的语言。

> [!WARNING]\
> 默认情况下，语言卡片仅显示来自公共仓库的语言结果。要包含私有仓库中使用的语言，您应该使用您自己的 GitHub API 令牌[部署您自己的实例](#deploy-on-your-own)。

> [!NOTE]\
> 热门语言不代表用户的技能水平或类似内容；这是 GitHub 用来确定 GitHub 上代码最多的语言的指标。这是 github-readme-stats 的新功能。

> [!WARNING]\
> 此卡片仅显示您自己非Fork仓库中的语言使用情况，而不依赖于提交的作者是谁。它不包括您对其他用户/组织仓库的贡献。目前无法从 GitHub API 获取此数据。如果您希望改进此行为，可以支持 [@rickstaa](https://github.com/rickstaa) 在 GitHub Community 中创建的[此功能请求](https://github.com/orgs/community/discussions/18230)。

> [!WARNING]\
> 目前此卡片仅显示前 100 个仓库的数据。这是因为 GitHub API 限制导致公共实例停机（参见 [#1471](https://github.com/anuraghazra/github-readme-stats/issues/1471)）。未来将通过发布 GitHub 操作或为用户自己的实例提供环境变量来改进此行为。

### 使用方法

将此代码复制粘贴到您的 readme 中并更改链接。

端点：`api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 选项

您可以使用下表中列出的[通用选项](#common-options)和专属选项来自定义热门语言卡片的外观和行为。

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `hide` | 从卡片中隐藏[指定语言](#hide-individual-languages)。 | 字符串（逗号分隔的值） | `null` |
| `hide_title` | 隐藏卡片标题。 | 布尔值 | `false` |
| `layout` | 在五种可用布局 `normal` & `compact` & `donut` & `donut-vertical` & `pie` 之间切换。 | 枚举 | `normal` |
| `card_width` | 手动设置卡片宽度。 | 数字 | `300` |
| `langs_count` | 在卡片上显示更多语言，范围为 1-20。 | 整数 | `normal` 和 `donut` 为 `5`，其他布局为 `6` |
| `exclude_repo` | 排除指定仓库。 | 字符串（逗号分隔的值） | `null` |
| `custom_title` | 为卡片设置自定义标题。 | 字符串 | `Most Used Languages` |
| `disable_animations` | 禁用卡片中的所有动画。 | 布尔值 | `false` |
| `hide_progress` | 使用紧凑布局选项，隐藏百分比并移除进度条。 | 布尔值 | `false` |
| `size_weight` | 配置语言统计算法（参见[语言统计算法](#language-stats-algorithm)）。 | 整数 | `1` |
| `count_weight` | 配置语言统计算法（参见[语言统计算法](#language-stats-algorithm)）。 | 整数 | `0` |
| `stats_format` | 在两种可用格式 `percentages` 和 `bytes` 之间切换语言统计。 | 枚举 | `percentages` |

> [!WARNING]\
> 语言名称应进行 URI 转义，如[百分比编码](https://en.wikipedia.org/wiki/Percent-encoding)中指定的那样
>（即：`c++` 应变为 `c%2B%2B`，`jupyter notebook` 应变为 `jupyter%20notebook`，等等）。您可以使用
> [urlencoder.org](https://www.urlencoder.org/) 来自动完成此操作。

### 语言统计算法

我们使用以下算法计算语言卡片上的语言百分比：

```js
ranking_index = (byte_count ^ size_weight) * (repo_count ^ count_weight)
```

默认情况下，仅使用字节数来确定语言卡片上显示的语言百分比（即 `size_weight=1` 和 `count_weight=0`）。但是，您可以使用 `&size_weight=` 和 `&count_weight=` 选项来加权语言使用量计算。值必须为正实数。[有关算法的更多详细信息可在此处找到](https://github.com/anuraghazra/github-readme-stats/issues/1600#issuecomment-1046056305)。

*   `&size_weight=1&count_weight=0` - *(默认)* 按字节数排序。
*   `&size_weight=0.5&count_weight=0.5` - *(推荐)* 使用字节和仓库计数进行排名
*   `&size_weight=0&count_weight=1` - 按仓库计数排序

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&size_weight=0.5&count_weight=0.5)
```

### 排除个别仓库

您可以使用 `&exclude_repo=repo1,repo2` 参数排除个别仓库。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)
```

### 隐藏个别语言

您可以使用 `&hide=language1,language2` 参数隐藏个别语言。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)
```

### 显示更多语言

您可以使用 `&langs_count=` 选项增加或减少卡片上显示的语言数量。有效值为 1 到 20 之间的整数（包括 1 和 20）。默认情况下，对于 `normal` 和 `donut` 布局设置为 `5`，对于其他布局设置为 `6`。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)
```

### 紧凑语言卡片布局

您可以使用 `&layout=compact` 选项更改卡片设计。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)
```

### 环形图语言卡片布局

您可以使用 `&layout=donut` 选项更改卡片设计。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=donut)](https://github.com/anuraghazra/github-readme-stats)
```

### 垂直环形图语言卡片布局

您可以使用 `&layout=donut-vertical` 选项更改卡片设计。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=donut-vertical)](https://github.com/anuraghazra/github-readme-stats)
```

### 饼图语言卡片布局

您可以使用 `&layout=pie` 选项更改卡片设计。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=pie)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏进度条

您可以使用 `&hide_progress=true` 选项隐藏百分比和进度条（布局将自动设置为 `compact`）。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide_progress=true)
```

### 更改语言统计的格式

您可以使用 `&stats_format=bytes` 选项以字节而不是百分比显示统计信息。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&stats_format=bytes)
```

### 演示

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)

*   紧凑布局

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=compact)

*   环形图布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=donut)](https://github.com/anuraghazra/github-readme-stats)

*   垂直环形图布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=donut-vertical)](https://github.com/anuraghazra/github-readme-stats)

*   饼图布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=pie)](https://github.com/anuraghazra/github-readme-stats)

*   隐藏进度条

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&hide_progress=true)

*   以字节而非百分比显示

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&stats_format=bytes)

# WakaTime 统计卡片

> [!WARNING]\
> 请注意，我们目前仅显示来自公开 WakaTime 个人资料的数据。因此，您必须确保**同时**启用`公开显示代码时间`和`公开显示语言、编辑器、操作系统、类别`。

将 `?username=` 的值更改为您的 [WakaTime](https://wakatime.com) 用户名。

```md
[![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs)](https://github.com/anuraghazra/github-readme-stats)
```

### 选项

您可以使用下表中列出的[通用选项](#common-options)和专属选项来自定义 WakaTime 统计卡片的外观和行为。

| 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `hide` | 从卡片中隐藏指定的语言。 | 字符串（逗号分隔的值） | `null` |
| `hide_title` | 隐藏卡片标题。 | 布尔值 | `false` |
| `line_height` | 设置文本之间的行高。 | 整数 | `25` |
| `hide_progress` | 隐藏进度条和百分比。 | 布尔值 | `false` |
| `custom_title` | 为卡片设置自定义标题。 | 字符串 | `WakaTime Stats` |
| `layout` | 在两种可用布局 `default` & `compact` 之间切换。 | 枚举 | `default` |
| `langs_count` | 限制卡片上的语言数量，默认为所有报告的语言。 | 整数 | `null` |
| `api_domain` | 为卡片设置自定义 API 域名，例如使用 [Hakatime](https://github.com/mujx/hakatime) 或 [Wakapi](https://github.com/muety/wakapi) 等服务 | 字符串 | `wakatime.com` |
| `display_format` | 设置 WakaTime 统计数据显示格式。选择 `time` 显示基于时间的统计信息或 `percent` 显示百分比。 | 枚举 | `time` |
| `disable_animations` | 禁用卡片中的所有动画。 | 布尔值 | `false` |

### 演示

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs)

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs\&hide_progress=true)

*   紧凑布局

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs\&layout=compact)

***

# 所有演示

*   默认

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

*   隐藏特定统计信息

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&hide=contribs,issues)

*   显示额外统计信息

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage)

*   显示图标

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&hide=issues\&show_icons=true)

*   显示 GitHub 徽标而非等级级别

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&rank_icon=github)

*   显示用户等级百分位而非等级级别

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&rank_icon=percentile)

*   自定义边框颜色

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&border_color=2e4058)

*   包含所有提交

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&include_all_commits=true)

*   主题

从任何[默认主题](#themes)中选择

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=radical)

*   渐变

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&bg_color=30,e96443,904e95\&title_color=fff\&text_color=fff)

*   自定义统计卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra\&show_icons=true\&title_color=fff\&icon_color=79ff97\&text_color=9f9f9f\&bg_color=151515)

*   设置卡片语言环境

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra\&locale=es)

*   自定义仓库卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra\&repo=github-readme-stats\&title_color=fff\&icon_color=f9f9f9\&text_color=9f9f9f\&bg_color=151515)

*   Gist 卡片

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)

*   自定义 gist 卡片

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d&theme=calm)

*   热门语言

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)

*   WakaTime 卡片

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs)

***

## 快速提示（对齐卡片）

默认情况下，GitHub 不会并排显示卡片。要实现这一点，您可以使用以下方法：

### 统计和热门语言卡片

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api?username=anuraghazra" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=anuraghazra&layout=compact&langs_count=8&card_width=320" />
</a>
```

<details>
<summary>:eyes: 显示示例</summary>

<a href="https://github.com/anuraghazra/github-readme-stats">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api?username=anuraghazra" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=anuraghazra&layout=compact&langs_count=8&card_width=320" />
</a>

</details>

### 固定仓库

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

<details>
<summary>:eyes: 显示示例</summary>

<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>

</details>

# 自行部署

## 第一步：获取个人访问令牌 (PAT)

如果您想在统计卡片上显示私人贡献，为您的令牌选择正确的范围很重要。

### 经典令牌

  - 转到 [账户 -> 设置 -> 开发者设置 -> 个人访问令牌 -> 令牌（经典）](https://github.com/settings/tokens)。
  - 点击 `生成新令牌 -> 生成新令牌（经典）`。
  - 要选择的范围：
    - repo
    - read:user
  - 点击 `生成令牌` 并复制它。

### 细粒度令牌

> [!WARNING]\
> 这将问题数量限制为仅您仓库中的问题数量，并且仅考虑公共提交。

  - 转到 [账户 -> 设置 -> 开发者设置 -> 个人访问令牌 -> 细粒度令牌](https://github.com/settings/tokens)。
  - 点击 `生成新令牌 -> 生成新令牌`。
  - 选择到期日期
  - 选择 `所有仓库`
  - 在 `仓库权限` 中要选择的范围：
    - 提交状态：只读
    - 内容：只读
    - 问题：只读
    - 元数据：只读
    - 拉取请求：只读
  - 点击 `生成令牌` 并复制它。

## 在 Vercel 上

### :film\_projector: [查看 @codeSTACKr 的逐步视频教程](https://youtu.be/n6d4KHSKqGk?t=107)

由于 GitHub API 每小时仅允许 5000 个请求，我的 `https://github-readme-stats.vercel.app/api` 可能会达到速率限制。如果您在自己的 Vercel 服务器上托管，则无需担心任何问题。点击部署按钮开始！

> [!NOTE]\
> 自 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 以来，我们应该能够处理超过 5000 个请求，并减少停机问题 :grin:。

> [!NOTE]\
> 如果您使用的是 [Pro（即付费）](https://vercel.com/pricing) Vercel 计划，当您的 Vercel 实例在卡片请求期间频繁超时时，可以在 [vercel.json](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json) 中增加 [maxDuration](https://vercel.com/docs/concepts/projects/project-configuration#value-definition) 值。建议您将此值保持在低于 `30` 秒，以防止高内存使用。

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b>:hammer_and_wrench: 设置您自己的 Vercel 实例的逐步指南</b></summary>

1.  转到 [vercel.com](https://vercel.com/)。
2.  点击 `登录`。
    ![](https://files.catbox.moe/pcxk33.png)
3.  通过按 `继续使用 GitHub` 使用 GitHub 登录。
    ![](https://files.catbox.moe/b9oxey.png)
4.  登录 GitHub 并在提示时允许访问所有仓库。
5.  Fork此仓库。
6.  返回到您的 [Vercel 仪表板](https://vercel.com/dashboard)。
7.  要导入项目，点击 `添加新...` 按钮并选择 `项目` 选项。
    ![](https://files.catbox.moe/3n76fh.png)
8.  点击 `继续使用 GitHub` 按钮，搜索所需的 Git 仓库并通过点击 `导入` 按钮导入它。或者，您可以使用页面底部的 `导入第三方 Git 仓库 ->` 链接导入第三方 Git 仓库。
    ![](https://files.catbox.moe/mg5p04.png)
9.  按照[上一节](#first-step-get-your-personal-access-token-pat)中的描述创建个人访问令牌 (PAT)。
10. 将 PAT 添加为名为 `PAT_1` 的环境变量（如图所示）。
    ![](https://files.catbox.moe/0yclio.png)
11. 点击部署，您就完成了。查看您的域名以使用 API！

</details>

## 在其他平台上

> [!WARNING]\
> 这种使用 GRS 的方式不受官方支持，并且是为了满足某些无法使用 Vercel 的特定用例而添加的（例如 [#2341](https://github.com/anuraghazra/github-readme-stats/discussions/2341)）。因此，对此方法的支持是有限的。

<details>
<summary><b>:hammer_and_wrench: 在其他平台上部署的逐步指南</b></summary>

1.  根据您的需要Fork或克隆此仓库
2.  将 `express` 添加到 `package.json` 的依赖项部分
    <https://github.com/anuraghazra/github-readme-stats/blob/ba7c2f8b55eac8452e479c8bd38b044d204d0424/package.json#L54-L61>
3.  如果需要，运行 `npm i`（初始设置）
4.  运行 `node express.js` 启动服务器，或者如果您在托管服务上部署，请在 `package.json` 中将入口点设置为 `express.js`
    <https://github.com/anuraghazra/github-readme-stats/blob/ba7c2f8b55eac8452e479c8bd38b044d204d0424/package.json#L11>
5.  您完成了 🎉
    </details>

## 可用的环境变量

GitHub Readme Stats 提供了几个环境变量，可用于自定义自托管实例的行为。这些包括：

*   `CACHE_SECONDS`：这优先于我们的缓存最小值和最大值，并且可以为自托管实例绕过这些值。
*   `WHITELIST`：允许访问您的实例的 GitHub 用户名的逗号分隔列表。如果未设置此变量，则允许所有用户名。
*   `GIST_WHITELIST`：允许在您的实例上访问的 GitHub gist ID 的逗号分隔列表。如果未设置此变量，则允许所有 gist ID。

请参阅 [Vercel 文档](https://vercel.com/docs/concepts/projects/environment-variables) 了解如何将这些环境变量添加到您的 Vercel 实例。

## 保持您的Fork更新

您可以使用 GitHub 的 [Sync Fork 按钮](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) 保持您的Fork，从而保持您的私有 Vercel 实例与上游同步。您还可以使用 [@wei](https://github.com/wei) 创建的 [pull](https://github.com/wei/pull) 包来自动执行此过程。

# :sparkling\_heart: 支持项目

我开源了几乎所有我能开源的东西，并尝试回复每个需要帮助使用这些项目的人。显然，
这需要时间。您可以免费使用此服务。

但是，如果您正在使用此项目并对它感到满意，或者只是想鼓励我继续创作，有几种方法可以做到：

*   在您的 readme 中使用 github-readme-stats 时给予适当的认可，并链接回它。 :D
*   给项目加星标和分享。 :rocket:
*   [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 您可以通过 PayPal 进行一次性捐赠。我可能会买一杯 ~~咖啡~~ 茶。 :tea:

谢谢！ :heart:

***

[![https://vercel.com?utm\_source=github\_readme\_stats\_team\&utm\_campaign=oss](powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team\&utm_campaign=oss)

欢迎贡献！ <3

用 :heart: 和 JavaScript 制作。