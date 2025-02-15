// src/routes/admin/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { insertInitialData } from '$lib/utils/initialData';
import { supabase } from '$lib/services/supabase';

export const load: PageServerLoad = async () => {
	// Verificar datos existentes
	const { count } = await supabase.from('chat_contexts').select('*', { count: 'exact' });

	return {
		hasData: count && count > 0
	};
};

export const actions = {
	insert: async () => {
		try {
			// Verificar si ya existen datos
			const { count } = await supabase.from('chat_contexts').select('*', { count: 'exact' });

			if (count && count > 0) {
				return fail(400, {
					error: 'Ya existen datos en la base de datos'
				});
			}

			// Insertar datos
			await insertInitialData();

			return {
				success: true,
				message: 'Datos insertados correctamente'
			};
		} catch (error) {
			console.error('Error:', error);
			return fail(500, {
				error: 'Error insertando datos'
			});
		}
	}
} satisfies Actions;
