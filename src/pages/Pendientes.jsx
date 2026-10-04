import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { CodeLabel } from "../components/brand.jsx";
import { T, CAT } from "../lib/tokens.js";
import { useTasks } from "../hooks/useTasks.js";
import { Rise, QuickAddRow, EmptyState } from "../components/ui.jsx";
import PendienteRow from "../components/PendienteRow.jsx";

export default function Pendientes() {
  const { items: pendientes, add, cycleLevel, remove, toggleComplete } = useTasks();
  const hacer = pendientes.filter((p) => p.must);
  const bueno = pendientes.filter((p) => !p.must);

  // Si "Tiene que pasar" está vacío pero "Sería bueno" tiene algo, abre ahí
  // — nunca en la pestaña vacía solo porque es la primera.
  const [tabTouched, setTabTouched] = useState(false);
  const [tab, setTab] = useState("hacer");
  const tabActual = tabTouched ? tab : (hacer.length === 0 && bueno.length > 0 ? "bueno" : "hacer");
  const setTabManual = (t) => { setTab(t); setTabTouched(true); };

  const list = tabActual === "hacer" ? hacer : bueno;
  const pendientesSinHacer = useMemo(() => list.filter((p) => !p.completed), [list]);
  const hechos = useMemo(() => list.filter((p) => p.completed), [list]);
  const [showHechos, setShowHechos] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Pendientes</h1>
        <span className="inline-block mt-1" style={{ width: 34, height: 3, background: CAT.alerta }} />
        <div className="mt-1"><CodeLabel text="CTRL//05" /></div>
        <p className="text-sm mt-0.5" style={{ color: T.textDim }}>Solo lo que realmente importa.</p>
      </div>

      <QuickAddRow onAdd={add} color={CAT.alerta} prefix="PENDIENTE://" placeholder="qué falta... o dilo en voz alta" caption="entra como normal — la subes de nivel si hace falta." />

      <div className="flex gap-2">
        <button onClick={() => setTabManual("hacer")} className="flex-1 text-sm font-semibold py-2.5 rounded-lg active:scale-95 transition-transform" style={{ background: tabActual === "hacer" ? T.redSoft : "transparent", color: tabActual === "hacer" ? T.red : T.textDim, border: `1.5px solid ${tabActual === "hacer" ? T.red : T.line}` }}>Tiene que pasar ({hacer.filter((p) => !p.completed).length})</button>
        <button onClick={() => setTabManual("bueno")} className="flex-1 text-sm font-semibold py-2.5 rounded-lg active:scale-95 transition-transform" style={{ background: tabActual === "bueno" ? T.blueSoft : "transparent", color: tabActual === "bueno" ? T.blue : T.textDim, border: `1.5px solid ${tabActual === "bueno" ? T.blue : T.line}` }}>Sería bueno ({bueno.filter((p) => !p.completed).length})</button>
      </div>

      <div className="flex flex-col gap-2.5">
        {pendientesSinHacer.map((p, i) => (
          <Rise i={i} key={p.id}>
            <PendienteRow item={p} onCycleLevel={cycleLevel} onDelete={remove} onToggleComplete={toggleComplete} />
          </Rise>
        ))}
        {pendientesSinHacer.length === 0 && hechos.length === 0 && <EmptyState text="Nada por aquí. Respira." />}
        {pendientesSinHacer.length === 0 && hechos.length > 0 && <EmptyState text="Todo lo de aquí ya está hecho 🎉" />}
      </div>

      {hechos.length > 0 && (
        <div>
          <button onClick={() => setShowHechos((v) => !v)} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: T.textFaint, fontFamily: T.mono }}>
            <ChevronDown size={13} style={{ transform: showHechos ? "rotate(180deg)" : "none", transition: "transform 150ms" }} />
            HECHOS HOY ({hechos.length})
          </button>
          {showHechos && (
            <div className="flex flex-col gap-2.5 mt-2.5">
              {hechos.map((p, i) => (
                <Rise i={i} key={p.id}>
                  <PendienteRow item={p} onDelete={remove} onToggleComplete={toggleComplete} />
                </Rise>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
