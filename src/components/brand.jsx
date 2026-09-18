import { useState } from "react";
import { T, CAT } from "../lib/tokens.js";
import { Seal, CityScene, CornerBrackets } from "./ui.jsx";
import { anioActual } from "../lib/date.js";

// (1) BrandStamp — el sello oficial. Es el mismo <Seal/> con otro nombre
// más descriptivo para cuando se usa como "firma" de marca en vez de
// como dato (por ejemplo junto al nombre en Perfil o en el hero).
export function BrandStamp({ size = 56, color = T.green }) {
  return <Seal size={size} color={color} />;
}

// (2) GraffitiMark — etiqueta tipo tag/spray, para momentos de marca
// puntuales (no para texto de uso diario — abusar de esto se ve mal).
export function GraffitiMark({ text, color = T.green, size = 20, rotate = -3 }) {
  return (
    <span
      style={{
        fontFamily: "'Rubik Wet Paint', cursive",
        fontSize: size,
        color,
        display: "inline-block",
        transform: `rotate(${rotate}deg)`,
        textShadow: "0 1px 0 rgba(0,0,0,0.4)",
      }}
    >
      {text}
    </span>
  );
}

// (3) Sticker — etiqueta física con "agujero" perforado y ligera
// rotación, como una calcomanía pegada. Para estados y categorías.
export function Sticker({ label, color, size = "sm" }) {
  const pad = size === "sm" ? "px-2 py-1" : "px-2.5 py-1.5";
  const fs = size === "sm" ? 10 : 11;
  return (
    <span
      className={`relative inline-flex items-center gap-1.5 ${pad} shrink-0`}
      style={{ border: `1.5px solid ${color}`, borderRadius: "3px 8px 3px 8px", color, fontFamily: T.mono, fontSize: fs, letterSpacing: 0.4, transform: "rotate(-1.2deg)", background: "rgba(0,0,0,0.25)" }}
    >
      <span className="rounded-full shrink-0" style={{ width: 6, height: 6, background: T.bg, border: `1.5px solid ${color}` }} />
      {label.toUpperCase()}
    </span>
  );
}

// (4) CodeLabel — código corto tipo "MP-01", "CTRL//01", "REC".
// Es EL recurso para dar sensación de "software propio" — úsalo con
// mesura, en esquinas de módulos, no en cada línea de texto.
export function CodeLabel({ text, color = T.textFaint, size = 9 }) {
  return <span style={{ fontFamily: T.mono, fontSize: size, color, letterSpacing: 0.5 }}>{text}</span>;
}

// (5) Texture — superpone grano/rasguños sobre lo que envuelva.
// variant: "grain" | "scratches"
export function Texture({ variant = "grain", opacity = 0.08, children, className = "", style }) {
  const src = variant === "scratches" ? "/assets/textures/scratches.svg" : "/assets/textures/grain.svg";
  return (
    <div className={`relative ${className}`} style={style}>
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url("${src}")`, backgroundSize: variant === "scratches" ? "cover" : "120px 120px", opacity, mixBlendMode: "overlay" }}
      />
    </div>
  );
}

// (7) BrandPlate — el "sticker/plate" de identidad de MeraPela. Reemplaza
// cualquier bloque tipo tarjeta-de-marca genérica: fondo oscuro, grano
// sutil, tipografía editorial + un tag de grafiti como acento (no como
// logo completo), franja lima corta (no un rectángulo), códigos MP//01 /
// BOG/año, y el sello bebiendo fuera del borde como una calcomanía real.
export function BrandPlate() {
  return (
    <div className="relative overflow-visible rounded-md" style={{ background: "#0B0C0D", border: `1px solid ${T.cardBorder}` }}>
      <Texture variant="grain" opacity={0.06} className="rounded-md">
        <CornerBrackets color={T.green} size={7} inset={6} />
        <div className="px-3.5 pt-4 pb-4">
          <div className="flex items-center justify-between">
            <CodeLabel text="MP//01" color={T.textFaint} />
            <span className="inline-block" style={{ transform: "rotate(3deg)" }}>
              <Sticker label="OS" color={T.green} />
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 mt-3">
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 25, letterSpacing: 1, color: T.text, lineHeight: 0.9 }}>MERAPELA</p>
            <GraffitiMark text="os" color={T.green} size={15} rotate={-8} />
          </div>
          <span className="block mt-1.5" style={{ width: 42, height: 3, background: T.green, transform: "skewX(-16deg)" }} />

          <div className="flex items-center justify-between mt-3">
            <CodeLabel text={`BOG / ${anioActual()}`} color={T.textFaint} />
            <CodeLabel text="CTRL//OS" color={T.textFaint} />
          </div>
        </div>
      </Texture>
      <div className="absolute -bottom-2.5 -right-2.5">
        <BrandStamp size={30} color={T.green} />
      </div>
    </div>
  );
}

// (6) EditorialImage — imagen real si existe localmente en
// public/assets/photos/, con la ilustración <CityScene/> como
// respaldo automático (nunca deja un espacio roto, y nunca depende
// de una URL externa). Ver public/assets/README.md para poner una
// foto real.
export function EditorialImage({ src, alt = "", frameColor, brackets = false, height = 150, filter = "saturate(0.75) brightness(0.75)", objectPosition = "center" }) {
  const [ok, setOk] = useState(Boolean(src));
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {ok ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" style={{ filter, objectPosition }} onError={() => setOk(false)} />
      ) : (
        <CityScene height={height} />
      )}
      {frameColor && <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 0 2px ${frameColor}` }} />}
      {brackets && <CornerBrackets color={CAT.plata} />}
    </div>
  );
}
