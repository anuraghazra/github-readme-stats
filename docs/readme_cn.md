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
    <a href="https://github.com/anuraghazra/github-readme-stats/discussions">问问题</a>
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

<p align="center">喜欢这个项目？请考虑<a href="https://www.paypal.me/anuraghazra">捐赠</a>来帮助它完善！</p>

<a href="https://indiafightscorona.giveindia.org">
  <img src="https://indiaspora.org/wp-content/uploads/2021/04/give-India-logo.png" alt="Give india logo" width="200" />
</a>

你还在考虑通过捐赠来支持这个项目吗？请不要这么做！！

作为代替，你可以帮助印度度过第二波新冠爆发的难关。
在印度，数千人正因缺乏氧气及新冠相关的基础设施而面临死亡的危机。

访问<https://indiafightscorona.giveindia.org>并捐一笔小钱来与我们共克时艰。千里送鹅毛，礼轻情意重。:heart:

</p>

# 特性

- [GitHub 统计卡片](#github-统计卡片)
- [GitHub 更多置顶](#github-更多置顶)
- [热门语言卡片](#热门语言卡片)
- [Wakatime 每周统计](#Wakatime-每周统计)
- [主题](#主题)
  - [响应式卡片主题](#响应式卡片主题)
- [自定义](#自定义)
- [自己部署](#自己部署)

# GitHub 统计卡片

只要将这行代码粘贴到你的 markdown 文档中就行了，够简单吧？

将 `?username=` 的值更改为你的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

> **Note**
> 可用的评分等级有：S+（前1%），S（前25%），A++（前45%），A+（前60%）和B+（所有人）。分数值使用[累积分布函数](https://en.wikipedia.org/wiki/Cumulative_distribution_function)计算，以commit数，贡献数，issue数，star数，pr数，follower数以及持有的repo数为参考。你可以在[src/calculateRank.js](./src/calculateRank.js)中检查该实现。

### 隐藏指定统计

想要隐藏指定统计信息，你可以调用参数 `?hide=`，多个值之间用逗号 `,` 分隔。

> 选项：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 将私人项目贡献添加到总提交计数中

你可以使用参数 `?count_private=true` 把私人贡献计数添加到总提交计数中。

> **Note**
> 如果你正在自行部署这个项目，那么私有贡献默认是计入总贡献数的。如果你使用的是公共项目，那么你需要[设置你的私有贡献为公开](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/showing-your-private-contributions-and-achievements-on-your-profile)。

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

你可以直接使用现有的主题来改变卡片的外观，省去[手动自定义](#自定义)的麻烦。

使用 `?theme=THEME_NAME` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有内置主题

GitHub 统计信息有几个内置主题 (例如：`dark`, `radical`, `merko`, `gruvbox`, `tokyonight`, `onedark`, `cobalt`, `synthwave`, `highcontrast`和`dracula`).

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

你可以在此预览[所有可用主题](../themes/README.md)或者检出[主题配置文件](../themes/index.js)。 如果你喜欢， **你也可以贡献新的主题** :D

#### 响应式卡片主题

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

由于GitHub会重新上传卡片并由他们的[CDN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls)提供服务，我们无法在服务器端推断出你的浏览器主题或是GitHub主题。但是，仍然有四种方法可以用于在客户端创建动态主题。

##### 使用透明主题

我们提供了一个有着透明背景的 `transparent` 主题。这个主题经过优化以便于在Github的默认浅色与深色主题下都能有不错的效果。你可以通过 `&theme=transparent` 来使用这个主题，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)
```

<details>
<summary>:eyes: 看看效果</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)

</details>

##### 为主题的背景颜色添加透明的alpha通道

你可以用参数 `bg_color` 来使任何 [可用的主题](./themes/README.md) 变得透明。这是通过将 `bg_color` 设置为一个带有透明alpha通道的颜色来实现的 (比如 `bg_color=00000000`)：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)
```

<details>
<summary>:eyes: 看看效果</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)

</details>

##### 使用Github主题环境标签

你可以使用 [GitHub的主题环境](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/) 标签来根据用户的Github主题自动切换卡片主题。这是通过在图像url的末尾加上 `#gh-dark-mode-only`（仅在深色模式显示） 或 `#gh-light-mode-only`（仅在浅色模式显示） 来实现的。这个标签将决定在 markdown 中的图片是否仅对使用浅色或深色GitHub主题的用户显示：

```md
[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)
```

<details>
<summary>:eyes: 看看效果</summary>

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

</details>

##### 使用Github的新推出的媒体特性

你可以在HTML中使用 [GitHub的新媒体特性](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/)  来指定是否仅对使用浅色或深色GitHub主题的用户显示图片。这是通过HTML的 `<picture>` 元素和 `prefers-color-scheme`（首选颜色主题） 媒体功能完成的
  
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
<summary>:eyes: 看看效果</summary>

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

你可以通过使用 URL 参数的方式，为你的 `Stats Card` 或 `Repo Card` 自定义样式。

#### 普通选项：

-   `title_color` - 卡片标题颜色 _（十六进制色码）_   默认值：`2f80ed`
-   `text_color` - 内容文本颜色 _（十六进制色码）_   默认值：`434d58`
-   `icon_color` - 图标颜色（如果可用） _（十六进制色码）_   默认值：`4c71f2`
-   `border_color` - 卡片边框颜色 _（十六进制色码）_   默认值：`e4e2e2` （在 `hide_border` 启用时不会生效）
-   `bg_color` - 卡片背景颜色 _（十六进制色码）_ **或** 以 _角度，起始颜色，结束颜色_ 为格式的渐变色   默认值：`fffefe`
-   `hide_border` - 是否隐藏卡片边框 _（布尔值）_   默认值：`false`
-   `theme` - 主题名称，从[所有可用主题](../themes/README.md)中选择   默认值：`default` 主题
-   `cache_seconds` - 手动设置缓存头 _（最小值: 14400, 最大值: 86400）_   默认值：`14400 秒 (4 小时)` 
-   `locale` - 在卡片中设置语言 _（如 cn, de, es 等）_   默认值：`en`
-   `border_radius` - 卡片的圆角弧度   默认值：`4.5`

> **Warning**
> 我们使用缓存来减小服务器的负担 (请看 https://github.com/anuraghazra/github-readme-stats/issues/1471#issuecomment-1271551425)。 我们的卡片默认具有4小时（或14400秒）的缓存时间。 另外请注意，缓存的时间最少为4小时，最多为24小时。

##### 背景颜色渐变

你可以在 bg_color 选项中提供多个逗号分隔的值来呈现渐变，渐变的格式是：

    &bg_color=角度,颜色1,颜色2,颜色3...颜色10

#### 统计卡片专属选项

-   `hide` - 从统计中隐藏 [特定统计信息](#隐藏指定统计)  _（以逗号分隔的值）_   默认值：`[] (空白数组)`
-   `hide_title` - 隐藏标题  _（布尔值）_   默认值：`false`
-   `card_width` - 手动设置卡片宽度 _（数字）_   默认值：`500px  (大约)`
-   `hide_rank` - _（布尔值）_ 隐藏评分等级并自动调整卡片大小   默认值：`false`
-   `show_icons` - 展示图标 _（布尔值）_   默认值：`false`
-   `include_all_commits` - 统计总提交次数，而不是仅统计今年的提交次数 _（布尔值）_   默认值：**`false`**
-   `count_private` - 是否统计私人提交 _（布尔值）_   默认值：`false`
-   `line_height` - 文本行间距 _（数字）_   默认值：`25`
-   `exclude_repo` - 排除指定的repo _（以逗号分隔的值）_   默认值：`[] (空白数组)`
-   `custom_title` -  为卡片设置一个自定义的标题   默认值：`<username> GitHub Stats`
-   `text_bold` - 使用粗体字 _（布尔值）_   默认值：`true`
-   `disable_animations` - 禁用所有卡片动画 _（布尔值）_   默认值：`false`
-   `ring_color` - 评分等级外面圆圈的颜色 _（十六进制色值）_   默认值：主题指定的圆圈颜色，若主题没有指定则为标题颜色

> **Note**
> 当 hide_rank 设置为`true`时, 卡片的最小宽度为 270 像素加上标题长度和填充物。

#### 仓库卡片专属选项

-   `show_owner` - Show the repo's owner name _(boolean)_. Default: `false`.

#### 语言卡片专属选项

-   `hide` - 从卡片中隐藏指定的语言 _（以逗号分隔的值）_   默认值：`[] (空白数组)`
-   `hide_title` - 隐藏标题 _（布尔值）_   默认值：`false`
-   `layout` - 在两种可用的布局 `default` 和 `compact` 之间切换   默认值：`default`
-   `card_width` - 手动设置卡片宽度 _（数字）_   默认值：`300`
-   `langs_count` - 卡片上展示的语言数量， 在1到10之间 _（数字）_   默认值：`5`
-   `exclude_repo` - 排除指定的repo _（以逗号分隔的值）_   默认值：`[] (空白数组)`
-   `custom_title` -  为卡片设置一个自定义的标题 _（字符串）_   默认值：`Most Used Languages`
-   `disable_animations` - 禁用所有卡片动画 _（布尔值）_   默认值：`false`
-   `hide_progress` - 使用紧凑的布局选项，隐藏百分比及进度条   默认值：`false`
-   
> **Warning**
> 语言名称应按照 [百分号编码](https://en.wikipedia.org/wiki/Percent-encoding) 的规定进行URI转义。
> (例如： `c++` 应该写作 `c%2B%2B`， `jupyter notebook` 应该写作 `jupyter%20notebook`) 你可以使用
> [urlencoder.org](https://www.urlencoder.org/) 帮助你自动完成这个工作。

#### Wakatime卡片专属选项

-   `hide` - 从卡片中隐藏指定的语言 _（以逗号分隔的值）_   默认值：`[] (空白数组)`.
-   `hide_title` - 隐藏标题 _（布尔值）_   默认值：`false`
-   `line_height` - 文本行间距 _（数字）_   默认值：`25`
-   `hide_progress` - 隐藏进度条和百分比 _（布尔值）_   默认值：`false`
-   `custom_title` -  为卡片设置一个自定义的标题 _（字符串）_   默认值：`Wakatime Stats`
-   `layout` - 在两种可用的布局 `default` 和 `compact` 之间切换   默认值：`default`
-   `langs_count` - 限制卡片上显示的语言数量，默认为所有报告的语言 _（数字）_
-   `api_domain` - 为卡片设置一个自定义API域名，例如  [Hakatime](https://github.com/mujx/hakatime) 或是 [Wakapi](https://github.com/muety/wakapi) _（字符串）_   默认值：`Waka API`
-   `range` – 请求一个与你的WakaTime默认值不同的范围，例如 `last_7_days`（最近7天）查看 [WakaTime API 文档](https://wakatime.com/developers#stats) 来获取可用选项的列表 _(YYYY-MM, last_7_days, last_30_days, last_6_months, last_year, or all_time)_   默认值：`all_time`

* * *

# GitHub 更多置顶

GitHub 更多置顶 允许你在使用 GitHub readme profile 时，在个人资料中置顶多于 6 个 repo 。

是的！你不再受限于置顶最多 6 个存储库了。

### 使用方法

复制粘这段代码到你的 README 文件中，并更改链接。

端点: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [显示仓库拥有者](#自定义) 变量将 Repo 所有者的用户名包含在内。

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 热门语言卡片

热门语言卡片显示了一个 GitHub 用户常用的编程语言。

> **Note**
> 热门语言并不表示我的技能水平或类似的东西，它是GitHub的一个指标，以确定哪些语言在GitHub上拥有最多的代码。这是 github-readme-stats 的新特性。

### 使用方法

将此代码复制并粘贴到您的 `README.md` 文件中，然后修改链接。

端点: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 排除指定repo

你可以使用 `&exclude_repo=repo1,repo2` 参数来排除指定的repo

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏指定语言

你可以使用 `?hide=language1,language2` 参数来隐藏指定的语言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 显示更多语言

你可以使用 `&langs_count=` 选项来增加或减少卡片上显示的语言的数量。 有效值是1到10（含）之间的整数，默认为5。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 紧凑的语言卡片布局

你可以使用 `&layout=compact` 参数来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏进度条

你可以使用 `&hide_progress=true` 选项来隐藏百分比和进度条（布局将自动设置为`compact`）。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

- 隐藏进度条

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime 每周统计

更改 `?username=` 的值为你的 [Wakatime](https://wakatime.com) 用户名。

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

> **Note**:
> 请注意，我们目前只显示Wakatime的公开数据。

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

* * *

### 全部 Demo

- 默认

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隐藏指定统计

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 显示图标

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 自定义边框颜色

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

- 包含全部commit

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

- 自定义 repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 热门语言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- WakaTime 卡片

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

* * *

### 快速提示 (对齐 Repo 卡片)

默认情况下，GitHub 并不会并排排列卡片。要做到这一点，你可以使用这种方法：

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

由于 GitHub 的 API 每个小时只允许 5 千次请求，我的 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制。如果你将其托管在自己的 Vercel 服务器上，那么你就不必为此担心。点击 deploy 按钮来开始你的部署！

> **Note**
> 自从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 以来，我们应该能够处理超过5千次的请求，并且减少停机时间的问题 :grin:。

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>:hammer_and_wrench: 在Velcel上部署的详细教程</summary>

1.  前往 [vercel.com](https://vercel.com/)
2.  点击 `Log in`
    ![](https://files.catbox.moe/pcxk33.png)
3.  点击 `Continue with GitHub` 来用 Github 登陆
    ![](https://files.catbox.moe/b9oxey.png)
4.  登陆 Github 并允许Velcel访问所有仓库
5.  Fork 这个 repo
6.  Fork 完毕后，打开 [`vercel.json`](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json#L5) 并更改 `maxDuration` 的值为 `10`.
7.  返回你的 [Vercel dashboard](https://vercel.com/dashboard).
8.  要导入一个项目，点击 `Add New...` 按钮并选择 `Project` 
   ![](https://files.catbox.moe/3n76fh.png)
9.  点击 `Continue with GitHub` 按钮，找到刚才fork的repo，点击`Import` 按钮来导入。 你也可以点击页面底部的 `Import Third-Party Git Repository ->` 链接来导入一个第三方 Git repo 
    ![](https://files.catbox.moe/mg5p04.png)
10. 在 [这里](https://github.com/settings/tokens/new) 创建一个个人访问令牌 (PAT) 并启用 `repo` 权限 （这允许查看私人 repo 的统计信息）
11. 把刚才得到的个人访问令牌添加为环境变量，命名为`PAT_1` (如图所示)
    ![](https://files.catbox.moe/0yclio.png)
12. 点击 `Deploy` 按钮，然后就大功告成啦。将官方域名改为你的域名就可以用自己的API了。
    
</details>

### 部署在其他平台上

> **Warning**
> 这种使用GRS的方式没有得到官方支持，只是为了解决无法使用Vercel的情况（例如 [#2341](https://github.com/anuraghazra/github-readme-stats/pull/58)）。因此，对这种方法的支持是有限的。

<details>
<summary><b>:hammer_and_wrench: 在其他平台上部署的详细教程</b></summary>

1. 按照片你的需要 fork 或者 clone 这个 repo
2. 将 `express` 添加至 `package.json` 的依赖部分
https://github.com/anuraghazra/github-readme-stats/blob/ba7c2f8b55eac8452e479c8bd38b044d204d0424/package.json#L54-L61
3. 如果需要，运行 `npm i` （初始化）
4. 执行 `node express.js` 来开启服务器，如果你在管理服务上部署，则在`package.json` 中设置入口起点为 `express.js`。
https://github.com/anuraghazra/github-readme-stats/blob/ba7c2f8b55eac8452e479c8bd38b044d204d0424/package.json#L11
5. 完成 🎉
</details>

### 保持你的fork为最新状态

你可以使用GitHubs的[Sync Fork 按钮](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)来更新你的 fork ，从而使你的私有Vercel实例与上游保持同步。你也可以使用[@wei](https://github.com/wei)创建的[pull](https://github.com/wei/pull)包来自动化这一过程。

## :sparkling_heart: 支持这个项目

我尽己所能地进行开源，并且我尽量回复每个在使用项目时需要帮助的人。很明显，这需要时间，但你可以免费享受这些。

然而, 如果你正在使用这个项目并感觉良好，或只是想要支持我继续开发，你可以通过如下方式：

- 在你的 readme 中使用 github-readme-stats 时，链接指向这里 :D
- Star 并 分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款. 我多半会买一杯 ~~咖啡~~ 茶 :tea:

谢谢！ :heart:

* * *

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

欢迎贡献！ &lt;3

用 :heart: 发电，用 JavaScript 制作。
