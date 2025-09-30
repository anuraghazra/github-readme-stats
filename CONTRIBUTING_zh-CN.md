# 为 [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) 做贡献

我们欢迎您的贡献！我们希望让为此项目做贡献变得尽可能简单和透明，无论是：

-   报告 [一个问题](https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=bug&template=bug_report.yml)。
-   [讨论](https://github.com/anuraghazra/github-readme-stats/discussions) 代码的当前状态。
-   提交 [一个修复](https://github.com/anuraghazra/github-readme-stats/compare)。
-   提议 [新功能](https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=enhancement&template=feature_request.yml)。
-   成为维护者。

## 所有变更都通过 Pull Request 进行

Pull request 是提议变更的最佳方式。我们积极欢迎您的 pull request：

1.  Fork 仓库并从 `master` 创建您的分支。
2.  如果您添加了应该被测试的代码，请添加一些测试示例。
3.  如果您更改了 API，请更新文档。
4.  发出 pull request！

## github-readme-stats 的内部工作原理

有兴趣深入了解 github-readme-stats 的工作原理吗？

[Bohdan](https://github.com/Bogdan-Lyashenko) 写了一篇非常深入的文章，快去看看吧：

**[github-readme-stats 项目的内部工作原理](https://codecrumbs.io/library/github-readme-stats)**

## 本地开发

要运行和测试 github-readme-stats，您需要遵循几个简单的步骤：-
_（确保您已经有 [Vercel](https://vercel.com/) 账户）_

1.  安装 [Vercel CLI](https://vercel.com/download)。
2.  Fork 仓库并将代码克隆到您的本地机器。
3.  在仓库根目录运行 `npm install`。
4.  在根目录运行 `vercel` 命令并按照那里的步骤操作。
5.  运行 `vercel dev` 命令在 <http://localhost:3000> 启动开发服务器。
6.  然后可以从这个本地端点获取卡片（即 `http://localhost:3000/api?username=anuraghazra`）。

> [!NOTE]\
> 您可以通过使用 [Node.js: Attach to process](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_setting-up-an-attach-configuration) 调试选项在 [Vscode](https://code.visualstudio.com/) 中调试包代码。您也可以使用 [VSCode Jest 扩展](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) 调试任何测试。更多信息请见 https://github.com/jest-community/vscode-jest/issues/912。

## 主题贡献

我们目前暂停添加新主题以减少维护工作量。所有与新主题相关的 pull request 都将被关闭。

> [!NOTE]\
> 如果您考虑贡献您的主题只是因为您个人在使用它，那么与其将它添加到我们的主题集合中，您可以使用卡片 [自定义选项](./readme.md#customization)。

## 翻译贡献

GitHub Readme Stats 支持多种语言，如果我们缺少您的语言，您可以贡献它！您可以在这里查看当前支持的语言 [here](./README_zh-CN.md#available-locales)。

要贡献您的语言，您需要编辑 [src/translations.js](./src/translations.js) 文件，并在每个对象中添加新属性，其中键是 [ISO 639-1 标准](https://www.andiamo.co.uk/resources/iso-language-codes/) 中的语言代码，值是翻译后的字符串。

## 您所做的任何贡献都将遵循 MIT 软件许可证

简而言之，当您提交变更时，您的提交将被视为遵循覆盖该项目的相同 [MIT 许可证](https://choosealicense.com/licenses/mit/)。如果有疑虑，请随时联系维护者。

## 使用 GitHub 的 [issues](https://github.com/anuraghazra/github-readme-stats/issues) 报告问题/错误

我们使用 GitHub issues 来跟踪公共错误。通过 [开启一个新 issue](https://github.com/anuraghazra/github-readme-stats/issues/new/choose) 来报告错误；就这么简单！

## 常见问题 (FAQs)

**问：** 如何隐藏 Jupyter Notebook？

> **答：** &hide=jupyter%20notebook

**问：** 我不知道如何在自己的 Vercel 实例上部署

> **答：**
>
> -   文档：<https://github.com/anuraghazra/github-readme-stats/#deploy-on-your-own-vercel-instance>
> -   codeSTACKr 的 YouTube 教程：<https://www.youtube.com/watch?v=n6d4KHSKqGk&feature=youtu.be&t=107>

**问：** 语言卡片不正确

> **答：** 在开启任何关于语言卡片统计的问题之前，请阅读所有相关的问题/评论：
>
> -   <https://github.com/anuraghazra/github-readme-stats/issues/136#issuecomment-665164174>
>
> -   <https://github.com/anuraghazra/github-readme-stats/issues/136#issuecomment-665172181>

**问：** 如何统计私人统计信息？

> **答：** 我们只能统计公共提交，无法访问任何用户的其他私人信息，因此这是不可能的。统计您个人的私人统计信息的唯一方法是在您自己的实例上部署并使用您自己的 PAT（个人访问令牌）

### 错误报告

**优秀的错误报告** 通常包含：

-   快速摘要和/或背景
-   重现步骤
    -   要具体！
    -   如果可能，分享快照。
    -   GitHub Readme Stats 的实时链接
-   实际发生的情况
-   您期望发生的情况
-   备注（可能包括您认为这可能发生的原

因或您尝试过但不起作用的方法）

人们 _喜欢_ 详尽的错误报告。我不是在开玩笑。

### 功能请求

**优秀功能请求** 通常包含：

-   快速想法摘要
-   您想要添加特定功能的原因和内容
-   附加上下文，如图像、实现功能的资源链接等。