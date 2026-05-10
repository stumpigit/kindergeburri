/**
 * Komprimiert JPG-Lieferungen zu WebP für static/images.
 * Aufruf: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'static', 'images');

/** @type {{ input: string; output: string; width: number; quality?: number }[]} */
const JOBS = [
	{
		input: 'black_crump_paper (2).jpg',
		output: 'black-paper-bg.webp',
		width: 1920,
		quality: 78
	},
	{
		input: 'desk-with-criminal-profile-documents-and-evidence-2026-03-18-15-06-11-utc.jpg',
		output: 'hero-desk.webp',
		width: 1920,
		quality: 82
	},
	{
		input: 'Vintage Grainy Paper Texture_03.jpg',
		output: 'paper-grain-light.webp',
		width: 1400,
		quality: 80
	},
	{
		input: 'crime-scene-investigation-evidence-on-a-table-2026-01-08-23-53-47-utc.jpg',
		output: 'fragments-evidence.webp',
		width: 1600,
		quality: 82
	},
	{
		input: 'library-catalogue-cabinet-2026-03-24-00-22-42-utc.jpg',
		output: 'hero-archive.webp',
		width: 1400,
		quality: 82
	},
	{
		input: 'old-fashioned-detective-with-smoking-pipe-at-table-2026-01-06-14-58-27-utc.jpg',
		output: 'mood-detective.webp',
		width: 1200,
		quality: 80
	}
];

const fs = await import('fs/promises');

for (const job of JOBS) {
	const inPath = path.join(ROOT, job.input);
	const outPath = path.join(ROOT, job.output);
	try {
		await fs.access(inPath);
	} catch {
		console.warn(`Skip (fehlt): ${job.input}`);
		continue;
	}
	let img = sharp(inPath).resize({
		width: job.width,
		fit: 'inside',
		withoutEnlargement: true
	});

	await img.webp({ quality: job.quality ?? 80 }).toFile(outPath);

	const statIn = await fs.stat(inPath);
	const statOut = await fs.stat(outPath);
	console.log(
		`${job.output}: ${(statIn.size / 1024).toFixed(0)} KB → ${(statOut.size / 1024).toFixed(0)} KB`
	);
}

console.log('Done:', ROOT);
