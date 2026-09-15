# Tasks

Orden por dependencia: cada tarea deja el terreno listo para la siguiente. No reordenar sin avisar.

## Fundaciones

1. [x] `astro.config.mjs`: añadir `site: 'https://orbitalstudio.cl'` con comentario que apunte a `src/config/site.ts`. Verificar que `og:url` deja de decir `localhost` en el build.
2. [x] `src/config/site.ts`: añadir `phone: "+56957675345"`, `whatsapp: "56957675345"`, `city: "La Serena"`, `region: "Coquimbo"`, `country: "CL"`, `founders[]` (nombre + `jobTitle` tomados de `Team.astro`).
3. [x] `src/layouts/Layout.astro` — head base: emitir `<link rel="canonical">`, corregir la description por defecto (La Serena + remoto, sin repetir la marca), `lang="es-CL"`, `og:site_name`, `<meta name="robots" content="index, follow, max-image-preview:large">`, reordenar el head y ampliar `Props` con `image?: string`. Sin `og:image` todavía (tarea 8).

## Descubribilidad

4. [x] Instalar `@astrojs/sitemap` y registrarlo en `integrations`. Crear `public/robots.txt` con `Allow: /` y `Sitemap: https://orbitalstudio.cl/sitemap-index.xml`.
5. [x] `src/pages/404.astro`: Layout, `noindex`, título propio y enlaces a las anclas existentes.

## Datos estructurados

6. [x] Extraer `designItems` y `devItems` de `Services.astro` a `src/config/services.ts` e importarlos. Cambio puramente mecánico: la sección debe renderizar idéntica.
7. [x] `src/components/SeoSchema.astro`: `@graph` con `ProfessionalService` (sin `streetAddress`), `WebSite`, dos `Person` y `OfferCatalog` desde `services.ts`. Nodos enlazados por `@id`. Serializar con `JSON.stringify` + `set:html`. Insertar en `Layout.astro`.

## Imágenes y marca

8. [x] `scripts/generate-og.mjs` con `sharp`: emitir `public/og.png` (1200×630) y `public/apple-touch-icon.png` (180×180). Versionar ambos PNG. Cablear `og:image` (+ `width`/`height`/`alt`), `twitter:image`, `twitter:card: summary_large_image` y `apple-touch-icon` en el Layout.

## Contacto y NAP

9. [x] `src/components/Contact.astro`: fila «Teléfono» en el `<dl>` con `tel:` y enlace a WhatsApp, leyendo de `site.ts`.
10. [x] `src/components/Footer.astro`: NAP corto (ciudad, correo, teléfono) y enlaces a las secciones. Hoy el footer no tiene ningún enlace.

## Rendimiento y cabeceras

11. [x] Autoalojar Archivo: descargar los **dos** woff2 variables (roman e itálica, 200-900) a `public/fonts/`, declarar `@font-face` + `font-display: swap` y fallback con `size-adjust`/`ascent-override` en `global.css`, precargar la roman en el head, y eliminar los dos `preconnect` y el stylesheet de Google Fonts. **Confirmar que las cursivas del footer siguen en cursiva** (`font-synthesis: none` en `global.css:41` no las sintetiza).
12. [x] `vercel.json`: `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. No declarar nada sobre `/_astro/*`.
13. [x] Reducir `felipe-segovia.png` y `mauricio-diaz.png` a ~1200px de ancho; añadir `widths`/`densities` a sus dos `<Image>` en `Team.astro`.

## Cierre

14. [x] Pasada de verificación completa contra los criterios de aceptación de `spec.md`: greps sobre `dist/`, `/robots.txt` y `/sitemap-index.xml` en preview, validación del `ld+json`, comparación visual y `pnpm build` limpio.

## Fuera del repo (acción del dueño)

15. [ ] Vercel → Settings → Domains: cambiar el redirect `www` → apex de 307 a 308.
16. [ ] Alta de la propiedad en Search Console y envío del sitemap. Revisar a 4 semanas que `site:orbitalstudio.cl` deje de dar 0 resultados.
