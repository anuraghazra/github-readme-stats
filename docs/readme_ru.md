<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Получите динамически сгенерированную статистику прямо в вашем файле readme!</p>
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
    <a href="#demo">Показать пример</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Сообщить об ошибке</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Предложить идею</a>
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
    <a href="/docs/readme_ru.md">Русский</a>
  </p>
</p>
<p align="center">Нравится проект? Вы можете помочь его развитию в разделе <a href="https://www.paypal.me/anuraghazra">пожертвования</a>!


# Функционал

- [Карточка статистики активности на GitHub](#карточка-статистики-активности-на-github)
- [Дополнительные закреплённые репозитории GitHub](#дополнительные-закреплённые-репозитории-github)
- [Карточка наиболее используемых языков программирования](#карточка-наиболее-используемых-языков-программирования)
- [Карточка недельной активности WakaTime](#карточка-недельной-активности-wakatime)
- [Темы](#темы)
- [Персонализация](#персонализация)
  - [Стандартные параметры](#стандартные-параметры)
  - [Специальные параметры карточки статистики активности github](#специальные-параметры-карточки-статистики-активности-github)
  - [Специальные параметры карточки репозитория](#специальные-параметры-карточки-репозитория)
  - [Специальные параметры карточки наиболее используемых языков программирования](#специальные-параметры-карточки-наиболее-используемых-языков-программирования)
  - [Специальные параметры карточки недельной активности WakaTime](#специальные-параметры-карточки-недельной-активности-wakatime)
- [Развёртывание проекта с помощью Vercel](#развёртывание-проекта-с-помощью-vercel)


# Карточка статистики активности на GitHub

Скопируйте это в ваш markdown-файл на странице вашего аккаунта GitHub. Всё просто!

Установите имя своего профиля на GitHub в параметре `?username=`.

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Примечание: доступны следующие ранги: S+ (топ 1%), S (топ 25%), A++ (топ 45%), A+ (топ 60%), и B+ (все остальные).
Диапазоны рангов были рассчитаны с помощью [кумулятивной функции распределения](https://tftwiki.ru/wiki/Cumulative_distribution_function), используя количество коммитов, вкладов, вопросов, полученных звёзд, запросов на слияние веток, количество подписчиков и собственных репозиториев.
Реализация находится в файле [src/calculateRank.js](./src/calculateRank.js)_

### Скрытие некоторой статистики

Чтобы спрятать некоторые пункты статистики в карточке, перечислите их в качестве значений параметра `?hide=` через запятую:

> Возможные параметры: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Добавление закрытых вкладов в общий счётчик коммитов

Вы можете добавить количество вкладов в закрытые репозитории к общему счётчику коммитов, установив в запрос параметр `?count_private=true`.

_Примечание: Если вы запустили этот проект самостоятельно, вклады в закрытые репозитории по умолчанию будут включены в общий счётчик. В противном случае, вам нужно решить, хотите ли вы включать вклады в закрытые репозитории в общий счётчик или нет._

> Возможные значения: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Отображение иконок

Чтобы отобразить иконки около счётчиков статистики, добавьте параметр `show_icons=true` в запрос, как показано в примере:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Темы

Применяя встроенные темы, вы сможете изменить вид карточки статистики без [изменения чего-либо вручную](#персонализация).

Используйте параметр `&theme=THEME_NAME`, как показано в примере :-

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Все встроенные темы :-

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stats Themes" width="600px"/>

Вы можете увидеть, как выглядит любая тема [здесь](../themes/README.md) или в [конфигурационном файле тем](../themes/index.js) & **вы также можете помочь в создании новых тем**, если захотите :D.

### Персонализация

Вы можете изменить вид вашей `карточки статистики` и `карточки репозитория`, добавляя соответствующие параметры к URL запросу.

#### Стандартные параметры:

- `title_color` - цвет заголовка карточки _(задаётся шестнадцатеричным числом)_ 
- `text_color` - цвет текста карточки _(задаётся шестнадцатеричным числом)_
- `icon_color` - цвет иконки, если она есть на карточке _(задаётся шестнадцатеричным числом)_ 
- `border_color` - цвет рамки карточки _(задаётся шестнадцатеричным числом)_ (Ни на что не влияет, если рамка отключена, т.е. установлен параметр `hide_border`)
- `bg_color` - цвет заднего фона карточки _(задаётся шестнадцатеричным числом)_ **или** градиент, задаваемый параметрами _angle,start,end_.  
- `hide_border` - отключает границу карточки _(задаётся булевым значением)_
- `theme` - название используемой темы, выбираемое из [списка доступных тем](../themes/README.md)
- `cache_seconds` - позволяет вручную изменить заголовок кэша _(минимальное значение: 1800 секунд, максимальное значение: 86400 секунд)_
- `locale` - язык карточки _(например, cn, de, es, ru и т.д.)_ 
- `border_radius` - скругление углов карточки 

##### Градиент и параметр bg_color

Чтобы установить градиент в качестве заднего фона карточки, вы можете через запятую указать необходимые значения в параметре `bg_color`. Например:

```
&bg_color=угол,цвет1,цвет2,цвет3...цвет10
```

> Примечание насчёт кэширования: карточки репозитория по умолчанию кэшируются на 4 часа (или 14400 секунд), если количество форков репозитория меньше, чем 1000. В противном случае, карточка кэшируется на 2 часа (или 7200 секунд). Учтите также, кэш может храниться не менее 2 часов и не более суток.

#### Специальные параметры карточки статистики активности GitHub:

- `hide` - прячет некоторые счётчики статистики в карточке _(перечисляются через запятую)_ 
- `hide_title` - прячет заголовок карточки _(булево значение)_
- `hide_rank` - прячет ранг, при этом размер карточки автоматически изменяется под содержимое _(булево значение)_
- `show_icons` - отображает иконки около счётчиков статистики _(булево значение)_
- `include_all_commits` - отображает счётчик всех коммитов, вместо счётчика коммитов за текущий год _(булево значение)_
- `count_private` - добавляет в счётчик  количество коммитов из закрытых репозиториев  _(булево значение)_
- `line_height` -  устанавливает высоту линий текста _(число)_
- `custom_title` - устанавливает текст заголовка карточки
- `disable_animations` - отключает анимацию в карточке _(булево значение)_

#### Специальные параметры карточки репозитория:

- `show_owner` - отображает имя владельца репозитория _(булево значение)_

#### Специальные параметры карточки наиболее используемых языков программирования:

- `hide` - скрывает указанные языки программирования из карточки _(названия языков перечисляются через запятую)_ 
- `hide_title` - скрывает заголовок карточки _(булево значение)_
- `layout` -  устанавливает одну из двух доступных компоновок: стандартную `default` и компактную `compact`
- `card_width` - устанавливает ширину карточки  _(число)_
- `langs_count` - устанавливает количество отображаемых в карточке языков; доступны значения от 1 до 10. По умолчанию отображается 5 языков.
- `exclude_repo` - не учитывать статистику некоторых репозиториев _(имена репозиториев перечисляются через запятую)_ 
- `custom_title` - устанавливает заголовок карточки

> :warning: **Важно:**
> Название языков программирования должны быть записаны в формате [URI(Uniform Resource Identifier)](https://en.wikipedia.org/wiki/Percent-encoding).
> Иными словами, `C++` следует записать как `C%2B%2B`, `jupyter notebook` - как `jupyter%20notebook`и т.д.
> Необязательно переводить названия вручную. Для этого можно использовать сервис [urlencoder.org](https://www.urlencoder.org/).

#### Специальные параметры карточки недельной активности Wakatime

- `hide` - скрывает указанные языки программирования в карточке _(значения перечисляются через запятую)_
- `hide_title` - скрывает заголовок карточки _(булево значение)_
- `line_height` - устанавливает высоту линий текста  _(число)_
- `hide_progress` - скрывает индикатор прогресса и отображение процентов _(булево значение)_
- `custom_title` - устанавливает текст заголовка карточки
- `layout` - устанавливает одну из двух доступных компоновок: по умолчанию `default`, сжатая `compact`
- `langs_count` - ограничивает количество языков программирования в карточке. По умолчанию отображаются все языки
- `api_domain` - устанавливает другой сервис для сбора информации карточки, чтобы, например, использовать [Hakatime](https://github.com/mujx/hakatime) or [Wakapi](https://github.com/muety/wakapi) 
- `range` – запрашивает другой интервал времени учёта статистики, отличающийся от стандартного, т.е. от статистики за последнюю неделю `last_7_days`. За подробностями обращайтесь к [WakaTime API docs](https://wakatime.com/developers#stats)

---

# Дополнительные закреплённые репозитории GitHub 

Эта функция позволяет закрепить в профиле более 6-ти репозиториев, используя readme-файл. 

Да! Вы больше не ограничены 6-ю закрелёнными репозиториями.

### Использование

Скопируйте этот текст в ваш readme-файл, не забудьте установить ссылку на свой репозиторий.

Например: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Пример

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Установите параметр [show_owner](#персонализация), чтобы отображать имя владельца репозитория.

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Карточка наиболее используемых языков программирования

Карточка наиболее используемых языков программирования показывает, какие языки активно применяет пользователь в своих репозиториях GitHub.

_Примечание: в карточку попадают языки программирования, с помощью которых написано наибольшее количество кода. Эти данные никак не отражают уровень владения языком, лишь количество написанного кода. Это новая функция github-readme-stats._

### Использование

Скопируйте этот код в ваш readme-файл и установите в параметре `username` имя своего аккаунта.

Пример: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Не учитывать статистику некоторых репозиториев

Вы можете указать параметр `?exclude_repo=repo1,repo2`, чтобы не учитывать статистику использования языков в репозиториях `repo1` и `repo2`.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### Скрыть статистику использования некоторых языков программирования

Чтобы скрыть некоторые языки, перечислите их через запятую в параметре `?hide=language1,language2`.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Отображать больше языков программирования

Чтобы изменить число отображаемых языков в карточке, установите желаемое количество в параметр `&langs_count=`. Допустимые значения этого параметра - целые числа от 1 до 10. По умолчанию в карточке отображается 5 языков.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### Компактная разметка карточки с наиболее используемыми языками

Добавьте в запрос параметр `&layout=compact`, чтобы изменить разметку карточки.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Пример

- Стандартная компоновка

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Компактная компоновка

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Карточка недельной активности Wakatime

Установите в параметр `?username=` имя своего аккаунта на [Wakatime](https://wakatime.com).

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Пример

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- Компактная компоновка

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Все примеры

- Стандартная карточка со статистикой

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Скрытие некоторых счётчиков статистики

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Отображение иконок около счётчиков

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Настройка цвета границы карточки

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&border_color=2e4058)

- Отображение общего числа коммитов в счётчике

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Темы

Выберите любую из [встроенных тем](#темы)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Градиент

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Настройка карточки статистики

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Смена языка, используемого в карточке

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- Настройка карточки репозитория

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Список наиболее используемых языков

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Карточка недельной активности Wakatime

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### Быстрая подсказка (выравнивание в карточке репозитория)

Изначально у вас не получится расположить элементы рядом. Чтобы это сделать, используйте следующее:

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Развёртывание проекта с помощью Vercel

#### [Посмотрите видео с пошаговым руководством от @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Поскольку GitHub API позволяет обрабатывать только 5 тысяч запросов в час, мой проект `https://github-readme-stats.vercel.app/api` может превысить этот лимит. Если вы развернули собственный сервер Vercel, то вам не о чем беспокоиться. Нажмите на кнопку `deploy`, чтобы начать!

_Примечание: Начиная с [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) мы можем обрабатывать более 5 тысяч запросов в час, так что у нас больше нет проблем с превышением лимита :D_

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Руководство по установке Vercel 🔨 </b></summary>

1. Перейдите по ссылке [vercel.com](https://vercel.com/)
2. Пройдите авторизацию (`Log in`)
   ![](https://files.catbox.moe/tct1wg.png)
3. Авторизуйтесь с помощью GitHub (`Continue with GitHub`)
   ![](https://files.catbox.moe/btd78j.jpeg)
4. Войдите в аккаунт GitHub и предоставьте доступ ко всем репозиториям, если попросят.
5. Сделайте ответвление (`fork`) данного проекта 
6. Откройте файл [`vercel.json`](https://github.com/anuraghazra/github-readme-stats/blob/master/vercel.json#L5) и установите полю `maxDuration` значение `10`
7. Вернитесь к [Vercel dashboard](https://vercel.com/dashboard)
8. Импортируйте проект (`Import project`)
   ![](https://files.catbox.moe/qckos0.png)
9. Веберите `Import Git Repository`. Выберите путь копирования, остальное оставьте как есть.
   ![](https://files.catbox.moe/pqub9q.png)
10. Создайте личный жетон доступа (Personal access token) [здесь](https://github.com/settings/tokens/new), дайте необходимые разрешения для репозитория, чтобы видеть закрытую статистику репозитория.
11. Добавьте переменную окружения PAT с именем `PAT_1`, как показано в примере
   ![](https://files.catbox.moe/0ez4g7.png)
12. Выберите развёртывание (deploy). После этого вы можете начинать работу

</details>

## :sparkling_heart: Поддержите этот проект

Почти все мои проекты - это проекты с открытым исходным кодом, и я стараюсь отвечать каждому, кто нуждается в помощи при использовании этих проектов. Разумеется, это требует много свободного времени. Вы можете использовать этот инструмент бесплатно.

Однако если вы с удовольствием пользуетесь возможностями этого проекта или просто хотите поощрить меня, чтобы я и дальше развивал проекты, это можно сделать несколькими способами: 

- Указать ссылку на этот проект в readme-файлах, где вы используете его :D
- Поставить проекту звёздочку и показать его друзьям :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - вы можете сделать единоразовое пожертвование на PayPal. Возможно, я куплю себе ~~кофе~~  чай. :tea:

Спасибо! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](./powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

Мы открыты для совместной работы! <3

Сделано с :heart: и JavaScript.