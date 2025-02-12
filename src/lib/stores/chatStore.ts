import { writable } from 'svelte/store';
import type { ChatMessage } from '$lib/types/chat';

export const chatHistory = writable<ChatMessage[]>([
	{
		role: 'assistant',
		content: '¡Bienvenido al asistente legal de Peralta Asociados! ¿En qué puedo ayudarte hoy?'
	}
]);
