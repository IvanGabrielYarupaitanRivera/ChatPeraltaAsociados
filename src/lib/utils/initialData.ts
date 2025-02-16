// src/lib/utils/initialData.ts
import { insertLegalContext } from './embeddings';
import type { LegalContext } from './embeddings';

const systemPrompts: LegalContext[] = [
	// Información institucional
	{
		category: 'system',
		subcategory: 'sobre_nosotros',
		prompt: `Estudio jurídico Peralta Asociados:
	  - Fundado por Dr. Ciro Yarupaitan en Huancavelica
	  - Especialistas en derecho administrativo, civil, laboral y constitucional
	  - Brindamos orientación clara y derivamos casos complejos`,
		keywords: [
			// Identidad
			'estudio',
			'law firm',
			'bufete',
			'office',
			// Rol
			'asistente',
			'assistant',
			'especialista',
			'specialist',
			// Servicios
			'legal',
			'law',
			'servicios',
			'services',
			'asesoría',
			'advice'
		]
	},
	{
		category: 'system',
		subcategory: 'objetivo_chatbot',
		prompt: `Propósito del Asistente Legal con Inteligencia Artificial:
		  - Brindar orientación legal inicial gratuita para Huancavelica
		  - Responder consultas sobre derecho administrativo, civil, laboral y constitucional
		  - Recomendar servicios especializados de Peralta Asociados
		  - Facilitar el contacto con el Dr. Ciro Yarupaitan para casos específicos`,
		keywords: [
			// Propósito
			'asistencia',
			'assistance',
			'orientación',
			'guidance',
			'ayuda',
			'help',

			// Rol
			'asistente',
			'assistant',
			'chatbot',
			'bot',

			// Función
			'consulta',
			'inquiry',
			'asesoría',
			'advice',
			'contacto',
			'contact',

			// Servicios
			'legal',
			'law',
			'gratuito',
			'free',
			'especializado',
			'specialized'
		]
	},
	// Contacto y avisos
	{
		category: 'system',
		subcategory: 'contacto_legal',
		prompt: `Información de Contacto - Peralta Asociados: 
		WhatsApp, Número: 976762237 y Enlace directo para chatear: https://api.whatsapp.com/send?phone=976762237. Correo Electrónico, Email: cyarupaitanp@gmail.com. Ubicación de la Oficina, Dirección: Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica, Enlace a Google Maps: https://www.google.com/maps/place/12%C2%B047'00.6%22S+74%C2%B058'10.9%22W/@-12.783507,-74.969691,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-12.783507!4d-74.969691?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D. Horario de Atención, Lunes a Viernes de 8:00 AM a 8:00 PM. Redes Sociales y Página Web, Facebook: https://facebook.com/PeraltaAsociadosPeru/, Página web: https://peraltaasociados.com`,
		keywords: [
			// Contacto
			'contacto',
			'contact',
			'whatsapp',
			'email',
			'ubicación',
			'location',
			// Horario
			'horario',
			'schedule',
			'atención',
			'attention',
			// Legal
			'aviso',
			'notice',
			'advertencia',
			'warning',
			'disclaimer',
			'legal'
		]
	}
];

const technicalInfo: LegalContext[] = [
	{
		category: 'tecnico',
		subcategory: 'informacion_proyecto',
		prompt: `El creador y desarrollador de este chatbot con inteligencia artificial es el ingeniero de sistemas Ivan Yarupaitan Rivera, puedes encontrar más proyectos en su portafolio ingresando al siguiente link https://www.vanchi.pro/. El proyecto se desarrolló utilizando Svelte 5, SvelteKit y Tailwind CSS para el frontend, mientras que en el backend se implementó OpenRouter y Supabase Vector. Cuenta con búsqueda semántica como funcionalidad clave y está desplegado en Netlify.`,
		keywords: [
			// Desarrollador
			'desarrollador',
			'developer',
			'ingeniero',
			'engineer',
			'autor',
			'creator',

			// Frontend
			'svelte',
			'sveltekit',
			'tailwind',
			'ui',

			// Backend
			'openrouter',
			'supabase',
			'ia',
			'ai',

			// Características
			'chat',
			'búsqueda',
			'tiempo-real',
			'embeddings',

			// Proyecto
			'fullstack',
			'portfolio',
			'netlify',
			'deploy'
		]
	}
];

