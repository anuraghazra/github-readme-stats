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
    <a href="#미리보기">미리보기 확인</a>
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
- [GitHub 저장소 핀](#github-저장소-핀)
- [언어 사용량 통계](#언어-사용량-통계)
- [Wakatime 주간 통계](#wakatime-주간-통계)
- [테마](#테마)
- [커스터마이징](#커스터마이징)
- [직접 배포하기](#나만의-Vercel-인스턴스에-직접-배포하기)


# GitHub 통계

아래 코드를 복사해서 마크다운 파일에 붙여넣으면 끝이에요, 아주 간단해요!

`?username=` 속성의 값을 Github 계정의 사용자 명(닉네임)으로 바꿔주세요.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_참고:_

_랭크는 S+ (상위 1%), S (상위 25%), A++ (상위 45%), A+ (상위 60%), 그리고 B+ (전체) 로 구성되어 있습니다._

_커밋의 수(commits), 기여도(contribution), 이슈의 수(issues), 즐겨찾기(star), 작업내용 반영 요청(Pull Request),
팔로워 수, 그리고 보유 중인 저장소 등의 항목들에 대해 [누적 분포 함수](https://ko.wikipedia.org/wiki/%EB%88%84%EC%A0%81_%EB%B6%84%ED%8F%AC_%ED%95%A8%EC%88%98) 를 이용해 계산됩니다._

_[src/calculateRank.js](./src/calculateRank.js) 에서 수행되는 계산 작업의 내용을 확인할 수 있습니다._

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

> 캐시에 대한 참고사항:
> 포크와 스타 수가 1,000 개 미만인 저장소의 카드는 기본적으로 4시간 (14,400초) 으로 설정되어 있습니다.
> 그 외에는, it's 2시간 (7,200초) 입니다. 또한, 캐시설정 시간의 범위는 최소 2시간, 최대 24시간입니다.


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

##### 경고! **매우 중요**
>
> 언어의 이름은 [퍼센트 인코딩](https://ko.wikipedia.org/wiki/%ED%8D%BC%EC%84%BC%ED%8A%B8_%EC%9D%B8%EC%BD%94%EB%94%A9) 에 지정된 URI 방식으로 표기되어야 합니다.
> ( 예를 들면, `c++` 는 `c%2B%2B`, `jupyter notebook` 는 `jupyter%20notebook`, 등등. )
> [urlencoder.org](https://www.urlencoder.org/) < 서비스를 이용하면 자동으로 생성할 수 있습니다.

#### Wakatime 카드의 표시 제한 옵션:

- `hide_title` - 타이틀 제외 _(boolean)_
- `line_height` - 텍스트 간 줄 높이 설정(자간) _(number)_
- `hide_progress` - 퍼센트와 표기바 표시 여부 _(boolean)_
- `custom_title` - 카드의 타이틀 값 설정
- `layout` - 사용 가능한 두 가지 값, `default` & `compact` 중 표시 형태 선택

---

# GitHub 저장소 핀

GitHub 저장소 여분 핀을 이용하면, 6개 이상의 저장소 핀을 여러분의 프로필에 추가할 수 있어요.

맞아요! 이제 6개 이상의 핀을 사용할 수 있어요! (핀이 부족할 일이 없답니다!)

### 사용법

이 코드를 복사해서 여러분의 README 에 넣고 링크를 변경해주세요.

엔드 포인트: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### 미리보기

[![GitHub 저장소 핀 카드](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

[show_owner](#커스터마이징) 속성을 통해 저장소 소유자의 닉네임 표시 여부를 설정할 수 있어요.

[![GitHub 저장소 핀 카드](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# 언어 사용량 통계

언어 사용량 통계 카드는 Github 사용자가 가장 많이 사용한 언어가 표시됩니다.

_참고:
언어 사용량 통계는 GitHub 에서 가장 많이 사용된 언어의 표기일 뿐입니다.
숙련도, 혹은 그와 비슷한 지표를 나타내진 않습니다. (새로 추가된 기능입니다!)_

### 사용법

이 코드를 복사해서 여러분의 README 에 넣고 링크를 변경해주세요.

엔드 포인트: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### 통계에서 제외할 저장소 지정하기

`?exclude_repo=repo1,repo2` 속성을 통해 특정 저장소를 제외할 수 있어요.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### 통계에서 특정 언어 제외하기

`?hide=language1,language2` 속성을 통해 특정 언어를 제외할 수 있어요.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### 표시할 언어 수 지정하기

`&langs_count=` 속성을 통해 카드에 표시할 언어의 수를 지정할 수 있어요. (1-10 사이, 기본 값 : 5)

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### 컴택트한 카드 레이아웃 설정하기

`&layout=compact` 속성을 통해 카드의 디자인을 변경할 수 있어요.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### 미리보기

[![언어 사용량 통계](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- 컴팩트한 레이아웃

[![언어 사용량 통계](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime 주간 통계

`?username=` 속성의 값을 [Wakatime](https://wakatime.com) 계정의 사용자 명(닉네임)으로 바꿔주세요.

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### 미리보기

[![willianrod 님의 wakatime 통계](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod 님의 wakatime 통계](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- 컴팩트한 레이아웃

[![willianrod 님의 wakatime 통계](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### 전체 미리보기

- 기본

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- 특정 통계 내용 숨김

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- 아이콘 표시

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- 전체 커밋 포함 시

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- 테마들

[내장 테마](#themes) 에서 직접 선택해보세요

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- 그라데이션 주기

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- 통계 카드 커스터마이징하기

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- 언어 사용 지역 설정하기

![Anurag 님의 GitHub 사용량 통계](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=kr)

- 저장소 핀 커스터마이징하기

![Anurag 님의 GitHub 저장소 핀](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- 언어 사용량 통계

[![언어 사용량 통계](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime 카드

[![willianrod 님의 Wakatime 카드](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### 꿀팁 (저장소 핀 정렬하기)

아마, 이미지들을 나란히 정렬할 수 없을거에요.

그럴땐, 이렇게 해보세요!

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## 나만의 Vercel 인스턴스에 직접 배포하기

#### [@codeSTACKr 님의 튜토리얼 영상 보기](https://youtu.be/n6d4KHSKqGk?t=107)

GitHub API 가 시간 당 요청 개수를 5,000회로 제한한 뒤로,
저의 `https://github-readme-stats.vercel.app/api` 가 사용량 제한에 걸릴 위험이 생겼어요.

만약, 여러분이 Vercel server 에서 직접 호스트 하신다면, 걱정하실 일은 없을거에요.

아래의 버튼을 이용해 직접 배포해보세요!

참고: [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) 풀 리퀘스트 이후로, 저희는 5,000 개 이상의 요청을 처리할 수 있게 됐어요. 더이상 서버 다운에 대한 걱정은 노놉! :D

[![Vercel 에 배포하기](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> 🔨 Vercel 세팅 가이드!   </b></summary>

1. [vercel.com](https://vercel.com/) 으로 이동하기
1. `Log in` 버튼 클릭!
   ![](https://files.catbox.moe/tct1wg.png)
1. `Continue with GitHub` 버튼을 이용해 GitHub 계정으로 가입하기
   ![](https://files.catbox.moe/btd78j.jpeg)
1. GitHub 에 로그인한 뒤, (권한을 요청한다면) 모든 저장소에 대한 권한을 허용해주세요!
1. 이 저장소를 Fork!
1. [Vercel 대시보드](https://vercel.com/dashboard) 로 돌아가세요!
1. `Import Project` 항목 선택!
   ![](https://files.catbox.moe/qckos0.png)
1. `Import Git Repository` 항목 선택!
   ![](https://files.catbox.moe/pqub9q.png)
1. 'root' 를 선택하고 넘어간 후, 아래와 같이 개인용 엑세스 토큰 (PAT) 을 저장할 환경변수를 PAT_1 의 값으로 추가해주세요. [이 곳](https://github.com/settings/tokens/new)에서 쉽게 생성할 수 있어요. (모든 항목을 그대로 두고, 이 부분만 원하는 이름으로 변경해주세요.)
   ![](https://files.catbox.moe/0ez4g7.png)
1. 마지막으로 'Deploy' 버튼을 클릭하면, 끝! => API 를 사용하기 위한 도메인 주소를 확인하세요!

</details>

## :sparkling_heart: 프로젝트 지원하기!

저는 가능한 모든 요소들을 오픈소스로 공개하고,
이 서비스를 이용하는데 도움이 필요한 모두에게 도움을 드리려 노력하고 있어요.

솔직히 말하자면, 시간이 좀 걸린답니다...
물론, 여러분이 이 서비스를 사용하는건 무료에요 ㅎ

하지만, 만약 여러분이 이 서비스를 잘 이용하시고,
만족하시거나, 제가 이런 요소들을 만드는 데에 도움을 주고 싶으시다면,
여러분께서 도와주실 수 있는 것들이 있어요!

- github-readme-stats 를 README 에 표시하실 때 확실한 도움을 주세요! 이 저장소로 링크를 걸어주시면 되요! :D
- 이 프로젝트를 많이 공유해주시고, 즐겨찾기 해주세요! :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - PayPal 을 이용해 1회성 도네이션을 해주실 수 있어요. 아마도 전 ~~커피, 아... 아니~~ 차를 사서 마시겠죠? ㅎ; :tea:

감사합니다! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](./powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

프로젝트에 대한 기여는 언제나 환영이에요! <3

Made with :heart: and JavaScript.
