import { useState } from "react";
import { CodeLabel } from "../components/brand.jsx";
import { T, CAT } from "../lib/tokens.js";
import { useTasks } from "../hooks/useTasks.js";
import { Rise, QuickAddRow, EmptyState } from "../components/ui.jsx";
import PendienteRow from "../components/PendienteRow.jsx";

export default function Pendientes() {
  const { items: pendientes, add, cycleLevel, remove } = useTasks();
  const [tab, setTab] = useState("hacer");
  const hacer = pendientes.filter((p) => p.must);
  const bueno = pendientes.filter((p) => !p.must);
  const list = tab === "hacer" ? hacer : bueno;

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
        <button onClick={() => setTab("hacer")} className="flex-1 text-sm font-semibold py-2.5 rounded-lg active:scale-95 transition-transform" style={{ background: tab === "hacer" ? T.redSoft : "transparent", color: tab === "hacer" ? T.red : T.textDim, border: `1.5px solid ${tab === "hacer" ? T.red : T.line}` }}>Tiene que pasar ({hacer.length})</button>
        <button onClick={() => setTab("bueno")} className="flex-1 text-sm font-semibold py-2.5 rounded-lg active:scale-95 transition-transform" style={{ background: tab === "bueno" ? T.blueSoft : "transparent", color: tab === "bueno" ? T.blue : T.textDim, border: `1.5px solid ${tab === "bueno" ? T.blue : T.line}` }}>Sería bueno ({bueno.length})</button>
      </div>

      <div className="flex flex-col gap-2.5">
        {list.map((p, i) => <Rise i={i} key={p.id}><PendienteRow item={p} onCycleLevel={cycleLevel} onDelete={remove} /></Rise>)}
        {list.length === 0 && <EmptyState text="Nada por aquí. Respira." />}
      </div>
    </div>
  );
}
