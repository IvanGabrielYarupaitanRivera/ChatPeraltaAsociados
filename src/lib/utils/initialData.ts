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
	{
		category: 'system',
		subcategory: 'objetivo_chatbot',
		question: '¿Cuál es el objetivo o función de este chat o chatbot?',
		prompt: `Este chat está diseñado para brindarte orientación legal gratuita en Huancavelica. Mi función es ayudarte con consultas básicas sobre temas legales y, cuando sea necesario, conectarte con el Dr. Ciro Yarupaitan para una asesoría profesional especializada.`,
		keywords: [
			'asistente legal',
			'orientación gratuita',
			'consultas básicas',
			'ayuda jurídica',
			'asesoría virtual'
		]
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
		subcategory: 'contacto_legal',
		question: '¿Cómo puedo contactarme con el Dr. Ciro Yarupaitan Peralta?',
		prompt: `Para contactar al Dr. Ciro Yarupaitan, puedes escribirle al WhatsApp 976762237, enviar un correo a cyarupaitanp@gmail.com, o visitarlo en Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica. Atendemos de lunes a viernes, 8:00 AM a 8:00 PM.`,
		keywords: [
			'contacto doctor',
			'número whatsapp',
			'correo abogado',
			'ubicación oficina',
			'horario atención'
		]
	},
	{
		category: 'contacto',
		subcategory: 'whatsapp',
		question: '¿Peralta Asociados tiene WhatsApp?',
		prompt: `Sí, puedes contactarnos por WhatsApp al número 976762237 para consultas y agendar citas. Enlace: https://api.whatsapp.com/send?phone=976762237`,
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
		prompt: `Sí, puedes visitar nuestra página web oficial donde encontrarás información detallada sobre todos nuestros servicios legales. Enlace: https://peraltaasociados.com/`,
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
		prompt: `Sí, nos puedes encontrar en Facebook como "PeraltaAsociadosPeru".Síguenos para mantenerte informado sobre nuestros servicios y novedades legales. Enlance: https://www.facebook.com/PeraltaAsociadosPeru/.`,
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
		prompt: `Nuestra oficina está ubicada en Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica. Atendemos de lunes a viernes de 8:00 AM a 8:00 PM. Puedes hacer clic en el siguiente enlace para ver exactamente la ubicación de nuestra oficina gracias a google maps. Enlace: https://www.google.com/maps/search/-12.783507,+-74.969691?entry=tts&g_ep=EgoyMDI1MDEyOS4xIPu8ASoASAFQAw%3D%3D`,
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
		subcategory: 'ubicacion',
		question: '¿En qué lugar exacto se ubica la oficina de Peralta Asociados?',
		prompt: `Nuestra oficina está ubicada en Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica. Atendemos de lunes a viernes de 8:00 AM a 8:00 PM. Puedes hacer clic en el siguiente enlace para ver exactamente la ubicación de nuestra oficina gracias a google maps. Enlace: https://www.google.com/maps/search/-12.783507,+-74.969691?entry=tts&g_ep=EgoyMDI1MDEyOS4xIPu8ASoASAFQAw%3D%3D`,
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
		subcategory: 'ubicacion',
		question: '¿Cuál es la dirección donde está Peralta Asociados?',
		prompt: `Nuestra oficina está ubicada en Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica. Atendemos de lunes a viernes de 8:00 AM a 8:00 PM. Puedes hacer clic en el siguiente enlace para ver exactamente la ubicación de nuestra oficina gracias a google maps. Enlace: https://www.google.com/maps/search/-12.783507,+-74.969691?entry=tts&g_ep=EgoyMDI1MDEyOS4xIPu8ASoASAFQAw%3D%3D`,
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
		subcategory: 'ubicacion',
		question: '¿Me podrías indicar la localización de la oficina principal de Peralta Asociados?',
		prompt: `Nuestra oficina está ubicada en Jr. Mayta Cápac 215, Barrio San Cristóbal, Huancavelica. Atendemos de lunes a viernes de 8:00 AM a 8:00 PM. Puedes hacer clic en el siguiente enlace para ver exactamente la ubicación de nuestra oficina gracias a google maps. Enlace: https://www.google.com/maps/search/-12.783507,+-74.969691?entry=tts&g_ep=EgoyMDI1MDEyOS4xIPu8ASoASAFQAw%3D%3D`,
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
	},
	{
		category: 'servicios',
		subcategory: 'consultas',
		question: '¿Cómo puedo agendar una consulta presencial?',
		prompt: `Para programar una consulta presencial, puedes contactarnos al 976762237 por llamada o WhatsApp. La primera consulta es gratuita y evaluaremos tu caso detalladamente.`,
		keywords: [
			'consulta presencial',
			'cita personal',
			'reunión abogado',
			'visita oficina',
			'atención directa'
		]
	},
	{
		category: 'servicios',
		subcategory: 'consultas',
		question: '¿En qué horario atienden las consultas presenciales?',
		prompt: `Atendemos consultas presenciales de lunes a viernes en horario de oficina. Te recomendamos agendar una cita previamente llamando al 976762237 para asegurar nuestra disponibilidad.`,
		keywords: [
			'horario atención',
			'horario consultas',
			'citas disponibles',
			'atención presencial',
			'agenda consultas'
		]
	},
	{
		category: 'servicios',
		subcategory: 'costos',
		question: '¿Cuánto cuestan los servicios de Peralta Asociados?',
		prompt: `Los costos de nuestros servicios varían según el tipo y complejidad del caso. Te invitamos a una consulta inicial gratuita donde evaluaremos tu caso y te brindaremos un presupuesto detallado. Ofrecemos planes de pago flexibles para tu comodidad.`,
		keywords: [
			'costos servicios',
			'precios legales',
			'presupuesto',
			'planes pago',
			'tarifas abogado'
		]
	},
	{
		category: 'servicios',
		subcategory: 'consultas',
		question: '¿Dan consultas gratuitas?',
		prompt: `Sí, ofrecemos una primera consulta totalmente gratuita donde evaluamos tu caso y te brindamos una orientación inicial. Durante esta consulta, podremos determinar la mejor estrategia legal para tu situación particular.`,
		keywords: [
			'consulta gratis',
			'asesoría gratuita',
			'primera cita',
			'evaluación caso',
			'orientación legal'
		]
	},
	{
		category: 'servicios',
		subcategory: 'cobertura',
		question: '¿Atienden casos fuera de Huancavelica?',
		prompt: `Aunque nuestra oficina principal está en Huancavelica, podemos atender casos en otras localidades según su naturaleza. Para casos que requieran atención presencial fuera de Huancavelica, evaluaremos la viabilidad durante la consulta inicial.`,
		keywords: [
			'cobertura legal',
			'atención regional',
			'casos externos',
			'servicios fuera',
			'otras localidades'
		]
	},
	{
		category: 'servicios',
		subcategory: 'horario',
		question: '¿Cuál es el horario de atención para consultas?',
		prompt: `Atendemos consultas de lunes a viernes de 8:00 AM a 8:00 PM en nuestra oficina. Para consultas por WhatsApp, también puedes escribirnos en ese horario al 976762237 y te responderemos a la brevedad posible.`,
		keywords: [
			'horario atención',
			'consultas legales',
			'disponibilidad',
			'horas oficina',
			'atención cliente'
		]
	},
	{
		category: 'servicios',
		subcategory: 'tiempo_casos',
		question: '¿Cuánto tiempo toma resolver un caso típico?',
		prompt: `El tiempo de resolución varía según la complejidad y tipo de caso. Durante la consulta inicial evaluaremos tu situación específica y te daremos un estimado realista del tiempo que podría tomar. Nos comprometemos a gestionar tu caso con la mayor diligencia posible.`,
		keywords: [
			'tiempo resolución',
			'duración proceso',
			'plazos legales',
			'gestión casos',
			'estimación tiempo'
		]
	},
	{
		category: 'servicios',
		subcategory: 'documentos',
		question: '¿Qué documentos necesito para una consulta inicial?',
		prompt: `Para la primera consulta, es recomendable traer tu DNI y cualquier documento relacionado con tu caso (contratos, notificaciones, denuncias, etc.). Esto nos permitirá evaluar mejor tu situación y brindarte una orientación más precisa.`,
		keywords: [
			'documentos necesarios',
			'requisitos consulta',
			'papeles legales',
			'primera cita',
			'documentación'
		]
	},
	{
		category: 'servicios',
		subcategory: 'experiencia',
		question: '¿Tienen experiencia con casos similares al mío?',
		prompt: `Sí, contamos con más de 17 años de experiencia manejando diversos casos legales. Durante la consulta inicial, el Dr. Ciro Yarupaitan evaluará tu situación específica y te compartirá casos similares que hemos resuelto exitosamente, manteniendo siempre la confidencialidad de nuestros clientes.`,
		keywords: [
			'experiencia legal',
			'casos exitosos',
			'trayectoria',
			'antecedentes',
			'historial casos'
		]
	},
	{
		category: 'servicios',
		subcategory: 'resultados',
		question: '¿Qué pasa si pierdo mi caso?',
		prompt: `En caso de un resultado desfavorable, evaluaremos todas las opciones legales disponibles, incluyendo la posibilidad de apelación. Nuestro compromiso es defender tus derechos hasta agotar todas las instancias legales permitidas, siempre manteniéndote informado de cada paso.`,
		keywords: [
			'resultado negativo',
			'opciones legales',
			'apelación',
			'defensa derechos',
			'proceso legal'
		]
	},
	{
		category: 'servicios',
		subcategory: 'citas',
		question: '¿Cómo programo una cita con el Dr. Ciro o con Peralta Asociados?',
		prompt: `Puedes programar una cita llamando o escribiendo al WhatsApp 976762237, enviando un correo a cyarupaitanp@gmail.com, o visitando nuestra oficina en Jr. Mayta Cápac 215, Huancavelica. Atendemos de lunes a viernes de 8:00 AM a 8:00 PM.`,
		keywords: [
			'agendar cita',
			'consulta legal',
			'reservar horario',
			'primera visita',
			'programación'
		]
	},
	{
		category: 'servicios',
		subcategory: 'sucursales',
		question: '¿Tienen sucursales en otras ciudades?',
		prompt: `Actualmente nuestra única oficina se encuentra en Huancavelica, en Jr. Mayta Cápac 215, Barrio San Cristóbal. Sin embargo, podemos atender casos de otras localidades evaluando cada situación particular durante la consulta inicial.`,
		keywords: ['sucursales', 'otras sedes', 'oficinas', 'cobertura regional', 'atención local']
	},
	{
		category: 'servicios',
		subcategory: 'pagos',
		question: '¿Qué métodos de pago aceptan?',
		prompt: `Aceptamos diversos métodos de pago para tu comodidad, incluyendo efectivo, transferencias bancarias y pagos por aplicaciones móviles (Yape). Durante la consulta inicial, discutiremos las opciones de pago y planes flexibles disponibles para tu caso.`,
		keywords: ['métodos pago', 'formas pago', 'transferencias', 'efectivo', 'facilidades pago']
	},
	{
		category: 'tecnico',
		subcategory: 'privacidad',
		question: '¿El chatbot guarda mi información personal?',
		prompt: `Este chatbot no almacena información personal ni el historial de conversaciones. Todas las consultas son confidenciales y se procesan de forma anónima. Para una asesoría personalizada, te recomendamos contactar directamente con nuestro estudio.`,
		keywords: [
			'privacidad',
			'confidencialidad',
			'datos personales',
			'seguridad chat',
			'información personal'
		]
	}
];

