# Assets de MeraPela OS

```
brand/      símbolos y sellos de marca (SVG)
textures/   grano, rasguños, distress (SVG)
graphics/   flechas, marcas dibujadas a mano, códigos (SVG)
photos/     fotos reales (Bogotá, streaming, backstage) — VACÍA por ahora
icons/      íconos sueltos si se necesitan fuera de lucide-react
```

## `photos/` — ya tiene las fotos definitivas

- `hero-bogota.jpg` → hero de Inicio
- `creator-studio.jpg` → banner de Contenido (creación/edición)
- `gaming.jpg` → banner secundario de Contenido (streams/gaming)
- `streaming.jpg` → banner de Agenda
- `social-mobile.jpg` → banner de Ideas
- `plata.jpg` → banner de Plata

Todas optimizadas para web (JPEG, ~200-300KB cada una) a partir de los
originales que subió Felipe. Si necesitas reemplazar alguna, guarda el
archivo nuevo con el mismo nombre en esta carpeta — los componentes ya
apuntan a esas rutas.

## Cuando conectes Supabase Storage

Estos assets estáticos (símbolos, texturas) se quedan aquí siempre —
no cambian por usuario. Lo que sí debería vivir en Supabase Storage
más adelante son las cosas que cada usuario sube: su foto de perfil,
miniaturas de contenido reales, etc. Eso no está conectado todavía;
`src/lib/supabaseClient.js` ya tiene el cliente listo para cuando
llegue ese momento.
