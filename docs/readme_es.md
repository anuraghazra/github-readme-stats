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
      <img src="https://img.shields.io/badge/Apoyado%20por-VSCode%20Power%20User%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    <a href="https://a.paddle.com/v2/click/16413/119403?link=2345">
      <img src="https://img.shields.io/badge/Apoyado%20por-Node%20Cli.com%20%E2%86%92-gray.svg?colorA=61c265&colorB=4CAF50&style=for-the-badge"/>
    </a>
  </p>

  <p align="center">
    <a href="#ejemplo">Ver un ejemplo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Reportar un bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new/choose">Solicitar una mejora</a>
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
    .
    <a href="/docs/readme_tr.md">Türkçe</a>
    .
    <a href="/docs/readme_np.md">नेपाली</a>
  </p>
</p>
<p align="center">¿Te gusta este proyecto? ¡Por favor, considera <a href="https://www.paypal.me/anuraghazra">donar</a> para ayudar a mejorarlo!

# Características

- [Tarjeta de estadísticas de GitHub](#tarjeta-de-estadísticas-de-github)
- [Pins adicionales de GitHub](#pines-adicionales-de-github)
- [Tarjeta de Lenguajes Principales](#tarjeta-de-lenguajes-principales)
- [Wakatime Week Stats](#estadísticas-de-la-semana-de-wakatime)
- [Temas](#temas)
- [Personalización](#personalización)
- [Despliega por tu cuenta](#despliega-tu-propia-instancia-de-vercel)

# Tarjeta de estadísticas de GitHub

Copia y pega esto en el contenido de tu README.md y listo. ¡Simple!

Cambia el valor de `?username=` al nombre de tu usuario de GitHub.

```md
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Nota: Los rangos disponibles son S+ (top 1%), S (top 25%), A++ (top 45%), A+ (top 60%) y B+ (todos). Los valores se calculan utilizando la [función de distribución acumulada](https://es.wikipedia.org/wiki/Funci%C3%B3n_de_distribuci%C3%B3n) utilizando commits, contribuciones, issues, estrellas, pull request, seguidores y repositorios propios. Puedes investigar más sobre la implementación en [src/calculateRank.js](../src/calculateRank.js)._

### Ocultar estadísticas individualmente

Para ocultar alguna estadística específica, puedes utilizar el parámetro `?hide=` con los elementos que quieras ocultar separados por comas.

> Opciones: `&hide=stars,commits,prs,issues,contribs`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,prs)
```

### Agregar contribuciones privadas al total de commits contados

Puedes agregar el recuento de todas sus contribuciones privadas al recuento total de commits utilizando el parámetro `?count_private=true`.

_Nota: Si estás desplegando este proyecto tú mismo, las contribuciones privadas se contarán de manera predeterminada; de lo contrario, deberás elegir compartir el recuento de sus contribuciones privadas._

> Opciones: `&count_private=true`

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&count_private=true)
```

### Mostrar íconos

Para habilitar los íconos, puedes utilizar `show_icons=true` como parámetro, de esta manera:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Temas

Puedes personalizar el aspecto de la tarjeta sin realizar ninguna [personalización manual](#personalización) con los temas incorporados.

Utiliza el parámetro `?theme=THEME_NAME`, de esta manera:

```md
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Todos los temas incorporados

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="GitHub Readme Stat Themes" width="600px"/>

Puedes ver una vista previa de [todos los temas disponibles](../themes/README.md) o ver el [archivo de configuración](../themes/index.js) del tema y también **puedes contribuir con nuevos temas** si lo deseas :D

### Personalización

Puedes personalizar el aspecto de tu `Tarjeta de Estadísticas` o `Tarjeta de Repo` de la manera que desees con los parámetros URL.

#### Opciones Comunes:

- `title_color` - Color del título _(hex color)_
- `text_color` - Color del contenido _(hex color)_
- `icon_color` - Color de icono si esta disponible _(hex color)_
- `bg_color` - Color de fondo _(hex color)_
- `hide_border` - Oculta el borde de la tarjeta _(booleano)_
- `theme` - Nombre del tema, elige uno de [todos los temas disponible ](../themes/README.md)
- `cache_seconds` - Cache _(min: 1800, max: 86400)_
- `locale` - configurar el idioma en la tarjeta _(p.ej. cn, de, es, etc.)_

##### Gradiente en `bg_color`

Puedes pasar mútliples valores separados por coma en la opción `bg_color` para dibujar un gradiente, el formato del gradiente es:

```
&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10
```

> Nota sobre la caché: las tarjetas de Repo tienen un caché predeterminado de 4 horas (14400 segundos) si el recuento forks y el recuento de estrellas es inferior a 1k; de lo contrario, son 2 horas (7200 segundos). También ten en cuenta que la caché está sujeta a un mínimo de 2 horas y un máximo de 24 horas

#### Opciones exclusivas de la Tarjeta de Estadísticas:

- `hide` - Oculta de las estadísticas [los elementos especificados](#ocultar-estadísticas-individualmente) _(valores separados por comas)_
- `hide_title` - _(booleano)_
- `hide_rank` - _(booleano)_
- `show_icons` - _(booleano)_
- `include_all_commits` - Cuenta el total de commits en lugar de solo los commits del año actual _(boolean)_
- `count_private` - Cuenta los commits privadas _(boolean)_
- `line_height` - Establece el alto de línea entre texto _(número)_
- `custom_title` - Establece un título personalizado
- [`disable_animations`] - Desactiva todas las animaciones _(booleano)_

#### Opciones exclusivas de la Tarjeta de Repo:

- `show_owner` - Mostrar el nombre del propietario del repositorio _(booleano)_

#### Opciones exclusivas de la Tarjeta de Lenguajes:

- `hide` - Oculta de la tarjeta los lenguajes especificados  _(valores separados por comas)_
- `hide_title` - _(booleano)_
- `layout` - Cambia entre los dos diseños disponibles `default` & `compact`
- `card_width` - Establece el ancho de la tarjeta manualmente _(número)_
- `langs_count` - Muestra más lenguajes en la tarjeta, entre 1-10, por defecto 5 _(número)_
- `exclude_repo` - Excluye los repositorios especificados  _(valores separados por comas)_
- `custom_title` - Establece un título personalizado

> :warning: **Importante:**
> Los nombres de los lenguajes deben estar codificados para URLs, como se especifica en [Código porciento](https://es.wikipedia.org/wiki/C%C3%B3digo_porciento)
> (es decir: `c++` debería convertirse en `c%2B%2B`,`jupyter notebook` debería convertirse en `jupyter%20notebook`, etc.)

#### Opciones exclusivas de la Tarjeta de Wakatime:

- `hide_title` - _(booleano)_
- `line_height` - Establece el alto de línea entre texto _(número)_
- `hide_progress` - Oculta la barra de progreso y el porcentaje _(booleano)_
- `custom_title` - Establece un título personalizado
- `layout` - Cambia entre los dos diseños disponibles `default` & `compact`
- `langs_count` - Limita el número de idiomas que aparecen en el mapa
- `api_domain` - Establece un dominio de API personalizado para la tarjeta

---

# Pines adicionales de GitHub

Los pines adicionales de GitHub le permiten fijar más de 6 repositorios en su perfil utilizando un perfil readme de GitHub.

¡Yey! Ya no está limitado a 6 repositorios pinneados.

### Utilización

Copia y pegua este código en tu Readme y cambia los enlaces.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Ejemplo

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Utiliza la variable [show_owner](#customización) para incluir el nombre de usuario del propietario del repositorio.

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

# Tarjeta de Lenguajes Principales

La tarjeta de lenguajes principales muestra los lenguajes principales del usuario de GitHub que se han utilizado principalmente.

_NOTA: los lenguajes principales no indican mi nivel de habilidad o algo así, es una métrica de GitHub de los lenguajes que tengo más código en GitHub. Es una nueva característica de github-readme-stats_

### Utilización

Copia y pegua este código en tu Readme y cambia los enlaces.

Endpoint: `api/top-langs?username=anuraghazra`

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

### Excluir repositorios individualmente

Puedes usar el parámetro `?exclude_repo=repo1,repo2` para ocultar repositorios individualmente.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&exclude_repo=github-readme-stats,anuraghazra.github.io)](https://github.com/anuraghazra/github-readme-stats)
```

### Ocultar lenguajes individualmente

Puedes usar el parámetro `?hide=language1,language2` para ocultar lenguajes individualmente.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&hide=javascript,html)](https://github.com/anuraghazra/github-readme-stats)
```

### Mostrar más lenguajes

Puedes usar el paramétro `&langs_count=` para incrementar o decrementar el número de lenguajes mostrados en la tarjeta. Los valores admitidos son los números enteros entre 1 y 10 (inclusive), y el valor por defecto es 5.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&langs_count=8)](https://github.com/anuraghazra/github-readme-stats)
```

### Diseño Compacto de Tarjeta de Lenguaje

Puedes usar la opción `& layout = compact` para cambiar el diseño de la tarjeta.

```md
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)
```

### Ejemplo

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Diseño compacto

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

# Estadísticas de la semana de Wakatime

cambia el valor del parámetro `?username=` a tu username en [Wakatime](https://wakatime.com).

```md
[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)
```

### Ejemplo

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&hide_progress=true)](https://github.com/anuraghazra/github-readme-stats)

- Diseño compacto

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

---

### Todos los ejemplos

- Por defecto

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Ocultando ciertas estadísticas

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=contribs,issues)

- Mostrando íconos

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=issues&show_icons=true)

- Incluyendo todos los commits

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&include_all_commits=true)

- Temas

Escoja cualquiera de los [temas por defecto](#themes)

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Gradiente

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&bg_color=30,e96443,904e95&title_color=fff&text_color=fff)

- Personalizando Tarjeta de Estadísticas

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Estableciendo Idioma de la tarjeta

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&locale=es)

- Personalizando Tarjeta de Repo

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

- Lenguajes Top

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)

- Tarjeta de Wakatime

[![willianrod's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=willianrod)](https://github.com/anuraghazra/github-readme-stats)

---

### Consejo rápido (para alinear las tarjetas de repositorio)

Por lo general, no podrás acomodar las imágenes una al lado de la otra. Para hacerlo, puede usar este enfoque:

```html
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Despliega tu propia instancia de Vercel

#### [Échale un vistazo a este tutorial paso a paso de @codeSTACKr](https://youtu.be/n6d4KHSKqGk?t=107)

Desde que la API de GitHub permite solo 5k peticiones por hora, es posible que mi `https://github-readme-stats.vercel.app/api` pueda llegar al límite. Si lo alojas en tu propio servidor de Vercel, no tendrás que preocuparte de nada. ¡Clickea en el botón "Deploy" para comenzar!

NOTA: Debido a [#58](https://github.com/anuraghazra/github-readme-stats/pull/58) podríamos manejar más de 5k peticiones sin tener ningún problema con el downtime :D

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anuraghazra/github-readme-stats)

<details>
 <summary>Guía para comenzar en Vercel</summary>

1. Ve a [vercel.com](https://vercel.com/)
2. Clickea en `Log in`
   ![](https://files.catbox.moe/tct1wg.png)
3. Inicia sesión con GitHub presionando `Continue with GitHub`
   ![](https://files.catbox.moe/btd78j.jpeg)
4. Permite el acceso a todos los repositorios (si se te pregunta)
5. Haz un Fork de este repositorio
6. Dirígete de nuevo a tu [Vercel dashboard](https://vercel.com/dashboard)
7. Selecciona `Import Project`
   ![](https://files.catbox.moe/qckos0.png)
8. Selecciona `Import Git Repository`
   ![](https://files.catbox.moe/pqub9q.png)
9. Selecciona "root" y matén todo como está, simplemente añade tu variable de entorno llamada PAT_1 (como se muestra), la cual contendrá un token de acceso personal (PAT), el cual puedes crear fácilmente [aquí](https://github.com/settings/tokens/new) (mantén todo como está, simplemente asígnale un nombre, puede ser cualquiera que desees)
   ![](https://files.catbox.moe/0ez4g7.png)
10. Clickea "Deploy" y ya está listo. ¡Ve tus dominios para usar la API!

</details>

## :sparkling_heart: Apoya al proyecto

Casi todos mis proyectos son de código abierto e intento responder a todos los usuarios que necesiten ayuda con alguno de estos proyectos. Obviamente, esto toma tiempo. Puedes usar este servicio gratis.

No obstante, si estás utilizando este proyecto y estás feliz con él o simplemente quieres animarme a que siga creando cosas, aquí tienes algunas maneras de hacerlo:

- Darme créditos cuando estés utilizando github-readme-stats en tu README, añadiendo un link a este repositorio :D
- Dándole una estrella y compartiendo el proyecto :rocket:
- [![paypal.me/anuraghazra](https://ionicabizau.github.io/badges/paypal.svg)](https://www.paypal.me/anuraghazra) - Puedes hacerme una única donación a través de PayPal. Probablemente me compraré un ~~café~~ té. :tea:

¡Gracias! :heart:

---

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](../powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)

¡Las contribuciones son bienvenidas! <3

Hecho con :heart: y JavaScript.
