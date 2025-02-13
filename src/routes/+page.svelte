<script lang="ts">
	import { enhance } from '$app/forms';
	import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
	import TypingIndicator from '$lib/components/chat/TypingIndicator.svelte';
	import { SendMessageIcon } from '$lib/icons/index.js';

	let { data } = $props();
	let { messages } = $derived(data);
	let currentMessage = $state('');
	let messagesContainer: HTMLDivElement;
	let textareaRef: HTMLTextAreaElement;
	let isSending = $state(false);

	const focusTextarea = () => {
		setTimeout(() => textareaRef?.focus(), 100);
	};

	const scrollToBottom = () => {
		if (messagesContainer) {
			const shouldScroll =
				messagesContainer.scrollHeight - messagesContainer.clientHeight <=
				messagesContainer.scrollTop + 150;

			if (shouldScroll) {
				setTimeout(() => {
					messagesContainer.scrollTo({
						top: messagesContainer.scrollHeight,
						behavior: 'smooth'
					});
				}, 100);
			}
		}
	};

	$effect(() => {
		if (messages) {
			scrollToBottom();
			focusTextarea();
		}
	});

	const handleSending = () => {
		if (!currentMessage.trim() || isSending) return;

		isSending = true;
		const messageToSend = currentMessage;
		currentMessage = '';

		// Actualizamos data y scroll
		data = {
			...data,
			messages: [...messages, { role: 'user', content: messageToSend }]
		};
		scrollToBottom();

		return async ({ update }: { update: () => Promise<void> }) => {
			try {
				await update();
				scrollToBottom();
				focusTextarea();
			} catch (error) {
				console.error('Error:', error);
				currentMessage = messageToSend;
			} finally {
				isSending = false;
			}
		};
	};
</script>

<main class="mx-2">
	<section class="relative mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col">
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
					title="Enviar mensaje"
				>
					<SendMessageIcon />
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
