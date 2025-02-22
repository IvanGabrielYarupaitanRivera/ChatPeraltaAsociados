<script lang="ts">
	import { enhance } from '$app/forms';
	import { InfoIcon, NewConversationIcon } from '$lib/icons';
	import { fade } from 'svelte/transition';

	let infoDialog: HTMLDialogElement = $state() as HTMLDialogElement;

	let showModal = $state(false);

	const openDialog = () => {
		showModal = true;
	};

	const closeDialog = () => {
		showModal = false;
	};
</script>

<header class="bg-white shadow-lg">
	<div class="container mx-auto px-4 py-3">
		<div class="flex items-center justify-between">
			<figure class="flex items-center gap-4">
				<a href="/">
					<img
						src="/logos/PeraltaAsociadosLogo.svg"
						alt="Logo de Peralta Asociados"
						class="h-8 w-8 transition-transform hover:scale-105 sm:h-12 sm:w-12"
					/>
				</a>

				<figcaption>
					<h1 class="text-primary font-serif text-lg font-bold sm:text-xl lg:text-2xl">
						Peralta Asociados
					</h1>
					<p class="hidden text-sm text-gray-600 lg:block">Asesoría Legal en Huancavelica</p>
				</figcaption>
			</figure>

			<section class="flex gap-4">
				<form action="?/reset" method="POST" use:enhance>
					<button
						type="submit"
						class="text-primary border-primary flex cursor-pointer items-center gap-2 rounded-lg border p-2 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
						aria-label="Nueva Consulta"
						title="Nueva Consulta"
					>
						<span class="hidden text-sm sm:inline">Nueva Consulta</span>
						<NewConversationIcon />
					</button>
				</form>

				<button
					class="text-primary border-primary flex cursor-pointer items-center gap-2 rounded-lg border p-2 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
					onclick={openDialog}
				>
					<span class="hidden text-sm sm:inline">Información</span>
					<InfoIcon />
				</button>
			</section>
		</div>
	</div>
</header>

{#if showModal}
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
					por proporcionar información precisa, puede cometer errores. La información proporcionada
					es solo para orientación general.
				</p>

				<a
					class="block text-sm"
					href="https://vanchi.pro"
					target="_blank"
					rel="noopener noreferrer"
				>
					Desarrollado por <span class="text-secondary font-semibold">Ivan</span>
				</a>
			</main>

			<button
				type="button"
				onclick={closeDialog}
				class="bg-secondary hover:bg-secondary/90 w-full cursor-pointer rounded py-2 text-sm text-white"
			>
				Entendido
			</button>
		</article>
	</dialog>
{/if}
