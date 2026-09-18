import { useOutletContext, useNavigate } from "react-router-dom";
import { Flame, AlertTriangle } from "lucide-react";
import { T, CAT } from "../lib/tokens.js";
import { useCountUp } from "../hooks/useCountUp.js";
import { useContentItems } from "../hooks/useContentItems.js";
import { useTasks } from "../hooks/useTasks.js";
import { useEvents } from "../hooks/useEvents.js";
import { useIdeas } from "../hooks/useIdeas.js";
import { useFinances } from "../hooks/useFinances.js";
import { STATS_PLATAFORMAS } from "../data/seedData.js";
import { Rise, SectionHeader, QuickAddRow, PlatformBadge, Panel } from "../components/ui.jsx";
import { EditorialImage, BrandStamp, GraffitiMark, CodeLabel } from "../components/brand.jsx";
import { anioActual } from "../lib/date.js";
import ContentRow from "../components/ContentRow.jsx";
import PendienteRow from "../components/PendienteRow.jsx";

export default function Inicio() {
  const { focus } = useOutletContext();
  const navigate = useNavigate();
  const go = (path) => navigate(path);

  const { items: contentItems, advanceStage, remove: removeContentItem } = useContentItems();
  const { items: pendientes } = useTasks();
  const { items: agendaHoy } = useEvents();
  const { items: ideas, add: addIdea } = useIdeas();
  const { disponible: disponibleReal } = useFinances();

  const disponible = useCountUp(disponibleReal);
  const topGrowth = STATS_PLATAFORMAS.reduce((a, b) => (b.change > a.change ? b : a));

  const urgentes = pendientes.filter((p) => p.must);
  const hoyContenido = contentItems.filter((c) => (c.when_text || "").toLowerCase().includes("hoy"));

  return (
    <div className="flex flex-col gap-5">
      {/* ---------- HERO — PORTADA EDITORIAL ---------- */}
      <div className="relative overflow-visible rounded-md" style={{ border: `1px solid ${T.line}`, minHeight: 430 }}>
        <div className="absolute inset-0 rounded-md overflow-hidden">
          <EditorialImage src="/assets/photos/hero-bogota.jpg" alt="Bogotá de noche" height="100%" brackets />
        </div>
        <div className="absolute inset-0 rounded-md pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.97) 78%)" }} />
        <div className="absolute top-3 left-3 px-1.5 py-0.5 z-10" style={{ background: CAT.contenido, transform: "rotate(-3deg)" }}>
          <CodeLabel text={`BOG / ${anioActual()}`} color="#0A0A0A" size={9} />
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          <span className="relative flex items-center justify-center w-1.5 h-1.5">
            <span className="absolute w-1.5 h-1.5 rounded-full" style={{ background: T.green }} />
            <span className="absolute w-1.5 h-1.5 rounded-full" style={{ background: T.green, animation: "livePing 1.8s ease-out infinite" }} />
          </span>
          <CodeLabel text="ONLINE" color={T.green} />
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 z-10">
          <div className="flex items-center gap-2 mb-1">
            <GraffitiMark text="MeraPela OS" color={T.green} size={22} rotate={-2} />
          </div>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px, 9vw, 46px)", lineHeight: 0.82, color: T.text, letterSpacing: 0.5 }}>MIS</p>
          <p className="relative inline-block" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(42px, 12vw, 60px)", lineHeight: 0.82, color: "#1A1600", background: CAT.ideas, padding: "0 10px", marginLeft: -10, marginTop: 2 }}>NOTAS</p>

          <div className="mt-4"><QuickAddRow onAdd={addIdea} color={CAT.ideas} prefix="IDEA://" placeholder="¿se te ocurrió algo? escríbelo o dilo en voz alta..." /></div>

          <div className="my-4" style={{ height: 1, background: "rgba(255,255,255,0.15)", marginLeft: -16, marginRight: -16 }} />

          <div className="flex items-center justify-between">
            <CodeLabel text="04°42'N 74°04'W" color={T.textFaint} />
            <BrandStamp size={40} color={T.green} />
          </div>
        </div>
      </div>

      {/* ---------- GRID EDITORIAL ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <button onClick={() => go("/plata")} className="relative col-span-2 text-left p-4 pt-5 active:scale-[0.99] transition-transform rounded-md overflow-visible" style={{ background: CAT.plata }}>
          <div className="absolute -top-2.5 -right-2 px-2 py-1 z-10" style={{ background: T.bg, border: "1.5px solid #04220F", transform: "rotate(3deg)" }}>
            <span className="flex items-center gap-1" style={{ fontFamily: T.mono, fontSize: 10, color: T.green }}>12 <Flame size={11} color={CAT.alerta} /> RACHA</span>
          </div>
          <span style={{ fontFamily: T.mono, fontSize: 9, color: "#04220F", letterSpacing: 0.5 }}>PLATA · MP-01 · DISPONIBLE</span>
          <p className="-mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 10vw, 56px)", lineHeight: 0.9, color: "#04220F" }}>${Math.round(disponible).toLocaleString("es-CO")}</p>
        </button>

        <button onClick={() => go("/stats")} className="relative col-span-2 text-left p-4 rounded-sm overflow-visible" style={{ border: `2px solid ${CAT.stats}` }}>
          <span style={{ fontFamily: T.mono, fontSize: 9, color: CAT.stats, letterSpacing: 0.5 }}>STATS · CTRL//01</span>
          <p className="mt-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 6vw, 30px)", lineHeight: 0.9, color: T.text }}>
            +{topGrowth.change}% <span className="text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: T.textDim }}>{topGrowth.name}</span>
          </p>
          <div className="flex gap-1.5 mt-2">
            {STATS_PLATAFORMAS.map((s) => <PlatformBadge key={s.name} platform={s.key} size={22} />)}
          </div>
        </button>

        <div className="col-span-2 p-4 rounded-sm" style={{ border: `2px solid ${CAT.contenido}` }}>
          <div className="relative flex items-center justify-between mb-3">
            <span className="relative px-1" style={{ fontFamily: T.mono, fontSize: 11, color: CAT.contenido, letterSpacing: 0.5, background: T.bg }}>// CONTENIDO DE HOY</span>
            <div className="absolute left-0 right-0 top-1/2" style={{ height: 1, background: CAT.contenido, zIndex: -1 }} />
            <button onClick={() => go("/contenido")} className="text-[10px] px-1" style={{ color: CAT.contenido, fontFamily: T.mono, background: T.bg }}>+ agregar</button>
          </div>
          <div className="flex flex-col gap-3">
            {hoyContenido.map((c, i) => <Rise i={i} key={c.id}><ContentRow item={c} onAdvance={advanceStage} onDelete={removeContentItem} /></Rise>)}
            {hoyContenido.length === 0 && <p className="text-xs" style={{ color: T.textFaint }}>Nada agendado para hoy todavía.</p>}
          </div>
        </div>

        <button onClick={() => go("/pendientes")} className="relative col-span-1 text-left p-4 pt-6 active:scale-[0.98] transition-transform rounded-md overflow-visible" style={{ background: CAT.alerta, border: "2px solid #2A1200" }}>
          <div className="absolute -top-2 left-3 px-1.5 py-0.5 z-10" style={{ background: T.bg, border: `1.5px solid ${CAT.alerta}`, transform: "rotate(-2deg)" }}>
            <span style={{ fontFamily: T.mono, fontSize: 8, color: CAT.alerta }}>URGENTE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={13} color="#2A1200" />
            <span style={{ fontFamily: T.mono, fontSize: 9, color: "#2A1200", letterSpacing: 0.5, fontWeight: 700 }}>ALERTA</span>
          </div>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 11vw, 52px)", lineHeight: 0.9, color: "#2A1200" }}>{urgentes.length}</p>
          <p className="text-[10px] mt-1 truncate font-semibold" style={{ color: "#3A1A00" }}>{urgentes[0]?.title}</p>
        </button>

        <div className="col-span-1 pl-3 py-1 overflow-visible">
          <span style={{ fontFamily: T.mono, fontSize: 9, color: CAT.agenda, letterSpacing: 0.5, borderLeft: `4px solid ${CAT.agenda}`, paddingLeft: 8 }}>AGENDA</span>
          <p className="mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 7vw, 34px)", lineHeight: 0.85, color: T.text, marginLeft: 4 }}>{agendaHoy[0]?.time}</p>
          <p className="text-[11px] mt-1" style={{ color: T.textDim, marginLeft: 4 }}>{agendaHoy[0]?.title}</p>
        </div>

        {!focus && (
          <div className="col-span-2 p-4 rounded-sm" style={{ border: `2px dashed ${CAT.ideas}`, transform: "rotate(-0.3deg)" }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, color: CAT.ideas, letterSpacing: 0.5 }}>// IDEAS EN MENTE</span>
            <p className="text-[11px] mt-1" style={{ color: T.textFaint }}>Anota arriba, en "MIS NOTAS" — aquí quedan tus últimas.</p>
            <div className="flex gap-2 flex-wrap mt-3">
              {ideas.slice(-4).reverse().map((idea) => (
                <button key={idea.id} onClick={() => go("/ideas")} className="text-[10px] px-2 py-1 rounded-sm text-left" style={{ border: `1px solid ${CAT.ideas}`, color: T.text, transform: "rotate(1deg)" }}>
                  {idea.title.length > 24 ? idea.title.slice(0, 24) + "…" : idea.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {focus && (
        <Panel className="p-4 flex items-center gap-2">
          <p className="text-xs" style={{ color: T.textDim }}>Modo enfoque activo — ocultando ideas para que veas solo lo esencial de hoy.</p>
        </Panel>
      )}
    </div>
  );
}
