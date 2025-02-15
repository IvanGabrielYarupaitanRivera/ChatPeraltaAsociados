import { pipeline } from '@xenova/transformers';
import { supabase } from '$lib/services/supabase';
import { insertInitialData } from '$lib/utils/initialData';
import type { FeatureExtractionPipeline } from '@xenova/transformers';

export interface LegalContext {
	category: string;
	subcategory: string;
	prompt: string;
	keywords: string[];
}

export interface SearchResult {
	id: string;
	category: string;
	subcategory: string;
	prompt: string;
	keywords: string[];
	similarity: number;
}

let embeddingModel: FeatureExtractionPipeline | null = null;

async function initializeModel(): Promise<FeatureExtractionPipeline> {
	try {
		if (!embeddingModel) {
			embeddingModel = await pipeline('feature-extraction', 'Supabase/gte-small');
		}
		return embeddingModel;
	} catch (error) {
		throw new Error(`Error initializing model: ${error}`);
	}
}

export async function generateEmbedding(text: string): Promise<number[]> {
	try {
		const model = await initializeModel();
		const output = await model(text, {
			pooling: 'mean',
			normalize: true
		});
		return Array.from(output.data);
	} catch (error) {
		throw new Error(`Error generating embedding: ${error}`);
	}
}

export async function insertLegalContext(context: LegalContext) {
	const searchText = `${context.prompt} ${context.keywords.join(' ')}`;
	const embedding = await generateEmbedding(searchText);

	console.log('Embedding generado:', {
		length: embedding.length,
		sample: embedding.slice(0, 3)
	});

	const { error } = await supabase
		.from('chat_contexts')
		.insert({
			category: context.category,
			subcategory: context.subcategory,
			prompt: context.prompt,
			keywords: context.keywords,
			embedding: embedding
		})
		.select('id, category, subcategory');

	if (error) {
		console.error('Error de inserción:', {
			code: error.code,
			message: error.message,
			details: error.details
		});
	}
}

export async function searchSimilarContexts(
	query: string,
	threshold = 0.7,
	limit = 5
): Promise<SearchResult[]> {
	try {
		// Generar embedding para la consulta del usuario
		const embedding = await generateEmbedding(query);

		// Llamar a la función RPC de Supabase
		const { data, error } = await supabase.rpc('match_chat_contexts', {
			query_embedding: embedding,
			match_threshold: threshold,
			match_count: limit
		});

		if (error) throw error;
		return data || [];
	} catch (error) {
		throw new Error(`Error buscando contextos similares: ${error}`);
	}
}

export async function testDataInsertion() {
	try {
		// Verificar si ya existen datos
		const { count } = await supabase.from('chat_contexts').select('*', { count: 'exact' });

		if (count && count > 0) {
			console.log('Ya existen datos en la base de datos');
			return;
		}

		// Insertar datos iniciales
		await insertInitialData();
		console.log('Datos insertados correctamente');
	} catch (error) {
		console.error('Error en test:', error);
		throw error;
	}
}
