import { useState } from "react";
import { CodeLabel, EditorialImage, GraffitiMark, Sticker } from "../components/brand.jsx";
import { T, CAT, STAGES, STAGE_LABEL } from "../lib/tokens.js";
import { useContentItems } from "../hooks/useContentItems.js";
import { Rise, QuickAddRow, EmptyState } from "../components/ui.jsx";
import ContentRow from "../components/ContentRow.jsx";

export default function Contenido() {
  const { items: contentItems, add, advanceStage, remove } = useContentItems();
  const [filter, setFilter] = useState("Todos");
  const platforms = ["Todos", "Kick", "YouTube", "Shorts", "TikTok", "Reels"];
  const items = filter === "Todos" ? contentItems : contentItems.filter((c) => c.platform === filter);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-visible rounded-md" style={{ border: `1px solid ${T.line}` }}>
        <EditorialImage src="/assets/photos/creator-studio.jpg" alt="Estudio de edición" height={170} />
        <div className="absolute inset-0 rounded-md pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.15), rgba(5,5,5,0.9) 85%)" }} />
        <div className="absolute top-3 left-3"><CodeLabel text="CTRL//02" color={T.text} /></div>
        <div className="absolute bottom-3 left-4 right-4">
          <GraffitiMark text="Create. Edit. Post." color={CAT.contenido} size={22} rotate={-1} />
        </div>
      </div>

      <div>
        <h1 className="leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Contenido</h1>
        <span className="inline-block mt-1" style={{ width: 34, height: 3, background: CAT.contenido }} />
        <p className="text-sm mt-0.5" style={{ color: T.textDim }}>Qué está pasando con cada pieza, de idea a publicado.</p>
      </div>

      <QuickAddRow onAdd={add} color={CAT.contenido} prefix="CONTENIDO://" placeholder="título de la pieza... o dilo en voz alta" caption="entra como idea — defines plataforma y estado después." />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {platforms.map((p) => (
          <button key={p} onClick={() => setFilter(p)} className="text-xs font-medium px-3.5 py-1.5 rounded-lg shrink-0 active:scale-95 transition-transform"
            style={{ background: filter === p ? T.green : "transparent", color: filter === p ? "#04220F" : T.textDim, border: `1.5px solid ${filter === p ? T.green : T.line}` }}>
            {p}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        {STAGES.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? T.textFaint : T.green }} />
              <span className="text-[9px] text-center leading-tight" style={{ color: T.textFaint }}>{STAGE_LABEL[s]}</span>
            </div>
            {i < STAGES.length - 1 && <div className="h-px flex-1 mb-4" style={{ background: T.line }} />}
          </div>
        ))}
      </div>

      <div className="relative overflow-visible rounded-sm" style={{ border: `2px solid ${T.line}` }}>
        <EditorialImage src="/assets/photos/gaming.jpg" alt="Sesión de streaming gaming" height={110} />
        <div className="absolute inset-0 rounded-sm pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.85), rgba(5,5,5,0.15) 60%)" }} />
        <div className="absolute top-1/2 left-4" style={{ transform: "translateY(-50%)" }}>
          <Sticker label="Kick · Live" color={T.green} size="md" />
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        {items.map((c, i) => (
          <Rise i={i} key={c.id}>
            <ContentRow item={c} onAdvance={advanceStage} onDelete={remove} />
            {c.note && <p className="text-xs mt-1.5 ml-[68px]" style={{ color: T.textFaint }}>{c.note}</p>}
          </Rise>
        ))}
        {items.length === 0 && <EmptyState text="No hay contenido en esta plataforma todavía." />}
      </div>
    </div>
  );
}
