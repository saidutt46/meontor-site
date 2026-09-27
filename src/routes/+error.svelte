<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Mark from '$lib/components/Mark.svelte';
</script>

<SeoHead
	title="Not found · Meontor"
	description="This page isn't here. Go back to Meontor."
	path="/404"
	noindex
/>

<section class="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
	<span class="text-accent"><Mark size={96} breathing /></span>
	<h1 class="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">This page isn't here.</h1>
	<p class="mt-3 text-lg text-label-2">It may have moved, or the link may be mistyped.</p>
	<a href="/" class="mt-8 font-medium text-accent hover:underline">Back to Meontor</a>
</section>
