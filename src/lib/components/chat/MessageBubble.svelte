<script lang="ts">
	let { type, content }: { type: 'user' | 'bot'; content: string } = $props();

	let isUser: boolean = $derived(type === 'user');

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
		<p class="text-sm">{content}</p>
	</div>
</article>
