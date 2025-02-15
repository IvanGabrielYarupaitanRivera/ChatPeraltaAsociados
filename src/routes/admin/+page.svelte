<!-- src/routes/admin/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let { hasData } = $derived(data);
</script>

<div class="mx-auto max-w-3xl p-4">
	<h1 class="mb-4 text-2xl font-bold">Panel de Administración</h1>

	{#if hasData}
		<p class="text-green-600">Los datos ya están cargados en la base de datos.</p>
	{:else}
		<form method="POST" action="?/insert" use:enhance>
			<button type="submit" class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white">
				Insertar Datos Iniciales
			</button>
		</form>
	{/if}
</div>
