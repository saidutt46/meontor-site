# Meontor Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, tracker-free marketing and support site for the Meontor iOS app at `~/Code/web/meontor-site`, modelled on `~/Code/web/oareo-client`.

**Architecture:** A SvelteKit 2 site, fully prerendered, with Tailwind 4 tokens in `app.css` and one component per showcase idea. The brand assets (mark and wordmark SVG, icons, screenshots) are generated from the real app. A small Node verification library, unit-tested with Vitest, scans the prerendered HTML for banned copy and for any third-party origin.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript, Vitest, pnpm 10 on Node 24, `adapter-auto` (Vercel). Asset tooling: Swift (CoreText), ImageMagick 7, `xcrun simctl`.

**Spec:** `docs/superpowers/specs/2026-09-26-meontor-site-design.md`

## Global Constraints

- Shell: every pnpm/node command runs with `export PATH=$HOME/.nvm/versions/node/v24.13.0/bin:$PATH` (the default shell has no pnpm).
- **No commits, pushes, GitHub repo, Vercel project or DNS without the owner's explicit approval.** The "Checkpoint" step in each task means stop and report. It never means commit.
- No analytics and no third-party requests. The CSP is `'self'` plus `data:` images. No Google Fonts, no icon CDN, no Three.js.
- Fonts: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, "Helvetica Neue", Arial, sans-serif`.
- Copy (DESIGN §11), for anything a person reads, including `alt`, `aria-label`, `<title>` and meta `content`:
  - No `—` (em dash).
  - None of the words `only`, `just`, `failed`, `missed`, `behind`, `streak broken`.
  - No deficit, comparison or medical claims, and no role weighing.
- Engine honesty: the Mentor is "written by Apple Intelligence on your iPhone", or "written on device" when Apple Intelligence isn't available.
- Constants: `SITE_URL = 'https://meontor.com'`, `SUPPORT_EMAIL = 'saidutt46@gmail.com'`, `APP_STORE_URL = null`, `SITE_NAME = 'Meontor'`, `COMPANY = 'Daivat Creations'`.
- Accent: light `#4F63D9` (5.1:1 on white), dark `#7D94F0` (7.4:1 on black). This deviates from the spec's "about #5B6EE1", which measures 4.4:1 and fails AA.
- Colour scheme follows `prefers-color-scheme` with no toggle. Everything honours `prefers-reduced-motion`.
- Prettier: tabs, single quotes, no trailing commas, width 100 (Oareo's `.prettierrc`).
- File header on source files: the Daivat Creations copyright block Oareo uses.

## Review Focus

1. **Reduced motion:** with `prefers-reduced-motion: reduce`, the mark must not breathe and sections must appear without fading. Pinned by a CSS assertion in Task 3's check.
2. **No JavaScript:** the site is prerendered, so every page's content, the FAQ answers and the nav links must work with JS disabled. FAQ uses `<details>`, and the mobile menu falls back to visible footer links. Checked in Task 9.
3. **Narrow phones (320–390px):** no horizontal scroll, and the widget showcase and phone frames scale down. Checked in Task 9 at 320px.
4. **Dark mode:** screenshots switch to dark variants via `<picture>` with a `prefers-color-scheme` media source, and the SVG mark and wordmark use `currentColor`. Checked in Task 9.
5. **Copy regressions from edits:** any new string with an em dash or banned word fails `pnpm verify`. Pinned by the Vitest cases in Task 1, run against the build in every later task.

---

### Task 1: Scaffold, tokens, and the verification library

**Files:**

- Create: `package.json`, `.npmrc`, `.prettierrc`, `.prettierignore`, `.gitignore`, `eslint.config.js`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `vercel.json`
- Create: `src/app.html`, `src/app.css`, `src/app.d.ts`, `src/routes/+layout.ts`, `src/routes/+layout.svelte`, `src/routes/+page.svelte` (stub), `src/lib/constants/app.ts`
- Create: `scripts/verify-lib.js`, `scripts/verify.js`, `scripts/verify-lib.test.js`

**Interfaces:**

- Produces: `findCopyViolations(html: string): string[]`, `findForeignOrigins(html: string, siteUrl: string): string[]` from `scripts/verify-lib.js`. `pnpm verify` runs both over every prerendered page and exits 1 on any hit. The constants listed in Global Constraints come from `$lib/constants/app`.

- [ ] **Step 1: Write config files.** Copy `.prettierrc`, `.npmrc`, `eslint.config.js`, `tsconfig.json` and `vite.config.ts` verbatim from `~/Code/web/oareo-client`. `.prettierignore` is Oareo's minus the "Local Documentation" block. `.gitignore`:

```
node_modules
/.svelte-kit
/build
.vercel
.DS_Store
.env
.env.*
!.env.example
vite.config.ts.timestamp-*
/scratch
```

`svelte.config.js` is Oareo's (header, `adapter-auto`, `vitePreprocess`). `vercel.json` is Oareo's headers with this CSP and nothing else changed:

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'
```

`package.json`:

```json
{
	"name": "meontor-site",
	"private": true,
	"version": "0.1.0",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"lint": "prettier --check . && eslint .",
		"format": "prettier --write .",
		"test": "vitest run",
		"verify": "node scripts/verify.js"
	}
}
```

Then run: `pnpm add -D @sveltejs/kit @sveltejs/adapter-auto @sveltejs/vite-plugin-svelte svelte svelte-check typescript vite tailwindcss @tailwindcss/vite eslint @eslint/js @eslint/compat typescript-eslint eslint-plugin-svelte eslint-config-prettier globals prettier prettier-plugin-svelte vitest @types/node`
Expected: installs clean, with no runtime `dependencies` at all.

- [ ] **Step 2: Write the failing test** `scripts/verify-lib.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { findCopyViolations, findForeignOrigins } from './verify-lib.js';

const SITE = 'https://meontor.com';

