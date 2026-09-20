import { useEffect, useState } from "react";
import { listEvents, addEventQuick, removeEvent } from "../services/calendarService.js";
import { useAuth } from "./useAuth.js";

export function useEvents() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEvents().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const add = async (title) => {
    const item = await addEventQuick(title, user?.id);
    setItems((prev) => [...prev, item]);
  };

  const remove = async (id) => {
    await removeEvent(id);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return { items, add, remove, loading };
}
