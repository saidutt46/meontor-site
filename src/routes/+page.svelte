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
	import MentorShowcase from '$lib/components/MentorShowcase.svelte';
	import SiriShowcase from '$lib/components/SiriShowcase.svelte';
	import PrivacyBand from '$lib/components/PrivacyBand.svelte';
	import AppStoreCta from '$lib/components/AppStoreCta.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { COMPANY, SITE_URL } from '$lib/constants/app';

	// Each claim is checked against the app at f67dd35 (2026-11-04; the T-006 report) and again at
	// 0eff2a7 (2026-11-11; the T-010 report, which also proves the Mentor section).
	const calm = [
		{ icon: 'leaf', title: 'No streaks' },
		{ icon: 'scale', title: 'No scores' },
		{ icon: 'heart', title: 'No comparisons with anyone' }
	];
</script>

<SeoHead
	title="Meontor · Log your day in a tap"
	description="Meontor is a calm app for iPhone and iPad for logging your day in a tap, with widgets that suggest what to log now and a Mentor that notices patterns in your days. No account, no tracking."
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
				'Tap to log your day, widgets that suggest what to log now, and a Mentor that notices patterns in your days.',
			author: { '@type': 'Organization', name: COMPANY, url: SITE_URL }
		}
	]}
/>

<Hero />

<div id="features" class="scroll-mt-14">
	<Feature eyebrow="Capture" title="One tap, and it's logged.">
		<p>Coffee? Tap. Walk? Tap. Mood? Pick a face. Details when you want them.</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="mood"
					alt="Logging a mood: five faces from Low to Great, with a link to add a note"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<Feature eyebrow="Everything else" title="Anything else is one search away." flip>
		<p>Over a hundred everyday activities, in categories you can make your own.</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="capture"
					alt="The Log screen: a search field, four favourites, and category cards for Family, Sleep, Care, and Food & Drink"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<Feature id="now" eyebrow="Now" title="Right for this hour, from day one.">
		<p>
			Six suggestions fit the hour from your first day. Within about a week, your own routine leads.
		</p>
		<p>
			Today so far draws your day on one line, with every capture grouped by part of the day. Sleep
			and steps join it if you allow Apple Health.
		</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="today"
					alt="The Today so far card: 6 hr 40 min asleep, 5,200 steps and 8 captures, a line across the day, and the captures grouped by morning, afternoon and evening"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<WidgetShowcase />

	<SiriShowcase />

	<PrivacyBand />

	<MentorShowcase />

	<Feature eyebrow="Your days" title="Every day, as it happened.">
		<p>Every tap and every stretch, newest first. Swipe to fix an entry.</p>
		<p>Workouts from Apple Health join them if you allow it.</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="timeline"
					alt="The Timeline for today: 14 things, newest first, from Deep focus, still running, back through an early gym visit"
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
				Nothing counts down. Nothing resets.
			</p>
		</div>
		<div class="fade-in mt-14 grid gap-10 text-center sm:grid-cols-3" use:reveal>
			{#each calm as item (item.title)}
				<div class="flex flex-col items-center">
					<span class="text-accent"><Icon name={item.icon} class="size-8" /></span>
					<h3 class="mt-4 text-lg font-semibold">{item.title}</h3>
				</div>
			{/each}
		</div>
	</section>

	<section id="everyone" class="mx-auto max-w-6xl scroll-mt-20 px-5 pb-12 sm:pb-16">
		<div class="fade-in text-center" use:reveal>
			<h2 class="text-sm font-semibold tracking-wide text-accent">For everyone</h2>
			<p class="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
				Meontor works at the largest text sizes, and with VoiceOver and Voice Control.
			</p>
		</div>
	</section>
</div>

<section class="px-5 py-24 sm:py-32">
	<div class="fade-in flex flex-col items-center text-center" use:reveal>
		<img
			src="/images/app-icon.webp"
			alt="The Meontor app icon"
			width="96"
			height="96"
			loading="lazy"
			decoding="async"
		/>
		<h2 class="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Start with one tap.</h2>
		<div class="mt-8"><AppStoreCta /></div>
	</div>
</section>
