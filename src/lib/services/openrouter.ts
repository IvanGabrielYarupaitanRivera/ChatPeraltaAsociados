import { OPENROUTER_API_KEY } from '$env/static/private';
import type { ChatMessage } from '$lib/types/chat';

export async function getOpenRouterResponse(history: ChatMessage[] = []): Promise<string> {
	const TIMEOUT_MS = 25000;
	const MAX_RETRIES = 2;

	const messages = [...history];

	const fetchWithTimeout = async (retryCount = 0): Promise<string> => {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

			const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${OPENROUTER_API_KEY}`,
					'X-Title': 'Asistente Legal Inteligente de Peralta Asociados'
				},
				body: JSON.stringify({
					model: 'qwen/qwen-2.5-72b-instruct:free',
					messages,
					stream: false,
					temperature: 0.7,
					max_tokens: 500,
					repetition_penalty: 1
				}),
				signal: controller.signal
			});

			clearTimeout(timeoutId);

			if (!response.ok) throw new Error(`Error API: ${response.status}`);

			const data = await response.json();
			console.log(data);

			return (
				data.choices?.[0]?.message?.content?.trim() ||
				'Lo siento, no pude procesar tu consulta. Por favor, intenta de nuevo.'
			);
		} catch (error) {
			console.error(`Error en intento ${retryCount + 1}:`, error);

			if (error instanceof Error && error.name === 'AbortError') {
				console.log('La solicitud excedió el límite de tiempo');
			}

			if (retryCount < MAX_RETRIES) {
				console.log(`Reintento ${retryCount + 1} de ${MAX_RETRIES}`);
				return fetchWithTimeout(retryCount + 1);
			}

			if (error instanceof Error) {
				throw error;
			}

			throw new Error(typeof error === 'string' ? error : 'Error desconocido en la solicitud');
		}
	};

	return fetchWithTimeout();
}
