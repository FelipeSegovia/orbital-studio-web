Estado: done (1 criterio pendiente de dominio Resend en producción)
Última tarea completada: alineación `RESEND_FROM` con teaser-ronda360
Siguiente: verificar dominio `orbitalstudio.cl` en Resend y variables en Vercel; redeploy
Notas:
- Re-ejecutado 2026-09-13: build OK (`static` + function `_render`), validación cliente OK, Action POST a Resend OK.
- El 403 venía del fallback `from` con `contacto@orbitalstudio.cl` sin dominio verificado; ahora `RESEND_FROM` es obligatorio y se parsea como en teaser-ronda360.
- Pruebas locales: `RESEND_FROM=onboarding@resend.dev`.
- UI de error en español OK; `mailto:contacto@orbitalstudio.cl` visible.
