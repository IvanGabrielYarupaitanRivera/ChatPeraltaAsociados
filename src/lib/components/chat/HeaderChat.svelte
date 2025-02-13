<script lang="ts">
	import { enhance } from '$app/forms';
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
					class="text-primary border-primary focus:ring-primary/20 cursor-pointer rounded-lg border p-3 transition-all duration-200
				   hover:bg-gray-100 hover:shadow-md focus:ring-2 focus:outline-none"
					aria-label="Nueva conversación"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</button>
			</form>
		</div>
	</div>
</header>
