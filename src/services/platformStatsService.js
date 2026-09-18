import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";
import { loadCollection, saveCollection } from "./store.js";

const KEY = "platform_stats";
const PLATFORM_NAMES = { kick: "Kick", youtube: "YouTube", tiktok: "TikTok", instagram: "Instagram" };

// "kick 1.2M seguidores" → { platform: "Kick", followers: "1.2M seguidores" }.
// Reconoce el nombre de la plataforma al inicio de la frase; si no lo
// encuentra, no adivina — devuelve null y se avisa en pantalla.
export function parsePlatformUpdate(text) {
  const clean = text.trim();
  const match = clean.match(/^(\w+)\s+(.+)$/);
  if (!match) return null;
  const key = match[1].toLowerCase();
  const platform = PLATFORM_NAMES[key];
  if (!platform) return null;
  return { platform, followers: match[2].trim() };
}

export async function listPlatformStats() {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("platform_stats").select("*").order("fetched_at", { ascending: false });
    if (error) throw error;
    return data;
  }
  return loadCollection(KEY, []);
}

// Guarda el valor más reciente por plataforma (no un historial que crece
// sin fin) — cada actualización reemplaza la anterior de esa plataforma.
export async function updatePlatformStat(platform, followers, userId) {
  if (supabaseEnabled) {
    const { data: existing } = await supabase.from("platform_stats").select("id").eq("platform", platform).eq("user_id", userId).maybeSingle();
    if (existing) {
      const { data, error } = await supabase.from("platform_stats").update({ followers, fetched_at: new Date().toISOString() }).eq("id", existing.id).select().single();
      if (error) throw error;
      return data;
    }
    const { data, error } = await supabase.from("platform_stats").insert({ platform, followers, user_id: userId }).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, []);
  const next = items.filter((it) => it.platform !== platform);
  const entry = { id: Date.now(), platform, followers, fetched_at: new Date().toISOString() };
  saveCollection(KEY, [...next, entry]);
  return entry;
}
