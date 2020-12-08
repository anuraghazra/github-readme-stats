<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">동적으로 생성되는 Github 사용량 통계를 여러분의 README 에 추가해보세요!</p>
</p>
  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://codecov.io/gh/anuraghazra/github-readme-stats">
      <img src="https://codecov.io/gh/anuraghazra/github-readme-stats/branch/master/graph/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stas/issues">
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
    <a href="#데모">데모 보기</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">버그 제보하기</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">기능 추가 요청하기</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français </a>
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
  </p>
</p>
<p align="center">기능들이 마음에 드시나요? 괜찮으시다면, 서비스 개선을 위해 <a href="https://www.paypal.me/anuraghazra">기부</a>를 고려해주세요!

# 기능들

- [GitHub 통계](#github-통계)
- [GitHub 저장소 여분 핀](#github-저장소-여분-핀)
- [언어 사용량 통계](#언어-사용량-통계)
- [Wakatime 주간 통계](#wakatime-주간-통계)
- [테마](#테마)
- [커스터마이징](#커스터마이징)
- [Deploy Yourself](#deploy-on-your-own-vercel-instance)

# GitHub 통계

아래 코드를 복사해서 마크다운 파일에 붙여넣으면 끝이에요, 아주 간단해요!

Github 계정의 사용자 명(닉네임)을 `?username=` 속성의 값으로 바꿔주세요.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_참고: 랭크는 S+ (상위 1%), S (상위 25%), A++ (상위 45%), A+ (상위 60%), 그리고 B+ (전체) 로 구성되어 있습니다.
값은 커밋의 수(commits), 기여도(contribution), 이슈의 수(issues), 즐겨찾기(star), 작업내용 반영 요청(Pull Request), 팔로워 수, 그리고 보유 중인 저장소 등의 항목들에 대해 [누적 분포 함수](https://ko.wikipedia.org/wiki/%EB%88%84%EC%A0%81_%EB%B6%84%ED%8F%AC_%ED%95%A8%EC%88%98) 를 이용해 계산됩니다.
[src/calculateRank.js](./src/calculateRank.js) 에서 수행되는 계산 작업의 내용을 확인할 수 있습니다._

### 개별 통계 숨기기

특정 통계를 숨기려면 `콤마(,)`로 구분된 값들을 `?hide=` 속성의 값으로 넣어주세요.

> 사용 가능한 항목들: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 총 커밋 수에 비공개 기여도 (private contribs) 수 추가하기

`?count_private=true` 속성을 추가하시면, 여러분의 모든 비공개 기여도까지 반영됩니다.

_참고: 프로젝트를 직접 배포하신 경우, 비공개 기여도는 기본적으로 반영됩니다. 원하지 않는 경우엔 직접 설정해야 합니다._

> 예시: `&count_private=true`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 아이콘 표시하기

아이콘 항목을 활성화 하기 위해선, 다음과 같이 `show_icons=true` 속성을 추가해주세요.

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 테마 설정하기

내장 테마를 사용하시면, 별도의 [커스터마이징](#커스터마이징) 없이 GitHub 통계 카드를 꾸미실 수 있어요.

다음과 같이 `?theme=THEME_NAME` 속성을 이용해주세요.

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 지원하는 내장 테마 목록

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

[사용 가능한 모든 테마](./themes/README.md) 에서 미리보기를 확인하실 수 있어요.

원하신다면 [테마 설정하기](./themes/index.js) 항목에서  **새로운 테마를 직접 만드실수 있어요.** :D

### 커스터마이징

여러가지 추가 속성을 통해, 원하는대로 `Stats Card` 또는 `Repo Card` 모양을 커스터마이징할 수 있어요.

#### 기본 옵션:

- `title_color` - 카드 타이틀 색상 _(hex color)_
- `text_color` - 카드 본문 글씨 색상 _(hex color)_
- `icon_color` - 아이콘 색상 (활성화된 경우) _(hex color)_
- `bg_color` - 카드의 배경 색상 _(hex color)_ **혹은** 다음 양식으로 그라데이션 주기 _angle,start,end_
- `hide_border` - 카드의 테두리 표시 여부 _(boolean)_
- `theme` - 테마의 이름, [사용 가능한 모든 테마](./themes/README.md) 에서 선택
- `cache_seconds` - 수동으로 캐시 헤더 설정 _(min: 1800, max: 86400)_
- `locale` - 카드에 표시할 언어 _(e.g. kr, cn, de, es, etc.)_

##### 배경에 그라데이션 주기

그라데이션이 적용된 카드를 표시하고 싶으시다면, 여러가지 쉼표(,) 로 구분된 값을 추가할 수 있어요.

양식은 다음과 같습니다.

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> 캐시에 대한 참고사항: 포크와 스타 수가 1,000 개 미만인 저장소의 카드는 기본적으로 4시간 (14,400초) 으로 설정되어 있습니다. 그 외에는, it's 2시간 (7,200초) 입니다. 또한, 캐시설정 시간의 범위는 최소 2시간, 최대 24시간입니다.

#### 통계 카드의 표시 제한 옵션:

- `hide` - 통계에서 특정한 값 제외 _(Comma-separated values)_
- `hide_title` - 타이틀 표시 여부 _(boolean)_
- `hide_rank` - 랭크 표시 여부 _(boolean)_
- `hide_border` - 테두리 표시 여부 _(boolean)_
- `show_icons` - 아이콘 표시 여부 _(boolean)_
- `include_all_commits` - 올해가 아닌 전체 연도에 대한 커밋 포함 여부 _(boolean)_
- `count_private` - 비공개 기여도 포함 여부 _(boolean)_
- `line_height` - 텍스트 간 줄 높이 설정(자간) _(number)_
- `custom_title` - 카드의 타이틀 값 설정
- `disable_animations` - 카드의 모든 에니메이션 활성 여부 _(boolean)_

#### 저장소 카드의 표시 제한 옵션:

- `show_owner` - 저장소 소유자 닉네임 표기 여부 _(boolean)_

#### 언어 사용량 통계 카드의 표시 제한 옵션:

- `hide` - 카드에서 특정 언어 제외 _(Comma-separated values)_
- `hide_title` - 타이틀 제외 _(boolean)_
- `hide_border` - 테두리 제외 _(boolean)_
- `layout` - 사용 가능한 두 가지 값, `default` & `compact` 중 표시 형태 선택
- `card_width` - 카드 너비 직접 설정 _(number)_
- `langs_count` - 카드에 표시할 언어의 수 (1-10 사이, 기본 값 : 5) _(number)_
- `exclude_repo` - 통계에 제외할 저장소 지정 _(Comma-separated values)_
- `custom_title` - 카드의 타이틀 값 설정

> :경고: **매우 중요:**
> 언어의 이름은 [퍼센트 인코딩](https://ko.wikipedia.org/wiki/%ED%8D%BC%EC%84%BC%ED%8A%B8_%EC%9D%B8%EC%BD%94%EB%94%A9) 에 지정된 URI 방식으로 표기되어야 합니다. 
> (예를 들면, `c++` 는 `c%2B%2B`, `jupyter notebook` 는 `jupyter%20notebook`, 등등.)
> [urlencoder.org](https://www.urlencoder.org/) < 서비스를 이용하면 자동으로 생성할 수 있습니다.

#### Wakatime 카드의 표시 제한 옵션:

- `hide_title` - 타이틀 제외 _(boolean)_
- `line_height` - 텍스트 간 줄 높이 설정(자간) _(number)_
- `hide_progress` - 퍼센트와 표기바 표시 여부 _(boolean)_
- `custom_title` - 카드의 타이틀 값 설정
- `layout` - 사용 가능한 두 가지 값, `default` & `compact` 중 표시 형태 선택

---

# GitHub 저장소 여분 핀

GitHub extra pins allow you to pin more than 6 repositories in your profile using a GitHub readme profile.

Yay! You are no longer limited to 6 pinned repositories.

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Use [show_owner](#customization) variable to include the repo's owner username

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Top Languages Card

The top languages card shows a GitHub user's top languages which have used the most.

_NOTE: Top Languages does not indicate my skill level or anything like that, it's a GitHub metric of which languages have the most code on GitHub. It's a new feature of github-readme-stats._

### Usage

Copy-paste this code into your readme and change the links.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Exclude individual repositories

You can use `?exclude_repo=repo1,repo2` parameter to exclude individual repositories.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### Hide individual languages

You can use `?hide=language1,language2` parameter to hide individual languages.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Show more languages

You can use the `&langs_count=` option to increase or decrease the number of languages shown on the card. Valid values are integers between 1 and 10 (inclusive), and the default is 5.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### Compact Language Card Layout

You can use the `&layout=compact` option to change the card design.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Compact layout

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime Week Stats

Change the `?username=` value to your [Wakatime](https://wakatime.com) username.

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- Compact layout

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### All Demos

- Default

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Hiding specific stats

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Showing icons

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Include All Commits

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Themes

Choose from any of the [default themes](#themes)

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Gradient

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Customizing stats card

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Setting card locale

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- Customizing repo card

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Top languages

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime card

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### Quick Tip (Align The Repo Cards)

You usually won't be able to layout the images side by side. To do that you can use this approach:

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Deploy on your own Vercel instance

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Since the GitHub API only allows 5k requests per hour, my `https://github-readme-stats.vercel.app/api` could possibly hit the rate limiter. If you host it on your own Vercel server, then you don't have to worry about anything. Click on the deploy button to get started!

NOTE: Since [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) we should be able to handle more than 5k requests and have no issues with downtime :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Guide on setting up Vercel  🔨 </b></summary>

1. Go to [vercel.com](https://vercel.com/)
1. Click on `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. Sign in with GitHub by pressing `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Sign into GitHub and allow access to all repositories, if prompted
1. Fork this repo
1. Go back to your [Vercel dashboard](https://vercel.com/dashboard)
1. Select `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. Select `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. Select root and keep everything as is, just add your environment variable named PAT_1 (as shown), which will contain a personal access token (PAT), which you can easily create [here](https://github.com/settings/tokens/new) (leave everything as is, just name it something, it can be anything you want)
   ![](https://files.catbox.moe/0ez4g7.png)
1. Click deploy, and you're good to go. See your domains to use the API!

</details>

## :sparkling_heart: Support the project

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can use this service for free.

However, if you are using this project and happy with it or just want to encourage me to continue creating stuff, there are few ways you can do it :-

- Giving proper credit when you use github-readme-stats on your readme, linking back to it :D
- Starring and sharing the project :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:

Thanks! :heart:

---

![https://vercel.com](https://res.cloudinary.com/anuraghazra/image/upload/v1597827714/powered-by-vercel_1_ug4uro.svg)

Contributions are welcome! <3

Made with :heart: and JavaScript.
