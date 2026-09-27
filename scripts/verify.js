// Runs the copy and origin checks over every prerendered page. Run after `pnpm build`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { findCopyViolations, findForeignOrigins, findForeignOriginsInAsset } from './verify-lib.js';

const SITE = 'https://meontor.com';
const ROOT = '.svelte-kit/output/prerendered/pages';
const ASSETS = '.svelte-kit/output/client/_app';

function* files(dir, ext) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* files(path, ext);
		else if (ext.some((e) => name.endsWith(e))) yield path;
	}
}

let failures = 0;
let pages = 0;
for (const file of files(ROOT, ['.html'])) {
	pages++;
	const html = readFileSync(file, 'utf8');
	for (const hit of [...findCopyViolations(html), ...findForeignOrigins(html, SITE)]) {
		console.error(`${file}: ${hit}`);
		failures++;
	}
}
let assets = 0;
for (const file of files(ASSETS, ['.css', '.js'])) {
	assets++;
	for (const hit of findForeignOriginsInAsset(readFileSync(file, 'utf8'), SITE)) {
		console.error(`${file}: ${hit}`);
		failures++;
	}
}
console.log(`${pages} pages and ${assets} assets checked, ${failures} problems`);
process.exit(failures || pages === 0 ? 1 : 0);
