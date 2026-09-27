/*
 * Copyright (c) 2026 Daivat Creations
 * All rights reserved.
 *
 * This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
// A port of the app's "How it learns" script (MeontorCore/Onboarding/LearningDay.swift):
// an example person's week, the four moments the dial stops at, what the app
// offers at each, and the routine change that shows it adapting. The app's
// LearningDayRankerTests hold these tiles to what its real ranker suggests, so
// keep this file in step with the Swift, never the other way round.

import type { Phase } from './phase';

export type Habit = { activityKey: string; minuteOfDay: number };
export type Tap = { id: string; activityKey: string; day: number; minuteOfDay: number };
export type Stop = { hour: number; phase: Phase; tileKeys: string[] };

export const MINUTES_PER_DAY = 24 * 60;

const habit = (activityKey: string, hour: number, minute: number): Habit => ({
	activityKey,
	minuteOfDay: hour * 60 + minute
});

/** An ordinary morning, a working afternoon, a walk at dusk, a quiet night. */
export const routine: Habit[] = [
	habit('woke_up', 6, 45),
	habit('coffee', 8, 15),
	habit('breakfast', 8, 25),
	habit('brushed_teeth', 8, 40),
	habit('water', 10, 30),
	habit('lunch', 13, 15),
	habit('water', 13, 25),
	habit('deep_focus', 13, 45),
	habit('water', 16, 0),
	habit('dinner', 19, 15),
	habit('walk', 19, 30),
	habit('time_together', 19, 45),
	habit('read', 22, 15),
	habit('brushed_teeth', 22, 25),
	habit('went_to_bed', 22, 40)
];

/** The walk moves from dusk to the morning: easy to see, because it crosses the dial. */
export const MOVED_KEY = 'walk';
const movedHabit = habit(MOVED_KEY, 8, 20);

/** How far each day of the week drifts from the routine's clock, in minutes. */
const dayJitter = [-10, 5, -5, 10, 0, -15, 15];

export function week(habits: Habit[]): Tap[] {
	return dayJitter.flatMap((jitter, day) =>
		habits.map((h) => ({
			id: `${h.activityKey}-${day}-${h.minuteOfDay + jitter}`,
			activityKey: h.activityKey,
			day,
			minuteOfDay: h.minuteOfDay + jitter
		}))
	);
}

export const dialFraction = (tap: Tap) => tap.minuteOfDay / MINUTES_PER_DAY;

export const firstWeek = week(routine);
export const newDots = week([movedHabit]);
export const movingDots = firstWeek.filter((t) => t.activityKey === MOVED_KEY);
export const changedWeek = [...firstWeek.filter((t) => t.activityKey !== MOVED_KEY), ...newDots];

/** Where a travelling walk comes to rest: carried past midnight (above 1) so it glides forward. */
export function movedFraction(tap: Tap): number {
	return 1 + (movedHabit.minuteOfDay + dayJitter[tap.day]) / MINUTES_PER_DAY;
}

export const stops: Stop[] = [
	{ hour: 8, phase: 'morning', tileKeys: ['coffee', 'breakfast', 'water'] },
	{ hour: 13, phase: 'midday', tileKeys: ['lunch', 'water', 'deep_focus'] },
	{ hour: 19, phase: 'evening', tileKeys: ['dinner', 'walk', 'time_together'] },
	{ hour: 22, phase: 'night', tileKeys: ['read', 'brushed_teeth', 'went_to_bed'] }
];

/** The morning again, once the walk has moved into it. */
export const changedStop: Stop = {
	hour: 8,
	phase: 'morning',
	tileKeys: ['coffee', 'breakfast', 'walk']
};

const CLUSTER_WINDOW = 90;

/** The middle of the taps in the ninety minutes after a stop's hour, not the hour itself. */
export function handFraction(stop: Stop, taps: Tap[]): number {
	const start = stop.hour * 60;
	const minutes = taps
		.map((t) => t.minuteOfDay)
		.filter((m) => m >= start && m < start + CLUSTER_WINDOW);
	if (!minutes.length) return start / MINUTES_PER_DAY;
	return minutes.reduce((a, b) => a + b, 0) / minutes.length / MINUTES_PER_DAY;
}

export const CURVE_SAMPLES = 48;
const CURVE_SPREAD = 45;

/** At each half hour, how much happens around then, 0 to 1 against the busiest moment. */
export function curve(taps: Tap[]): number[] {
	const step = MINUTES_PER_DAY / CURVE_SAMPLES;
	const values = Array.from({ length: CURVE_SAMPLES }, (_, i) => {
		const minute = i * step;
		return taps.reduce((sum, tap) => {
			const raw = Math.abs(tap.minuteOfDay - minute);
			const distance = Math.min(raw, MINUTES_PER_DAY - raw);
			return sum + Math.exp(-(distance * distance) / (2 * CURVE_SPREAD * CURVE_SPREAD));
		}, 0);
	});
	const peak = Math.max(...values);
	return peak > 0 ? values.map((v) => v / peak) : values;
}

/** The curve as a closed outline, smoothed through midpoints (LearnedCurve.swift). */
export function curvePath(values: number[], cx: number, cy: number, base: number, bulge: number) {
	const n = values.length;
	const points = values.map((value, i) => {
		const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
		const r = base + bulge * Math.max(0, value);
		return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
	});
	const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
	const f = (p: number[]) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
	let d = `M${f(mid(points[n - 1], points[0]))}`;
	for (let i = 0; i < n; i++) d += `Q${f(points[i])} ${f(mid(points[i], points[(i + 1) % n]))}`;
	return d + 'Z';
}

/** The choreography's clock, in seconds (LearningDay.Beat). */
export const Beat = {
	stageIn: 0.8,
	dayInterval: 0.32,
	afterWeek: 0.5,
	handTravel: 0.9,
	settleAt: 0.6,
	dwell: 1.5,
	changeLead: 0.9,
	glide: 1.3,
	glideStagger: 0.14,
	beforeClose: 1.2,
	captionOut: 0.35,
	/** How long a day's dots take to arrive round the dial (MeontorLearningDial.landingSweep). */
	landingSweep: 0.28,
	get total() {
		const s = stops.length + 1;
		return (
			this.stageIn +
			7 * this.dayInterval +
			this.afterWeek +
			s * (this.handTravel * this.settleAt + this.dwell) +
			this.changeLead +
			7 * this.glideStagger +
			this.beforeClose +
			this.captionOut
		);
	}
};

/** Labels for the example person's activities, from the app's seed catalog. */
export const activityLabel: Record<string, string> = {
	coffee: 'Coffee',
	breakfast: 'Breakfast',
	water: 'Water',
	lunch: 'Lunch',
	deep_focus: 'Deep focus',
	dinner: 'Dinner',
	walk: 'Walk',
	time_together: 'Time together',
	read: 'Read',
	brushed_teeth: 'Brushed',
	went_to_bed: 'In bed'
};

/** The time under the mark as the hand stops: "8 am", "1 pm" (AppCopy.learnsTime). */
export function timeLabel(hour: number) {
	const twelve = hour % 12 === 0 ? 12 : hour % 12;
	return `${twelve} ${hour < 12 ? 'am' : 'pm'}`;
}
