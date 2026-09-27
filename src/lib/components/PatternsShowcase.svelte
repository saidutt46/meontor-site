<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  The Mentor's week: the seven days drawn (a screenshot), and "What you're
  learning about yourself", drawn rather than photographed because it sits below
  the fold of the app's week view. Card for card as the app shows it (DESIGN
  §6.3): a symbol tile on a grey wash, then the sentence. The sentences are ones
  the app really writes, from its sample life and its tests.
-->
<script lang="ts">
	import Feature from './Feature.svelte';
	import PhoneFrame from './PhoneFrame.svelte';
	import Screenshot from './Screenshot.svelte';
	import Icon from './Icon.svelte';
	import { reveal } from '$lib/actions/reveal';

	const patterns = [
		{ icon: 'scope', text: 'Your focus tends to gather between 9:30 am and 11:30 am.' },
		{ icon: 'clock', text: 'Standup has held around 9:30 am on weekdays for four weeks.' },
		{ icon: 'sparkles', text: 'On days with Walk, your mood tends to read higher.' }
	];
</script>

<Feature id="week" eyebrow="Each week" title="What you're learning about yourself." flip>
	<p>
		The week view draws your seven days on one shared line, so mornings line up and weekends look
		like weekends. Below it, the Mentor shares what has held across the last four weeks: when your
		focus gathers, what has kept its place, what came back and stayed.
	</p>
	<p>
		Meontor finds these itself, with fixed statistical bars, and waits until something has truly
		held, usually about three weeks in. Every one of them points to something that goes well. Never
		habits like smoking or drinking, never pain or stress, and never your roles.
	</p>
	{#snippet media()}
		<PhoneFrame>
			<Screenshot
				name="mentor-week"
				alt="The Mentor's week: seven days drawn as strips on one line, lettered S M T W T F S, over a reflection written by Apple Intelligence"
			/>
		</PhoneFrame>
	{/snippet}
</Feature>

<div class="mx-auto -mt-6 max-w-6xl px-5 pb-20 sm:pb-28">
	<div class="fade-in mx-auto max-w-2xl rounded-[2.5rem] bg-grouped p-6 sm:p-10" use:reveal>
		<h3 class="text-2xl font-bold tracking-tight">What you're learning about yourself</h3>
		<ul class="mt-5 space-y-3">
			{#each patterns as pattern (pattern.icon)}
				<li class="flex items-center gap-4 rounded-2xl bg-elevated p-4">
					<span
						class="grid size-9 shrink-0 place-items-center rounded-[0.6rem] bg-grouped text-label-2"
					>
						<Icon name={pattern.icon} class="size-5" />
					</span>
					<p class="leading-snug">{pattern.text}</p>
				</li>
			{/each}
		</ul>
		<p class="mt-4 text-sm text-label-2">From your last four weeks.</p>
	</div>
</div>
