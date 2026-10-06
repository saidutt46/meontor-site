<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- Ported from Oareo's terms (same publisher), with a not-medical-advice section in place of survey accuracy. -->
<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import LegalPage from '$lib/components/LegalPage.svelte';
	import { SUPPORT_EMAIL } from '$lib/constants/app';
</script>

<SeoHead
	title="Terms of Use · Meontor"
	description="The terms for using Meontor, a free app for iPhone and iPad for logging your day and reflecting on it."
	path="/terms"
	imageAlt="Meontor terms of use"
/>

<LegalPage
	title="Terms of Use"
	intro="These terms cover your use of Meontor. They're written to be read, and they sit alongside Apple's own terms for apps from the App Store."
	effective="September 26, 2026"
>
	<section>
		<h2>1. About Meontor</h2>
		<p>
			Meontor is a free app for iPhone and iPad for logging your day and reflecting on it, published
			by Daivat Creations. It is provided at no cost and does not require an account.
		</p>
	</section>

	<section>
		<h2>2. License Grant</h2>
		<p>
			Subject to these terms, Daivat Creations grants you a limited, non-exclusive,
			non-transferable, revocable license to download and use Meontor on any Apple device you own or
			control, as permitted by the Apple App Store Terms of Service.
		</p>
	</section>

	<section>
		<h2>3. Your Content</h2>
		<p>
			What you log in Meontor is yours. It stays on your device, and we have no access to it.
			Meontor claims no rights to your content, and you are responsible for what you record, export
			and share.
		</p>
	</section>

	<section>
		<h2>4. Acceptable Use</h2>
		<p>When using Meontor, you agree not to:</p>
		<ul>
			<li>Use the app for any unlawful purpose, or to violate the rights of others.</li>
			<li>Reverse-engineer, decompile, or attempt to extract the source code of the app.</li>
			<li>Interfere with or disrupt the integrity or performance of the app.</li>
		</ul>
	</section>

	<section>
		<h2>5. Not Medical Advice</h2>
		<p>
			<strong
				>Meontor's reflections, figures and Health readings are for your own reflection. They are
				not medical, psychological or professional advice.</strong
			>
			Talk to a qualified professional about your health, and don't rely on the app in an emergency.
		</p>
	</section>

	<section>
		<h2>6. Intellectual Property</h2>
		<p>
			The Meontor app, website, name, mark and all associated intellectual property are owned by
			Daivat Creations. These terms do not grant you any rights to use the Meontor name, mark or
			branding except as needed to use the app as intended.
		</p>
	</section>

	<section>
		<h2>7. No Warranty</h2>
		<p>
			Meontor is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties
			of any kind, whether express, implied, or statutory, including but not limited to implied warranties
			of merchantability, fitness for a particular purpose, and non-infringement.
		</p>
		<p>
			We do not warrant that the app will be uninterrupted, error-free, or free of harmful
			components, or that its suggestions, figures or reflections will be accurate or complete.
		</p>
	</section>

	<section>
		<h2>8. Limitation of Liability</h2>
		<p>
			To the maximum extent permitted by applicable law, Daivat Creations and its developers shall
			not be liable for any indirect, incidental, special, consequential, or punitive damages,
			including but not limited to loss of data, loss of profits, or damages arising from reliance
			on the app, regardless of the cause of action or the theory of liability.
		</p>
		<p>
			Since Meontor is provided free of charge, our total aggregate liability for any claim arising
			from or related to the use of Meontor shall not exceed zero dollars ($0.00 USD).
		</p>
	</section>

	<section>
		<h2>9. Indemnification</h2>
		<p>
			You agree to indemnify and hold harmless Daivat Creations and its developers from any claims,
			damages, losses, or expenses (including reasonable legal fees) arising from your use of
			Meontor, your violation of these terms, or your violation of any rights of a third party.
		</p>
	</section>

	<section>
		<h2>10. Third-Party Platforms</h2>
		<p>
			Meontor is distributed through the Apple App Store and relies on Apple platform features,
			including Apple Intelligence, Apple Health, Siri and WidgetKit. Your use of the app is also
			subject to
			<a
				href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
				target="_blank"
				rel="noopener noreferrer">Apple's Licensed Application End User License Agreement</a
			>.
		</p>
	</section>

	<section>
		<h2>11. Termination</h2>
		<p>
			You may stop using Meontor at any time by deleting the app from your device. We reserve the
			right to modify, suspend, or discontinue the app at any time without notice. These terms
			remain in effect for as long as you use Meontor.
		</p>
	</section>

	<section>
		<h2>12. Governing Law</h2>
		<p>
			These terms shall be governed by and construed in accordance with the laws of the State of
			California, United States, without regard to its conflict of law provisions.
		</p>
	</section>

	<section>
		<h2>13. Severability</h2>
		<p>
			If any provision of these terms is found to be unenforceable or invalid, that provision will
			be limited or eliminated to the minimum extent necessary, and the remaining provisions will
			remain in full force and effect.
		</p>
	</section>

	<section>
		<h2>14. Changes to These Terms</h2>
		<p>
			We may update these terms from time to time. When we do, we will revise the effective date at
			the top of this page. Continued use of Meontor after changes are posted constitutes your
			acceptance of the revised terms.
		</p>
	</section>

	<section>
		<h2>15. Contact</h2>
		<p>If you have questions about these terms, contact us at:</p>
		<p><a href="mailto:{SUPPORT_EMAIL}">{SUPPORT_EMAIL}</a></p>
	</section>
</LegalPage>
