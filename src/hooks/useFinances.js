import { useEffect, useState } from "react";
import { listFinances, addIngresoQuick, addGastoQuick, addGastoHormigaQuick } from "../services/financesService.js";
import { useAuth } from "./useAuth.js";

export function useFinances() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listFinances().then((data) => { setItems(data); setLoading(false); });
  }, []);

  // "Disponible" y los totales son del MES ACTUAL, no de todo lo que has
  // registrado alguna vez — si no, "Disponible" nunca refleja tu plata real
  // de ahora. Un ítem sin fecha (dato de ejemplo viejo) no se oculta.
  const now = new Date();
  const esDelMesActual = (dateStr) => {
    if (!dateStr) return true;
    const d = new Date(dateStr);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  };
  const itemsDelMes = items.filter((f) => esDelMesActual(f.date));

  const ingresos = itemsDelMes.filter((f) => f.type === "ingreso");
  const gastos = itemsDelMes.filter((f) => f.type === "gasto");
  const gastosHormiga = gastos.filter((g) => g.category === "hormiga");
  const gastosOtros = gastos.filter((g) => g.category !== "hormiga");
  const totalIngresos = ingresos.reduce((a, f) => a + f.amount, 0);
  const totalGastos = gastos.reduce((a, f) => a + f.amount, 0);
  const disponible = totalIngresos - totalGastos;

  const addIngreso = async (text) => addIngresoQuick(text, user?.id).then((item) => setItems((prev) => [...prev, item]));
  const addGasto = async (text) => addGastoQuick(text, user?.id).then((item) => setItems((prev) => [...prev, item]));
  const addGastoHormiga = async (text) => addGastoHormigaQuick(text, user?.id).then((item) => setItems((prev) => [...prev, item]));

  return { items, ingresos, gastos, gastosHormiga, gastosOtros, totalIngresos, totalGastos, disponible, addIngreso, addGasto, addGastoHormiga, loading };
}
