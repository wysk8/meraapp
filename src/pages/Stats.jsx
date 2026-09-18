import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CodeLabel } from "../components/brand.jsx";
import { T, CAT, PLATFORM_GRADIENT } from "../lib/tokens.js";
import { PLATFORM_ICON as MARK_ICON } from "../components/marks.jsx";
import { STATS_PLATAFORMAS as STATS_BASE } from "../data/seedData.js";
import { Panel, PlatformBadge, DemoTag, QuickAddRow } from "../components/ui.jsx";
import { useCountUp } from "../hooks/useCountUp.js";
import { usePlatformStats } from "../hooks/usePlatformStats.js";

const GLOW = { Kick: "rgba(109,255,171,0.5)", YouTube: "rgba(255,82,82,0.5)", TikTok: "rgba(200,200,205,0.35)", Reels: "rgba(221,42,123,0.45)" };
const STATS_PLATAFORMAS = STATS_BASE.map((s) => ({ ...s, grad: PLATFORM_GRADIENT[s.key], glow: GLOW[s.key] }));

function Orb({ platform, size, x, y, delay, selected, onClick }) {
  const Icon = MARK_ICON[platform.key];
  return (
    <button onClick={onClick} className="absolute flex items-center justify-center rounded-full transition-transform active:scale-95"
      style={{
        width: size, height: size, left: x - size / 2, top: y - size / 2, background: platform.grad,
        boxShadow: selected ? "0 4px 16px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.4)",
        animation: `float${(delay % 3) + 1} ${3.6 + delay * 0.3}s ease-in-out infinite`, animationDelay: `${delay * 0.2}s`,
        transform: selected ? "scale(1.1)" : "scale(1)", border: selected ? `2px solid ${T.text}` : "2px solid rgba(255,255,255,0.12)",
      }}>
      <Icon size={Math.max(size * 0.36, 16)} color="#fff" />
    </button>
  );
}

export default function Stats() {
  const [range, setRange] = useState("7D");
  const [selected, setSelected] = useState(STATS_PLATAFORMAS[0]);
  const { byPlatform, update: updatePlatformStat } = usePlatformStats();
  const manualFollowers = byPlatform[selected.name];

  const total = STATS_PLATAFORMAS.reduce((a, p) => a + p.viewsK, 0);
  const totalAnim = useCountUp(total * 1000, 900);
  const selectedAnim = useCountUp(selected.viewsK * 1000, 500);
  const maxV = Math.max(...STATS_PLATAFORMAS.map((p) => p.viewsK));
  const scale = (v) => 48 + (v / maxV) * 48;
  const box = 300;
  const positions = [{ x: box * 0.26, y: box * 0.3 }, { x: box * 0.76, y: box * 0.24 }, { x: box * 0.74, y: box * 0.74 }, { x: box * 0.24, y: box * 0.76 }];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Stats</h1>
          <span className="inline-block mt-1" style={{ width: 34, height: 3, background: CAT.stats }} />
        <div className="mt-1"><CodeLabel text="CTRL//07" /></div>
          <div className="flex items-center gap-1 mt-0.5"><p className="text-sm" style={{ color: T.textDim }}>Últimos 7 días</p><DemoTag /></div>
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ border: `1.5px solid ${T.line}` }}>
          {["7D", "30D", "90D", "1A"].map((r) => (
            <button key={r} onClick={() => setRange(r)} className="text-[10px] font-semibold px-2 py-1 rounded-md transition-colors" style={{ background: range === r ? T.green : "transparent", color: range === r ? "#04220F" : T.textFaint }}>{r}</button>
          ))}
        </div>
      </div>

      <Panel brackets className="p-4 relative" style={{ height: box + 44 }}>
        <div className="relative mx-auto" style={{ width: box, height: box }}>
          <div className="absolute flex flex-col items-center justify-center rounded-full" style={{
            width: 100, height: 100, left: box / 2 - 50, top: box / 2 - 50,
            background: T.green, border: `2px solid ${T.text}`, animation: "pulseGlow 3.2s ease-in-out infinite",
          }}>
            <span className="text-[9px]" style={{ color: "#04220F" }}>Total 7d</span>
            <span className="text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#04220F" }}>{(totalAnim / 1000).toFixed(0)}K</span>
          </div>
          {STATS_PLATAFORMAS.map((p, i) => (
            <Orb key={p.name} platform={p} size={scale(p.viewsK)} x={positions[i].x} y={positions[i].y} delay={i} selected={selected.name === p.name} onClick={() => setSelected(p)} />
          ))}
        </div>
        <p className="text-center text-[10px] mt-1" style={{ color: T.textFaint }}>Toca una plataforma para ver el detalle</p>
      </Panel>

      <Panel className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <PlatformBadge platform={selected.key} size={26} />
          <p className="text-sm font-semibold" style={{ color: T.text }}>{selected.name}</p>
        </div>
        <p className="text-2xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: T.text }}>{(selectedAnim / 1000).toFixed(1)}K <span className="text-xs font-normal" style={{ color: T.textFaint, fontFamily: "'Space Grotesk', sans-serif" }}>vistas</span></p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: T.text }}>{manualFollowers || selected.followers}</span>
          {manualFollowers ? (
            <span className="text-[10px]" style={{ color: T.green, fontFamily: T.mono }}>actualizado a mano</span>
          ) : (
            <span className="text-xs flex items-center gap-1" style={{ color: selected.change > 0 ? T.green : T.red }}>{selected.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {Math.abs(selected.change)}%</span>
          )}
        </div>
      </Panel>

      <QuickAddRow
        onAdd={updatePlatformStat}
        color={CAT.stats}
        prefix="STATS://"
        placeholder='ej: kick 1.2M seguidores... o dilo en voz alta'
        caption='escribe la plataforma primero (kick / youtube / tiktok / instagram) y luego el dato.'
      />

      <Panel className="p-4 flex items-center justify-between">
        <div><p className="text-xs" style={{ color: T.textDim }}>Seguidores totales</p><p className="text-lg font-bold mt-0.5" style={{ color: T.text }}>1.2M</p></div>
        <span className="text-xs flex items-center gap-1" style={{ color: T.green }}><TrendingUp size={12} /> +12.6K esta semana</span>
      </Panel>

      <div>
        <p className="text-xs font-semibold mb-1" style={{ color: T.green }}>Qué está funcionando</p>
        <p className="text-sm" style={{ color: T.text }}>El documental corto de Bogotá fue lo más fuerte del mes: 187.3K vistas, mejor semana del canal de YouTube.</p>
      </div>
      <div>
        <p className="text-xs font-semibold mb-1" style={{ color: T.violet }}>Qué deberíamos repetir</p>
        <p className="text-sm" style={{ color: T.text }}>Formatos cortos y espontáneos grabados en la calle — el crecimiento de TikTok (+41%) viene de ahí.</p>
      </div>
    </div>
  );
}
