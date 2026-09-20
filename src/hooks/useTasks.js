import { useEffect, useState } from "react";
import { listTasks, addTaskQuick, updateTask, removeTask } from "../services/tasksService.js";
import { useAuth } from "./useAuth.js";

const LEVELS = ["urgente", "importante", "normal", "opcional"];

export function useTasks() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTasks().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const add = async (title) => {
    const item = await addTaskQuick(title, user?.id);
    setItems((prev) => [...prev, item]);
  };

  // Toca la etiqueta de nivel para subirla/bajarla, sin abrir ningún formulario.
  const cycleLevel = async (id) => {
    const task = items.find((it) => it.id === id);
    if (!task) return;
    const idx = LEVELS.indexOf(task.level);
    const level = LEVELS[(idx + 1) % LEVELS.length];
    const must = level === "urgente" || level === "importante";
    await updateTask(id, { level, must });
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, level, must } : it)));
  };

  const remove = async (id) => {
    await removeTask(id);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return { items, add, cycleLevel, remove, loading };
}
