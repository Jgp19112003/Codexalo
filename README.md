# Codexalo - Landing Page

Landing page profesional para servicios de desarrollo de TFGs, prácticas de DAM/DAW y proyectos académicos.

## Características

- ✅ Diseño profesional y académico
- ✅ Completamente responsive
- ✅ Formulario de contacto funcional
- ✅ Secciones optimizadas para conversión
- ✅ Garantía de aprobado destacada
- ✅ SEO optimizado

## Tecnologías utilizadas

- React 19
- TypeScript
- Vite
- CSS moderno con variables CSS

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Vista previa de la compilación
pnpm preview
```

## Estructura

```
src/
├── App.tsx        # Componente principal con toda la landing
├── App.css        # Estilos de la landing page
├── index.css      # Estilos globales y variables CSS
└── main.tsx       # Punto de entrada
```

## Personalización

Para personalizar la landing page:

1. **Colores**: Editar variables CSS en `src/index.css`
2. **Contenido**: Modificar el componente `App.tsx`
3. **Estilos**: Ajustar `src/App.css`

## Deployment

El proyecto está listo para deployment en cualquier plataforma:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Contacto

Para integrar el formulario de contacto con un backend real, modificar la función `handleSubmit` en `App.tsx`.
