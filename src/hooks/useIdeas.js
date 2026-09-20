import { useEffect, useState } from "react";
import { listIdeas, addIdeaQuick, updateIdea, removeIdea } from "../services/ideasService.js";
import { useAuth } from "./useAuth.js";

const POTENCIALES = ["Por evaluar", "Bajo", "Medio", "Alto"];

export function useIdeas() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listIdeas().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const add = async (title) => {
    const item = await addIdeaQuick(title, user?.id);
    setItems((prev) => [...prev, item]);
  };

  // Toca el potencial para subirlo, sin abrir ningún formulario.
  const cyclePotential = async (id) => {
    const idea = items.find((it) => it.id === id);
    if (!idea) return;
    const idx = POTENCIALES.indexOf(idea.potential);
    const potential = POTENCIALES[(idx + 1) % POTENCIALES.length];
    await updateIdea(id, { potential });
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, potential } : it)));
  };

  const remove = async (id) => {
    await removeIdea(id);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return { items, add, cyclePotential, remove, loading };
}
