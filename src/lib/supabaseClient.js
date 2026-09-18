import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si no has configurado Supabase todavía (no hay .env), la app sigue
// funcionando con almacenamiento local en el navegador (ver services/store.js).
// En cuanto agregues las variables de entorno, se activa Supabase automáticamente.
export const supabaseEnabled = Boolean(url && anonKey);

export const supabase = supabaseEnabled ? createClient(url, anonKey) : null;
