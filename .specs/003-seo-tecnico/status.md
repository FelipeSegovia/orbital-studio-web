Estado: done (tareas 1-14). Pendientes 15-16: acciones del dueño fuera del repo.
Última tarea completada: 14 (verificación end-to-end)
Siguiente: 15 (Vercel: redirect www→apex de 307 a 308) y 16 (alta en Search Console + envío del sitemap)

Verificado:
- dist/ sin `localhost` y sin "Santiago"; canonical y og:url en https://orbitalstudio.cl/
- robots.txt, sitemap-index.xml y sitemap-0.xml generados con URLs de producción
- 404 propia con `noindex, follow`, fuera del sitemap
- JSON-LD: 4 nodos, validado contra el vocabulario oficial de Schema.org, 0 problemas,
  todas las referencias @id resueltas, 10 servicios en el OfferCatalog
- Teléfono idéntico en contacto, footer y schema, leído siempre desde src/config/site.ts
- Cero peticiones externas en runtime; Archivo normal e itálica cargan autoalojadas
- /_astro/* conserva `public, max-age=31536000, immutable` del adapter
- Sin errores de consola ni peticiones fallidas; regresión visual revisada en escritorio y móvil

Desvíos respecto al plan:
1. `size-adjust` omitido en el fallback. El xAvgCharWidth de Archivo (OS/2 moderno) y el de Arial
   (fórmula antigua ponderada) no son comparables: daba 130%, que agrandaría el texto de fallback.
   Se aplican solo los overrides verticales (ascent 87.8% / descent 21% / line-gap 0%), extraídos
   del TTF real, que son los que evitan el CLS.
2. Se descargó solo el subconjunto `latin` (no latin-ext ni vietnamese): verificado carácter a
   carácter que cubre el 100% del texto del sitio.
3. Se autoalojó la variante SIN eje `wdth`, idéntica a la que servía Google Fonts. Ver hallazgo abajo.
4. Fotos del equipo: eran PNG sin transparencia de 1024x1536 (2.1 y 1.8 MB). No había que reducir
   dimensiones (ya estaban bajo 1200px); se convirtieron a JPEG q92 → 339 y 249 KB (-85%).
5. `.visually-hidden` estaba definida scoped dentro de InOrbit.astro y no aplicaba en Contact.
   Se promovió a global.css y se eliminó el duplicado.
6. `inLanguage` no es válida en ProfessionalService (solo en CreativeWork y derivados). Detectado
   por la validación contra el vocabulario y eliminada; sigue presente en el nodo WebSite.

Hallazgos abiertos (requieren decisión, no bloquean):
- `font-variation-settings: "wdth" 118` en global.css es código muerto: el archivo servido no trae
  el eje wdth. Activarlo ensancharía los títulos, así que es un cambio de diseño, no un arreglo.
- Bug preexistente en Hero.astro:18-19 — el compilador de Astro colapsa el salto de línea y
  renderiza "digital que<em>transforma", sin espacio. Fuera del alcance de esta spec.
- El alt de la foto de Felipe dice "ingeniero en computación"; el rol visible y el schema dicen
  "Ingeniero de software". Inconsistencia menor, preexistente.
- La imagen OG lleva el wordmark real de marca, pero su texto sale en la grotesca del sistema:
  fontconfig en macOS ignora `fontfile`. Instalar Archivo y reejecutar el script la deja 100% fiel.
