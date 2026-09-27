// Copy and origin checks for the prerendered site. DESIGN §11 of the app binds
// every string a person reads; the site promises no third-party requests.
const BANNED = ['only', 'just', 'failed', 'missed', 'behind', 'streak broken'];
const READ_ATTRS = [
	'alt',
	'aria-label',
	'aria-description',
	'aria-valuetext',
	'title',
	'content',
	'placeholder',
	'label'
];
const URL_ATTRS = ['src', 'srcset', 'poster', 'data', 'href', 'style'];
const NAMED = {
	mdash: '—',
	ndash: '–',
	quot: '"',
	apos: "'",
	amp: '&',
	lt: '<',
	gt: '>',
	nbsp: ' '
};

function decode(s) {
	return s
		.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
		.replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);
}

/** Every attribute value on every tag, either quote style: [{ tag, name, value, raw }]. */
function attributes(html) {
	const out = [];
	for (const t of html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)) {
		const tag = t[1].toLowerCase();
		for (const a of t[2].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
			out.push({ tag, name: a[1].toLowerCase(), value: decode(a[2] ?? a[3]), raw: t[0] });
		}
	}
	return out;
}

function jsonLdStrings(html) {
	const strings = [];
	const walk = (v) => {
		if (typeof v === 'string') {
			if (!/^(https?:|@|\/)/.test(v)) strings.push(v);
		} else if (v && typeof v === 'object') Object.values(v).forEach(walk);
	};
	for (const m of html.matchAll(
		/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
	)) {
		try {
			walk(JSON.parse(m[1]));
		} catch {
			strings.push(m[1]);
		}
	}
	return strings;
}

function readableStrings(html) {
	const strings = jsonLdStrings(html);
	const clean = html
		.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
		.replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
	for (const a of attributes(clean)) if (READ_ATTRS.includes(a.name)) strings.push(a.value);
	const text = clean.replace(/<[^>]+>/g, '\n');
	for (const line of text.split('\n')) if (line.trim()) strings.push(decode(line.trim()));
	return strings;
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

function isForeign(url, siteUrl) {
	if (!/^(https?:)?\/\//i.test(url)) return false;
	try {
		return new URL(url, siteUrl).origin !== new URL(siteUrl).origin;
	} catch {
		return true;
	}
}

function cssUrls(css) {
	return [
		...[...css.matchAll(/url\(\s*['"]?([^'")\s]+)/gi)].map((m) => m[1]),
		...[...css.matchAll(/@import\s+['"]([^'"]+)['"]/gi)].map((m) => m[1])
	];
}

export function findForeignOrigins(html, siteUrl) {
	const hits = [];
	for (const a of attributes(html)) {
		if (!URL_ATTRS.includes(a.name)) continue;
		if (a.name === 'href') {
			// Anchors are outbound links, and canonical/alternate name the page; any other
			// <link href> (stylesheet, preload, icon) is a request.
			if (a.tag !== 'link' || /rel=["']?(canonical|alternate)/i.test(a.raw)) continue;
		}
		const urls =
			a.name === 'srcset'
				? a.value.split(',').map((c) => c.trim().split(/\s+/)[0])
				: a.name === 'style'
					? cssUrls(a.value)
					: [a.value];
		for (const url of urls) if (isForeign(url, siteUrl)) hits.push(`${a.tag} ${a.name}: ${url}`);
	}
	for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
		for (const url of cssUrls(m[1])) if (isForeign(url, siteUrl)) hits.push(`css: ${url}`);
	}
	return hits;
}

// Hosts that appear in bundles as identifiers, never as requests (SVG and XML namespaces).
const NAMESPACE_HOSTS = ['www.w3.org'];

/** Remote URLs a bundled CSS or JS file could request: css url()/@import, and fetch/import/new URL in JS. */
export function findForeignOriginsInAsset(source, siteUrl) {
	const hits = [];
	const candidates = [
		...cssUrls(source),
		...[
			...source.matchAll(/(?:fetch|import|new URL|src\s*=)\s*\(?\s*["'`](https?:\/\/[^"'`]+)/g)
		].map((m) => m[1])
	];
	for (const url of candidates) {
		if (!isForeign(url, siteUrl)) continue;
		if (NAMESPACE_HOSTS.includes(new URL(url).host)) continue;
		hits.push(url);
	}
	return hits;
}
