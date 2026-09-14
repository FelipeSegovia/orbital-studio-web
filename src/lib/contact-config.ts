/**
 * Configuración del formulario que **solo** puede vivir en servidor.
 *
 * No importar este módulo desde un `<script>` de cliente: Vite inlinearía
 * secretos en el bundle.
 */
import { site } from "../config/site";
import { isValidEmail } from "./contact";
import { serverEnv } from "./server-env";

function stripWrappingQuotes(value: string): string {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1).trim();
	}
	return value;
}

/**
 * Vercel inyecta env vars literales: comillas y `Name <email>` no se
 * interpretan como en un `.env`. Devolvemos siempre `Producto <correo>`
 * o `null` si no hay un email usable en `RESEND_FROM`.
 */
export function resendFrom(): string | null {
	const raw = serverEnv("RESEND_FROM");
	if (!raw) return null;

	const unquoted = stripWrappingQuotes(raw.trim());
	if (!unquoted) return null;

	const angled = /^(.*)<([^>]+)>$/.exec(unquoted);
	const email = (angled ? angled[2] : unquoted).trim();
	if (!isValidEmail(email)) return null;

	return `${site.productName} <${email}>`;
}
