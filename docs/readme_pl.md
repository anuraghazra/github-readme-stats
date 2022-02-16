<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Statystyki</h2>
 <p align="center">Otrzymuj dynamicznie generowane statystyki GitHub na swoich readmes!</p>
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
    <a href="#demo">Zobacz demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Zgłoś bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Zaproponuj feature</a>
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
    .
    <a href="/docs/readme_np.md">नेपाली</a>
    .
    <a href="/docs/readme_tr.md">Türkçe</a>
    .
    <a href="/docs/readme_pl.md">Polski</a>
  </p>
</p>
<p align="center">Podoba ci się projekt? Proszę, rozważ <a href="https://www.paypal.me/anuraghazra">donate</a>, aby pomóc to ulepszać!


<p>
<a href="https://indiafightscorona.giveindia.org">
<img src="https://d2wvdrxmr8p0wf.cloudfront.net/static/giveindia.svg" alt="Give india logo" width="200" />
</a>

Zastanawiasz się nad wsparciem projektu przekazując mi darowiznę? Proszę NIE!! 

Zamiast tego pomóż Indiom w walce z drugą śmiertelną falą COVID.  
Tysiące ludzi umiera w Indiach z powodu braku niezbędnej infrastruktury związanej z tlenem i dotyczącej walki z COVID.  

