<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">¡Obtén tus estadísticas de GitHub generadas dinámicamente en tu README!</p>
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
    <a href="#ejemplo">Ve un ejemplo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Reporta un bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Solicita una mejora</a>
  </p>
  <p align="center">
    <a href="/docs/readme_fr.md">Français</a>
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
<p align="center">¿Te gusta este proyecto? ¡Por favor considera <a href="https://www.paypal.me/anuraghazra">donar</a> para ayudar a mejorarlo!

# Características

- [Tarjeta de estadísticas de GitHub](#tarjeta-de-estadísticas-de-github)
- [Pins adicionales de GitHub](#pines-adicionales-de-github)
- [Temas](#temas)
- [Personalización](#personalización)
- [Despliega por tu cuenta](#despliega-tu-propia-instancia-de-vercel)

# Tarjeta de estadísticas de GitHub

Copia y pega esto en el contenido de tu README.md y listo. ¡Simple!

Cambia el valor `?username=` al nombre de tu usuario de GitHub.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Nota: las clasificaciones se calculan basándose en las estadísticas del usuario. Ve [src/calculateRank.js](../src/calculateRank.js)._

### Ocultar estadísticas individualmente

Para ocultar alguna estadística específica, puedes utilizar el parámetro `?hide=` con un arreglo de items que quieras ocultar.

> Opciones: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### Agregar contribuciones privadas al total de commits contados

Puede agregar el recuento de todas sus contribuciones privadas al recuento total de confirmaciones utilizando el parámetro de consulta `?count_private=true`.

_Nota: Si está desplegando este proyecto usted mismo, las contribuciones privadas se contarán de manera predeterminada; de lo contrario, deberá elegir compartir sus recuentos de contribuciones privadas._

> Opciones: `&count_private=true`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Mostrar íconos

Para habilitar los íconos, puedes utilizar `show_icons=true` como parámetro, de esta manera:

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Temas

Puedes personalizar el aspecto de la tarjeta sin realizar ninguna [personalización manual](#personalización) con los temas incorporados.

Utiliza el parámetro `?theme=THEME_NAME`, de esta manera:

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Todos los temas incorporados

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

Puedes ver una vista previa de [todos los temas disponibles](../themes/README.md) o ver el [archivo de configuración](../themes/index.js) del tema y también **puedes contribuir con nuevos temas** si lo deseas :D

### Personalización

Puedes personalizar el aspecto de tu `Stats Card` o `Repo Card` de la manera que desees con los parámetros URL.

#### Opciones Comunes:

- `title_color` - Color del título _(hex color)_
- `text_color` - Color del contenido _(hex color)_
- `icon_color` - Color de icono si esta disponible _(hex color)_
- `bg_color` - Color de fondo _(hex color)_
- `hide_border` - Oculta el borde de la tarjeta _(booleano)_
- `theme` - Nombre del tema, elige uno de [todos los temas disponible ](../themes/README.md)
- `cache_seconds` - Cache _(min: 1800, max: 86400)_
- `locale` - configurar el idioma en la tarjeta _(p.ej. cn, de, es, etc.)_

> Nota sobre la caché: las tarjetas de Repo tienen un caché predeterminado de 30 minutos (1800 segundos) si el recuento forks y el recuento de estrellas es inferior a 1k; de lo contrario, son 2 horas (7200). También tenga en cuenta que el caché está sujeto a un mínimo de 30 minutos y un máximo de 24 horas

#### Opciones exclusivas de la tarjeta de estadísticas:

- `hide` - Ocultar los elementos especificados de las estadísticas _ (valores separados por comas) _
- `hide_title` - _(boolean)_
- `hide_rank` - _(boolean)_
- `hide_border` - _(boolean)_
- `show_icons` - _(boolean)_
- `include_all_commits` - Cuente los commits totales en lugar de solo los commits del año actual _(boolean)_
- `count_private` - Cuenta los commits privadas _(boolean)_
- `line_height` - Establece el alto de línea entre texto _(number)_
- `custom_title` - Establece un título personalizado

#### Opciones exclusivas de la tarjeta Repo:

- `show_owner` - Mostrar el nombre del propietario del repositorio _(boolean)_

#### Opciones exclusivas de la tarjeta de lenguajes:

- `hide` - Ocultar los lenguajes especificados de la tarjeta _(valores separados por comas)_
- `hide_title` - _(boolean)_
- `hide_border` - _(boolean)_
- `layout` - Cambiar entre dos diseños disponibles `default` & `compact`
- `card_width` - Establecer el ancho de la tarjeta manualmente _(number)_

> :warning: **Importante:**
> Los nombres de los idiomas deben tener escape de uri, como se especifica en [Código porciento](https://es.wikipedia.org/wiki/C%C3%B3digo_porciento)
> (es decir: `c++` debería convertirse en `c%2B%2B`,`jupyter notebook` debería convertirse en `jupyter%20notebook`, etc.)

---

# Pines adicionales de GitHub

Los pines adicionales de GitHub le permiten fijar más de 6 repositorios en su perfil utilizando un readme de perfil de GitHub.

Yey! Ya no está limitado a 6 repositorios anclados.

### Utilización

Copie y pegue este código en su archivo Léame y cambie los enlaces.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Ejemplo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Utiliza la variable [show_owner](#customización) para incluir el nombre de usuario del propietario del repositorio.

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Tarjeta de lenguajes principales

La tarjeta de lenguajes principales muestra los lenguajes principales del usuario de github que se han utilizado principalmente.

_NOTA: los lenguajes principales no indican mi nivel de habilidad o algo así, es una métrica de github de los lenguajes que tengo más código en github, es una nueva característica de github-readme-stats_

### Utilización

Copie y pegue este código en su readme y cambie los enlaces.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Ocultar lenguajes individuales

Puede usar el parámetro `? Hide = language1, language2` para ocultar lenguajes individuales.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Diseño de tarjeta de lenguaje compacta

Puede usar la opción `& layout = compact` para cambiar el diseño de la tarjeta.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Ejemplo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Diseño compacto

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Todos los ejemplos

- Por Defecto

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Ocultar estadísticas específicas

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Mostrando iconos

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Incluir todos los Commits

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Temas

Elija entre cualquiera de los [temas predeterminados](#themes)

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Personalizando tarjeta de estadísticas

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Personalizar la tarjeta de repositorio

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Lenguajes Principales

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

---

### Consejo rápido (alinee las tarjetas de repositorio)

Por lo general, no podrá diseñar las imágenes una al lado de la otra. Para hacerlo, puede usar este enfoque:

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Despliega tu propia instancia de vercel

#### [Check Out Step By Step Video Tutorial By @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Desde que la API de GitHub permite solo 5 mil peticiones por hora, es posible que mi `https://github-readme-stats.vercel.app/api` pueda llegar al límite. Si lo alojas en tu propio servidor de Vercel, no tendrás que preocuparte de nada. ¡Clickea en el botón "Deploy" para comenzar!

Nota: debido a esto [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) podríamos manejar más de 5 mil peticiones sin tener ningún problema con el downtime :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Guía para comenzar en Vercel</summary>

1. Ve a [vercel.com](https://vercel.com/)
1. Clickea en `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
1. Inicia sesión con GitHub presionando `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
1. Permite el acceso a todos los repositorios (si se te pregunta)
1. Haz un Fork de este repositorio
1. Dirígete de nuevo a tu [Vercel dashboard](https://vercel.com/dashboard)
1. Selecciona `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
1. Selecciona `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
1. Selecciona "root" y matén todo como está, simplemente añade tu variable de entorno llamada PAT_1 (como se muestra), la cual contendrá un token de acceso personal (PAT), el cual puedes crear fácilmente [aquí](https://github.com/settings/tokens/new) (mantén todo como está, simplemente asígnale un nombre, puede ser cualquiera que desees)
   ![](https://files.catbox.moe/0ez4g7.png)
1. Clickea "Deploy" y ya está listo. ¡Ve tus dominios para usar la API!

</details>

## :sparkling_heart: Apoya al proyecto

Casi todos mis proyectos son código-abierto e intento responder a todos los usuarios que necesiten ayuda con alguno de estos proyectos, Obviamente,
esto toma tiempo. Puedes usar este servicio gratis.

No obstante, si estás utilizando este proyecto y estás feliz con él o simplemente quieres animarme a que siga creando cosas, aquí tienes algunas maneras de hacerlo:

- Darme créditos cuando estés utilizando github-readme-stats en tu README, añadiendo un link a este repositorio :D
- Dándole una estrella (starring) y compartiendo el proyecto :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Puedes hacerme una única donación a través de PayPal. Probablemente me compraré un ~~café~~ té. :tea:

¡Gracias! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](./powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

¡Las contribuciones son bienvenidas! <3

Hecho con :heart: y JavaScript.
