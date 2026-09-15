/**
 * Genera los recursos de imagen estáticos del sitio:
 *   public/og.png             (1200x630, tarjeta social)
 *   public/apple-touch-icon.png (180x180, icono iOS)
 *
 * Se ejecuta a mano cuando cambia la marca: `node scripts/generate-og.mjs`.
 * Los PNG resultantes se versionan; no forma parte del build.
 *
 * Usa `sharp`, que ya es dependencia del proyecto.
 *
 * TIPOGRAFÍA: el texto se pide en Archivo, pero sharp la resuelve vía
 * fontconfig, que en macOS solo ve las fuentes instaladas en el sistema —
 * ignora tanto `fontfile` como los .woff2 de public/fonts. Si Archivo no está
 * instalada, el texto cae a la grotesca por defecto del sistema y el script
 * lo avisa. El wordmark sí es la letra real de la marca: viene del PNG.
 * Para una imagen 100% fiel, instala Archivo y vuelve a ejecutar.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const FONT_URL = "https://github.com/google/fonts/raw/main/ofl/archivo/Archivo%5Bwdth,wght%5D.ttf";
const FONT_PATH = path.join(tmpdir(), "orbital-studio-archivo.ttf");

// Paleta de src/styles/global.css
const BG = "#000000";
const LIME = "#c6ff33";
const LILAC = "#a97bf5";
// Pango no acepta rgba(): equivalente sólido de rgba(255,255,255,0.62) sobre negro.
const MUTED = "#9e9e9e";

async function ensureFont() {
	try {
		await access(FONT_PATH);
	} catch {
		const res = await fetch(FONT_URL);
		if (!res.ok) throw new Error(`No se pudo descargar Archivo: HTTP ${res.status}`);
		await writeFile(FONT_PATH, Buffer.from(await res.arrayBuffer()));
	}
	return FONT_PATH;
}

/** Compara un render pidiendo Archivo contra otro pidiendo una familia inexistente. */
async function warnIfFallback() {
	const probe = (font) =>
		sharp({ text: { text: "Orbital", font, fontfile: FONT_PATH, rgba: true, width: 400 } }).png().toBuffer();
	const [real, bogus] = await Promise.all([probe("Archivo"), probe("__no-existe__")]);
	if (real.equals(bogus)) {
		console.warn(
			"⚠️  Archivo no está instalada en el sistema: el texto usará la grotesca por defecto.\n" +
				"   El wordmark sí conserva la letra de marca. Instala Archivo y reejecuta para fidelidad total.",
		);
	}
}

/** Renderiza texto con Archivo real. Pango no acepta pesos variables, así que se usan los estáticos más cercanos. */
async function text(markup, { width, size, weight = 400, italic = false }) {
	return sharp({
		text: {
			text: `<span size="${size * 1024}" weight="${weight}"${italic ? ' style="italic"' : ""}>${markup}</span>`,
			font: "Archivo",
			fontfile: await ensureFont(),
			rgba: true,
			width,
			wrap: "word",
		},
	})
		.png()
		.toBuffer();
}

async function buildOg() {
	const W = 1200;
	const H = 630;

	// Fondo: negro, el halo lima de la sección de contacto y un anillo orbital
	// dibujado a trazo. El SVG del hero no sirve aquí: librsvg ignora sus
	// filtros de desenfoque y lo rinde como un bloque violeta opaco.
	const background = Buffer.from(`
		<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
			<defs>
				<radialGradient id="glow" cx="10%" cy="0%" r="90%">
					<stop offset="0%" stop-color="${LIME}" stop-opacity="0.17" />
					<stop offset="58%" stop-color="${LIME}" stop-opacity="0" />
				</radialGradient>
				<linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="${LIME}" stop-opacity="0.85" />
					<stop offset="100%" stop-color="${LILAC}" stop-opacity="0.35" />
				</linearGradient>
			</defs>
			<rect width="${W}" height="${H}" fill="${BG}" />
			<rect width="${W}" height="${H}" fill="url(#glow)" />

			<g transform="translate(985 315)">
				<ellipse rx="215" ry="215" fill="none" stroke="url(#ring)" stroke-width="2" opacity="0.9" />
				<ellipse rx="215" ry="82" fill="none" stroke="${LILAC}" stroke-width="1.5" opacity="0.45"
					transform="rotate(-24)" />
				<ellipse rx="150" ry="150" fill="none" stroke="${LIME}" stroke-width="1" opacity="0.22" />
				<circle cx="0" cy="-215" r="9" fill="${LIME}" />
				<circle cx="196" cy="88" r="5" fill="${LILAC}" />
			</g>

			<rect x="80" y="452" width="132" height="3" fill="${LIME}" />
		</svg>
	`);

	// El wordmark original mide 284px: ampliarlo mucho lo dentaría.
	const WORDMARK_W = 300;
	const wordmark = await sharp(path.join(ROOT, "src/assets/logo-wordmark.png"))
		.resize({ width: WORDMARK_W, kernel: "lanczos3" })
		.toBuffer();

	const headline = await text(
		`<span foreground="#ffffff">Ingeniería y diseño</span>\n<span foreground="${LIME}">digital</span>`,
		{ width: 700, size: 66, weight: 800 },
	);

	const location = await text(`<span foreground="${MUTED}">La Serena, Chile — trabajamos remoto</span>`, {
		width: 700,
		size: 26,
		weight: 500,
	});

	await sharp(background)
		.composite([
			{ input: wordmark, top: 96, left: 80 },
			{ input: headline, top: 232, left: 80 },
			{ input: location, top: 492, left: 80 },
		])
		.png({ compressionLevel: 9 })
		.toFile(path.join(ROOT, "public/og.png"));

	console.log("✓ public/og.png (1200x630)");
}

async function buildAppleTouchIcon() {
	const SIZE = 180;
	const background = Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" fill="${BG}"/></svg>`,
	);
	const mark = await sharp(path.join(ROOT, "src/assets/logo-mark.png"))
		.resize({ width: 108, kernel: "lanczos3" })
		.toBuffer();
	const { height } = await sharp(mark).metadata();

	await sharp(background)
		.composite([{ input: mark, top: Math.round((SIZE - height) / 2), left: Math.round((SIZE - 108) / 2) }])
		.png({ compressionLevel: 9 })
		.toFile(path.join(ROOT, "public/apple-touch-icon.png"));

	console.log("✓ public/apple-touch-icon.png (180x180)");
}

await mkdir(path.join(ROOT, "public"), { recursive: true });
await ensureFont();
await warnIfFallback();
await buildOg();
await buildAppleTouchIcon();
