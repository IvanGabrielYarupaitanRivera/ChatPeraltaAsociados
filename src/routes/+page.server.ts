// +page.server.ts
import { fail } from '@sveltejs/kit';
import { getOpenRouterResponse } from '$lib/services/openrouter';
import type { Actions, PageServerLoad } from './$types';
import type { ChatMessage } from '$lib/types/chat';
import { searchSimilarContexts } from '$lib/utils/embeddings';

// Inicialización del chat con system prompt
const initialConversation: ChatMessage[] = [
	{
		role: 'assistant',
		content: '¡Hola! Soy el asistente legal de Peralta Asociados. ¿En qué puedo ayudarte?'
	}
];

// Variable de sesión
let conversation: ChatMessage[] = [...initialConversation];

export const load: PageServerLoad = () => {
	return {
		messages: conversation
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
			const contexts = await searchSimilarContexts(message, 0.7, 2);

			const enrichedMessage = `
						Consulta: ${message}

						Instrucciones de respuesta: 
						- Obligatorio: nunca usar asteriscos, solo puntos y comas
						- Mantener tono cercano 
						- Buena ortografía y gramática
						- Si el caso es complejo, recomendar contacto con Dr. Ciro Yarupaitan, ofrecer asesoría inicial gratuita y decir que WhatsApp es la mejor forma de contacto.


						Contexto relevante:
						${contexts.map((c) => `[${c.category}] ${c.prompt.substring(0, 400).trim()}`).join('\n')}
						`.trim();

			// Agregar mensaje del usuario
			conversation.push({ role: 'user', content: message });

			// Obtener respuesta
			const previousMessages =
				conversation.length >= 2
					? conversation.slice(-2, -1) // Toma mensajes hasta antes del último
					: [];
			const enrichedHistory: ChatMessage[] = [
				...previousMessages,
				{ role: 'user', content: enrichedMessage }
			];

			const response = await getOpenRouterResponse(enrichedHistory);

			// Agregar respuesta del asistente
			conversation.push({ role: 'assistant', content: response });

			console.log('Mensaje usuario', message);
			console.log('Contextos similares:', contexts);
			console.log('Mensaje Enriquecido', enrichedMessage);
			console.log('Historial Enriquecido', enrichedHistory);

			return {
				success: true,
				messages: conversation.filter((msg) => msg.role !== 'system'),
				similarContexts: contexts
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
