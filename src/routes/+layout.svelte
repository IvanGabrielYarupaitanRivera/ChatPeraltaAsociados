<script lang="ts">
	import FooterChat from '$lib/components/chat/FooterChat.svelte';
	import GridPatternChat from '$lib/components/chat/GridPatternChat.svelte';
	import HeaderChat from '$lib/components/chat/HeaderChat.svelte';

	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<HeaderChat />

	<main class="relative flex-1 flex-col py-4">
		<GridPatternChat />

		{@render children()}
	</main>

	<FooterChat />
</div>
