# Spec: Formulario de contacto con Astro Actions + Resend

## Objetivo

El visitante envía un correo a Orbital Studio desde la landing, sin exponer `RESEND_API_KEY`, manteniendo `/` como HTML prerenderizado.

## Requisitos funcionales

- Campos visibles (español): nombre, correo, mensaje. Identificadores en inglés: `name`, `email`, `message`.
- Validación en cliente y en servidor (Zod en la Action).
- Envío con Resend hacia `contacto@orbitalstudio.cl`.
- Éxito o error en español **en la página**; se elimina el flujo `mailto:` del submit. El enlace `mailto:` del bloque de datos de contacto se conserva.
- `index.astro` permanece prerenderizado. Solo la Action corre on-demand en Vercel.
- Actualizar AGENTS.md: dependencia autorizada `@astrojs/vercel` (no Netlify). Ajustar la nota de `landing/.specs/` para que apunte a `.specs/` de la raíz.
- README en español (qué es el sitio, comandos, env, deploy). `.env.example` sin secretos.

## Fuera de alcance

- Migrar a Tailwind
- i18n
- Captcha de terceros
- CRM
- Cambiar copy de Hero / Servicios / Estudio / Equipo

## Criterios de aceptación

- [x] `pnpm build` genera HTML estático de `/` y el endpoint de Actions
- [ ] Submit válido llama a Resend y muestra confirmación; no abre el cliente de correo — **parcial**: llama a Resend y no abre mailto; la confirmación de éxito queda pendiente de verificar el dominio en Resend (hoy responde 403)
- [x] Input inválido no llama a Resend y muestra errores
- [x] Fallo de Resend o key ausente: mensaje de error en español; el usuario puede usar el correo visible
- [x] No existe `PUBLIC_RESEND_*`; la key no viaja al cliente
- [x] Texto UI en español; identificadores/commits en inglés
- [x] AGENTS.md lista `resend` y `@astrojs/vercel`
