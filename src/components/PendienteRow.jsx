import { T, LEVEL_META } from "../lib/tokens.js";
import { HangTag } from "./ui.jsx";

export default function PendienteRow({ item, compact }) {
  const meta = LEVEL_META[item.level];
  return (
    <div className="flex items-center gap-3 rounded-lg px-3.5 py-3 active:scale-[0.99] transition-transform" style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px dashed ${meta.color}` }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm" style={{ color: T.text }}>{item.title}</p>
        {!compact && <p className="text-[11px] mt-0.5" style={{ color: T.textFaint }}>{item.tag} · {item.when_text}</p>}
      </div>
      <HangTag label={meta.label} color={meta.color} />
    </div>
  );
}
