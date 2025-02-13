<script lang="ts">
	let { type, content }: { type: 'user' | 'bot'; content: string } = $props();
	let isUser: boolean = $derived(type === 'user');

	let bubbleClasses: string = $derived(
		isUser
			? 'ml-auto bg-primary text-white rounded-tr-none'
			: 'bg-white text-primary rounded-tl-none'
	);
</script>

<article class="mb-4 {isUser ? 'ml-auto max-w-[60%]' : 'mr-auto max-w-[80%]'}">
	<div
		class="border-opacity-10 rounded-2xl border p-4 shadow-lg transition-all duration-200 hover:shadow-xl
      {bubbleClasses}"
	>
		<p class="text-sm" class:prose-invert={isUser}>
			{@html content}
		</p>
	</div>
</article>

<style>
	:global(.prose-invert strong) {
		color: white;
	}
</style>
