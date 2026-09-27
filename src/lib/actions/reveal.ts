/*
 * Copyright (c) 2026 Daivat Creations
 * All rights reserved.
 *
 * This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
// Fades a section in the first time it scrolls into view. The section is only
// hidden ("armed") here, once this script is running and only if it starts below
// the fold, so failed JS never hides content and nothing on screen flickers.
export function reveal(node: HTMLElement) {
	if (!('IntersectionObserver' in window)) return;
	if (node.getBoundingClientRect().top < window.innerHeight) return;
	node.classList.add('armed');
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
