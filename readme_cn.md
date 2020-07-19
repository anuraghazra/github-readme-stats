<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="Github Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">在你的 README 中 获取动态生成的GitHub统计信息！</p>
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
<p align="center">喜欢这个项目? 请考虑<a href="https://www.paypal.me/anuraghazra">捐赠</a>来帮助它完善！

# 特性

- [GitHub 统计卡片](#GitHub-统计卡片)
- [GitHub Extra Pins](#github-extra-pins)
- [自定义](#自定义)
- [自己部署](#自己部署)

# GitHub 统计卡片

将这复制到你的 markdown 中，就这样，非常简单！
更改 `?username=` 的值为你的用户名。

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Note: 排名是基于用户的统计信息计算得出的，详见 [src/calculateRank.js](./src/calculateRank.js)_

### 隐藏个人统计信息

想要隐藏某个统计信息, 你可以传递参数 `?hide=`，并将你想要隐藏的项目用数组进行传递。

> 选项: `&hide=["stars","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### 显示图标

想要显示图标, 你可以传递 `show_icons=true`，像这样:

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 自定义

你可以为你的 `Stats Card` 或 `Repo Card` 自定义样式，however you want with URL params.

自定义选项:

| Option      | type      | description                          | Stats Card (default) | Repo Card (default) |
| ----------- | --------- | ------------------------------------ | -------------------- | ------------------- |
| title_color | hex color | title color                          | 2f80ed               | 2f80ed              |
| text_color  | hex color | body color                           | 333                  | 333                 |
| icon_color  | hex color | icon color                           | 4c71f2               | 586069              |
| bg_color    | hex color | card bg color                        | FFFEFE               | FFFEFE              |
| line_height | number    | control the line-height between text | 30                   | N/A                 |
| hide_rank   | boolean   | hides the ranking                    | false                | N/A                 |
| hide_title  | boolean   | hides the stats title                | false                | N/A                 |
| hide_border | boolean   | hides the stats card border          | false                | N/A                 |
| show_owner  | boolean   | shows owner name in repo card        | N/A                  | false               |
| show_icons  | boolean   | shows icons                          | false                | N/A                 |

- 你也可以通过自定义来兼容暗黑模式

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)
```

### Demo

- 默认

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 隐藏某个项目

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- 显示图标

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

- 自定义添加卡片

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 自定义仓库卡片

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

# GitHub Extra Pins

GitHub extra pins allow you to pin more than 6 repositories in your profile using a GitHub readme profile.

Yey! You are no longer limited to 6 pinned repositories.

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Use [show_owner](#自定义) variable to include the repo's owner username

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

### 提示 (Align The Repo Cards)

你通常无法将图片靠边显示，为此，您可以使用以下方法：

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 自己部署

自从 GitHub 的 API 每个小时只允许 5 千的请求，我都 `https://github-readme-stats.vercel.app/api` 很有可能会触发限制
如果你将其托管在自己的 Vercel 服务商，那么你就不用担心任何事了。点击 deploy 按钮来开始

注意: 从 [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 开始，我们应该能够处理超过 5千 的请求，并且不会出现宕机问题 :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Guide on setting up Vercel</summary>

1. 前往 [vercel.com](https://vercel.com/)
1. 点击 `Log in`  
   ![](https://files.catbox.moe/tct1wg.png)
1. 点击 `Continue with GitHub` 通过 GitHub 进行登录
   ![](https://files.catbox.moe/btd78j.jpeg)
1. 登录 GitHub 并允许访问所有存储库（如果系统提示）
1. Fork 这个仓库
1. 返回到你的 [Vercel dashboard](https://vercel.com/dashboard)
1. 选择 `Import Project`  
   ![](https://files.catbox.moe/qckos0.png)
1. 选择 `Import Git Repository`  
   ![](https://files.catbox.moe/pqub9q.png)
1. 选择 root 并将所有内容保持不变，并且只需添加名为 PAT_1 的环境变量（如图所示），其中将包含一个个人访问令牌（PAT），你可以在[这里](https://github.com/settings/tokens/new)轻松创建（保留默认，并且只需要命名下，名字随便）
   ![](https://files.catbox.moe/caem5b.png)
1. 点击 deploy, 这就完成了，查看你的域名就可使用 API 了！
</details>

## :sparkling_heart: 支持这个项目

我几乎将我所能的进行开源，并且我试着回复每个在使用这些项目时需要帮助的人。很明显，这需要时间，但你可以免费享受此服务。

然而, 如果你正在使用这个项目并且感觉挺开心或者只是想要支持我继续开发，这里有一些方法：

- 在你的 README 中使用 github-readme-stats 时，链接指向会这里 :D
- Star 并 分享这个项目 :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - 你可以通过 PayPal 一次性捐款. 我可能会买一杯~~咖啡~~茶. :tea:

谢谢！ :heart:

---

欢迎贡献！ <3

用 :heart: 发电，用 JavaScript 制作。
