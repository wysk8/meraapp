// Capa de servicio de IA.
//
// HOY: responde con reglas simples locales (mock), igual que en el prototipo.
// DESPUÉS: reemplazar el cuerpo de askAI() por una llamada a un endpoint propio
// (por ejemplo una Supabase Edge Function) que tenga la API key de Claude
// guardada como secreto del servidor. NUNCA pongas la API key de Claude en
// el frontend — ni en variables VITE_*, porque esas quedan visibles en el
// navegador de cualquiera que abra la app.
//
// Ejemplo de la forma final (cuando exista el backend):
//
//   export async function askAI(question, context) {
//     const res = await fetch("/api/ask-ai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ question, context }),
//     });
//     return (await res.json()).answer;
//   }

export async function askAI(question) {
  const s = question.toLowerCase();
  if (s.includes("mañana")) return "Mañana tienes grabación de la colaboración con la marca de ropa y edición del Short #2. No hay stream planificado todavía.";
  if (s.includes("pendiente")) return "Hay piezas activas en edición y revisión — revisa Contenido para el detalle actualizado.";
  if (s.includes("stream")) return "Basado en lo que mejor funcionó, te sugiero un stream de GTA con invitado sorpresa o una charla abierta con la comunidad.";
  if (s.includes("funcion") || s.includes("semana")) return "El documental corto de Bogotá fue lo más fuerte del mes en YouTube.";
  if (s.includes("marca") || s.includes("plata") || s.includes("financ") || s.includes("gast")) return "Revisa la sección Plata para tus gastos hormiga y el resumen del mes actualizado.";
  return "Todavía uso respuestas de demostración — cuando se conecte la API de Claude podré responder con tus datos reales en tiempo real.";
}
