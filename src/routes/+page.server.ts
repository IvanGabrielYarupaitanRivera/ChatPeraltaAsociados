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
			const response = await getOpenRouterResponse(message, get(chatHistory));

			chatHistory.update((msgs) => [
				...msgs.slice(-9), // Mantener últimos 9 para agregar 2 nuevos
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
