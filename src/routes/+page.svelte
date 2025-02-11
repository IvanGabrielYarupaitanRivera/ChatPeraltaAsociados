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
		}, 1000);

		// Limpiar input
		currentMessage = '';
	}

	// Scroll automático simple
	$effect(() => {
		if (messagesContainer && $messages.length > 0) {
			const lastMessage = messagesContainer.querySelector('.message:last-child');
			lastMessage?.scrollIntoView({ behavior: 'smooth' });
		}
	});
</script>

<main class="relative flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
	<!-- Hero background pattern -->
	<div class="bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.015]"></div>

	<header
		class="chatbot-header flex items-center gap-4 border-b border-blue-100 bg-white/80 px-6 py-4 backdrop-blur-sm"
	>
		<img src="/logos/PeraltaAsociadosLogo.svg" alt="Logo Peralta Asociados" class="h-12 w-auto" />
		<div>
			<h1 class="text-xl font-semibold text-blue-950">Asistente Legal de Peralta Asociados</h1>
			<p class="text-sm text-blue-600/80">Consulta tus dudas legales en Huancavelica</p>
		</div>
	</header>

	<section class="relative mx-auto flex h-[calc(100vh-12rem)] w-full max-w-3xl flex-col p-4">
		<div
			bind:this={messagesContainer}
			class="messages-container relative min-h-0 flex-1 overflow-y-auto rounded-lg border border-blue-100 bg-gradient-to-b from-white via-blue-50 to-blue-100 p-4 shadow-lg backdrop-blur-sm"
			role="log"
			aria-live="polite"
		>
			<div class="relative z-10 space-y-4">
				{#each $messages as message}
					<article
						class="message {message.type}-message {message.type === 'user'
							? 'ml-auto'
							: ''} max-w-[80%]"
					>
						<div
							class="rounded-2xl {message.type === 'user'
								? 'rounded-tr-sm bg-blue-600 text-white'
								: 'rounded-tl-sm bg-white'} border border-blue-100 p-4 shadow-sm"
						>
							<p class={message.type === 'bot' ? 'text-blue-900' : ''}>{message.content}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<form class="chat-input-form mt-4 flex-shrink-0" onsubmit={handleSubmit}>
			<div class="input-container relative">
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
	<footer class="border-t border-blue-100 bg-white px-6 py-3 text-center">
		<p class="mb-1 text-sm text-slate-600">
			Aviso Legal: Esta información es solo para orientación general y no constituye asesoría legal
			formal. Para consejos específicos sobre tu caso, agenda una consulta con nuestros abogados.
		</p>
		<small class="text-slate-500"
			>© {new Date().getFullYear()} Peralta Asociados - Huancavelica, Perú</small
		>
	</footer>
</main>

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

	/* Hero background pattern */
	.bg-grid-pattern {
		background-size: 20px 20px;
		background-image:
			linear-gradient(to right, rgb(15, 23, 42) 2px, transparent 1px),
			linear-gradient(to bottom, rgb(15, 23, 42) 2px, transparent 1px);
	}
</style>
