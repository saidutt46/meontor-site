<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  MentorShowcase: the home page's Mentor story for app v1 (T-010), a heading
  and four rows with screenshots. The images (taken at app 8ed2f49, T-009):
  screens/mentor-{light,dark} (the Mentor tab: Walk 11 of 20, Yoga New),
  screens/mentor-finding-{light,dark} (Sleep's sheet), screens/mentor-recap-{light,dark}
  (November 1 to 7) and screens/mentor-ask-{light,dark} (a typed walk question).
  Every sentence was checked against the app at 0eff2a7; the T-010 report
  holds the proof, line by line. Swift writes every finding, recap and answer
  from the person's own log; Apple Intelligence only reads a typed question,
  so never say it writes about the person or writes an answer. The rings are
  described in the app's own legend words and modestly, as they may change;
  private activities are grey and never named. The privacy detail of Ask lives
  on /privacy and in the FAQ, not here.
-->
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Feature from './Feature.svelte';
	import PhoneFrame from './PhoneFrame.svelte';
	import Screenshot from './Screenshot.svelte';
</script>

<div id="mentor" class="scroll-mt-20">
	<section class="mx-auto max-w-6xl px-5 pt-20 sm:pt-28">
		<div class="fade-in text-center" use:reveal>
			<p class="text-sm font-semibold tracking-wide text-accent">Mentor</p>
			<h2
				class="mx-auto mt-3 max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
			>
				It notices. It never keeps score.
			</h2>
			<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
				Everything the Mentor shows comes from your own log, worked out on your device.
			</p>
		</div>
	</section>

	<Feature eyebrow="New" title="What your days have in common.">
		<p>
			As your log grows, the Mentor finds patterns in it: when things usually happen, what is new,
			and what the days you rated best had in them.
		</p>
		<p>
			Today and your usual day sit side by side, as rings. Private activities show in grey, never
			named.
		</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="mentor"
					alt="The Mentor tab: a walk was part of 11 of your 20 best days these eight weeks, and yoga is new, six times in three weeks"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<Feature eyebrow="What I know about you" title="Each finding, with the days it rests on." flip>
		<p>Tap a finding to read more about it.</p>
		<p>
			When the Mentor is not sure, it says nothing. Tap the thumbs-down to hide a card you don't
			need.
		</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="mentor-finding"
					alt="A finding from the Mentor: you sleep about 7 hours 10 minutes on most nights, usually up around 6:45 am"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<Feature eyebrow="Recaps" title="Each week, in a few lines.">
		<p>
			On the week's last evening, a short recap: what it held most, what was new, and what was there
			every day.
		</p>
		<p>Never what the week lacked.</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="mentor-recap"
					alt="A weekly recap for November 1 to 7: 177 entries over seven days, the busiest on Tuesday, and the things logged most"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>

	<Feature eyebrow="Ask" title="Questions your log can answer." flip>
		<p>Once your log can answer them, Ask offers questions to tap.</p>
		<p>
			On iOS 27 or later with Apple Intelligence on, you can type one too: how often, when, how
			long, which days, or what a day held. Every answer is counted from your log.
		</p>
		{#snippet media()}
			<PhoneFrame>
				<Screenshot
					name="mentor-ask"
					alt="An answer from Ask: walk, over the past 28 days, usually around 12:55 pm, from 9 times in your log"
				/>
			</PhoneFrame>
		{/snippet}
	</Feature>
</div>
