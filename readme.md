## Github Readme stats

Get dynamically generated github stats on your readmes!

## How to use

Copy paste this into your markdown content and thats it. simple!

change the `?username=` value to your GitHubs's username

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)
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

## Demo

- Default

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Hiding specific stats

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- Showing icons

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

Contributions are welcomed! <3

Made with :heart: and javascript.
