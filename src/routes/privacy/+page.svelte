<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  Every claim here was checked against the app's code on 2026-09-26: no networking
  code; HealthKit toShare: [] with five read types; PrivacyInfo.xcprivacy declares no
  tracking and no collected data; LAContext app lock; Export in Settings, Privacy.
  Re-check before changing a claim.
-->
<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import LegalPage from '$lib/components/LegalPage.svelte';
	import { COMPANY, SUPPORT_EMAIL } from '$lib/constants/app';
</script>

<SeoHead
	title="Privacy Policy · Meontor"
	description="Meontor keeps everything on your iPhone: no account, no server, no tracking. Apple Health is optional, and Meontor never writes to it."
	path="/privacy"
	imageAlt="Meontor privacy policy"
/>

<LegalPage
	title="Privacy Policy"
	intro="Meontor is an iPhone app for logging your day and reflecting on it. It has no account, no server and no tracking. Everything you log stays on your iPhone."
	effective="September 29, 2026"
>
	<section>
		<h2>1. What Meontor keeps, and where</h2>
		<ul>
			<li>
				The activities you log, their times, and any details you add: amounts, notes, ratings.
			</li>
			<li>Your roles, categories and settings, and the reflections the Mentor writes.</li>
		</ul>
		<p>
			All of it is stored on your iPhone, in storage shared by the app and its widgets. It is not
			sent to us or to anyone else. Meontor contains no code that sends it over the internet.
		</p>
	</section>

	<section>
		<h2>2. What we collect</h2>
		<p>
			Nothing. We have no server to send it to. We don't collect names, email addresses,
			identifiers, usage data or location.
		</p>
	</section>

	<section>
		<h2>3. Apple Intelligence</h2>
		<p>
			The Mentor's reflections and thoughts are written by Apple Intelligence on your iPhone, from a
			summary of your day. They are not sent to any AI service. If Apple Intelligence isn't
			available, Meontor writes them on device without it, and says so. Habits and symptoms (such as
			smoking, alcohol, betting or headaches) are never shown to a language model, not even Apple's
			on-device one: the Mentor states them plainly itself.
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
			<strong>Meontor never writes to Health.</strong> Health data is used to reflect on your day inside
			the app. It never leaves your iPhone and is never used for advertising. You can turn access off
			at any time in Meontor's Settings or in the Health app.
		</p>
	</section>

	<section>
		<h2>5. Siri, widgets, Controls and Live Activities</h2>
		<p>
			These are handled by iOS on your iPhone. Requests you make to Siri are processed by Apple
			under Apple's own privacy policy.
		</p>
	</section>

	<section>
		<h2>6. App lock</h2>
		<p>
			App lock is optional. Face ID or your passcode is checked by iOS, and Meontor never sees your
			biometric data.
		</p>
	</section>

	<section>
		<h2>7. Analytics, advertising and tracking</h2>
		<p>
			None. Meontor has no analytics, advertising or third-party code, and it does not track you
			across apps or websites. If you choose to share analytics with app developers in your iPhone's
			settings, Apple may share crash reports with us.
		</p>
	</section>

	<section>
		<h2>8. Your control</h2>
		<p>
			You can export everything or erase everything from Settings, then Privacy, in the app.
			Deleting the app deletes its data. Backups follow your iCloud or computer backup settings, as
			they do for any app.
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
