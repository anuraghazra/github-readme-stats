## Github Readme stats

Get dynamically generated github stats on your readmes!

# Features

- [Github Stats Card](#github-stats-card)
- [Github Extra Pins](#github-extra-pins)

# Github Stats Card

Copy paste this into your markdown content and thats it. simple!

change the `?username=` value to your GitHubs's username

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)
```

**_Psst, you can also use this code so that `github-readme-stats` gets proper credit :D and other people can also try it out!_**

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Hiding certain stats

To hide any specific stats you can pass a query parameter `?hide=` with an array of items you wanna hide.

> Options: `&hide=["stars","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### Showing icons

To enable icons you can pass `show_icons=true` in the query param like so

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

Github extra pins allows you to pin more than 6 repositories in your profile by using github readme profile.

Yey! you are no longer limited to 6 pinned repos

### Usage

Copy paste this code into your readme and change the links.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

### Quick Tip (Align The Repo Cards)

Normally you won't be able to layout the images side by side to do that you can use this approach

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

Contributions are welcomed! <3

Made with :heart: and javascript.
