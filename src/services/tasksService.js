import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";
import { loadCollection, saveCollection } from "./store.js";
import { PENDIENTES_SEED } from "../data/seedData.js";

const KEY = "tasks";

export async function listTasks() {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  }
  return loadCollection(KEY, PENDIENTES_SEED);
}

export async function addTaskQuick(title, userId) {
  const item = { title, tag: "General", level: "normal", must: false, when_text: "Hoy" };
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("tasks").insert({ ...item, user_id: userId }).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, PENDIENTES_SEED);
  const withId = { id: Date.now(), ...item };
  saveCollection(KEY, [...items, withId]);
  return withId;
}

export async function updateTask(id, patch) {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("tasks").update(patch).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, PENDIENTES_SEED);
  const next = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
  saveCollection(KEY, next);
  return next.find((it) => it.id === id);
}

export async function removeTask(id) {
  if (supabaseEnabled) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const items = loadCollection(KEY, PENDIENTES_SEED);
  saveCollection(KEY, items.filter((it) => it.id !== id));
}
