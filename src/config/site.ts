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

	/** Teléfono en E.164: lo usan el enlace `tel:`, el footer y el JSON-LD. */
	phone: "+56957675345",
	/** Mismo número sin `+` ni separadores, formato que exige wa.me. */
	whatsapp: "56957675345",
	/** Legible para humanos; solo se muestra, nunca se usa en enlaces. */
	phoneDisplay: "+56 9 5767 5345",

	/**
	 * Ubicación real del estudio. Operamos remoto, pero la localidad ancla
	 * la señal local. No hay dirección de calle publicable: se omite a
	 * propósito en el schema en vez de inventarla.
	 */
	city: "La Serena",
	region: "Coquimbo",
	country: "CL",
	locationLabel: "La Serena, Chile — trabajamos remoto",

	/** Fundadores, para los nodos Person del JSON-LD. */
	founders: [
		{ name: "Mauricio Díaz", jobTitle: "Diseñador de producto", slug: "mauricio-diaz" },
		{ name: "Felipe Segovia", jobTitle: "Ingeniero de software", slug: "felipe-segovia" },
	],
} as const;
