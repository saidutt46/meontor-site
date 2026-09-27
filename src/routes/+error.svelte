<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<script lang="ts">
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
</script>

<SeoHead
	title={page.status === 404 ? 'Not found · Meontor' : 'Something went wrong · Meontor'}
	description="Go back to Meontor."
	path={page.url.pathname}
	noindex
/>

<ErrorMessage status={page.status} />
