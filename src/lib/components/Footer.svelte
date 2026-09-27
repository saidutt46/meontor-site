<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import Mark from './Mark.svelte';
	import Wordmark from './Wordmark.svelte';
	import { COMPANY, SUPPORT_EMAIL } from '$lib/constants/app';

	const links = [
		{ href: '/support', label: 'Support' },
		{ href: '/privacy', label: 'Privacy' },
		{ href: '/terms', label: 'Terms' },
		{ href: `mailto:${SUPPORT_EMAIL}`, label: 'Email' }
	];
</script>

<footer class="bg-grouped">
	<div class="mx-auto max-w-6xl px-5 py-14">
		<div class="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<a href="/" class="flex items-center gap-2 text-label">
					<span class="text-accent"><Mark size={28} /></span>
					<Wordmark class="h-5" />
				</a>
				<p class="mt-3 text-sm text-label-2">Moment + Mentor.</p>
			</div>
			<ul class="flex flex-wrap gap-x-8 gap-y-3 text-sm">
				{#each links as link (link.href)}
					<li><a href={link.href} class="text-label-2 hover:text-label">{link.label}</a></li>
				{/each}
			</ul>
		</div>
		<div class="mt-12 space-y-2 border-t border-separator pt-6 text-xs text-label-3">
			<p>© 2026 {COMPANY}.</p>
			<p>Apple, iPhone, Siri and Apple Intelligence are trademarks of Apple Inc.</p>
		</div>
	</div>
</footer>
