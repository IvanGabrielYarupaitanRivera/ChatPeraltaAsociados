<article class="mr-auto mb-4 max-w-[60%]">
	<div
		class="border-opacity-10 text-primary rounded-2xl rounded-tl-none border bg-white/30 p-4 shadow-lg transition-all duration-200 hover:shadow-xl"
	>
		<div class="flex items-center gap-2">
			<div class="flex gap-1">
				<span class="bg-primary/60 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"
				></span>
				<span class="bg-primary/60 h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"
				></span>
				<span class="bg-primary/60 h-2 w-2 animate-bounce rounded-full"></span>
			</div>

			<p class="text-primary/60 text-sm">Analizando su consulta</p>
		</div>
	</div>
</article>

<style>
	.animate-bounce {
		animation-duration: 1s;
		animation-iteration-count: infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-25%);
		}
	}
</style>
