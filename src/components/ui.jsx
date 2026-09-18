import { useState } from "react";
import { Plus, Mic, ArrowRight, Trash2 } from "lucide-react";
import { T, CAT, PLATFORM_GRADIENT, STAGE_LABEL } from "../lib/tokens.js";
import { PLATFORM_ICON, PLATFORM_COLOR, YouTubeMark } from "./marks.jsx";
import { useSpeechToText } from "../hooks/useSpeechToText.js";

export function Panel({ children, style, className = "", brackets = false, ...rest }) {
  return (
    <div className={`relative rounded-[6px] ${className}`} style={{ background: "#101012", border: `1px solid ${T.cardBorder}`, ...style }} {...rest}>
      {brackets && <CornerBrackets color={T.green} />}
      {children}
    </div>
  );
}

export function SectionHeader({ title, action, onAction, icon: Icon, color = T.green }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="shrink-0" style={{ width: 4, height: 14, background: color, transform: "skewX(-12deg)" }} />
        {Icon && <Icon size={14} color={T.textDim} />}
        <h2 className="text-[16px] leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0.5 }}>{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} className="flex items-center gap-1 text-[11px] font-medium active:scale-95 transition-transform" style={{ color, fontFamily: T.mono }}>
          {action}
        </button>
      )}
    </div>
  );
}

// Etiqueta física tipo colgante de ropa — con "agujero" perforado.
export function HangTag({ label, color, size = "sm" }) {
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

export function StageDot({ stage }) {
  const map = { IDEA: T.textFaint, PLANIFICADO: T.blue, GRABANDO: CAT.contenido, EDITANDO: T.violet, REVISION: T.amber, PUBLICADO: T.green };
  const label = stage === "GRABANDO" ? "● REC" : STAGE_LABEL[stage];
  return <HangTag label={label} color={map[stage]} />;
}

export function PlatformBadge({ platform, size = 30 }) {
  const Icon = PLATFORM_ICON[platform] || YouTubeMark;
  const color = PLATFORM_COLOR[platform] || T.textFaint;
  return (
    <div className="flex items-center justify-center shrink-0" style={{ width: size, height: size, borderRadius: size * 0.2, background: "#0B0C0D", border: `1.5px solid ${color}` }}>
      <Icon size={size * 0.5} color={color} />
    </div>
  );
}

// Miniatura generada con gradientes propios — no depende de imágenes
// externas, así nunca queda un espacio roto.
export function Thumb({ id = 1, platform, size = 56 }) {
  const gx = 20 + (id * 13) % 60;
  const gy = 15 + (id * 29) % 55;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 overflow-hidden rounded-2xl" style={{ filter: "saturate(0.75) contrast(1.08)" }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%), ${PLATFORM_GRADIENT[platform]}` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.4))" }} />
      </div>
      <div className="absolute -bottom-1.5 -right-1.5"><PlatformBadge platform={platform} size={22} /></div>
    </div>
  );
}

export function RowMenu({ onAdvance, onDelete }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {onAdvance && (
        <button onClick={onAdvance} title="Avanzar al siguiente estado" className="w-6 h-6 rounded-full flex items-center justify-center active:scale-90 transition-transform" style={{ background: "rgba(255,255,255,0.05)" }}><ArrowRight size={11} color={T.textFaint} /></button>
      )}
      {onDelete && (
        <button onClick={onDelete} title="Eliminar" className="w-6 h-6 rounded-full flex items-center justify-center active:scale-90 transition-transform" style={{ background: "rgba(255,255,255,0.05)" }}><Trash2 size={11} color={T.textFaint} /></button>
      )}
    </div>
  );
}

export function DemoTag() {
  return <span className="text-[10px]" style={{ color: T.textFaint, fontFamily: T.mono }}>· datos de demostración</span>;
}
export function EmptyState({ text }) {
  return <p className="text-sm py-6 text-center" style={{ color: T.textFaint }}>{text}</p>;
}

export function Rise({ i = 0, children, style, ...rest }) {
  return (
    <div style={{ animation: `riseIn 0.45s ease both`, animationDelay: `${i * 55}ms`, ...style }} {...rest}>
      {children}
    </div>
  );
}

// Marcas de esquina tipo mira/reticle
export function CornerBrackets({ color = T.green, size = 12, inset = 8 }) {
  const seg = (pos, bt, bl, br, bb) => (
    <div className="absolute pointer-events-none" style={{ width: size, height: size, ...pos, borderTop: bt ? `2px solid ${color}` : "none", borderLeft: bl ? `2px solid ${color}` : "none", borderRight: br ? `2px solid ${color}` : "none", borderBottom: bb ? `2px solid ${color}` : "none", opacity: 0.8 }} />
  );
  return (
    <>
      {seg({ top: inset, left: inset }, true, true, false, false)}
      {seg({ top: inset, right: inset }, true, false, true, false)}
      {seg({ bottom: inset, left: inset }, false, true, false, true)}
      {seg({ bottom: inset, right: inset }, false, false, true, true)}
    </>
  );
}

