import { describe, it, expect } from 'vitest';
import {
	Beat,
	changedStop,
	changedWeek,
	curve,
	curvePath,
	firstWeek,
	handFraction,
	movedFraction,
	movingDots,
	newDots,
	stops
} from './learningDay';
import { phaseForHour } from './phase';

// Mirrors LearningDay.swift (MeontorCore/Onboarding) and the checks in its tests.
describe('the example week', () => {
	it('is fifteen habits on seven days', () => {
		expect(firstWeek).toHaveLength(105);
		expect(new Set(firstWeek.map((t) => t.id)).size).toBe(105);
	});
	it("nudges each day by the day's jitter", () => {
		const woke = firstWeek.filter((t) => t.activityKey === 'woke_up').map((t) => t.minuteOfDay);
		expect(woke).toEqual([395, 410, 400, 415, 405, 390, 420]);
	});
	it('moves the evening walk to the morning', () => {
		expect(movingDots).toHaveLength(7);
		expect(newDots.map((t) => t.minuteOfDay)).toEqual([490, 505, 495, 510, 500, 485, 515]);
		expect(changedWeek.filter((t) => t.activityKey === 'walk')).toEqual(newDots);
	});
	it('glides a moved walk forward past midnight, never back', () => {
		expect(movedFraction(movingDots[0])).toBeCloseTo(1 + 490 / 1440);
	});
});

describe('where the hand rests', () => {
	it('is the middle of the taps in the ninety minutes after the stop', () => {
		expect(handFraction(stops[0], firstWeek)).toBeCloseTo((495 + 505 + 520) / 3 / 1440);
	});
	it('takes the moved walk into the morning after the change', () => {
		expect(handFraction(changedStop, changedWeek)).toBeCloseTo(505 / 1440);
	});
	it('falls back to the hour when nothing is there', () => {
		expect(handFraction(stops[0], [])).toBeCloseTo(480 / 1440);
	});
});

describe('the learned curve', () => {
	it('is 48 half-hour samples, 0 to 1 against the busiest moment', () => {
		const c = curve(firstWeek);
		expect(c).toHaveLength(48);
		expect(Math.max(...c)).toBeCloseTo(1);
		expect(Math.min(...c)).toBeGreaterThanOrEqual(0);
	});
	it('is flat with no taps', () => {
		expect(curve([]).every((v) => v === 0)).toBe(true);
	});
	it('bulges where taps cluster and not in the small hours', () => {
		const c = curve(firstWeek);
		expect(c[39]).toBeGreaterThan(c[6] * 5); // 7:30 pm against 3 am
	});
	it('draws a closed, smoothed outline', () => {
		const d = curvePath(curve(firstWeek), 145, 145, 58, 36.25);
		expect(d.startsWith('M')).toBe(true);
		expect(d.match(/Q/g)).toHaveLength(48);
		expect(d.endsWith('Z')).toBe(true);
	});
});

describe('the stops', () => {
	it("offer what the app's ranker offers", () => {
		expect(stops.map((s) => s.tileKeys)).toEqual([
			['coffee', 'breakfast', 'water'],
			['lunch', 'water', 'deep_focus'],
			['dinner', 'walk', 'time_together'],
			['read', 'brushed_teeth', 'went_to_bed']
		]);
		expect(changedStop.tileKeys).toEqual(['coffee', 'breakfast', 'walk']);
	});
	it("take their hour's phase", () => {
		expect(stops.map((s) => s.phase)).toEqual(['morning', 'midday', 'evening', 'night']);
	});
	it('play for about seventeen seconds', () => {
		expect(Beat.total).toBeCloseTo(17.17);
	});
});

describe('phaseForHour (ToneProfile.swift DayPhase)', () => {
	it('matches the app at every boundary', () => {
		const at = (h: number) => phaseForHour(h);
		expect([0, 3, 4, 6, 7, 10, 11, 13, 14, 16, 17, 20, 21, 23].map(at)).toEqual([
			'night',
			'night',
			'earlyMorning',
			'earlyMorning',
			'morning',
			'morning',
			'midday',
			'midday',
			'afternoon',
			'afternoon',
			'evening',
			'evening',
			'night',
			'night'
		]);
	});
});
