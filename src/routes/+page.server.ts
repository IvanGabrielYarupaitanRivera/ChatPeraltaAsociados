// +page.server.ts
import { fail } from '@sveltejs/kit';
import { getOpenRouterResponse } from '$lib/services/openrouter';
import type { Actions, PageServerLoad } from './$types';
import type { ChatMessage } from '$lib/types/chat';
import { searchSimilarContexts } from '$lib/utils/embeddings';

// Map para almacenar conversaciones en memoria
const conversations = new Map<string, ChatMessage[]>();

// Mensaje inicial del asistente
const initialMessage: ChatMessage = {
	role: 'assistant',
	content: '¡Hola! Soy el asistente legal de Peralta Asociados. ¿En qué puedo ayudarte?'
};

export const load: PageServerLoad = ({ cookies }) => {
	let sessionId = cookies.get('session_id');

	if (!sessionId) {
		sessionId = crypto.randomUUID();
		cookies.set('session_id', sessionId, { path: '/' });
		conversations.set(sessionId, [initialMessage]);
	}

	return {
		messages: conversations.get(sessionId) || [initialMessage]
	};
};

export const actions = {
	ask: async ({ request, cookies }) => {
		const sessionId = cookies.get('session_id');
		const form = await request.formData();
		const message = form.get('message') as string;

		if (!message?.trim()) {
			return fail(422, { error: 'El mensaje es obligatorio.' });
		}

		if (!sessionId) {
			return fail(400, { error: 'Sesión no válida' });
		}

		const conversation = conversations.get(sessionId) || [initialMessage];

		try {
			// Agregar mensaje del usuario
			conversation.push({ role: 'user', content: message });

			const contexts = await searchSimilarContexts(message, 0.7, 2);

			const enrichedMessage = `${message}`.trim();

			// Obtener respuesta
			const previousMessages = conversation.length >= 2 ? conversation.slice(-2, -1) : [];
			const instrucciones =
				'Obligatorio nunca usar asteriscos, solo puntos y comas; mantener tono cercano; buena ortografía y gramática; si el caso es complejo, recomendar contacto con el Dr. Ciro Yarupaitan';
			const contexto = contexts
				.map((c) => `[${c.category}] ${c.prompt.substring(0, 400).trim()}`)
				.join(' ')
				.replace(/\s+/g, ' ')
				.trim();

			const enrichedHistory: ChatMessage[] = [
				{ role: 'assistant', content: instrucciones },
				{ role: 'assistant', content: contexto },
				...previousMessages,
				{ role: 'user', content: enrichedMessage }
			];

			const response = await getOpenRouterResponse(enrichedHistory);

			// Agregar respuesta del asistente
			conversation.push({ role: 'assistant', content: response });

			conversations.set(sessionId, conversation);

			return {
				success: true,
				messages: conversation,
				similarContexts: contexts
			};
		} catch (error) {
			console.error('Error:', error);

			return fail(500, { error: 'Error al procesar la consulta' });
		}
	},

	reset: async ({ cookies }) => {
		const sessionId = cookies.get('session_id');

		if (sessionId) {
			conversations.delete(sessionId);
			cookies.delete('session_id', { path: '/' });
		}
	}
} satisfies Actions;
