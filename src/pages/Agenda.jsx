import { Trash2 } from "lucide-react";
import { CodeLabel, EditorialImage, GraffitiMark } from "../components/brand.jsx";
import { T, CAT } from "../lib/tokens.js";
import { formatHoyLargo } from "../lib/date.js";
import { useEvents } from "../hooks/useEvents.js";
import { Rise, QuickAddRow, EmptyState } from "../components/ui.jsx";

export default function Agenda() {
  const { items: agendaHoy, add, remove } = useEvents();

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-visible rounded-md" style={{ border: `1px solid ${T.line}` }}>
        <EditorialImage src="/assets/photos/streaming.jpg" alt="Setup de streaming" height={150} />
        <div className="absolute inset-0 rounded-md pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.2), rgba(5,5,5,0.92) 85%)" }} />
        <div className="absolute top-3 left-3"><CodeLabel text="CTRL//04" color={T.text} /></div>
        <div className="absolute bottom-3 left-4">
          <GraffitiMark text="On air soon" color={CAT.agenda} size={20} rotate={2} />
        </div>
      </div>

      <div>
        <h1 className="leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Agenda</h1>
        <span className="inline-block mt-1" style={{ width: 34, height: 3, background: CAT.agenda }} />
        <p className="text-sm mt-0.5" style={{ color: T.textDim }}>{formatHoyLargo()}</p>
      </div>

      <QuickAddRow onAdd={add} color={CAT.agenda} prefix="AGENDA://" placeholder="qué tienes... o dilo en voz alta" caption="se agrega a hoy — le pones la hora después." />

      <div className="flex flex-col gap-3.5">
        {agendaHoy.map((a, i) => (
          <Rise i={i} key={a.id} className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-xs font-medium" style={{ color: T.textFaint }}>{a.time}</span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.type === "stream" ? T.green : a.type === "record" ? T.violet : T.textFaint }} />
            <span className="text-sm flex-1 min-w-0" style={{ color: T.text }}>{a.title}</span>
            <button onClick={() => remove(a.id)} title="Eliminar" className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Trash2 size={11} color={T.textFaint} />
            </button>
          </Rise>
        ))}
        {agendaHoy.length === 0 && <EmptyState text="Nada agendado para hoy todavía." />}
      </div>
    </div>
  );
}
