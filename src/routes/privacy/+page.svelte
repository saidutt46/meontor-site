<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  Every sentence here was checked against the app's code at main f1505c4 (build 20) on
  2026-11-03; the proof table is in .orchestration/runs/20261104T020204Z-report.md.
  No networking code, CloudKit or third-party package; HealthKit toShare: [] with five
  read types, 90 days on turning a metric on (HealthSync.historyDays); the on-device model
  gets the day phase and tone for a thought (FoundationModelsMentor.swift), and a finding's
  line and facts for its note (MentorInstructions.findingNotePrompt, FindingNoteLine.swift),
  which can hold sleep and step figures; Withheld keeps Habits and a set of symptoms out.
  Export is activities, events and spans (PrivacyView.swift). Re-check before changing a claim.
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
				What the app works out from your log: statistics for its suggestions, the day's thoughts, a
				saved copy of what the widget and Now show, and which Mentor findings you have seen or
				hidden, with any reason you gave.
			</li>
		</ul>
		<p>
			All of it is stored on your device, in storage shared by the app and its widgets. It is not
			sent to us or to anyone else. Meontor contains no code that sends it over the internet, and it
			has no sync: your iPhone and iPad each keep their own log. If you export your data, the file
			goes where you choose to put it.
		</p>
	</section>

	<section>
		<h2>2. What we collect</h2>
		<p>
			Nothing. We have no server to send it to. We don't collect names, email addresses,
			identifiers, usage data or location.
		</p>
		<p>
			The one exception is a message you choose to send. Now and then, at most once every 30 days
			and never in your first two weeks, the app may ask how Meontor is going; this is one of its
			notifications, and you can switch it off like the rest. Send by email opens your email app
			with a message to us that holds your rating, your words and the app's version. You read it and
			send it yourself; the app sends nothing on its own. If you write to us, from the app or
			otherwise, we receive your message and your email address, and use them to reply and for
			nothing else.
		</p>
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
				The day's thought, on Now and the widget. The model is given the time of day and your chosen
				tone, and nothing from your log.
			</li>
			<li>
				One sentence in a finding's details, when you open them. The model is given that finding's
				line and the short facts under it. These can include the activity's name, in your own words
				if you made it, its usual time and length, how many days it held, other activities on your
				best-rated days, and sleep and step figures from Apple Health. Your notes are not included.
				The sentence is held in memory and not saved.
			</li>
		</ul>
		<p>
			If Apple Intelligence is off or unavailable, or its line does not pass the app's checks,
			Meontor shows a line of its own instead. Settings shows whether Apple Intelligence is on.
		</p>
		<p>
			A set of activities is kept away from the model: everything in the Habits category, such as
			smoking, alcohol and betting, and a set of symptoms, such as headaches. An activity you make
			yourself is kept away too if you put it in Habits.
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
			<li>Active energy</li>
			<li>Resting heart rate</li>
			<li>Workouts</li>
		</ul>
		<p>
			When you turn a metric on, Meontor reads its last 90 days. After that, it reads the latest
			week when you open the app, at most every 30 minutes. It keeps a copy of these readings on
			your device.
		</p>
		<p>
			<strong>Meontor never writes to Health.</strong> It uses Health data to show your readings and find
			patterns inside the app. Meontor never sends Health data anywhere and never uses it for advertising.
			Exports leave it out. Sleep and step figures can reach Apple's on-device model, as section 3 says,
			and the copy can be part of your device's backups, as section 8 says.
		</p>
		<p>
			You can turn a metric off at any time in Meontor's Settings, which also deletes the copy of
			it. You can also remove Meontor's access in the Health app.
		</p>
	</section>

	<section>
		<h2>5. Siri, widgets, Controls, Live Activities and notifications</h2>
		<p>
			These are handled by iOS on your device. They can show parts of your log on the Home Screen
			and Lock Screen, where anyone holding your device can see them. Notifications are planned on
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
			You can export your activities and entries as a JSON file, or erase your data, from Settings,
			then Privacy, in the app. The export leaves out Apple Health data, roles and categories.
		</p>
		<p>
			Erase everything removes every entry, your roles and categories, your marks on findings and
			anything copied from Health, then restores the starting set of activities. It keeps settings
			such as your tone and which Health metrics are on, so Health readings return on the next read
			unless you turn those metrics off.
		</p>
		<p>
			Deleting the app deletes its data from that device. Backups follow your iCloud or computer
			backup settings, as they do for any app, so a backup can hold your log and the copy of your
			Health readings.
		</p>
	</section>

	<section>
		<h2>9. This website</h2>
		<p>
			This website sets no cookies and loads nothing from other companies. It counts page views with
			Vercel Web Analytics, which runs from this site's own address, uses no cookies and does not
			identify you. Our host, Vercel, may keep standard server logs, such as IP addresses, for
			security.
		</p>
	</section>

	<section>
		<h2>10. Children</h2>
		<p>Meontor is not directed at children under 13, and it collects nothing from anyone.</p>
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
