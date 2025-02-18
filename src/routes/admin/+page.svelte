<!-- src/routes/admin/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	let { data } = $props();
	let { hasData } = $derived(data);

	let isInserting = $state(false);

	const handleInsert = () => {
		isInserting = true;

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			try {
				await update();
			} catch (error) {
				console.error('Error:', error);
			} finally {
				isInserting = false;
			}
		};
	};
</script>

<div class="mx-auto max-w-3xl p-4">
	<h1 class="mb-4 text-2xl font-bold">Panel de Administración</h1>

	{#if isInserting}
		<p class="text-primary">Insertando datos...</p>
	{/if}

	{#if hasData}
		<p class="text-green-600">Los datos ya están cargados en la base de datos de Supabase</p>
	{:else}
		<form method="POST" action="?/insert" use:enhance={handleInsert}>
			<button
				type="submit"
				class="bg-primary hover:bg-primary/90 cursor-pointer rounded-lg px-4 py-2 text-white"
				disabled={isInserting}
			>
				Insertar Datos Iniciales
			</button>
		</form>
	{/if}
</div>
