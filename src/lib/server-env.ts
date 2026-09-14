/** Lee secretos de servidor en local (import.meta.env) y en Vercel (process.env). */
export function serverEnv(name: string): string {
	const fromMeta = (import.meta.env as Record<string, string | undefined>)[name];
	const fromProcess =
		typeof process !== "undefined" ? process.env[name] : undefined;
	return (fromMeta ?? fromProcess ?? "").trim();
}
