# Mi Colección de Álbumes

Este repo guarda las dos etapas del TP de Taller: la versión clásica en HTML/CSS/JS y la reescritura en React con Vite.
El objetivo sigue siendo el mismo (mostrar un catálogo de 25 discos y guardar una colección con reseñas).

## Qué hay adentro

- `Primer Parcial/`: la maqueta original, con `index.html`, `mi-coleccion.html`, un `script.js` sencillo y las carpetas
  `Mockup/` + `Sketch/` que se pedían para la entrega.
- `frontend/`: la app en React con Vite, estilos en Sass, componentes reutilizables y toda la lógica de
  ~~filtros~~/colección movida a hooks.

## React

- routing en `App.jsx` usando `react-router-dom`, un `LayoutPrincipal` con `<Outlet />` y páginas para inicio y
  colección
- `Encabezado` arma la búsqueda por texto, ~~el filtro por artista~~ y muestra un botón para limpiar ~~tanto filtros como~~
  datos persistidos.
- `TarjetaAlbum` se usa en el catálogo y en la colección; adentro carga `SeccionResena`, y guarda puntajes/comentarios
  en `localStorage`.
- `api/albumes.js` concentra todo lo relacionado con la colección: sumar/quitar discos, guardar reseñas ~~y recordar
  filtros~~. El catálogo viene de `src/data/albumes.json` con rutas absolutas a imágenes en `public/albums` (sin imports).

## Carpetas clave dentro de `frontend/src`

- `api/`: funciones que hablan con la data local y el storage.
- `components/`: `Boton`, `Encabezado`, `TarjetaAlbum`, `SeccionResena`, `Pie` y `LayoutPrincipal`, cada uno con su
  `.scss`.
- `data/`: JSON del catálogo con URLs que apuntan a `public/albums`.
- `pages/`: `Inicio` y `Coleccion` con sus estilos.
- `styles/`: reset global, variables, mixins y `global.scss` que se importa una sola vez.
- `utils/`: helpers como `storage.js` para leer/escribir JSON sin repetir try/catch.
