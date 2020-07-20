<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="Github Readme Stats" /> 
 <h2 align="center">GitHub Readme Stats</h2>
 <p align="center">¡Obtén tus estadísticas de GitHub generadas dinámicamente en tu README!</p>
</p>

  <p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats/actions">
      <img alt="Tests Passing" src="https://github.com/anuraghazra/github-readme-stats/workflows/Test/badge.svg" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/anuraghazra/github-readme-stats?color=0088ff" />
    </a>
  </p>

  <p align="center">
    <a href="#ejemplo">Ve un ejemplo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">Reporta un bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">Solicita una mejora</a>
  </p>
</p>
<p align="center">¿Te gusta este proyecto? ¡Por favor considera <a href="https://www.paypal.me/anuraghazra">donar</a> para ayudar a mejorarlo!

# Características

- [Tarjeta de estadísticas de GitHub](#tarjeta-de-estadísticas-de-github)
- [Pins extra de GitHub](#pins-extra-de-github)
- [Temas](#temas)
- [Customización](#customización)
- [Despliega por tu cuenta](#despliega-tu-propia-instancia-de-vercel)

# Tarjeta de estadísticas de GitHub

Copia y pega esto en el contenido de tu README.md y listo. ¡Simple!

Cambia el valor `?username=` al nombre de tu usuario de GitHub.

```md
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats)
```

_Nota: las clasificaciones se calculan basándose en las estadísticas del usuario. Ve [src/calculateRank.js](./src/calculateRank.js)._

### Ocultar estadísticas individualmente

Para ocultar alguna estadística específica, puedes utilizar el parámetro `?hide=` con un arreglo de items que quieras ocultar.

> Opciones: `&hide=["stars","commits","prs","issues","contribs"]`

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","prs"])
```

### Mostrar íconos

Para habilitar los íconos, puedes utilizar `show_icons=true` como parámetro, de esta manera:

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true)
```

### Temas

Puedes customizar el aspecto de la tarjeta sin realizar ninguna [customización manual](#customización) con los temas incorporados.

Utiliza el parámetro `?theme=THEME_NAME`, de esta manera:

```md
![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)
```

#### Todos los temas incorporados:

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

<img src="https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png" alt="Github Readme Stat Themes" width="600px"/>

Descubre más temas en el [archivo de configuración](./themes/index.js). También, **puedes contribuir añadiendo más temas** si lo deseas :D

### Customización

Puedes customizar el aspecto de tu `Stats Card` o `Repo Card` de la manera que desees con los parámetros URL.

Opciones de customización:

| Option      | type      | description                          | Stats Card (default) | Repo Card (default) |
| ----------- | --------- | ------------------------------------ | -------------------- | ------------------- |
| title_color | hex color | color del título                     | 2f80ed               | 2f80ed              |
| text_color  | hex color | color del contenido                  | 333                  | 333                 |
| icon_color  | hex color | color del ícono                      | 4c71f2               | 586069              |
| bg_color    | hex color | color de fondo                       | FFFEFE               | FFFEFE              |
| line_height | number    | controla el line_height              | 30                   | N/A                 |        
| hide_rank   | boolean   | oculta la clasificación              | false                | N/A                 |
| hide_title  | boolean   | oculta el título                     | false                | N/A                 |
| hide_border | boolean   | oculta el borde                      | false                | N/A                 |
| show_owner  | boolean   | muestra el propietario               | N/A                  | false               |
| show_icons  | boolean   | muestra los íconos                   | false                | N/A                 |
| theme       | string    | establece un tema incorporado        | 'default'            | 'default_repocard'  |

---

### Ejemplo

- Predeterminado

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)

- Ocultando estadísticas específicas

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["contribs","issues"])

- Mostrando íconos

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&hide=["issues"]&show_icons=true)

- Temas

Elige uno de los [temas predeterminados](#temas)

![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=anuraghazra&show_icons=true&theme=radical)

- Customizando la tarjeta de estadísticas

![Anurag's github stats](https://github-readme-stats.vercel.app/api/?username=anuraghazra&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)

- Customizando la tarjeta de repositorio

![Customized Card](https://github-readme-stats.vercel.app/api/pin?username=anuraghazra&repo=github-readme-stats&title_color=fff&icon_color=f9f9f9&text_color=9f9f9f&bg_color=151515)

---

# Pins extra de GitHub

Los pins extra de GitHub te permiten anclar más de 6 repositorios en tu perfil utilizando el archivo README.md.

¡Bien! Ya no estás limitado a 6 repositorios anclados.

### Utilización

Copia y pega este código en tu README.md y cambia los links.

Endpoint: `api/pin?username=anuraghazra&repo=github-readme-stats`

```md
[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)
```

### Ejemplo

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats)](https://github.com/anuraghazra/github-readme-stats)

Utiliza la variable [show_owner](#customización) para incluir el nombre de usuario del propietario del repositorio.

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true)](https://github.com/anuraghazra/github-readme-stats)

### Pequeño consejo (alinear las tarjetas de repositorios)

Usualmente no serías capaz de alinear las imágenes una al lado de otra. Para lograrlo, puedes realizar esto:

```md
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats" />
</a>
<a href="https://github.com/anuraghazra/convoychat">
  <img align="left" src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=convoychat" />
</a>
```

## Despliega tu propia instancia de vercel

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
   ![](https://files.catbox.moe/caem5b.png)
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

¡Las contribuciones son bienvenidas! <3

Hecho con :heart: y JavaScript.
