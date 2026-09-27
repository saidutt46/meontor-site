<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- Line glyphs in the spirit of SF Symbols. Decoration only: the text beside each carries the meaning. -->
<script lang="ts">
	let { name, class: className = 'size-6' }: { name: string; class?: string } = $props();

	const paths: Record<string, string> = {
		lock: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z',
		sparkles:
			'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3ZM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z',
		'hand-tap':
			'M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4.3 15a1.5 1.5 0 0 1 2.4-1.8L9 15.5',
		mic: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3ZM5 11a7 7 0 0 0 14 0M12 18v3',
		widget: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
		search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.5 15.5 20 20',
		heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
		leaf: 'M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19l7-7',
		mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
		'chevron-down': 'M6 9l6 6 6-6',
		menu: 'M4 7h16M4 12h16M4 17h16',
		close: 'M6 6l12 12M18 6 6 18',
		infinity: 'M7 9a3 3 0 1 0 0 6c2 0 3-1.5 5-3s3-3 5-3a3 3 0 1 1 0 6c-2 0-3-1.5-5-3S9 9 7 9Z',
		scale: 'M12 4v16M5 20h14M6 8h12M6 8l-3 6a3 3 0 0 0 6 0L6 8Zm12 0-3 6a3 3 0 0 0 6 0l-3-6Z',
		timer: 'M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 9v4l2.5 1.5M10 2h4',
		// The example day's activities (the app's SF Symbols, redrawn as lines)
		coffee:
			'M5 8h11v5.5A5.5 5.5 0 0 1 10.5 19h0A5.5 5.5 0 0 1 5 13.5V8ZM16 10h1.5a2.5 2.5 0 0 1 0 5H16M3 21.5h16',
		breakfast: 'M3 17h18M7 17a5 5 0 0 1 10 0M12 7v2M6.3 10.3l1.4 1.4M17.7 10.3l-1.4 1.4M7 20.5h10',
		water: 'M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0c0-4.2 6-10.5 6-10.5Z',
		lunch: 'M7 3v18M4.5 3v4.5a2.5 2.5 0 0 0 5 0V3M17.5 21V3c-2 1-3.5 3.5-3.5 7v3h3.5',
		focus:
			'M11 5.5a2.5 2.5 0 0 0-4.6-1A3 3 0 0 0 4 9a3 3 0 0 0 .5 5.5A3 3 0 0 0 8 19a2.5 2.5 0 0 0 3-.5ZM13 5.5a2.5 2.5 0 0 1 4.6-1A3 3 0 0 1 20 9a3 3 0 0 1-.5 5.5A3 3 0 0 1 16 19a2.5 2.5 0 0 1-3-.5ZM11 5.5v13M13 5.5v13',
		'moon-stars': 'M19.5 14.5A7.5 7.5 0 1 1 9.5 4.5a6 6 0 0 0 10 10ZM17 3v3.5M15.25 4.75h3.5',
		walk: 'M13.5 5.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM9 21.5l2.3-5.5 2.7 2.5v3M8 12.5l2.5-4.5 3.5 1.5 1.5 3 2.5 1M10.5 8l-1.5 7',
		book: 'M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.5.5-8 2ZM12 6.5v14',
		mouth:
			'M3 11.5c2.5-3 5-3.5 9-1.5 4-2 6.5-1.5 9 1.5-2.5 4.5-5.5 6-9 6s-6.5-1.5-9-6ZM3 11.5c4 1.5 14 1.5 18 0',
		bed: 'M3 5v15M3 16h18v4M21 16v-3.5a2.5 2.5 0 0 0-2.5-2.5H11v6M7 13.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z',
		// The times of day under the dial's mark
		sunrise: 'M3 18h18M7 18a5 5 0 0 1 10 0M12 12.5V7M9.5 9.5 12 7l2.5 2.5M6 21h12',
		sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2.5v2M12 19.5v2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M2.5 12h2M19.5 12h2M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4',
		sunset: 'M3 18h18M7 18a5 5 0 0 1 10 0M12 7v5.5M9.5 10 12 12.5l2.5-2.5M6 21h12',
		replay: 'M4 12a8 8 0 1 0 2.4-5.7M4 3.5v4.5h4.5',
		// The Mentor's pattern cards (scope, clock, arrow.uturn.left)
		scope:
			'M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 2v3M12 19v3M2 12h3M19 12h3',
		clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2',
		'came-back': 'M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11'
	};
</script>

<svg
	viewBox="0 0 24 24"
	class={className}
	fill="none"
	stroke="currentColor"
	stroke-width="1.75"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={paths[name]} />
</svg>
