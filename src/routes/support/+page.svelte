<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { FAQ } from '$lib/content/faq';
	import { SUPPORT_EMAIL } from '$lib/constants/app';

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: FAQ.flatMap((t) =>
			t.items.map((i) => ({
				'@type': 'Question',
				name: i.q,
				acceptedAnswer: { '@type': 'Answer', text: i.a }
			}))
		)
	};
</script>

<SeoHead
	title="Support · Meontor"
	description="Help with Meontor: getting started, logging, the Mentor, and your data."
	path="/support"
	imageAlt="Meontor support"
	structuredData={faqSchema}
/>

<div class="px-5 pt-16 pb-24 sm:pt-24">
	<div class="mx-auto max-w-3xl">
		<p class="mb-4 text-sm font-medium tracking-widest text-label-3 uppercase">Support</p>
		<h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">How can we help?</h1>

		<div
			class="mt-10 flex flex-col gap-6 rounded-3xl bg-grouped p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
		>
			<div>
				<h2 class="text-xl font-semibold">Write to us</h2>
				<p class="mt-2 max-w-md leading-relaxed text-label-2">
					Include your iOS version and what you were doing. We read every message.
				</p>
			</div>
			<a
				href="mailto:{SUPPORT_EMAIL}?subject=Meontor%20support"
				class="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-accent px-6 font-medium text-canvas transition-opacity hover:opacity-85 sm:self-auto"
			>
				<Icon name="mail" class="size-5" />
				Email support
			</a>
		</div>

		{#each FAQ as topic (topic.topic)}
			<section class="mt-16">
				<h2 class="mb-4 text-2xl font-semibold tracking-tight">{topic.topic}</h2>
				<div class="border-t border-separator">
					{#each topic.items as item (item.q)}
						<details class="group border-b border-separator">
							<summary
								class="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium"
							>
								{item.q}
								<span class="shrink-0 text-label-3 transition-transform group-open:rotate-180">
									<Icon name="chevron-down" class="size-5" />
								</span>
							</summary>
							<p class="pb-6 leading-relaxed text-label-2">{item.a}</p>
						</details>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>

<style>
	summary::-webkit-details-marker {
		display: none;
	}
</style>
