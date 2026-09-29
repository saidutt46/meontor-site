<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  The widgets at their true Home Screen size (large 364 x 382 pt, medium 364 x 170 pt,
  small 170 x 170 pt), as build 11 draws them,
  on a wallpaper-like ground, rather than inside a phone.
-->
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

{#snippet widget(name: string, width: number, height: number, alt: string)}
	<picture>
		<source srcset="/images/widgets/{name}-dark.webp" media="(prefers-color-scheme: dark)" />
		<img
			src="/images/widgets/{name}-light.webp"
			{alt}
			width={width * 2}
			height={height * 2}
			loading="lazy"
			decoding="async"
			class="widget"
			style:width="{width}px"
		/>
	</picture>
{/snippet}

<section id="widget" class="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
	<div class="fade-in text-center" use:reveal>
		<p class="text-sm font-semibold tracking-wide text-accent">Home Screen</p>
		<h2
			class="mx-auto mt-3 max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
		>
			Three things, right when you need them.
		</h2>
		<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
			It learns your rhythm and puts your next tap on your Home Screen. No need to open the app.
		</p>
	</div>
	<div class="wallpaper fade-in mt-14 rounded-[2.5rem] px-5 py-14 sm:py-20" use:reveal>
		<div class="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
			{@render widget(
				'large',
				364,
				382,
				"The large widget: the day's line with its hours, the last thing logged, six tiles and a thought"
			)}
			<div class="flex flex-col items-center gap-5 sm:gap-6">
				{@render widget(
					'medium',
					364,
					170,
					'The medium widget: Sunday, 6 logged, the day drawn as a line, and tiles for Coffee, Water and Walk'
				)}
				{@render widget(
					'running',
					364,
					170,
					'The medium widget while Deep focus runs: a large timer, when it started, and a round Stop'
				)}
			</div>
			{@render widget('small', 170, 170, 'The small widget with one suggestion, Coffee')}
		</div>
	</div>
</section>

<style>
	.wallpaper {
		background:
			radial-gradient(60% 80% at 15% 20%, rgb(79 99 217 / 0.35), transparent 70%),
			radial-gradient(60% 80% at 85% 80%, rgb(48 176 199 / 0.35), transparent 70%),
			radial-gradient(50% 60% at 60% 10%, rgb(255 149 0 / 0.18), transparent 70%), var(--grouped);
	}
	.widget {
		max-width: 100%;
		height: auto;
		border-radius: 22px;
		box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.3);
	}
</style>
