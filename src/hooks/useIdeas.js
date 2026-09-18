import { useEffect, useState } from "react";
import { listIdeas, addIdeaQuick } from "../services/ideasService.js";
import { useAuth } from "./useAuth.js";

export function useIdeas() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listIdeas().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const add = async (title) => {
    const item = await addIdeaQuick(title, user?.id);
    setItems((prev) => [...prev, item]);
  };

  return { items, add, loading };
}
