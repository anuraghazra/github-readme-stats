<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">동적으로 생성된 Github의 통계를 여러분의 README에 올려보세요!</p>
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
    <a href="#데모">View Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Request Feature</a>
  </p>
  <p align="center">
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
    <a href="/docs/readme_kr.md">한국어</a>
  </p>
</p>
<p align="center">이 프로젝트가 마음에 드나요? 괜찮으시다면 더 나은 개선을 위해 <a href="https://www.paypal.me/anuraghazra">기부</a>를 고려해주세요!

# Features

- [GitHub Stats Card](#github-stats-card)
- [GitHub Extra Pins](#github-extra-pins)
- [상위 언어 카드](#상위-언어-카드)
- [테마](#테마)
- [사용자정의](#사용자정의)
- [직접 배포하기](#자체-Vercel-인스턴스에-배포하기)

# GitHub Stats Card

아래 코드를 복사해서 당신의 마크다운 파일에 넣으면 됩니다. 간단합니다!

`?username=` 영역의 값은 당신의 Github 계정의 이름으로 바꿔주세요.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_참고: 순위는 사용자의 통계를 기반으로 계산됩니다. [src/calculateRank.js](../src/calculateRank.js) 참고_

### 개별 통계 숨기기

특정 통계를 숨기려면 콤마로 구분된 값을 `?hide=` 쿼리 파라미터 값으로 나열하면 됩니다.

> 예시: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### 총 커밋 수에 private 컨트리뷰트 개수 추가하기

`?count_private=true` 쿼리 파라미터를 사용하면 총 커밋 수에 private 컨트리뷰트 개수를 추가할 수 있습니다.

_참고: 이 프로젝트를 직접 배포하는 경우 private 컨트리뷰트는 기본적으로 계산됩니다. 그렇지 않은 경우 private 컨트리뷰트 개수를 추가하도록 설정해야 합니다._

> 예시: `&count_private=true`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### 아이콘 표기

아이콘을 활성화하려면 다음과 같이 `show_icons=true` 쿼리 파라미터를 사용하세요.

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### 테마

내장된 테마를 사용하여 수동 [사용자정의](#사용자정의)할 필요 없이 카드의 모양을 커스터마이징할 수 있습니다.

아래와 같이 `?theme=THEME_NAME` 파라미터를 사용하세요. :-

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### 모든 내장된 테마 :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

[사용 가능한 모든 테마](../themes/README.md)의 미리보기와 [테마 설정 파일](../themes/index.js)을 확인할 수 있습니다. 괜찮으시다면 **새로운 테마를 만드셔서, 코드를 기여** 해주세요 :D

### 사용자정의

URL 파라미터를 사용하여 원하는대로 `Stats Card` 또는 `Repo Card` 모양을 사용자 정의할 수 있습니다.

#### Common Options:

- `title_color` - 카드 제목 색상 _(hex color)_
- `text_color` - 본문 글자 색상 _(hex color)_
- `icon_color` - 아이콘 색상(활성화된 경우) _(hex color)_
- `bg_color` - 카드 배경 색상 _(hex color)_
- `theme` - 테마의 이름, [사용 가능한 모든 테마](../themes/README.md)에서 선택
- `cache_seconds` - 캐시 헤더를 수동으로 설정 _(min: 1800, max: 86400)_

> 캐시 관련 참고: Repo 카드는 fork 개수와 star 카운트가 1천 개 미만인 경우 기본 캐시가 30분(1800초)이고, 그렇지 않은 경우 2시간(7200초) 입니다. 또한 캐시는 최소 30분 및 최대 24시간으로 고정됩니다.

#### Stats Card의 제외 옵션:

- `hide` - 통계에서 특정 항목을 제외한다. _(콤마로 구분된 값)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_
- `show_icons` - _(boolean)_
- `include_all_commits` - 현재 년도 대신 전체 커밋 개수 카운트 _(boolean)_
- `count_private` - private 커밋도 카운트 _(boolean)_
- `line_height` - 글자 사이의 line-height 값 설정(자간) _(number)_

#### Repo Card의 제외 옵션:

- `show_owner` - repo의 소유자 이름 표기 _(boolean)_

#### Language Card의 제외 옵션:

- `hide` - 카드에서 특정 언어 숨기기 _(콤마로 구분된 값)_
- `hide_title` - _(boolean)_
- `layout` - `default` & `compact` 레이아웃 간의 전환
- `card_width` - 카드의 너비를 수동으로 설정 _(숫자)_

> :warning: **중요:**  
> 언어 이름은 URI 이스케이프 처리되어야 합니다. [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)를 참고하세요.
> (i.e: `c++` 는 `c%2B%2B`, `jupyter notebook` 는 `jupyter%20notebook`, etc.)

---

# GitHub Extra Pins

GitHub extra pins을 사용하면 Github readme 프로필에 6개 이상의 저장소를 고정할 수 있습니다.
그렇습니다! 더 이상 고정된 6개의 저장소로 제한되지 않습니다.

### 사용법

이 코드를 복사해서 readme에 넣고 링크를 변경해주세요.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### 데모

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

[show_owner](#사용자정의) 값을 사용하여 저장소 소유자 이름을 포함할 수 있습니다.

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 상위 언어 카드

상위 언어 카드는 그 Github 사용자가 가장 많이 사용하고 있는 언어가 표시됩니다.

_참고: Top languages는 사용자의 기술 수준을 나타내는 것이 아니라 GitHub에서 어떤 언어로 코드를 많이 작성하는지 나타내는 Github 지표이며 github-readme-stats의 새로운 기능입니다._

### 사용법

이 코드를 복사해서 readme에 넣고 링크를 변경해주세요.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 개별 언어 숨기기

`?hide=language1,language2` 파라미터를 사용하여 특정 언어를 숨길 수 있습니다.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 컴팩트 언어 카드 레이아웃

`&layout=compact` 파라미터를 사용하여 카드의 디자인을 변경할 수 있습니다.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### 데모

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 컴팩트 레이아웃

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 모든 데모

- 기본 설정

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 특정 통계 숨김

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 아이콘 표기

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 모든 커밋 표기

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 테마

[default themes](#테마)에서 선택

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Stats 카드 사용자 정의

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Repo 카드 사용자 정의

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 상위 언어

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### 꿀팁 (Repo 카드 정렬)

일반적으로 사진을 나란히 배치할 수 없습니다. 따라서 다음과 같은 방법을 사용할 수 있습니다.

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 자체 Vercel 인스턴스에 배포하기

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Github API는 시간당 5k 요청만을 허용하기 때문에, 이 `https://github-readme-stats.vercel.app/api`이 제한에 도달할 수 있습니다.
물론 자신의 Vercel 서버에서 호스팅하는 것이라면 아무것도 걱정할 필요가 없습니다. 시작하려면 배포 버튼을 클릭하세요!

참고: [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 이슈 이후로는 5k 이상의 요청을 처리할 수 있게 되어, 다운 타임의 문제가 발생하지 않습니다 :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Guide on setting up Vercel  🔨 </b></summary>

1. [vercel.com](https://vercel.com/)에 접속하세요.
1. `Log in` 클릭합니다.
   ![](https://files.catbox.moe/tct1wg.png)
1. `Continue with GitHub` 를 클릭하여 Github로 로그인하세요.
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Github에 로그인하고 메시지가 표시되면 모든 저장소에 대한 접근을 허용합니다.
1. 이 저장소를 fork 합니다.
1. [Vercel dashboard](https://vercel.com/dashboard)로 돌아갑니다.
1. `Import Project` 를 선택합니다.
   ![](https://files.catbox.moe/qckos0.png)
1. `Import Git Repository` 를 선택합니다.
   ![](https://files.catbox.moe/pqub9q.png)
1. 루트를 선택한 다음에 다른 것들은 그대로 두고 PAT_1 이라는 환경 변수(아래처럼)를 추가합니다. 여기에는 개인 접근 토큰(PAT)이 포함되며, 토큰은 [여기](https://github.com/settings/tokens/new)에서 쉽게 만들 수 있습니다. (모두 그대로 두고, 이름만 지정하면 됩니다.)
   ![](https://files.catbox.moe/0ez4g7.png)
1. 배포를 클릭하면 완료됩니다. API를 사용하기 위해 당신의 도메인을 참조하세요!

</details>

## :sparkling_heart: 프로젝트 후원

저는 제가 할 수 있는 거의 모든 것을 오픈소스로 제공하고, 이 프로젝트를 사용하면서 도움이 필요한 분들에게 회신하려고 합니다.
분명한 것은, 이는 시간이 걸리는 일입니다. 하지만 여러분은 이 서비스를 무료로 사용할 수 있습니다.

하지만 여러분이 이 프로젝트를 사용하고 거기에 만족한다면, 아니면 제가 하는 활동을 격려하고자 싶다면 몇가지 방법이 있습니다. :-

- readme에서 github-readme-stats를 사용하고 다시 링크해주세요 :D
- star를 눌러주거나 이 프로젝트를 공유해주세요. :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - PayPal을 통해서 일회성 기부를 할 수 있습니다. 저는 아마 ~~커피~~ 차를 살겁니다.

고맙습니다! :heart:

---

코드 기여는 환영합니다!

:heart: and JavaScript로 만들어졌습니다.
