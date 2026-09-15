# Spec: SEO técnico (fundaciones indexables)

## Objetivo

Dejar `orbitalstudio.cl` indexable, compartible y con su entidad declarada, corrigiendo el cableado ausente que detectó la auditoría SEO (40/100). No se toca el diseño, la estructura de la landing ni el copy de marca: esta iteración es infraestructura, no contenido.

## Contexto

Auditoría de referencia: `~/Desktop/orbit-check.html` (15-sep-2026). Hallazgos confirmados contra el código:

- `astro.config.mjs` no define `site` → producción publica `og:url = http://localhost:4321/`.
- `Layout.astro:13` calcula `canonical` pero nunca emite `<link rel="canonical">`.
- No existe `robots.txt` ni sitemap. `public/` solo contiene `favicon.svg`.
- Cero JSON-LD en todo el repo.
- Sin `og:image` / `twitter:image`: los compartidos salen sin tarjeta visual.
- Contradicción NAP: la meta description dice «Santiago, Chile»; `Contact.astro:26` dice «La Serena, Chile».

Dos hallazgos de la auditoría se descartan por ser incorrectos:

1. «`/_astro/*` con `max-age=0`» — falso; `@astrojs/vercel` ya emite `public, max-age=31536000, immutable`.
2. «`rel=nofollow` en los teasers Netlify» — nofollowear productos propios no recupera autoridad; el arreglo real es dominio propio (fase 2).

**Dato de negocio confirmado:** Orbital Studio opera de forma remota y se ubica en **La Serena, Chile**. Toda referencia a Santiago es un error a corregir.

## Requisitos funcionales

### Fundaciones
- `astro.config.mjs` define `site: 'https://orbitalstudio.cl'`, sincronizado con `site.url` de `src/config/site.ts`.
- `Layout.astro` emite `<link rel="canonical">` reutilizando la variable ya existente.
- `lang="es"` pasa a `lang="es-CL"`.
- Description por defecto corregida a La Serena + operación remota, sin repetir el sufijo de marca.
- Se añaden `og:site_name`, `og:image` (+ `width`/`height`/`alt`), `twitter:image`; `twitter:card` pasa a `summary_large_image`.
- Se añade `<meta name="robots" content="index, follow, max-image-preview:large">` y `apple-touch-icon`.
- `interface Props` acepta `image?: string` para que la fase 2 pueda sobrescribir el OG por ruta.

### Descubribilidad
- `public/robots.txt` con `Allow: /` y directiva `Sitemap:`.
- Sitemap generado por `@astrojs/sitemap` (única dependencia nueva; ver justificación abajo).
- `src/pages/404.astro` propia, con `noindex` y enlaces de vuelta a las secciones.

### Datos estructurados
- Componente `src/components/SeoSchema.astro` que emite un único `ld+json` con `@graph` de nodos enlazados por `@id`:
  - `ProfessionalService` — nombre, url, logo, email, teléfono, `areaServed: CL`, `address` con `addressLocality: La Serena` / `addressRegion: Coquimbo` / `addressCountry: CL`. **Sin `streetAddress`**: no existe el dato y no se inventa.
  - `WebSite` — `inLanguage: es-CL`, `publisher` apuntando al nodo anterior.
  - `Person` ×2 — Mauricio Díaz y Felipe Segovia como `founder`, con los roles ya presentes en `Team.astro`.
  - `OfferCatalog` con los 10 servicios de `Services.astro`.
- `sameAs` se omite mientras no existan perfiles activos.
- `src/config/site.ts` se amplía (`phone`, `whatsapp`, `city`, `region`, `country`, `founders`) para que schema y copy lean de una sola fuente y la contradicción de ciudad no pueda repetirse.

### Imagen OG
- `public/og.png` de 1200×630 y `public/apple-touch-icon.png` de 180×180.
- Se generan con un script en `scripts/` usando `sharp`, que ya es dependencia del proyecto. Los binarios se versionan; el script queda para regenerarlos.

