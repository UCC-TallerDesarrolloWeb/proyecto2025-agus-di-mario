# Mi Colección de Álbumes

## Índice
1. [Descripción General](#descripción-general)
2. [Autores](#autores)
3. [Tecnologías](#tecnologías)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Scripts y Testing](#scripts-y-testing)
6. [Recursos de Referencia](#recursos-de-referencia)

## Descripción General
### Objetivo
**Mi Colección de Álbumes** moderniza el sitio original en HTML/CSS/JS con una aplicación creada en React + Vite y estilos en **SASS**, manteniendo exactamente la estética, las proporciones y el contenido visual del diseño base. La aplicación permite explorar un catálogo estático, filtrarlo por artista o término de búsqueda y gestionar una colección personal con reseñas persistidas en `localStorage`.

### Contenido de la página
- Catálogo de 25 discos importados desde `/frontend/src/data/albumes.json` y renderizados como tarjetas responsivas.
- Formularios accesibles con `label`/`htmlFor`, atributos `size`, `placeholder` y validaciones en tiempo real (`onChange`) para reseñas y puntajes.
- Persistencia de filtros, colección y preferencia de **tema claro/oscuro** mediante `useState`, `useEffect`, `useContext` y `useNavigate` (para la navegación programática).
- Ruteo con `react-router-dom`, uso de `<Outlet />` en `LayoutPrincipal` y un componente genérico `Boton` reutilizado en encabezados, formularios y páginas de error.
- Hook personalizado `useTema` que demuestra almacenamiento de preferencias en `localStorage` y la aplicación de estilos condicionales en modo oscuro.

## Autores
- Agustín Di Mario (Taller de Desarrollo Web 2025)

## Tecnologías
| Categoría          | Herramienta / Servicio        | Uso principal |
|--------------------|-------------------------------|---------------|
| Frontend           | **React 19** + [Vite](https://vitejs.dev/) | SPA con HMR y build rápido |
| Estilos            | SASS (SCSS)                   | Variables, mixins y anidado |
| Ruteo              | `react-router-dom`            | Navegación, `Outlet`, `useNavigate` |
| Estado/Contexto    | Hooks (`useState`, `useEffect`, `useContext`, `useMemo`) | Lógica de filtros, tema y formularios |
| Datos              | JSON local (`albumes.json`)   | Fuente única del catálogo |
| Almacenamiento     | `window.localStorage`         | Colección, filtros, reseñas y tema |
| Linter             | ESLint + reglas oficiales     | Verificación de estilo y calidad |
| Legacy             | HTML5 + CSS3 + JS vanilla     | Mantiene la primera etapa del proyecto |

## Arquitectura del Proyecto
### React (`/frontend`)
- `src/components`: `Encabezado`, `TarjetaAlbum`, `Boton`, `SeccionResena`, `Pie` y `LayoutPrincipal` (con `<Outlet />`). Cada componente tiene su propio `.scss`.
- `src/pages`: `Inicio`, `Coleccion` y `PaginaNoEncontrada`, todas con archivos de estilo independientes.
- `src/data`: `albumes.json` + `albumes.js`, donde se resuelve cada imagen usando `import.meta.glob` desde `/src/assets/albums`.
- `src/styles`: `_variables.scss`, `_mixins.scss`, `_reset.scss` y `global.scss` importado en `App.jsx` (sin estilos inline).
- `src/context`: `TemaContext.jsx` que expone `TemaProvider` y `useTema` para registrar el modo preferido.
- `src/utils`: helpers documentados (`storage.js`) para leer y escribir JSON en `localStorage`.

### Etapa Legacy (Primer Parcial)
- `index.html`, `mi-coleccion.html`, `style.css` y `script.js` continúan disponibles para referencia histórica, ahora apuntando a las imágenes ubicadas en `FRONTEND/src/assets/albums`.
- Carpeta `Mockup/` y `Sketch/` conservan los bocetos exigidos durante la primera etapa.

## Scripts y Testing
### Comandos Principales (ejecutar dentro de `/FRONTEND`)
- `npm install`: instala dependencias del proyecto React.
- `npm run dev`: levanta Vite con HMR en modo desarrollo.
- `npm run lint`: ejecuta ESLint sobre todo el código fuente (sin advertencias actuales).
- `npm run build`: genera la versión optimizada para producción.
- `npm run preview`: sirve la build generada para validar el resultado final.

## Recursos de Referencia
- Carpeta `Mockup/` con el wireframe aprobado y `Sketch/` con los bocetos iniciales.
- `FRONTEND/src/assets/albums`: todas las imágenes originales migradas desde `./imagenes` para cumplir con el requerimiento del segundo parcial.
- `db.json`: se mantiene para pruebas con `json-server`, aunque la app React consume el dataset normalizado dentro de `/src/data`.


