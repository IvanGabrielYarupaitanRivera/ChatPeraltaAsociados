// src/lib/utils/initialData.ts
import { insertLegalContext } from './embeddings';
import type { LegalContext } from './embeddings';

const systemPrompts: LegalContext[] = [
	{
		category: 'system',
		subcategory: 'sobre_nosotros',
		question: '¿Qué es Peralta Asociados y qué servicios ofrece?',
		prompt: `Peralta Asociados es un prestigioso estudio jurídico ubicado en Huancavelica, fundado por el Dr. Ciro Yarupaitan. Nos especializamos en derecho administrativo, civil, laboral y constitucional, brindando asesoría legal personalizada y representación efectiva tanto a empresas como a personas naturales. Nuestro compromiso es defender los derechos de nuestros clientes con excelencia profesional.`,
		keywords: [
			'estudio jurídico',
			'servicios legales',
			'Ciro Yarupaitan',
			'Huancavelica',
			'asesoría legal'
		]
	},
	{
		category: 'system',
		subcategory: 'objetivo_chatbot',
		question: '¿Qué tipo de ayuda me puede dar este chat y es gratis?',
		prompt: `Este chat está diseñado para darte orientación legal gratuita básica si vives en Huancavelica. Te puedo ayudar con dudas sobre temas administrativos, civiles, laborales y constitucionales. Si tu caso necesita atención profesional, te conectaré con el Dr. Ciro Yarupaitan para una asesoría especializada.`,
		keywords: ['ayuda gratis', 'chat legal', 'dudas derecho', 'asesoría', 'servicios abogado']
	},
	// Contacto y avisos
	{
		category: 'contacto',
		subcategory: 'contacto_legal',
		question: '¿Cómo puedo contactar o visitar las oficinas de Peralta Asociados?',
		prompt: `Puedes contactarnos por WhatsApp al 976762237, por correo a cyarupaitanp@gmail.com o visitarnos en Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica. Atendemos de lunes a viernes de 8:00 AM a 8:00 PM. También puedes encontrarnos en Facebook como PeraltaAsociadosPeru.`,
		keywords: [
			'contacto abogado',
			'dirección oficina',
			'horario atención',
			'whatsapp legal',
			'ubicación estudio'
		]
	},
	{
		category: 'contacto',
		subcategory: 'whatsapp',
		question: '¿Peralta Asociados tiene WhatsApp?',
		prompt: `Sí, puedes contactarnos por WhatsApp al número 976762237 para consultas y agendar citas. Para tu comodidad, haz clic aquí para escribirnos directamente: https://api.whatsapp.com/send?phone=976762237`,
		keywords: [
			'whatsapp abogado',
			'chat directo',
			'contacto rápido',
			'consulta legal',
			'mensaje whatsapp'
		]
	},
	{
		category: 'contacto',
		subcategory: 'web',
		question: '¿Peralta Asociados tiene página web?',
		prompt: `Sí, puedes visitar nuestra página web oficial en www.peraltaasociados.com o hacer clic aquí: https://peraltaasociados.com/. Encontrarás información detallada sobre todos nuestros servicios legales.`,
		keywords: [
			'página web',
			'sitio oficial',
			'web abogados',
			'servicios online',
			'información legal'
		]
	},
	{
		category: 'contacto',
		subcategory: 'facebook',
		question: '¿Peralta Asociados tiene página de Facebook?',
		prompt: `Sí, nos puedes encontrar en Facebook como "PeraltaAsociadosPeru" o hacer clic aquí: https://www.facebook.com/PeraltaAsociadosPeru/. Síguenos para mantenerte informado sobre nuestros servicios y novedades legales.`,
		keywords: [
			'facebook legal',
			'redes sociales',
			'página facebook',
			'abogados facebook',
			'noticias legales'
		]
	},
	{
		category: 'contacto',
		subcategory: 'ubicacion',
		question: '¿Dónde queda la oficina de Peralta Asociados?',
		prompt: `Nuestra oficina está ubicada en Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica. Atendemos de lunes a viernes de 8:00 AM a 8:00 PM. Puedes hacer clic en el siguiente enlace para ver exactamente la ubicación de nuestra oficina gracias a google maps: https://www.google.com/maps/search/-12.783507,+-74.969691?entry=tts&g_ep=EgoyMDI1MDEyOS4xIPu8ASoASAFQAw%3D%3D`,
		keywords: [
			'dirección oficina',
			'ubicación',
			'horario atención',
			'consulta presencial',
			'google maps',
			'mapa'
		]
	},
	{
		category: 'contacto',
		subcategory: 'telefono',
		question: '¿A qué número puedo llamar o escribir para contactarlos?',
		prompt: `Puedes contactarnos al número 976762237 para llamadas o WhatsApp. También atendemos consultas por correo electrónico en cyarupaitanp@gmail.com`,
		keywords: [
			'número contacto',
			'teléfono abogado',
			'whatsapp legal',
			'correo electrónico',
			'comunicación directa'
		]
	}
];

