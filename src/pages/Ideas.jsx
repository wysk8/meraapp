import { Trash2 } from "lucide-react";
import { CodeLabel, EditorialImage, GraffitiMark } from "../components/brand.jsx";
import { T, CAT } from "../lib/tokens.js";
import { useIdeas } from "../hooks/useIdeas.js";
import { Rise, QuickAddRow } from "../components/ui.jsx";

export default function Ideas() {
  const { items: ideas, add, cyclePotential, remove } = useIdeas();

  return (
    <div className="flex flex-col gap-5">
      <div className="relative overflow-visible rounded-md" style={{ border: `1px solid ${T.line}` }}>
        <EditorialImage src="/assets/photos/social-mobile.jpg" alt="Capturando una idea desde el celular" height={170} objectPosition="center 35%" />
        <div className="absolute inset-0 rounded-md pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.2), rgba(5,5,5,0.9) 88%)" }} />
        <div className="absolute top-3 left-3"><CodeLabel text="CTRL//06" color={T.text} /></div>
        <div className="absolute bottom-3 left-4">
          <GraffitiMark text="drop 07" color={CAT.ideas} size={22} rotate={-2} />
        </div>
      </div>

      <div>
        <h1 className="leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Ideas</h1>
        <span className="inline-block mt-1" style={{ width: 34, height: 3, background: CAT.ideas }} />
        <p className="text-sm mt-0.5" style={{ color: T.textDim }}>Captura rápido, ordena después.</p>
      </div>
      <div className="flex flex-col gap-3">
        {ideas.map((idea, i) => (
          <Rise i={i} key={idea.id} className="flex items-start gap-2 rounded-2xl px-3.5 py-3.5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: T.text }}>{idea.title}</p>
              <button onClick={() => cyclePotential(idea.id)} className="text-xs mt-1" style={{ color: T.textFaint }} title="Tocar para cambiar el potencial">
                {idea.platform} · {idea.format} · potencial <span style={{ color: CAT.ideas }}>{idea.potential}</span>
              </button>
            </div>
            <button onClick={() => remove(idea.id)} title="Eliminar" className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 active:scale-90 transition-transform" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Trash2 size={11} color={T.textFaint} />
            </button>
          </Rise>
        ))}
      </div>
      <QuickAddRow onAdd={add} color={CAT.ideas} prefix="IDEA://" placeholder="escribe o dilo en voz alta..." />
    </div>
  );
}
