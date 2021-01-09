<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">Используйте динамически сгенерированную статистику GitHub в ваших readme файлах!</p>
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
    <a href="#demo">Смотреть Демо</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Сообщить о Баге</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Запросить Функцию</a>
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
    ·
    <a href="/docs/readme_nl.md">Nederlands</a>
    ·
    <a href="/docs/readme_tr.md">Türkçe</a>
    ·
    <a href="/docs/readme_ru.md">Русский</a>
  </p>
</p>
<p align="center">Понравился проект? Пожалуйста внесите<a href="https://www.paypal.me/anuraghazra"> донат</a>, чтобы помочь улучшить его!

# Функции

- [GitHub Карты со Статистикой](#github-stats-card)
- [GitHub Экстра Пины](#github-extra-pins)
- [Карты с Топ Языками](#top-languages-card)
- [Wakatime Недельная Статистика](#wakatime-week-stats)
- [Темы](#themes)
- [Кастомизация](#customization)
- [Внедрить Самому](#deploy-on-your-own-vercel-instance)

# GitHub Карты со Статистикой

Скопируйте и вставьте это в ваш markdown файл и всё. Так просто!

Замените `?username=` вашим GitHub имя пользователя (username).

```md
[![github статистика Анурага](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Заметка: Доступные ранги это S+ (топ 1%), S (топ 25%), A++ (топ 45%), A+ (топ 60%) и B+ (остальные).
Ранги посчитаны при помощи [функции распределения](https://ru.wikipedia.org/wiki/%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F_%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F)
используя ваши коммиты, вклады, заявления о проблемах (issues), звезды, пулл запросы (pull requests), подписчики, и репозитории.
Вы можете найти реализацию данной функции в [src/calculateRank.js](./src/calculateRank.js)_

### Спрятать определенную статистику

Чтобы спрятать определенную статистику, вы можете вписать `?hide=` в параметры вашего запроса, разделяя значения запятыми.

> Варианты: `&hide=stars,commits,prs,issues,contribs`

```md
![github статистика Анурага](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Добавить число вкладов в приватные репозитории к количеству общих вкладов

Вы можете добавить количество всех ваших вкладов в приватные репозитории к общему числу вкладов используя данный параметр в запросе `?count_private=true`.

_Заметка: Если вы внедряете данный проект самому, вклады в приватные репозитории будут посчитаны по умолчанию._

> Варианты: `&count_private=true`

```md
![github статистика Анурага](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Показать иконки

Чтобы активировать иконки, вы можете ввести `show_icons=true` в параметры запроса, как показано здесь:

```md
![github статистика Анурага](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Темы

Имея встроенные темы, вы можете кастомизировать вид вашей карты без надобности [делать это лично](#customization).

Используйте `?theme=ИМЯ_ТЕМЫ` параметр как показано здесь:

```md
![github статистика Анурага](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Все доступные встроенные темы:

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="Статистика GitHub Доступные Темы" width="600px"/>

Вы можете увидеть все [доступные темы](./themes/README.md) или увидеть [конфиг файлы тем](./themes/index.js), также вы можете **предложить свои новые темы** если желаете :D

### Кастомизация

Вы можете кастомизировать внешность ваших Карт со Статистикой (`Stats Card`) и Карт с Репозиториями (`Repo Card`) как пожелаете, используя эти URL параметры.

#### Доступные Варианты:

- `title_color` - Цвет заглавия карты _(шестнадцатеричный цвет)_
- `text_color` - Цвет текста _(шестнадцатеричный цвет)_
- `icon_color` - Цвет иконок, если имеются _(шестнадцатеричный цвет)_
- `bg_color` - Цвет фона _(шестнадцатеричный цвет)_ **или** градиент в форме _угол,начальный цвет,конечный цвет_
- `hide_border` - Убрать границы у карты _(boolean)_
- `theme` - Имя темы, выберите из [всех доступных тем](./themes/README.md)
- `cache_seconds` - Установите кэш-контроль (cache-control) вручную _(мин: 1800, макс: 86400)_
- `locale` - Установите язык карты _(например, cn, de, es, ru и т.п.)_

##### Градиент в bg_color

Вы можете использоваться несколько значений в bg_color, чтобы произвести градиент. Формат градиента должен быть таким: 

```
&bg_color=УГОЛ,ЦВЕТ1,ЦВЕТ2,ЦВЕТ3...ЦВЕТ10
```

> Заметка о кэше: Карты с Репозиториями (Repo cards) имеют по умолчанию 4 часа (14440 секунд) если количество форков и звезд меньше 1 тысячи. Иначе, они имеют 2 часа (7200 секунд). Также, заметьте, что кэш сжат к минимуму 2 часам и максимум 24 часам.

#### Эксклюзивные Варианты для Карт со Статистикой (Stats Cards):

- `hide` - Скрывает определенные элементы с карты _(Значения разделенные запятыми)_
- `hide_title` - Скрывает заглавие карты _(boolean)_
- `hide_rank` - Скрывает ранг и автоматически меняет ширину карты _(boolean)_
- `hide_border` - Скрывает границы _(boolean)_
- `show_icons` - Показывает иконки _(boolean)_
- `include_all_commits` - Считает общие количество коммиттов вместо количества коммиттов сделанных в этом году _(boolean)_
- `count_private` - Считает количество коммиттов в приватные репозитории _(boolean)_
- `line_height` - Устанавливает высоту между линиями текста _(number)_
- `custom_title` - Устанавливает кастомное заглавие для карты
- `disable_animations` - Отключает всю анимацию в карты _(boolean)_

#### Эксклюзивные Варианты для Карт с Репозиториями (Repo Cards):

- `show_owner` - Показать имя владельца репозитории _(boolean)_

#### Эксклюзивные Варианты для Карт с Языками (Language Cards):

- `hide` - Скрывает определенные языки с карты _(Значения разделенные запятыми)_
- `hide_title` - Скрывает заглавие карты _(boolean)_
- `hide_border` - Скрывает границы карты _(boolean)_
- `layout` - Переключиться между двумя доступными шаблонами `default` и `compact`
- `card_width` - Устанавливает ширину карты вручную _(number)_
- `langs_count` - Показать больше языков на карте, между 1 и 10, по умолчанию 5 _(number)_
- `exclude_repo` - Исключить определенные репозитории _(Значения разделенные запятыми)_
- `custom_title` - Устанавливает кастомное заглавие для карты

> :предупреждение: **Важно:**
> Названия языков должны быть uri-escaped, как указано в [Percent Encoding](https://en.wikipedia.org/wiki/Percent-encoding)
> (то есть: `c++` должно быть `c%2B%2B`, `jupyter notebook` должно стать `jupyter%20notebook`, т.п.) Вы можете использовать
> [urlencoder.org](https://www.urlencoder.org/), чтобы сделать это автоматически.

#### Эксклюзивные Варианты для Wakatime Карты:

- `hide_title` - Скрывает заглавие карты _(boolean)_
- `line_height` - Устанавливает высоту между линиями текста _(number)_
- `hide_progress` - Скрывает индикатор прогресса и проценты _(boolean)_
- `custom_title` - Устанавливает кастомное заглавие для карты
- `layout` - Переключиться между двумя доступными шаблонами `default` и `compact`

---

# GitHub Экстра Пины

Экстра Пины GitHub позволяют вам иметь больше чем 6 репозиторий в вашем профиле используя GitHub readme профиль.

Ура! Вы больше не ограниченны шестью пинами к вашим репозиториям. 

### Использование

Скопируйте и вставьте этот код в ваш readme файле и поменяйте ссылки.

Запрос: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Карта](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Демо

[![ReadMe Карта](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Используйте [show_owner](#customization) функцию, чтобы включить имя владельца репозитории.

[![ReadMe Карта](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Карта Топ Языков

Карта топ языков показывает топ языки используемые GitHub пользователем чаще всего.

_Заметка: Топ языки не показывает навыки владения или подобного. Это GitHub метрика основанная на языках что встречаются чаще всего на вашей странице. Это новая функция от github-readme-stats._

### Использование

Скопируйте и вставьте этот код в ваш readme файле и поменяйте ссылки.

Запрос: `api/top-langs?username=anuraghazra`

```md
[![Топ Языки](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Исключить определенные репозитории

Вы можете использовать `?exclude_repo=repo1,repo2` параметр, чтобы исключить их из списка используемых в метрике. 

```md
[![Топ Языки](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### Скрыть определенные языки

Вы можете использовать `?hide=language1,language2` параметр, чтобы скрыть их из списка.

```md
[![Ток Языки](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Показать больше языков

Вы можете использовать `&langs_count=` параметр, чтобы увеличить или уменьшить количество языков показываемых на карте. Подходящие значения это цифры от 1 до 10 (включая). По умолчанию, значение равно 5.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### Компактная Карты Языков

Вы можете использовать `&layout=compact` параметр, чтобы поменять дизайн карты.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Демо

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Компактный Дизайн

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Wakatime Недельная Статистика

Смените значение `?username=` на ваше [Wakatime](https://wakatime.com) имя профиля. 

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Демо

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- Компактный Дизайн

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Все Демо

- По Умолчанию

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Скрывает Определенные Значения

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Показывает Иконки

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Считает Все Коммитты

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Темы

Выбирайте из многих [доступных тем](#themes)

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Градиент

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Кастомизирует Карты со Статистикой

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Установить Язык Карты

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=ru)

- Кастомизирует Карты с Репозиториями

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Топ Языки

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Wakatime Карта

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### Советы (Сравнять Карты с Репозиториями)

Обычно, вы не можете разложить изображения друг с другом. Чтобы сделать это, вы должны использовать этот подход:

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Внедрите в свой Vercel образец

#### [Посмотрите видео о том как это сделать от @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Так как GitHub API разрешает только 5 тысяч запросов в час, мой `https://github-readme-stats.vercel.app/api` может выйти за лимиты. Если вы установите это на своем Vercel сервере, вам не придется волноваться. Нажмите на кнопку установки чтобы начать! 

Заметка: Начиная с [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) у нас должно получаться справляться с больше чем 5 тысяч запросов без проблем :D

[![Установить на Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary><b> Гайд по Установке Vercel  🔨 </b></summary>

1. Перейдите а [vercel.com](https://vercel.com/)
1. Нажмите `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. Зайдите используя GitHub `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Зайдите в GitHub и согласитесь с условиями, если спрашивают
1. Форкните данную репозиторую 
1. Вернитесь к главной странице [Vercel](https://vercel.com/dashboard)
1. Выберите `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. Выберите `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. Выберите root и оставьте всё как есть, добавите environment variable назвав PAT_1 (как показано), для содержания персонального ключа доступа (personal access token PAT), который вы можете создать [здесь](https://github.com/settings/tokens/new) (оставьте всё как есть, просто назовите это как-то, это может быть что угодно)
   ![](https://files.catbox.moe/0ez4g7.png)
1. Нажмите deploy и всё готово. Найдите свой домен, чтобы использовать этот API!

</details>

## :sparkling_heart: Поддержите проект

Я предоставляю как open-source практически всё что могу. 
Я также пытаюсь отвечать всем кому нужна помощь с этими проектами. 
Однозначно, это может занять время. 
Вы можете использовать этот сервис бесплатно.

Однако, если вы используете этот проект и удовлетворены им, или просто хотите подбодрить меня на создание новых штук, у вас есть несколько способов сделать это:

- Оставьте ссылку на данный проект github-readme-stats в вашем readme :D
- Поставьте звезду и поделитесь проектом :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Вы можете отправить донат через PayPal. Я скорее всего куплю ~~кофе~~ чай. :tea:

Спасибо! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)


Вклады приветствуются! <3

Сделано с :heart: в JavaScript.