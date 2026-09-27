<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  The mark, redrawn from MeontorMarkArtwork on a 100-unit grid: six 26 x 62 petals
  centred 19 above the middle, a hollow core (r 15) and a dot (r 7). Colour comes
  from the parent's text colour.
-->
<script lang="ts">
	let {
		size = 120,
		breathing = false,
		label
	}: { size?: number; breathing?: boolean; label?: string } = $props();
	const id = $props.id();
</script>

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
		<linearGradient id="petal-{id}" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="currentColor" stop-opacity="0.85" />
			<stop offset="1" stop-color="currentColor" stop-opacity="0.25" />
		</linearGradient>
		<mask id="core-{id}">
			<rect width="100" height="100" fill="white" />
			<circle cx="50" cy="50" r="15" fill="black" />
		</mask>
	</defs>
	<g mask="url(#core-{id})">
		{#each [0, 60, 120, 180, 240, 300] as angle (angle)}
			<rect
				x="37"
				y="0"
				width="26"
				height="62"
				rx="13"
				fill="url(#petal-{id})"
				transform="rotate({angle} 50 50)"
			/>
		{/each}
	</g>
	<circle cx="50" cy="50" r="7" fill="currentColor" fill-opacity="0.9" />
</svg>

<style>
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
