import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, Bell, Focus } from "lucide-react";
import { T, CAT } from "../lib/tokens.js";
import { NAV, MOBILE_PRIMARY } from "../lib/nav.js";
import { Barcode } from "./ui.jsx";
import { BrandPlate } from "./brand.jsx";
import { useTasks } from "../hooks/useTasks.js";
import { useContentItems } from "../hooks/useContentItems.js";

const GRAIN_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E`;

export default function Layout() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const { items: pendientes } = useTasks();
  const { items: contentItems } = useContentItems();

  const notifications = [
    ...pendientes.filter((p) => p.must).map((p) => ({ id: `p-${p.id}`, text: `Pendiente urgente: ${p.title}`, color: CAT.alerta, to: "/pendientes" })),
    ...contentItems.filter((c) => c.stage === "REVISION").map((c) => ({ id: `c-${c.id}`, text: `En revisión: ${c.title}`, color: CAT.contenido, to: "/contenido" })),
  ];

  return (
    <div className="relative overflow-x-hidden" style={{ background: `radial-gradient(circle at 12% -5%, rgba(204,255,26,0.06), transparent 38%), radial-gradient(circle at 90% 105%, rgba(141,124,246,0.06), transparent 40%), ${T.bg}`, minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `url("${GRAIN_SVG}")`, opacity: 0.1, mixBlendMode: "overlay", zIndex: 1 }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)", zIndex: 1 }} />

      <div className="flex max-w-[1200px] mx-auto relative" style={{ zIndex: 2 }}>
        <aside className="hidden md:flex flex-col w-56 shrink-0 p-5 gap-6 relative overflow-y-auto sticky top-0" style={{ borderRight: `1px solid ${T.line}`, height: "100vh" }}>
          <BrandPlate />
          <nav className="flex flex-col gap-1">
            {NAV.map((n, i) => (
              <NavLink key={n.path} to={n.path} end={n.path === "/"} className={({ isActive }) => "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-left transition-colors"}
                style={({ isActive }) => ({ background: isActive ? T.greenSoft : "transparent", color: isActive ? T.green : T.textDim })}>
                <span style={{ fontFamily: T.mono, fontSize: 10, width: 14 }}>{String(i + 1).padStart(2, "0")}</span>
                <n.icon size={17} />{n.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto relative">
            <Barcode color={T.green} opacity={0.6} width={130} height={20} />
            <p className="text-[9px] mt-1.5" style={{ color: T.textFaint, fontFamily: T.mono, letterSpacing: 0.5 }}>04°42'N 74°04'W — BOGOTÁ</p>
            <p className="text-[11px] mt-2" style={{ color: T.textFaint }}>Centro de control · v1.0</p>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col">
          <header className="sticky top-0 z-10" style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${T.line}` }}>
            <div className="flex items-center justify-between px-4 md:px-6 pt-4 pb-2.5 gap-3">
              <div className="min-w-0">
                <p className="truncate" style={{ color: T.text, fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, lineHeight: 1 }}>¡QUÉ MÁS, MERA!</p>
                <span className="inline-block mt-1" style={{ width: 46, height: 3, background: T.green }} />
              </div>
              <div className="flex items-center gap-2 shrink-0 relative">
                <button onClick={() => setFocus(!focus)} className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg active:scale-95 transition-transform" style={{ background: focus ? T.green : "transparent", color: focus ? "#04220F" : T.textDim, border: `1.5px solid ${focus ? T.green : T.line}` }}><Focus size={13} /> ENFOQUE</button>
                <button onClick={() => setNotifOpen((v) => !v)} className="w-9 h-9 rounded-full flex items-center justify-center relative active:scale-90 transition-transform" style={{ border: `1px solid ${T.line}` }}>
                  <Bell size={16} color={T.textDim} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: T.green, color: "#04220F" }}>{notifications.length}</span>
                  )}
                </button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                    <div className="absolute top-11 right-0 w-64 rounded-md p-3 z-40" style={{ background: "#101012", border: `1px solid ${T.cardBorder}` }}>
                      <p className="text-xs font-semibold mb-2" style={{ color: T.textDim }}>NOTIFICACIONES</p>
                      {notifications.length === 0 && <p className="text-xs" style={{ color: T.textFaint }}>Nada pendiente por ahora.</p>}
                      <div className="flex flex-col gap-2">
                        {notifications.map((n) => (
                          <button key={n.id} onClick={() => { navigate(n.to); setNotifOpen(false); }} className="flex items-start gap-2 text-left text-xs" style={{ color: T.text }}>
                            <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: n.color }} />
                            {n.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 md:px-6 py-4 pb-24 md:pb-8" style={{ animation: "screenIn 0.35s ease" }}>
            <Outlet context={{ focus }} />
          </main>
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex items-stretch z-20" style={{ background: "rgba(9,10,12,0.92)", backdropFilter: "blur(10px)", borderTop: `1px solid ${T.line}` }}>
        {MOBILE_PRIMARY.map((path) => {
          const n = NAV.find((x) => x.path === path);
          return (
            <NavLink key={path} to={path} end={path === "/"} className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:scale-90 transition-transform">
              {({ isActive }) => (
                <>
                  <n.icon size={18} color={isActive ? T.green : T.textFaint} />
                  <span className="text-[10px]" style={{ color: isActive ? T.green : T.textFaint }}>{n.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
        <button onClick={() => setMoreOpen(true)} className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:scale-90 transition-transform">
          <Menu size={18} color={T.textFaint} /><span className="text-[10px]" style={{ color: T.textFaint }}>Más</span>
        </button>
      </nav>

      {moreOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setMoreOpen(false)}>
          <div className="w-full rounded-t-none p-5" style={{ background: "#101012", border: `1px solid ${T.cardBorder}`, borderBottom: "none" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold" style={{ color: T.text }}>Más secciones</p>
              <button onClick={() => setMoreOpen(false)} className="active:scale-90 transition-transform"><X size={18} color={T.textFaint} /></button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {NAV.filter((n) => !MOBILE_PRIMARY.includes(n.path)).map((n) => (
                <button key={n.path} onClick={() => { navigate(n.path); setMoreOpen(false); }} className="flex flex-col items-center gap-2 p-3 rounded-2xl active:scale-95 transition-transform" style={{ border: `1px solid ${T.line}` }}>
                  <n.icon size={18} color={T.textDim} /><span className="text-[11px]" style={{ color: T.textDim }}>{n.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
