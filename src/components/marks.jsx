// Marcas dibujadas a mano (no los archivos de marca oficiales) para que
// cada plataforma se reconozca sin reproducir el logo con derechos de autor.

export function KickMark({ size = 16, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 3h4v6.2L13.5 3H19l-7 8 7.5 10h-5.6L9 13.6V21H4z" fill={color} />
    </svg>
  );
}
export function YouTubeMark({ size = 16, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M7.5 6.5l9 5.5-9 5.5z" fill={color} />
    </svg>
  );
}
export function TikTokMark({ size = 16, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="9" cy="14.6" r="2.9" fill={color} />
      <rect x="10.4" y="4" width="1.9" height="10.9" fill={color} />
      <path d="M12.3 4c.5 2.3 2.3 3.9 4.4 4.2v2c-1.7-.1-3.2-.8-4.4-1.9z" fill={color} />
    </svg>
  );
}
export function InstagramMark({ size = 16, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.5" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" stroke={color} strokeWidth="1.8" />
      <circle cx="16.7" cy="7.3" r="1.15" fill={color} />
    </svg>
  );
}

export const PLATFORM_COLOR = {
  Kick: "#6dffab",
  YouTube: "#ff5252",
  Shorts: "#ff5252",
  TikTok: "#E8E8EA",
  Reels: "#dd2a7b",
  "Sin definir": "#8a8d89",
};

export const PLATFORM_ICON = {
  Kick: KickMark,
  YouTube: YouTubeMark,
  Shorts: YouTubeMark,
  TikTok: TikTokMark,
  Reels: InstagramMark,
  "Sin definir": YouTubeMark,
};

export function MPMonogram({ size = 40, color = "#fff", opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 38" style={{ opacity }}>
      <path d="M2 32V6h5.5l6.5 11 6.5-11h5.5v26h-5.5V16l-6.5 10-6.5-10v16z" fill={color} />
      <path
        fillRule="evenodd"
        fill={color}
        d="M30 6L37 6Q42.5 6 42.5 12.5Q42.5 19 37 19L33.5 19L33.5 32L30 32Z
           M33.5 10L33.5 15L37 15Q38.5 15 38.5 12.5Q38.5 10 37 10Z"
      />
    </svg>
  );
}
