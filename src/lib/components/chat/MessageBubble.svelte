<script lang="ts">
	import { marked } from 'marked'; // Necesitas instalar: npm i marked

	let { type, content }: { type: 'user' | 'bot'; content: string } = $props();
	let isUser: boolean = $derived(type === 'user');
	let parsedContent = $derived(marked(content));

	let bubbleClasses: string = $derived(
		isUser
			? 'ml-auto bg-primary text-white rounded-tr-none'
			: 'bg-white text-primary rounded-tl-none'
	);
</script>

<article class="mb-4 max-w-[60%] {isUser ? 'ml-auto' : 'mr-auto'}">
	<div
		class="border-opacity-10 rounded-2xl border p-4 shadow-lg transition-all duration-200 hover:shadow-xl
      {bubbleClasses}"
	>
		<p class="text-sm" class:prose-invert={isUser}>
			{@html parsedContent}
		</p>
	</div>
</article>

<style>
	:global(.prose-invert strong) {
		color: white;
	}
</style>
