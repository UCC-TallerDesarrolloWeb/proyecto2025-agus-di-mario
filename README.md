# Mi Colección de Álbumes

Proyecto final de **Taller de Desarrollo Web 2025** — Universidad Católica de Córdoba.

Aplicación web que permite explorar un catálogo de 25 álbumes musicales, armar una colección personal y escribir reseñas
con puntaje para cada disco guardado. El repositorio contiene dos etapas de desarrollo: el prototipo en HTML/CSS/JS
vanilla (Primer Parcial) y la versión final en React con Vite (entrega final).

**Autor:** Agustín Di Mario

---

## Tabla de contenidos

1. [Vista general de la aplicación](#1-vista-general-de-la-aplicación)
2. [Estructura del repositorio](#2-estructura-del-repositorio)
3. [Tecnologías y herramientas](#3-tecnologías-y-herramientas)
4. [Instalación y puesta en marcha](#4-instalación-y-puesta-en-marcha)
5. [Scripts disponibles](#5-scripts-disponibles)
6. [Base de datos — db.json](#6-base-de-datos--dbjson)
7. [Capa de API — src/api/albumes.js](#7-capa-de-api--srcapialbumesjs)
8. [Punto de entrada — index.html y main.jsx](#8-punto-de-entrada--indexhtml-y-mainjsx)
9. [Configuración de rutas — App.jsx](#9-configuración-de-rutas--appjsx)
10. [Páginas](#10-páginas)
    - [Layout.jsx](#layoutjsx)
    - [Inicio.jsx](#iniciojsx)
    - [Coleccion.jsx](#coleccionjsx)
11. [Componentes](#11-componentes)
    - [TarjetaAlbum.jsx](#tarjetaalhumjsx)
    - [Encabezado.jsx](#encabezadojsx)
    - [Pie.jsx](#piejsx)
    - [SeccionResena.jsx](#seccionresenajsx)
12. [Estilos — global.scss](#12-estilos--globalscss)
13. [Configuración de herramientas](#13-configuración-de-herramientas)
    - [vite.config.js](#viteconfigjs)
    - [jest.config.cjs](#jestconfigcjs)
    - [babel.config.cjs](#babelconfigcjs)
    - [eslint.config.js](#eslintconfigjs)
14. [Testing](#14-testing)
15. [Accesibilidad](#15-accesibilidad)
16. [Decisiones de diseño clave](#16-decisiones-de-diseño-clave)
17. [Primer Parcial — versión vanilla](#17-primer-parcial--versión-vanilla)

---

## 1. Vista general de la aplicación

La app tiene dos páginas (rutas):

| Ruta            | Qué muestra                                                                                                                                |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `/`             | Catálogo completo de 25 álbumes. Cada uno tiene un botón estrella para agregarlo a la colección o quitarlo.                                |
| `/mi-coleccion` | Los álbumes que el usuario guardó. Muestra un contador, un botón para quitar cada álbum y un formulario de reseña con puntaje del 1 al 10. |

Funcionalidades principales:

- **Agregar/quitar álbumes** de la colección con un solo clic en la estrella.
- **Escribir, guardar y editar reseñas** con un campo de texto y un puntaje (1–10).
- **Limpiar la colección completa** con botón en el encabezado y confirmación inline.
- **Feedback visual** para cada acción: mensajes de éxito/error en el DOM, sin `alert()`.
- **Diseño responsive**: la grilla de álbumes pasa de 3 columnas (escritorio) a 2 (tablet) a 1 (móvil).

Los datos persisten en **json-server**, una API REST que lee y escribe en `db.json`. Al recargar la página, la colección
y las reseñas se conservan.

---

## 2. Estructura del repositorio

```
proyecto2025-agus-di-mario/
│
├── Primer Parcial/              # Primer entrega: HTML/CSS/JS vanilla
│   ├── Mockup/
│   │   └── figma.png            # Mockup de diseño en Figma
│   ├── Sketch/
│   │   └── sketch.jpg           # Boceto inicial en papel
│   ├── index.html               # Catálogo de álbumes
│   ├── mi-coleccion.html        # Colección personal del usuario
│   ├── script.js                # Toda la lógica en JS vanilla
│   └── style.css                # Estilos CSS planos
│
└── frontend/                    # Entrega final: React + Vite
    │
    ├── public/
    │   ├── favicon.png           # Ícono de la pestaña del navegador
    │   └── albums/               # 25 imágenes de portadas de álbumes
    │       ├── Blink-182_-_Calfornia.jpg
    │       └── ... (24 más)
    │
    ├── src/
    │   │
    │   ├── main.jsx              # Punto de entrada: monta React en el DOM
    │   ├── App.jsx               # Define las rutas de la aplicación
    │   │
    │   ├── api/
    │   │   └── albumes.js        # Funciones async para comunicarse con json-server
    │   │
    │   ├── components/           # Componentes reutilizables
    │   │   ├── Encabezado.jsx    # Header: logo, navegación y botón Limpiar
    │   │   ├── TarjetaAlbum.jsx  # Tarjeta de álbum (usada en catálogo y colección)
    │   │   ├── SeccionResena.jsx # Formulario de reseña + vista de lectura
    │   │   └── Pie.jsx           # Footer con copyright
    │   │
    │   ├── pages/                # Páginas completas (mapeadas a rutas)
    │   │   ├── Layout.jsx        # Ruta padre: Encabezado + Outlet + Pie
    │   │   ├── Inicio.jsx        # Página "/" — catálogo completo
    │   │   └── Coleccion.jsx     # Página "/mi-coleccion" — colección del usuario
    │   │
    │   ├── styles/
    │   │   └── global.scss       # Todos los estilos de la app
    │   │
    │   └── __tests__/            # Tests unitarios con Jest
    │       ├── TarjetaAlbum.test.jsx
    │       ├── SeccionResena.test.jsx
    │       ├── albumes.test.js
    │       ├── Inicio.test.jsx
    │       └── Coleccion.test.jsx
    │
    ├── index.html                # HTML raíz; Vite lo usa como plantilla
    ├── db.json                   # Base de datos de json-server (álbumes + colección)
    ├── package.json              # Dependencias y scripts del proyecto
    ├── vite.config.js            # Configuración de Vite (alias de imports)
    ├── jest.config.cjs           # Configuración de Jest (entorno, mapeos)
    ├── babel.config.cjs          # Configuración de Babel (transpilación para Jest)
    └── eslint.config.js          # Reglas de ESLint
```

---

## 3. Tecnologías y herramientas

### React 19

**Qué es:** Librería de JavaScript para construir interfaces de usuario declarativas. La UI se describe como un árbol de
**componentes** — funciones que reciben `props` y retornan JSX. Cuando el estado cambia, React recalcula qué partes del
árbol virtual cambiaron y actualiza solo esas partes en el DOM real (reconciliación).

**Para qué se usa aquí:** Toda la interfaz está construida con componentes React. El estado local (`useState`) almacena
los datos en memoria mientras la página está abierta; los efectos (`useEffect`) sincronizan ese estado con la API cuando
corresponde.

**Por qué React 19:** Es la versión estable más reciente al momento del proyecto. En este proyecto se usa la API clásica
de hooks (sin las Server Components de React 19), así que la versión específica no impacta en el código.

---

### React Router DOM v7

**Qué es:** Librería de enrutamiento para aplicaciones React de página única (SPA). En lugar de cargar un HTML diferente
para cada URL, React Router intercepta la navegación y renderiza el componente correcto sin recargar la página.

**Componentes/hooks utilizados:**

- `<BrowserRouter>` — habilita el routing usando la **History API** del navegador (URLs limpias, sin `#`).
- `<Routes>` — contenedor que evalúa qué `<Route>` coincide con la URL actual.
- `<Route path="..." element={...}>` — mapea una URL a un componente.
- `<Outlet>` — marca el lugar donde una ruta padre renderiza a su ruta hija.
- `<Link to="...">` — equivalente a `<a href>` pero sin recargar la página.
- `useNavigate()` — hook que retorna una función para navegar desde código JavaScript.
- `useLocation()` — hook que retorna la ubicación actual (pathname, search, hash).
- `useOutletContext()` — hook para que una ruta hija lea el contexto que le pasó su padre via `<Outlet context={...}>`.

---

### Vite 7

**Qué es:** Herramienta de build y servidor de desarrollo. A diferencia de Webpack (que empaqueta todo antes de servir),
Vite sirve cada módulo individualmente con ESM nativo durante el desarrollo, lo que hace que el arranque sea casi
instantáneo. Para producción, usa Rollup internamente y genera un bundle optimizado en `dist/`.

**Para qué se usa aquí:**

- `npm run dev` — levanta el servidor de desarrollo con **Hot Module Replacement (HMR)**: los cambios en el código se
  reflejan en el navegador sin recargar la página.
- `npm run build` — genera los archivos de producción en `frontend/dist/`.
- `npm run preview` — sirve el build de producción localmente para verificarlo antes de entregar.
- **Alias de imports** — configurados en `vite.config.js` para importar módulos con rutas cortas (`@components/...` en
  lugar de `../../components/...`).
- **Archivos estáticos** — todo lo que está en `public/` se sirve tal cual en la raíz. Por eso las imágenes en
  `public/albums/` son accesibles desde `/albums/nombre.jpg`.

---

### json-server

**Qué es:** Paquete de Node.js que convierte un archivo JSON en una API REST completa, sin escribir ningún código de
servidor. Lee el archivo `db.json` y expone endpoints CRUD automáticamente para cada clave del objeto.

**Para qué se usa aquí:** Simula el backend. Permite usar `fetch` real contra endpoints reales (`/albumes`,
`/coleccion`) sin necesitar un servidor real.

**Endpoints que genera a partir de `db.json`:**
| Método | URL | Acción | |---|---|---| | `GET` | `/albumes` | Retorna todos los álbumes | | `GET` | `/coleccion` |
Retorna todos los items de la colección | | `GET` | `/coleccion/:id` | Retorna un item específico | | `POST` |
`/coleccion` | Agrega un nuevo item | | `PATCH` | `/coleccion/:id` | Actualiza parcialmente un item | | `DELETE` |
`/coleccion/:id` | Elimina un item |

Se ejecuta con `npm run server` y escucha en `http://localhost:3001`.

---

### SCSS / Sass

**Qué es:** Preprocesador de CSS. Permite escribir CSS con superpoderes: variables, mixins (bloques de estilos
reutilizables), anidamiento de selectores y más. El archivo `.scss` se compila a CSS plano que entiende el navegador.

**Para qué se usa aquí:** El archivo `src/styles/global.scss` contiene todos los estilos de la app. Se importa una sola
vez en `App.jsx` con `import '@styles/global.scss'`. Vite detecta la extensión `.scss` y usa el paquete `sass` para
compilarlo.

---

### Jest 30

**Qué es:** Framework de testing para JavaScript. Provee: `describe` (agrupa tests), `test` (define un caso), `expect` +
matchers (`toBe`, `toEqual`, etc.), `jest.fn()` (funciones mock), y soporte para código asíncrono.

**Para qué se usa aquí:** Corre la suite de tests con `npm test`. Los 4 archivos en `src/__tests__/` prueban componentes
y funciones de API de forma aislada.

---

### React Testing Library

**Qué es:** Librería que facilita testear componentes React de la misma manera en que un usuario los usaría: buscando
elementos por su texto visible, su rol ARIA o su etiqueta, en lugar de por selectores CSS o nombres de clase internos.

**Funciones clave usadas:**

- `render(<Componente/>)` — monta el componente en un DOM virtual (jsdom).
- `screen.getByText(texto)` — encuentra un elemento por su texto visible.
- `screen.getByRole(rol, {name})` — encuentra por rol ARIA (button, heading, alert…).
- `screen.findByText(texto)` — como `getByText` pero **espera** a que aparezca (async).
- `fireEvent.click(elemento)` — simula un clic del usuario.
- `waitFor(() => ...)` — espera hasta que la aserción pase (útil con efectos async).

---

### Babel

**Qué es:** Transpilador de JavaScript. Convierte código moderno (JSX, ES6+, async/await) a JavaScript que puede
entender un entorno específico.

**Por qué se necesita aquí:** Jest corre en Node.js, que no entiende JSX ni los alias de Vite. Babel transforma los
archivos de test antes de que Jest los ejecute.

---

### ESLint

**Qué es:** Herramienta de análisis estático de código. Detecta problemas potenciales (variables no usadas, violaciones
de reglas de hooks de React) sin ejecutar el código.

**Para qué se usa aquí:** `npm run lint` analiza todos los archivos `.js` y `.jsx` y reporta errores. El CI o la entrega
debe pasar sin errores de lint.

---

### identity-obj-proxy

**Qué es:** Módulo que actúa como proxy para importaciones de CSS/SCSS en Jest. Cuando un componente importa un archivo
`.scss`, Jest no sabe qué hacer con él (no es JavaScript). Este proxy retorna el nombre de la clase como string, así el
componente puede renderizarse sin errores.

**Ejemplo:** `styles.miClase` retorna `"miClase"` — el test puede verificar que el elemento tiene esa clase sin
necesitar compilar SCSS.

---

## 4. Instalación y puesta en marcha

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/UCC-TallerDesarrolloWeb/proyecto2025-agus-di-mario.git
cd proyecto2025-agus-di-mario

# 2. Instalar dependencias (desde la carpeta frontend)
cd frontend
npm install
```

### Ejecutar en desarrollo

La app necesita **dos terminales abiertas simultáneamente**, ambas desde la carpeta `frontend/`:

**Terminal 1 — API mock:**

```bash
npm run server
```

Levanta json-server en `http://localhost:3001`. Sirve los datos de `db.json` como API REST.

**Terminal 2 — App React:**

```bash
npm run dev
```

Levanta Vite en `http://localhost:5173`. Sirve la aplicación React con recarga en caliente.

**Por qué dos terminales:** La app React corre en el puerto 5173 y hace peticiones `fetch` al puerto 3001. Son dos
procesos independientes. Sin json-server corriendo, la app renderiza pero no puede cargar ni guardar datos.

Abrir el navegador en `http://localhost:5173`.

---

## 5. Scripts disponibles

Todos los comandos se corren desde la carpeta `frontend/`.

| Script            | Comando real                      | Qué hace                                                          |
|-------------------|-----------------------------------|-------------------------------------------------------------------|
| `npm run dev`     | `vite`                            | Inicia el servidor de desarrollo Vite con HMR en `localhost:5173` |
| `npm run server`  | `json-server db.json --port 3001` | Inicia la API mock en `localhost:3001`                            |
| `npm run build`   | `vite build`                      | Compila la app para producción y genera `dist/`                   |
| `npm run lint`    | `eslint .`                        | Analiza todos los archivos JS/JSX con ESLint                      |
| `npm run preview` | `vite preview`                    | Sirve el contenido de `dist/` localmente                          |
| `npm test`        | `jest`                            | Corre todos los tests de `src/__tests__/`                         |

**Notas importantes:**

- `npm run build` debe completarse sin errores antes de entregar.
- `npm run preview` sirve el build estático; en este modo **no** hay conexión a json-server (es solo para verificar que
  el bundle se construyó bien).
- `npm test -- --testPathPattern=NombreArchivo` corre solo los tests que coincidan.
- `npm test -- --watch` activa el modo watch: re-corre los tests afectados cuando se guarda un archivo.

---

## 6. Base de datos — `db.json`

### Qué es json-server y cómo funciona

json-server lee el archivo `db.json` y expone automáticamente un endpoint REST por cada clave del objeto raíz. No
requiere escribir ni una línea de código de servidor.

Cuando el usuario agrega un álbum, json-server agrega un objeto al array `coleccion` dentro de `db.json` y lo persiste
en disco. Al recargar la página, los datos siguen ahí.

### Estructura del archivo

```json
{
  "albumes": [ ... ],
  "coleccion": [ ... ]
}
```

**Recurso `albumes` — catálogo fijo (solo lectura en la práctica):**

```json
{
  "id": "1",
  "nombre": "California",
  "artista": "blink-182",
  "imagen": "/albums/Blink-182_-_Calfornia.jpg"
}
```

| Campo     | Tipo   | Descripción                                                  |
|-----------|--------|--------------------------------------------------------------|
| `id`      | string | Identificador único. **String**, no número (ver nota abajo). |
| `nombre`  | string | Título del álbum.                                            |
| `artista` | string | Nombre del artista o banda.                                  |
| `imagen`  | string | Ruta absoluta a la imagen en `public/albums/`.               |

**Recurso `coleccion` — colección del usuario (lectura y escritura):**

```json
{
  "id": "5",
  "nombre": "The Mark, Tom and Travis Show",
  "artista": "blink-182",
  "imagen": "/albums/...",
  "resena": null
}
```

El campo extra `resena` es `null` cuando el usuario aún no escribió una reseña, y un objeto cuando sí:

```json
{
  "resena": {
    "texto": "Uno de los mejores shows en vivo.",
    "puntaje": 9
  }
}
```

### Por qué los IDs son strings

json-server v1 normaliza los IDs de los recursos a string internamente. Al hacer `GET /coleccion/5`, la URL usa el
string `"5"`. Si los IDs en `db.json` fueran números, habría inconsistencias entre lo que viene de la API y lo que se
compara con `Set.has(album.id)`. Al dejarlos como strings desde el principio, las comparaciones son siempre
consistentes.

### Dónde viven las imágenes

Las portadas están en `frontend/public/albums/`. Vite sirve todo lo que está dentro de `public/` como archivos estáticos
desde la raíz del servidor, sin procesarlos. Por eso las rutas en `db.json` son absolutas: `/albums/nombre.jpg`. En el
navegador, esa URL resuelve directamente al archivo.

**Importante:** Las imágenes **no se importan con `import`** en el código React. Se usan directamente como strings en el
atributo `src`. Importarlas sería incorrecto porque Vite las optimizaría y cambiaría el nombre del archivo, rompiendo la
consistencia con `db.json`.

### Los 25 álbumes del catálogo

El catálogo incluye discos de artistas como blink-182, Pierce The Veil, Green Day, Foo Fighters, Nirvana, Bring Me The
Horizon, Sum 41, PVRIS, Knuckle Puck, The Story So Far, Citizen y Man Overboard, entre otros.

---

## 7. Capa de API — `src/api/albumes.js`

Este archivo concentra **todas las comunicaciones con json-server**. Ningún componente ni página hace `fetch`
directamente — siempre llaman a una de estas funciones.

Todas las funciones son `async` y usan `await`. No hay `.then()` ni `.catch()` en el proyecto.

```js
const BASE_URL = 'http://localhost:3001'
```

La URL base se define una sola vez. Si el puerto cambia, se actualiza en un solo lugar.

---

### `obtenerAlbumes()`

```js
export const obtenerAlbumes = async () => {
  const respuesta = await fetch(`${BASE_URL}/albumes`)
  return respuesta.json()
}
```

- Hace `GET /albumes` y retorna el array completo de álbumes.
- La variable se llama `respuesta` (no `r`) para mayor claridad.

---

### `obtenerColeccion()`

```js
export const obtenerColeccion = async () => {
  const r = await fetch(`${BASE_URL}/coleccion`)
  return r.json()
}
```

- Hace `GET /coleccion`.
- Retorna el array de álbumes en la colección del usuario (puede estar vacío).
- Se llama frecuentemente como "fuente de verdad" después de cada mutación.

---

### `agregarAColeccion(album)`

```js
export const agregarAColeccion = async (album) => {
  const actual = await obtenerColeccion()
  if (!actual.some(i => i.id === album.id)) {
    await fetch(`${BASE_URL}/coleccion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...album, resena: null }),
    })
  }
  return obtenerColeccion()
}
```

- **Paso 1:** Obtiene la colección actual para verificar si el álbum ya existe.
- **Paso 2:** `.some(i => i.id === album.id)` devuelve `true` si algún item tiene el mismo ID. Si ya existe, se omite el
  POST (evita duplicados).
- **Paso 3 (si no existe):** Hace `POST /coleccion` con el álbum completo más `resena: null`.
    - `method: 'POST'` — indica que es una creación.
    - `headers: {'Content-Type': 'application/json'}` — le dice al servidor que el body es JSON. Sin este header,
      json-server no parsea el body.
    - `body: JSON.stringify({...album, resena: null})` — serializa el objeto JavaScript a string JSON. El spread
      `...album` copia todas las propiedades del álbum; `resena: null` agrega el campo extra.
- **Paso 4:** Retorna la colección actualizada (nueva consulta al servidor).

---

### `quitarDeColeccion(albumId)`

```js
export const quitarDeColeccion = async (albumId) => {
  await fetch(`${BASE_URL}/coleccion/${albumId}`, { method: 'DELETE' })
  return obtenerColeccion()
}
```

- Hace `DELETE /coleccion/:id`. json-server elimina el registro con ese ID.
- Retorna la colección actualizada para que el llamador pueda actualizar el estado local.

---

### `guardarResena(albumId, resena)`

```js
export const guardarResena = async (albumId, resena) => {
  const r = await fetch(`${BASE_URL}/coleccion/${albumId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resena }),
  })
  if (!r.ok) return null
  return r.json()
}
```

- Hace `PATCH /coleccion/:id` con `{ resena: { texto, puntaje } }` en el body.
- **`PATCH` vs `PUT`:** `PATCH` actualiza **solo los campos enviados**, manteniendo el resto. `PUT` reemplaza el objeto
  completo. Aquí se usa `PATCH` porque solo se quiere actualizar el campo `resena`, sin tocar `nombre`, `artista`, etc.
- `r.ok` es `true` si el status HTTP es 200–299. Si falla, retorna `null` en lugar de explotar.
- Si la respuesta es exitosa, retorna el objeto actualizado.

---

### `obtenerResena(albumId)`

```js
export const obtenerResena = async (albumId) => {
  const r = await fetch(`${BASE_URL}/coleccion/${albumId}`)
  if (!r.ok) return null
  const item = await r.json()
  return item?.resena ?? null
}
```

- Hace `GET /coleccion/:id`.
- Si el álbum no está en la colección, el servidor retorna 404 y `r.ok` es `false`. Retorna `null`.
- Si existe, accede a `item.resena`. El operador `?.` (optional chaining) evita un error si `item` fuera `null`. El
  operador `??` (nullish coalescing) retorna `null` si `item.resena` es `undefined` o `null`.

---

### `limpiarDatos()`

```js
export const limpiarDatos = async () => {
  const coleccion = await obtenerColeccion()
  await Promise.all(
    coleccion.map(i => fetch(`${BASE_URL}/coleccion/${i.id}`, { method: 'DELETE' }))
  )
}
```

- Obtiene todos los items de la colección.
- `coleccion.map(i => fetch(...DELETE...))` crea un array de Promises, una por cada DELETE.
- `Promise.all(...)` lanza **todos los DELETE en paralelo** y espera a que todos terminen. Es más rápido que borrar de a
  uno en secuencia (que requeriría `for...of` con `await`).
- No retorna nada. El componente que la llama (Layout) se encarga de navegar a `/` y recargar estado.

---

## 8. Punto de entrada — `index.html` y `main.jsx`

### `index.html`

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <link href="/favicon.png" rel="icon" type="image/png"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta content="Agustín Di Mario" name="author"/>
  <meta content="Colección de álbumes musicales con reseñas" name="description"/>
  <meta content="Música, Álbumes, Reseñas, Colección" name="keywords"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
  <title>Mi Colección de Álbumes</title>
</head>
<body>
  <div id="root"></div>
  <script src="./src/main.jsx" type="module"></script>
</body>
</html>
```

Línea por línea:

- `<!doctype html>` — declara que el documento es HTML5. Sin esto algunos navegadores entran en "modo quirks" y
  renderizan distinto.
- `lang="es"` — indica el idioma del contenido. Lo usan lectores de pantalla y motores de búsqueda.
- `charset="UTF-8"` — codificación de caracteres. Permite tildes, ñ y cualquier carácter Unicode.
- `rel="icon"` — favicon (ícono de la pestaña).
- `viewport` — hace que la página sea responsive. `width=device-width` usa el ancho real del dispositivo;
  `initial-scale=1.0` no hace zoom al cargar.
- `author`, `description`, `keywords` — metadatos para SEO y buenas prácticas.
- Google Fonts `Inter` — tipografía del proyecto, en pesos 400 (normal), 600 (semibold) y 700 (bold).
- `<div id="root">` — el único elemento HTML que React necesita. Toda la UI se inyecta aquí.
- `<script type="module">` — carga `main.jsx` como módulo ES. Vite intercepta esta carga y sirve el módulo procesado. En
  producción, Vite reemplaza este script por el bundle compilado.

---

### `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Aplicacion from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Aplicacion/>
    </BrowserRouter>
  </StrictMode>,
)
```

- `createRoot(document.getElementById('root'))` — crea un "root" de React conectado al `<div id="root">` del HTML. Esto
  es la API de React 18/19 (la anterior era `ReactDOM.render`).
- `.render(...)` — renderiza el árbol de componentes dentro de ese root.
- `<StrictMode>` — modo de desarrollo que ayuda a detectar problemas. En modo estricto, React ejecuta cada efecto y cada
  renderizado **dos veces** (solo en desarrollo) para detectar side effects no declarados o estados que cambian sin ser
  controlados. No afecta el comportamiento en producción.
- `<BrowserRouter>` — activa el routing. Escucha cambios en la URL (usando la History API del navegador) y hace que los
  hooks `useNavigate`, `useLocation`, y los componentes `<Routes>` funcionen. Debe envolver toda la app.
- `<Aplicacion/>` — el componente raíz definido en `App.jsx`.

---

## 9. Configuración de rutas — `App.jsx`

```jsx
import { Route, Routes } from 'react-router-dom'
import '@styles/global.scss'
import Layout from '@pages/Layout'
import Inicio from '@pages/Inicio'
import Coleccion from '@pages/Coleccion'

function Aplicacion() {
  return (
    <div className="app-shell">
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/mi-coleccion" element={<Coleccion/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default Aplicacion
```

- `import '@styles/global.scss'` — importa los estilos globales **una sola vez** aquí. Al ser el componente raíz, los
  estilos se aplican a toda la app.
- `<div className="app-shell">` — el div raíz. En SCSS tiene `display: flex; flex-direction: column; min-height: 100vh`,
  lo que permite que el footer quede pegado al fondo aunque la página tenga poco contenido.
- `<Routes>` — evalúa cada `<Route>` y renderiza solo la que coincide con la URL actual.
- `<Route element={<Layout/>}>` — ruta **padre sin `path`**. Al no tener `path`, siempre coincide. Layout se renderiza
  para todas las rutas hijas. Es el patrón **Nested Routes** de React Router.
- `<Route path="/" element={<Inicio/>}/>` — cuando la URL es exactamente `/`, renderiza `<Inicio>` dentro del `<Outlet>`
  de Layout.
- `<Route path="/mi-coleccion" element={<Coleccion/>}/>` — lo mismo para `/mi-coleccion`.

**Por qué el patrón Layout + Outlet:** Sin este patrón, habría que repetir `<Encabezado>` y `<Pie>` en cada página. Con
Outlet, esos componentes se renderizan una sola vez en Layout y **nunca se desmontan** al navegar, lo que es más
eficiente y evita parpadeos.

---

## 10. Páginas

### Layout.jsx

`src/pages/Layout.jsx` — la ruta padre. Envuelve todas las páginas.

```jsx
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Encabezado from '@components/Encabezado'
import Pie from '@components/Pie'
import { limpiarDatos } from '@api/albumes'

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [limpiadoEn, setLimpiadoEn] = useState(null)
  const [mensajeGlobal, setMensajeGlobal] = useState('')

  useEffect(() => {
    if (!mensajeGlobal) return
    const t = setTimeout(() => setMensajeGlobal(''), 3000)
    return () => clearTimeout(t)
  }, [mensajeGlobal])

  useEffect(() => {
    setMensajeGlobal('')
  }, [location.pathname])

  async function manejarLimpiar() {
    await limpiarDatos()
    setMensajeGlobal('Datos limpiados correctamente.')
    setLimpiadoEn(Date.now())
    navigate('/')
  }

  return (
    <>
      <Encabezado onLimpiar={manejarLimpiar}/>
      {mensajeGlobal && (
        <p role="status" className="mensaje-global">{mensajeGlobal}</p>
      )}
      <Outlet context={{ limpiadoEn }}/>
      <Pie/>
    </>
  )
}
```

**Estado:**

- `limpiadoEn` — número (timestamp Unix en ms). Se actualiza con `Date.now()` cada vez que se limpia la colección. Las
  páginas hijas lo reciben como contexto y lo usan como dependencia de sus `useEffect` para recargar datos.
- `mensajeGlobal` — string con el mensaje de confirmación. Vacío significa "no mostrar nada".

**Efectos:**

- El primer `useEffect` depende de `mensajeGlobal`. Cada vez que el mensaje cambia a un string no vacío, programa un
  `setTimeout` de 3 segundos para borrarlo. La función de cleanup (`return () => clearTimeout(t)`) cancela el timer si
  el mensaje cambia nuevamente antes de que se cumplan los 3 segundos, evitando múltiples timers simultáneos.
- El segundo `useEffect` depende de `location.pathname`. Borra el mensaje cuando el usuario navega a otra página (para
  que no quede flotando al cambiar de ruta).

**`manejarLimpiar()`:**

1. Llama a `limpiarDatos()` (DELETE de todos los items).
2. Pone el mensaje de confirmación.
3. Actualiza `limpiadoEn` con el timestamp actual. Cualquier número distinto de `null` disparará el effect de recarga en
   `Inicio.jsx`.
4. Navega a `/` programáticamente con `navigate('/')`.

**`<Outlet context={{limpiadoEn}}>`:** El prop `context` de `<Outlet>` es el mecanismo oficial de React Router para que
el padre (Layout) le pase datos a sus hijos (Inicio, Coleccion) sin usar Context de React ni prop drilling. Los hijos lo
reciben con `useOutletContext()`.

**`<p role="status">`:** `role="status"` es un rol ARIA que indica a los lectores de pantalla que anuncien el contenido
de este elemento cuando cambie, de forma no disruptiva.

---

### Inicio.jsx

`src/pages/Inicio.jsx` — la página `/`. Muestra el catálogo completo.

```jsx
import {useEffect, useState} from 'react'
import {useOutletContext} from 'react-router-dom'
import TarjetaAlbum from '@components/TarjetaAlbum'
import {agregarAColeccion, obtenerAlbumes, obtenerColeccion, quitarDeColeccion} from '@api/albumes'

function Inicio() {
	const {limpiadoEn} = useOutletContext()
	const [albumes, setAlbumes] = useState([])
	const [coleccion, setColeccion] = useState([])

	useEffect(() => {
		obtenerAlbumes().then(setAlbumes)
	}, [])

	useEffect(() => {
		obtenerColeccion().then(setColeccion)
	}, [limpiadoEn])

	const conjuntoColeccion = new Set(coleccion.map(item => item.id))

	async function setColeccionado(album) {
		const actualizada = conjuntoColeccion.has(album.id)
			? await quitarDeColeccion(album.id)
			: await agregarAColeccion(album)
		setColeccion(actualizada)
	}

	return (
		<main>
			<section id="catalogo">
				<h2>Álbumes disponibles</h2>
				<div className="lista-albumes" id="lista-albumes">
					{albumes.map(album => (
						<TarjetaAlbum
							key={album.id}
							album={album}
							variante="catalogo"
							esFavorito={conjuntoColeccion.has(album.id)}
							onColeccionar={setColeccionado}
						/>
					))}
				</div>
			</section>
		</main>
	)
}
```

**`useOutletContext()`:** Recibe el contexto que Layout pasó via `<Outlet context={...}>`. Destructura `limpiadoEn`.

**Estado y efectos:**

- `useState([])` inicializa `albumes` y `coleccion` como arrays vacíos.
- El primer `useEffect` (deps `[]`) carga el catálogo completo una sola vez al montar.
- El segundo `useEffect` (deps `[limpiadoEn]`) recarga la colección cada vez que `limpiadoEn` cambia — es decir, cada
  vez que Layout limpia todos los datos.

**`conjuntoColeccion`:**

```js
const conjuntoColeccion = new Set(coleccion.map(item => item.id))
```

- Crea un `Set` con los IDs de todos los álbumes en la colección.
- Se recalcula en cada render (cuando `coleccion` cambia).
- **Por qué Set y no `.includes()`:** `Set.has(id)` es O (1) — tiempo constante. `Array.includes(id)` es O (n) — recorre
  el array entero. Para 25 álbumes la diferencia es imperceptible, pero es la práctica correcta.
- `conjuntoColeccion.has(album.id)` retorna `true` si el álbum está en la colección → la estrella se pinta llena.

**`setColeccionado(album)`:**

- Función async que actúa como toggle.
- Si el álbum ya está en la colección (su ID está en el Set) → quitar.
- Si no está → agregar.
- En ambos casos, las funciones de API retornan la colección actualizada, que se almacena en el estado con
  `setColeccion`.

**`key={album.id}`:** El prop `key` es obligatorio en listas de React. Le indica al algoritmo de reconciliación qué
elemento corresponde a qué posición entre renders. Sin `key` (o con `key={index}`), React podría reusar el estado de un
elemento borrado en el siguiente, causando bugs.

---

### Coleccion.jsx

`src/pages/Coleccion.jsx` — la página `/mi-coleccion`.

```jsx
import {useEffect, useState} from 'react'
import TarjetaAlbum from '@components/TarjetaAlbum'
import SeccionResena from '@components/SeccionResena'
import {obtenerColeccion, quitarDeColeccion} from '@api/albumes'

function Coleccion() {
	const [elementos, setElementos] = useState([])

	useEffect(() => {
		obtenerColeccion().then(setElementos)
	}, [])

	const manejarQuitar = async (album) => {
		const actualizada = await quitarDeColeccion(album.id)
		setElementos(actualizada)
	}

	return (
		<main>
			<section id="coleccion">
				<h2>
					Mi colección (<span id="contador">{elementos.length}</span>)
				</h2>
				{elementos.length === 0 ? (
					<p className="coleccion-vacia">Todavía no agregaste álbumes a tu colección.</p>
				) : (
					<div className="lista-coleccion" id="lista-coleccion">
						{elementos.map(album => (
							<TarjetaAlbum key={album.id} album={album} variante="coleccion"
							              onColeccionar={manejarQuitar}>
								<SeccionResena album={album}/>
							</TarjetaAlbum>
						))}
					</div>
				)}
			</section>
		</main>
	)
}
```

**Diferencias con Inicio:**

- Solo carga la colección (no el catálogo completo).
- No recibe `limpiadoEn` porque cuando el usuario limpia, Layout navega a `/`, y esta página se desmonta.
- La grilla usa `variante="coleccion"` en TarjetaAlbum.

**Contador dinámico:** `{elementos.length}` se actualiza automáticamente cada vez que el estado cambia. El
`<span id="contador">` es un buen ejemplo de cómo React evita manipular el DOM manualmente.

**Renderizado condicional:** `{condicion ? elementoA : elementoB}` es el operador ternario de JavaScript. Si
`elementos.length === 0`, muestra el mensaje vacío; si no, muestra la lista. React evalúa esta expresión en cada render.

**Composición con children:**

```jsx
<TarjetaAlbum ...>
  <SeccionResena album={album}/>
</TarjetaAlbum>
```

`<SeccionResena>` se pasa como `children` (hijos) de `TarjetaAlbum`. Este es el patrón de composición de React: un
componente puede renderizar sus hijos sin saber qué son. `SeccionResena` solo aparece en la colección, no en el
catálogo.

---

## 11. Componentes

### TarjetaAlbum.jsx

`src/components/TarjetaAlbum.jsx` — tarjeta visual de un álbum. Se usa en dos contextos distintos.

```jsx
function TarjetaAlbum({
	                      album,
	                      variante = 'catalogo',
	                      esFavorito = false,
	                      onColeccionar,
	                      children: hijos,
                      }) {
	return (
		<div className="tarjeta-album">
			<img
				src={album.imagen}
				alt={`${album.nombre} - ${album.artista}`}
				className="tarjeta-album__imagen"
			/>
			<div className="info-album">
				<h3>{album.nombre}</h3>
				<p>{album.artista}</p>
				{variante === 'catalogo' && (
					<button
						type="button"
						className={`estrella${esFavorito ? ' activo' : ''}`}
						aria-pressed={esFavorito}
						aria-label={esFavorito ? 'Quitar de mi colección' : 'Agregar a mi colección'}
						onClick={() => onColeccionar?.(album)}
					>
						{esFavorito ? '★' : '☆'}
					</button>
				)}
				{variante === 'coleccion' && (
					<button
						type="button"
						className="btn"
						onClick={() => onColeccionar?.(album)}
					>
						Quitar
					</button>
				)}
				{hijos}
			</div>
		</div>
	)
}
```

**Props:**
| Prop | Tipo | Default | Descripción | |---|---|---|---| | `album` | objeto | — | Datos del álbum (id, nombre, artista,
imagen). | | `variante` | string | `'catalogo'` | Controla qué botón se muestra. | | `esFavorito` | boolean | `false` |
Si `true`, la estrella aparece llena (★) y con clase `activo`. | | `onColeccionar` | función | — | Callback llamado al
hacer click en el botón. Recibe el objeto `album`. | | `children` | nodo React | — | Se destructura como `hijos` y se
renderiza al final del div. |

- `alt={album.nombre + " - " + album.artista}` — alt text descriptivo requerido por accesibilidad.
- `className={estrella${esFavorito ? ' activo' : ''}}` — agrega la clase `activo` condicionalmente. En SCSS,
  `.estrella.activo` tiene `color: goldenrod`.
- `aria-pressed={esFavorito}` — atributo ARIA para botones toggle. Un lector de pantalla anunciará "Agregar a mi
  colección, presionado: falso".
- `aria-label` dinámico — cambia según el estado.
- `alternarColeccion?.(album)` — optional chaining para llamadas de función. Si `alternarColeccion` es `undefined`, no
  hace nada en vez de explotar con "is not a function".
- `{hijos}` — renderiza los children recibidos. En la variante "coleccion", aquí aparece `<SeccionResena>`. En
  "catalogo", `hijos` es `undefined` y React no renderiza nada.

---

### Encabezado.jsx

`src/components/Encabezado.jsx` — el header de la app.

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@assets/logo.png'

function Encabezado({ onLimpiar }) {
  const [confirmando, setConfirmando] = useState(false)

  const pedirConfirmacion = () => {
    if (!onLimpiar) return
    setConfirmando(true)
  }

  const confirmar = () => {
    setConfirmando(false)
    onLimpiar()
  }

  const cancelar = () => setConfirmando(false)

  return (
    <header className="app-header">
      <div className="app-header__branding">
        <img src={logo} alt="Logo" className="app-header__logo" width="40" height="40"/>
        <p className="app-header__title">Mi Colección de Álbumes</p>
      </div>
      <nav className="app-header__nav">
        <Link className="link" to="/">Inicio</Link>
        <Link className="link" to="/mi-coleccion">Mi colección</Link>
        {onLimpiar && !confirmando && (
          <button className="btn" onClick={pedirConfirmacion} id="boton-limpiar">Limpiar</button>
        )}
        {confirmando && (
          <span className="confirmacion-limpiar">
            <span>¿Limpiar todo?</span>
            <button className="btn" onClick={confirmar}>Sí</button>
            <button className="btn btn--neutro" onClick={cancelar}>No</button>
          </span>
        )}
      </nav>
    </header>
  )
}
```

**Por qué sin `window.confirm()`:** `window.confirm` abre un diálogo nativo del navegador que bloquea el hilo de
JavaScript y no se puede estilizar. La confirmación inline con estado local es completamente parte del DOM, se puede
estilizar con CSS y no bloquea nada.

**Flujo de confirmación:**

1. Click en "Limpiar" → `pedirConfirmacion()` → `confirmando = true`.
2. Se oculta el botón "Limpiar" y aparece "¿Limpiar todo? Sí / No".
3. Click en "Sí" → `confirmar()` → llama `onLimpiar()` (definido en Layout) y resetea `confirmando`.
4. Click en "No" → `cancelar()` → resetea `confirmando` sin hacer nada.

**`{onLimpiar && !confirmando && <button>}`:** Doble short-circuit. El botón solo se muestra si `onLimpiar` existe
(tiene valor truthy) Y no estamos en modo confirmación.

**`<Link to="/">` vs `<a href="/">`:** `<Link>` intercepta el click, evita la recarga completa y actualiza solo la URL
en el historial. `<a>` haría una recarga completa, perdiendo el estado de React.

**`import logo from '@assets/logo.png'`:** Vite procesa este import, copia la imagen al output y retorna la URL final.
Es la forma correcta de importar assets que están en `src/`.

---

### Pie.jsx

`src/components/Pie.jsx` — el footer de la app.

```jsx
function Pie() {
  const anio = new Date().getFullYear()
  return (
    <footer className="app-footer">
      <p>&copy; {anio} Agustín Di Mario. Todos los derechos reservados.</p>
    </footer>
  )
}
```

- `new Date().getFullYear()` — retorna el año actual como número. Al calcularlo dinámicamente no hace falta actualizarlo
  manualmente cada año.
- `&copy;` — entidad HTML para el símbolo de copyright ©.
- En SCSS, `.app-footer` tiene `margin-top: auto`. En un contenedor flex-column, `margin-top: auto` empuja el elemento
  hasta el fondo del contenedor, logrando el efecto de "footer sticky" sin `position: fixed`.

---

### SeccionResena.jsx

`src/components/SeccionResena.jsx` — formulario de reseña. Alterna entre modo edición y modo lectura.

```jsx
import { useEffect, useState } from 'react'
import { guardarResena, obtenerResena } from '@api/albumes'

function SeccionResena({ album }) {
  const [texto, setTexto] = useState('')
  const [puntaje, setPuntaje] = useState('')
  const [resenaGuardada, setResenaGuardada] = useState(null)
  const [estaEditando, setEstaEditando] = useState(true)
  const [mensajeError, setMensajeError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  const opcionesPuntaje = Array.from({ length: 10 }, (_, indice) => String(indice + 1))
  const idTexto = `resena-texto-${album.id}`
  const idPuntaje = `resena-puntaje-${album.id}`

  useEffect(() => {
    ;(async () => {
      const almacenada = await obtenerResena(album.id)
      if (almacenada) {
        setResenaGuardada(almacenada)
        setTexto(almacenada.texto || '')
        setPuntaje(String(almacenada.puntaje || ''))
        setEstaEditando(false)
      } else {
        setResenaGuardada(null)
        setTexto('')
        setPuntaje('')
        setEstaEditando(true)
      }
    })()
  }, [album])

  async function guardar() {
    const textoLimpio = (texto || '').trim()
    if (!textoLimpio || !puntaje) {
      setMensajeError('Completá la reseña y elegí un puntaje.')
      setMensajeExito('')
      return
    }
    setMensajeError('')
    const puntajeNumero = Number(puntaje) || 1
    await guardarResena(album.id, { texto: textoLimpio, puntaje: puntajeNumero })
    setResenaGuardada({ texto: textoLimpio, puntaje: puntajeNumero })
    setEstaEditando(false)
    setMensajeExito('Reseña guardada.')
  }

  function editar() {
    if (!resenaGuardada) return
    setTexto(resenaGuardada.texto || '')
    setPuntaje(String(resenaGuardada.puntaje || ''))
    setEstaEditando(true)
    setMensajeError('')
    setMensajeExito('')
  }

  return (
    <div className="seccion-resena">
      {estaEditando ? (
        <div className="entradas-resena">
          <label htmlFor={idTexto} className="resena-label">Reseña</label>
          <textarea id={idTexto} className="texto-resena" placeholder="Escribe tu reseña..."
            value={texto} onChange={(e) => { setTexto(e.target.value); setMensajeError('') }}
          />
          <label htmlFor={idPuntaje} className="resena-label">Puntaje</label>
          <select id={idPuntaje} className="entrada-puntaje" value={puntaje}
            onChange={(e) => { setPuntaje(e.target.value); setMensajeError('') }}
          >
            <option value="">Puntaje (1-10)</option>
            {opcionesPuntaje.map(valor => (
              <option key={valor} value={valor}>{valor}</option>
            ))}
          </select>
          {mensajeError && <p role="alert" className="mensaje-inline mensaje-inline--error">{mensajeError}</p>}
          {mensajeExito && <p role="status" className="mensaje-inline mensaje-inline--exito">{mensajeExito}</p>}
          <button type="button" className="boton-accion" onClick={guardar}>Guardar</button>
        </div>
      ) : (
        <div className="resena-guardada">
          <p className="texto-resena-guardado">{`"${resenaGuardada?.texto}"`}</p>
          <p className="puntaje-resena-guardado">{`Puntaje: ${resenaGuardada?.puntaje}/10`}</p>
          <button type="button" className="boton-accion" onClick={editar}>Editar</button>
        </div>
      )}
    </div>
  )
}
```

**Estado — 6 variables:**
| Estado | Tipo | Descripción | |---|---|---| | `texto` | string | Contenido del textarea (input controlado). | |
`puntaje` | string | Valor del select (string porque los values del select son strings). | | `resenaGuardada` |
objeto \| null | Copia de la reseña en el servidor. Null si no existe. | | `estaEditando` | boolean | `true` = mostrar
formulario; `false` = mostrar lectura. | | `mensajeError` | string | Mensaje de error de validación. Vacío = no
mostrar. | | `mensajeExito` | string | Mensaje de éxito tras guardar. Vacío = no mostrar. |

**`opcionesPuntaje`:**

```js
Array.from({length: 10}, (_, indice) => String(indice + 1))
// → ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
```

`Array.from` con una función de mapeo genera el array dinámicamente. El `_` ignora el primer parámetro (el elemento, que
no existe). `indice` va de 0 a 9; `indice + 1` da 1 a 10; `String(...)` lo convierte a string.

**IDs únicos por álbum:** En la página de colección puede haber múltiples instancias de `SeccionResena`. Al incluir el
ID del álbum en el `id` del input (`resena-texto-${album.id}`), cada par label/input es único, lo que es requerido por
accesibilidad.

**Effect `[album]`:** Se ejecuta al montar Y cada vez que el prop `album` cambia. Carga la reseña existente o resetea el
formulario según corresponda.

**`guardar()`:** Valida que ambos campos estén completos, sanitiza el texto con `.trim()`, convierte el puntaje a número
con `Number()` y llama a `guardarResena`. Si la respuesta llega bien, pasa a modo lectura.

**Inputs controlados:** El `value` del textarea y el select siempre viene del estado. El `onChange` actualiza el estado.
React es la única fuente de verdad del valor del input.

**`role="alert"` vs `role="status"`:** `alert` interrumpe al lector de pantalla inmediatamente (para errores). `status`
anuncia el mensaje de forma más suave (para confirmaciones de éxito).

---

## 12. Estilos — `global.scss`

`src/styles/global.scss` es el único archivo de estilos. Se importa una vez en `App.jsx` y aplica a toda la app.

### Variables

```scss
$font-base: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
$color-header: #222;
$color-link-bg: #444;
$color-link-hover: #555;
$color-danger: #c0392b;
$color-danger-hover: #a93226;
$color-card-border: #ddd;
$color-card-bg: #fff;
$color-muted: #555;
$grid-gap: 12px;
```

Las variables SCSS se declaran con `$`. Si se necesita cambiar el color del botón Limpiar, se cambia solo
`$color-danger`.

### Mixin

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Un mixin es como una función que retorna un bloque de CSS. Se usa con `@include flex-center`. Evita repetir las 3
propiedades cada vez que se necesita centrar con flexbox.

### Layout global

```scss
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
```

`min-height: 100vh` garantiza que el contenedor ocupe al menos toda la altura de la ventana. Con
`flex-direction: column` apilando hijos verticalmente, `margin-top: auto` en el footer lo empuja al fondo.

### Grilla responsive

```scss
.lista-albumes,
.lista-coleccion {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $grid-gap;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
}
```

- `display: grid` — activa CSS Grid.
- `repeat(3, 1fr)` — 3 columnas de igual ancho (`1fr` = "1 fracción del espacio disponible").
- Media queries: 800px → 2 columnas; 520px → 1 columna.

### Nomenclatura BEM

Las clases del header siguen BEM (Block Element Modifier):

- `.app-header` — bloque
- `.app-header__branding` — elemento dentro del bloque
- `.btn--neutro` — modificador del bloque `.btn`

---

## 13. Configuración de herramientas

### vite.config.js

```js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages":      path.resolve(__dirname, "./src/pages"),
      "@styles":     path.resolve(__dirname, "./src/styles"),
      "@assets":     path.resolve(__dirname, "./src/assets"),
      "@utils":      path.resolve(__dirname, "./src/utils"),
      "@api":        path.resolve(__dirname, "./src/api"),
    },
  },
})
```

- `fileURLToPath(import.meta.url)` — en ES Modules, `__dirname` no existe. Esta combinación lo reemplaza.
- `plugins: [react()]` — transforma JSX y habilita React Fast Refresh (HMR específico de React).
- `resolve.alias` — Vite reemplaza `@components/X` por la ruta absoluta al compilar. Mismos alias configurados en Jest
  para consistencia.

---

### jest.config.cjs

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$':      '<rootDir>/src/pages/$1',
    '^@styles/(.*)$':     '<rootDir>/src/styles/$1',
    '^@assets/(.*)$':     '<rootDir>/src/assets/$1',
    '^@utils/(.*)$':      '<rootDir>/src/utils/$1',
    '^@api/(.*)$':        '<rootDir>/src/api/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
}
```

- **Por qué `.cjs`:** El proyecto tiene `"type": "module"` en `package.json`, lo que hace que `.js` sean ES Modules.
  Jest necesita CommonJS (`module.exports`). La extensión `.cjs` fuerza CommonJS.
- `testEnvironment: 'jsdom'` — simula `document`, `window`, etc. en Node.js.
- `setupFilesAfterEnv` — carga jest-dom antes de cada test (agrega `toBeInTheDocument`, etc.).
- `moduleNameMapper` — SCSS → `identity-obj-proxy`; imágenes → stub; alias → rutas reales. El orden importa: SCSS debe
  ir antes que el alias `@styles`.

---

### babel.config.cjs

```js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
}
```

- `@babel/preset-env` con `targets: {node: 'current'}` — transpila solo lo que la versión de Node actual no entiende.
- `@babel/preset-react` con `runtime: 'automatic'` — transpila JSX sin necesitar `import React from 'react'` en cada
  archivo.

---

### eslint.config.js

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['src/__tests__/**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest, global: 'readonly' },
    },
  },
])
```

- **Flat config** — formato de ESLint v9 (array de objetos en lugar de `.eslintrc`).
- `reactHooks` — detecta violaciones de las reglas de hooks (solo en el nivel superior, deps completas).
- `no-unused-vars` con `varsIgnorePattern: '^[A-Z_]'` — permite variables que empiezan con mayúscula o `_`.
- Segunda configuración para `__tests__/` — agrega globals de Jest (`describe`, `test`, `expect`, `jest`, etc.) para que
  ESLint no los marque como "no definidos".

---

## 14. Testing

La filosofía: **probar comportamiento, no implementación**. Los tests simulan lo que haría un usuario real. Hay 5
archivos de tests en `src/__tests__/`.

---

### `TarjetaAlbum.test.jsx` — 2 tests

**Test 1 — renderizado:**

```js
render(<TarjetaAlbum album={albumMock} variante="coleccion"/>)
expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Dark Side of the Moon')
expect(screen.getByText('Pink Floyd')).toBeInTheDocument()
```

- `getByRole('heading', {level: 3})` busca el `<h3>` por su rol semántico, verificando al mismo tiempo que la semántica
  sea correcta.
- `toHaveTextContent` verifica el texto del elemento.

**Test 2 — interacción:**

```js
const onColeccionar = jest.fn()
render(<TarjetaAlbum ... onColeccionar={onColeccionar}/>)
fireEvent.click(screen.getByRole('button', {name: 'Agregar a mi colección'}))
expect(onColeccionar).toHaveBeenCalledTimes(1)
expect(onColeccionar).toHaveBeenCalledWith(albumMock)
```

- `jest.fn()` — función mock que registra sus llamadas.
- `getByRole('button', {name: '...'})` — busca el botón por su `aria-label`. Verifica tanto que existe como que el
  aria-label es correcto.
- `toHaveBeenCalledWith(albumMock)` — verifica que el callback recibió el objeto completo.

---

### `SeccionResena.test.jsx` — 1 test

```js
jest.mock('@api/albumes', () => ({ obtenerResena: jest.fn(), guardarResena: jest.fn() }))
obtenerResena.mockResolvedValue(null)

render(<SeccionResena album={albumMock}/>)
await waitFor(() => {
  expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument()
})
fireEvent.click(screen.getByRole('button', { name: /guardar/i }))
expect(screen.getByRole('alert')).toHaveTextContent('Completá la reseña y elegí un puntaje.')
```

- `jest.mock(...)` — reemplaza el módulo real por mocks. El componente llama a `obtenerResena` al montar; si no se
  mockea, intentaría hacer un fetch real que falla en el entorno de test.
- `mockResolvedValue(null)` — hace que la función mock retorne `Promise.resolve(null)`.
- `waitFor(...)` — espera a que el `useEffect` async termine antes de interactuar.
- `getByRole('alert')` — verifica que el mensaje de error tiene el rol ARIA correcto.

---

### `albumes.test.js` — 4 tests

```js
fetchMock = jest.fn()
global.fetch = fetchMock

fetchMock
	.mockResolvedValueOnce({ok: true, json: async () => []})        // GET /coleccion
	.mockResolvedValueOnce({ok: true, json: async () => ({...})})   // POST /coleccion
	.mockResolvedValueOnce({ok: true, json: async () => [{...}]})   // GET /coleccion (retorno)

await agregarAColeccion(albumMock)

expect(fetchMock).toHaveBeenNthCalledWith(2, `${BASE_URL}/coleccion`,
	expect.objectContaining({method: 'POST', ...})
)
```

- `global.fetch = fetchMock` — inyecta el mock como el `fetch` global de Node.
- `mockResolvedValueOnce` (tres veces) — programa las respuestas en orden: `agregarAColeccion` hace 3 fetches (GET para
  verificar duplicados, POST para crear, GET para retornar el estado final).
- `toHaveBeenNthCalledWith(2, ...)` — verifica los argumentos de la 2ª llamada específicamente.
- `expect.objectContaining({...})` — matcher parcial, verifica que el objeto tenga al menos esas propiedades.

---

### `Inicio.test.jsx` — 1 test

```js
jest.mock('react-router-dom', () => ({
  useOutletContext: jest.fn(() => ({ limpiadoEn: null })),
}))

obtenerAlbumes.mockResolvedValue([{ id: '1', nombre: 'Thriller', ... }])
render(<Inicio/>)
expect(await screen.findByText('Thriller')).toBeInTheDocument()
```

- `jest.mock('react-router-dom', ...)` — mockea `useOutletContext` para que no sea necesario envolver el componente en
  un `<Layout>`.
- `screen.findByText('Thriller')` — `findBy` es async: espera hasta que el elemento aparezca en el DOM. Necesario porque
  los datos llegan después de que el `useEffect` async resuelve.

---

### `Coleccion.test.jsx` — 2 tests

```js
jest.mock('@api/albumes', () => ({obtenerColeccion: jest.fn(), quitarDeColeccion: jest.fn()}))
jest.mock('@components/SeccionResena', () => ({__esModule: true, default: () => <div/>}))

obtenerColeccion.mockResolvedValue([{id: '1', nombre: 'Thriller', ...}])
render(<Coleccion/>)
expect(await screen.findByText('Thriller')).toBeInTheDocument()
```

- Mockea `SeccionResena` para aislar el test de la lógica de reseñas.
- **Test 1** — verifica que los álbumes de la API se renderizan en pantalla.
- **Test 2** — verifica que aparece el mensaje vacío cuando la colección no tiene ítems.

---

## 15. Accesibilidad

| Elemento          | Técnica implementada                                                     |
|-------------------|--------------------------------------------------------------------------|
| Todas las `<img>` | `alt` descriptivo: `"${nombre} - ${artista}"` o `"Logo"`                 |
| Botón estrella    | `aria-pressed={esFavorito}` — indica estado on/off al lector de pantalla |
| Botón estrella    | `aria-label` dinámico — describe la acción que realizará el click        |
| Textarea          | `<label htmlFor={idUnico}>` — enlaza la etiqueta con el input            |
| Select de puntaje | `<label htmlFor={idUnico}>` — enlaza la etiqueta con el select           |
| Mensajes de error | `role="alert"` — interrumpe al lector de pantalla para anunciar el error |
| Mensajes de éxito | `role="status"` — anuncia de forma no disruptiva                         |
| Todos los botones | `type="button"` — evita que actúen como submit dentro de forms           |
| HTML raíz         | `lang="es"` — idioma para lectores de pantalla y SEO                     |

**Por qué `htmlFor` en labels:** El atributo `htmlFor` (equivalente a `for` en HTML) enlaza el `<label>` con el input
que tiene el mismo `id`. Esto hace que el click en la etiqueta enfoque el input (mejor UX) y que el lector de pantalla
anuncie "Reseña, cuadro de texto" al entrar al campo.

---

## 16. Decisiones de diseño clave

### IDs como strings en db.json

json-server v1 normaliza todos los IDs a strings. Si en `db.json` el ID fuera el número `5`, la API retornaría `id: "5"`
(string) pero el código podría comparar `Set.has(5)` (número), fallando porque `"5" !== 5`. Al declarar los IDs como
strings desde el principio, la consistencia está garantizada.

### `Promise.all` para limpiar datos

Borrar de a uno (con `for...of` y `await`) haría las peticiones en serie. Con `Promise.all`, todos los DELETE se lanzan
al mismo tiempo. Con 10 álbumes en la colección, esto puede ser 5–10x más rápido.

### `limpiadoEn` como timestamp en lugar de booleano

Un booleano `fueReiniciado` tendría el problema de que si el usuario limpia dos veces seguidas, la segunda limpieza no
cambia el valor (ya era `true`) y el `useEffect` no se dispara. Un timestamp siempre cambia, así que siempre dispara el
effect.

### Un solo componente TarjetaAlbum para dos variantes

Tanto en el catálogo como en la colección, la estructura HTML de la tarjeta es idéntica. Separar en dos componentes
duplicaría código. El prop `variante` es suficiente para cambiar el botón que se muestra.

### Confirmación inline en Encabezado

`window.confirm()` bloquea el hilo de JavaScript y abre un diálogo del sistema operativo que no se puede estilizar. La
confirmación inline con estado local es parte del DOM, estilizable con CSS y no bloquea nada.

### Alias de imports

```js
// Sin alias (frágil, depende de la ubicación relativa del archivo)
import TarjetaAlbum from '../../components/TarjetaAlbum'

// Con alias (siempre igual, independientemente de dónde esté el archivo)
import TarjetaAlbum from '@components/TarjetaAlbum'
```

Si se mueve un archivo a otra carpeta, el import con alias sigue funcionando sin cambios.

---

## 17. Primer Parcial — versión vanilla

La carpeta `Primer Parcial/` contiene la primera etapa del trabajo práctico.

### Qué hay

| Archivo             | Descripción                          |
|---------------------|--------------------------------------|
| `index.html`        | Página del catálogo completo         |
| `mi-coleccion.html` | Página de colección personal         |
| `script.js`         | Toda la lógica en JavaScript vanilla |
| `style.css`         | Estilos CSS planos                   |
| `Mockup/figma.png`  | Mockup de diseño realizado en Figma  |
| `Sketch/sketch.jpg` | Boceto inicial en papel              |

### Diferencias con la versión React

| Aspecto      | Primer Parcial (vanilla)    | Frontend (React)                   |
|--------------|-----------------------------|------------------------------------|
| Persistencia | `localStorage`              | json-server (API REST)             |
| Navegación   | Dos archivos HTML separados | SPA con React Router               |
| Componentes  | Ninguno — HTML repetido     | Reutilizables (TarjetaAlbum, etc.) |
| Estado       | Variables globales en JS    | `useState`, `useEffect`            |
| Estilos      | CSS plano                   | SCSS con variables y mixins        |
| Testing      | Sin tests                   | Jest + React Testing Library       |
| Build        | No necesario                | Vite (genera `dist/`)              |

La versión vanilla demuestra el mismo dominio conceptual (catálogo, colección, reseñas) con las tecnologías básicas de
la web. La versión React muestra el mismo producto con las herramientas de desarrollo profesional moderno.
