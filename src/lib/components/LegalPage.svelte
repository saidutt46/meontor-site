<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- The shared layout for Privacy and Terms: Oareo's legal header, in Meontor's tokens. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		title,
		intro,
		effective,
		children
	}: { title: string; intro: string; effective: string; children: Snippet } = $props();
</script>

<div class="px-5 pt-16 pb-24 sm:pt-24">
	<article class="mx-auto max-w-3xl">
		<header class="mb-14">
			<p class="mb-4 text-sm font-medium tracking-widest text-label-3 uppercase">Legal</p>
			<h1 class="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
			<p class="max-w-2xl text-lg leading-relaxed text-label-2">{intro}</p>
			<p class="mt-6 text-sm text-label-3">Effective {effective}</p>
		</header>
		<div class="legal space-y-12">{@render children()}</div>
	</article>
</div>

<style>
	.legal :global(h2) {
		margin-bottom: 0.75rem;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.legal :global(p),
	.legal :global(li) {
		color: var(--label-2);
		line-height: 1.75;
	}
	.legal :global(p) {
		margin-bottom: 0.75rem;
	}
	.legal :global(ul) {
		margin-bottom: 0.75rem;
		padding-left: 1.5rem;
		list-style: disc;
	}
	.legal :global(li) {
		margin-bottom: 0.375rem;
	}
	.legal :global(a) {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.legal :global(strong) {
		color: var(--label);
		font-weight: 600;
	}
</style>
