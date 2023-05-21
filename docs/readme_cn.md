<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme 统计数据</h2>
 <p align="center">在你的README中获取GitHub动态生成统计信息！</p>
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
    <a href="#demo">查看Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">报告Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">请求添加新功能</a>
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
<p align="center">喜欢这个项目吗？请考虑通过<a href="https://www.paypal.me/anuraghazra">捐赠</a>来提升它吧！

<a href="https://indiafightscorona.giveindia.org">
  <img src="https://cfstatic.give.do/logo.png" alt="Give india logo" width="200" />
</a>

你还在考虑通过捐赠来支持这个项目吗？请不要这样！！

相对的，帮助印度抗击COVID-19的第二波浪潮吧。
印度有上千人因缺乏氧气和新冠相关基础设施而死亡

访问<https://indiafightscorona.giveindia.org>来为我们抗击新冠和克服危机危机。少量的捐款也可以带来很大的帮助。 :heart:

</p>

# 特性

-   [GitHub统计卡](#gitHub统计卡)
-   [GitHub额外引脚](#gitHub额外引脚)
-   [热门语言卡片](#热门语言卡片)
-   [Wakatime每周统计数据](#wakatime每周统计数据)
-   [主题](#主题)
    -   [响应式卡片主题](#responsive-card-theme)
-   [自定义](#自定义)
    -   [常见选项](#常见选项)
    -   [统计卡特有选项](#统计卡特有选项)
    -   [Repo卡特有选项](#repo卡特有选项)
    -   [语言卡特有选项](#语言卡特有选项)
    -   [Wakatime卡特有选项](#wakatime卡特有选项)
-   [自行部署](#自行部署)
    -   [在Vercel上部署](#在Vercel上部署)
    -   [在其它平台上部署](#在其它平台上部署)
    -   [保持分支每日更新](#保持分支每日更新)

# GitHub 统计卡片

将这行代码复制到你的markdown文件中，就这么简单！

把`?username=`的参数更改为你的 GitHub 用户名。

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```
> **注意事项**
> 可用的排名有S+ (前1%)，S (前25%)，A++ (前45%)，A+ (前60%)，和 B+ (任何人)。这些值是使用[累积分布函数](https://en.wikipedia.org/wiki/Cumulative_distribution_function)通过commits（提交）、contributions（贡献）、issues(反馈)、stars（收藏）、pull Requests（PR）、followers（粉丝）和拥有的repositories（仓库）来计算的。可以通过研究[src/calculateRank.js](./src/calculateRank.js)来实现。


### 隐藏指定统计

可以通过改变`?hide=`参数来隐藏带通过逗号分隔的参数的特定统计数据。

> 选项：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 将私人项目贡献添加到总提交计数中

可以使用`?count_private=true`把私人仓库的贡献添加到总贡献数中。

> **注意事项**
> 如果这个项目是您一个人部署的，那默认会将私人贡献计入在内。如果您使用的是公有Vercel实例,你应该选择[分享你的私人贡献](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/showing-your-private-contributions-and-achievements-on-your-profile).

> 选项: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 显示图标

如果要显示图标，你可以调用 `show_icons=true` 参数，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主题

通过现有的主题，你不需要[手动定义](#自定义)就能自定义卡片的外观。

可以通过调用 `?theme=THEME_NAME` 参数实现，像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有现有主题
 
GitHub readme统计有几个现有主题（例：`dark`，`radical`，`merko`，`gruvbox`，`tokyonight`，`onedark`，`cobalt`，`synthwave`，`highcontrast`，`dracula`）。

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme统计卡主题" width="600px"/>

你可以预览[所有可用主题](../themes/README.md)或者检查[主题的配置文件](../themes/index.js)，如果你喜欢的话，**也可以贡献新的主题** (￣▽￣)~*

#### 响应式卡片主题

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

Since GitHub will re-upload the cards and serve them from their [CDN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls), we can not infer the browser/GitHub theme on the server side. There are, however, four methods you can use to create dynamics themes on the client side.

 
##### 使用透明频道

我们包含一个有透明背景的`transparent（透明）`主题。经过优化，此主题在GitHub默认的深色和浅色主题上看起来都不错。您可以使用`&theme=transparent`参数启用该主题，就像这样：

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)
```

<details>
<summary>:eyes: 一些例子</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=transparent)

</details>

##### 把透明alpha通道添加给bg_color

你可以用`bg_color`参数使[可用主题](./themes/README.md)透明。这是通过`bg_color`的透明alpha通道的颜色设置实现的(i.e. `bg_color=00000000`):

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)
```

<details>
<summary>:eyes: Show example</summary>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&bg_color=00000000)

</details>

##### 用GitHub的主题背景标签

你可以用[GitHub的主题背景](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/)标签来根据用户的GitHub主题来自动切换主题。这是通过在图片末尾的URL中追加`#gh-dark-mode-only`或`#gh-light-mode-only`来实现的。此标签将定义markdown中的指定图像仅向使用浅色或深色GitHub主题的访客显示。

```md
[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)
```

<details>
<summary>:eyes: 一些例子</summary>

[![Anurag's GitHub stats-Dark](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=dark#gh-dark-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-dark-mode-only)
[![Anurag's GitHub stats-Light](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=default#gh-light-mode-only)](https://github.com/anuraghazra/github-readme-stats#gh-light-mode-only)

</details>

##### 使用GitHub新的媒体特性

你可以在HTML中用[GitHub新的媒体特性](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/)来指定显示light（亮）主题或dark（暗）主题。这是使用HTML的`<picture>和`prefers-color-scheme`元素组合完成的媒体特性。

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
<summary>:eyes: 一些例子</summary>

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

#### 常用选项

-   `title_color` - 卡片标题颜色 _（十六进制色码）_。 默认值：‘2f80ed’
-   `text_color` - 内容文本颜色 _（十六进制色码）_。 默认值：‘434d58’。
-   `icon_color` - 图标颜色（如果可用）_（十六进制色码）_。  默认值：‘4c71f2’。
-   `bg_color` - 卡片背景颜色 _（十六进制色码）_ **或者** 以 _angle,start,end_ 的形式渐变。 默认值：‘fffefe’。
-   `hide_border` - 隐藏卡的边框 _(布尔值)_。 默认值：‘false’。
-   `theme` - 主题名称，从[所有可用主题](../themes/README.md)中选择。 默认值：‘default（默认）’主题。
-   `cache_seconds` - 手动设置缓存头 _（最小值: 14400，最大值: 86400）_。 默认值：‘14400秒（4小时）’。
-   `locale` - 设置卡片语言 _(例：cn，de，es等等)_。 默认：‘en（英语）’
-   `border_radius` - 卡片圆角 默认值：‘4.5’。

> **警告**
> 我们用缓存减少服务器的负荷（见<https://github.com/anuraghazra/github-readme-stats/issues/1471#issuecomment-1271551425>）。我们的卡片有默认四小时的缓存（14400秒）。并且，缓存的时间限制在最小4小时到最多24小时之间。

##### bg_color 渐变

你可以在 bg_color 选项中提供多个逗号分隔的值来呈现渐变，渐变的格式是 :-

    &bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10




<!-- Translate temporarily stops there --><!-- Translate temporarily stops there --><!-- Translate temporarily stops there -->
<!-- 翻译暂时到此为止 --><!-- 翻译暂时到此为止 --><!-- 翻译暂时到此为止 --><!-- 翻译暂时到此为止 --><!-- 翻译暂时到此为止 --><!-- 翻译暂时到此为止 -->




#### 统计卡专属选项:

- `hide` - 隐藏特定统计信息 _(以逗号分隔)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_
- `show_icons` - _(boolean)_
- `include_all_commits` - 统计总提交次数而不是仅统计今年的提交次数 _(boolean)_
- `count_private` - 统计私人提交 _(boolean)_
- `line_height` - 设置文本之间的行高 _(number)_

#### Repo 卡片专属选项:

- `show_owner` - 显示 Repo 的所有者名字 _(boolean)_

#### 语言卡片专属选项:

- `hide` - 从卡片中隐藏指定语言 _(Comma seperated values)_
- `hide_title` - _(boolean)_
- `layout` - 提供四種佈局 `normal` & `compact` & `donut` & `pie` 间切换
- `card_width` - 手动设置卡片的宽度 _(number)_

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

# 热门语言卡片

热门语言卡片显示了 GitHub 用户常用的编程语言。

_注意：热门语言并不表示我的技能水平或类似的水平，它是用来衡量用户在 github 上拥有最多代码的语言的一项指标，它是 github-readme-stats 的新特性_

### 使用细则

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

### 紧凑的语言卡片布局

你可以使用 `&layout=compact` 参数来改变卡片的样式。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 紧凑布局

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 全部 Demos

- 默认

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隐藏指定统计

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 显示图标

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 包含全部提交

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 主题

从[默认主题](#主题)中进行选择

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 渐变

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 自定义统计卡片

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 自定义 repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 热门语言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

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
1. 返回到你的 [Vercel dashboard](https://vercel.com/dashboard)
1. 选择 `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. 选择 `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. 选择 root 并将所有内容保持不变，并且只需添加名为 PAT_1 的环境变量（如图所示），其中将包含一个个人访问令牌（PAT），你可以在[这里](https://github.com/settings/tokens/new)轻松创建（保留默认，并且只需要命名下，名字随便）
   ![](https://files.catbox.moe/0ez4g7.png)
1. 点击 deploy，这就完成了，查看你的域名就可使用 API 了！

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
