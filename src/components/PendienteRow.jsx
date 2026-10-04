import { Trash2, Check } from "lucide-react";
import { T, LEVEL_META } from "../lib/tokens.js";
import { HangTag } from "./ui.jsx";

export default function PendienteRow({ item, compact, onCycleLevel, onDelete, onToggleComplete }) {
  const meta = LEVEL_META[item.level];
  const done = Boolean(item.completed);
  return (
    <div className="flex items-center gap-2 rounded-lg px-3.5 py-3 transition-all duration-200" style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px dashed ${meta.color}`, opacity: done ? 0.55 : 1 }}>
      {onToggleComplete && (
        <button
          onClick={() => onToggleComplete(item.id)}
          title={done ? "Marcar como no hecho" : "Marcar como hecho"}
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-all duration-200"
          style={{ border: `1.5px solid ${done ? T.green : T.line}`, background: done ? T.green : "transparent" }}
        >
          {done && <Check size={13} color="#04220F" strokeWidth={3} />}
        </button>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm transition-all duration-200" style={{ color: done ? T.textFaint : T.text, textDecoration: done ? "line-through" : "none" }}>{item.title}</p>
        {!compact && <p className="text-[11px] mt-0.5" style={{ color: T.textFaint }}>{item.tag} · {item.when_text}</p>}
      </div>
      {onCycleLevel && !done && (
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
