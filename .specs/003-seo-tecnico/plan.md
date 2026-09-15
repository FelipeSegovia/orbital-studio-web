# Plan: SEO técnico

## Archivos a tocar

**Configuración**
- `astro.config.mjs` — `site` + integración sitemap
- `package.json` — `@astrojs/sitemap`
- `vercel.json` — cabeceras de seguridad (nuevo)

**Fuente única de datos**
- `src/config/site.ts` — teléfono, WhatsApp, ciudad, región, país, fundadores
- `src/config/services.ts` — extraer `designItems` / `devItems` desde `Services.astro` (nuevo)

**Head y schema**
- `src/layouts/Layout.astro` — canonical, description, `es-CL`, OG/Twitter, robots, preload de fuente
- `src/components/SeoSchema.astro` — bloque `ld+json` (nuevo)

**Rutas y estáticos**
- `src/pages/404.astro` (nuevo)
- `public/robots.txt`, `public/og.png`, `public/apple-touch-icon.png`, `public/fonts/*.woff2` (nuevos)
- `scripts/generate-og.mjs` — generador con `sharp` (nuevo)

**Componentes**
- `src/components/Services.astro` — importar los arrays desde config
- `src/components/Contact.astro` — fila teléfono/WhatsApp
- `src/components/Footer.astro` — NAP + enlaces de sección
- `src/components/Team.astro` — `widths`/`densities` en los dos `<Image>`
- `src/styles/global.css` — `@font-face` + métricas de fallback
- `src/assets/felipe-segovia.png`, `mauricio-diaz.png` — reducir a ~1200px

## Diseño

### Fuente única de datos
`site.ts` pasa a exportar `phone: "+56957675345"`, `whatsapp: "56957675345"`, `city`, `region`, `country` y `founders[]`. Contact, Footer y SeoSchema leen de ahí; ninguno escribe el dato a mano. Es la salvaguarda estructural contra otra contradicción tipo Santiago/La Serena.

`designItems` y `devItems` ya son arrays tipados dentro de `Services.astro`. Se mueven tal cual a `src/config/services.ts` para que `SeoSchema.astro` construya el `OfferCatalog` desde la misma lista que renderiza la sección: si mañana se agrega un servicio, el schema lo recoge solo.

### Head
`canonical` ya se calcula en `Layout.astro:13`; solo falta emitirlo. Con `site` definido, esa misma variable arregla `og:url` sin tocar nada más.

`interface Props` suma `image?: string`, con default `/og.png` resuelto contra `Astro.site`. OG e imagen de Twitter comparten esa URL absoluta.

Orden del `<head>`: `charset` → `viewport` → `title` → description → robots → canonical → OG/Twitter → iconos → preload de fuente → schema.

### Schema
Un solo `<script type="application/ld+json">` con `@graph` de cuatro tipos de nodo, enlazados por `@id` sobre el patrón `https://orbitalstudio.cl/#organization`, `#website`, `#/persona/felipe-segovia`, etc.

`ProfessionalService` lleva `address` con `addressLocality` / `addressRegion` / `addressCountry`, **sin `streetAddress`**. Schema.org lo permite y es lo correcto para un estudio remoto: omitir un dato es válido, inventarlo no.

`Person` ×2 con `jobTitle` y `worksFor` → `@id` de la organización, y `founder` en sentido inverso. Es el activo E-E-A-T que el sitio ya tiene escrito en `Team.astro` y no está declarando.

Se serializa con `JSON.stringify` y `set:html` para que Astro no escape las comillas.

### Sitemap y robots
`@astrojs/sitemap` sin opciones: con una sola ruta genera `sitemap-index.xml` + `sitemap-0.xml`. `robots.txt` es estático y apunta al índice.

### 404
Usa el `Layout` con `noindex`, título propio y enlaces a las anclas existentes (`#servicios`, `#en-orbita`, `#estudio`, `#nosotros`, `#contacto`). Cuando la fase 2 cree rutas reales, solo cambian esos href.

### Fuente
Hoy `global.css:13` declara `"Archivo", sans-serif` y el head la trae de Google Fonts con un stylesheet que bloquea el render. Se descargan los dos woff2 variables (roman e itálica, ejes 200-900 — la itálica se usa en `.footer__tagline-em` y `global.css:246`), se declaran con `@font-face` + `font-display: swap`, se precarga solo la roman, y se eliminan los dos `preconnect` y el `<link>` externo.

`@font-face` de fallback con `size-adjust` / `ascent-override` calibrado contra la métrica de Archivo, para que el swap no mueva el layout. Ojo con `font-synthesis: none` (`global.css:41`): al autoalojar hay que confirmar que la itálica real carga, o los textos en cursiva se quedan rectos.

### Cabeceras
`vercel.json` solo con `headers`. **No se declara nada sobre `/_astro/*`**: el adapter ya emite `immutable` y duplicarlo arriesga pisarlo. El redirect `www` → apex 307→308 se hace en el panel de Vercel, no aquí.

### Imágenes
`og.png` se genera desde un SVG compuesto en `scripts/generate-og.mjs` con `sharp` (ya instalado, cero deps nuevas). Mismo script emite el `apple-touch-icon` desde `logo-mark.png`. Los PNG resultantes se versionan; el script queda para regenerarlos.

Reducir los dos retratos a ~1200px no cambia lo que se sirve —`astro:assets` ya emite WebP de 14-16 KB— pero baja 4 MB de repo y acelera el build.

## Riesgos

- **Autoalojar la fuente es el cambio con más superficie visual.** Se verifica aparte del resto, comparando contra capturas previas.
- **`vercel.json` junto al Build Output API**: si las cabeceras no aparecen tras el deploy, la alternativa es configurarlas en el panel de Vercel. No bloquea nada más.

## Verificación end-to-end

1. `pnpm build` → `grep -ri localhost dist/client/` y `grep -ri santiago dist/client/index.html` vacíos.
2. `grep -E 'canonical|og:image|ld\+json' dist/client/index.html` presentes y absolutos.
3. `pnpm preview` → `/robots.txt`, `/sitemap-index.xml` en 200; `/ruta-inventada` muestra la 404 propia.
4. Bloque `ld+json` pegado en validator.schema.org y Rich Results Test: cero errores, `@id` resueltos.
5. Network con throttling: sin requests a `fonts.googleapis.com`; comparación visual contra captura previa, con atención a las cursivas.
6. Tras deploy: `curl -sI` para cabeceras de seguridad y para confirmar que `/_astro/*` sigue `immutable`; LinkedIn Post Inspector para la tarjeta OG.
7. Alta en Search Console + envío del sitemap. Indicador a 4 semanas: `site:orbitalstudio.cl` deja de dar 0.
