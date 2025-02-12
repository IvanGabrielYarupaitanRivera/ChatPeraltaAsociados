import { OPENROUTER_API_KEY } from '$env/static/private';

interface ChatMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

export async function getOpenRouterResponse(
	userPrompt: string,
	messageHistory: ChatMessage[] = []
): Promise<string> {
	// Contexto base para todas las consultas
	const systemContext = `
    Eres el asistente legal de Peralta Asociados, una firma de abogados en Huancavelica, Perú.
    Áreas de especialización: Derecho Administrativo, Civil, Laboral y Constitucional.
    
    Directrices:
    1. Da respuestas concisas y en lenguaje simple, evitando tecnicismos legales
    2. Menciona cuando un caso requiere asesoría legal personalizada
    3. Sugiere agendar una cita con Peralta Asociados para casos complejos
    4. Incluye el disclaimer legal cuando sea apropiado
    
    Objetivo: Ayudar con información general y recomendar los servicios de Peralta Asociados.
  `.trim();

	// Construir el historial completo limitado a los últimos 10 mensajes
	const messages: ChatMessage[] = [
		{ role: 'system', content: systemContext },
		...messageHistory.slice(-10), // Mantener solo los últimos 10 mensajes
		{ role: 'user', content: userPrompt }
	];

	const fullPrompt = {
		model: 'google/gemini-2.0-flash-exp:free',
		messages,
		stream: false,
		temperature: 0.7,
		max_tokens: 300
	};

	try {
		console.log(messages);

		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENROUTER_API_KEY}`,
				'X-Title': 'Asistente Legal Inteligente de Peralta Asociados'
			},
			body: JSON.stringify(fullPrompt)
		});

		if (!response.ok) {
			const errorData = await response.text();
			throw new Error(`Error en la API: ${response.status} - ${errorData}`);
		}

		const data = await response.json();
		const answer = data.choices && data.choices[0]?.message?.content;
		return answer ? answer.trim() : 'No se obtuvo respuesta de la API.';
	} catch (error) {
		console.error('Error al llamar a OpenRouter:', error);
		throw error;
	}
}
