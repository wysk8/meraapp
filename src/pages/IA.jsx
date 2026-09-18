import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Settings2 } from "lucide-react";
import { T } from "../lib/tokens.js";
import { askAI } from "../services/ai.js";
import { Panel } from "../components/ui.jsx";

const CHAT_SUGERENCIAS = ["¿Qué tengo mañana?", "¿Qué contenido tenemos pendiente?", "Dame ideas para el próximo stream", "¿Qué videos funcionaron mejor esta semana?"];

export default function IA() {
  const [messages, setMessages] = useState([{ from: "ia", text: "Pregúntame lo que necesites sobre tu contenido, agenda o plata." }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setInput("");
    const answer = await askAI(q);
    setMessages((m) => [...m, { from: "ia", text: answer }]);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <div><h1 className="leading-none flex items-center gap-2" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 0.5 }}><Sparkles size={22} color={T.green} /> Habla con tu IA</h1></div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CHAT_SUGERENCIAS.map((s) => (
          <button key={s} onClick={() => send(s)} className="text-xs px-3 py-2 rounded-lg shrink-0 active:scale-95 transition-transform" style={{ color: T.textDim, border: `1.5px solid ${T.line}` }}>{s}</button>
        ))}
      </div>
      <Panel brackets className="p-3 flex-1 flex flex-col gap-2 overflow-y-auto min-h-[280px] max-h-[420px]">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded-3xl text-sm ${m.from === "user" ? "self-end" : "self-start"}`} style={{ background: m.from === "user" ? T.green : "rgba(255,255,255,0.06)", color: m.from === "user" ? "#04220F" : T.text, animation: "riseIn 0.3s ease" }}>{m.text}</div>
        ))}
        <div ref={scrollRef} />
      </Panel>
      <div className="flex items-center gap-2 p-1 rounded-lg" style={{ border: `1.5px solid ${T.line}` }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Escribe tu pregunta..." className="flex-1 bg-transparent text-sm outline-none px-3" style={{ color: T.text }} />
        <button onClick={() => send()} className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 active:scale-90 transition-transform" style={{ background: T.green }}><Send size={15} color="#04220F" /></button>
      </div>
      <div className="flex items-center justify-between px-1">
        <p className="text-[10px]" style={{ color: T.textFaint }}>Modo local (sin API) · conecta la API de Claude para más funciones</p>
        <Settings2 size={13} color={T.textFaint} />
      </div>
    </div>
  );
}
