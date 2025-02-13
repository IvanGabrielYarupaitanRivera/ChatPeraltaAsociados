// +page.server.ts
import { fail } from '@sveltejs/kit';
import { getOpenRouterResponse } from '$lib/services/openrouter';
import type { Actions, PageServerLoad } from './$types';
import { SYSTEM_PROMPT } from '$lib/config/systemPrompt';
import type { ChatMessage } from '$lib/types/chat';

// Inicialización del chat con system prompt
const initialConversation: ChatMessage[] = [
	{
		role: 'system',
		content: SYSTEM_PROMPT
	},
	{
		role: 'assistant',
		content: '¡Hola! Soy el asistente legal de Peralta Asociados. ¿En qué puedo ayudarte?'
	}
];

// Variable de sesión
let conversation = [...initialConversation];

export const load: PageServerLoad = () => {
	return {
		messages: conversation.filter((msg) => msg.role !== 'system')
	};
};

export const actions = {
	ask: async ({ request }) => {
		const form = await request.formData();
		const message = form.get('message') as string;

		if (!message?.trim()) {
			return fail(422, { error: 'El mensaje es obligatorio.' });
		}

		try {
			// Agregar mensaje del usuario
			conversation.push({ role: 'user', content: message });

			// Obtener respuesta
			const recentHistory = conversation.slice(-4);

			const response = await getOpenRouterResponse(recentHistory);

			// Agregar respuesta del asistente
			conversation.push({ role: 'assistant', content: response });

			return {
				success: true,
				messages: conversation.filter((msg) => msg.role !== 'system')
			};
		} catch (error) {
			console.error('Error:', error);
			// Remover último mensaje en caso de error
			conversation.pop();
			return fail(500, { error: 'Error al procesar la consulta' });
		}
	},

	reset: async () => {
		conversation = [...initialConversation];
	}
} satisfies Actions;
