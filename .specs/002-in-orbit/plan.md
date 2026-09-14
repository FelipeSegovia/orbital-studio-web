# Plan: Sección En órbita

## Archivos a tocar

- `.specs/002-in-orbit/` — spec, plan, tasks, status (nuevo)
- `src/assets/matriculaya.png` — captura MatriculaYa (nuevo)
- `src/assets/ronda-control.png` — captura RondaControl (nuevo)
- `src/components/InOrbit.astro` — sección + estilos scoped (nuevo)
- `src/pages/index.astro` — insertar `<InOrbit />` entre Servicios y Estudio
- `src/components/Header.astro` — enlace `#en-orbita` tras Servicios

## Diseño

- Reutilizar `.eyebrow`, `.section-heading`, `.glass-card` y el intro a dos columnas de Servicios/Team.
- Focal: capturas; copy demoted debajo.
- Tarjeta completa = `<a>`; anular color lima global dentro de la tarjeta.
- Hover: borde lima (como `.btn-secondary`); sin sombras nuevas.
- Labels «En desarrollo» en lima/lila alternados; índices 01/02.
- Imágenes vía `astro:assets` `Image`, object-fit cover ~16:9, outline inset 1px.

## Verificación end-to-end

1. Desktop y ~390px: layout, contraste, hover/focus.
2. Clic menú «En órbita» → scroll a la sección.
3. Clic cada tarjeta → teaser correcto en pestaña nueva.
4. `pnpm build` sin errores; `/` sigue estático.
