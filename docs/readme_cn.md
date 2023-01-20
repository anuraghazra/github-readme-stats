<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在你的 README 中获取动态生成的 GitHub 统计信息！</p>
</p>
  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/anuraghazra/github-readme-stats" />
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
    <a href="https://github.com/anuraghazra/github-readme-stats/discussions">讨论问题</a>
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

<p align="center">喜欢这个项目？请考虑 <a href="https://www.paypal.me/anuraghazra">捐赠</a> 来帮助它完善！</p>

<a href="https://indiafightscorona.giveindia.org">
  <img src="https://indiaspora.org/wp-content/uploads/2021/04/give-India-logo.png" alt="Give india logo" width="200" />
</a>

你正在考虑通过捐赠来支持这个项目吗？请不要这么做！！

相反，请帮助印度抗击第二次致命的 COVID-19 浪潮。
有上千人因为缺乏氧气以及 COVID 相关设施致死。

访问 <https://indiafightscorona.giveindia.org> 并进行一个小小的赞助来
帮助我们抗击 COVID 并克服这场危机。千里送鹅毛，礼轻情意重。:heart:

</p>

# 特性

- [GitHub 统计卡片](#github-统计卡片)
- [GitHub 更多置顶](#github-更多置顶)
- [热门语言卡片](#热门语言卡片)
- [Wakatime 周统计](#wakatime-周统计)
- [主题](#主题)
  - [响应式卡片主题](#响应式卡片主题)
- [个性化](#个性化)
  - [通用选项](#通用选项)
  - [统计卡片专有选项](#统计卡片专有选项)
  - [仓库卡片专有选项](#仓库卡片专有选项)
  - [语言卡片专有选项](#语言卡片专有选项)
  - [Wakatime 卡片专有选项](#wakatime-卡片专有选项)
- [私有化部署](#私有化部署)
  - [保证你的 Fork 是最新版本](#保证你的-fork-是最新版本)

# GitHub 统计卡片

将这行代码复制到你的 markdown 文件中，就是如此简单！

更改 `?username=` 的值为你的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

> **注意**
> 可用的排名有 S+ (前 1%), S (前 25%), A++ (前 45%), A+ (前 60%), and B+ (所有人).
此值通过使用 [累积分布函数](https://en.wikipedia.org/wiki/Cumulative_distribution_function) 计算 commit 数, 贡献数, issue 数, star 数, pull requests 数, 关注者数量和拥有的仓库数得出. 实现可见 [src/calculateRank.js](../src/calculateRank.js).

### 隐藏指定统计

你可以通过查询参数 `&hide=` 隐藏指定统计数据，其值用 `,` 分隔.

> 选项: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 将私有项目贡献添加到总提交计数中

你可以通过查询参数 `?count_private=true` 将所有的私有贡献添加到总提交计数中。

> **注意**
> 如果你使用私有化部署，则私有贡献将被默认统计. 如果你使用我们公开的 Vercel 实例，你需要 [公开你的私有贡献](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/showing-your-private-contributions-and-achievements-on-your-profile).

> 选项: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 显示图标

要想显示图标，使用 `show_icons=true` 作为查询参数，就像这样:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主题

你可以通过内置主题进行卡片个性化，省去 [手动个性化](#个性化) 的麻烦。

通过调用 `&theme=THEME_NAME` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有内置主题

GitHub readme 统计支持多种内置主题 (例如 `dark`, `radical`, `merko`, `gruvbox`, `tokyonight`, `onedark`, `cobalt`, `synthwave`, `highcontrast`, `dracula`).

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stats Themes" width="600px"/>

你可以预览 [所有可用主题](../themes/README.md) 或者签出 [主题配置文件](../themes/index.js) 并且 如果你喜欢，**你也可以贡献新的主题** :D

#### 响应式卡片主题

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

由于 GitHub 重新上传卡片并从他们的 [CDN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls) 提供服务, 我们无法推断服务器端的浏览器/GitHub 主题。 但是，您可以使用以下四种方法在客户端创建动态主题。

##### 使用透明主题

我们包含一个拥有透明背景的 `transparent` 主题。该主题经过优化，在 GitHub 的深色和浅色默认主题上看起来不错。你可以像这样通过使用 `&theme=transparent` 参数来启用此主题：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)
```

<details>
<summary>:eyes: 显示示例</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)

</details>

##### 添加透明 Alpha 通道到一个主题的 bg_color

你可以使用 `bg_color` 参数来令任意 [可用主题](../themes/README.md) 透明. 这是通过将 `bg_color` 设置为具有透明 alpha 通道的颜色（即 `bg_color=00000000`）来完成的：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)
```

<details>
<summary>:eyes: 显示示例</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)

</details>

##### 使用 GitHub 的主题上下文标签

你可以使用 [GitHub 的主题上下文](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/) 标签自动根据用户的 GitHub 主题切换主题. 这是通过将 `#gh-dark-mode-only` 或 `#gh-light-mode-only` 附加到图像 URL 的末尾来完成的。此标签将定义 Markdown 中的指定图片是否仅用于向使用浅色或深色 GitHub 主题的观看者展示。

```md
[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)
```

<details>
<summary>:eyes: 显示示例</summary>

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

</details>

##### 使用 GitHub 新的媒体特性

你可以在 HTML 中使用 [GitHub 新的媒体特性](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/) 来指定是否为浅色或深色 GitHub 主题展示图片。这是使用 HTML `<picture>` 元素结合 `prefers-color-scheme` 媒体特性完成的。
  
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

### 个性化

你可以通过使用 URL 参数的方式，为你的 `Stats Card` 或 `Repo Card` 自定义样式。

#### 通用选项

- `title_color` - 卡片标题颜色 _（十六进制色码）_. 默认值： `2f80ed`.
- `text_color` - 内容文本颜色 _（十六进制色码）_. 默认值： `434d58`.
- `icon_color` - 图标颜色（如果有） _（十六进制色码）_. 默认值： `4c71f2`.
- `border_color` - 卡片边框颜色 _（十六进制色码）_. 默认值： `e4e2e2` (当 `hide_border` 启用时不会被应用).
- `bg_color` - 卡片背景颜色 _（十六进制色码）_ **或者** 一个 _angle,start,end_ 形式的渐变. 默认值： `fffefe`
- `hide_border` - 隐藏卡的边框 _(布尔值)_. 默认值： `false`
- `theme` - 主题名称, 从[所有可用主题](../themes/README.md)中选择。默认值： `default` 主题.
- `cache_seconds` - 手动设置缓存头 _（最小值: 1800，最大值: 86400）_ 默认值： `14400 秒 (4 小时)`.
- `locale` - 在卡片中设置语言 _(e.g. cn, de, es, etc.)_. 默认值： `en`.
- `border_radius` - 卡片圆角半径. 默认值： `4.5`.

> **警告**
> 我们使用缓存来减少服务器上的负载（参见 <https://github.com/anuraghazra/github-readme-stats/issues/1471#issuecomment-1271551425>）。 我们的卡片有 4 小时（14400 秒）的默认缓存。 另请注意，缓存被限制为最短 4 小时和最长 24 小时。

##### 在 bg_color 中使用渐变

你可以在 bg_color 选项中提供多个逗号分隔的值来呈现渐变，渐变的格式是 :

    &bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10

#### 统计卡片专有选项

- `hide` - 从统计结果中隐藏 [特定统计信息](#隐藏指定统计) _(以逗号分隔的一个或多个值)_. 默认值： `[] (空数组)`.
- `hide_title` - _(布尔值)_. 默认值： `false`.
- `card_width` - 手动设置卡片的宽度 _(数字)_. 默认值： `500px  (approx.)`.
- `hide_rank` - _(布尔值)_ 隐藏排名并自动重新调整卡片宽度. 默认值： `false`.
- `show_icons` - _(布尔值)_. 默认值： `false`.
- `include_all_commits` - 统计总提交次数而不是仅统计今年的提交次数 _(布尔值)_. 默认值： `false`.
- `count_private` - 统计私人提交 _(布尔值)_. 默认值： `false`.
- `line_height` - 设置文本之间的行高 _(数字)_. 默认值： `25`.
- `exclude_repo` - 从指定仓库中排除 star 数 _(以逗号分隔的一个或多个值)_. 默认值： `[] (空数组)`.
- `custom_title` - 为卡片设置自定义标题. 默认值：  `<username> GitHub Stats`.
- `text_bold` - 使用粗体 _(布尔值)_. 默认值： `true`.
- `disable_animations` - 关闭卡片的所有动画 _(布尔值)_. 默认值： `false`.
- `ring_color` - 排名环绕条的颜色 _（十六进制色码）_. 默认值是主题环绕条颜色，如果不存在，则为标题颜色.

> **注意**
> 当 hide_rank=`true`, 卡片最小宽度为 270 像素 + 标题的长度和填充.

#### 仓库卡片专有选项

- `show_owner` - 显示 Repo 的所有者名字 _(布尔值)_. 默认值： `false`.

#### 语言卡片专有选项

- `hide` - 从卡片中隐藏指定语言 _(以逗号分隔的一个或多个值)_. 默认值： `[] (空数组)`.
- `hide_title` - _(布尔值)_. 默认值： `false`.
- `layout` - 在两个可用布局 `default` & `compact` 间切换. 默认值： `default`.
- `card_width` - 手动设置卡片的宽度 _(数字)_. 默认值为 `300`.
- `langs_count` - 在卡片上展示指定语言数，可选值 1-10 _(数字)_. 默认值为 `5`.
- `exclude_repo` - 排除指定仓库 _(以逗号分隔的一个或多个值)_. 默认值： `[] (空数组)`.
- `custom_title` - 为卡片设置自定义标签 _(string)_. 默认值为 `Most Used Languages`.
- `disable_animations` - 关闭卡片上的所有动画 _(布尔值)_. 默认值： `false`.

> **警告**
> 语言名称应经过 URI 转义, 如 [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding) 所述。
> (例如: `c++` 应该是 `c%2B%2B`, `jupyter notebook` 应该是 `jupyter%20notebook` 等) 你可以使用
> [urlencoder.org](https://www.urlencoder.org/) 来帮助你自助转换.

#### Wakatime 卡片专有选项

- `hide` - 从卡片上隐藏指定语言 _(以逗号分隔的一个或多个值)_. 默认值： `[] (空数组)`.
- `hide_title` - _(布尔值)_. 默认值为 `false`.
- `line_height` - 设置行高 _(数字)_. 默认值为 `25`.
- `hide_progress` - 隐藏进度条和百分比 _(布尔值)_. 默认值为 `false`.
- `custom_title` - 为卡片设置自定义标题 _(string)_. 默认值为 `Wakatime Stats`.
- `layout` - 在两个可用布局 `default` & `compact` 间切换.  默认值为 `default`.
- `langs_count` - 限制卡片上的语言数，默认是所有报告的语言. _(数字)_.
- `api_domain` - 为卡片设置自定义 API 域名, 例如使用 [Hakatime](https://github.com/mujx/hakatime) 或者 [Wakapi](https://github.com/muety/wakapi) 的服务 _(string)_. 默认值为 `Waka API`.
- `range` – 请求与您的 WakaTime 默认值不同的范围，例如 `last_7_days`. 见 [WakaTime API docs](https://wakatime.com/developers#stats) 获得一个可用选项的详细列表. _(YYYY-MM, last_7_days, last_30_days, last_6_months, last_year, 或是 all_time)_. 默认值为 `all_time`.

* * *

# GitHub 更多置顶

GitHub 更多置顶 允许你在使用 GitHub readme profile 时，在个人资料中置顶多于 6 个 repo 。

是的！你不再受限于置顶最多 6 个存储库了。

### 用法

复制粘贴这段代码到你的 README 文件中，并更改链接。

端点: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### 示例

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#个性化) 变量将 Repo 所有者的用户名包含在内。

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 热门语言卡片

热门语言卡片显示了 GitHub 用户常用的编程语言。

> **注意**
> 注意：热门语言并不表示我的技能水平或类似的水平，它是用来衡量用户在 github 上拥有最多代码的语言的一项指标，它是 github-readme-stats 的新特性

### 用法

将此代码复制粘贴到您的 `README.md` 文件中，并修改链接。

端点: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 排除个别仓库

可以使用 `&exclude_repo=repo1,repo2` 来隐藏个别仓库。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏个别语言

可以使用 `?hide=language1,language2` 参数来隐藏指定的语言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 显示更多语言

你可以试用 `&langs_count=` 选项来增加或减少显示在卡片上的语言个数。1-10（含）均为可用值，默认值为 5.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 紧凑的语言卡片布局

你可以使用 `&layout=compact` 参数来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### 示例

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime 周统计

将 `?username=` 更改为你的 [Wakatime](https://wakatime.com) 用户名.

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

> **Note**:
> 请注意，我们目前仅显示来自公开 Wakatime 档案的数据。

### 示例

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

* * *

### 全部示例

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

从 [默认主题](#主题) 中任选其一

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 渐变

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 自定义统计卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 设置语言本地化

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- 自定义 repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 热门语言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- WakaTime 卡片

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

* * *

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

## 私有化部署

#### [查看由 @codeSTACKr 上传的视频教程](https://youtu.be/n6d4KHSKqGk?t=107)

> **Warning**
> 如果你正在使用 [hobby (i.e. free)](https://vercel.com/pricing) Vercel 计划, 请确保你已经在 [vercel.json](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json) 文件更改了 `maxDuration` 参数从 `30` 至 `10` (详见 [#1416](https://github.com/anuraghazra/github-readme-stats/issues/1416#issuecomment-950275476)).

因为 GitHub 的 API 每个小时只允许 5 千次请求，我的 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制。如果你将其托管在自己的 Vercel 服务器上，那么你就不必为此担心。点击 deploy 按钮来开始你的部署！

> **注意**
> Since 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我们应该能够处理超过 5 千次的请求，并且不会出现宕机问题 :grin:.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b>:hammer_and_wrench: 手把手叫你设置自己的 Vercel 实例</b></summary>

1. 前往 [vercel.com](https://vercel.com/).
2. 点击 `Log in`.
    ![](https://files.catbox.moe/pcxk33.png)
3. 点击 `Continue with GitHub` 通过 GitHub 进行登录.
    ![](https://files.catbox.moe/b9oxey.png)
4. 登录 GitHub 并允许访问所有存储库（如果系统这样提示）.
5. Fork 这个仓库.
6. fork 此仓库后，打开 [`vercel.json`](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json#L5) 文件然后将 `maxDuration` 字段设置为 `10`.
7. 返回你的 [Vercel 仪表盘](https://vercel.com/dashboard).
8. 要导入项目，请点击 `Add New...` 按钮然后选择 `Project` 选项.
    ![](https://files.catbox.moe/3n76fh.png)
9. 点击 `Continue with GitHub` 按钮, 选择所需要的 GitHub 仓库然后点击 `Import` 按钮以导入. 或者, 你可以通过点击页面底部的 `Import Third-Party Git Repository ->` 链接来导入第三方.
    ![](https://files.catbox.moe/mg5p04.png)
10. [在这里](https://github.com/settings/tokens/new) 创建一个个人访问令牌（PAT）然后开启 `repo` 权限 (这将允许访问私有仓库数据).
11. 添加你的作为一个名为 `PAT_1` 的环境变量 (如下).
    ![](https://files.catbox.moe/0yclio.png)
12. 点击 deploy，这就完成了，查看你的域名就可使用 API 了！

</details>

### 保证你的-Fork-是最新版本

您可以使用 GitHubs 的 [Sync Fork 按钮](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) 使您的 Fork 和私有 Vercel 实例与上游保持同步。 您还可以使用 [@wei](https://github.com/wei) 创建的 [pull](https://github.com/wei/pull) 包来自动执行此过程。

## :sparkling_heart: 支持此项目

我尽己所能地进行开源，并且我尽量回复每个在使用项目时需要帮助的人。很明显，这需要时间，但你可以免费享受这些。

然而, 如果你正在使用这个项目并感觉良好，或只是想要支持我继续开发，你可以通过如下方式：

- 在你的 readme 中使用 github-readme-stats 时，链接指向这里 :D
- Star 并 分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款. 我多半会买一杯 ~~咖啡~~ 茶. :tea:

谢谢！ :heart:

* * *

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

欢迎贡献！ <3

用 :heart: 发电，用 JavaScript 制作。
