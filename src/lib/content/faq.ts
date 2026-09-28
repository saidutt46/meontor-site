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
				q: 'Will Meontor send me notifications?',
				a: 'If you want them: an evening note with a question for tonight, your week on its last evening, and at most one gentle check-in a day, in a part of the day you usually log. Never more than two a day, and each kind can be switched off in Settings. They are planned on your iPhone; there is no server.'
			},
			{
				q: 'How do I add the widget?',
				a: 'Touch and hold your Home Screen, tap Edit, then Add Widget, and choose Meontor. The medium size shows your day so far and three suggestions; the large adds the last thing you logged, six suggestions and a thought.'
			}
		]
	},
	{
		topic: 'Logging',
		items: [
			{
				q: 'How does Meontor choose what to suggest?',
				a: 'It learns from your own days: what you tend to log at this time, on this day of the week, and what usually follows. The more you log, the better it fits. It all happens on your iPhone.'
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
				a: "The shape of your day, drawn on a single line and put into words; what each of your roles held; something worth noticing; and a thought. At the bottom, how today sits in your recent weeks. Each week it adds what has held across the last four. You can look back at any day or week. It reflects; it doesn't grade."
			},
			{
				q: 'Why does a reflection say "Written on device"?',
				a: "It means no line on the page came from Apple Intelligence: it wasn't available, or what it wrote didn't pass Meontor's checks against your log. The Apple Intelligence button beside the date always tells you which."
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
