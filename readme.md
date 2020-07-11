## Github Readme stats

Get dynamically generated GitHub stats on your readmes!

# Features

- [Github Stats Card](#github-stats-card)
- [Github Extra Pins](#github-extra-pins)
- [Deploy Yourself](#deploy-on-your-own-vercel-instance)

# Github Stats Card

Copy paste this into your markdown content, and that's it. Simple!

change the `?username=` value to your GitHubs's username

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Hiding individual stats

To hide any specific stats, you can pass a query parameter `?hide=` with an array of items, you wanna hide.

> Options: `&hide=["stars","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### Showing icons

To enable icons, you can pass `show_icons=true` in the query param like so

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

Other options:

- `&hide_border=true` hide the border box if you don't like it :D.
- `&line_height=30` control the line-height between text.

### Demo

- Default

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Hiding specific stats

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- Showing icons

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

# Github Extra Pins

Github extra pins allow you to pin more than 6 repositories in your profile using a GitHub readme profile.

Yey! you are no longer limited to 6 pinned repositories.

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

### Quick Tip (Align The Repo Cards)

You usually won't be able to layout the images side by side to do that you can use this approach

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Deploy on your own vercel instance

Since Github API only allows 5k requests per hour it is possible that my `https://github-readme-stats.vercel.app/api` could hit the rate limiter thats why if you want to host it on your own vercel server then you don't have to worry about anything. click on the deploy button to get started

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

Make sure to add your own `GITHUB_TOKEN` in `Environment Variables`  
[Github Docs: Creating a github personal token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

Contributions are welcomed! <3

Made with :heart: and javascript.
