<script lang="ts">
	import { writable } from 'svelte/store';

	// Store para mensajes
	const messages = writable([
		{
			type: 'bot',
			content: '¡Bienvenido al asistente legal de Peralta Asociados! ¿En qué puedo ayudarte hoy?'
		}
	]);

	let currentMessage = $state('');
	let messagesContainer: HTMLDivElement;

	// Manejo simple del envío de mensajes
	function handleSubmit(event: Event) {
		event.preventDefault();
		if (!currentMessage.trim()) return;

		// Añadir mensaje del usuario
		$messages = [...$messages, { type: 'user', content: currentMessage }];

		// Respuesta simulada del bot
		setTimeout(() => {
			$messages = [
				...$messages,
				{
					type: 'bot',
					content: 'Gracias por tu consulta. En breve te responderé.'
				}
			];
		}, 300);

		// Limpiar input
		currentMessage = '';
	}

	function getArticleClasses(type: string) {
		return type === 'user' ? 'ml-auto' : '';
	}

	function getBubbleClasses(type: string) {
		return type === 'user'
			? 'rounded-tr-sm bg-blue-600 text-white'
			: 'rounded-tl-sm bg-white text-blue-900';
	}

	// Scroll automático simple
	$effect(() => {
		if (messagesContainer && $messages.length > 0) {
			const lastMessage = messagesContainer.querySelector('.message:last-child');
			lastMessage?.scrollIntoView({ behavior: 'smooth' });
		}
	});
</script>

<section class="relative mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col">
	<div
		bind:this={messagesContainer}
		class="messages-container flex-1 overflow-y-auto rounded-lg bg-blue-200 p-4 shadow-lg"
		role="log"
		aria-live="polite"
	>
		<div class="relative z-20 space-y-4">
			{#each $messages as message}
				<article class="max-w-[60%] {getArticleClasses(message.type)} message">
					<div
						class="rounded-2xl border border-blue-100 p-4 shadow-sm {getBubbleClasses(
							message.type
						)}"
					>
						<p>{message.content}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<form class="mt-4 flex-shrink-0" onsubmit={handleSubmit}>
		<div class="relative">
			<textarea
				bind:value={currentMessage}
				class="w-full resize-none rounded-xl border border-blue-200 bg-white p-4 pr-16 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none"
				aria-label="Escribe tu mensaje"
				placeholder="Escribe tu consulta legal aquí..."
				rows="3"
			></textarea>
			<button
				type="submit"
				aria-label="Enviar mensaje"
				class="absolute right-4 bottom-4 flex items-center justify-center rounded-lg bg-blue-600 p-2 text-white transition-colors duration-200 hover:bg-blue-700 disabled:opacity-50"
				disabled={!currentMessage.trim()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
					/>
				</svg>
			</button>
		</div>
	</form>
</section>

<style>
	/* Scrollbar styling for the message container */
	.messages-container::-webkit-scrollbar {
		width: 4px;
	}

	.messages-container::-webkit-scrollbar-track {
		background: #f1f5f9;
	}

	.messages-container::-webkit-scrollbar-thumb {
		background: #94a3b8;
		border-radius: 2px;
	}
</style>