const technicalInfo: LegalContext[] = [
	{
		category: 'tecnico',
		subcategory: 'desarrollador',
		question: '¿Quién creó este chatbot y dónde puedo ver más de sus proyectos?',
		prompt: `El creador de este chatbot es Ivan Yarupaitan Rivera, ingeniero de sistemas. Puedes explorar más de sus proyectos visitando su portafolio en vanchi.pro. Enlace: https://vanchi.pro/`,
		keywords: ['desarrollador', 'portafolio', 'proyectos', 'ivan yarupaitan', 'ingeniero sistemas']
	},
	{
		category: 'tecnico',
		subcategory: 'desarrollador_perfil',
		question: '¿Quién es el ingeniero que desarrolló este sistema?',
		prompt: `Este sistema fue desarrollado por Ivan Yarupaitan Rivera, ingeniero de sistemas especializado en desarrollo web e inteligencia artificial. Puedes conocer más sobre su trabajo profesional en su portafolio. Enlace: https://vanchi.pro/`,
		keywords: [
			'ingeniero sistemas',
			'desarrollador web',
			'especialista ia',
			'ivan yarupaitan',
			'perfil profesional'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'desarrollador',
		question: '¿Quién creó este chat o proyecto?',
		prompt: `El creador de este chatbot es Ivan Yarupaitan Rivera, ingeniero de sistemas. Puedes explorar más de sus proyectos visitando su portafolio en vanchi.pro. Enlace: https://vanchi.pro/`,
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
		prompt: `Puedes contactar a Ivan Yarupaitan a través del formulario de contacto disponible en su página web. Enlace: https://vanchi.pro/. También puedes ver su perfil en LinkedIn para más información. Enlace: https://www.linkedin.com/in/ivan-yarupaitan-rivera/`,
		keywords: [
			'contacto desarrollador',
			'formulario web',
			'ivan yarupaitan',
			'página personal',
			'comunicación'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'desarrollador_stack',
		question: '¿Qué tecnologías usó Ivan para crear este chatbot?',
		prompt: `Este chatbot fue desarrollado usando Svelte 5 y SvelteKit para el frontend, Tailwind CSS para el diseño, y tecnologías de IA como OpenRouter y búsqueda semántica. El proyecto está desplegado en Netlify para garantizar alta disponibilidad. Enlaces:
		GitHub: https://github.com/IvanGabrielYarupaitanRivera
		Portafolio: https://vanchi.pro/`,
		keywords: [
			'tecnologías usadas',
			'stack técnico',
			'desarrollo web',
			'herramientas ia',
			'frameworks'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'desarrollador_contacto',
		question: '¿Cómo puedo contactar a Ivan para un proyecto similar?',
		prompt: `Si estás interesado en desarrollar un proyecto similar, puedes contactar a Ivan Yarupaitan a través de:
		Portafolio: https://vanchi.pro/
		LinkedIn: https://www.linkedin.com/in/ivan-yarupaitan-rivera/
		GitHub: https://github.com/IvanGabrielYarupaitanRivera`,
		keywords: [
			'contacto desarrollador',
			'proyectos similares',
			'portafolio ivan',
			'desarrollo chatbot',
			'servicios tech'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'desarrollador_info',
		question: '¿Dónde puedo ver más trabajos o el perfil profesional de Ivan Yarupaitan?',
		prompt: `Puedes conocer más sobre Ivan Yarupaitan y su trabajo profesional en:
		Portafolio: https://vanchi.pro/
		LinkedIn: https://www.linkedin.com/in/ivan-yarupaitan-rivera/
		GitHub: https://github.com/IvanGabrielYarupaitanRivera`,
		keywords: [
			'perfil profesional',
			'portafolio ivan',
			'redes profesionales',
			'github proyectos',
			'contacto desarrollador'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'desarrollador_info',
		question: '¿Quién es Ivan Yarupaitan?',
		prompt: `Ivan Yarupaitan Rivera es un ingeniero de sistemas que desarrolló este chatbot para Peralta Asociados. Es especialista en desarrollo web y aplicaciones con inteligencia artificial. Puedes conocer más sobre su trabajo visitando su portafolio. Enlace: https://vanchi.pro/`,
		keywords: [
			'desarrollador web',
			'ivan yarupaitan',
			'ingeniero sistemas',
			'creador chatbot',
			'profesional tech'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'mantenimiento',
		question: '¿Quién mantiene actualizado el chatbot?',
		prompt: `El chatbot es mantenido y actualizado regularmente por Ivan Yarupaitan Rivera, garantizando que la información legal esté al día y que el sistema funcione correctamente. Las actualizaciones se realizan según los cambios en la legislación y las necesidades del estudio.`,
		keywords: [
			'actualización sistema',
			'mantenimiento bot',
			'información vigente',
			'soporte técnico',
			'funcionamiento chat'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'precision',
		question: '¿Cómo se aseguran que las respuestas sean precisas?',
		prompt: `Las respuestas del chatbot se basan en información legal verificada por el Dr. Ciro Yarupaitan y son actualizadas regularmente. El sistema utiliza tecnología de búsqueda semántica para encontrar la información más relevante y precisa para cada consulta.`,
		keywords: [
			'precisión legal',
			'información verificada',
			'respuestas exactas',
			'búsqueda semántica',
			'validación datos'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'disponibilidad',
		question: '¿Este chat funciona las 24 horas?',
		prompt: `Sí, el chatbot está disponible 24/7 para consultas básicas. Sin embargo, para asesorías personalizadas, respetamos el horario de atención del estudio: lunes a viernes de 8:00 AM a 8:00 PM.`,
		keywords: [
			'disponibilidad',
			'horario chat',
			'atención continua',
			'servicio 24/7',
			'acceso permanente'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'accesibilidad',
		question: '¿Puedo usar este chat desde mi celular?',
		prompt: `Sí, el chat está optimizado para funcionar en cualquier dispositivo, ya sea celular, tablet o computadora. Su diseño responsivo garantiza una experiencia fluida sin importar el tamaño de pantalla que uses.`,
		keywords: ['versión móvil', 'responsive', 'multiplataforma', 'acceso móvil', 'compatibilidad']
	},
	{
		category: 'tecnico',
		subcategory: 'idiomas',
		question: '¿El chat puede atender en otros idiomas?',
		prompt: `Actualmente, el chatbot solo atiende consultas en español para garantizar la precisión de las respuestas legales en el contexto peruano. Esto nos permite brindar una mejor orientación a nuestros usuarios de Huancavelica.`,
		keywords: [
			'idioma español',
			'lengua atención',
			'comunicación',
			'servicio español',
			'atención idiomas'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'seguridad',
		question: '¿Qué tan seguras son las conversaciones en este chat?',
		prompt: `Las conversaciones son completamente seguras y anónimas. No guardamos información personal ni historial de consultas. Todo se procesa de forma confidencial y se elimina al cerrar el navegador o al hacer clic en "Nueva conversación".`,
		keywords: ['seguridad chat', 'privacidad', 'confidencialidad', 'protección datos', 'anonimato']
	},
	{
		category: 'tecnico',
		subcategory: 'errores',
		question: '¿Cómo reporto un error en el chatbot?',
		prompt: `Si encuentras algún error en el chatbot, puedes reportarlo enviando un mensaje al WhatsApp 976762237 o al correo cyarupaitanp@gmail.com, describiendo el problema encontrado. Tu feedback nos ayuda a mejorar el servicio.`,
		keywords: [
			'reportar error',
			'problemas técnicos',
			'feedback',
			'soporte chat',
			'mejoras sistema'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'actualizacion',
		question: '¿Las respuestas del chat están actualizadas con las leyes vigentes?',
		prompt: `Sí, el contenido legal del chatbot se actualiza regularmente según los cambios en la legislación peruana. El Dr. Ciro Yarupaitan supervisa la información para garantizar que las respuestas estén alineadas con las leyes vigentes.`,
		keywords: [
			'leyes vigentes',
			'actualización legal',
			'normativa actual',
			'información vigente',
			'contenido legal'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'ventajas',
		question: '¿Qué ventajas tiene usar este chat versus llamar directamente?',
		prompt: `El chat está disponible 24/7, te da respuestas inmediatas y puedes consultarlo desde cualquier dispositivo. Además, es gratuito y te ayuda a tener una idea inicial de tu caso antes de contactar al abogado, ahorrándote tiempo.`,
		keywords: [
			'disponibilidad',
			'respuesta inmediata',
			'acceso fácil',
			'servicio gratuito',
			'orientación inicial'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'tiempo_respuesta',
		question: '¿Cuánto tiempo toma normalmente obtener una respuesta?',
		prompt: `Las respuestas del chatbot son instantáneas. El sistema procesa tu consulta y te brinda información relevante en segundos, permitiéndote obtener orientación legal básica de manera inmediata.`,
		keywords: [
			'respuesta rápida',
			'tiempo espera',
			'instantáneo',
			'velocidad chat',
			'atención inmediata'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'memoria',
		question: '¿El chat puede recordar conversaciones anteriores?',
		prompt: `No, por razones de privacidad, el chat no guarda el historial de conversaciones. Cada vez que inicias una nueva consulta o cierras el navegador, la conversación anterior se elimina completamente.`,
		keywords: [
			'historial chat',
			'memoria conversación',
			'privacidad',
			'nueva consulta',
			'datos temporales'
		]
	},
	{
		category: 'tecnico',
		subcategory: 'feedback',
		question: '¿Cómo puedo dar feedback sobre el servicio del chatbot?',
		prompt: `Puedes enviar tus comentarios y sugerencias sobre el chatbot al WhatsApp 976762237 o al correo cyarupaitanp@gmail.com. Tu feedback nos ayuda a mejorar constantemente el servicio.`,
		keywords: ['comentarios', 'sugerencias', 'mejoras', 'opinión usuario', 'retroalimentación']
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
