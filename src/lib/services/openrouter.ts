import { OPENROUTER_API_KEY } from '$env/static/private';
import type { ChatMessage } from '$lib/types/chat';

export async function getOpenRouterResponse(history: ChatMessage[] = []): Promise<string> {
	const messages = [...history];

	try {
		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENROUTER_API_KEY}`,
				'X-Title': 'Asistente Legal Inteligente de Peralta Asociados'
			},
			body: JSON.stringify({
				model: 'meta-llama/llama-3.3-70b-instruct:free',
				messages,
				stream: false,
				temperature: 0.7,
				max_tokens: 500,
				repetition_penalty: 1
			})
		});

		if (!response.ok) throw new Error(`Error API: ${response.status}`);

		const data = await response.json();

		return data.choices?.[0]?.message?.content?.trim() || 'No se obtuvo respuesta.';
	} catch (error) {
		console.error('Error al llamar a OpenRouter:', error);
		throw error;
	}
}
