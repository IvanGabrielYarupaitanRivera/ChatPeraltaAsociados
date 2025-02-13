<script lang="ts">
	import { enhance } from '$app/forms';
	import { NewConversationIcon } from '$lib/icons';
</script>

<header class="bg-white shadow-lg">
	<div class="container mx-auto px-4 py-3">
		<div class="flex items-center justify-between">
			<figure class="flex items-center gap-4">
				<img
					src="/logos/PeraltaAsociadosLogo.svg"
					alt="Logo de Peralta Asociados"
					class="h-8 w-8 transition-transform hover:scale-105 sm:h-12 sm:w-12"
				/>

				<figcaption>
					<h1 class="text-primary font-serif text-lg font-bold sm:text-xl lg:text-2xl">
						Peralta Asociados
					</h1>
					<p class="hidden text-sm text-gray-600 lg:block">Asesoría Legal en Huancavelica</p>
				</figcaption>
			</figure>

			<form action="?/reset" method="POST" use:enhance>
				<button
					type="submit"
					class="text-primary border-primary cursor-pointer rounded-lg border p-2 transition-all duration-200
				   hover:bg-gray-100 hover:shadow-md"
					aria-label="Nueva conversación"
					title="Nueva conversación"
				>
					<NewConversationIcon />
				</button>
			</form>
		</div>
	</div>
</header>
