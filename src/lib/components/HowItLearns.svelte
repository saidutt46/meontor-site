<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  "It learns your day": the app's onboarding centrepiece (HowItLearnsScreen.swift),
  played once when it scrolls into view, then at rest:

  0. The ring draws in; the mark arrives at its centre.
  1. An example person's week lands a day at a time; the learned curve rises.
  2. The hand stops at 8 am, 1 pm, 7 pm and 10 pm. At each, the mark takes that
     hour's colour, the taps ahead light, and three suggestions drift in.
  3. "Days change. It keeps up." The evening walks glide through midnight to the
     morning, the curve follows, and Walk joins the morning's suggestions.
  4. "The mark follows your day."

  Without JS, with reduced motion, and for screen readers: the app's still card,
  the four moments in a list.
-->
<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import LearningDial, { type DialDot } from './LearningDial.svelte';
	import Icon from './Icon.svelte';
	import {
		Beat,
		MOVED_KEY,
		activityLabel,
		changedStop,
		changedWeek,
		curve as curveFor,
		dialFraction,
		firstWeek,
		handFraction,
		movedFraction,
		movingDots,
		newDots,
		stops,
		timeLabel,
		type Stop
	} from '$lib/learning/learningDay';
	import { phaseColor } from '$lib/learning/phase';

	const glyph: Record<string, string> = {
		coffee: 'coffee',
		breakfast: 'breakfast',
		water: 'water',
		lunch: 'lunch',
		deep_focus: 'focus',
		dinner: 'moon-stars',
		walk: 'walk',
		time_together: 'heart',
		read: 'book',
		brushed_teeth: 'mouth',
		went_to_bed: 'bed'
	};
	const timeGlyph: Record<string, string> = {
		morning: 'sunrise',
		midday: 'sun',
		evening: 'sunset',
		night: 'moon-stars'
	};
	/** The stretch of the day that lights round the hand: an hour and a half. */
	const LIT_SPAN = 1.5 / 24;

	// MARK: State (the app's @State, one for one)
	let mode = $state<'still' | 'player'>('still');
	let ringProgress = $state(0);
	let markShown = $state(false);
	let landedDays = $state(0);
	let movedDays = $state(0);
	let curve = $state(curveFor([]));
	let handTurns = $state(0);
	let handShown = $state(false);
	let stop = $state<Stop | null>(null);
	let restingAt = $state<number | null>(null);
	let nudge = $state(0);
	let caption = $state<'none' | 'change' | 'close'>('none');
	let instant = $state(false);
	let finished = $state(false);

	let section: HTMLElement;
	let run = 0;
	let frame = 0;

	const isLit = (fraction: number) => {
		if (restingAt === null) return false;
		const apart = Math.abs(fraction - restingAt) % 1;
		return Math.min(apart, 1 - apart) <= LIT_SPAN / 2;
	};

	const dots: DialDot[] = $derived(
		firstWeek.map((tap) => {
			const isWalk = tap.activityKey === MOVED_KEY;
			const fraction = isWalk && tap.day < movedDays ? movedFraction(tap) : dialFraction(tap);
			return {
				id: tap.id,
				fraction,
				lane: tap.day,
				shown: tap.day < landedDays,
				// The walks light as the change is announced and stay lit as they travel.
				lit: (isWalk && caption === 'change') || isLit(fraction)
			};
		})
	);
	const phase = $derived(stop?.phase ?? 'night');
	const tiles = $derived(stop?.tileKeys ?? []);

	// MARK: The curve morphs, like LearnedCurve's animatableData
	function morphCurve(target: number[], seconds: number) {
		cancelAnimationFrame(frame);
		const from = curve.slice();
		const start = performance.now();
		const step = (now: number) => {
			const t = Math.min(1, (now - start) / (seconds * 1000));
			const e = 1 - Math.pow(1 - t, 3);
			curve = from.map((v, i) => v + (target[i] - v) * e);
			if (t < 1) frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
	}

	function curveMoved(moved: number) {
		const stayed = firstWeek.filter((t) => t.activityKey !== MOVED_KEY);
		const walks = [
			...movingDots.filter((t) => t.day >= moved),
			...newDots.filter((t) => t.day < moved)
		];
		return curveFor([...stayed, ...walks]);
	}

	// MARK: The conductor
	/** Resolves false once a replay has begun, and the rest never runs. */
	function pause(seconds: number, token: number) {
		return new Promise<boolean>((resolve) =>
			setTimeout(() => resolve(token === run), seconds * 1000)
		);
	}

	async function reset() {
		cancelAnimationFrame(frame);
		instant = true;
		ringProgress = 0;
		markShown = false;
		landedDays = 0;
		movedDays = 0;
		curve = curveFor([]);
		handTurns = 0;
		handShown = false;
		stop = null;
		restingAt = null;
		caption = 'none';
		finished = false;
		await tick();
		// Two frames, so the reset state is painted before transitions come back on.
		await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
		instant = false;
	}

	async function arrive(next: Stop, turns: number, token: number) {
		handTurns = turns;
		if (!(await pause(Beat.handTravel * Beat.settleAt, token))) return false;
		stop = next;
		restingAt = turns;
		nudge += 1;
		return pause(Beat.dwell, token);
	}

	async function play() {
		const token = ++run;
		await reset();
		if (token !== run) return;

		// 0 · The ring draws in; the mark arrives.
		ringProgress = 1;
		markShown = true;
		if (!(await pause(Beat.stageIn, token))) return;

		// 1 · A week lands, a day at a time, and the curve rises under it.
		for (let day = 1; day <= 7; day++) {
			landedDays = day;
			morphCurve(curveFor(firstWeek.filter((t) => t.day < day)), 0.8);
			if (!(await pause(Beat.dayInterval, token))) return;
		}
		if (!(await pause(Beat.afterWeek, token))) return;

		// 2 · The hand stops at each moment of the day.
		handShown = true;
		for (const next of stops) {
			if (!(await arrive(next, handFraction(next, firstWeek), token))) return;
		}

		// 3 · The walk moves to the morning, and the dial follows it there.
		caption = 'change';
		if (!(await pause(Beat.changeLead, token))) return;
		for (let day = 1; day <= 7; day++) {
			movedDays = day;
			morphCurve(curveMoved(day), Beat.glide);
			if (!(await pause(Beat.glideStagger, token))) return;
		}
		// Onward through midnight to the morning, never winding back.
		if (!(await arrive(changedStop, 1 + handFraction(changedStop, changedWeek), token))) return;

		// 4 · One line out, then the next in.
		if (!(await pause(Beat.beforeClose, token))) return;
		caption = 'none';
		if (!(await pause(Beat.captionOut, token))) return;
		caption = 'close';
		finished = true;
	}

	onMount(() => {
		const motion = matchMedia('(prefers-reduced-motion: reduce)');
		let observer: IntersectionObserver | undefined;
		let played = false;

		const choose = () => {
			mode = motion.matches ? 'still' : 'player';
			if (mode === 'still') {
				run++;
				return;
			}
			observer?.disconnect();
			observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((e) => e.isIntersecting) && !played) {
						played = true;
						observer?.disconnect();
						play();
					}
				},
				{ threshold: 0.45 }
			);
			observer.observe(section);
		};
		choose();
		motion.addEventListener('change', choose);
		return () => {
			run++;
			cancelAnimationFrame(frame);
			observer?.disconnect();
			motion.removeEventListener('change', choose);
		};
	});
