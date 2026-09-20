// Detecta la plataforma mencionada en una frase natural y la separa del
// texto, igual que "papas 5000" separa la descripción del monto en Plata.
// "video de carreras kick" → { platform: "Kick", title: "video de carreras" }

const KEYWORDS = [
  { re: /\bshorts?\b/i, contenido: "Shorts", texto: "YouTube" },
  { re: /\byoutube|yt\b/i, contenido: "YouTube", texto: "YouTube" },
  { re: /\bkick\b/i, contenido: "Kick", texto: "Kick" },
  { re: /\btiktok|tik\s*tok\b/i, contenido: "TikTok", texto: "TikTok" },
  { re: /\binstagram|insta\b|\breels?\b|\big\b/i, contenido: "Reels", texto: "Instagram" },
];

// variant: "contenido" usa las claves exactas de PLATFORM_GRADIENT/ICON
// (Kick/YouTube/Shorts/TikTok/Reels). "texto" usa nombres simples para
// mostrar en Ideas (Kick/YouTube/TikTok/Instagram), que ahí es solo texto.
export function detectPlatform(text, variant = "contenido") {
  for (const k of KEYWORDS) {
    const match = text.match(k.re);
    if (match) {
      const title = (text.slice(0, match.index) + text.slice(match.index + match[0].length)).replace(/\s+/g, " ").trim();
      return { platform: k[variant], title: title || text.trim() };
    }
  }
  return null;
}
