# Contributing to [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

-   Reporting an issue
-   Discussing the current state of the code
-   Submitting a fix
-   Proposing new features
-   Becoming a maintainer

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
4.  Run the command "vercel" in the root and follow the steps there.
5.  Open `vercel.json` and set the maxDuration to 10.
6.  Create a `.env` file in the root of the directory.
7.  In the .env file add a new variable named "PAT_1" with your [GitHub Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
8.  Run the command "vercel dev" to start a development server at <https://localhost:3000>.

## Themes Contribution

GitHub Readme Stats supports custom theming, and you can also contribute new themes!

All you need to do is edit the [themes/index.js](./themes/index.js) file and add your theme at the end of the file.

While creating the Pull request to add a new theme **don't forget to add a screenshot of how your theme looks**, you can also test how it looks using custom URL parameters like `title_color`, `icon_color`, `bg_color`, `text_color`, `border_color`

> NOTE: If you are contributing your theme just because you are using it personally, then you can [customize the looks](./readme.md#customization) of your card with URL params instead.

## Any contributions you make will be under the MIT Software License

In short, when you submit changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

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

## License

By contributing, you agree that your contributions will be licensed under its [MIT License](./LICENSE).
