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

Copia `.env.example` a `.env` y completa **ambas** variables:

- `RESEND_API_KEY` — clave de API de Resend (nunca `PUBLIC_*`)
- `RESEND_FROM` — **solo el correo** del remitente (sin comillas ni `Nombre <...>`). El código arma `Orbital Studio <correo>`.

**Pruebas locales:** `RESEND_FROM=onboarding@resend.dev`. Resend suele entregar esos envíos a la cuenta dueña de la API key o los muestra en el dashboard; el destinatario del formulario sigue siendo `contacto@orbitalstudio.cl` definido en [`src/config/site.ts`](src/config/site.ts).

**Producción:** un correo de un dominio verificado en [Resend → Domains](https://resend.com/domains) (por ejemplo `contacto@orbitalstudio.cl`). Sin dominio verificado, Resend responde 403.

El correo del visitante va en el formulario y se usa como `replyTo`.

En Vercel, define `RESEND_API_KEY` y `RESEND_FROM` en **Project → Settings → Environment Variables** para **Production** (y Preview si quieres). Después de añadirlas o cambiarlas, **vuelve a desplegar**.

El `.env` local no se sube a Vercel. Si en local funciona y en web no, casi siempre falta alguna variable en Vercel o el deploy es anterior a configurarlas.

Para ver el error real: Vercel → Deployment → Logs / Functions, busca `[contact.send]`.

## Despliegue

El proyecto usa `@astrojs/vercel`. Conecta el repositorio a Vercel; el adapter genera el output compatible con Functions para las Actions.

### Checklist de correo en producción

1. En [Resend](https://resend.com/domains), verifica el dominio `orbitalstudio.cl` (registros DNS SPF/DKIM que indique el panel).
2. En Vercel, configura `RESEND_API_KEY` y `RESEND_FROM=contacto@orbitalstudio.cl` (solo el email, sin comillas).
3. Redeploy del proyecto.
4. Prueba el formulario en la URL publicada; confirma recepción en `contacto@orbitalstudio.cl` y que Reply-To sea el correo del visitante.

## Specs

Las features se documentan con SDD en `.specs/`. Ver `AGENTS.md` para la metodología.
