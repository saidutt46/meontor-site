<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!-- The App Store call to action: a quiet, inert pill until the app is on the store. -->
<script lang="ts">
	import { APP_STORE_URL } from '$lib/constants/app';
</script>

{#if APP_STORE_URL}
	<a
		href={APP_STORE_URL}
		class="inline-flex h-12 items-center rounded-full bg-label px-7 font-medium text-canvas transition-opacity hover:opacity-85"
		>Download on the App Store</a
	>
{:else}
	<span
		class="inline-flex h-12 items-center rounded-full bg-label px-7 font-medium text-canvas"
		aria-disabled="true">Coming soon to the App Store</span
	>
{/if}
