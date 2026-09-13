# Orbital Studio — Landing

Sitio estático en Astro para promocionar Orbital Studio: servicios, estudio, equipo y formulario de contacto.

El HTML de la landing se prerenderiza. El envío del formulario corre on-demand en Vercel (Astro Actions + Resend) para no exponer `RESEND_API_KEY`.

## Requisitos

- Node.js `>=22.12.0`
- pnpm `10.7.1` (ver `packageManager` en `package.json`)

## Comandos

| Comando | Acción |
| --- | --- |
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Servidor de desarrollo en `localhost:4321` |
| `astro dev --background` | Dev server en segundo plano (ver `AGENTS.md`) |
| `pnpm build` | Build de producción |
| `pnpm preview` | Previsualiza el build |

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

- `RESEND_API_KEY` — clave de API de Resend (nunca `PUBLIC_*`)
- `CONTACT_TO_EMAIL` — destinatario (p. ej. `contacto@orbitalstudio.cl`); el correo del visitante va en el formulario y se usa como `replyTo`

En Vercel, define las mismas variables en el proyecto.

## Despliegue

El proyecto usa `@astrojs/vercel`. Conecta el repositorio a Vercel; el adapter genera el output compatible con Functions para las Actions.

## Specs

Las features se documentan con SDD en `.specs/`. Ver `AGENTS.md` para la metodología.