Odwiedź [https://indiafightscorona.giveindia.org](https://indiafightscorona.giveindia.org) i przekaż niewielką darowiznę, aby pomóc nam walczyć z COVID i przezwyciężyć ten kryzys.   
Twoja niewielka pomoc ma ogromne znaczenie. :heart:
</p>


# Funkcjonalności

- [Karta statystyk GitHub](#karta-statystyk-github)
- [Dodatkowe przypinki GitHub](#dodatkowe-przypinki-github)
- [Karta głównych języków](#karta-głównych-języków)
- [Wakatime Week Stats](#wakatime-week-stats)
- [Motywy](#motywy)
- [Dostosowywanie](#dostosowywanie)
  - [Typowe opcje](#typowe-opcje)
  - [Ekskluzywne opcje statystyk karty](#ekskluzywne-opcje-statystyk-karty)
  - [Ekskluzywne opcje kart repo](#ekskluzywne-opcje-kart-repo)
  - [Ekskluzywne opcje karty języków](#ekskluzywne-opcje-karty-języków)
  - [Ekskluzywne opcje karty Wakatime](#ekskluzywne-opcje-karty-wakatime)
- [Własny deploy](#wdróż-na-własnej-instancji-vercel)

# Karta statystyk GitHub

Skopiuj i wklej to do treści pliku Markdown, i to wszystko. Proste!

Zmień wartość `?username=` na swoją nazwę użytkownika GitHub.

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Notka: Dostępne stopnie to S+ (top 1%), S (top 25%), A++ (top 45%), A+ (top 60%), and B+ (wszyscy).
Wartości są obliczane za pomocą [dystrybuanty](https://pl.wikipedia.org/wiki/Dystrybuanta) używając commits, contributions, issues, stars, pull requests, followers, i posiadanych repo.
Implementację można sprawdzić w [src/calculateRank.js](./src/calculateRank.js)_

### Ukrywanie indywidualnych statystyk

Aby ukryć określone statystyki, możesz podać parametr zapytania `?hide=` z wartościami oddzielonymi przecinkami.

> Opcje: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Dodawanie licznika prywatnych wkładów do całkowitej liczby commitów

Możesz dodać licznik wszystkich swoich prywatnych wkładów do całkowitej liczby commitów, używając parametru zapytania `?count_private=true`.

_Notka: Jeśli samodzielnie wdrażasz ten projekt, wkłady prywatne będą liczone domyślnie. W przeciwnym razie musisz wybrać, czy chcesz udostępnić swój licznik wkładów prywatnych._

> Opcje: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Wyświetlanie ikon

Aby włączyć ikony, możesz przekazać `show_icons=true` w parametrze zapytania, na przykład tak:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Motywy

Dzięki wbudowanym motywom możesz dostosować wygląd karty bez wykonywania jakiegokolwiek [dostosowania ręcznego](#dostosowywanie).

Użyj parametru `&theme=THEME_NAME`, tak jak :-

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Wszystkie wbudowane motywy :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stats Themes" width="600px"/>

Możesz rzucić okiem na podgląd [wszystkich dostępnych motywów](./themes/README.md) lub sprawdzić [theme config file](./themes/index.js) & **możesz również dodać nowe motywy**, jeśli chcesz :D

### Dostosowywanie

Możesz dostosować wygląd swojej `Karty statystyk` lub `Karty Repo` za pomocą parametrów dla URL.

#### Typowe opcje:

- `title_color` - Kolor tytułu karty _(kolor w hex)_
- `text_color` - Kolor tekstu części body _(kolor w hex)_
- `icon_color` - Kolor ikon, jeśli jest dostępny _(kolor w hex)_
- `border_color` - Kolor obramowania karty _(kolor w hex)_. (Nie dotyczy, gdy `hide_border` jest włączone)
- `bg_color` - Kolor tła karty _(kolor w hex)_ **lub** gradient w postaci _angle,start,end_
- `hide_border` - Ukrywanie obramowania karty _(boolean)_
- `theme` - Nazwa motywu, wybierz spośród [wszystkich dostępnych motywów](./themes/README.md)
- `cache_seconds` - Ustaw ręcznie cache header _(min: 1800, max: 86400)_
- `locale` - Ustaw język na karcie _(np. cn, de, es, etc.)_
- `border_radius` - Zaokrąglanie rogów na karcie

##### Gradient w bg_color

Możesz podać wiele wartości oddzielonych przecinkami w opcji bg_color aby renderować gradient, format gradientu to :-

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> Notka odnośnie cache: Karty repo mają domyślną pamięć podręczną wynoszącą 4 godziny (14400 sekund) jeśli liczba forków i liczba gwiazdek jest mniejsza niż 1k, w przeciwnym razie są to 2 godziny (7200 sekund). Pamiętaj też, że pamięć podręczna jest ograniczona do minimum 2 godzin, a maksymalnie 24 godzin.

#### Ekskluzywne opcje statystyk karty:

- `hide` - Ukrywa określone elementy ze statystyk _(Wartości oddzielone przecinkami)_
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_ ukrywa rangę i automatycznie zmienia rozmiar szerokości karty
- `show_icons` - _(boolean)_
- `include_all_commits` - Liczenie wszystkich commitów zamiast tylko bieżącego roku _(boolean)_
- `count_private` - CLiczenie prywatnych commitów _(boolean)_
- `line_height` - Ustawia wysokość linii między tekstem _(liczba)_
- `custom_title` - Ustawia własny tytuł karty
- `disable_animations` - Wyłącza wszystkie animacje na karcie _(boolean)_

#### Ekskluzywne opcje kart repo:

- `show_owner` - Pokaż nazwę właściciela repozytorium _(boolean)_

#### Ekskluzywne opcje karty języków:

- `hide` - Ukryj określone języki na karcie _(Wartości oddzielone przecinkami)_
- `hide_title` - _(boolean)_
- `layout` - Przełączaj się między dwoma dostępnymi układami `default` & `compact`
- `card_width` - Ustaw ręcznie szerokość karty _(liczba)_
- `langs_count` - Pokaż więcej języków na karcie, między 1-10, domyślnie 5 _(liczba)_
- `exclude_repo` - Wyklucz określone repozytoria _(Wartości oddzielone przecinkami)_
- `custom_title` - Ustawia własny tytuł karty

> :ostrzeżenie: **Ważne:**
> Nazwy języków powinny mieć uri, jak określono w [Kodowaniu procentowym](https://pl.wikipedia.org/wiki/Kodowanie_procentowe)
> (np: `c++` powinno stać się `c%2B%2B`, `jupyter notebook` powinno stać się `jupyter%20notebook`, etc.) Możesz użyć
> [urlencoder.org](https://www.urlencoder.org/) aby pomóc ci zrobić to automatycznie.

#### Ekskluzywne opcje karty Wakatime:

- `hide` - Ukryj określone języki na karcie _(Wartości oddzielone przecinkami)_
- `hide_title` - _(boolean)_
- `line_height` - Ustawia wysokość linii między tekstem _(liczba)_
- `hide_progress` - Ukrywa pasek postępu i procent _(boolean)_
- `custom_title` - Ustawia własny tytuł karty
- `layout` - Przełączaj się między dwoma dostępnymi układami `default` & `compact`
- `langs_count` - Ogranicz liczbę języków na karcie, domyślnie wszystkie zgłaszane języki
- `api_domain` - Ustaw niestandardową domenę API dla karty, np. korzystanie z usług takich jake [Hakatime](https://github.com/mujx/hakatime) lub [Wakapi](https://github.com/muety/wakapi)
- `range` – Requestuj o zakres inny niż domyślny WakaTime, np. `last_7_days`. Zobacz [dokumentację WakaTime API](https://wakatime.com/developers#stats) aby zobaczyć listę dostępnych opcji.

---

# Dodatkowe przypinki GitHub

Dodatkowe przypinki GitHub umożliwiają przypięcie więcej niż 6 repozytoriów w twoim profilu za pomocą profilu readme GitHub.

Yay! Nie jesteś już ograniczony do 6 przypiętych repozytoriów.

### Stosowanie

Skopiuj i wklej ten kod do pliku readme, i zmień linki.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Użyj zmiennej [show_owner](#dostosowywanie) aby dołączyć nazwę użytkownika właściciela repozytorium

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Karta głównych języków

Karta topowych języków pokazuje najczęściej używany język główny użytkownika GitHub.

_NOTKA: Top Languages nie wskazuje mojego poziomu umiejętności ani nic podobnego; jest to metryka GitHub określająca, które języki mają najwięcej kodu w GitHub. To nowa funkcja github-readme-stats._

### Stosowanie

Skopiuj i wklej ten kod do pliku readme i zmień linki.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Wyklucz pojedyncze repozytoria

Możesz użyć parametru `?exclude_repo=repo1,repo2` aby wykluczyć poszczególne repozytoria.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### Ukryj poszczególne języki

Możesz użyć parametru `?hide=language1,language2` aby ukryć poszczególne języki.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Pokaż więcej języków

Możesz użyć opcji `&langs_count=` aby zwiększyć lub zmniejszyć liczbę języków pokazanych na karcie. Prawidłowe wartości to liczby całkowite od 1 do 10 (włącznie), a domyślna to 5.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### Kompaktowy układ karty językowej

Możesz użyć opcji `&layout=compact` aby zmienić projekt karty.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Układ kompaktowy

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Statystyki tygodnia Wakatime

Zmień wartość `?username=` na swoją nazwę użytkownika [Wakatime](https://wakatime.com).

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Demo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- Układ kompaktowy

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Wszystkie dema

- Domyślnie

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Ukrywanie konkretnych statystyk

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Wyświetlanie ikon

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Dostosowywanie koloru obramowania

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

- Zawieranie wszystkich commitów

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Motywy

Wybierz jeden z [motywów domyślnych](#motywy)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Gradient

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Dostosowywanie karty statystyk

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Ustawienia regionalne karty

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- Dostosowywanie karty repo

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Najpopularniejsze języki

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Karta Wakatime

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### Szybka wskazówka (Wyrównaj karty repo)

Zwykle nie będziesz w stanie ustawić obrazów obok siebie. Aby to zrobić, możesz użyć tego podejścia:

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Wdróż na własnej instancji Vercel

#### [Sprawdź samouczek wideo krok po kroku autorstwa @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Ponieważ interfejs API GitHub umożliwia tylko 5 tys. żądań na godzinę, moje `https://github-readme-stats.vercel.app/api` może prawdopodobnie osiągnąć limit. Jeśli hostujesz go na własnym serwerze Vercel, nie musisz się o nic martwić. Kliknij przycisk wdrażania, aby rozpocząć!

NOTKA: Od [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) powinniśmy być w stanie obsłużyć ponad 5 tys. żądań i nie będziemy mieć problemów z przestojami :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Przewodnik po konfiguracji Vercel  🔨 </b></summary>

1. Przejdź na [vercel.com](https://vercel.com/)
1. Kliknij `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. Zaloguj się za pomocą GitHub, naciskając `Kontynuuj z GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Zaloguj się do GitHub i zezwól na dostęp do wszystkich repozytoriów, jeśli zostaniesz o to poproszony
1. Zrób forka tego repo
1. Po forku tego repo, otwórz plik [`vercel.json`](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json#L5) i zmień pole `maxDuration` na `10`
1. Wróc na swój [Vercel dashboard](https://vercel.com/dashboard)
1. Wybierz `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. Wybierz `Import Git Repository`. Wybierz root i zachowaj wszystko tak, jak jest.
   ![](https://files.catbox.moe/pqub9q.png)
1. Utwórz osobisty token dostępu (PAT) [here](https://github.com/settings/tokens/new) i włącz uprawnienia `repo` (umożliwia to dostęp do prywatnych statystyk repo)
1. Dodaj PAT jako zmienną środowiskową o nazwie `PAT_1` (jak pokazano).
   ![](https://files.catbox.moe/0ez4g7.png)
1. Kliknij Wdróż i gotowe. Zobacz swoje domeny, aby skorzystać z API!

</details>

## :sparkling_heart: Wesprzyj projekt

Udostępniam prawie wszystko, co mogę i staram się odpowiadać każdemu, kto potrzebuje pomocy, korzystając z tych projektów. Oczywiście,
to wymaga czasu. Możesz korzystać z tej usługi za darmo.

Jeśli jednak korzystasz z tego projektu i jesteś z niego zadowolony lub po prostu chcesz zachęcić mnie do dalszego tworzenia rzeczy, możesz to zrobić na kilka sposobów :-

- Przyznawanie odpowiedniego uznania, gdy używasz github-readme-stats w swoim pliku readme, linkując do niego :D
- Dawanie gwiazdki i udostępnianie tego projektu :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Jednorazową darowiznę możesz dokonać przez PayPal. Prawdopodobnie kupię ~~coffee~~ herbatę. :tea:

Dzięki! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](./powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)


Wszelkie contributions są mile widziane! <3

Stworzone z :heart: i JavaScript.
