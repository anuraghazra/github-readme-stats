<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="Github Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在你的 README 中 获取动态生成的 GitHub 统计信息！</p>
</p>

  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
  </p>

  <p align="center">
    <a href="#demo">查看 Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">报告 bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">请求增加功能</a>
  </p>
</p>
<p align="center">喜欢这个项目？请考虑<a href="https://www.paypal.me/anuraghazra">捐赠</a>来帮助它完善！

# 特性

- [GitHub 统计卡片](#GitHub-统计卡片)
- [GitHub 更多置顶](#GitHub-更多置顶)
- [主题](#主题)
- [自定义](#自定义)
- [自己部署](#自己部署)

# GitHub 统计卡片

将这行代码复制到你的 markdown 文件中，简单如此！
更改 `?username=` 的值为你的 GitHub 用户名。

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Note: 排名基于用户的统计信息计算得出，详见 [src/calculateRank.js](./src/calculateRank.js)_

### 隐藏个人统计信息

想要隐藏某项统计信息，你可以调用参数 `?hide=`，并调用 你想要隐藏的项目 组成的数组。

> 选项：`&hide=["stars","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
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

#### 所有现有主题：

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="Github Readme Stat Themes" width="600px"/>

在 [theme config 文件](./themes/index.js) 中查看更多主题，或者 **贡献新的主题** :D

### 自定义

你可以通过使用 URL 参数的方式，为你的 `Stats Card` 或 `Repo Card` 自定义样式。

自定义选项：

| Option      | type      | description                          | Stats Card (default) | Repo Card (default) |
| ----------- | --------- | ------------------------------------ | -------------------- | ------------------- |
| title_color | hex color | 标题颜色                              | 2f80ed               | 2f80ed              |
| text_color  | hex color | 字体颜色                              | 333                  | 333                 |
| icon_color  | hex color | 图标颜色                              | 4c71f2               | 586069              |
| bg_color    | hex color | 卡片背景颜色                           | FFFEFE               | FFFEFE              |
| line_height | number    | 文字行高                              | 30                   | N/A                 |
| hide_rank   | boolean   | 隐藏评分等级                           | false                | N/A                 |
| hide_title  | boolean   | 隐藏卡片标题                           | false                | N/A                 |
| hide_border | boolean   | 隐藏卡片边框                           | false                | N/A                 |
| show_owner  | boolean   | 显示 Repo 卡片所属账户用户名             | N/A                  | false               |
| show_icons  | boolean   | 显示图标                              | false                | N/A                 |
| theme       | string    | 设置主题                              | 'default'            | 'default_repocard'  |

---

### Demo

- 默认

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隐藏特定数据

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- 显示图标

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

- 主题

从 [默认主题](#主题) 中进行选择

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 自定义添加卡片

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 自定义 Repo 卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

---

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

注意: 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我们应该能够处理超过 5千 的请求，并且不会出现宕机问题 :D

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
