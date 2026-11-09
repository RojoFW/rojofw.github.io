# Blog de rojofw

Blog creado con [Astro](https://astro.build/) y el tema [AstroPaper](https://github.com/satnaing/astro-paper). Se publica en <https://rojofw.github.io/>.

## Ramas

- `dev`: código fuente, entradas y configuración de Astro. Trabaja y haz `push` a esta rama.
- `main`: archivos HTML, CSS y demás recursos generados. El flujo de GitHub Actions la actualiza automáticamente; no edites esta rama a mano.

Cada `push` a `dev` ejecuta [el flujo de publicación](.github/workflows/deploy.yml): instala dependencias, compila el sitio, copia `dist/` a `main` y publica el mismo resultado en GitHub Pages.

## Configuración inicial de GitHub

1. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**. Esto es necesario porque los commits que hace `GITHUB_TOKEN` en `main` no activan una publicación desde una rama.
2. En **Settings → Actions → General → Workflow permissions**, permite **Read and write permissions** si el flujo no puede escribir en `main`.
3. Si `main` está protegida, permite que `github-actions[bot]` publique en ella o adapta la regla para ese flujo.

El repositorio debe llamarse `rojofw.github.io` y pertenecer a la cuenta u organización `rojofw` para usar esa URL sin una ruta adicional.

## Desarrollo local

Requiere Node.js 24 y pnpm 12.18.0.

```sh
git switch dev
pnpm install --frozen-lockfile
pnpm dev
```

Abre <http://localhost:4321/>. Para comprobar la compilación, ejecuta `pnpm build` y `pnpm preview`.

Las entradas están en `src/content/posts/`. La URL, el título y los enlaces del sitio se configuran en `astro-paper.config.ts`. El contenido de ejemplo de AstroPaper sigue incluido y se puede sustituir por las entradas del blog.

AstroPaper conserva su licencia MIT en [LICENSE](LICENSE).
