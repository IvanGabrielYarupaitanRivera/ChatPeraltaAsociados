<script lang="ts">
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import MessageBubble from '$lib/components/chat/MessageBubble.svelte';

	let { form } = $props();
	let currentMessage = $state('');
	let messagesContainer: HTMLDivElement;
	let isSending = $state(false);

	// Store para mensajes
	interface Message {
		type: 'bot' | 'user';
		content: string;
	}

	const messages = writable<Message[]>([
		{
			type: 'bot',
			content: '¡Bienvenido al asistente legal de Peralta Asociados! ¿En qué puedo ayudarte hoy?'
		}
	]);

	$effect(() => {
		if (messagesContainer && $messages) {
			requestAnimationFrame(() => {
				messagesContainer.scrollTo({
					top: messagesContainer.scrollHeight,
					behavior: 'smooth'
				});
			});
		}
	});

	const handleSending = () => {
		messages.update((prev) => [
			...prev,
			{
				type: 'user',
				content: currentMessage
			}
		]);

		isSending = true;

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();

			if (result.type === 'success') {
				messages.update((prev) => [
					...prev,
					{
						type: 'bot',
						content: result.data?.response
					}
				]);
			} else {
				messages.update((prev) => [
					...prev,
					{
						type: 'bot',
						content: '¡Vaya! Algo salió mal. Por favor, inténtalo de nuevo.'
					}
				]);
			}

			isSending = false;
		};
	};
</script>

<section class="relative mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col">
	<div
		bind:this={messagesContainer}
		class="messages-container flex-1 overflow-y-auto rounded-lg bg-blue-200 p-4 shadow-lg"
		role="log"
		aria-live="polite"
	>
		{#each $messages as message}
			<MessageBubble type={message.type} content={message.content} />
		{/each}

		{#if isSending}
			<div class="text-primary flex items-center justify-center p-4">
				<span>Enviando consulta...</span>
			</div>
		{/if}
	</div>

	<!-- Mensaje de error si la acción retorna un error -->
	{#if form?.error}
		<p class="error text-secondary p-2">{form.error}</p>
	{/if}

	<form method="POST" action="?/ask" use:enhance={handleSending} class="mt-4 flex-shrink-0">
		<div class="relative">
			<textarea
				name="message"
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
