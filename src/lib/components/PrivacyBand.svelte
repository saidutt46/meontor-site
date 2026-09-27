<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Icon from './Icon.svelte';

	const points = [
		{ title: 'No account', body: "Open it and start. There's nothing to sign up for." },
		{ title: 'No server', body: 'Meontor has no server. Your days never leave your phone.' },
		{
			title: 'No tracking',
			body: "No analytics, no ads, no third parties. This website doesn't track you either."
		},
		{
			title: 'Health, if you want it',
			body: 'Connect Apple Health to let the Mentor see your sleep and steps. It reads, and never writes.'
		}
	];
</script>

<section id="privacy" class="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:py-16">
	<div class="fade-in rounded-[2.5rem] bg-grouped px-6 py-14 sm:px-14 sm:py-20" use:reveal>
		<div class="flex flex-col items-center text-center">
			<span class="grid size-14 place-items-center rounded-2xl bg-canvas text-accent">
				<Icon name="lock" class="size-7" />
			</span>
			<h2 class="mt-6 max-w-[18ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
				Everything stays on your iPhone.
			</h2>
		</div>
		<div class="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
			{#each points as point (point.title)}
				<div>
					<h3 class="text-lg font-semibold">{point.title}</h3>
					<p class="mt-2 leading-relaxed text-label-2">{point.body}</p>
				</div>
			{/each}
		</div>
		<div class="mt-12 text-center">
			<a href="/privacy" class="font-medium text-accent hover:underline">Read the privacy policy</a>
		</div>
	</div>
</section>
