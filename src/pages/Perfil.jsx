import { Flame } from "lucide-react";
import { T, CAT } from "../lib/tokens.js";
import { BrandStamp, CodeLabel, Sticker } from "../components/brand.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useContentItems } from "../hooks/useContentItems.js";
import { useTasks } from "../hooks/useTasks.js";
import { useIdeas } from "../hooks/useIdeas.js";

// Nivel simple y real, no inventado: cuenta publicaciones + pendientes
// resueltos + ideas capturadas. Sube en la medida en que se usa la app,
// no es una racha de "días seguidos" — eso no lo estamos midiendo todavía.
function calcularNivel(publicados, ideas) {
  const puntos = publicados * 3 + ideas;
  if (puntos >= 15) return { nombre: "Productor", puntos };
  if (puntos >= 6) return { nombre: "En marcha", puntos };
  return { nombre: "Arrancando", puntos };
}

export default function Perfil() {
  const { user, authRequired, signOut } = useAuth();
  const { items: contentItems } = useContentItems();
  const { items: ideas } = useIdeas();
  const publicados = contentItems.filter((c) => c.stage === "PUBLICADO").length;
  const nivel = calcularNivel(publicados, ideas.length);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="leading-none" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}>Mi perfil</h1>
        <div className="mt-1"><CodeLabel text="CTRL//09" /></div>
      </div>
      <div className="flex items-center gap-3">
        <BrandStamp size={64} color={T.green} />
        <div>
          <p className="font-semibold flex items-center gap-1.5" style={{ color: T.text }}>
            MeraPela
            <Sticker label="™" color={T.green} />
          </p>
          <p className="text-xs" style={{ color: T.textFaint }}>{authRequired ? user?.email ?? "Sesión activa" : "Centro de control v1.0 · modo local"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs" style={{ color: T.textFaint }}>Nivel</p>
          <p className="text-lg font-bold mt-1 flex items-center gap-1.5" style={{ color: T.text }}>{nivel.nombre} <Flame size={15} color={CAT.alerta} /></p>
        </div>
        <div>
          <p className="text-xs" style={{ color: T.textFaint }}>Contenido publicado</p>
          <p className="text-lg font-bold mt-1" style={{ color: T.text }}>{publicados}</p>
        </div>
      </div>

      {authRequired && (
        <button onClick={signOut} className="self-start text-xs font-semibold px-3.5 py-2 rounded-lg active:scale-95 transition-transform" style={{ border: `1.5px solid ${T.red}`, color: T.red }}>
          Cerrar sesión
        </button>
      )}
    </div>
  );
}
