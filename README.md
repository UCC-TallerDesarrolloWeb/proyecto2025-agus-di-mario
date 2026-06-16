# Mi Colección de Álbumes

Este repo guarda las dos etapas del TP de Taller: la versión clásica en HTML/CSS/JS y la reescritura en React con Vite.
El objetivo sigue siendo el mismo (mostrar un catálogo de 25 discos y guardar una colección con reseñas).

## Qué hay adentro

- `Primer Parcial/`: la maqueta original, con `index.html`, `mi-coleccion.html`, un `script.js` sencillo y las carpetas
  `Mockup/` + `Sketch/` que se pedían para la entrega.
- `frontend/`: la app en React con Vite, estilos en Sass, componentes reutilizables y toda la lógica de
  colección movida a una capa de API.

## Desarrollo

Para correr la app en local hacen falta **dos terminales** abiertas desde `frontend/`:

```bash
npm run server   # API mock con json-server en localhost:3001
npm run dev      # servidor de desarrollo Vite en localhost:5173
```

Otros comandos útiles:

```bash
npm run build    # build de producción (debe correr sin errores antes de entregar)
npm run lint     # ESLint sobre todo el proyecto
npm run preview  # previsualizar el build
npm test         # correr la suite de tests con Jest
```

## React

- Routing en `App.jsx` con `react-router-dom`: una ruta padre `Layout` con `<Outlet />` y páginas para inicio y colección.
- `Encabezado` maneja la búsqueda por texto y expone un botón para limpiar la colección.
- `TarjetaAlbum` se usa en el catálogo y en la colección; adentro carga `SeccionResena`, y guarda puntajes/comentarios
  vía `PATCH /coleccion/:id` en json-server.
- `src/api/albumes.js` concentra todo lo relacionado con la colección: sumar/quitar discos, guardar reseñas. El catálogo
  viene de `GET /albumes` (json-server, datos en `db.json`).

## Carpetas clave dentro de `frontend/src`

- `api/`: funciones `async/await` que hablan con json-server en `localhost:3001`.
- `components/`: `Encabezado`, `TarjetaAlbum`, `SeccionResena` y `Pie`, cada uno con su `.scss`.
- `pages/`: `Layout` (ruta padre con `<Encabezado>`, `<Pie>` y `<Outlet>`), `Inicio` y `Coleccion`.
- `styles/`: reset global, variables, mixins y `global.scss` que se importa una sola vez en `App.jsx`.
- `utils/`: helpers como `storage.js` para leer/escribir JSON en localStorage (disponible como utilidad genérica).
- `__tests__/`: tests unitarios con Jest + React Testing Library.

## Tests

Jest y React Testing Library están configurados. Para correr la suite:

```bash
cd frontend
npm test
```

Los tests cubren renderizado de componentes, validaciones, eventos de click, fetch de datos mockeado y operaciones CRUD.