const legalData: LegalContext[] = [
	// Derecho Administrativo
	{
		category: 'derecho_administrativo',
		subcategory: 'servicios',
		prompt: `Especialistas en derecho administrativo: 
	  - Defensa en procedimientos disciplinarios (sector público, privado, PNP, Sunafil)
	  - Trámites y gestiones ante entidades públicas
	  - Recursos administrativos y apelaciones
	  - Resolución de conflictos con el Estado`,
		keywords: [
			// Términos principales
			'administrativo',
			'disciplinario',
			'público',
			// Entidades
			'PNP',
			'Sunafil',
			'estado',
			'gobierno',
			// Acciones
			'sanción',
			'trámite',
			'recurso',
			'gestión',
			// Procesos
			'procedimiento',
			'defensa',
			'apelación'
		]
	},

	// Derecho Civil
	{
		category: 'derecho_civil',
		subcategory: 'servicios',
		prompt: `Asesoría integral en derecho civil:
	  - Pensión de alimentos (demandas, modificaciones, ejecución)
	  - Conciliaciones y ejecución de acuerdos
	  - Prescripción adquisitiva de propiedades
	  - Asuntos de familia y propiedad`,
		keywords: [
			// Términos principales
			'civil',
			'familia',
			'propiedad',
			// Procesos
			'alimentos',
			'pensión',
			'conciliación',
			// Acciones
			'demandar',
			'ejecutar',
			'prescribir',
			// Documentos
			'acuerdo',
			'título',
			'contrato'
		]
	},

	// Derecho Laboral
	{
		category: 'derecho_laboral',
		subcategory: 'servicios',
		prompt: `Defensa de derechos laborales:
	  - Protección contra despidos injustificados
	  - Reclamo de beneficios sociales (CTS, gratificaciones, vacaciones)
	  - Indemnizaciones y liquidaciones
	  - Reincorporación laboral`,
		keywords: [
			// Términos principales
			'laboral',
			'trabajo',
			'empleo',
			// Beneficios
			'cts',
			'gratificación',
			'vacaciones',
			// Acciones
			'despido',
			'reposición',
			'reclamo',
			// Derechos
			'beneficios',
			'indemnización',
			'remuneración'
		]
	},

	// Derecho Constitucional
	{
		category: 'derecho_constitucional',
		subcategory: 'servicios',
		prompt: `Protección de derechos constitucionales:
	  - Acciones de amparo por vulneración de derechos
	  - Habeas corpus contra detenciones arbitrarias
	  - Acciones de cumplimiento de sentencias
	  - Defensa de derechos fundamentales`,
		keywords: [
			// Términos principales
			'constitucional',
			'derechos',
			'fundamental',
			// Acciones
			'amparo',
			'habeas_corpus',
			'cumplimiento',
			// Procesos
			'protección',
			'libertad',
			'ejecución',
			// Documentos
			'sentencia',
			'resolución',
			'mandato'
		]
	}
];

export async function insertInitialData() {
	try {
		// Insertar prompts del sistema
		for (const prompt of systemPrompts) {
			await insertLegalContext(prompt);
		}

		// Insertar información técnica
		for (const info of technicalInfo) {
			await insertLegalContext(info);
		}

		// Insertar datos legales
		for (const data of legalData) {
			await insertLegalContext(data);
		}

		console.log('Datos iniciales insertados correctamente');
	} catch (error) {
		console.error('Error insertando datos:', error);
		throw error;
	}
}
