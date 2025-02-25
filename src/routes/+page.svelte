<script lang="ts">
	import { enhance } from '$app/forms';
	import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
	import TypingIndicator from '$lib/components/chat/TypingIndicator.svelte';
	import { SendMessageIcon } from '$lib/icons/index.js';
	import { onMount } from 'svelte';

	let { data } = $props();
	let { messages } = $derived(data);
	let currentMessage = $state('');
	let messagesContainer: HTMLDivElement;
	let textareaRef: HTMLTextAreaElement;
	let isSending = $state(false);
	let errorMessage = $state('');
	let waitingTime = $state(0);
	let waitingInterval: ReturnType<typeof setInterval>;

	// Manejo de textarea autoexpandible
	const handleInput = () => {
		if (!textareaRef) return;

		// Reset height para calcular correctamente
		textareaRef.style.height = 'auto';

		// Limitar altura máxima
		const maxHeight = 150;
		textareaRef.style.height = Math.min(textareaRef.scrollHeight, maxHeight) + 'px';
	};

	const focusTextarea = () => {
		setTimeout(() => textareaRef?.focus(), 100);
	};

	// Sistema de scroll mejorado
	const scrollToBottom = (force = false) => {
		if (!messagesContainer) return;

		// Detección más precisa de necesidad de scroll
		const isNearBottom =
			messagesContainer.scrollHeight -
				messagesContainer.clientHeight -
				messagesContainer.scrollTop <
			200;

		if (force || isNearBottom) {
			// Scroll inmediato para respuestas del sistema
			if (force) {
				messagesContainer.scrollTo({
					top: messagesContainer.scrollHeight
				});
				return;
			}

			// Observer para detectar cambios en el contenido y hacer scroll
			const observer = new MutationObserver(() => {
				messagesContainer.scrollTo({
					top: messagesContainer.scrollHeight,
					behavior: 'smooth'
				});
				// Desconectar después del primer cambio
				observer.disconnect();
			});

			observer.observe(messagesContainer, {
				childList: true,
				subtree: true,
				characterData: true
			});
		}
	};

	// Medir tiempo de espera para feedback al usuario
	const startWaitingTimer = () => {
		waitingTime = 0;
		waitingInterval = setInterval(() => {
			waitingTime += 1;
		}, 1000);
	};

	const stopWaitingTimer = () => {
		clearInterval(waitingInterval);
	};

	// Efecto para scroll inicial y cuando cambian los mensajes
	$effect(() => {
		if (messages) {
			scrollToBottom(true);
			focusTextarea();
		}
	});

	// Manejo de envío con mejor UX y manejo de errores
	const handleSending = () => {
		if (!currentMessage.trim() || isSending) return;

		errorMessage = '';
		isSending = true;
		const messageToSend = currentMessage;
		currentMessage = '';
		startWaitingTimer();

		// Añadir mensaje del usuario inmediatamente
		data = {
			...data,
			messages: [...messages, { role: 'user', content: messageToSend }]
		};
		scrollToBottom(true);

		return async ({ update, result }: { update: () => Promise<void>; result?: any }) => {
			try {
				await update();

				// Verificar si hubo error del servidor
				if (result?.type === 'failure') {
					errorMessage = 'No pudimos procesar tu consulta. Por favor, intenta de nuevo.';
					// Añadir mensaje de error como asistente
					data = {
						...data,
						messages: [
							...data.messages,
							{
								role: 'assistant',
								content:
									'Lo siento, tuve un problema al procesar tu consulta sobre temas legales. ¿Podrías reformular tu pregunta o contactar directamente con Peralta Asociados al +51976762237?'
							}
						]
					};
				}

				scrollToBottom(true);
			} catch (error) {
				console.error('Error:', error);
				errorMessage = 'Error de conexión. Por favor, verifica tu internet.';
			} finally {
				isSending = false;
				stopWaitingTimer();
				scrollToBottom(true);
				handleInput(); // Reset altura del textarea
			}
		};
	};

	// Envío con Enter (pero Shift+Enter para nueva línea)
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (currentMessage.trim() && !isSending) {
				const form = document.querySelector('form[action="?/ask"]');
				form?.dispatchEvent(new Event('submit', { cancelable: true }));
			}
		}
	};

	onMount(() => {
		// Scroll inicial
		scrollToBottom(true);
		// Ajustar textarea
		handleInput();
	});
</script>

<main class="mx-2">
	<section class="relative mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col">
		{#if errorMessage}
			<div
				class="mb-4 flex items-center justify-between rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-red-700"
				role="alert"
			>
				<span>{errorMessage}</span>
				<button
					class="text-red-700 hover:text-red-900"
					onclick={() => (errorMessage = '')}
					aria-label="Cerrar mensaje de error"
				>
					✕
				</button>
			</div>
		{/if}

		<div
			bind:this={messagesContainer}
			class="messages-container border-primary bg-primary/10 relative flex-1 overflow-y-auto rounded-xl border p-4 shadow-md backdrop-blur-sm"
			role="log"
			aria-live="polite"
		>
			{#each messages as message}
				<MessageBubble type={message.role === 'user' ? 'user' : 'bot'} content={message.content} />
			{/each}

			{#if isSending}
				<TypingIndicator />
			{/if}
		</div>

		<form method="POST" action="?/ask" use:enhance={handleSending} class="mt-4 flex-shrink-0">
			<div class="relative">
				<textarea
					bind:this={textareaRef}
					name="message"
					bind:value={currentMessage}
					oninput={handleInput}
					onkeydown={handleKeyDown}
					class="focus:border-primary border-primary w-full resize-none rounded-xl border bg-white p-4 pr-16 text-sm shadow-md transition-all duration-200 focus:shadow-lg focus:outline-none"
					aria-label="Escribe tu mensaje"
					placeholder="Escribe tu consulta legal aquí... (Presiona Enter para enviar)"
					rows="1"
					style="min-height: 60px; max-height: 150px;"
				></textarea>

				<button
					type="submit"
					aria-label="Enviar mensaje"
					class="bg-primary hover:bg-primary/90 absolute right-4 bottom-4 flex items-center justify-center rounded-lg p-2
               text-white transition-colors duration-200 disabled:opacity-50"
					disabled={!currentMessage.trim() || isSending}
					title="Enviar mensaje"
				>
					<SendMessageIcon />
				</button>
			</div>
			<div class="mt-2 flex justify-between text-xs text-gray-500">
				<span>Shift+Enter para nueva línea</span>
				<span>
					{#if isSending}
						{#if waitingTime < 10}
							Analizando consulta...
						{:else if waitingTime < 20}
							Buscando información legal relevante...
						{:else}
							Consultando bases legales de Peralta Asociados...
						{/if}
					{:else if errorMessage}
						<span class="text-red-500">⚠️ {errorMessage}</span>
					{:else}
						Consulta legal gratuita - Peralta Asociados
					{/if}
				</span>
			</div>
		</form>
	</section>
</main>

<style>
	.messages-container {
		scrollbar-width: thin;
		scrollbar-color: var(--color-primary) #f8fafc;
	}

	.messages-container::-webkit-scrollbar {
		width: 6px;
	}

	.messages-container::-webkit-scrollbar-thumb {
		background-color: var(--color-primary);
		border-radius: 6px;
	}

	.messages-container::-webkit-scrollbar-track {
		background-color: #f8fafc;
	}

	/* Animación sutil para nuevos mensajes */
	:global(.message-bubble) {
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
