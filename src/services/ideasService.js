import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";
import { loadCollection, saveCollection } from "./store.js";
import { IDEAS_SEED } from "../data/seedData.js";

const KEY = "ideas";

export async function listIdeas() {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("ideas").select("*").order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  }
  return loadCollection(KEY, IDEAS_SEED);
}

export async function addIdeaQuick(title, userId) {
  const item = { title, platform: "Sin definir", format: "Sin definir", potential: "Por evaluar" };
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("ideas").insert({ ...item, user_id: userId }).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, IDEAS_SEED);
  const withId = { id: Date.now(), ...item };
  saveCollection(KEY, [...items, withId]);
  return withId;
}

export async function removeIdea(id) {
  if (supabaseEnabled) {
    const { error } = await supabase.from("ideas").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const items = loadCollection(KEY, IDEAS_SEED);
  saveCollection(KEY, items.filter((it) => it.id !== id));
}