describe('findCopyViolations', () => {
	it('flags an em dash in body text', () => {
		expect(findCopyViolations('<p>Calm — always</p>')).toEqual(['em dash: "Calm — always"']);
	});
	it('flags banned words in visible text, case-insensitively', () => {
		const hits = findCopyViolations('<p>Only a tap.</p><p>You missed nothing.</p>');
		expect(hits).toHaveLength(2);
	});
	it('flags banned words in alt, aria-label, title and meta content', () => {
		const html =
			'<img alt="just a widget"><a aria-label="behind you"></a><title>Failed</title><meta name="description" content="streak broken">';
		expect(findCopyViolations(html)).toHaveLength(4);
	});
	it('matches whole words, so "adjust" and "justice" pass', () => {
		expect(findCopyViolations('<p>Adjust it. Justice.</p>')).toEqual([]);
	});
	it('ignores scripts and styles', () => {
		expect(findCopyViolations('<script>const only = 1; // —</script><style>a{}</style>')).toEqual(
			[]
		);
	});
	it('passes clean copy', () => {
		expect(findCopyViolations('<p>Log your day in a tap.</p>')).toEqual([]);
	});
});

describe('findForeignOrigins', () => {
	it('flags a third-party script, stylesheet, image or font', () => {
		const html =
			'<script src="https://cdn.x.com/a.js"></script><link rel="stylesheet" href="https://fonts.googleapis.com/css"><img src="//img.y.com/a.png"><style>@font-face{src:url(https://f.z.com/a.woff2)}</style>';
		expect(findForeignOrigins(html, SITE)).toHaveLength(4);
	});
	it('allows canonical and og links to the site, outbound anchors and mailto', () => {
		const html = `<link rel="canonical" href="${SITE}/"><meta property="og:image" content="${SITE}/og.png"><a href="https://www.apple.com/">Apple</a><a href="mailto:a@b.c">Mail</a><img src="/images/a.webp">`;
		expect(findForeignOrigins(html, SITE)).toEqual([]);
	});
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `pnpm test`
Expected: FAIL, with `Failed to resolve import "./verify-lib.js"`.

- [ ] **Step 4: Implement** `scripts/verify-lib.js`:

```js
// Copy and origin checks for the prerendered site. DESIGN §11 of the app binds
// every string a person reads; the site promises no third-party requests.
const BANNED = ['only', 'just', 'failed', 'missed', 'behind', 'streak broken'];
const READ_ATTRS = ['alt', 'aria-label', 'title', 'content', 'placeholder'];

function stripCode(html) {
	return html
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
}

function readableStrings(html) {
	const clean = stripCode(html);
	const strings = [];
	for (const attr of READ_ATTRS) {
		const re = new RegExp(`\\s${attr}="([^"]*)"`, 'gi');
		for (const m of clean.matchAll(re)) strings.push(m[1]);
	}
	const title = clean.match(/<title>([\s\S]*?)<\/title>/i);
	if (title) strings.push(title[1]);
	const text = clean.replace(/<title>[\s\S]*?<\/title>/i, ' ').replace(/<[^>]+>/g, '\n');
	for (const line of text.split('\n')) if (line.trim()) strings.push(line.trim());
	return strings.map((s) => s.replace(/&mdash;|&#8212;/g, '—'));
}

export function findCopyViolations(html) {
	const hits = [];
	for (const s of readableStrings(html)) {
		if (s.includes('—')) hits.push(`em dash: "${s}"`);
		for (const word of BANNED) {
			if (new RegExp(`\\b${word}\\b`, 'i').test(s)) hits.push(`"${word}": "${s}"`);
		}
	}
	return hits;
}

export function findForeignOrigins(html, siteUrl) {
	const hits = [];
	const isForeign = (url) => /^(https?:)?\/\//i.test(url) && !url.startsWith(siteUrl);
	for (const m of html.matchAll(/<(script|img|source|iframe)\b[^>]*\ssrcs?e?t?="([^"]+)"/gi)) {
		if (isForeign(m[2].split(/[\s,]/)[0])) hits.push(`${m[1]}: ${m[2]}`);
	}
	for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
		const tag = m[0];
		if (/rel="(canonical|alternate)"/i.test(tag)) continue;
		const href = tag.match(/href="([^"]+)"/i);
		if (href && isForeign(href[1])) hits.push(`link: ${href[1]}`);
	}
	for (const m of html.matchAll(/url\(\s*['"]?([^'")\s]+)/gi)) {
		if (isForeign(m[1])) hits.push(`css url: ${m[1]}`);
	}
	return hits;
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `pnpm test`
Expected: 8 passed.

- [ ] **Step 6: Write** `scripts/verify.js`, which walks the prerendered output:

```js
// Runs the copy and origin checks over every prerendered page. Run after `pnpm build`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { findCopyViolations, findForeignOrigins } from './verify-lib.js';

const SITE = 'https://meontor.com';
const ROOT = '.svelte-kit/output/prerendered/pages';

function* htmlFiles(dir) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* htmlFiles(path);
		else if (name.endsWith('.html')) yield path;
	}
}

let failures = 0;
let pages = 0;
for (const file of htmlFiles(ROOT)) {
	pages++;
	const html = readFileSync(file, 'utf8');
	for (const hit of [...findCopyViolations(html), ...findForeignOrigins(html, SITE)]) {
		console.error(`${file}: ${hit}`);
		failures++;
	}
}
console.log(`${pages} pages checked, ${failures} problems`);
process.exit(failures || pages === 0 ? 1 : 0);
```

- [ ] **Step 7: Write the shell.**

`src/lib/constants/app.ts`:

```ts
export const SITE_NAME = 'Meontor';
export const SITE_URL = 'https://meontor.com';
export const COMPANY = 'Daivat Creations';
// Personal address until meontor.com has mail (owner, 2026-09-26). One line to change.
export const SUPPORT_EMAIL = 'saidutt46@gmail.com';
// Null until the app is on the App Store; the CTA reads "Coming soon".
export const APP_STORE_URL: string | null = null;
export const DEFAULT_OG_IMAGE = '/images/og-image.png';
```

`src/routes/+layout.ts`: `export const prerender = true;` and `export const trailingSlash = 'never';`

`src/app.html` is Oareo's with the Google Fonts block removed and theme colours `#FFFFFF` / `#000000`.

`src/app.css` holds the tokens:

```css
@import 'tailwindcss';

@theme {
	--font-sans:
		-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, 'Helvetica Neue',
		Arial, sans-serif;
	--color-canvas: var(--canvas);
	--color-grouped: var(--grouped);
	--color-label: var(--label);
	--color-label-2: var(--label-2);
	--color-label-3: var(--label-3);
	--color-separator: var(--separator);
	--color-accent: var(--accent);
}

:root {
	--canvas: #ffffff;
	--grouped: #f2f2f7;
	--label: #000000;
	--label-2: rgb(60 60 67 / 0.72);
	--label-3: rgb(60 60 67 / 0.45);
	--separator: rgb(60 60 67 / 0.18);
	--accent: #4f63d9;
	--mark-core: #ffffff;
	color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
	:root {
		--canvas: #000000;
		--grouped: #1c1c1e;
		--label: #ffffff;
		--label-2: rgb(235 235 245 / 0.7);
		--label-3: rgb(235 235 245 / 0.42);
		--separator: rgb(84 84 88 / 0.6);
		--accent: #7d94f0;
		--mark-core: #000000;
	}
}

html {
	background: var(--canvas);
	color: var(--label);
	-webkit-font-smoothing: antialiased;
}

.fade-in {
	opacity: 0;
	transform: translateY(16px);
	transition:
		opacity 0.8s ease,
		transform 0.8s ease;
}
.fade-in.visible {
	opacity: 1;
	transform: none;
}

@media (prefers-reduced-motion: reduce) {
	.fade-in {
		opacity: 1;
		transform: none;
		transition: none;
	}
	*,
	*::before,
	*::after {
		animation: none !important;
	}
}

/* Without JS the observer never runs; content must still show. */
@media (scripting: none) {
	.fade-in {
		opacity: 1;
		transform: none;
	}
}
```

`+layout.svelte` for now: `<script lang="ts">import '../app.css'; let { children } = $props();</script>{@render children()}`. The stub `+page.svelte` is `<h1>Meontor</h1>`.

- [ ] **Step 8: Verify the build and checks**

Run: `pnpm check && pnpm lint && pnpm build && pnpm verify`
Expected: 0 errors, lint clean, `1 pages checked, 0 problems`. If `.svelte-kit/output/prerendered/pages` doesn't exist, find the prerender output dir with `find .svelte-kit/output -name '*.html'` and correct `ROOT`.

- [ ] **Step 9: Checkpoint.** Report to the owner. Don't commit.

---

### Task 2: Brand assets (mark, wordmark, icons, OG image)

**Files:**

- Create: `scripts/export-wordmark.swift`, `src/lib/components/Mark.svelte`, `src/lib/components/Wordmark.svelte`, `src/lib/assets/wordmark-path.ts` (generated)
- Create: `static/favicon.svg`, `static/favicon.ico`, `static/favicon-96x96.png`, `static/apple-touch-icon.png`, `static/icon-192.png`, `static/icon-512.png`, `static/manifest.json`, `static/images/og-image.png`

**Interfaces:**

- Produces: `<Mark size={number} breathing={boolean} label?={string} />`. It renders an SVG whose petals use `currentColor`, so colour comes from the parent's `text-*` class. The core is a transparent hole.
- Produces: `<Wordmark class? />`, the SF Pro Rounded Semibold outline in `currentColor`, with `aria-label="Meontor"` and `role="img"`.

- [ ] **Step 1: Write** `scripts/export-wordmark.swift`. It outputs SVG path data for "Meontor" in SF Pro Rounded Semibold 48pt with −0.6 tracking, matching `MeontorFont.wordmark` and `MeontorBrand.wordmarkTracking`:

```swift
// Emits the Meontor wordmark as SVG outlines: SF Pro Rounded Semibold 48pt,
// tracking -0.6, exactly as MeontorWordmark draws it in the app.
// Usage: swift scripts/export-wordmark.swift > src/lib/assets/wordmark-path.ts
import AppKit
import CoreText

let base = NSFont.systemFont(ofSize: 48, weight: .semibold)
let font = NSFont(descriptor: base.fontDescriptor.withDesign(.rounded)!, size: 48)!
let text = NSAttributedString(string: "Meontor", attributes: [.font: font, .kern: -0.6])
let line = CTLineCreateWithAttributedString(text)
let bounds = CTLineGetBoundsWithOptions(line, .useGlyphPathBounds)

var d = ""
func add(_ path: CGPath, _ t: CGAffineTransform) {
	path.applyWithBlock { el in
		let p = el.pointee.points
		func pt(_ i: Int) -> String {
			let q = p[i].applying(t)
			return String(format: "%.2f %.2f", q.x - bounds.minX, bounds.maxY - q.y)
		}
		switch el.pointee.type {
		case .moveToPoint: d += "M\(pt(0))"
		case .addLineToPoint: d += "L\(pt(0))"
		case .addQuadCurveToPoint: d += "Q\(pt(0)) \(pt(1))"
		case .addCurveToPoint: d += "C\(pt(0)) \(pt(1)) \(pt(2))"
		case .closeSubpath: d += "Z"
		@unknown default: break
		}
	}
}
for run in CTLineGetGlyphRuns(line) as! [CTRun] {
	let runFont = (CTRunGetAttributes(run) as NSDictionary)[kCTFontAttributeName] as! CTFont
	let n = CTRunGetGlyphCount(run)
	var glyphs = [CGGlyph](repeating: 0, count: n)
	var positions = [CGPoint](repeating: .zero, count: n)
	CTRunGetGlyphs(run, CFRange(), &glyphs)
	CTRunGetPositions(run, CFRange(), &positions)
	for i in 0..<n {
		if let path = CTFontCreatePathForGlyph(runFont, glyphs[i], nil) {
			add(path, CGAffineTransform(translationX: positions[i].x, y: positions[i].y))
		}
	}
}
print("// Generated by scripts/export-wordmark.swift. Do not edit.")
print(String(format: "export const WORDMARK_VIEWBOX = '0 0 %.2f %.2f';", bounds.width, bounds.height))
print("export const WORDMARK_PATH = '\(d)';")
```

- [ ] **Step 2: Run it**

Run: `swift scripts/export-wordmark.swift > src/lib/assets/wordmark-path.ts && head -c 300 src/lib/assets/wordmark-path.ts`
Expected: a viewBox of roughly `0 0 190 36` and a long path string starting with `M`.

- [ ] **Step 3: Write** `Wordmark.svelte`:

```svelte
<script lang="ts">
	import { WORDMARK_PATH, WORDMARK_VIEWBOX } from '$lib/assets/wordmark-path';
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg viewBox={WORDMARK_VIEWBOX} class={className} role="img" aria-label="Meontor">
	<path d={WORDMARK_PATH} fill="currentColor" />
</svg>
```

- [ ] **Step 4: Write** `Mark.svelte`, redrawn from `MeontorMarkArtwork` on a 100-unit grid. Petals are 26 × 62 capsules centred 19 above the middle, rotated in 60° steps. The core (r 15) is cut out with a mask, and the dot (r 7) sits at 0.9 opacity:

```svelte
<script lang="ts">
	let {
		size = 120,
		breathing = false,
		label
	}: { size?: number; breathing?: boolean; label?: string } = $props();
	const id = $props.id();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 100"
	class:breathing
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
>
	<defs>
		<linearGradient id="petal-{id}" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="currentColor" stop-opacity="0.85" />
			<stop offset="1" stop-color="currentColor" stop-opacity="0.25" />
		</linearGradient>
		<mask id="core-{id}">
			<rect width="100" height="100" fill="white" />
			<circle cx="50" cy="50" r="15" fill="black" />
		</mask>
	</defs>
	<g mask="url(#core-{id})">
		{#each [0, 60, 120, 180, 240, 300] as angle (angle)}
			<rect
				x="37"
				y="0"
				width="26"
				height="62"
				rx="13"
				fill="url(#petal-{id})"
				transform="rotate({angle} 50 50)"
			/>
		{/each}
	</g>
	<circle cx="50" cy="50" r="7" fill="currentColor" fill-opacity="0.9" />
</svg>

<style>
	/* The app's 8-second breath; reduced motion stops it (app.css). */
	.breathing {
		animation: breathe 8s ease-in-out infinite;
		transform-origin: center;
	}
	@keyframes breathe {
		0%,
		100% {
			transform: scale(0.96);
		}
		50% {
			transform: scale(1);
		}
	}
</style>
```

- [ ] **Step 5: Look at them.** Put `<Mark size={160} breathing label="Meontor" /><Wordmark class="h-12" />` in the stub page inside `<div class="text-accent">`, run `pnpm dev`, and compare against `~/Code/ios/Meontor/docs/design/app-icon/app-icon-1024.png` (Read it) in Chrome, light and dark. The petal proportions and the core hole must match the icon. Adjust nothing in the geometry unless it visibly differs, and record any change in a comment.

- [ ] **Step 6: Generate the icons** from the app's real icon:

```bash
ICON=~/Code/ios/Meontor/docs/design/app-icon/app-icon-1024.png
magick "$ICON" -resize 180x180 static/apple-touch-icon.png
magick "$ICON" -resize 192x192 static/icon-192.png
magick "$ICON" -resize 512x512 static/icon-512.png
magick "$ICON" -resize 96x96 static/favicon-96x96.png
magick "$ICON" -define icon:auto-resize=48,32,16 static/favicon.ico
```

`static/favicon.svg` is a 100×100 rounded square (`rx="22"`) filled `#12141C`, with the Step 4 mark geometry inside (inlined, `fill` `#7D94F0` in place of `currentColor`, the core as a `#12141C` circle rather than a mask). `static/manifest.json`: name "Meontor", `short_name` "Meontor", `theme_color` `#000000`, `background_color` `#000000`, the 192/512 icons, `display` "browser".

- [ ] **Step 7: Make the OG image** (1200×630): a dark ground, the icon, and the wordmark in white.

```bash
mkdir -p scratch static/images
VB=$(sed -n "s/.*WORDMARK_VIEWBOX = '\(.*\)';/\1/p" src/lib/assets/wordmark-path.ts)
P=$(sed -n "s/.*WORDMARK_PATH = '\(.*\)';/\1/p" src/lib/assets/wordmark-path.ts)
printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s"><path fill="#ffffff" d="%s"/></svg>' "$VB" "$P" > scratch/wordmark-white.svg
magick -background none -density 600 scratch/wordmark-white.svg -resize x96 scratch/wordmark.png
magick -size 1200x630 xc:'#0A0D14' \
  \( ~/Code/ios/Meontor/docs/design/app-icon/app-icon-1024.png -resize 280x280 \) -gravity west -geometry +140+0 -composite \
  scratch/wordmark.png -gravity west -geometry +480-20 -composite \
  -fill '#EBEBF5B3' -font '/System/Library/Fonts/SFNS.ttf' -pointsize 34 -gravity west -annotate +484+70 'Moment + Mentor' \
  static/images/og-image.png
```

Expected: open `static/images/og-image.png` (Read) and confirm the icon, wordmark and line are all visible and not clipped. Nudge the offsets if needed.

- [ ] **Step 8: Verify.** Run `pnpm check && pnpm lint && pnpm build && pnpm verify`. Expected: clean.

- [ ] **Step 9: Checkpoint.** Show the owner the mark, wordmark and OG image. Don't commit.

---

### Task 3: Layout, navigation, SEO, 404

**Files:**

- Create: `src/lib/components/SeoHead.svelte`, `Navbar.svelte`, `Footer.svelte`, `Icon.svelte`, `src/lib/actions/reveal.ts`, `src/routes/+error.svelte`
- Modify: `src/routes/+layout.svelte`

**Interfaces:**

- Consumes: `Mark`, `Wordmark`, and the constants.
- Produces: `<SeoHead title description path image? imageAlt? noindex? structuredData? />` (Oareo's props, minus the `apple-itunes-app` and twitter-handle tags, which are only added when `APP_STORE_URL` exists). `use:reveal` adds `.visible` to a `.fade-in` element on first intersection. `<Icon name="lock" | "sparkles" | "hand-tap" | "mic" | "widget" | "search" | "heart" | "leaf" | "mail" | "chevron-down" | "menu" | "close" class? />`, simple SF-Symbol-like 24px stroke icons.

- [ ] **Step 1: Write `SeoHead.svelte`.** Copy Oareo's `src/lib/components/SeoHead.svelte`, then:
  - Import from `$lib/constants/app`.
  - Wrap the `apple-itunes-app` meta in `{#if APP_STORE_URL}`.
  - Delete the four `twitter:site`/`twitter:creator` lines.
  - Keep `{#each ... (index)}` keyed.

- [ ] **Step 2: Write `reveal.ts`:**

```ts
// Adds `.visible` the first time an element scrolls into view. Paired with
// `.fade-in` in app.css, which reduced motion and no-JS both neutralise.
export function reveal(node: HTMLElement) {
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('visible');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.15 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}
```

- [ ] **Step 3: Write `Icon.svelte`.** Use Oareo's `Icon.svelte` pattern: a `Record<string, string>` of SVG path data, with `stroke="currentColor"`, `stroke-width="1.75"`, round caps, `fill="none"`, `viewBox="0 0 24 24"` and `aria-hidden="true"`. Draw the twelve names above as simple line glyphs. They're decoration only; the text carries the meaning.

- [ ] **Step 4: Write `Navbar.svelte`.**
  - Fixed top, 56px tall, with a translucent `--canvas` background at 80% and `backdrop-filter: saturate(180%) blur(20px)`, plus a hairline bottom border in `--separator`. This is a functional layer, like Apple's nav bar.
  - Left: a link home with `<Mark size={24} />` and `<Wordmark class="h-5" />` in `text-label`.
  - Right on `sm+`: Features (`/#features`), Support, Privacy in `text-label-2`, with the current page in `text-label` via `page.url.pathname` from `$app/state`.
  - Mobile: a button with `aria-expanded` and `aria-controls` toggles a `$state` menu. With JS off the button does nothing, and the footer links cover navigation.

- [ ] **Step 5: Write `Footer.svelte`.** A `bg-grouped` band with three rows:
  1. Mark and wordmark, with "Moment + Mentor." under them.
  2. Links: Support, Privacy, Terms, and `mailto:{SUPPORT_EMAIL}` labelled "Email".
  3. `© 2026 {COMPANY}. Meontor is made for iPhone.` Apple, iPhone, Siri and Apple Intelligence are trademarks of Apple Inc.

- [ ] **Step 6: Write `+layout.svelte`.** Import `app.css`, then render Navbar, `<main class="pt-14">{@render children()}</main>`, Footer. No analytics import.

- [ ] **Step 7: Write `+error.svelte`.** Use `SeoHead` with `noindex`, title "Not found · Meontor". Centred content:
  - `<Mark size={96} breathing />` in `text-accent`
  - Heading "This page isn't here."
  - Line "It may have moved, or the link may be mistyped."
  - A link "Back to Meontor" to `/`

- [ ] **Step 8: Verify.**
  - Run `pnpm check && pnpm lint && pnpm build && pnpm verify`.
  - In Chrome (`pnpm preview`), check at 390px and 1440px: the nav doesn't overlap content, the mobile menu opens and closes, and `/nope` shows the 404.
  - Reduced motion check: run `pnpm dev`, and in DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. Confirm the 404 mark doesn't animate.

- [ ] **Step 9: Checkpoint.**

---

### Task 4: Screenshots from the app

**Files:**

- Create: `scripts/shots.sh`, `static/images/screens/{now,timeline,mentor,capture}-{light,dark}.webp`, `static/images/widgets/{small,medium}-{light,dark}.webp`

**Interfaces:**

- Produces: the image files above. Phone shots are 780px wide; widget images are 2x their point size with transparent rounded corners.

- [ ] **Step 1: Build the app for the booted simulator** (iPhone 18 Pro, iOS 27, `DCD40304-979F-4428-AB9F-3D00AC58B07C`; re-read with `xcrun simctl list devices booted` if it changed):

```bash
cd ~/Code/ios/Meontor
xcodebuild -scheme Meontor -configuration Debug \
  -destination 'id=DCD40304-979F-4428-AB9F-3D00AC58B07C' \
  -derivedDataPath /private/tmp/meontor-shots-dd build 2>&1 | grep -E "error:|BUILD"
xcrun simctl install booted "$(find /private/tmp/meontor-shots-dd -name 'Meontor.app' -path '*iphonesimulator*' | head -1)"
```

Expected: `** BUILD SUCCEEDED **`, then the install returns silently. This doesn't touch the app repo's files.

- [ ] **Step 2: Write** `scripts/shots.sh`:

```bash
#!/bin/zsh
# Captures the site's phone screenshots from the simulator with the app's DEBUG
# launch arguments. Usage: scripts/shots.sh <now|timeline|mentor|search> <light|dark>
set -euo pipefail
SCREEN=$1; MODE=$2
NAME=$([[ $SCREEN == search ]] && echo capture || echo $SCREEN)
OUT=static/images/screens; mkdir -p $OUT scratch
xcrun simctl ui booted appearance $MODE
xcrun simctl status_bar booted override --time 9:41 --batteryState charged --batteryLevel 100 \
  --cellularBars 4 --wifiBars 3 --dataNetwork wifi
xcrun simctl launch --terminate-running-process booted com.daivatcreations.Meontor \
  -skipOnboarding -sampleLife -screen $SCREEN -mentor ai
sleep ${SHOT_WAIT:-6}
xcrun simctl io booted screenshot scratch/$NAME-$MODE.png
magick scratch/$NAME-$MODE.png -resize 780x -quality 82 $OUT/$NAME-$MODE.webp
echo "$OUT/$NAME-$MODE.webp"
```

`chmod +x scripts/shots.sh`.

- [ ] **Step 3: Capture and inspect.** Run the script for each of `now timeline mentor search` × `light dark`. Use `SHOT_WAIT=25` for `mentor`, so Apple Intelligence finishes writing.
  - Read every PNG in `scratch/` and check it. It must show real sample-life content, with no debug overlay and no "Reading your day" placeholder.
  - Its visible copy must pass DESIGN §11: if a generated Mentor line reads poorly, relaunch to regenerate rather than edit the image.
  - If `-sampleLife` appends a second life on relaunch (duplicate entries), launch once with it, then drop it on later launches.

- [ ] **Step 4: Widgets.** Launch with `-widgets medium`, then `-widgets small`, each in light and dark, and screenshot. Read the PNG, pick the cleanest "nothing running" scenario, and crop it to the widget's exact bounds. Measure the coordinates from the image, in pixels (3x):

```bash
magick scratch/widgets-medium-light.png -crop WxH+X+Y +repage \
  \( +clone -alpha extract -fill black -colorize 100 -fill white -draw "roundrectangle 0,0,%[fx:w-1],%[fx:h-1],66,66" \) \
  -alpha off -compose CopyOpacity -composite -resize 50% -quality 85 static/images/widgets/medium-light.webp
```

Repeat for medium-dark, small-light and small-dark (the small widget uses the same 66px radius). The corner radius is 22pt × 3. Read each result to confirm the corners are transparent and nothing is clipped.

- [ ] **Step 5: Reset the simulator:** `xcrun simctl status_bar booted clear; xcrun simctl ui booted appearance light`.

- [ ] **Step 6: Checkpoint.** Show the owner the eight phone shots and four widget crops, and wait for a yes before they go on the site.

---

### Task 5: Home page

**Files:**

- Create: `src/lib/components/PhoneFrame.svelte`, `Screenshot.svelte`, `Feature.svelte`, `Hero.svelte`, `WidgetShowcase.svelte`, `SiriShowcase.svelte`, `PrivacyBand.svelte`, `AppStoreCta.svelte`
- Modify: `src/routes/+page.svelte`

**Interfaces:**

- Consumes: `Mark`, `Wordmark`, `Icon`, `reveal`, `SeoHead`, the constants, and the Task 4 images.
- Produces:
  - `<Screenshot name="now" alt="…" eager? />` renders a `<picture>` with a dark `<source media="(prefers-color-scheme: dark)">`, `width="780" height="1696"`, lazy unless `eager`.
  - `<PhoneFrame>{children}</PhoneFrame>` is a CSS iPhone outline (continuous corners at 13% radius, a 1.2% black bezel, a Dynamic Island pill). It sizes by the parent width (`width: min(300px, 70vw)`) with `aspect-ratio: 780/1696`.
  - `<Feature id eyebrow title flip?>{body}{#snippet media()}…{/snippet}</Feature>` is a two-column row, text and media, swapped when `flip`, stacked on mobile, with `use:reveal`.
  - `<AppStoreCta />` renders the black "Coming soon to the App Store" pill, not a link, while `APP_STORE_URL` is null; otherwise an `<a>` to it.

- [ ] **Step 1: Write `PhoneFrame.svelte`** and **`Screenshot.svelte`** as above. The frame is pure CSS, with no Oareo `--scale` transform: aspect-ratio and percentages make it responsive.

- [ ] **Step 2: Write `Hero.svelte`:**
  - `min-h-[88vh]`, centred.
  - `<Mark size={112} breathing label="Meontor" />` in `text-accent`.
  - `<Wordmark class="h-14 sm:h-20" />`, then "Moment + Mentor." in `text-label-2 text-2xl`.
  - `<h1>`: "Log your day in a tap. Understand it in a sentence." (`text-4xl sm:text-6xl font-semibold tracking-tight`, max 18ch).
  - `<AppStoreCta />` and a quiet line: "On TestFlight now. Free, with no account."
  - Below: `<PhoneFrame><Screenshot name="now" eager alt="Meontor's Now screen with three suggestions for this moment" /></PhoneFrame>`.

- [ ] **Step 3: Write the feature rows in `+page.svelte`.** They go inside `<section id="features">`, in this order and with this copy, adjusted only if a screenshot shows something different:

1. **Tap to log** (eyebrow "Capture"). "One tap, under a second." Body: "Coffee, a walk, a call with your mum. Tap it and it's in your day. Start a stretch like deep focus and stop it when you're done. Rate your mood with a face." Media: `now`.
2. **The widget** (eyebrow "Home Screen"), a full-width `WidgetShowcase` rather than a `Feature`. "Three things, right when you need them." Body: "Meontor learns your rhythm from your own days and suggests what you're likely to log right now. Tap on the Home Screen and it's logged, without opening the app. A new thought arrives every hour." Media: the medium and small widgets side by side, at true scale (medium 364×170pt, small 170×170pt, so CSS widths of 364px and 170px, scaling down under 400px), on a soft wallpaper-like gradient panel (`bg-grouped` with two blurred accent/teal radial gradients at 25% opacity).
3. **Quick Capture** (eyebrow "Everything else"), `flip`. "Anything else is one search away." Body: "Over a hundred activities across everyday life, in categories you can reorder and make your own. Favourites sit at the top." Media: `capture`.
4. **The Mentor** (eyebrow "Mentor"). "What your day gave you." Body: "Each evening, Meontor reflects on your day: what kind of day it was, a line for each of your roles, one thing worth noticing. It's written by Apple Intelligence on your iPhone, or written on device when Apple Intelligence isn't available. It never measures one part of your life against another." Media: `mentor`.
5. **Siri, Controls, Lock Screen** (eyebrow "Anywhere"): `SiriShowcase`, three small CSS-drawn cards in a row (stacked on mobile):
   - A Siri card: a waveform glyph and the line "Log coffee in Meontor"
   - A Control Center tile: a round button with the hand-tap icon and "Log an activity"
   - A Dynamic Island pill: black, with a live dot, "Deep focus" and a monospaced `0:42:10`

   Heading: "Log from wherever you are." Body: "Say it to Siri, add a control to Control Center or the Action button, and keep anything running on your Lock Screen and in the Dynamic Island."

6. **Timeline** (eyebrow "Your days"), `flip`. "Every day, drawn as it happened." Body: "Your day on a single line: moments as dots, stretches as bars, coloured by what they were. Swipe to fix or remove anything." Media: `timeline`.
7. **No guilt**, text-led and centred, with no media. "Nothing to catch up on." Body: "No streaks to break. Nothing counts down. Meontor adds up what your day held and never shows what it didn't." Three small items with icons: "No streaks", "No scores", "No comparisons".
8. **`PrivacyBand`** (`id="privacy"`), a `bg-grouped` rounded band. `<Icon name="lock" />`, "Everything stays on your iPhone." Four columns:
   - "No account": "Open it and start. There's nothing to sign up for."
   - "No server": "Meontor has no server. Your days never leave your phone."
   - "No tracking": "No analytics, no ads, no third parties. This website doesn't track you either."
   - "Health, if you want it": "Connect Apple Health to let the Mentor see your sleep and steps. It reads, and never writes."

   Link: "Read the privacy policy" → `/privacy`.

9. **Closing:** `<Mark size={64} />`, "Start with one tap.", `<AppStoreCta />`.

- [ ] **Step 4: Add `SeoHead` to the home page.** Title "Meontor · Log your day in a tap". Description "Meontor is a calm iPhone app for logging your day in a tap, with a smart widget and an on-device Mentor that reflects on what your day gave you. No account, no tracking." Structured data:

```ts
[
	{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Meontor', url: SITE_URL },
	{
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Meontor',
		url: SITE_URL,
		operatingSystem: 'iOS',
		applicationCategory: 'LifestyleApplication',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		description:
			'Tap to log your day, a smart Home Screen widget, and an on-device Mentor that reflects on what your day gave you.',
		author: { '@type': 'Organization', name: COMPANY, url: SITE_URL }
	}
];
```

- [ ] **Step 5: Verify.**
  - Run `pnpm check && pnpm lint && pnpm build && pnpm verify`. Expected: clean. Any copy hit gets rephrased, never suppressed.
  - In Chrome, check at 320, 390, 768 and 1440px in light and dark:
    - no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`)
    - dark screenshots swap in dark mode
    - widgets aren't upscaled beyond 1x of their 2x source
    - the hero mark breathes, and stops under reduced-motion emulation
  - With JS disabled (DevTools → Settings → Disable JavaScript): every section is visible.

- [ ] **Step 6: Checkpoint.** Screenshot the home page (light and dark, desktop and phone) for the owner.

---

### Task 6: Privacy and Terms

**Files:**

- Create: `src/lib/components/LegalPage.svelte`, `src/routes/privacy/+page.svelte`, `src/routes/terms/+page.svelte`

**Interfaces:**

- Consumes: `SeoHead`, `SUPPORT_EMAIL`, `COMPANY`.
- Produces: `<LegalPage eyebrow title intro effective>{sections}</LegalPage>`. It uses Oareo's legal header layout (max-w-3xl, eyebrow "Legal", h1, intro, effective date) and a `.legal` style for `h2`/`p`/`ul` in tokens.

- [ ] **Step 1: Write `LegalPage.svelte`,** porting the header block and `legal-content` styles from Oareo's `src/routes/privacy/+page.svelte`, with Oareo's greys replaced by `text-label`, `text-label-2` and `border-separator`.

- [ ] **Step 2: Write the Privacy Policy** (effective September 26, 2026), with exactly these sections. Every claim below was checked against the app's code on 2026-09-26: no networking code, HealthKit `toShare: []` with five read types, `PrivacyInfo.xcprivacy` declaring no tracking and no collected data, `LAContext` app lock, Export in Settings → Privacy.

- **Overview:** "Meontor is an iPhone app for logging your day and reflecting on it. It has no account, no server and no tracking. Everything you log stays on your iPhone."
- **1. What Meontor keeps, and where:**
  - Activities you log, their times and any details you add (amounts, notes, ratings).
  - Your roles, categories, settings, and the reflections the Mentor writes.
  - All of it is stored on your iPhone, in storage shared by the app and its widgets. It isn't sent to us or to anyone else. Meontor contains no code that sends it over the internet.
- **2. What we collect:** "Nothing. We have no server to send it to. We don't collect names, email addresses, identifiers, usage data or location."
- **3. Apple Intelligence:** "The Mentor's reflections and thoughts are written by Apple Intelligence on your iPhone, using a summary of your day. They are not sent to any AI service. If Apple Intelligence isn't available, Meontor writes them on device without it."
- **4. Apple Health:** It's optional and off until you turn it on, one metric at a time. Meontor can read:
  - sleep
  - steps
  - active energy
  - resting heart rate
  - workouts

  It never writes to Health. Health data is used to reflect on your day inside the app. It never leaves your iPhone and is never used for advertising. You can turn access off in Settings or in the Health app.

- **5. Siri, widgets, Controls and Live Activities:** handled by iOS on your iPhone. Your requests to Siri are processed by Apple under Apple's privacy policy.
- **6. App lock:** "Optional. Face ID or your passcode is checked by iOS; Meontor never sees your biometric data."
- **7. Analytics, ads and tracking:** "None. Meontor has no analytics, advertising or third-party SDKs, and does not track you across apps or websites. If you choose to share crash reports and analytics with developers in iOS Settings, Apple may share crash data with us."
- **8. Your control:** Export everything or erase everything from Settings → Privacy. Deleting the app deletes its data. Backups follow your iCloud or computer backup settings, as with any app.
- **9. This website:** "meontor.com sets no cookies, runs no analytics and loads nothing from other companies. Our host, Vercel, may keep standard server logs, such as IP addresses, for security."
- **10. Children:** "Meontor is not directed at children under 13 and collects nothing from anyone."
- **11. Changes:** "If this policy changes, we'll update it here and change the effective date."
- **12. Contact:** `{COMPANY}`, `mailto:{SUPPORT_EMAIL}`.

SeoHead: "Privacy Policy · Meontor", with description "Meontor keeps everything on your iPhone: no account, no server, no tracking. Apple Health is optional and read-only."

- [ ] **Step 3: Write the Terms of Use** (effective September 26, 2026). Port Oareo's `src/routes/terms/+page.svelte` sections 1–15 verbatim in structure and legal substance, with these changes:
  - "Oareo" becomes "Meontor", and the contact becomes `SUPPORT_EMAIL`.
  - §1: "Meontor is a free iPhone app for logging your day and reflecting on it, published by Daivat Creations."
  - §3 "Your Content": what you log is yours and stays on your device, and we have no access to it.
  - §5 is replaced with **"Not Medical Advice":** "Meontor's reflections, figures and Health readings are for your own reflection. They are not medical, psychological or professional advice. Talk to a qualified professional about your health."
  - §10 names Apple's App Store terms and Apple Intelligence as third-party platforms.
  - Governing law is kept as Oareo's.
  - Every sentence goes through the copy check: rephrase any "only" (for example "solely", or restructure) and remove em dashes.

- [ ] **Step 4: Verify.** Run `pnpm check && pnpm lint && pnpm build && pnpm verify`, then read both pages in Chrome, light and dark, at 390px.

- [ ] **Step 5: Checkpoint.** Ask the owner to read both pages. Legal text needs his eyes.

---

### Task 7: Support and FAQ

**Files:**

- Create: `src/routes/support/+page.svelte`, `src/lib/content/faq.ts`

**Interfaces:**

- Produces: `FAQ: { topic: string; items: { q: string; a: string }[] }[]` in `faq.ts`, used for both the page and the `FAQPage` JSON-LD, so the two can't drift.

- [ ] **Step 1: Write `faq.ts`** with this content:

- **Getting started**
  - "What does Meontor need?" → "An iPhone with iOS 26.6 or later; the widget, controls and Live Activities need iOS 27. The Mentor uses Apple Intelligence when your iPhone supports it and it's turned on; otherwise Meontor writes reflections on device without it."
  - "Is there an account?" → "No. Open the app and start logging."
  - "How do I add the widget?" → "Touch and hold your Home Screen, tap Edit, then Add Widget, and choose Meontor. The medium size shows three suggestions and a thought."
- **Logging**
  - "How does Meontor choose what to suggest?" → "It learns from your own days: what you tend to log at this time, on this kind of day, and what usually follows. The more you log, the better it fits. It all happens on your iPhone."
  - "I logged something at the wrong time. Can I fix it?" → "Yes. On Timeline or Now, swipe right to edit an entry or left to delete it. Delete offers Undo."
  - "Can I use Siri?" → "Yes. Try \"Log coffee in Meontor\" or \"Start deep focus in Meontor\". You can also add Meontor to Control Center, the Lock Screen or the Action button."
  - "Can I add my own activities and categories?" → "Yes. Tap + in Quick Capture, or go to Settings, then Activities or Categories."
- **The Mentor**
  - "What does the Mentor write?" → "A short reflection on what your day gave you, a line for each of your roles, one thing worth noticing, and a thought for the day. It reflects; it doesn't grade."
  - "Why does a reflection say \"Written on device\"?" → "That means Apple Intelligence wasn't available, so Meontor wrote it without a language model. It always tells you which one wrote it."
- **Privacy and data**
  - "Where is my data?" → "On your iPhone, and nowhere else. Meontor has no server."
  - "What does Meontor read from Health?" → "Sleep, steps, active energy, resting heart rate and workouts, each one once you turn it on, and never before. It never writes to Health."
  - "Can I export or erase my data?" → "Yes, from Settings, then Privacy."
  - "What happens if I delete the app?" → "Its data is deleted with it, unless it's in a backup."

- [ ] **Step 2: Write the page.**
  - SeoHead: "Support · Meontor", with description "Help with Meontor: getting started, logging, the Mentor, and your data."
  - Hero: "How can we help?"
  - A contact card (`bg-grouped`, rounded-2xl): "Write to us" with a `mailto:{SUPPORT_EMAIL}?subject=Meontor%20support` button, and the note "Include your iOS version and what you were doing. We read every message."
  - Then each topic as an `h2` followed by `<details>` items. `<summary>` is the question, with a `chevron-down` icon that rotates on `[open]`. The body holds the answer.
  - `FAQPage` structured data is built from `FAQ`.

- [ ] **Step 3: Verify.** Run `pnpm check && pnpm lint && pnpm build && pnpm verify`. In Chrome, confirm the details open and close with keyboard (Tab, Enter) and with JS off.

- [ ] **Step 4: Checkpoint.**

---

### Task 8: Static SEO files and project docs

**Files:**

- Create: `static/robots.txt`, `static/sitemap.xml`, `README.md`, `CLAUDE.md`, `AGENTS.md` (copy of CLAUDE.md)
- Modify: `~/Code/web/README.md`, `~/Code/README.md` (Active Projects table), and run `~/Code/.gen-aliases.sh`

- [ ] **Step 1: Write the static SEO files.**
  - `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://meontor.com/sitemap.xml`.
  - `sitemap.xml`: `/`, `/support`, `/privacy`, `/terms`, each with `<lastmod>2026-09-26</lastmod>`.

- [ ] **Step 2: Write `README.md`** in Oareo's shape:
  - Title and one line.
  - Links (Website meontor.com once live, Support).
  - Overview.
  - Tech stack (SvelteKit 2, Tailwind 4, prerendered, Vercel, no analytics).
  - Local development with the Node 24 PATH note.
  - The Daivat Creations proprietary licence block from Oareo.

- [ ] **Step 3: Write `CLAUDE.md`** in the structure of Oareo's CLAUDE.md, and include:
  - pnpm on Node 24 (the PATH line)
  - `pnpm verify` after every build, and what it checks
  - the no-analytics / no-third-party rule and the CSP
  - DESIGN §11 copy rules
  - that screenshots come from `scripts/shots.sh` and the app's launch args, and the wordmark from `scripts/export-wordmark.swift`
  - the constants to flip at launch (`APP_STORE_URL`, `SUPPORT_EMAIL`)
  - the app's source of truth (`~/Code/ios/Meontor/{PLAN,DESIGN,HANDOFF}.md`)
  - no commits or pushes without approval

  `AGENTS.md` is an identical copy.

- [ ] **Step 4: Update the workspace docs.**
  - Add the row `| meontor-site/ | Meontor Site | SvelteKit 2 + Svelte 5 | **pnpm** | pnpm dev | Marketing site for the Meontor iOS app. Static, no analytics, SF system fonts. Vercel (not yet deployed). |` to the Projects table in `~/Code/web/README.md`, plus `meontor_site` to its Navigation block.
  - Add the matching row to `~/Code/README.md` Active Projects, following that table's columns.
  - Run `~/Code/.gen-aliases.sh`, then `grep meontor_site ~/.zsh_aliases`. Expected: one alias line.

- [ ] **Step 5: Verify.** Run `pnpm check && pnpm lint && pnpm test && pnpm build && pnpm verify`. Expected: all clean.

- [ ] **Step 6: Checkpoint.**

---

### Task 9: Whole-site check

- [ ] **Step 1: Check every page in Chrome.** With `pnpm build && pnpm preview`, visit `/`, `/support`, `/privacy`, `/terms` and `/nope` at 320, 390 and 1440px, in light and dark, with reduced motion on and off, and with JS off. Record any problem and fix it in the owning task's files.
- [ ] **Step 2: Network check.** In DevTools, filter out `localhost`. Expected: zero requests.
- [ ] **Step 3: Lighthouse** (mobile) on `/` and `/privacy`. Targets: Accessibility 100, Best Practices 100, SEO 100, Performance ≥ 95. Fix contrast or label issues it names.
- [ ] **Step 4: Final run.** Run `pnpm check && pnpm lint && pnpm test && pnpm build && pnpm verify`.
- [ ] **Step 5: Report to the owner.** List the files, what was verified and how, and what's left for launch: register meontor.com, set up mail, create the GitHub repo and Vercel project, and set `APP_STORE_URL`. Ask for approval to commit.
