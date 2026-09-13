import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

export const server = {
	contact: {
		send: defineAction({
			accept: "form",
			input: z.object({
				name: z.string().trim().min(1, "Escribe tu nombre."),
				email: z.string().trim().email("Revisa el formato del correo."),
				message: z
					.string()
					.trim()
					.min(1, "Cuéntanos qué necesitas.")
					.max(5000, "El mensaje es demasiado largo."),
			}),
			handler: async ({ name, email, message }) => {
				const apiKey = import.meta.env.RESEND_API_KEY;
				const to = import.meta.env.CONTACT_TO_EMAIL;

				if (!apiKey || !to) {
					throw new ActionError({
						code: "INTERNAL_SERVER_ERROR",
						message:
							"No pudimos enviar el mensaje ahora. Escríbenos a contacto@orbitalstudio.cl.",
					});
				}

				const resend = new Resend(apiKey);
				// `to` viene del entorno. `from` debe ser dominio verificado en Resend
				// (mismo buzón de contacto). Quien escribe es el email del formulario (`replyTo`).
				const { error } = await resend.emails.send({
					from: to,
					to,
					replyTo: email,
					subject: `Consulta desde la web — ${name}`,
					text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
				});

				if (error) {
					throw new ActionError({
						code: "INTERNAL_SERVER_ERROR",
						message:
							"No pudimos enviar el mensaje ahora. Escríbenos a contacto@orbitalstudio.cl.",
					});
				}

				return { ok: true as const };
			},
		}),
	},
};
