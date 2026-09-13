import { site } from "../config/site";

export function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function contactSubject(name: string): string {
	return `Consulta desde la web — ${name}`;
}

export function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

export function emailBodies(
	name: string,
	email: string,
	message: string,
): { html: string; text: string } {
	const origin = `Landing ${site.productName}`;
	const text = [
		`Origen: ${origin}`,
		`Nombre: ${name}`,
		`Correo: ${email}`,
		"",
		message,
	].join("\n");
	const html = `<p><strong>Origen:</strong> ${escapeHtml(origin)}</p>
<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
<p><strong>Correo:</strong> ${escapeHtml(email)}</p>
<p><strong>Mensaje:</strong></p>
<p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>`;
	return { html, text };
}
