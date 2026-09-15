/**
 * Catálogo de servicios: fuente única para la sección Servicios y para el
 * OfferCatalog del JSON-LD. Agregar un servicio aquí lo refleja en ambos.
 */
export type ServiceItem = {
	label: string;
	accent: "lime" | "lilac";
	text: string;
};

export const designItems: ServiceItem[] = [
	{
		label: "Gráfico",
		accent: "lime",
		text: "Diseño digital e impreso, editorial, mailings e identidad visual",
	},
	{
		label: "UX · UI",
		accent: "lilac",
		text: "Investigación, flujos de usuario, wireframes y prototipos.",
	},
	{
		label: "Multimedia",
		accent: "lime",
		text: "Animación de logotipos y material para content creator.",
	},
	{
		label: "Ilustración digital",
		accent: "lilac",
		text: "Piezas originales para marca, producto y redes.",
	},
	{
		label: "Industrial",
		accent: "lime",
		text: "Planificación, conceptos, manufactura e impresión 3D.",
	},
];

export const devItems: ServiceItem[] = [
	{
		label: "Sitios web",
		accent: "lilac",
		text: "Landing, institucional y sitios a medida.",
	},
	{
		label: "Autoadministrables",
		accent: "lime",
		text: "Sitios que puedes editar sin depender de un desarrollador.",
	},
	{
		label: "Pagos",
		accent: "lilac",
		text: "Webpay, Mercado Pago y PayPal.",
	},
	{
		label: "Integraciones",
		accent: "lime",
		text: "Conectar sistemas, APIs y flujos de datos.",
	},
	{
		label: "Aplicaciones móviles",
		accent: "lilac",
		text: "Apps iOS y Android para el negocio.",
	},
];
