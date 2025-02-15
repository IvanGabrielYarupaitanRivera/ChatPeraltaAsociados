<script lang="ts">
	import type { SearchResult } from '$lib/utils/embeddings';

	let {
		query,
		similarContexts,
		isLoading = false
	}: {
		query: string;
		similarContexts: SearchResult[];
		isLoading: boolean;
	} = $props();
</script>

<div class="flex flex-col gap-4">
	{#if isLoading}
		<div class="animate-pulse">
			<div class="bg-primary/20 h-4 w-3/4 rounded"></div>
		</div>
	{:else}
		<div class="flex flex-col gap-2">
			<p class="text-sm text-gray-700">{query}</p>
			{#if similarContexts.length > 0}
				<div class="bg-primary/5 rounded-lg p-4">
					{#each similarContexts as context}
						<div class="mb-2">
							<p class="text-sm font-medium">{context.category} - {context.subcategory}</p>
							<p class="text-sm text-gray-600">{context.prompt}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
