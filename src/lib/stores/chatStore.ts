import { writable } from 'svelte/store';

interface ChatMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

export const chatHistory = writable<ChatMessage[]>([]);
