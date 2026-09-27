<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- What an error page says, by status: a missing page is not a broken one. -->
<script lang="ts">
	import Mark from './Mark.svelte';

	let { status }: { status: number } = $props();

	const missing = $derived(status === 404);
</script>

<section class="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
	<span class="mark-tint"><Mark size={96} breathing /></span>
	<h1 class="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
		{missing ? "This page isn't here." : 'Something went wrong.'}
	</h1>
	<p class="mt-3 text-lg text-label-2">
		{missing
			? 'It may have moved, or the link may be mistyped.'
			: 'Try again in a moment. If it keeps happening, let us know.'}
	</p>
	<a href="/" class="mt-8 font-medium text-accent hover:underline">Back to Meontor</a>
</section>
