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
  </p>

  <p align="center">
    <a href="#所有-demos">查看 Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml">报告 Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml">请求增加功能</a>
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

# 特色 <!-- omit in toc -->

- [GitHub 统计卡片](#github-统计卡片)
    - [隐藏指定统计](#隐藏指定统计)
    - [显示新增统计](#显示新增统计)
    - [显示图标](#显示图标)
    - [主题](#主题)
    - [自定义](#自定义)
- [Github 更多置顶](#github-更多置顶)
    - [使用细则](#使用细则)
    - [Demo](#demo)
- [GitHub Gist 置顶](#github-gist-置顶)
    - [使用细则](#使用细则-1)
    - [Demo](#demo-1)
- [热门语言卡片](#热门语言卡片)
    - [使用细则](#使用细则-2)
    - [语言数据算法](#语言数据算法)
    - [排除单个存储库](#排除单个存储库)
    - [隐藏指定语言](#隐藏指定语言)
    - [显示更多语言](#显示更多语言)
    - [紧凑视图](#紧凑视图)
    - [环形视图](#环形视图)
    - [环形垂直视图](#环形垂直视图)
    - [饼视图](#饼视图)
    - [隐藏进度条](#隐藏进度条)
    - [Demo](#demo-2)
- [WakaTime 数据卡片](#wakatime-数据卡片)
    - [Demo](#demo-3)
- [所有 Demos](#所有-demos)
  - [提示](#提示)
- [自行部署](#自行部署)
  - [部署在 Vercel](#部署在-vercel)
    - [分步视频教程](#分步视频教程)
  - [部署于其他平台](#部署于其他平台)
  - [解除速率限制保护](#解除速率限制保护)
  - [保持最新Fork](#保持最新-fork)
- [:sparkling\_heart: 支持这个项目](#sparkling_heart-支持这个项目)

# GitHub 统计卡片

将这行代码复制到你的 markdown 文件中，就是如此简单！

更改 `?username=` 的值为你的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注: 等级基于用户的统计信息计算得出，详见 [src/calculateRank.js](../src/calculateRank.js)_

### 隐藏指定统计

想要隐藏指定统计信息，你可以调用参数 `?hide=`，其值用 `,` 分隔。

> 选项：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 显示新增统计

您可以传递一个查询参数`&show=`，以显示任何以逗号分隔的特定附加统计数据。

> 选项：`&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage)
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

你可以预览[所有可用主题](../themes/README.md)或者签出[主题配置文件](../themes/index.js), 而且如果你喜欢, 你也可以贡献新的主题。**请注意**：为了减少服务器的维持压力，我们将暂停接受新主题，所有关于新主题的Pull Request都将被关闭。:D

#### 响应式主题

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#responsive-card-theme#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#responsive-card-theme#gh-light-mode-only)

由于GitHub将重新上传卡片并从他们的[CND](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls)提供服务，我们无法推断服务器端的浏览器/GitHub主题。不过，你可以使用四种方法在客户端创建动态主题。

##### 使用透明主题

我们纳入了一个背景透明的“透明”主题。此主题经过优化，在GitHub的深色和浅色默认主题上看起来不错。您可以使用`&theme=transparent`参数启用此主题，如下所示：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)
```

<details>
<summary>:eyes: 演示样例</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=transparent)

</details>

##### 添加透明alpha通道到主题的 bg\_color

你可以使用`bg_color`参数使任何[可用主题]（themes/README.md）透明。这是通过将“bg_color”设置为具有透明alpha通道的颜色（即“bg_coolor=00000000”）来实现的：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)
```

<details>
<summary>:eyes: 演示样例</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&bg_color=00000000)

</details>

##### 使用GitHub的主题上下文标签

你可以使用[GitHub的主题上下文](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/)标签来根据用户GitHub主题自动切换主题。这是通过在图像URL的末尾附加“#gh dark mode only”或“#gh light mode only”来实现的。此标签将定义标记中指定的图像是仅显示给使用浅色还是深色GitHub主题的查看者：

```md
[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)
```

<details>
<summary>:eyes: 演示样例</summary>

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

</details>

##### 使用GitHub的新媒体功能

你可以使用[GitHub的新媒体功能](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/)在HTML中指定是显示浅色主题还是深色主题的图片。这是使用HTML的“<picture>”元素结合“首选配色方案”媒体功能达到的。

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
<summary>:eyes: 演示样例</summary>

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

常用选项：

- `title_color` - 卡片标题颜色 _（十六进制色码）_
- `text_color` - 内容文本颜色 _（十六进制色码）_
- `icon_color` - 图标颜色（如果可用）_（十六进制色码）_
- `bg_color` - 卡片背景颜色 _（十六进制色码）_ **或者** 以 _angle,start,end_ 的形式渐变
- `hide_border` - 隐藏卡的边框 _(布尔值)_
- `theme` - 主题名称，从[所有可用主题](../themes/README.md)中选择
- `cache_seconds` - 手动设置缓存头 _（最小值: 14400，最大值: 86400）_
- `locale` - 在卡片中设置语言 _(例如 cn, de, es, 等等)_

##### bg_color 渐变

你可以在 bg_color 选项中提供多个逗号分隔的值来呈现渐变，渐变的格式是 :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> 缓存的注意事项: 如果 fork 数和 star 数 少于 1k , Repo 卡片默认缓存是 4 小时 （14400 秒） ，否则是 2 小时（7200）。另请注意缓存被限制为最短 2 小时，最长 24 小时。

#### 统计卡片专属选项:

- `hide` - 隐藏特定统计信息 _(以逗号分隔)_
- `hide_title` - _(布尔值)_
- `hide_rank` - _(布尔值)_
- `show_icons` - _(布尔值)_
- `include_all_commits` - 统计总提交次数而不是仅统计今年的提交次数 _(布尔值)_
- `count_private` - 统计私人提交 _(布尔值)_
- `line_height` - 设置文本之间的行高 _(数值)_

#### Repo 卡片专属选项:

- `show_owner` - 显示 Repo 的所有者名字 _(布尔值)_

#### 语言卡片专属选项:

- `hide` - 从卡片中隐藏指定语言 _(逗号分隔值)_
- `hide_title` - _(布尔值)_
- `layout` - 提供五种布局 `normal` & `compact` & `donut` & `donut-vertical` & `pie` 间切换
- `card_width` - 手动设置卡片的宽度 _(n数值)_

> :warning: **重要:**
> 如 [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding) 所指定，语言名称应使用 uri 转义。
> (例: `c++` 应该是 `c%2B%2B`, `jupyter notebook` 应该是 `jupyter%20notebook`, 等.)

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

# GitHub Gist 置顶

GitHub gist设置允许您使用GitHub自述文件将gist置顶在GitHub个人资料中。

### 使用细则

将此代码复制粘贴到您的自述文件中并更改链接。

端点：`api/gist？id=bbfce31e0217a3689c8d961a356cb10d`

```md
[![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)](https://gist.github.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/)
```

### Demo

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)

使用[show\_owner]（#gist-card独占选项）查询选项来包含gist的所有者用户名

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d\&show_owner=true)

# 热门语言卡片

热门语言卡片显示了 GitHub 用户常用的编程语言。

_注意：热门语言并不表示用户的技能水平或类似的水平，它是用来衡量用户在 github 上拥有最多代码的语言的一项指标，它是 github-readme-stats 的新特性_

### 使用细则

将此代码复制粘贴到您的 `README.md` 文件中，并修改链接。

端点: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 语言数据算法

我们使用以下算法计算语言卡片上的语言百分比：

```js
排序权重 = (字数 ^ size_weight) * (仓库数 ^ count_weight)
```

默认情况下，只有字节计数用于确定语言卡上显示的语言百分比（即`size_weight=1`和`count_weight=0`）。但是，您可以使用`&size_weight=`和`&count_weight='选项对语言使用计算进行加权。这些值必须是正实数。[有关该算法的更多详细信息，请点击此处](https://github.com/anuraghazra/github-readme-stats/issues/1600#issuecomment-1046056305).

*   `&size_weight=1&count_weight=0` - *（默认）* 由字数排序
*   `&size_weight=0.5&count_weight=0.5` - *（建议）* 由字数和仓库数排序
*   `&size_weight=0&count_weight=1` - 由仓库数排序

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&size_weight=0.5&count_weight=0.5)
```

### 排除单个存储库

你可以使用`&exclude_repo=repo1，repo2`参数排除单个存储库。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)
```

### 隐藏指定语言

你可以使用 `?hide=language1,language2` 参数来隐藏指定的语言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 显示更多语言

你可以使用`&langs_count=`选项来增加或减少卡片上显示的语言数量。有效值是介于1和20（包括1和20）之间的整数。默认情况下，对于“普通”和“环形”，它被设置为“5”，对于其他布局，它被设为“6”。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)
```

### 紧凑视图

你可以使用 `&layout=compact` 参数来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### 环形视图

你可以使用`&layout=donut`选项更改卡片设计。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=donut)](https://github.com/anuraghazra/github-readme-stats)
```

### 环形垂直视图

您可以使用`&layout=donate vertical`选项更改卡片设计。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=donut-vertical)](https://github.com/anuraghazra/github-readme-stats)
```

### 饼视图

您可以使用`&layout=pie`选项更改卡片设计。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=pie)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏进度条

您可以使用“&hide_progress=true”选项隐藏百分比和进度条（布局将自动设置为“紧凑”）。

```md
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide_progress=true)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Demo

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)

*   紧凑试图

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=compact)

*   环形视图

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=donut)](https://github.com/anuraghazra/github-readme-stats)

*   环形垂直试图

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=donut-vertical)](https://github.com/anuraghazra/github-readme-stats)

*   饼视图

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&layout=pie)](https://github.com/anuraghazra/github-readme-stats)

*   隐藏进度条

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra\&hide_progress=true)

# WakaTime 数据卡片

把 `?username=` 改为你的 [WakaTime](https://wakatime.com) 用户名。

```md
[![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs)

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs\&hide_progress=true)

*   紧凑视图

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs\&layout=compact)

***

# 所有 Demos

*   默认

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

*   隐藏特定数据

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&hide=contribs,issues)

*   显示额外数据

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage)

*   显示图标

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&hide=issues\&show_icons=true)

*   显示Github图标而不是等级

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&rank_icon=github)

*   显示用户排名百分位数而不是等级

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&rank_icon=percentile)

*   自定义边框颜色

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&border_color=2e4058)

*   包括所有提交

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&include_all_commits=true)

*   主题

从 [默认主题](#themes) 中选择

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&show_icons=true\&theme=radical)

*   Gradient

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra\&bg_color=30,e96443,904e95\&title_color=fff\&text_color=fff)

*   自定义数据卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra\&show_icons=true\&title_color=fff\&icon_color=79ff97\&text_color=9f9f9f\&bg_color=151515)

*   设置卡片区域

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra\&locale=es)

*   自定义仓库卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra\&repo=github-readme-stats\&title_color=fff\&icon_color=f9f9f9\&text_color=9f9f9f\&bg_color=151515)

*   Gist卡片

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d)

*   自定义Gist卡片

![Gist Card](https://github-readme-stats.vercel.app/api/gist?id=bbfce31e0217a3689c8d961a356cb10d&theme=calm)

*   热门语言卡片

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)

*   WakaTime卡片

![Harlok's WakaTime stats](https://github-readme-stats.vercel.app/api/wakatime?username=ffflabs)

***

### 提示

你通常无法将图片靠边显示。为此，您可以使用以下方法：

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api?username=anuraghazra" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=anuraghazra&layout=compact&langs_count=8&card_width=320" />
</a>
```

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

<details>
<summary>:eyes: 演示样例</summary>

<a href="https://github.com/anuraghazra/github-readme-stats">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api?username=anuraghazra" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img height=200 align="center" src="https://github-readme-stats.vercel.app/api/top-langs?username=anuraghazra&layout=compact&langs_count=8&card_width=320" />
</a>

***

<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>

</details>

## 自行部署

### 部署在 Vercel

#### [分步视频教程](https://youtu.be/n6d4KHSKqGk?t=107)

因为 GitHub 的 API 每个小时只允许 5 千次请求，我的 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制。如果你将其托管在自己的 Vercel 服务器上，那么你就不必为此担心。点击 deploy 按钮来开始你的部署！

> [注意！]\
> 从[#58](https://github.com/anuraghazra/github-readme-stats/pull/58)开始，我们应该能够处理超过5k个请求，并且发生瘫痪的次数更少 :grin:。

> [注意！]\
> 如果您使用[Pro（即付费）](https://vercel.com/pricing)Vercel计划，当您的Vercel实例在卡片请求过程中频繁超时时，[vercel.json](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json)中的[最大持续时间](https://vercel.com/docs/concepts/projects/project-configuration#value-definition)可以增加。建议您将此值保持在“30”秒以下，以防止内存使用率过高。

[![部署在Vercel上](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>设置 Vercel 的指导</summary>

1. 前往 [vercel.com](https://vercel.com/)
2. 点击 `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
3. 点击 `Continue with GitHub` 通过 GitHub 进行登录
   ![](https://files.catbox.moe/btd78j.jpeg)
4. 登录 GitHub 并允许访问所有存储库（如果系统这样提示）
5. Fork 这个仓库
6. 返回到你的 [Vercel dashboard](https://vercel.com/dashboard)
7. 要导入项目，请单击“添加新…”按钮，然后选择“项目”选项。
   ![](https://files.catbox.moe/3n76fh.png)
8.点击“继续使用GitHub”按钮，搜索所需的Git仓库，然后点击“导入”按钮将其导入。或者，您可以使用页面底部的“导入第三方Git存储库->”链接导入第三方Git存储库。
   ![](https://files.catbox.moe/mg5p04.png)
9. 创建个人访问令牌（PAT）[此处](https://github.com/settings/tokens/new)并启用“repo”和“user”权限（这允许访问查看私有repo和用户统计数据）。
10. 将PAT添加为名为“PAT_1”的环境变量（如图所示）。
    ![](https://files.catbox.moe/0yclio.png)
11. 单击部署，就可以开始了。查看您的域以使用API！

</details>

## 部署于其他平台

<details>
<summary><b>:hammer_and_wrench: 部署在其他平台的手把手教学</b></summary>

1. 根据需要分叉或克隆此仓库
2. 在`package.json的依赖项部分添加`express``
   <https://github.com/anuraghazra/github-readme-stats/blob/ba7c2f8b55eac8452e479c8bd38b044d204d0424/package.json#L54-L61>
3. 如果需要，运行`npm i`（初始设置）
4. 运行`node-express.js `启动服务器，或者如果你在托管服务上部署，在`package.json `中将入口点设置为`express.js `
   <https://github.com/anuraghazra/github-readme-stats/blob/ba7c2f8b55eac8452e479c8bd38b044d204d0424/package.json#L11>
5. 你成功了🎉

</details>

## 解除速率限制保护

Github Readme Stats包含几个Vercel环境变量，可用于删除速率限制保护：

*`CACHE_SECONDS`：此环境变量优先于我们的缓存最小值和最大值，并且可以绕过自托管Vercel实例的这些值。

请参阅[Vercel文档](https://vercel.com/docs/concepts/projects/environment-variables)将这些环境变量添加到Vercel实例中。

## 保持最新 Fork

您可以使用GitHub的[Sync fork按钮]使您的fork以及您的私有Vercel实例与上游保持最新状态(https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork). 你也可以使用[pull](https://github.com/wei/pull)由[@wei]创建的包(https://github.com/wei)使这一过程实现自动化。

## :sparkling_heart: 支持这个项目

我尽己所能地进行开源，并且尽量回复每个在使用项目时需要帮助的人。很明显，这需要时间，你完全可以免费享受这些服务。

不过, 如果你正在使用这个项目并感觉良好，或只是想要支持我继续开发，你可以通过如下方式：

- 在你的 readme 中使用 github-readme-stats 时，链接指向这里 :D
- Star 并 分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款. 我多半会买一杯 ~~咖啡~~ 茶. :tea:

谢谢！ :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

欢迎贡献！ <3

用 :heart: 发电，用 JavaScript 制作。
