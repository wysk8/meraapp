import { useEffect, useState } from "react";
import { supabase, supabaseEnabled } from "../lib/supabaseClient.js";

// Mientras no haya Supabase configurado, la app funciona sin login
// (modo local, un solo usuario). En cuanto agregues las variables de
// entorno de Supabase, esto empieza a exigir sesión real.
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(supabaseEnabled);

  useEffect(() => {
    if (!supabaseEnabled) return;
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signInWithPassword = (email, password) => supabase.auth.signInWithPassword({ email, password });
  const signUp = (email, password) => supabase.auth.signUp({ email, password });
  const signOut = () => supabase.auth.signOut();

  return { user, loading, authRequired: supabaseEnabled, signInWithPassword, signUp, signOut };
}
