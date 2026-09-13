# AGENTS.md

## Descripción general

Landing para promocionar mi empresa **OrbitalStudio** para que los usuarios puedan visualizar los servicios que se ejecutan, puedan enviar correos electrónicos para ponerse en contacto con nosotros.

## Reglas no negociables (landing)

Este proyecto es un sitio Astro **prerenderizado** (HTML estático). El formulario de contacto corre on-demand en Vercel (Astro Actions + `resend`) para no exponer `RESEND_API_KEY`. Para este sitio rigen estas en su
lugar:

1. **Stack.** Astro + TypeScript en modo `strict` (ya configurado en
   `tsconfig.json`). Cero frameworks de UI adicionales (React, Vue, Svelte).
   Dependencias actuales ajenas a Astro/Tailwind: `resend` (envío de correo
   del formulario) y `@astrojs/vercel` (Action en Functions). Cualquier
   dependencia nueva se justifica por escrito en el PR que la introduce.
2. **Idioma.** Identificadores y commits en inglés; comentarios y documentación
   en español; todo texto visible al usuario en español.

## Metodología: Spec-Driven Development (SDD)

Este proyecto sigue SDD para features que tocan más de un archivo o capa
(DB, API, UI). Los bugfixes simples y cambios triviales de una línea
no requieren este flujo.

### Ubicación de los documentos

Cada feature vive en `.specs/<numero>-<nombre-corto>/` con:

- `spec.md` — qué debe hacer, qué queda fuera de alcance, criterios de aceptación
- `plan.md` — diseño técnico: archivos a tocar, contratos, algoritmo
- `tasks.md` — lista numerada y ordenada de tareas ejecutables
- `status.md` — estado actual y qué sigue (para retomar entre sesiones)

### Reglas de flujo (IMPORTANTE)

1. **Nunca escribas código de una feature nueva sin spec.md aprobado.**
   Si no existe, propón uno primero y espera confirmación antes de seguir.
2. **No pases de spec a plan, ni de plan a tasks, sin que yo lo apruebe.**
   Genera el documento y detente — no continúes automáticamente a la siguiente fase.
3. **Sigue tasks.md en orden.** No te adelantes a tareas futuras ni reordenes
   sin avisar primero.
4. **Actualiza status.md** después de cada tarea completada: qué se hizo,
   qué sigue, y cualquier decisión o desvío del plan original.
5. **Si el plan resulta inviable durante la implementación**, detente y
   avísame en vez de improvisar una solución distinta silenciosamente.

### Convención de numeración

Las specs se numeran secuencialmente en `.specs/` de la raíz del repo: `001-`,
`002-`, etc. Antes de crear una nueva, revisa `.specs/` para usar el siguiente
número disponible.

### Comandos de desarrollo

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

### Documentación Astro

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
