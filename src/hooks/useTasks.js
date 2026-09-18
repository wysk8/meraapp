import { useEffect, useState } from "react";
import { listTasks, addTaskQuick } from "../services/tasksService.js";
import { useAuth } from "./useAuth.js";

export function useTasks() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTasks().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const add = async (title) => {
    const item = await addTaskQuick(title, user?.id);
    setItems((prev) => [...prev, item]);
  };

  return { items, add, loading };
}
