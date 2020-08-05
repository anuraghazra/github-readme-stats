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
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">报告 bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">请求增加功能</a>
  </p>
  <p align="center">
    <a href="readme.md">English</a>
    ·
    <a href="readme_es.md">Español</a>
    ·
    <a href="readme_ja.md">日本語</a>
  </p>
</p>
<p align="center">喜欢这个项目？请考虑<a href="https://www.paypal.me/anuraghazra">捐赠</a>来帮助它完善！

# 特性

- [GitHub 统计卡片](#GitHub-统计卡片)
- [GitHub 更多置顶](#GitHub-更多置顶)
- [热门语言卡片](#热门语言卡片)
- [主题](#主题)
- [自定义](#自定义)
- [自己部署](#自己部署)

# GitHub 统计卡片

将这行代码复制到你的 markdown 文件中，简单如此！

更改 `?username=` 的值为你的 GitHub 用户名。

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_注: 排名基于用户的统计信息计算得出，详见 [src/calculateRank.js](./src/calculateRank.js)_

### 隐藏个别统计项

想要隐藏指定统计信息，你可以调用参数 `?hide=`，其值用 `,` 分隔。

> 选项：`&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 把私人贡献计数添加到总提交计数中

你可以用参数 `?count_private=true` 把私人贡献计数添加到总提交计数中。

_注：如果你是自己部署本项目，私人贡献将会默认被计数，如果不是自己部署，你需要分享你的私人贡献计数。_

> Options: `&count_private=true`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 显示图标

想要显示图标，你可以调用 `show_icons=true` 参数，如下：

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 主题

你可以通过现有的主题进行卡片个性化，省去[手动自定义](#自定义)的麻烦。

调用 `?theme=THEME_NAME` 参数，如下：

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 所有现有主题

dark, radical, merko, [gruvbox](https://github.com/morhetz/gruvbox), tokyonight, onedark, cobalt, synthwave, highcontrast, [dracula](https://github.com/dracula/dracula-theme)

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

在 [theme config 文件](./themes/index.js) 中查看更多主题，或者 **贡献新的主题** :D

### 自定义

你可以通过使用 URL 参数的方式，为你的 `Stats Card` 或 `Repo Card` 自定义样式。

自定义选项：

| Option        | type      | description                  | Stats Card (default) | Repo Card (default) | Top Lang Card (default) |
| ------------- | --------- | ---------------------------- | -------------------- | ------------------- | ----------------------- |
| title_color   | hex color | 标题颜色                     | 2f80ed               | 2f80ed              | 2f80ed                  |
| text_color    | hex color | 字体颜色                     | 333                  | 333                 | 333                     |
| icon_color    | hex color | 图标颜色                     | 4c71f2               | 586069              | 586069                  |
| bg_color      | hex color | 卡片背景颜色                 | FFFEFE               | FFFEFE              | FFFEFE                  |
| line_height   | number    | 文字行高                     | 30                   | N/A                 | N/A                     |
| hide          | CSV       | 隐藏指定统计项               | undfined             | N/A                 | undefined               |
| hide_rank     | boolean   | 隐藏评分等级                 | false                | N/A                 | N/A                     |
| hide_title    | boolean   | 隐藏卡片标题                 | false                | N/A                 | false                   |
| hide_border   | boolean   | 隐藏卡片边框                 | false                | N/A                 | N/A                     |
| show_owner    | boolean   | 显示 Repo 卡片所属账户用户名 | N/A                  | false               | N/A                     |
| show_icons    | boolean   | 显示图标                     | false                | N/A                 | N/A                     |
| theme         | string    | 设置主题                     | 'default'            | 'default_repocard'  | 'default'               |
| cache_seconds | number    | 手动设置自定义缓存控制       | 1800                 | 1800                | 1800                    |
| count_private | boolean   | 统计私人贡献计数             | false                | N/A                 | N/A                     |
| layout        | string    | 布局方式                     | N/A                  | N/A                 | 'default'               |

> 注意缓存：Repo 卡片默认缓存 30 分钟，如果 fork 数和 star 数小于 1k ，则默认为 2 小时。缓存被限制为最少 30 分钟，最长 24 小时。

# GitHub 更多置顶

GitHub 更多置顶 让你使用 README Profile，在个人页面中置顶多于 6 个 repo 。

这波可以！你再也不用受限于最多 6 个置顶了。

### 使用细则

复制粘贴这段代码到你的 README 文件中，并更改链接。

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

使用 [show_owner](#自定义) 变量将 Repo 所属账户的用户名包含在内。

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 热门语言卡片

热门语言卡片显示了 GitHub 用户常用的编程语言。

_注意：热门语言并不表示我的技能水平或类似的水平，它是用户在 GitHub 上拥有最多代码的一项指标，它是 github-readme-stats 的新功能_

### 使用细则

将此代码复制粘贴到您的`README.md`文件中，并改变链接。

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 隐藏特定语言

可以使用`?hide=语言1,语言2`参数来隐藏指定的语言。

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=语言1,语言2)](https://github.com/anuraghazra/github-readme-stats)
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

### 全部 Demo

- 默认

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隐藏特定数据

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 显示图标

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 主题

从 [默认主题](#主题) 中进行选择

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 自定义统计卡片

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 自定义代码库卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 热门语言

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### 提示 (对齐 Repo 卡片)

你通常无法将图片靠边显示。为此，您可以使用以下方法：

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 自己部署

因为 GitHub 的 API 每个小时只允许 5 千次请求，我的 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制
如果你将其托管在自己的 Vercel 服务器上，那么你就不必为此担心。点击 deploy 按钮来开始你的部署！

注意: 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我们应该能够处理超过 5 千 的请求，并且不会出现宕机问题 :D

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
   ![](https://files.catbox.moe/caem5b.png)
1. 点击 deploy，这就完成了，查看你的域名就可使用 API 了！

</details>

## :sparkling_heart: 支持这个项目

我尽己所能地进行开源，并且我尽量回复每个在使用项目时需要帮助的人。很明显，这需要时间，但你可以免费享受这些。

然而, 如果你正在使用这个项目并感觉良好，或只是想要支持我继续开发，你可以通过如下方式：

- 在你的 README 中使用 github-readme-stats 时，链接指向会这里 :D
- Star 并 分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款. 我多半会买一杯 ~~咖啡~~ 茶。:tea:

谢谢！ :heart:

---

欢迎贡献！ <3

用 :heart: 发电，用 JavaScript 制作。
