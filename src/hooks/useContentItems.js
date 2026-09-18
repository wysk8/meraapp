import { useEffect, useState } from "react";
import { listContent, addContentQuick, updateContent, removeContent } from "../services/contentService.js";
import { STAGES } from "../lib/tokens.js";
import { useAuth } from "./useAuth.js";

export function useContentItems() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listContent().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const add = async (title) => {
    const item = await addContentQuick(title, user?.id);
    setItems((prev) => [...prev, item]);
  };

  // Avanza al siguiente estado del flujo (IDEA → PLANIFICADO → ... → PUBLICADO).
  // Si ya está en el último, no hace nada.
  const advanceStage = async (id) => {
    const item = items.find((it) => it.id === id);
    if (!item) return;
    const idx = STAGES.indexOf(item.stage);
    if (idx === -1 || idx === STAGES.length - 1) return;
    const stage = STAGES[idx + 1];
    await updateContent(id, { stage });
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, stage } : it)));
  };

  const remove = async (id) => {
    await removeContent(id);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return { items, add, advanceStage, remove, loading };
}
