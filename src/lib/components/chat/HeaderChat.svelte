<script lang="ts">
	import { enhance } from '$app/forms';
	import { InfoIcon, NewConversationIcon } from '$lib/icons';
	import InfoModal from './InfoModal.svelte';

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
	<InfoModal {closeDialog} {infoDialog} />
{/if}
