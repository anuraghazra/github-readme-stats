# Contributing to [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

> [!IMPORTANT]
> Please note that we are NOT participating in Hacktoberfest this year. As a small team, we cannot handle the increased volume of PRs and issues that the event brings. We appreciate your understanding.

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

-   Reporting [an issue](https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=bug&template=bug_report.yml).
-   [Discussing](https://github.com/anuraghazra/github-readme-stats/discussions) the current state of the code.
-   Submitting [a fix](https://github.com/anuraghazra/github-readme-stats/compare).
-   Proposing [new features](https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=enhancement&template=feature_request.yml).
-   Becoming a maintainer.

## All Changes Happen Through Pull Requests

Pull requests are the best way to propose changes. We actively welcome your pull requests:

1.  Fork the repo and create your branch from `master`.
2.  If you've added code that should be tested, add some tests' examples.
3.  If you've changed APIs, update the documentation.
4.  Issue that pull request!

## Under the hood of github-readme-stats

Interested in diving deeper into understanding how github-readme-stats works?

[Bohdan](https://github.com/Bogdan-Lyashenko) wrote a fantastic in-depth post about it, check it out:

**[Under the hood of github-readme-stats project](https://codecrumbs.io/library/github-readme-stats)**

## Local Development

To run & test github-readme-stats, you need to follow a few simple steps:-
_(make sure you already have a [Vercel](https://vercel.com/) account)_

1.  Install [Vercel CLI](https://vercel.com/download).
2.  Fork the repository and clone the code to your local machine.
3.  Run `npm install` in the repository root.
4.  Run the command `vercel` in the root and follow the steps there.
5.  Run the command `vercel dev` to start a development server at <http://localhost:3000>.
6.  Create a `.env` file in the root and add the following line `NODE_ENV=development`, this will disable caching for local development.
7.  The cards will then be available from this local endpoint (i.e. `http://localhost:3000/api?username=anuraghazra`).

> [!NOTE]
> You can debug the package code in [Vscode](https://code.visualstudio.com/) by using the [Node.js: Attach to process](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_setting-up-an-attach-configuration) debug option. You can also debug any tests using the [VSCode Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest). For more information, see https://github.com/jest-community/vscode-jest/issues/912.

## Themes Contribution

We're currently paused addition of new themes to decrease maintenance efforts. All pull requests related to new themes will be closed.

> [!NOTE]
> If you are considering contributing your theme just because you are using it personally, then instead of adding it to our theme collection, you can use card [customization options](./readme.md#customization).

## Translations Contribution

GitHub Readme Stats supports multiple languages, if we are missing your language, you can contribute it! You can check the currently supported languages [here](./readme.md#available-locales).

To contribute your language you need to edit the [src/translations.js](./src/translations.js) file and add new property to each object where the key is the language code in [ISO 639-1 standard](https://www.andiamo.co.uk/resources/iso-language-codes/) and the value is the translated string.

## Any contributions you make will be under the MIT Software License

In short, when you submit changes, your submissions are understood to be under the same [MIT License](https://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report issues/bugs using GitHub's [issues](https://github.com/anuraghazra/github-readme-stats/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/anuraghazra/github-readme-stats/issues/new/choose); it's that easy!

## Frequently Asked Questions (FAQs)

**Q:** How to hide Jupyter Notebook?

> **Ans:** &hide=jupyter%20notebook

**Q:** I could not figure out how to deploy on my own Vercel instance

> **Ans:**
>
> -   docs: <https://github.com/anuraghazra/github-readme-stats/#deploy-on-your-own-vercel-instance>
> -   YT tutorial by codeSTACKr: <https://www.youtube.com/watch?v=n6d4KHSKqGk&feature=youtu.be&t=107>

**Q:** Language Card is incorrect

> **Ans:** Please read all the related issues/comments before opening any issues regarding language card stats:
>
> -   <https://github.com/anuraghazra/github-readme-stats/issues/136#issuecomment-665164174>
>
> -   <https://github.com/anuraghazra/github-readme-stats/issues/136#issuecomment-665172181>

**Q:** How to count private stats?

> **Ans:** We can only count public commits & we cannot access any other private info of any users, so it's not possible. The only way to count your personal private stats is to deploy on your own instance & use your own PAT (Personal Access Token)

### Bug Reports

**Great Bug Reports** tend to have:

-   A quick summary and/or background
-   Steps to reproduce
    -   Be specific!
    -   Share the snapshot, if possible.
    -   GitHub Readme Stats' live link
-   What actually happens
-   What you expected would happen
-   Notes (possibly including why you think this might be happening or stuff you tried that didn't work)

People _love_ thorough bug reports. I'm not even kidding.

### Feature Request

**Great Feature Requests** tend to have:

-   A quick idea summary
-   What & why do you want to add the specific feature
-   Additional context like images, links to resources to implement the feature, etc.
