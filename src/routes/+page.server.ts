import { fail } from '@sveltejs/kit';
import { getOpenRouterResponse } from '$lib/services/openrouter';
import type { Actions, PageServerLoad } from './$types';
import type { ChatMessage } from '$lib/types/chat';
import { searchSimilarContexts } from '$lib/utils/embeddings';

const conversations = new Map<string, ChatMessage[]>();

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
			const previousMessages = conversation.length >= 2 ? conversation.slice(-4, -1) : [];
			const singleHistorial = previousMessages
				.map(({ role, content }) => {
					const label = role === 'assistant' ? 'Asistente:' : 'Usuario:';
					return `(${label} ${content.trim()} ) | `;
				})
				.join(' ');
			const historial = `Historial de la conversación: ${singleHistorial}`.trim();

			const instrucciones =
				'Instrucciones: Puedes usar como máximo 80 palabras, mantén un tono empático y si el caso es complejo, sugiere al usuario contactar a Peralta Asociados. Nunca inventes información ni enlaces que no estén en la base de datos de Peralta Asociados, por favor, con los enlaces ten cuidado, no inventes nada. Si no encuentras información relevante en la base de datos, simplemente dilo. La página web de Peralta Asociados es: https://peraltaasociados.com/. Pregunta siempre más detalles para comprender mejor la consulta y brindar orientación adecuada. Utiliza obligatoriamente la etiqueta <a class="text-secondary" href="[Enlace]" target="_blank" rel="noopener noreferrer">[Texto descriptivo de Enlace]</a> para enlaces.';
			const contexto = contexts
				.map(
					(c) =>
						`Información de la base de datos de Peralta Asociados: ${c.question}. ${c.prompt.substring(0, 500).trim()}`
				)
				.join(' ')
				.replace(/\s+/g, ' ')
				.trim();

			const enrichedHistory: ChatMessage[] = [
				{ role: 'system', content: instrucciones },
				{ role: 'system', content: contexto },
				{ role: 'system', content: historial },
				{ role: 'user', content: enrichedMessage }
			];

			const response = await getOpenRouterResponse(enrichedHistory);

			// Agregar respuesta del asistente
			conversation.push({ role: 'assistant', content: response });

			conversations.set(sessionId, conversation);

			console.log(
				'Estos son los mensajes previos que se guardan: ',
				previousMessages,
				' Cantidad de mensajes previos: ',
				previousMessages.length
			);
			console.log('Esto es el texto total que se manda al modelo: ', enrichedHistory);
			console.log('Esto es la respuesta del modelo: ', response);

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
