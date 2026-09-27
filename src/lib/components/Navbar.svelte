<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import { page } from '$app/state';
	import Mark from './Mark.svelte';
	import Wordmark from './Wordmark.svelte';
	import Icon from './Icon.svelte';

	const links = [
		{ href: '/#features', label: 'Features' },
		{ href: '/support', label: 'Support' },
		{ href: '/privacy', label: 'Privacy' }
	];
	let open = $state(false);
	const isCurrent = (href: string) => page.url.pathname === href;
</script>

<header class="nav fixed inset-x-0 top-0 z-50 border-b border-separator">
	<nav class="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
		<a href="/" class="flex items-center gap-2 text-label" onclick={() => (open = false)}>
			<span class="text-accent"><Mark size={26} /></span>
			<Wordmark class="h-[18px]" />
		</a>
		<ul class="hidden items-center gap-8 text-sm sm:flex">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						class="transition-colors hover:text-label {isCurrent(link.href)
							? 'text-label'
							: 'text-label-2'}"
						aria-current={isCurrent(link.href) ? 'page' : undefined}>{link.label}</a
					>
				</li>
			{/each}
		</ul>
		<button
			class="-mr-2 p-2 text-label sm:hidden"
			aria-expanded={open}
			aria-controls="mobile-menu"
			aria-label={open ? 'Close menu' : 'Open menu'}
			onclick={() => (open = !open)}
		>
			<Icon name={open ? 'close' : 'menu'} class="size-6" />
		</button>
	</nav>
	{#if open}
		<ul id="mobile-menu" class="border-t border-separator bg-canvas px-5 pb-4 sm:hidden">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						class="block border-b border-separator py-3 text-lg text-label"
						onclick={() => (open = false)}>{link.label}</a
					>
				</li>
			{/each}
		</ul>
	{/if}
</header>

<style>
	/* The one functional layer on the page, so the one translucent surface (DESIGN §12). */
	.nav {
		background: color-mix(in srgb, var(--canvas) 80%, transparent);
		backdrop-filter: saturate(180%) blur(20px);
		-webkit-backdrop-filter: saturate(180%) blur(20px);
	}
</style>
