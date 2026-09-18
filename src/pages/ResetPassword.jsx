import { useState } from "react";
import { T, CAT } from "../lib/tokens.js";
import { useAuth } from "../hooks/useAuth.js";

export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const { error } = await updatePassword(password);
    if (error) setError(error.message);
    else setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: T.bg }}>
      <form onSubmit={submit} className="w-full max-w-sm flex flex-col gap-3 p-6 rounded-md" style={{ border: `1px solid ${T.line}`, background: "#101012" }}>
        <p style={{ fontFamily: "'Rubik Wet Paint', cursive", fontSize: 28, color: T.green }}>MERAPELA</p>
        <p className="text-sm" style={{ color: T.textDim }}>Pon tu contraseña nueva.</p>
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="contraseña nueva" type="password" required minLength={6}
          className="px-3 py-2.5 rounded-lg text-sm bg-transparent outline-none" style={{ border: `1.5px solid ${T.line}`, color: T.text }} />
        {error && <p className="text-xs" style={{ color: T.red }}>{error}</p>}
        {done ? (
          <>
            <p className="text-xs" style={{ color: T.green }}>Listo, tu contraseña quedó cambiada.</p>
            <a href="/" className="py-2.5 rounded-lg text-sm font-semibold text-center" style={{ background: CAT.plata, color: "#04220F" }}>Entrar a MeraPela</a>
          </>
        ) : (
          <button type="submit" className="py-2.5 rounded-lg text-sm font-semibold" style={{ background: CAT.plata, color: "#04220F" }}>Guardar contraseña</button>
        )}
      </form>
    </div>
  );
}
