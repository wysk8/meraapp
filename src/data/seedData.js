// Datos de ejemplo — se usan solo la primera vez que se abre la app
// (o mientras no haya Supabase conectado). No representan cifras reales.

export const CONTENT_ITEMS_SEED = [
  { id: 1, title: "Stream: GTA con Andresitow", platform: "Kick", stage: "PLANIFICADO", when_text: "Hoy · 7:00 PM", note: "Definir horario final con Andresitow" },
  { id: 2, title: '"La historia que nadie te contó" — barrio Egipto', platform: "YouTube", stage: "EDITANDO", when_text: "Sin fecha", note: "Falta color y miniatura" },
  { id: 3, title: "Reacción al bug del nuevo GTA", platform: "Shorts", stage: "GRABANDO", when_text: "Hoy", note: "3 clips del stream de ayer" },
  { id: 4, title: "Bit random en TransMilenio", platform: "TikTok", stage: "IDEA", when_text: "Sin fecha", note: "Kevin la propuso en el grupo" },
  { id: 5, title: "Reel colaboración con marca de ropa", platform: "Reels", stage: "REVISION", when_text: "Vence mañana", note: "Esperando aprobación de la marca" },
  { id: 6, title: "Documental corto: la vida en Bogotá", platform: "YouTube", stage: "PUBLICADO", when_text: "Hace 4 días", note: "187K vistas — mejor semana del canal" },
  { id: 7, title: "Stream: charla + comunidad viernes", platform: "Kick", stage: "PLANIFICADO", when_text: "Viernes · 8:00 PM", note: "" },
  { id: 8, title: "Momentos del stream — recopilación", platform: "Shorts", stage: "IDEA", when_text: "Sin fecha", note: "" },
];

export const PENDIENTES_SEED = [
  { id: 1, title: "Confirmar colaboración con marca de ropa", tag: "Negocio", level: "urgente", must: true, when_text: "Hoy" },
  { id: 2, title: "Revisar miniatura del video de YouTube", tag: "Contenido", level: "importante", must: true, when_text: "Hoy" },
  { id: 3, title: "Responder mensajes de la comunidad en Kick", tag: "Comunidad", level: "normal", must: false, when_text: "Hoy" },
  { id: 4, title: "Comprar dominio para la página (si se aprueba)", tag: "Negocio", level: "opcional", must: false, when_text: "Mañana" },
  { id: 5, title: "Coordinar grabación con Andresitow", tag: "Contenido", level: "importante", must: true, when_text: "Mañana" },
];

export const AGENDA_HOY_SEED = [
  { time: "10:00 AM", title: "Reunión con editor", type: "meet" },
  { time: "2:00 PM", title: "Grabación video YouTube", type: "record" },
  { time: "5:00 PM", title: "Tiempo libre / gym", type: "life" },
  { time: "7:00 PM", title: "Stream en Kick — GTA con Andresitow", type: "stream" },
  { time: "11:30 PM", title: "Descanso", type: "life" },
];

export const AGENDA_SEMANA = [
  { day: "Mañana", items: ["Grabación colaboración marca", "Editar Short #2"] },
  { day: "Viernes", items: ["Stream: charla + comunidad · 8:00 PM"] },
  { day: "Sábado", items: ["Publicar documental corto", "Día libre"] },
];

export const IDEAS_SEED = [
  { id: 1, title: "Stream de GTA con X invitado", platform: "Kick", format: "Stream", potential: "Alto" },
  { id: 2, title: "Reto 24h caminando por la calle", platform: "YouTube", format: "Video largo", potential: "Alto" },
  { id: 3, title: "Documental: la vida en Bogotá", platform: "YouTube", format: "Documental", potential: "Medio" },
  { id: 4, title: "Colaboración con marca de ropa", platform: "Instagram", format: "Reel patrocinado", potential: "Medio" },
];

export const FINANCES_SEED = [
  { id: 1, type: "ingreso", category: "plataforma", desc: "Kick", amount: 8200000 },
  { id: 2, type: "ingreso", category: "plataforma", desc: "YouTube", amount: 3100000 },
  { id: 3, type: "ingreso", category: "plataforma", desc: "Otros", amount: 1150000 },
  { id: 4, type: "gasto", category: "recurrente", desc: "Internet + servicios stream", amount: 420000 },
  { id: 5, type: "gasto", category: "recurrente", desc: "Equipo / suscripciones", amount: 310000 },
  { id: 6, type: "gasto", category: "recurrente", desc: "Producción de contenido", amount: 1100000 },
  { id: 7, type: "gasto", category: "hormiga", desc: "Papas de paquete", amount: 5000 },
  { id: 8, type: "gasto", category: "hormiga", desc: "Gaseosa", amount: 3500 },
  { id: 9, type: "gasto", category: "hormiga", desc: "Dulces", amount: 2000 },
];

export const STATS_PLATAFORMAS = [
  { name: "Kick", key: "Kick", viewsK: 342.5, followers: "+1.8K seguidores", change: 24 },
  { name: "YouTube", key: "YouTube", viewsK: 187.3, followers: "+612 suscriptores", change: 32 },
  { name: "TikTok", key: "TikTok", viewsK: 96.7, followers: "Mejor semana del mes", change: 41 },
  { name: "Instagram", key: "Reels", viewsK: 58.2, followers: "Bajó por menos Reels", change: -6 },
];