const technicalInfo: LegalContext[] = [
	{
		category: 'tecnico',
		subcategory: 'desarrollador',
		question: '¿Quién creó este chatbot y dónde puedo ver más de sus proyectos?',
		prompt: `El creador de este chatbot es Ivan Yarupaitan Rivera, ingeniero de sistemas. Puedes explorar más de sus proyectos visitando su portafolio en https://www.vanchi.pro/`,
		keywords: ['desarrollador', 'portafolio', 'proyectos', 'ivan yarupaitan', 'ingeniero sistemas']
	},
	{
		category: 'tecnico',
		subcategory: 'tecnologias',
		question: '¿Qué tecnologías se usaron para crear este chatbot?',
		prompt: `Este chatbot fue desarrollado con Svelte 5 y SvelteKit para el frontend, usando Tailwind CSS para el diseño. En el backend se implementó OpenRouter y Supabase Vector para la búsqueda semántica, y está desplegado en Netlify.`,
		keywords: [
			'tecnologías',
			'desarrollo web',
			'inteligencia artificial',
			'stack técnico',
			'herramientas'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'tecnologias_backend',
		question: '¿Qué es Supabase Vector?',
		prompt: `Supabase Vector es una base de datos vectorial que permite almacenar y buscar embeddings (representaciones numéricas de texto) de manera eficiente. En este chatbot se usa para realizar búsquedas semánticas y encontrar respuestas relevantes a las consultas.`,
		keywords: ['base de datos', 'vectores', 'embeddings', 'búsqueda semántica', 'almacenamiento']
	},
	{
		category: 'tecnico',
		subcategory: 'tecnologias_backend',
		question: '¿Qué es OpenRouter?',
		prompt: `OpenRouter es una plataforma que proporciona acceso unificado a diferentes modelos de lenguaje como GPT-4, Claude y otros. En este chatbot se utiliza para procesar las consultas de los usuarios y generar respuestas naturales y precisas.`,
		keywords: [
			'modelo lenguaje',
			'inteligencia artificial',
			'procesamiento texto',
			'chatbot',
			'respuestas IA'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'contacto_desarrollador',
		question: '¿Cómo puedo contactar a Ivan Yarupaitan?',
		prompt: `Puedes contactar a Ivan Yarupaitan a través del formulario de contacto disponible en su página web: https://vanchi.pro/`,
		keywords: [
			'contacto desarrollador',
			'formulario web',
			'ivan yarupaitan',
			'página personal',
			'comunicación'
		]
	}
];

const ciroInfo: LegalContext[] = [
	{
		category: 'info_personal',
		subcategory: 'formacion',
		question: '¿Qué estudios y formación tiene el Dr. Ciro Yarupaitan?',
		prompt: `El Dr. Ciro Yarupaitan es abogado graduado de la Universidad Católica Los Ángeles de Chimbote en 2007. Además, es egresado de la Maestría en Derecho Constitucional y cuenta con especializaciones en Derecho Administrativo, Civil, Laboral y Constitucional.`,
		keywords: [
			'formación académica',
			'estudios derecho',
			'maestría',
			'especializaciones',
			'universidad'
		]
	},
	{
		category: 'info_personal',
		subcategory: 'experiencia',
		question: '¿Cuántos años de experiencia tiene el Dr. Ciro Yarupaitan?',
		prompt: `El Dr. Ciro Yarupaitan cuenta con 17 años de experiencia como abogado y 35 años de trayectoria en el sector público. En 2015, se desempeñó como Juez de Paz Letrado Supernumerario, demostrando su amplia experiencia en el campo legal.`,
		keywords: [
			'experiencia profesional',
			'trayectoria legal',
			'sector público',
			'juez paz',
			'años servicio'
		]
	},
	{
		category: 'info_personal',
		subcategory: 'especializacion',
		question: '¿En qué áreas del derecho se especializa el Dr. Ciro Yarupaitan?',
		prompt: `El Dr. Ciro Yarupaitan está especializado principalmente en Derecho Laboral, Administrativo y Civil. Su formación incluye certificaciones en estas áreas, además del Derecho Constitucional, permitiéndole ofrecer un servicio legal integral.`,
		keywords: ['especialización', 'áreas derecho', 'laboral', 'administrativo', 'civil']
	},
	{
		category: 'info_personal',
		subcategory: 'logros',
		question: '¿Qué logros profesionales destacados tiene el Dr. Ciro Yarupaitan?',
		prompt: `Entre los logros más destacados del Dr. Ciro Yarupaitan está su nombramiento como Juez de Paz Letrado Supernumerario en 2015, su trayectoria de 35 años en el sector público y su experiencia de 17 años como abogado especializado. Su compromiso con la justicia se refleja en su exitosa carrera en el servicio público y el derecho.`,
		keywords: [
			'logros profesionales',
			'carrera judicial',
			'servicio público',
			'trayectoria legal',
			'experiencia destacada'
		]
	}
];

const legalData: LegalContext[] = [
	// Derecho Administrativo
	{
		category: 'derecho_administrativo',
		subcategory: 'servicios',
		question: '¿Qué servicios ofrece Peralta Asociados en derecho administrativo?',
		prompt: `Nos especializamos en defender tus derechos ante entidades públicas, incluyendo procesos disciplinarios en el sector público, PNP y Sunafil. También gestionamos trámites administrativos, apelaciones y ayudamos a resolver conflictos con instituciones del Estado.`,
		keywords: [
			'derecho administrativo',
			'procesos disciplinarios',
			'trámites públicos',
			'apelaciones',
			'defensa legal'
		]
	},
	{
		category: 'derecho_civil',
		subcategory: 'servicios',
		question: '¿Qué servicios de derecho civil ofrece Peralta Asociados?',
		prompt: `Brindamos asesoría completa en casos de pensión de alimentos, incluyendo demandas y modificaciones. También manejamos conciliaciones, ejecución de acuerdos, prescripción adquisitiva de propiedades y asuntos familiares.`,
		keywords: [
			'derecho civil',
			'pensión alimentos',
			'conciliaciones',
			'propiedades',
			'asuntos familia'
		]
	},
	{
		category: 'derecho_laboral',
		subcategory: 'servicios',
		question: '¿Qué servicios de derecho laboral ofrece Peralta Asociados?',
		prompt: `Te defendemos contra despidos injustificados y ayudamos a reclamar tus beneficios sociales como CTS, gratificaciones y vacaciones. También gestionamos indemnizaciones y procesos de reincorporación laboral.`,
		keywords: [
			'derecho laboral',
			'despido injusto',
			'beneficios sociales',
			'indemnización',
			'reincorporación'
		]
	},
	{
		category: 'derecho_constitucional',
		subcategory: 'servicios',
		question: '¿Qué servicios de derecho constitucional ofrece Peralta Asociados?',
		prompt: `Protegemos tus derechos fundamentales mediante acciones de amparo, habeas corpus contra detenciones arbitrarias y acciones de cumplimiento de sentencias. Nos especializamos en la defensa de derechos constitucionales.`,
		keywords: [
			'derecho constitucional',
			'amparo legal',
			'habeas corpus',
			'derechos fundamentales',
			'cumplimiento sentencias'
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

		// Insertar datos de Ciro Yarupaitan
		for (const info of ciroInfo) {
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
