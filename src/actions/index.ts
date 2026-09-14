import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

import { site } from "../config/site";
import { resendFrom } from "../lib/contact-config";
import { contactSubject, emailBodies, isValidEmail } from "../lib/contact";
import { serverEnv } from "../lib/server-env";

export const server = {
	contact: {
		send: defineAction({
			accept: "form",
			input: z.object({
				name: z.string().trim().min(1, "Escribe tu nombre."),
				email: z.string().trim().min(1, "Escribe tu correo."),
				message: z
					.string()
					.trim()
					.min(1, "Cuéntanos qué necesitas.")
					.max(5000, "El mensaje es demasiado largo."),
			}),
			handler: async ({ name, email, message }) => {
				if (!isValidEmail(email)) {
					throw new ActionError({
						code: "BAD_REQUEST",
						message: "Revisa el formato del correo.",
					});
				}

				const apiKey = serverEnv("RESEND_API_KEY");
				const from = resendFrom();

				if (!apiKey || !from) {
					console.error("[contact.send] Falta RESEND_API_KEY o RESEND_FROM válido.");
					throw new ActionError({
						code: "INTERNAL_SERVER_ERROR",
						message: `No pudimos enviar el mensaje ahora. Escríbenos a ${site.contactEmail}.`,
					});
				}

				const resend = new Resend(apiKey);
				const { html, text } = emailBodies(name, email, message);
				const { data, error } = await resend.emails.send({
					from,
					to: [site.contactEmail],
					replyTo: email,
					subject: contactSubject(name),
					html,
					text,
				});

				if (error) {
					console.error("[contact.send] Resend:", error.name, error.message);
					throw new ActionError({
						code: "INTERNAL_SERVER_ERROR",
						message: `No pudimos enviar el mensaje ahora. Escríbenos a ${site.contactEmail}.`,
					});
				}

				return { ok: true as const, id: data?.id };
			},
		}),
	},
};
