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
				a: "An iPhone or iPad running iOS 26 or later. Apple Intelligence is optional. When it is on, it writes the day's thought and one sentence in a finding's details. Without it, Meontor shows lines of its own."
			},
			{ q: 'Is there an account?', a: 'No. There is no sign-in anywhere in the app.' },
			{
				q: 'Will Meontor send me notifications?',
				a: 'If you want them, there are five kinds. A question each evening, which you can answer from the notification or in the app. A short recap on the last evening of your week. A gentle check-in in a part of the day you usually log. A note when the Mentor finds something new. And now and then, a question about how Meontor is going. There are never more than two a day. Each kind has its own switch in Settings, then Notifications. They are planned on your device; there is no server.'
			},
			{
				q: 'How do I add the widget?',
				a: 'Touch and hold your Home Screen, tap Edit, then Add Widget, and choose Meontor. The small size offers one suggestion. The medium shows your day so far and three suggestions. The large adds the last thing you logged, six suggestions and a thought.'
			}
		]
	},
	{
		topic: 'Logging',
		items: [
			{
				q: 'How does Meontor choose what to suggest?',
				a: 'It learns from your own days: what you tend to log at this time, on this day of the week, and what usually follows. It all happens on your device.'
			},
			{
				q: 'I logged something at the wrong time. Can I fix it?',
				a: 'Yes. On the Timeline, swipe right to edit an entry or left to delete it. On the Now screen, tap its tag twice to edit it, or touch and hold for Edit and Delete. Delete offers Undo.'
			},
			{
				q: 'Can I use Siri?',
				a: 'Yes. Try "Log coffee in Meontor" or "Start deep focus in Meontor". You can also add Meontor to Control Center, the Lock Screen or the Action button.'
			},
			{
				q: 'What details can I add?',
				a: 'How many glasses, the calories in a meal, what kind of coffee, a note, or a measure like your weight. Rate your mood, energy or sleep with a face. Set an activity to ask every time.'
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
				q: 'What does the Mentor do?',
				a: "The Mentor looks across your weeks and shows what one day cannot: your usual times, what has changed, and what your best days have in common. Each pattern it shows is a finding. A finding's card can show a chart of the days it rests on, and a tap opens more about it. When it is not sure, it shows nothing."
			},
			{
				q: 'Why does the Mentor show nothing yet?',
				a: 'A pattern needs enough days to be real. After about a week of logging, it can show your usual times. After about three weeks of rating your days with a face, it can show what your good days share. If you turn on Apple Health, it can start on your sleep and steps from the first day.'
			},
			{
				q: 'Can I hide a finding?',
				a: 'Yes. Tap the thumbs-down, say why, and it does not come back. Touch and hold a card for Show less like this. That kind of finding then stays out of the New section, and nothing is hidden. You can undo either from the message at the bottom of the screen.'
			},
			{
				q: 'Can I look back at earlier days?',
				a: 'Yes, in the Timeline. The Mentor looks across weeks rather than at one date. It also writes a short recap of each week, and the last four weeks stay under Recaps.'
			},
			{
				q: 'Does the Mentor use AI?',
				a: "Not to find patterns: Meontor does that itself, with fixed rules. With Apple Intelligence on, Apple's on-device model writes two small things. One is the day's thought, from the time of day and your tone. The other is one sentence in a finding's details, from your tone, a general line of ours and that finding's own facts. Those facts can name other activities and give sleep and step figures from Apple Health. Nothing is sent to any AI service. Activities in Habits and a set of symptoms, such as headaches, are kept away from the model. Without Apple Intelligence, Meontor shows lines of its own."
			},
			{
				q: 'Does the Mentor judge my days?',
				a: 'No. It never compares you with other people, and it never points out a decline. When it talks about change, it talks about things that are new, came back, moved earlier or later, or set a record.'
			}
		]
	},
	{
		topic: 'Privacy and data',
		items: [
			{
				q: 'Where is my data?',
				a: 'On your device. Meontor has no server and no sync, so your iPhone and iPad each keep their own log. Your device backups can include it, and a file you export goes where you put it.'
			},
			{
				q: 'What does Meontor read from Health?',
				a: 'Sleep, steps, active energy, resting heart rate and workouts, each one once you turn it on, and never before. When you turn a metric on, it reads the last 90 days. It never writes to Health.'
			},
			{
				q: 'Can I export or erase my data?',
				a: "Yes, from Settings, then Privacy. Export saves your activities and each entry's time, value, note and where you logged it, as a JSON file you choose where to keep. It leaves out Apple Health data, roles, categories, settings, marks on findings, and details such as calories or what kind of coffee. Erase everything removes your entries, roles, categories and anything copied from Health. It then restores the starting activities. Settings such as your tone stay. A saved copy of the Mentor's latest findings can stay until the app next works them out."
			},
			{
				q: 'Can I lock Meontor?',
				a: "Yes. Turn on Require Face ID (or Touch ID, or your passcode) in Settings, then Privacy. While it's locked, the app shows nothing of your log, not even in the app switcher. Widgets, Live Activities and notifications are outside the lock."
			},
			{
				q: 'What happens if I delete the app?',
				a: 'Its data is deleted from that device. A backup, or a file you exported, keeps its own copy.'
			}
		]
	}
];
