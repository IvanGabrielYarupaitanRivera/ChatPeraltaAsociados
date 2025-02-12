import { fail } from '@sveltejs/kit';
import { chatHistory } from '$lib/stores/chatStore';
import { getOpenRouterResponse } from '$lib/services/openrouter';
import type { Actions } from './$types';
import { get } from 'svelte/store';

export const actions = {
	ask: async ({ request }) => {
		const data = await request.formData();
		const message = data.get('message') as string;

		if (!message?.trim()) {
			return fail(422, { error: 'El mensaje es obligatorio.' });
		}

		try {
			const recentHistory = get(chatHistory).slice(-4);
			const response = await getOpenRouterResponse(message, recentHistory);

			chatHistory.update((msgs) => [
				...msgs,
				{ role: 'user', content: message },
				{ role: 'assistant', content: response }
			]);

			return { response };
		} catch (error) {
			console.error('Error:', error);
			return fail(500, { error: 'Error al procesar la consulta' });
		}
	}
} satisfies Actions;
