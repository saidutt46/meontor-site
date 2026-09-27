/*
 * Copyright (c) 2026 Daivat Creations
 * All rights reserved.
 *
 * This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
// The six phases of the day the mark takes its colour from, as the app divides
// them (ToneProfile.swift, DayPhase). Colours are CSS custom properties in app.css.

export type Phase = 'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export function phaseForHour(hour: number): Phase {
	if (hour >= 4 && hour < 7) return 'earlyMorning';
	if (hour >= 7 && hour < 11) return 'morning';
	if (hour >= 11 && hour < 14) return 'midday';
	if (hour >= 14 && hour < 17) return 'afternoon';
	if (hour >= 17 && hour < 21) return 'evening';
	return 'night';
}

/** The CSS colour for a phase, e.g. `var(--phase-morning)`. */
export const phaseColor = (phase: Phase) => `var(--phase-${phase})`;
