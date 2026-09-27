<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- Siri, a control and the Dynamic Island, drawn rather than photographed. -->
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Icon from './Icon.svelte';
</script>

<section id="anywhere" class="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28">
	<div class="fade-in text-center" use:reveal>
		<p class="text-sm font-semibold tracking-wide text-accent">Anywhere</p>
		<h2
			class="mx-auto mt-3 max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
		>
			Log from wherever you are.
		</h2>
		<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
			Say it to Siri, add a control to Control Center or the Action button, and keep anything
			running on your Lock Screen and in the Dynamic Island.
		</p>
	</div>
	<div class="fade-in mt-14 grid gap-5 md:grid-cols-3" use:reveal>
		<figure class="card">
			<div class="stage">
				<div class="siri">
					<span class="orb" aria-hidden="true"></span>
					<p class="text-lg font-medium">"Log coffee in Meontor"</p>
				</div>
			</div>
			<figcaption>
				<strong>Siri</strong> Say &ldquo;Log coffee in Meontor&rdquo;, and it&rsquo;s logged.
			</figcaption>
		</figure>
		<figure class="card">
			<div class="stage">
				<div class="control">
					<span class="control-button"><Icon name="hand-tap" class="size-8" /></span>
					<span class="text-sm font-medium">Log an activity</span>
				</div>
			</div>
			<figcaption>
				<strong>Controls</strong> Control Center, the Lock Screen, and the Action button.
			</figcaption>
		</figure>
		<figure class="card">
			<div class="stage">
				<div class="island">
					<span class="live" aria-hidden="true"></span>
					<span class="text-sm font-medium">Deep focus</span>
					<span class="ml-auto font-mono text-sm tabular-nums">0:42:10</span>
				</div>
			</div>
			<figcaption>
				<strong>Live Activities</strong> Anything running stays in view, with Stop a tap away.
			</figcaption>
		</figure>
	</div>
</section>

<style>
	.card {
		border-radius: 1.75rem;
		background: var(--grouped);
		overflow: hidden;
	}
	.stage {
		display: flex;
		height: 13rem;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}
	figcaption {
		padding: 0 1.5rem 1.5rem;
		color: var(--label-2);
		line-height: 1.5;
	}
	figcaption strong {
		display: block;
		color: var(--label);
		font-weight: 600;
	}
	.siri {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		text-align: center;
	}
	.orb {
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 999px;
		background: conic-gradient(from 200deg, #4f63d9, #af52de, #ff2d55, #ff9500, #30b0c7, #4f63d9);
		filter: blur(0.5px);
		box-shadow: 0 0 24px rgb(175 82 222 / 0.45);
	}
	.control {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}
	.control-button {
		display: grid;
		width: 4.5rem;
		height: 4.5rem;
		place-items: center;
		border-radius: 999px;
		background: var(--canvas);
		color: var(--accent);
		box-shadow: 0 6px 18px -8px rgb(0 0 0 / 0.3);
	}
	.island {
		display: flex;
		width: 100%;
		max-width: 16rem;
		align-items: center;
		gap: 0.6rem;
		padding: 0.8rem 1.1rem;
		border-radius: 999px;
		background: #000;
		color: #fff;
	}
	.live {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: #34c759;
	}
</style>
