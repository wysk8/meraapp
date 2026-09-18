# MeraPela — Centro de Control

Aplicación real (React + Vite) para que MeraPela controle su contenido,
agenda, pendientes, ideas y plata en un solo lugar.

## Qué es real y qué es demo ahora mismo

| Parte | Estado |
|---|---|
| Interfaz, navegación, identidad visual | Real, terminada |
| Contenido, Pendientes, Ideas, Agenda, Gastos hormiga | Real — se guardan en tu navegador (localStorage) ya mismo, y pasan a Supabase automáticamente en cuanto lo conectes |
| Ingresos totales, gastos recurrentes, Stats (vistas/seguidores) | Todavía son cifras de ejemplo — no vienen de ninguna plataforma real |
| Reconocimiento de voz | Real (usa el navegador, sin servicio externo) |
| Chat de IA | Simulado con reglas locales — ver sección "Conectar la IA de verdad" |
| Login | Desactivado mientras no conectes Supabase (modo local, un solo usuario) |

## 1. Instalar y correr en tu computador

Necesitas [Node.js](https://nodejs.org) 18 o más nuevo instalado.

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`).
En este punto la app ya funciona completa en modo local — puedes usarla,
agregar ideas, pendientes, gastos hormiga, y todo se guarda en tu navegador.

## 2. Conectar Supabase (base de datos real + login)

1. Crea una cuenta gratis en [supabase.com](https://supabase.com) y crea un proyecto nuevo.
2. En tu proyecto: **SQL Editor** → pega todo el contenido de `supabase/schema.sql` → **Run**.
   Esto crea las tablas (`content`, `tasks`, `ideas`, `calendar_events`, `finances`,
   `platform_stats`, `profiles`) y activa Row Level Security, así que cada
   usuario solo ve y edita sus propios datos.
3. En tu proyecto: **Project Settings → API** → copia:
   - `Project URL`
   - `anon public key`
4. Copia `.env.example` a un archivo nuevo llamado `.env` y pega ahí esos dos valores:
   ```
   VITE_SUPABASE_URL=https://tuproyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
5. Reinicia `npm run dev`. La app ahora pedirá login (correo + contraseña) y
   guardará todo en Supabase en vez de en tu navegador — automáticamente,
   sin que haya que tocar ninguna pantalla.

**Nota sobre el correo de confirmación:** por defecto Supabase exige
confirmar el correo antes de poder entrar. Si estás probando solo tú,
puedes desactivarlo temporalmente en **Authentication → Providers → Email
→ "Confirm email"** (apágalo), o revisar tu bandeja de entrada normalmente.

## 3. Conectar la IA de verdad (Claude)

Hoy el chat de IA responde con reglas simuladas en `src/services/ai.js`.
Para conectar la API real de Claude:

1. **Nunca pongas la API key de Claude en el frontend** (ni en variables
   `VITE_*` — esas quedan visibles en el navegador de cualquiera que abra
   la app). La key tiene que vivir en un servidor.
2. La forma más simple con este stack: crea una **Supabase Edge Function**
   (`supabase functions new ask-ai`) que reciba la pregunta, llame a la API
   de Claude con la key guardada como secreto (`supabase secrets set
   ANTHROPIC_API_KEY=...`), y devuelva la respuesta.
3. En `src/services/ai.js`, reemplaza el cuerpo de `askAI()` por un
   `fetch()` a esa función. El comentario en ese archivo ya trae el ejemplo
   de cómo se vería.

No lo hice yo mismo en este paquete porque requiere que tú tengas ya el
proyecto de Supabase creado (paso 2) y decidas tú cuándo activar el gasto
de la API de Claude.

## 4. Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa ese
   repositorio. Vercel detecta Vite automáticamente.
3. En **Environment Variables**, agrega `VITE_SUPABASE_URL` y
   `VITE_SUPABASE_ANON_KEY` con los mismos valores de tu `.env`.
4. Deploy. Te da una URL tipo `merapela.vercel.app`.
5. Si compras un dominio, lo conectas desde **Project Settings → Domains**
   (por ejemplo `app.merapela.com`).

## Estructura del proyecto

```
src/
  components/   piezas de UI reutilizables (Panel, HangTag, QuickAddRow, etc.)
  pages/        una pantalla por archivo (Inicio, Plata, Contenido, ...)
  hooks/        useContentItems, useTasks, useIdeas, useEvents, useGastosHormiga,
                useAuth, useCountUp, useSpeechToText
  services/     acceso a datos — usan Supabase si está configurado, si no localStorage
  lib/          tokens de diseño, cliente de Supabase, configuración de navegación
  data/         datos de ejemplo (semilla inicial)
supabase/
  schema.sql    tablas + Row Level Security, listo para pegar en Supabase
```

## 5. Tenerla "a la mano" en el celular (instalarla como app)

Esto no depende de Supabase — es la app misma (ya viene lista, configurada
con `vite-plugin-pwa`). Solo funciona una vez esté **desplegada con HTTPS**
(paso 4, Vercel) — no funciona probándola en `localhost`.

**En Android (Chrome):** al abrir el link, Chrome ofrece solo "Agregar a
pantalla de inicio" o "Instalar app" automáticamente. Con un toque queda
un ícono igual al de cualquier app — abre sin la barra del navegador.

**En iPhone (Safari):** Apple no deja que aparezca solo — hay que abrir el
link en Safari, tocar el ícono de compartir (el cuadrado con la flecha
hacia arriba) y elegir "Agregar a pantalla de inicio". Ahí también queda
como ícono propio, sin la barra de Safari.

Los íconos ya están generados (`public/pwa-192.png`, `pwa-512.png`, etc.)
usando el símbolo MP de la marca — si quieres cambiarlos, reemplaza esos
archivos con el mismo nombre y tamaño.

## 6. Stats — actualización manual por ahora

Se decidió no conectar las APIs de las plataformas todavía (Kick, YouTube,
Instagram, TikTok exigen registrar apps y, en el caso de Instagram/TikTok,
revisión de Meta que puede tardar semanas). En su lugar, cada plataforma
se actualiza a mano desde la propia pantalla de Stats — mismo patrón de
"escribe y enter" que ya usas en Ideas o Plata. Cuando más adelante
quieran conectar alguna de verdad, se reemplaza sin tocar la pantalla.

## Cosas que quedaron pendientes a propósito

- **Stats real** (conectar YouTube/TikTok/Instagram/Kick): cada plataforma
  tiene su propio proceso de autenticación (OAuth) y son 4 integraciones
  distintas. Vale la pena hacerlo como una fase aparte cuando el resto ya
  esté en producción.
- **Ingresos y gastos recurrentes editables**: por ahora los "Gastos
  hormiga" sí son reales; el resto del resumen de Plata sigue siendo
  ejemplo, tal como se decidió en el prototipo para no arriesgar que los
  números parezcan cuadrar sin estarlo.
- **Sincronización entre pestañas/dispositivos en modo local**: mientras
  no conectes Supabase, los datos viven en el navegador donde los
  escribiste — no se ven desde el celular si los agregaste desde el
  computador. Eso se resuelve solo en cuanto conectes Supabase.
