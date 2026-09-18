import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Inicio from "./pages/Inicio.jsx";
import Contenido from "./pages/Contenido.jsx";
import Plata from "./pages/Plata.jsx";
import Agenda from "./pages/Agenda.jsx";
import Pendientes from "./pages/Pendientes.jsx";
import Ideas from "./pages/Ideas.jsx";
import Stats from "./pages/Stats.jsx";
import IA from "./pages/IA.jsx";
import Perfil from "./pages/Perfil.jsx";
import { useAuth } from "./hooks/useAuth.js";
import { T } from "./lib/tokens.js";

export default function App() {
  const { user, loading, authRequired } = useAuth();

  if (authRequired && loading) {
    return <div style={{ background: T.bg, minHeight: "100vh" }} />;
  }
  if (authRequired && !user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/contenido" element={<Contenido />} />
          <Route path="/plata" element={<Plata />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/pendientes" element={<Pendientes />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/ia" element={<IA />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
