import { Home, Clapperboard, Wallet, CalendarDays, CheckSquare, Lightbulb, BarChart3, Sparkles, User } from "lucide-react";

export const NAV = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/contenido", label: "Contenido", icon: Clapperboard },
  { path: "/plata", label: "Plata", icon: Wallet },
  { path: "/agenda", label: "Agenda", icon: CalendarDays },
  { path: "/pendientes", label: "Pendientes", icon: CheckSquare },
  { path: "/ideas", label: "Ideas", icon: Lightbulb },
  { path: "/stats", label: "Stats", icon: BarChart3 },
  { path: "/ia", label: "IA", icon: Sparkles },
  { path: "/perfil", label: "Mi perfil", icon: User },
];

export const MOBILE_PRIMARY = ["/", "/contenido", "/pendientes", "/plata"];
