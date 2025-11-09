# Mi Colección de Álbumes (repo 2025)

Este repo guarda las dos etapas del TP de Taller: la versión clásica en HTML/CSS/JS y la reescritura en React con Vite.
El objetivo sigue siendo el mismo (mostrar un catálogo de 25 discos y guardar una colección con reseñas), solo que ahora
todo es un poco más cómodo de mantener.

## Qué hay adentro

- `Primer Parcial/`: la maqueta original, con `index.html`, `mi-coleccion.html`, un `script.js` sencillo y las carpetas
  `Mockup/` + `Sketch/` que se pedían para la entrega.
- `Segundo Parcial/`: la app en React con Vite, estilos en Sass, componentes reutilizables y toda la lógica de
  filtros/colección movida a hooks.

## React

- routing en `App.jsx` usando `react-router-dom`, un `LayoutPrincipal` con `<Outlet />` y páginas para inicio, colección
  y 404.
- `Encabezado` arma la búsqueda por texto, el filtro por artista y muestra un botón para limpiar tanto filtros como
  datos persistidos.
- `TarjetaAlbum` se usa en el catálogo y en la colección; adentro carga `SeccionResena`, y guarda puntajes/comentarios
  en `localStorage`.
- `api/albumes.js` concentra todo lo relacionado con la colección: sumar/quitar discos, guardar reseñas y recordar
  filtros.
- El tema claro/oscuro se maneja con `TemaProvider`, `useTema` e `InterruptorTema`. Se escribe la preferencia en
  `localStorage` y se aplica al `<html data-tema="...">`.
- Las portadas salen de `src/data/albumes.json` y se resuelven en `data/albumes.js` con `import.meta.glob` para no andar
  importando imagen por imagen.

## Carpetas clave dentro de `Segundo Parcial/src`

- `api/`: funciones que hablan con la data local y el storage.
- `components/`: `Boton`, `Encabezado`, `TarjetaAlbum`, `SeccionResena`, `Pie`, `LayoutPrincipal` e `InterruptorTema`,
  cada uno con su `.scss`.
- `context/`: `TemaContext.jsx` expone el provider y el hook.
- `data/`: JSON del catálogo más el helper que busca las imágenes en `assets/albums`.
- `pages/`: `Inicio`, `Coleccion` y `PaginaNoEncontrada` con sus estilos.
- `styles/`: reset global, variables, mixins y `global.scss` que se importa una sola vez.
- `utils/`: helpers como `storage.js` para leer/escribir JSON sin repetir try/catch.