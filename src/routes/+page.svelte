<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
	import TypingIndicator from '$lib/components/chat/TypingIndicator.svelte';
	import { chatHistory } from '$lib/stores/chatStore';

	let currentMessage = $state('');
	let messagesContainer: HTMLDivElement;
	let textareaRef: HTMLTextAreaElement;
	let isSending = $state(false);

	$effect(() => {
		if (messagesContainer && $chatHistory) {
			requestAnimationFrame(() => {
				messagesContainer.scrollTo({
					top: messagesContainer.scrollHeight,
					behavior: 'smooth'
				});
				textareaRef?.focus();
			});
		}
	});

	const handleSending = () => {
		chatHistory.update((prev) => [
			...prev,
			{
				role: 'user',
				content: currentMessage
			}
		]);

		currentMessage = '';
		isSending = true;

		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			await update();

			if (result.type === 'success') {
				chatHistory.update((prev) => [
					...prev,
					{
						role: 'assistant',
						content: result.data?.response
					}
				]);
			} else {
				chatHistory.update((prev) => [
					...prev,
					{
						role: 'assistant',
						content: '¡Vaya! Algo salió mal. Por favor, inténtalo de nuevo.'
					}
				]);
			}

			isSending = false;
		};
	};
</script>

<main class="mx-2">
	<section class="relative mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col">
		<div
			bind:this={messagesContainer}
			class="messages-container border-primary/10 via-primary/5 to-primary/10 relative flex-1 overflow-y-auto
		rounded-lg border bg-gradient-to-b from-white p-4 shadow-lg backdrop-blur-sm"
			role="log"
			aria-live="polite"
		>
			{#each $chatHistory as message}
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
					class="  focus:border-primary border-primary w-full resize-none rounded-xl border bg-white p-4 pr-16 text-sm shadow-md transition-all duration-200 focus:shadow-lg focus:outline-none"
					aria-label="Escribe tu mensaje"
					placeholder="Escribe tu consulta legal aquí..."
					rows="3"
				></textarea>
				<button
					type="submit"
					aria-label="Enviar mensaje"
					class="bg-primary hover:bg-primary/90 absolute right-4 bottom-4 flex items-center justify-center rounded-lg p-2
               text-white transition-colors duration-200 disabled:opacity-50"
					disabled={!currentMessage.trim() || isSending}
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
</main>

<style>
	.messages-container {
		scrollbar-width: thin;
		scrollbar-color: var(--color-primary) #f8fafc;
	}
</style>
