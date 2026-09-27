<!--
  Copyright (c) 2026 Daivat Creations
  All rights reserved.

  This source code is private property. Unauthorized copying of this file, via any medium is strictly prohibited.
  Proprietary and confidential.
-->
<!--
  A CSS iPhone outline sized by its own width. Radii and the Dynamic Island are in
  container units, so the frame keeps its proportions at any size.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { width = 'min(300px, 72vw)', children }: { width?: string; children: Snippet } = $props();
</script>

<div class="frame" style:width>
	<div class="phone">
		<div class="screen">{@render children()}</div>
		<div class="island" aria-hidden="true"></div>
	</div>
</div>

<style>
	.frame {
		container-type: inline-size;
		flex-shrink: 0;
	}
	.phone {
		position: relative;
		padding: 3.4cqw;
		border-radius: 17cqw;
		background: #1a1a1c;
		box-shadow:
			inset 0 0 0 1.2px #4a4a4e,
			0 30px 60px -20px rgb(0 0 0 / 0.35),
			0 18px 36px -18px rgb(0 0 0 / 0.3);
	}
	.screen {
		aspect-ratio: 780 / 1696;
		border-radius: 13.6cqw;
		overflow: hidden;
		background: #000;
	}
	.screen :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.island {
		position: absolute;
		top: 6.3cqw;
		left: 50%;
		width: 30cqw;
		height: 8.8cqw;
		transform: translateX(-50%);
		border-radius: 999px;
		background: #000;
	}
</style>
