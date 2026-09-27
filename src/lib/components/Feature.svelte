<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- One idea per row: words on one side, a picture on the other, stacked on phones. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	let {
		id,
		eyebrow,
		title,
		flip = false,
		children,
		media
	}: {
		id?: string;
		eyebrow: string;
		title: string;
		flip?: boolean;
		children: Snippet;
		media: Snippet;
	} = $props();
</script>

<section {id} class="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
	<div class="fade-in grid items-center gap-12 md:grid-cols-2 md:gap-20" use:reveal>
		<div class={flip ? 'md:order-2' : ''}>
			<p class="text-sm font-semibold tracking-wide text-accent">{eyebrow}</p>
			<h2 class="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
			<div class="mt-5 space-y-4 text-lg leading-relaxed text-label-2 sm:text-xl">
				{@render children()}
			</div>
		</div>
		<div class="flex justify-center {flip ? 'md:order-1' : ''}">{@render media()}</div>
	</div>
</section>