export function Barcode({ color = T.green, opacity = 0.85, width = 140, height = 28 }) {
  const bars = [3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 2, 4, 1, 1, 3, 2, 1, 1, 4, 2];
  const unit = width / bars.reduce((a, b) => a + b + 1, 0);
  let x = 0;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ opacity }}>
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y={0} width={w * unit} height={height} fill={color} />;
        x += (w + 1) * unit;
        return rect;
      })}
    </svg>
  );
}

export function Seal({ size = 56, color = T.green }) {
  return (
    <div className="rounded-full flex flex-col items-center justify-center shrink-0" style={{ width: size, height: size, border: `1.5px solid ${color}` }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: size * 0.3, color, lineHeight: 1 }}>MP</span>
      <span style={{ fontFamily: T.mono, fontSize: size * 0.09, color, letterSpacing: 1 }}>OFICIAL</span>
    </div>
  );
}

export function Donut({ segments, size = 108 }) {
  let acc = 0;
  const stops = segments.map((s) => { const start = acc; acc += s.pct; return `${s.color} ${start}% ${acc}%`; }).join(", ");
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${stops})`, animation: "spinSlow 40s linear infinite" }} />
      <div className="absolute rounded-full flex flex-col items-center justify-center" style={{ inset: size * 0.18, background: T.bg }}>
        <span className="text-[9px]" style={{ color: T.textFaint }}>Distribución</span>
      </div>
    </div>
  );
}

// Ilustración de ciudad de noche — no depende de una imagen externa.
export function CityScene({ width = 420, height = 150 }) {
  const bars = [22, 40, 16, 55, 28, 48, 18, 34, 60, 24, 42, 20, 50, 30, 16, 38];
  let x = 0;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0A0C" />
          <stop offset="100%" stopColor="#141416" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#skyGrad)" />
      {bars.map((h, i) => {
        const w = width / bars.length;
        const bx = x; x += w;
        const lit = i % 3 === 0;
        return (
          <g key={i}>
            <rect x={bx + 2} y={height - h} width={w - 4} height={h} fill="#000" opacity="0.85" />
            {lit && <rect x={bx + w / 2 - 2} y={height - h + 8} width={4} height={4} fill={CAT.plata} opacity="0.7" />}
          </g>
        );
      })}
    </svg>
  );
}

// Capturador rápido genérico — una línea, voz opcional, sin campos de más.
// Se reutiliza en Ideas, Pendientes, Contenido, Agenda y Plata.
export function QuickAddRow({ onAdd, color, prefix, placeholder, caption }) {
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const { listening, supported, deniedMsg, start, stop } = useSpeechToText((text) => setDraft(text));
  const submit = async () => {
    if (!draft.trim() || status === "saving") return;
    const text = draft.trim();
    setStatus("saving");
    try {
      await onAdd(text);
      setDraft("");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1400);
    } catch (err) {
      console.error("No se pudo guardar:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };
  return (
    <div>
      <div className="relative flex items-center gap-2 px-3.5 py-3 rounded-lg transition-colors" style={{ border: `2px solid ${status === "error" ? T.red : listening ? CAT.contenido : color}`, background: "rgba(255,255,255,0.03)" }}>
        <span className="shrink-0 text-[11px]" style={{ color: listening ? CAT.contenido : color, fontFamily: T.mono }}>{listening ? "● REC" : prefix}</span>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none min-w-0"
          style={{ color: T.text }}
        />
        {supported && (
          <button onClick={listening ? stop : start} className="active:scale-90 transition-transform shrink-0" title={listening ? "Detener" : "Hablar"}>
            <Mic size={15} color={listening ? CAT.contenido : color} style={listening ? { animation: "pulseGlow 1s ease-in-out infinite" } : undefined} />
          </button>
        )}
        {status === "saved" ? (
          <span className="text-xs font-semibold shrink-0" style={{ color, fontFamily: T.mono }}>✓</span>
        ) : status === "saving" ? (
          <span className="text-xs shrink-0" style={{ color: T.textFaint, fontFamily: T.mono }}>...</span>
        ) : (
          <button onClick={submit} className="active:scale-90 transition-transform shrink-0"><Plus size={16} color={status === "error" ? T.red : color} /></button>
        )}
      </div>
      {status === "error" ? (
        <p className="text-[11px] mt-1.5 ml-1" style={{ color: T.red, fontFamily: T.mono }}>no se pudo guardar — revisa tu conexión e intenta de nuevo.</p>
      ) : caption && (
        <p className="text-[11px] mt-1.5 ml-1" style={{ color: T.textFaint, fontFamily: T.mono }}>
          {deniedMsg || (!supported ? "voz no disponible en este navegador" : caption)}
        </p>
      )}
    </div>
  );
}