</script>

<section
	id="how-it-learns"
	class="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-28"
	bind:this={section}
>
	<div class="text-center">
		<p class="text-sm font-semibold tracking-wide text-accent">How it learns</p>
		<h2
			class="mx-auto mt-3 max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
		>
			It learns your day.
		</h2>
		<p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-label-2 sm:text-xl">
			The more you log, the better it knows what comes next. All on your iPhone.
		</p>
	</div>

	<div class="stage mt-14 rounded-[2.5rem] bg-grouped px-5 py-12 sm:px-10 sm:py-16">
		{#if mode === 'player'}
			<div class="mx-auto flex max-w-md flex-col items-center" aria-hidden="true">
				<button
					type="button"
					class="dial-wrap"
					tabindex="-1"
					onclick={play}
					aria-label="Watch again"
				>
					<LearningDial
						{dots}
						{curve}
						{ringProgress}
						{handTurns}
						{handShown}
						{phase}
						{nudge}
						{markShown}
						{instant}
					/>
					<span class="time" class:shown={stop !== null}>
						{#if stop}
							<Icon name={timeGlyph[stop.phase]} class="size-4" />
							<span class="tabular-nums">{timeLabel(stop.hour)}</span>
						{/if}
					</span>
				</button>

				<p class="caption">
					<span class:shown={caption === 'change'}>Days change. It keeps up.</span>
					<span class:shown={caption === 'close'}>The mark follows your day.</span>
				</p>

				<div class="tiles">
					{#each [0, 1, 2] as slot (slot)}
						<div class="slot">
							<div class="tile placeholder">
								<span class="size-7"></span><span>Time together</span>
							</div>
							{#if tiles[slot]}
								{#key tiles[slot]}
									<div
										class="tile"
										in:fly={{ x: 22, duration: 500, delay: slot * 80, easing: cubicOut }}
										out:fly={{ x: -22, duration: 380, easing: cubicOut }}
									>
										<Icon name={glyph[tiles[slot]]} class="size-7" />
										<span>{activityLabel[tiles[slot]]}</span>
									</div>
								{/key}
							{/if}
						</div>
					{/each}
				</div>
			</div>
			<div class="mt-8 flex justify-center">
				<button
					type="button"
					class="replay"
					class:shown={finished}
					onclick={play}
					tabindex={finished ? 0 : -1}
				>
					<Icon name="replay" class="size-4" />
					Watch again
				</button>
			</div>
		{/if}

		<!-- The still version: the four moments, as the app shows them under Reduce Motion. -->
		<div class={mode === 'player' ? 'sr-only' : 'mx-auto max-w-md'}>
			<ul class="overflow-hidden rounded-3xl bg-elevated">
				{#each stops as s (s.hour)}
					<li class="flex items-center gap-4 border-b border-separator px-5 py-4 last:border-b-0">
						<svg
							viewBox="0 0 100 100"
							class="size-9 shrink-0"
							style:color={phaseColor(s.phase)}
							aria-hidden="true"
						>
							{#each [0, 60, 120, 180, 240, 300] as angle (angle)}
								<rect
									x="37"
									y="0"
									width="26"
									height="62"
									rx="13"
									fill="currentColor"
									fill-opacity="0.55"
									transform="rotate({angle} 50 50)"
								/>
							{/each}
							<circle cx="50" cy="50" r="15" fill="var(--elevated)" />
							<circle cx="50" cy="50" r="7" fill="currentColor" />
						</svg>
						<div>
							<p class="flex items-center gap-1.5 font-semibold">
								<Icon name={timeGlyph[s.phase]} class="size-4" />
								{timeLabel(s.hour)}
							</p>
							<p class="text-label-2">{s.tileKeys.map((k) => activityLabel[k]).join(' · ')}</p>
						</div>
					</li>
				{/each}
			</ul>
			<p class="mt-5 text-center font-medium text-label-2">The mark follows your day.</p>
		</div>
	</div>
</section>

<style>
	.dial-wrap {
		position: relative;
		display: block;
		width: 100%;
		max-width: 22rem;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
	/* The time under the mark, as the hand stops. */
	.time {
		position: absolute;
		top: 58%;
		left: 50%;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		transform: translateX(-50%);
		color: var(--label-2);
		font-size: 0.9375rem;
		font-weight: 500;
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.time.shown {
		opacity: 1;
	}
	/* Both lines always laid out, so the tiles below never move. */
	.caption {
		display: grid;
		margin-top: 1.75rem;
		color: var(--label-2);
		font-size: 1.0625rem;
		font-weight: 500;
		text-align: center;
	}
	.caption span {
		grid-area: 1 / 1;
		opacity: 0;
		transition: opacity 0.35s ease-out;
	}
	.caption span.shown {
		opacity: 1;
		transition-duration: 0.6s;
	}
	.tiles {
		display: grid;
		width: 100%;
		margin-top: 1.25rem;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}
	.slot {
		display: grid;
	}
	.slot > * {
		grid-area: 1 / 1;
	}
	/* The app's pick tile: a glyph over its label, on a raised surface. */
	.tile {
		display: flex;
		min-width: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1.1rem 0.5rem;
		border-radius: 1.25rem;
		background: var(--elevated);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
		color: var(--label);
		font-size: 0.9375rem;
		font-weight: 600;
		text-align: center;
	}
	.tile :global(svg) {
		color: var(--label-2);
	}
	.tile.placeholder {
		visibility: hidden;
	}
	.replay {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		border-radius: 999px;
		color: var(--accent);
		font-weight: 500;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease;
	}
	.replay.shown {
		opacity: 1;
		pointer-events: auto;
	}
	.replay:hover {
		background: color-mix(in srgb, var(--accent) 10%, transparent);
	}
	.replay:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
</style>
