<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- An app screenshot with its dark-mode twin, chosen by the viewer's own setting. -->
<script lang="ts">
	let { name, alt, eager = false }: { name: string; alt: string; eager?: boolean } = $props();
</script>

<picture>
	<source srcset="/images/screens/{name}-dark.webp" media="(prefers-color-scheme: dark)" />
	<img
		src="/images/screens/{name}-light.webp"
		{alt}
		width="780"
		height="1696"
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : undefined}
		decoding="async"
	/>
</picture>
