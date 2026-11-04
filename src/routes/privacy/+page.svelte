<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  Every changed sentence here was checked against the app's code at main 7c8baae on 2026-11-03;
  the rest at f1505c4 (build 20), with the diff between them read. No networking code, CloudKit
  or third-party package; HealthKit toShare: [] with three read types (HealthReader.swift),
  90 days on turning a metric on and a 7-day window after (HealthSync.swift historyDays,
  windowDays; disable() deletes a metric's records; removeRetiredMetrics deletes what older
  installs kept); the on-device model gets the day phase and tone for a thought
  (FoundationModelsMentor.swift), and a finding's line and facts for its note
  (MentorInstructions.findingNotePrompt, FindingNoteWriter.swift, FindingNoteLine.swift), which
  can hold sleep and step figures; Withheld and SeedCatalog.privateKeys keep Habits, a set of
  symptoms and four starting activities out. Export: DataExport.swift (Gift is five fixed
  choices). Erase: StoreReset.swift, PrivacyView.swift (erase(), MentorDiagnostics.clearAll),
  MentorHeadline.swift (the key), NotificationPreferences.forgetLog. Re-check before changing a
  claim.
-->
<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import LegalPage from '$lib/components/LegalPage.svelte';
	import { COMPANY, SUPPORT_EMAIL } from '$lib/constants/app';
</script>

<SeoHead
	title="Privacy Policy · Meontor"
	description="Meontor stores your log on your device: no account, no server, no tracking. Apple Health is optional, and Meontor never writes to it."
	path="/privacy"
	imageAlt="Meontor privacy policy"
/>

<LegalPage
	title="Privacy Policy"
	intro="Meontor is an app for iPhone and iPad for logging your day and seeing the patterns in it. It has no account, no server and no tracking. What you log is stored on your device, and Meontor sends none of it anywhere."
	effective="November 3, 2026"
