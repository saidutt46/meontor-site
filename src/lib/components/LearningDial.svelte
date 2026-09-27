<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  The 24-hour dial from the app's "How it learns" (MeontorLearningDial.swift):
  midnight at the top, turning clockwise, drawn on the app's proportions.

  A pure drawing: every value comes from the conductor (HowItLearns). The motion
  is CSS transitions on transforms, so the browser's compositor does the work:
  a dot sits at the top of its lane inside a group rotated to its time, so when
  its time changes it travels round the lane rather than cutting across the dial.
-->
<script module lang="ts">
	export type DialDot = {
		id: string;
		/** 0 to 1 from midnight; above 1 carries on past midnight. */
		fraction: number;
		/** Which day of the week, 0 innermost. */
		lane: number;
		shown: boolean;
		lit: boolean;
	};
</script>

<script lang="ts">
	import { curvePath } from '$lib/learning/learningDay';
	import { phaseColor, type Phase } from '$lib/learning/phase';

	let {
		dots,
		curve,
		ringProgress,
		handTurns,
		handShown,
		phase,
		nudge,
		markShown,
		instant
	}: {
		dots: DialDot[];
		curve: number[];
		ringProgress: number;
		handTurns: number;
		handShown: boolean;
		phase: Phase;
		nudge: number;
		markShown: boolean;
		/** Set while resetting for a replay, so nothing animates backwards. */
		instant: boolean;
	} = $props();

	const id = $props.id();

	// MeontorSize.LearningDial, as fractions of a 290-point diameter.
	const D = 290;
	const C = D / 2;
	const RING = 0.47 * D;
	const LANE_INNER = 0.345 * D;
	const LANE_STEP = 0.017 * D;
	const CURVE_BASE = 0.2 * D;
	const CURVE_BULGE = 0.125 * D;
	const HAND_INNER = 0.2 * D;
	const MARK = 58;
	const TICK = 6;

	const tint = $derived(phaseColor(phase));
	const outline = $derived(curvePath(curve, C, C, CURVE_BASE, CURVE_BULGE));
</script>

<svg viewBox="0 0 {D} {D}" class="dial" class:instant style:--tint={tint} aria-hidden="true">
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

	<!-- The day: a ring that draws itself in, with midnight, six, noon and six. -->
	<circle class="ring" cx={C} cy={C} r={RING} pathLength="1" stroke-dashoffset={1 - ringProgress} />
	<g class="fades" style:opacity={ringProgress}>
		{#each [0, 90, 180, 270] as angle (angle)}
			<line
				class="tick"
				x1={C}
				y1={C - RING + TICK * 0.5}
				x2={C}
				y2={C - RING + TICK * 1.5}
				transform="rotate({angle} {C} {C})"
			/>
		{/each}
		<!-- What the app has learned: a soft shape that bulges where the taps cluster. -->
		<path class="curve" d={outline} />
	</g>

	{#each dots as dot (dot.id)}
		<g class="lane" style:transform="rotate({dot.fraction * 360}deg)">
			<circle
				class="dot"
				class:shown={dot.shown}
				class:lit={dot.lit}
				cx={C}
				cy={C - (LANE_INNER + dot.lane * LANE_STEP)}
				r="2.5"
				style:transition-delay="{(dot.fraction % 1) * 0.28}s, {(dot.fraction % 1) * 0.28}s, 0s"
			/>
		</g>
	{/each}

	<!-- The hand points at the moment being shown; it carries on through midnight. -->
	<g class="hand" class:shown={handShown} style:transform="rotate({handTurns * 360}deg)">
		<line x1={C} y1={C - HAND_INNER} x2={C} y2={C - RING} />
		<circle cx={C} cy={C - RING} r="4" />
	</g>

	<!-- The mark at the centre, in the moment's colour, turning a petal at each stop. -->
	<g class="mark" class:shown={markShown} transform="translate({C - MARK / 2} {C - MARK / 2 - 12})">
		<g class="petals" style:transform="rotate({nudge * 60}deg)">
			<g transform="scale({MARK / 100})">
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
			</g>
		</g>
	</g>
</svg>

<style>
	/* The tint is set here, not on the mark: a gradient's currentColor resolves
	   where the gradient is defined (the svg), not where it is used. */
	.dial {
		color: var(--tint);
		transition: color 0.6s ease;
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}
	.ring {
		fill: none;
		stroke: var(--separator);
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-dasharray: 1;
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
		transition: stroke-dashoffset 0.8s ease-in-out;
	}
	.fades {
		transition: opacity 0.8s ease-in-out;
	}
	.tick {
		stroke: var(--label-3);
		stroke-width: 1.5;
		stroke-linecap: round;
	}
	.curve {
		fill: color-mix(in srgb, var(--accent) 16%, transparent);
		stroke: color-mix(in srgb, var(--accent) 45%, transparent);
		stroke-width: 1.5;
	}
	/* A dot's time: the lane turns to it, so a change of time travels round the lane. */
	.lane {
		transform-origin: 145px 145px;
		transition: transform 1.3s cubic-bezier(0.3, 1.12, 0.5, 1);
	}
	.dot {
		fill: var(--label-2);
		opacity: 0;
		transform: scale(2.2);
		transform-box: fill-box;
		transform-origin: center;
		/* Falls in from a little larger, so it reads as landing. The delays (set
		   inline) make a day's taps arrive clockwise. */
		transition:
			opacity 0.45s ease-out,
			transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1),
			fill 0.4s ease;
	}
	.dot.shown {
		opacity: 0.35;
		transform: scale(1);
	}
	.dot.shown.lit {
		fill: var(--tint);
		opacity: 1;
	}
	.hand {
		opacity: 0;
		transform-origin: 145px 145px;
		transition:
			transform 0.9s cubic-bezier(0.34, 1.22, 0.64, 1),
			opacity 0.45s ease-out;
	}
	.hand.shown {
		opacity: 1;
	}
	.hand line {
		stroke: color-mix(in srgb, var(--label) 45%, transparent);
		stroke-width: 2;
		stroke-linecap: round;
	}
	.hand circle {
		fill: var(--tint);
		transition: fill 0.6s ease;
	}
	.mark {
		opacity: 0;
		transition: opacity 0.8s ease-in-out;
	}
	.mark.shown {
		opacity: 1;
	}
	.petals {
		transform-box: fill-box;
		transform-origin: center;
		transition: transform 1.4s cubic-bezier(0.3, 1.15, 0.5, 1);
	}
	.instant,
	.instant * {
		transition: none !important;
	}
</style>
