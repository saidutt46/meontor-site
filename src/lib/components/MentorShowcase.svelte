<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  MentorShowcase: the home page's Mentor section, in words only (owner,
  2026-11-09): no screenshot while the Mentor's screens are still changing, and
  only claims that will survive those changes.
  Checked against the app at f67dd35: Swift writes every finding from the
  person's own log (MeontorCore/Findings/Finding.swift); not every finding is a
  count, so the copy does not say so. The example is the app's own
  line (FindingEngine+GoodDays.swift), and a week's recap never says what the
  week lacked (WeekRecap.swift). Never say that Apple Intelligence writes about
  the person, and never name rings, "Your weeks" or Ask.
-->
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Icon from './Icon.svelte';
</script>

<section id="mentor" class="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
	<div class="fade-in text-center" use:reveal>
		<p class="text-sm font-semibold tracking-wide text-accent">Mentor</p>
		<h2
			class="mx-auto mt-3 max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
		>
			It notices what your days have in common.
		</h2>
		<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
			As your log grows, the Mentor finds patterns in it. Each one comes from your own days, worked
			out on your device.
		</p>
	</div>
	<div class="fade-in mx-auto mt-12 max-w-xl" use:reveal>
		<figure class="flex items-center gap-4 rounded-[1.75rem] bg-grouped p-5 sm:p-6">
			<span class="grid size-10 shrink-0 place-items-center rounded-[0.7rem] bg-canvas text-accent">
				<Icon name="walk" class="size-6" />
			</span>
			<blockquote class="text-lg leading-snug font-medium">
				7 of your 9 best days had a walk in them.
			</blockquote>
		</figure>
	</div>
	<p
		class="fade-in mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-label-2 sm:text-xl"
		use:reveal
	>
		Once a week, a short recap of what the week held. Never what it lacked.
	</p>
</section>
