/*
 * Copyright (c) 2026 Daivat Creations
 * All rights reserved.
 *
 * This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
// One source for the Support page and its FAQPage structured data, so the two cannot drift.
export type FaqTopic = { topic: string; items: { q: string; a: string }[] };

export const FAQ: FaqTopic[] = [
	{
		topic: 'Getting started',
		items: [
			{
				q: 'What does Meontor need?',
				a: "An iPhone running iOS 27. The Mentor uses Apple Intelligence when your iPhone supports it and it's turned on. Otherwise Meontor writes reflections on device without it."
			},
			{ q: 'Is there an account?', a: 'No. Open the app and start logging.' },
			{
				q: 'How do I add the widget?',
				a: 'Touch and hold your Home Screen, tap Edit, then Add Widget, and choose Meontor. The medium size shows three suggestions and a thought.'
			}
		]
	},
	{
		topic: 'Logging',
		items: [
			{
				q: 'How does Meontor choose what to suggest?',
				a: 'It learns from your own days: what you tend to log at this time, on this kind of day, and what usually follows. The more you log, the better it fits. It all happens on your iPhone.'
			},
			{
				q: 'I logged something at the wrong time. Can I fix it?',
				a: 'Yes. On Timeline or Now, swipe right to edit an entry or left to delete it. Delete offers Undo.'
			},
			{
				q: 'Can I use Siri?',
				a: 'Yes. Try "Log coffee in Meontor" or "Start deep focus in Meontor". You can also add Meontor to Control Center, the Lock Screen or the Action button.'
			},
			{
				q: 'Can I add my own activities and categories?',
				a: 'Yes. Tap + in Quick Capture, or go to Settings, then Activities or Categories.'
			}
		]
	},
	{
		topic: 'The Mentor',
		items: [
			{
				q: 'What does the Mentor write?',
				a: "A short reflection on what your day gave you, a line for each of your roles, one thing worth noticing, and a thought for the day. It reflects; it doesn't grade."
			},
			{
				q: 'Why does a reflection say "Written on device"?',
				a: "That means Apple Intelligence wasn't available, so Meontor wrote it without a language model. It always tells you which one wrote it."
			}
		]
	},
	{
		topic: 'Privacy and data',
		items: [
			{ q: 'Where is my data?', a: 'On your iPhone, and nowhere else. Meontor has no server.' },
			{
				q: 'What does Meontor read from Health?',
				a: 'Sleep, steps, active energy, resting heart rate and workouts, each one once you turn it on, and never before. It never writes to Health.'
			},
			{ q: 'Can I export or erase my data?', a: 'Yes, from Settings, then Privacy.' },
			{
				q: 'What happens if I delete the app?',
				a: "Its data is deleted with it, unless it's in a backup."
			}
		]
	}
];
