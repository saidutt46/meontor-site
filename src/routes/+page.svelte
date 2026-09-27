<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Feature from '$lib/components/Feature.svelte';
	import PhoneFrame from '$lib/components/PhoneFrame.svelte';
	import Screenshot from '$lib/components/Screenshot.svelte';
	import WidgetShowcase from '$lib/components/WidgetShowcase.svelte';
	import HowItLearns from '$lib/components/HowItLearns.svelte';
	import SiriShowcase from '$lib/components/SiriShowcase.svelte';
	import PrivacyBand from '$lib/components/PrivacyBand.svelte';
	import AppStoreCta from '$lib/components/AppStoreCta.svelte';
	import Mark from '$lib/components/Mark.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { COMPANY, SITE_URL } from '$lib/constants/app';

	const calm = [
		{ icon: 'leaf', title: 'No streaks', body: 'A quiet week is still a week. Nothing resets.' },
		{ icon: 'scale', title: 'No scores', body: 'Your day is described, never graded.' },
		{ icon: 'heart', title: 'No comparisons', body: 'Your roles are reflected on, never weighed.' }
	];
</script>

<SeoHead
	title="Meontor · Log your day in a tap"
	description="Meontor is a calm iPhone app for logging your day in a tap, with a smart widget and an on-device Mentor that reflects on what your day gave you. No account, no tracking."
	path="/"
	imageAlt="The Meontor mark and wordmark, with the line Moment + Mentor"
	structuredData={[
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
	]}
/>

<Hero />

<div id="features" class="scroll-mt-14">
	<Feature eyebrow="Capture" title="One tap, under a second.">
		<p>
			Coffee, a walk, a call with your mum. Tap it and it's in your day. Start a stretch like deep
			focus and stop it when you're done. Rate your mood with a face.
		</p>
		<p>Meontor puts what you're most likely to log right now at the top of the screen.</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="mood"
					alt="Logging a mood: five faces from Low to Great, with an optional note"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<WidgetShowcase />

	<HowItLearns />

	<Feature eyebrow="Everything else" title="Anything else is one search away." flip>
		<p>
			Over a hundred activities across everyday life, in categories you can reorder and make your
			own. Favourites sit at the top.
		</p>
		<p>Quick Capture sits above the tab bar on every screen, so it's always one tap away.</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="capture"
					alt="Quick Capture, with a search field and category cards for Family, Sleep, Care, Food and Drink, Body and Mind, and Movement"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<Feature id="mentor" eyebrow="Mentor" title="What your day gave you.">
		<p>
			Open the Mentor and it reflects on your day: what kind of day it was, a line for each of your
			roles, one thing worth noticing.
		</p>
		<p>
			It's written by Apple Intelligence on your iPhone, or written on device when Apple
			Intelligence isn't available. It never measures one part of your life against another.
		</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="mentor"
					alt="The Mentor, written by Apple Intelligence: a day with room for the people you love, for yourself, and for work that moves forward"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<SiriShowcase />

	<Feature eyebrow="Your days" title="Every day, drawn as it happened." flip>
		<p>
			Your day on a single line: moments as dots, stretches with their length, coloured by what they
			were. Swipe to fix or remove an entry.
		</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="timeline"
					alt="Timeline: today's entries on a single line, from walking at lunchtime to dinner"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<section class="mx-auto max-w-6xl px-5 py-20 sm:py-28">
		<div class="fade-in text-center" use:reveal>
			<p class="text-sm font-semibold tracking-wide text-accent">No guilt</p>
			<h2 class="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
				Nothing to catch up on.
			</h2>
			<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
				Nothing counts down. Meontor adds up what your day held and never shows what it didn't.
			</p>
		</div>
		<div class="fade-in mt-14 grid gap-10 text-center sm:grid-cols-3" use:reveal>
			{#each calm as item (item.title)}
				<div class="flex flex-col items-center">
					<span class="text-accent"><Icon name={item.icon} class="size-8" /></span>
					<h3 class="mt-4 text-lg font-semibold">{item.title}</h3>
					<p class="mt-2 text-label-2">{item.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<PrivacyBand />
</div>

<section class="px-5 py-24 sm:py-32">
	<div class="fade-in flex flex-col items-center text-center" use:reveal>
		<span class="mark-tint"><Mark size={64} /></span>
		<h2 class="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Start with one tap.</h2>
		<div class="mt-8"><AppStoreCta /></div>
	</div>
</section>
