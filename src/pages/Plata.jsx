import { CodeLabel, EditorialImage, GraffitiMark } from "../components/brand.jsx";
import { T, CAT } from "../lib/tokens.js";
import { useFinances } from "../hooks/useFinances.js";
import { Panel, SectionHeader, Donut, QuickAddRow } from "../components/ui.jsx";

export default function Plata() {
  const {
    ingresos, gastosOtros, gastosHormiga,
    totalIngresos, totalGastos, disponible,
    addIngreso, addGasto, addGastoHormiga,
  } = useFinances();

  const totalHormiga = gastosHormiga.reduce((a, g) => a + g.amount, 0);
  const colors = ["#39FF74", "#ff5252", T.violet, CAT.agenda, CAT.ideas];
  const ingresosConColor = ingresos.map((i, idx) => ({
    ...i,
    pct: totalIngresos ? Math.round((i.amount / totalIngresos) * 100) : 0,
    color: colors[idx % colors.length],
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-visible rounded-md" style={{ border: `1px solid ${T.line}` }}>
        <EditorialImage src="/assets/photos/plata.jpg" alt="Plata sobre el escritorio" height={170} objectPosition="center 40%" />
        <div className="absolute inset-0 rounded-md pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.15), rgba(5,5,5,0.92) 85%)" }} />
        <div className="absolute top-3 left-3"><CodeLabel text="CTRL//03" color={T.text} /></div>
        <div className="absolute bottom-3 left-4">
          <GraffitiMark text="Disciplina = libertad" color={CAT.plata} size={18} rotate={-1} />
        </div>
      </div>

      <div>
        <h1 className="leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Plata</h1>
        <span className="inline-block mt-1" style={{ width: 34, height: 3, background: CAT.plata }} />
        <p className="text-sm mt-0.5" style={{ color: T.textDim }}>Resumen del mes — se actualiza con lo que agregues.</p>
      </div>

      <Panel className="p-5" style={{ border: `2px solid ${CAT.alerta}` }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="shrink-0" style={{ width: 4, height: 12, background: CAT.alerta, transform: "skewX(-12deg)" }} />
          <p style={{ fontFamily: T.mono, fontSize: 11, color: CAT.alerta, letterSpacing: 0.5 }}>GASTOS HORMIGA · ESTE MES</p>
        </div>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 9vw, 44px)", lineHeight: 1, color: T.text }}>${totalHormiga.toLocaleString("es-CO")}</p>
        <p className="text-xs mt-1" style={{ color: T.textFaint }}>lo que se te va en cosas chiquitas — papas, gaseosas, antojos.</p>
        <div className="mt-4"><QuickAddRow onAdd={addGastoHormiga} color={CAT.alerta} prefix="GASTO://" placeholder="ej: papas 5000... o dilo en voz alta" caption="escribe qué compraste y el valor al final." /></div>
        {gastosHormiga.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {gastosHormiga.slice(-5).reverse().map((g) => (
              <div key={g.id} className="flex justify-between items-center text-sm" style={{ borderTop: `1px solid ${T.line}`, paddingTop: 8 }}>
                <span style={{ color: T.text }}>{g.desc}</span>
                <span style={{ color: T.textDim, fontFamily: T.mono }}>${g.amount.toLocaleString("es-CO")}</span>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel className="p-5">
        <p className="text-xs" style={{ color: T.textDim }}>Ingresos totales</p>
        <p className="text-3xl mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: T.text }}>${totalIngresos.toLocaleString("es-CO")}</p>
        <div className="flex items-center gap-5 mt-4">
          <Donut segments={ingresosConColor} />
          <div className="flex-1 flex flex-col gap-2.5">
            {ingresosConColor.map((i) => (
              <div key={i.id} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5" style={{ color: T.textDim }}><span className="w-2 h-2 rounded-full" style={{ background: i.color }} />{i.desc}</span>
                <span style={{ color: T.text }}>${i.amount.toLocaleString("es-CO")} · {i.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4"><QuickAddRow onAdd={addIngreso} color={T.green} prefix="INGRESO://" placeholder="ej: patrocinio 500000... o dilo en voz alta" caption="de dónde vino y cuánto — al final." /></div>
      </Panel>

      <div className="grid grid-cols-2 gap-4">
        <div><p className="text-xs" style={{ color: T.textFaint }}>Gastos del mes</p><p className="text-lg font-bold mt-1" style={{ color: T.red }}>${totalGastos.toLocaleString("es-CO")}</p></div>
        <div><p className="text-xs" style={{ color: T.textFaint }}>Disponible</p><p className="text-lg font-bold mt-1" style={{ color: disponible >= 0 ? T.green : T.red }}>${disponible.toLocaleString("es-CO")}</p></div>
      </div>

      <div>
        <SectionHeader title="OTROS GASTOS" />
        <div className="flex flex-col gap-2.5">
          {gastosOtros.map((g) => (
            <div key={g.id} className="flex justify-between items-center rounded-2xl px-3.5 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-sm" style={{ color: T.text }}>{g.desc}</span><span className="text-sm" style={{ color: T.textDim }}>${g.amount.toLocaleString("es-CO")}</span>
            </div>
          ))}
        </div>
        <div className="mt-3"><QuickAddRow onAdd={addGasto} color={T.red} prefix="GASTO://" placeholder="ej: equipo de streaming 200000..." caption="gastos más grandes o poco frecuentes, no hormiga." /></div>
      </div>
    </div>
  );
}
