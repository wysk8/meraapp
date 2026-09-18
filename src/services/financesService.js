import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";
import { loadCollection, saveCollection } from "./store.js";
import { FINANCES_SEED } from "../data/seedData.js";

const KEY = "finances";

// "papas 5.000" / "$5000 gaseosa" → { desc, amount }.
// Si no encuentra número, guarda la frase completa con monto 0
// en vez de rechazarla — mejor guardar algo que perder la nota.
export function parseAmount(text) {
  const clean = text.trim();
  const match = clean.match(/([\d][\d.,]*)/);
  if (!match) return { desc: clean, amount: 0 };
  const amount = parseInt(match[1].replace(/[.,]/g, ""), 10) || 0;
  const desc = (clean.slice(0, match.index) + clean.slice(match.index + match[1].length))
    .replace(/^[\s$-]+|[\s$-]+$/g, "")
    .trim();
  return { desc: desc || (amount ? "Movimiento" : "Gasto"), amount };
}

// Supabase guarda la columna como "description"; en local usamos "desc".
// Esto uniforma la forma que ve el resto de la app sin importar el origen.
function normalize(row) {
  return { ...row, desc: row.desc ?? row.description ?? "" };
}

export async function listFinances() {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from("finances").select("*").order("date", { ascending: true });
    if (error) throw error;
    return data.map(normalize);
  }
  return loadCollection(KEY, FINANCES_SEED);
}

async function addQuick(text, type, category, userId) {
  const parsed = parseAmount(text);
  if (supabaseEnabled) {
    const { data, error } = await supabase
      .from("finances")
      .insert({ type, category, description: parsed.desc, amount: parsed.amount, user_id: userId })
      .select()
      .single();
    if (error) throw error;
    return normalize(data);
  }
  const items = loadCollection(KEY, FINANCES_SEED);
  const withId = { id: Date.now(), type, category, desc: parsed.desc, amount: parsed.amount };
  saveCollection(KEY, [...items, withId]);
  return withId;
}

export const addIngresoQuick = (text, userId) => addQuick(text, "ingreso", "manual", userId);
export const addGastoQuick = (text, userId) => addQuick(text, "gasto", "manual", userId);
export const addGastoHormigaQuick = (text, userId) => addQuick(text, "gasto", "hormiga", userId);
