import { useEffect, useState } from "react";
import { listPlatformStats, updatePlatformStat, parsePlatformUpdate } from "../services/platformStatsService.js";
import { useAuth } from "./useAuth.js";

export function usePlatformStats() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPlatformStats().then((data) => { setItems(data); setLoading(false); });
  }, []);

  // Mapa {Kick: "1.2M seguidores", ...} — solo lo más reciente por plataforma.
  const byPlatform = {};
  for (const it of items) byPlatform[it.platform] = it.followers;

  const update = async (text) => {
    const parsed = parsePlatformUpdate(text);
    if (!parsed) throw new Error('Escribe la plataforma primero, ej: "kick 1.2M seguidores"');
    const entry = await updatePlatformStat(parsed.platform, parsed.followers, user?.id);
    setItems((prev) => [...prev.filter((it) => it.platform !== parsed.platform), entry]);
  };

  return { byPlatform, update, loading };
}
