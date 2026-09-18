// Respaldo de persistencia con localStorage. Se usa automáticamente
// mientras no haya credenciales de Supabase configuradas (ver
// src/lib/supabaseClient.js). Así, "npm run dev" funciona con datos que
// sobreviven a recargar la página desde el primer minuto, sin depender
// de tener ya una base de datos lista.
//
// Cuando conectes Supabase, cada servicio en src/services/*.js cambia
// automáticamente a leer/escribir en la base de datos real en vez de
// aquí — no hay que tocar las pantallas.

const PREFIX = "merapela:";

export function loadCollection(key, seed) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn("No se pudo leer localStorage para", key, err);
  }
  saveCollection(key, seed);
  return seed;
}

export function saveCollection(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn("No se pudo guardar en localStorage", key, err);
  }
}
