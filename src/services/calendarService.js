import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";
import { loadCollection, saveCollection } from "./store.js";
import { AGENDA_HOY_SEED } from "../data/seedData.js";

const KEY = "calendar_events";

export async function listEvents() {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("calendar_events").select("*").order("start_time", { ascending: true });
    if (error) throw error;
    return data;
  }
  return loadCollection(KEY, AGENDA_HOY_SEED);
}

export async function addEventQuick(title, userId) {
  const item = { time: "Por definir", title, type: "life" };
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("calendar_events").insert({ ...item, user_id: userId }).select().single();
    if (error) throw error;
    return data;
  }
  const items = loadCollection(KEY, AGENDA_HOY_SEED);
  const withId = { id: Date.now(), ...item };
  saveCollection(KEY, [...items, withId]);
  return withId;
}

export async function removeEvent(id) {
  if (supabaseEnabled) {
    const { error } = await supabase.from("calendar_events").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const items = loadCollection(KEY, AGENDA_HOY_SEED);
  saveCollection(KEY, items.filter((it) => it.id !== id));
}
