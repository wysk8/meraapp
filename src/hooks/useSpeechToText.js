import { useEffect, useRef, useState } from "react";

// Reconocimiento de voz nativo del navegador (sin servicios externos).
// Si el navegador o el permiso de micrófono no lo permiten, queda
// deshabilitado en vez de simular que funciona.
export function useSpeechToText(onResult) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [deniedMsg, setDeniedMsg] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) {
      setSupported(false);
      return;
    }
    const recognition = new SR();
    recognition.lang = "es-CO";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      onResult(text);
    };
    recognition.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") setDeniedMsg("micrófono bloqueado por el navegador");
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    return () => {
      try {
        recognition.stop();
      } catch (err) {}
    };
  }, []);

  const start = () => {
    setDeniedMsg("");
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (err) {}
  };
  const stop = () => {
    try {
      recognitionRef.current?.stop();
    } catch (err) {}
    setListening(false);
  };

  return { listening, supported, deniedMsg, start, stop };
}