### Contacto y NAP
- `Contact.astro`: nueva fila «Teléfono» en el `<dl>`, con enlace `tel:` y enlace a WhatsApp.
- `Footer.astro`: NAP corto (ciudad, correo, teléfono) y enlaces a las secciones. Hoy el footer no tiene ni un enlace.

### Rendimiento y cabeceras
- Archivo (la fuente) pasa a autoalojarse: `public/fonts/`, `@font-face` con `font-display: swap` en `global.css`, `preload` en el head, y se eliminan los dos `preconnect` y el stylesheet de Google Fonts que hoy bloquea el render.
- Métricas de fallback (`size-adjust` / `ascent-override`) para evitar CLS por swap.
- `vercel.json` nuevo con `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. **No se toca el cache-control de `/_astro/*`.**
- `felipe-segovia.png` (2.2 MB) y `mauricio-diaz.png` (1.9 MB) se reducen a ~1200px de ancho; sus `<Image>` en `Team.astro` reciben `widths`/`densities`.

## Dependencia nueva (justificación requerida por AGENTS.md)

`@astrojs/sitemap` — integración first-party de Astro, sin framework de UI asociado. Alternativa evaluada: endpoint `sitemap.xml.ts` a mano, que ahorra la dependencia pero hay que reescribirlo en cuanto la fase 2 agregue rutas. Se elige la integración porque en fase 2 recoge las rutas nuevas sin trabajo adicional.

## Datos de contacto confirmados

- **Teléfono / WhatsApp:** `+56957675345` (E.164). Enlace WhatsApp: `https://wa.me/56957675345`.
- **Correo:** `contacto@orbitalstudio.cl` (ya presente en `src/config/site.ts`).
- **Ubicación:** La Serena, Región de Coquimbo, Chile — operación remota.

Los tres valores viven en `src/config/site.ts`. Ningún componente los escribe a mano: es la salvaguarda contra una segunda contradicción como la de Santiago/La Serena.

Ya no hay datos bloqueantes: la spec es ejecutable de principio a fin.

## Fuera de alcance

- División de la landing en rutas reales (`/servicios`, `/nosotros`, `/en-orbita`, `/contacto`) — spec aparte
- Página de servicio local tipo `/servicios/diseno-web-la-serena`
- Expandir el contenido a 800+ palabras por ruta
- Casos de cliente y testimonios
- Reencuadre del copy «dos personas, no una agencia»
- Google Business Profile
- Migrar los teasers fuera de netlify.app
- Página de política de privacidad
- `llms.txt` e IndexNow

## Acción manual fuera del repo

En Vercel → Settings → Domains, cambiar el redirect `www` → apex de **307 a 308**. No se puede configurar desde el código.

## Criterios de aceptación

- [x] `grep -ri localhost dist/client/` no devuelve resultados
- [x] `grep -ri santiago dist/client/index.html` no devuelve resultados
- [x] El HTML compilado contiene `<link rel="canonical" href="https://orbitalstudio.cl/">`
- [x] `/robots.txt` y `/sitemap-index.xml` responden 200 con contenido correcto
- [x] Una ruta inexistente muestra la 404 propia, no la genérica de Astro
- [x] El bloque `ld+json` pasa validator.schema.org y Rich Results Test sin errores, con los `@id` resueltos entre nodos
- [x] «La Serena» aparece en meta description, JSON-LD y copy de contacto
- [x] Ningún request a `fonts.googleapis.com` en el waterfall de Network
- [x] `curl -sI` sobre `/_astro/<hash>.css` sigue mostrando `immutable`
- [x] La landing se ve idéntica salvo la fila de teléfono y los enlaces del footer
- [x] El teléfono `+56957675345` aparece idéntico en contacto, footer y JSON-LD, leído siempre desde `src/config/site.ts`
- [x] Texto UI en español; identificadores en inglés
- [x] `pnpm build` genera HTML estático de `/`
