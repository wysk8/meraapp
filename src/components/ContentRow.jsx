import { T, STAGES } from "../lib/tokens.js";
import { Thumb, StageDot, RowMenu } from "./ui.jsx";

export default function ContentRow({ item, onAdvance, onDelete }) {
  const isLast = STAGES.indexOf(item.stage) === STAGES.length - 1;
  return (
    <div className="flex items-center gap-3">
      <Thumb id={item.id} platform={item.platform} />
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate" style={{ color: T.text }}>{item.title}</p>
        <p className="text-[11px]" style={{ color: T.textFaint }}>{item.when_text}</p>
      </div>
      <StageDot stage={item.stage} />
      {(onAdvance || onDelete) && (
        <RowMenu
          onAdvance={!isLast && onAdvance ? () => onAdvance(item.id) : undefined}
          onDelete={onDelete ? () => onDelete(item.id) : undefined}
        />
      )}
    </div>
  );
}
