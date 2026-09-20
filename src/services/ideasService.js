import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";
import { loadCollection, saveCollection } from "./store.js";
import { IDEAS_SEED } from "../data/seedData.js";
import { detectPlatform } from "../lib/detectPlatform.js";

const KEY = "ideas";

export async function listIdeas() {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("ideas").select("*").order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  }
  return loadCollection(KEY, IDEAS_SEED);
}

export async function addIdeaQuick(text, userId) {
  const detected = detectPlatform(text, "texto");
  const item = {
    title: detected ? detected.title : text,
    platform: detected ? detected.platform : "Sin definir",
    format: "Sin definir",
    potential: "Por evaluar",
  };
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

export async function updateIdea(id, patch) {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("ideas").update(patch).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, IDEAS_SEED);
  const next = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
  saveCollection(KEY, next);
  return next.find((it) => it.id === id);
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
