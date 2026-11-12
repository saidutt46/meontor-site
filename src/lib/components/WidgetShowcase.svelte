<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  The widgets at their true Home Screen size (large 364 x 382 pt, medium 364 x 170 pt,
  small 170 x 170 pt), in the Graphite look the app draws (DESIGN §8), taken at f67dd35 (`large` at 8ed2f49),
  on a wallpaper-like ground, rather than inside a phone. A tile that asks for a
  value or details opens the app (MeontorWidgetFace.swift), so the copy says "most".
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
			Your next tap, on your Home Screen.
		</h2>
		<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
			Small, medium and large widgets suggest what to log now. Most taps log without opening the
			app. Calm and monochrome, in light and dark.
		</p>
	</div>
	<div class="wallpaper fade-in mt-14 rounded-[2.5rem] px-5 py-14 sm:py-20" use:reveal>
		<div class="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
			{@render widget(
				'large',
				364,
				382,
				"The large widget: Thursday's line from 6 am to midnight, Coffee 25 minutes ago, six buttons and a short thought"
			)}
			<div class="flex flex-col items-center gap-5 sm:gap-6">
				{@render widget(
					'medium',
					364,
					170,
					'The medium widget: Thursday, 6 logged, the day drawn as a line, and buttons for Coffee, Water and Walk'
				)}
				{@render widget(
					'running',
					364,
					170,
					'The medium widget while Deep focus runs: its timer, when it started, a round Stop and three activities'
				)}
			</div>
			{@render widget(
				'small',
				170,
				170,
				'The small widget: 6 logged, 1 hr 30 min, and one button for Coffee'
			)}
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
