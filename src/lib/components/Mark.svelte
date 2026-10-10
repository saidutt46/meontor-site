<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  The mark, redrawn from MeontorMarkArtwork (app main 0f3e839, 2026-10-10) on a
  100-unit grid, drawn as the app icon is, flat: six 26 x 62 petals centred 19 above
  the middle in two fans, the back fan (60, 180, 300 degrees) deeper and see-through
  under the front fan (0, 120, 240); the six-pointed star where neighbouring petals
  cross, solid on a small shadow and lifted toward white in dark mode; the core
  (r 15) cut out of everything; the dot (r 7). Colour comes from the parent's text
  colour. If anything ever turns it, turn it in 120-degree steps, or the back fan
  stands upright.
-->
<script lang="ts">
	let {
		size = 120,
		breathing = false,
		label
	}: { size?: number; breathing?: boolean; label?: string } = $props();
	const id = $props.id();
	const BACK = [60, 180, 300];
	const FRONT = [0, 120, 240];
</script>

{#snippet petal(angle: number, cls?: string)}
	<rect x="37" y="0" width="26" height="62" rx="13" class={cls} transform="rotate({angle} 50 50)" />
{/snippet}

<svg
	width={size}
	height={size}
	viewBox="0 0 100 100"
	class:breathing
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
>
	<defs>
		<mask id="core-{id}">
			<rect width="100" height="100" fill="white" />
			<circle cx="50" cy="50" r="15" fill="black" />
		</mask>
		{#each [0, 1, 2, 3, 4, 5] as i (i)}
			<clipPath id="petal-{id}-{i}">{@render petal(i * 60)}</clipPath>
		{/each}
		<!-- The app's shadow: black 0.3, radius 1.2% of the side, half of it down. -->
		<filter id="lift-{id}" x="-10%" y="-10%" width="120%" height="120%">
			<feDropShadow dx="0" dy="0.6" stdDeviation="0.6" flood-color="black" flood-opacity="0.3" />
		</filter>
	</defs>
	<g mask="url(#core-{id})">
		{#each BACK as angle (angle)}{@render petal(angle, 'back')}{/each}
		{#each FRONT as angle (angle)}{@render petal(angle, 'front')}{/each}
		<g class="star" filter="url(#lift-{id})">
			{#each [0, 1, 2, 3, 4, 5] as i (i)}
				<g clip-path="url(#petal-{id}-{(i + 1) % 6})">{@render petal(i * 60)}</g>
			{/each}
		</g>
	</g>
	<circle cx="50" cy="50" r="7" fill="currentColor" />
</svg>

<style>
	.front {
		fill: currentColor;
		fill-opacity: 0.82;
	}
	.back {
		fill: color-mix(in srgb, currentColor 76%, black);
		fill-opacity: 0.78;
	}
	.star {
		fill: currentColor;
	}
	@media (prefers-color-scheme: dark) {
		.star {
			fill: color-mix(in srgb, currentColor 82%, white);
		}
	}
	/* The app's 8-second breath; reduced motion stops it (app.css). */
	.breathing {
		animation: breathe 8s ease-in-out infinite;
		transform-origin: center;
	}
	@keyframes breathe {
		0%,
		100% {
			transform: scale(0.96);
		}
		50% {
			transform: scale(1);
		}
	}
</style>
