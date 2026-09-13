# Plan: Formulario de contacto con Astro Actions + Resend

## Archivos a tocar

- `astro.config.mjs` — adapter `@astrojs/vercel`
- `package.json` — añadir `resend` y `@astrojs/vercel`
- `src/actions/index.ts` (nuevo) — Action `contact.send`
- `src/components/Contact.astro` — RPC de cliente, estados ES, campos en inglés
- `AGENTS.md` / `CLAUDE.md` — stack Vercel, specs en raíz
- `README.md` — documentación del proyecto en español
- `.env.example` — variables sin secretos

## Diseño

```
Browser → GET / (HTML estático)
Browser → POST Action contact.send (FormData)
Action → Zod (name, email, message)
Action → Resend emails.send
Action → data | ActionError
```

### Contrato de la Action

- `contact.send` con `accept: 'form'`
- Input Zod: `name` (string, trim, min 1), `email` (email), `message` (string, trim, min 1, max 5000)
- Handler: `new Resend(import.meta.env.RESEND_API_KEY)`, `from`/`to` desde env, subject `Consulta desde la web — {name}`, reply-to = email del visitante
- Errores: `ActionError` (`BAD_REQUEST` / `INTERNAL_SERVER_ERROR`); sin filtrar la API key

### Por qué no form action HTML

Las docs de Astro exigen página on-demand para `action={actions…}` en el `<form>`. Eso rompería el prerender de `/`. El submit se hace en el `<script>` con `actions.contact.send(formData)` (RPC de cliente).

### Variables de entorno

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL=contacto@orbitalstudio.cl`
- `CONTACT_FROM_EMAIL` — dominio verificado en Resend

## Verificación end-to-end

- `pnpm build` + comprobar HTML estático de `/` y función de Actions
- Navegador: validación vacía / email inválido / submit (éxito o error controlado)
- El `mailto:` del listado de contacto sigue funcionando
