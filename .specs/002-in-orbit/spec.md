# Spec: Sección En órbita (productos en curso)

## Objetivo

Mostrar en la landing de Orbital Studio los productos propios en desarrollo (MatriculaYa y RondaControl), con captura, descripción y enlace al teaser público, sin romper el estilo ni el prerender de `/`.

## Requisitos funcionales

- Nueva sección entre Servicios y Estudio, ancla `#en-orbita`.
- Eyebrow «En órbita»; título «Lo que estamos construyendo» (light + bold).
- Intro que aclare que son productos propios en curso, no portafolio de clientes.
- Dos tarjetas, en este orden:
  - **MatriculaYa** → https://teaser-matricula.netlify.app/ — imagen `matriculaya.png`.
  - **RondaControl** → https://ronda-control.netlify.app/ — imagen `ronda-control.png`.
- Cada tarjeta es un enlace externo (`target="_blank"` + `rel="noopener noreferrer"`) con aviso accesible de pestaña nueva.
- Label «En desarrollo» en cada tarjeta.
- CTA de tarjeta «Ver teaser» (estilo secondary, no lima primario).
- Enlace «En órbita» en el menú del header, después de Servicios.
- Sin dependencias nuevas. `/` permanece prerenderizado.

## Fuera de alcance

- Páginas internas por producto
- CMS o fuente dinámica de proyectos
- Más de dos tarjetas en esta iteración
- Embebido dark/light de los teasers
- Analítica de clics

## Criterios de aceptación

- [x] Escritorio: dos columnas; móvil: una columna
- [x] Imágenes en cover ~16:9, sin distorsión
- [x] El menú llega a `#en-orbita`
- [x] Hover/focus coherentes con el resto del sitio (outline lima)
- [x] Enlaces abren el teaser correcto en pestaña nueva
- [x] Texto UI en español; identificadores en inglés
- [x] `pnpm build` genera HTML estático de `/`
