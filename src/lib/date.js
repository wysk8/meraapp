// Fechas dinámicas en español — nunca texto fijo.

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// "Hoy, 15 de septiembre"
export function formatHoyLargo(date = new Date()) {
  return `Hoy, ${date.getDate()} de ${MESES[date.getMonth()]}`;
}

// "JUE 15 SEP"
export function formatCortoMayus(date = new Date()) {
  return `${DIAS[date.getDay()].slice(0, 3).toUpperCase()} ${date.getDate()} ${MESES[date.getMonth()].slice(0, 3).toUpperCase()}`;
}

export function anioActual() {
  return new Date().getFullYear();
}
