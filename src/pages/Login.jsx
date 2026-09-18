import { useState } from "react";
import { T, CAT } from "../lib/tokens.js";
import { useAuth } from "../hooks/useAuth.js";

export default function Login() {
  const { signInWithPassword, signUp, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("in"); // in | up | recover
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (mode === "recover") {
      const { error } = await resetPassword(email);
      if (error) setError(error.message);
      else setInfo("Listo — revisa tu correo para poner una contraseña nueva.");
      return;
    }

    const { error } = mode === "in" ? await signInWithPassword(email, password) : await signUp(email, password);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: T.bg }}>
      <form onSubmit={submit} className="w-full max-w-sm flex flex-col gap-3 p-6 rounded-md" style={{ border: `1px solid ${T.line}`, background: "#101012" }}>
        <p style={{ fontFamily: "'Rubik Wet Paint', cursive", fontSize: 28, color: T.green }}>MERAPELA</p>

        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo" type="email" required
          className="px-3 py-2.5 rounded-lg text-sm bg-transparent outline-none" style={{ border: `1.5px solid ${T.line}`, color: T.text }} />

        {mode !== "recover" && (
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="contraseña" type="password" required
            className="px-3 py-2.5 rounded-lg text-sm bg-transparent outline-none" style={{ border: `1.5px solid ${T.line}`, color: T.text }} />
        )}

        {error && <p className="text-xs" style={{ color: T.red }}>{error}</p>}
        {info && <p className="text-xs" style={{ color: T.green }}>{info}</p>}

        <button type="submit" className="py-2.5 rounded-lg text-sm font-semibold" style={{ background: CAT.plata, color: "#04220F" }}>
          {mode === "in" ? "Entrar" : mode === "up" ? "Crear cuenta" : "Enviar link de recuperación"}
        </button>

        {mode !== "recover" && (
          <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setError(""); setInfo(""); }} className="text-xs" style={{ color: T.textFaint }}>
            {mode === "in" ? "¿No tienes cuenta? Créala" : "¿Ya tienes cuenta? Entra"}
          </button>
        )}
        {mode === "in" && (
          <button type="button" onClick={() => { setMode("recover"); setError(""); setInfo(""); }} className="text-xs" style={{ color: T.textFaint }}>
            ¿Olvidaste tu contraseña?
          </button>
        )}
        {mode === "recover" && (
          <button type="button" onClick={() => { setMode("in"); setError(""); setInfo(""); }} className="text-xs" style={{ color: T.textFaint }}>
            Volver a entrar
          </button>
        )}
      </form>
    </div>
  );
}
