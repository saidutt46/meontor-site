<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import Mark from './Mark.svelte';
	import Wordmark from './Wordmark.svelte';
	import PhoneFrame from './PhoneFrame.svelte';
	import Screenshot from './Screenshot.svelte';
	import AppStoreCta from './AppStoreCta.svelte';
</script>

<section class="overflow-hidden px-5 pt-16 pb-10 sm:pt-24">
	<div class="mx-auto flex max-w-3xl flex-col items-center text-center">
		<span class="mark-tint"><Mark size={104} breathing /></span>
		<Wordmark class="mt-6 h-11 text-label sm:h-14" />
		<p class="mt-3 text-xl text-label-2 sm:text-2xl">Moment + Mentor.</p>
		<h1 class="mt-10 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
			Log your day in a tap.<br class="hidden sm:block" /> Understand it in a sentence.
		</h1>
		<div class="mt-10 flex flex-col items-center gap-3">
			<AppStoreCta />
			<p class="text-sm text-label-3">On TestFlight now. Free, with no account.</p>
		</div>
	</div>
	<div class="mt-16 flex justify-center sm:mt-20">
		<PhoneFrame width="min(320px, 76vw)">
			<Screenshot
				name="now"
				eager
				alt="Meontor's Now screen: six suggestions for right now, a thought, and today so far"
			/>
		</PhoneFrame>
	</div>
</section>
