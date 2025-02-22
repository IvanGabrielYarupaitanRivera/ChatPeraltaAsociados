<script>
	import { fade } from 'svelte/transition';

	let { closeDialog, infoDialog } = $props();
</script>

<dialog
	bind:this={infoDialog}
	class="bg-primary/10 z-40 flex h-full w-full items-center justify-center backdrop-blur-lg"
	transition:fade={{ duration: 200 }}
>
	<article class="mx-2 max-w-sm rounded-lg bg-white p-6 shadow-lg">
		<header>
			<h2 class="text-primary text-xl font-bold">Información Importante</h2>
		</header>

		<main class="my-4 space-y-4">
			<p class="text-sm text-gray-700">
				Este asistente virtual utiliza tecnología de inteligencia artificial y aunque se esfuerza
				por proporcionar información precisa, puede cometer errores. La información proporcionada es
				solo para orientación general.
			</p>
			<footer>
				<a
					class="block text-sm"
					href="https://vanchi.pro"
					target="_blank"
					rel="noopener noreferrer"
				>
					Desarrollado por <span class="text-secondary font-semibold">Ivan</span>
				</a>

				<a
					class="block text-sm"
					href="https://peraltaasociados.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Página Web <span class="text-secondary font-semibold">Peralta Asociados</span>
				</a>
			</footer>
		</main>

		<button
			type="button"
			onclick={closeDialog}
			class="bg-secondary hover:bg-secondary/90 mt-2 w-full cursor-pointer rounded py-2 text-sm text-white"
		>
			Entendido
		</button>
	</article>
</dialog>
