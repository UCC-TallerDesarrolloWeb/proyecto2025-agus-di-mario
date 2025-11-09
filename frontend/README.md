# Frontend React - Mi Colección de Álbumes

## Resumen

Aplicación creada con **React 19 + Vite** que replica el diseño original del proyecto HTML, pero con una arquitectura
modular y mantenible. Se usan componentes autónomos con sus hojas SCSS, datos extraídos de `src/data/albumes.json` y
utilidades documentadas para la persistencia en `localStorage`.

## Características Clave

- Ruteo con `react-router-dom`, `useNavigate` y un `LayoutPrincipal` que emplea `<Outlet />`.
- Componente genérico `Boton` reutilizado en encabezados, formularios y páginas.
- Validaciones accesibles en tiempo real (`onChange`) dentro de `SeccionResena`, con mensajes `aria-live`.
- Catálogo derivado de JSON local. Las carátulas se sirven desde `public/albums` y el JSON ya trae rutas absolutas
  (no se usan imports ni `import.meta.glob`).
- Persistencia de filtros, reseñas y favoritos en `localStorage` a través del módulo `api/albumes`.

## Estructura de Carpetas

```
src/
├── api            # Funciones para trabajar con localStorage y datos
├── assets         # Branding (las carátulas viven en /public/albums)
├── components     # Componentes con su .scss
├── data           # JSON del catálogo (rutas absolutas a /public/albums)
├── pages          # Rutas Inicio y Coleccion
├── styles         # Reset, variables, mixins y global.scss
└── utils          # Utilidades compartidas (storage)
```

## Scripts

Ejecutar dentro de esta carpeta (`/FRONTEND`):

- `npm install`: instala dependencias.
- `npm run dev`: inicia el entorno de desarrollo con HMR.
- `npm run lint`: ejecuta ESLint (sin errores a la fecha).
- `npm run build`: genera la build productiva en `dist/`.
- `npm run preview`: sirve la build generada para validarla.

## Notas

- Las imágenes del catálogo viven en `public/albums`; no se aceptan estilos inline.
- Para correr `json-server` con la data cruda se puede usar `db.json` en la raíz del repo.
- Toda función expuesta incluye JSDoc y se procura mantener indentación de 2 espacios.
