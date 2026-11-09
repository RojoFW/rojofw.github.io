---
title: "Cómo escribir en este blog"
pubDatetime: 2026-11-09T12:00:00-04:00
description: "Una guía breve para crear, revisar y publicar nuevas entradas."
tags:
  - guía
  - blog
featured: true
draft: false
timezone: "America/Caracas"
---

Esta entrada sirve como ejemplo. Puedes usarla para aprender el formato y, cuando ya tengas tus propios artículos, editarla o reemplazarla.

## 1. Crea un archivo

Cada entrada es un archivo `.md` dentro de `src/content/posts/`. Por ejemplo, `mi-primer-articulo.md` tendrá la dirección `/posts/mi-primer-articulo/`. Escribe el nombre en minúsculas y separa las palabras con guiones.

## 2. Añade los datos iniciales

El bloque entre `---` al comienzo del archivo contiene los datos del artículo. Puedes copiar esta plantilla:

```yaml
---
title: "Título de mi artículo"
pubDatetime: 2026-11-09T12:00:00-04:00
description: "Resumen breve de lo que trata el artículo."
tags:
  - personal
featured: false
draft: false
---
```

`title`, `pubDatetime` y `description` son obligatorios. `tags` organiza las entradas por temas. Con `featured: true` aparecerá en la sección destacada de la portada. Con `draft: true` la entrada quedará oculta, incluso en la vista de desarrollo.

## 3. Escribe el contenido

Debajo del segundo `---` puedes usar Markdown. Por ejemplo:

```md
## Un subtítulo

Un párrafo con **negrita**, _cursiva_ y un [enlace](https://astro.build/).

- Una idea
- Otra idea

![Descripción de la imagen](/images/mi-foto.jpg)
```

Guarda las imágenes que uses con una ruta como `/images/mi-foto.jpg` dentro de `public/images/`.

## 4. Revisa y publica

En la raíz del proyecto, inicia el servidor local con `pnpm dev` y abre `http://localhost:4321/`. Antes de publicar, ejecuta `pnpm build` para detectar errores.

Cuando esté listo, sube el cambio a la rama `dev`:

```sh
git add .
git commit -m "Agregar nuevo artículo"
git push origin dev
```

GitHub Actions compilará el blog, actualizará la rama `main` con los archivos generados y publicará la nueva versión en `https://rojofw.github.io/`.
