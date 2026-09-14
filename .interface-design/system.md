# Orbital Studio — interface system

Landing de marca (Astro estático). No es un dashboard: las reglas de producto UI del skill aplican solo cuando se reutilizan tokens/patrones aquí. Fuente de verdad de tokens: `src/styles/global.css`.

## Direction and feel

- **Mundo:** estudio de ingeniería + diseño digital; órbita, arcos, sistemas.
- **Sensación:** oscuro, preciso, técnico-creativo. Aire generoso en secciones; contraste alto; lima y lila como acentos escasos (~10%).
- **Idioma UI:** español. Identificadores en inglés.
- **Firma:** tipografía Archivo con light (200) + bold (800) en headings; labels uppercase tracked; glass cards; índice 01/02; arco/glow violeta en hero.

## Depth strategy

- **Una estrategia:** borders soft + glass (blur + inset highlight). Sin sombras dramatizadas nuevas.
- Glass: `--glass-bg` + `--glass-shadow` + border `rgba(255,255,255,0.07)` · radius **10px**.
- Separación de sección: `border-bottom: 1px solid var(--color-border-soft)`.
- Focus: outline lima 2px / offset 2px.

## Spacing base

- Base implícita **4px**; ritmo frecuente **8 / 12 / 14 / 28 / 56 / 96**.
- Sección: padding vertical **96px**; gap intro→contenido **56px**.
- Container: `--max-width: 1180px`; padding horizontal **28px**.
- Grid de cards: gap **28px**; `minmax(min(100%, 320px), 1fr)` (o 420px en Team).

## Hierarchy

- Ratio de sección ≈ **1.25–1.33** desde body ~15–15.5px.
- `.section-heading`: clamp(30px, 3.4vw, 44px) · tracking -0.03em · `wdth` 118 · `.light` 200 / `.bold` 800.
- `.eyebrow`: 12px · letter-spacing 0.24em · uppercase · lima.
- Body de sección: 15.5px / 1.65 · `--color-muted-soft`.
- En cards: título 26px/800 blanco; descripción 15px ~78% blanco; meta 11–12px tracked.
- **Focal por sección:** un job. En En órbita el focal son las capturas; el copy va demoted debajo.

## Palette (tokens)

| Token | Uso |
|-------|-----|
| `--color-bg` `#000000` | Canvas |
| `--color-text` `#ffffff` | Primario |
| `--color-lime` `#c6ff33` | CTA primario, eyebrows, status lima, focus |
| `--color-lilac` `#a97bf5` | Acento secundario, labels alternos |
| `--color-violet` `#7d39eb` | Glow / marca |
| `--color-muted` / `--color-muted-soft` / `--color-label` | Jerarquía de texto |
| `--color-border` / `--color-border-soft` | Divisores |

No introducir tipografías nuevas ni temas pastel/cream/purple-on-white genéricos.

## Component patterns

### Button primary (`.btn-primary` / header CTA)
- min-height **44px** · pad **15px 28px** (header: 11px 20px) · radius **10px**
- 13–13.5px · letter-spacing 0.12em · uppercase · weight 600
- bg lima · texto negro · inset highlight + sombra lima suave
- hover: `filter: brightness(1.12)`

### Button secondary (`.btn-secondary` / card CTA «Ver teaser»)
- min-height **44px** · pad ~12–15px 22–28px · radius **10px**
- border `rgba(255,255,255,0.14)` · bg `rgba(255,255,255,0.05)` · inset highlight
- hover: border + texto lima

### Section intro (Servicios / En órbita / Nosotros)
- Grid 2 cols · gap 56px · align end
- Border bottom `--color-border` · padding-bottom 28px
- Columna izq: eyebrow + heading; der: párrafo intro
- ≤768px: 1 col · gap 24px

### Glass card (`.glass-card`)
- Border soft · radius 10px · glass bg/shadow · backdrop blur 18px

### Project teaser card (`.in-orbit-card`) — En órbita
- Elemento raíz: `<a class="glass-card in-orbit-card">` (hit area completa)
- Anular color lima global del `a` dentro de la card (`color: var(--color-text)` + hover sin volverse lila)
- Media: aspect-ratio **16/9** · `object-fit: cover` · `object-position: center top` · outline inset 1px `rgba(0,0,0,0.1)`
- Body pad **28px 30px 30px** · gap 14px
- Meta: status «En desarrollo» (lima/lila alternados) + índice 01/02
- CTA visual: span estilo secondary «Ver teaser» (no botón lima)
- Hover card: solo `border-color: lima`
- Externos: `target="_blank"` · `rel="noopener noreferrer"` · aviso visually-hidden al final del enlace
- Imágenes: `astro:assets` `Image` desde `src/assets/`

### Service / team cards
- Padding ~30–36px; labels uppercase tracked lima/lila; índices 01/02 en meta.

## Rejected (no repetir)

- Grillas tipo Dribbble / logos de clientes / métricas 3-up
- Badges pill SaaS genéricos
- Tipografía distinta a Archivo
- Cards con sombra nueva o radius grande inconsistente
- CTA lima dentro de tarjetas de producto (reservar lima a «Hablemos» / CTAs principales)

## Page order (landing)

Hero → Servicios → **En órbita** (`#en-orbita`) → Estudio → Nosotros → Contacto
