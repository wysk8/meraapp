// Sistema visual de MeraPela — NO tocar sin aprobación explícita del cliente.
// Esta paleta y estos nombres son la identidad de marca aprobada.

export const T = {
  bg: "#050505",
  card: "rgba(255,255,255,0.035)",
  cardBorder: "rgba(255,255,255,0.1)",
  line: "rgba(255,255,255,0.08)",
  text: "#F1F2ED",
  textDim: "#9A9C93",
  textFaint: "#5C5E56",
  green: "#CCFF1A",
  greenGlow: "rgba(204,255,26,0.4)",
  greenSoft: "rgba(204,255,26,0.12)",
  violet: "#8D7CF6",
  violetGlow: "rgba(141,124,246,0.45)",
  violetSoft: "rgba(141,124,246,0.14)",
  blue: "#5B98F0",
  blueSoft: "rgba(91,152,240,0.14)",
  red: "#E4233A",
  redGlow: "rgba(228,35,58,0.45)",
  redSoft: "rgba(228,35,58,0.14)",
  amber: "#F0B45E",
  amberSoft: "rgba(240,180,94,0.14)",
  mono: "'IBM Plex Mono', monospace",
};

// Sistema de color por categoría — golpes de color puntuales, no decoración pareja
export const CAT = {
  plata: T.green,
  contenido: "#FF3B6E",
  agenda: "#4D8DFF",
  ideas: "#FFD400",
  stats: "#B14CFF",
  alerta: "#FF7A1A",
};

export const PLATFORM_GRADIENT = {
  Kick: "linear-gradient(135deg,#6dffab,#0f8a3d)",
  YouTube: "linear-gradient(135deg,#ff5252,#a30000)",
  Shorts: "linear-gradient(135deg,#ff5252,#7a0e0e)",
  TikTok: "linear-gradient(135deg,#1c1c1e,#3a3a3d)",
  Reels: "linear-gradient(135deg,#f8a13c,#dd2a7b 45%,#7b48d6)",
  "Sin definir": "linear-gradient(135deg,#5C5E56,#2A2B27)",
};

export const STAGES = ["IDEA", "PLANIFICADO", "GRABANDO", "EDITANDO", "REVISION", "PUBLICADO"];
export const STAGE_LABEL = {
  IDEA: "Idea",
  PLANIFICADO: "Planificado",
  GRABANDO: "Grabando",
  EDITANDO: "Editando",
  REVISION: "Revisión",
  PUBLICADO: "Publicado",
};

export const LEVEL_META = {
  urgente: { label: "Urgente", color: CAT.alerta },
  importante: { label: "Importante", color: T.amber },
  normal: { label: "Normal", color: T.blue },
  opcional: { label: "Opcional", color: T.textFaint },
};
