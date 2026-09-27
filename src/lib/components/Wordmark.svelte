<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- The wordmark as outlines of SF Pro Rounded Semibold (DESIGN §9: an image on the web). -->
<script lang="ts">
	import { WORDMARK_PATH, WORDMARK_VIEWBOX } from '$lib/assets/wordmark-path';
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg viewBox={WORDMARK_VIEWBOX} class={className} role="img" aria-label="Meontor">
	<path d={WORDMARK_PATH} fill="currentColor" />
</svg>