>
	<section>
		<h2>1. What Meontor keeps, and where</h2>
		<ul>
			<li>
				The activities you log, their times, and any details you add: amounts, notes, ratings and
				your answers to the evening question.
			</li>
			<li>Your activities, roles, categories and settings.</li>
			<li>If you turn on Apple Health, a copy of the readings you chose (see section 4).</li>
			<li>
				What the app works out from your log: statistics for its suggestions and a saved copy of
				what the widget and the Now screen show.
			</li>
			<li>The day's thoughts, which do not come from your log.</li>
			<li>
				A saved copy of the Mentor's latest findings, and a short record of the findings a
				notification has told you about. Erase everything removes both, as section 8 says.
			</li>
			<li>
				When a line from Apple's on-device model is not used, a short reason why, as section 3 says.
			</li>
			<li>
				Which findings you have seen or hidden in the Mentor, with any reason you gave. The Mentor
				is the part of the app that shows patterns in your log. Each pattern is a finding.
			</li>
		</ul>
		<p>
			All of it is stored on your device, mostly in storage shared by the app and its widgets. It is
			not sent to us or to anyone else. Meontor contains no code that sends it over the internet,
			and it has no sync: your iPhone and iPad each keep their own log. If you export your data, the
			file goes where you choose to put it.
		</p>
	</section>

	<section>
		<h2>2. What we collect</h2>
		<p>
			The app collects nothing. We have no server to send it to. We don't collect names, email
			addresses, identifiers, usage data or location.
		</p>
		<p>
			The one exception in the app is a message you choose to send. Now and then the app may ask how
			Meontor is going. It asks at most once every 30 days, and never in your first two weeks. This
			is one of its notifications, and you can switch it off like the rest.
		</p>
		<p>
			Send by email opens your email app with a message to us. It holds your rating, your words and
			the app's version. You read it and send it yourself; the app sends nothing on its own.
		</p>
		<p>
			If you write to us, from the app or otherwise, we receive your message and your email address.
			We use them to reply and to improve Meontor, and for nothing else.
		</p>
		<p>Section 7 covers crash reports, and section 9 covers this website.</p>
	</section>

	<section>
		<h2>3. Apple Intelligence</h2>
		<p>
			Meontor finds patterns in your log itself, with fixed rules in the app. It does not use a
			language model for that. On a device with Apple Intelligence turned on, Apple's on-device
			model writes two small things. Neither is sent to any AI service.
		</p>
		<ul>
			<li>
				The day's thought, on the Now screen and the widget. The model is given the time of day and
				your chosen tone, and nothing from your log.
			</li>
			<li>
				One sentence in a finding's details, when you open them. The note says "Written on device"
				when the model wrote that sentence. The model is given your chosen tone and a general line
				written by us. It also gets that finding's line and the short facts under it. These facts
				can name the activity, in your own words if you made it. They can say how often it happens
				and its usual time and length. They can say when you first logged it and how many times in
				all. They can name other activities that fall on the same days, such as the days you rated
				well or a certain weekday. They can also give sleep and step figures from Apple Health. Your
				notes are not included. The sentence is held in memory and not saved.
			</li>
		</ul>
		<p>
			If Apple Intelligence is off or unavailable, Meontor shows a line of its own instead. It does
			the same if the model times out, errors or writes a line that does not pass the app's checks.
			The app then keeps a short reason on your device. The reason can name an activity or quote a
			few words of the line. It stays until it is replaced or you erase your data. Settings shows
			whether Apple Intelligence is on.
		</p>
		<p>
			A set of activities is kept away from the model: everything in the Habits category, such as
			smoking, alcohol and betting; a set of symptoms, such as headaches; and the starting
			activities Pain, Stress, Medication and Therapy. An activity you make yourself is kept away
			too if you put it in Habits.
		</p>
		<p>
			These activities are never named in a finding, a weekly recap, a finding notification or a
			check-in button, and the widget's line about the last thing you logged leaves them out.
		</p>
		<p>
			Their names can still show in two ways. Pain, Stress, Medication and Therapy can be suggested
			to you, so their names can show on a suggestion in the app, on a widget or on a Control. If
			you pin an activity from the list above, it can be suggested too. And if you start a stretch
			of any activity, its name shows on the widget and the Lock Screen while the stretch runs.
		</p>
	</section>

	<section>
		<h2>4. Apple Health</h2>
		<p>
			Connecting Apple Health is optional, and nothing is read until you turn it on, one metric at a
			time. Meontor can read:
		</p>
		<ul>
			<li>Sleep</li>
			<li>Steps</li>
			<li>Workouts</li>
		</ul>
		<p>
			Sleep and steps show on the Now screen and in your weekly recap, and the Mentor can notice
			them. Workouts show in the Timeline.
		</p>
		<p>
			When you turn a metric on, Meontor reads its last 90 days. After that, it reads the latest
			week when you open the app, at most every 30 minutes. It keeps a copy of these readings on
			your device.
		</p>
		<p>
			<strong>Meontor never writes to Health.</strong> Meontor never sends Health data anywhere and never
			uses it for advertising. Exports leave it out. Sleep and step figures can reach Apple's on-device
			model, as section 3 says. The copy can also be part of your device's backups, as section 8 says.
		</p>
		<p>
			You can turn a metric off at any time in Meontor's Settings, which also deletes the copy of
			it. Erase everything deletes it too. Removing Meontor's access in the Health app stops new
			readings, but older readings stay on your device until you do one of those.
		</p>
	</section>

	<section>
		<h2>5. Siri, widgets, Controls, Live Activities and notifications</h2>
		<p>
			These are handled by iOS on your device. They can show parts of your log on the Home Screen
			and Lock Screen. Anyone holding your device can see them there. Notifications are planned on
			your device, with no server. Requests you make to Siri are processed by Apple under Apple's
			own privacy policy.
		</p>
	</section>

	<section>
		<h2>6. App lock</h2>
		<p>
			App lock is optional. Face ID, Touch ID or your passcode is checked by iOS, and Meontor never
			sees your biometric data. While it is locked, the app shows nothing of your log, not even in
			the app switcher. The lock covers the app: widgets, Live Activities and notifications are
			outside it. If your device has no passcode set, the app opens normally.
		</p>
	</section>

	<section>
		<h2>7. Analytics, advertising and tracking</h2>
		<p>
			None. Meontor has no analytics, advertising or third-party code, and it does not track you
			across apps or websites. If you choose to share analytics with app developers in your device's
			settings, Apple may share crash reports with us.
		</p>
	</section>

	<section>
		<h2>8. Your control</h2>
		<p>
			You can export your data as a JSON file, or erase it, from Settings, then Privacy, in the app.
		</p>
		<p>The export holds:</p>
		<ul>
			<li>
				Your entries, with their times, values, notes and where you logged them, and details such as
				calories or what kind of coffee.
			</li>
			<li>Your activities and their settings, such as units and favourites.</li>
			<li>
				Your categories, with their colour and what time in them gives you, one of a few set
				choices.
			</li>
			<li>Your roles.</li>
		</ul>
		<p>The export leaves out:</p>
		<ul>
			<li>Apple Health data and your marks on findings.</li>
			<li>
				The day's thoughts, and what the app works out from your log, such as statistics and
				findings.
			</li>
			<li>The app's own settings, such as tone, app lock and notifications.</li>
		</ul>
		<p>Erase everything removes:</p>
		<ul>
			<li>Every entry, and the roles, categories and activities you made.</li>
			<li>Your favourites, your marks on findings and anything copied from Health.</li>
			<li>The day's thoughts and the app's statistics.</li>
			<li>The saved copy of the Mentor's latest findings.</li>
			<li>The record of findings a notification has told you about.</li>
			<li>The short reasons from section 3.</li>
			<li>Notifications waiting or already delivered.</li>
		</ul>
		<p>
			It then restores the starting set of activities, categories and roles, and reloads widgets and
			Controls.
		</p>
		<p>Erase everything keeps:</p>
		<ul>
			<li>Settings such as your tone and your notification switches.</li>
			<li>
				Which Health metrics are on. So Health readings return on the next read, unless you turn
				those metrics off, and notifications are planned again from the empty log.
			</li>
		</ul>
		<p>
			Deleting the app deletes its data from that device. Backups follow your iCloud or computer
			backup settings, as they do for any app. So a backup can hold your log and the copy of your
			Health readings, and a backup made earlier keeps its copy after you erase.
		</p>
	</section>

	<section>
		<h2>9. This website</h2>
		<p>
			This website sets no cookies and loads nothing from other companies. It counts page views with
			Vercel Web Analytics. This runs from this site's own address, uses no cookies and does not
			identify you. Our host, Vercel, may keep standard server logs, such as IP addresses, for
			security.
		</p>
	</section>

	<section>
		<h2>10. Children</h2>
		<p>Meontor is not directed at children under 13, and the app collects nothing from anyone.</p>
	</section>

	<section>
		<h2>11. Changes</h2>
		<p>If this policy changes, we'll update it here and change the effective date.</p>
	</section>

	<section>
		<h2>12. Contact</h2>
		<p>Meontor is made by {COMPANY}. For questions about privacy, write to us:</p>
		<p><a href="mailto:{SUPPORT_EMAIL}">{SUPPORT_EMAIL}</a></p>
	</section>
</LegalPage>
