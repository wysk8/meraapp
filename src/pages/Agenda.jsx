import { CodeLabel, EditorialImage, GraffitiMark } from "../components/brand.jsx";
import { T, CAT } from "../lib/tokens.js";
import { formatHoyLargo } from "../lib/date.js";
import { useEvents } from "../hooks/useEvents.js";
import { AGENDA_SEMANA } from "../data/seedData.js";
import { Rise, SectionHeader, QuickAddRow } from "../components/ui.jsx";

export default function Agenda() {
  const { items: agendaHoy, add } = useEvents();

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
          <Rise i={i} key={i} className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-xs font-medium" style={{ color: T.textFaint }}>{a.time}</span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.type === "stream" ? T.green : a.type === "record" ? T.violet : T.textFaint }} />
            <span className="text-sm" style={{ color: T.text }}>{a.title}</span>
          </Rise>
        ))}
      </div>

      <div>
        <SectionHeader title="LO QUE VIENE" color={CAT.agenda} />
        <div className="flex flex-col gap-4">
          {AGENDA_SEMANA.map((d) => (
            <div key={d.day}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: T.textDim }}>{d.day}</p>
              <div className="flex flex-col gap-1">{d.items.map((it, i) => <p key={i} className="text-sm" style={{ color: T.text }}>· {it}</p>)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
