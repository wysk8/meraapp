import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";
import { loadCollection, saveCollection } from "./store.js";
import { CONTENT_ITEMS_SEED } from "../data/seedData.js";
import { detectPlatform } from "../lib/detectPlatform.js";

const KEY = "content";

export async function listContent() {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("content").select("*").order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  }
  return loadCollection(KEY, CONTENT_ITEMS_SEED);
}

// Captura rápida: si mencionas una plataforma (kick, youtube, tiktok,
// instagram...) en cualquier parte de la frase, la reconoce sola —
// "video de carreras kick" queda en Kick con título "video de carreras".
// Si no menciona ninguna, el texto completo es el título y la
// plataforma queda "Sin definir".
export async function addContentQuick(text, userId) {
  const detected = detectPlatform(text, "contenido");
  const item = {
    title: detected ? detected.title : text,
    platform: detected ? detected.platform : "Sin definir",
    stage: "IDEA",
    when_text: "Sin fecha",
    note: "",
  };
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("content").insert({ ...item, user_id: userId }).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, CONTENT_ITEMS_SEED);
  const withId = { id: Date.now(), ...item };
  const next = [...items, withId];
  saveCollection(KEY, next);
  return withId;
}

export async function updateContent(id, patch) {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("content").update(patch).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, CONTENT_ITEMS_SEED);
  const next = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
  saveCollection(KEY, next);
  return next.find((it) => it.id === id);
}

export async function removeContent(id) {
  if (supabaseEnabled) {
    const { error } = await supabase.from("content").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const items = loadCollection(KEY, CONTENT_ITEMS_SEED);
  saveCollection(KEY, items.filter((it) => it.id !== id));
}
