// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Dominio de producción: de él salen canonical, og:url y el sitemap.
	// Debe coincidir con `url` en src/config/site.ts.
	site: 'https://orbitalstudio.cl',
	integrations: [sitemap()],
	adapter: vercel(),
});
