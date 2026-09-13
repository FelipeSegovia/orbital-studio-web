/**
 * Punto único de edición para marca, contacto y dominio.
 * Ningún componente de contacto escribe estos valores literalmente.
 */
export const site = {
	productName: "Orbital Studio",
	/** Nombre en el asunto del correo de contacto (formulario y mailto). */
	contactBrandName: "Orbital Studio",
	companyName: "Orbital Studio",

	contactEmail: "contacto@orbitalstudio.cl",

	url: "https://orbitalstudio.cl",
} as const;
