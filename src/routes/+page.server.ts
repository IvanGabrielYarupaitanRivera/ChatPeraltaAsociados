import { fail } from '@sveltejs/kit';
import { chatHistory } from '$lib/stores/chatStore';
import { getOpenRouterResponse } from '$lib/services/openrouter';
import type { Actions } from './$types';

interface ChatMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

export const actions = {
	ask: async ({ request }) => {
		const data = await request.formData();
		const message = data.get('message') as string;
		let currentHistory: ChatMessage[] = [];

		// Validación simple del mensaje
		if (!message || typeof message !== 'string' || message.trim() === '') {
			return fail(422, { error: 'El mensaje es obligatorio.' });
		}

		try {
			// Obtener historial actual
			chatHistory.subscribe((value) => {
				currentHistory = value;
			})();

			// Agregar mensaje del usuario al historial
			const userMessage: ChatMessage = { role: 'user', content: message };
			currentHistory = [...currentHistory, userMessage];
			chatHistory.set(currentHistory);

			// Obtener respuesta con el historial actualizado
			const response = await getOpenRouterResponse(message, currentHistory);

			// Agregar respuesta del bot al historial
			const botMessage: ChatMessage = { role: 'assistant', content: response };
			currentHistory = [...currentHistory, botMessage];
			chatHistory.set(currentHistory);

			return { response };
		} catch (error) {
			console.error('Error:', error);
			return fail(500, { error: 'Error al procesar la consulta' });
		}
	}
} satisfies Actions;
