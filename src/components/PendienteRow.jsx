import { Trash2 } from "lucide-react";
import { T, LEVEL_META } from "../lib/tokens.js";
import { HangTag } from "./ui.jsx";

export default function PendienteRow({ item, compact, onCycleLevel, onDelete }) {
  const meta = LEVEL_META[item.level];
  return (
    <div className="flex items-center gap-2 rounded-lg px-3.5 py-3 active:scale-[0.99] transition-transform" style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px dashed ${meta.color}` }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm" style={{ color: T.text }}>{item.title}</p>
        {!compact && <p className="text-[11px] mt-0.5" style={{ color: T.textFaint }}>{item.tag} · {item.when_text}</p>}
      </div>
      {onCycleLevel && (
        <button onClick={() => onCycleLevel(item.id)} title="Tocar para cambiar el nivel">
          <HangTag label={meta.label} color={meta.color} />
        </button>
      )}
      {onDelete && (
        <button onClick={() => onDelete(item.id)} title="Eliminar" className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform" style={{ background: "rgba(255,255,255,0.05)" }}>
          <Trash2 size={11} color={T.textFaint} />
        </button>
      )}
    </div>
  );
}
