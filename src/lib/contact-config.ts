import { site } from "../config/site";

/**
 * Remitente técnico de Resend (dominio verificado).
 * Opcional vía `RESEND_FROM`; si falta, usa companyName + contactEmail del site.
 */
export function resendFrom(): string {
	const fromEnv = import.meta.env.RESEND_FROM?.trim() ?? "";
	if (fromEnv) return fromEnv;
	return `${site.companyName} <${site.contactEmail}>`;
}
