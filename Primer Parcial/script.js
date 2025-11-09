const albumes = [
  {
    nombre: "California",
    artista: "blink-182",
    imagen: "Blink-182_-_Calfornia.jpg"
  },
  {
    nombre: "Neighborhoods",
    artista: "blink-182",
    imagen: "Blink-182_-_Neighborhoods_cover.jpg"
  },
  {
    nombre: "Nine",
    artista: "blink-182",
    imagen: "Blink-182_-_Nine.png"
  },
  {
    nombre: "Take Off Your Pants and Jacket",
    artista: "blink-182",
    imagen: "Blink-182_-_Take_Off_Your_Pants_and_Jacket_cover.jpg"
  },
  {
    nombre: "The Mark, Tom and Travis Show",
    artista: "blink-182",
    imagen: "Blink-182_-_The_Mark,_Tom_and_Travis_Show_(The_Enema_Strikes_Back!)_cover.jpg"
  },
  {
    nombre: "Live at the Royal Albert Hall",
    artista: "Bring Me The Horizon",
    imagen: "BMTHroyalalberthall.jpg"
  },
  {
    nombre: "Collide With The Sky",
    artista: "Pierce The Veil",
    imagen: "CollidewiththeSkycover.jpg"
  },
  {
    nombre: "Copacetic",
    artista: "Knuckle Puck",
    imagen: "Copacetic_KP.jpg"
  },
  {
    nombre: "Danger Days: The True Lives of the Fabulous Killjoys",
    artista: "My Chemical Romance",
    imagen: "Danger_Days-album-2010.jpg"
  },
  {
    nombre: "Father of All...",
    artista: "Green Day",
    imagen: "Father_of_All.jpg"
  },
  {
    nombre: "Wasting Light",
    artista: "Foo Fighters",
    imagen: "Foo_Fighters_Wasting_Light_Album_Cover.jpg"
  },
  {
    nombre: "Revolution Radio",
    artista: "Green Day",
    imagen: "GreenDayRevRad.jpg"
  },
  {
    nombre: "Heavy Love",
    artista: "Man Overboard",
    imagen: "Heavy_Love_Man_Overboard.png"
  },
  {
    nombre: "Tell Me About Tomorrow",
    artista: "Jxdn",
    imagen: "Jxdn_Tell_Me_About_Tomorrow.png"
  },
  {
    nombre: "Shapeshifter",
    artista: "Knuckle Puck",
    imagen: "Knuckle_Puck_Shapeshifter.jpg"
  },
  {
    nombre: "Life's Not Out to Get You",
    artista: "Neck Deep",
    imagen: "Life's_Not_Out_to_Get_You.jpg"
  },
  {
    nombre: "Misadventures",
    artista: "Pierce The Veil",
    imagen: "Misadventures.jpg"
  },
  {
    nombre: "Nevermind",
    artista: "Nirvana",
    imagen: "NirvanaNevermindalbumcover.jpg"
  },
  {
    nombre: "The Peace and The Panic",
    artista: "Neck Deep",
    imagen: "Peace_and_the_Panic.jpg"
  },
  {
    nombre: "White Noise",
    artista: "PVRIS",
    imagen: "PVRIS_White_Noise.jpg"
  },
  {
    nombre: "Real Talk",
    artista: "Man Overboard",
    imagen: "Real_Talk_Man_Overboard.jpg"
  },
  {
    nombre: "Selfish Machines",
    artista: "Pierce The Veil",
    imagen: "Selfish_Machines.jpg"
  },
  {
    nombre: "Underclass Hero",
    artista: "Sum 41",
    imagen: "SUM_41_UNDERCLASS_HERO.jpg"
  },
  {
    nombre: "The Story So Far (album)",
    artista: "The Story So Far",
    imagen: "The_Story_So_Far_-_The_Story_So_Far_(album).jpg"
  },
  {
    nombre: "Proper Dose",
    artista: "The Story So Far",
    imagen: "TSSFProperDose.jpg"
  }
];

const RUTA_IMAGENES = "FRONTEND/src/assets/albums/";

/**
 * Obtiene la ruta completa de una imagen del catálogo.
 * @param {string} nombreArchivo Nombre del archivo de imagen.
 * @returns {string} Ruta absoluta dentro del proyecto.
 */
const obtenerRutaImagen = (nombreArchivo) => `${RUTA_IMAGENES}${nombreArchivo}`;

const STORAGE_KEYS = {
  COLECCION: "coleccionAlbumes",
  FILTROS: "filtrosBusqueda"
};

const OPCIONES_PUNTAJE = Array.from({ length: 10 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("");

let coleccionActual = [];

/**
 * Persistente un valor serializado en localStorage.
 * @param {string} clave Identificador único donde se guardarán los datos.
 * @param {*} datos Información a almacenar.
 */
const guardarEnLocalStorage = (clave, datos) => {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

/**
 * Recupera un valor desde localStorage.
 * @param {string} clave Identificador a consultar.
 * @param {*} [valorPorDefecto=null] Valor a devolver si no hay datos.
 * @returns {*} Datos parseados o el valor por defecto.
 */
const cargarDesdeLocalStorage = (clave, valorPorDefecto = null) => {
  try {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : valorPorDefecto;
  } catch (error) {
    console.error("Error al cargar desde localStorage:", error);
    return valorPorDefecto;
  }
};

/**
 * Actualiza la colección en memoria desde localStorage.
 */
const cargarEstadoColeccion = () => {
  const datos = cargarDesdeLocalStorage(STORAGE_KEYS.COLECCION, []);
  coleccionActual = Array.isArray(datos) ? datos : [];
};

/**
 * Obtiene los datos originales de un álbum por su índice.
 * @param {number} id Índice dentro del arreglo `albumes`.
 * @returns {{nombre: string, artista: string, imagen: string}|undefined} Registro encontrado.
 */
const obtenerAlbumPorId = (id) => albumes[id];

/**
 * Indica si un álbum ya se encuentra en la colección actual.
 * @param {number} id Identificador del álbum.
 * @returns {boolean} Verdadero si está guardado.
 */
const estaEnColeccion = (id) => coleccionActual.some(item => item.id === id);

/**
 * Persiste el estado actual de la colección en localStorage.
 */
const guardarColeccion = () => guardarEnLocalStorage(STORAGE_KEYS.COLECCION, coleccionActual);

/**
 * Agrega un álbum al arreglo en memoria si no estaba registrado.
 * @param {number} id Identificador del álbum a añadir.
 */
const agregarAlbumAEstado = (id) => {
  if (!estaEnColeccion(id)) {
    coleccionActual.push({ id, resena: null });
    guardarColeccion();
  }
};

/**
 * Elimina un álbum del estado en memoria y guarda los cambios.
 * @param {number} id Identificador del álbum a quitar.
 */
const quitarAlbumDeEstado = (id) => {
  const nuevaColeccion = coleccionActual.filter(item => item.id !== id);
  if (nuevaColeccion.length !== coleccionActual.length) {
    coleccionActual = nuevaColeccion;
    guardarColeccion();
  }
};

/**
 * Actualiza la reseña de un álbum previamente agregado.
 * @param {number} id Identificador del álbum.
 * @param {{texto: string, puntaje: string}|null} resena Datos de reseña a almacenar.
 */
const actualizarResenaEnEstado = (id, resena) => {
  const entrada = coleccionActual.find(item => item.id === id);
  if (entrada) {
    entrada.resena = resena;
    guardarColeccion();
  }
};

/**
 * Construye el nodo HTML para un álbum dentro de la colección.
 * @param {{nombre: string, artista: string, imagen: string}} album Datos base del álbum.
 * @param {number} id Identificador del álbum.
 * @param {{texto: string, puntaje: string}|null} resenaGuardada Reseña existente a mostrar.
 * @returns {HTMLDivElement} Tarjeta generada.
 */
const crearTarjetaColeccion = (album, id, resenaGuardada) => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta-album";
  tarjeta.setAttribute("data-id", id);

  tarjeta.innerHTML = `
    <img src="${obtenerRutaImagen(album.imagen)}" alt="${album.nombre}">
    <div class="info-album">
      <h3>${album.nombre}</h3>
      <p>${album.artista}</p>
    </div>
  `;

  const seccionResena = document.createElement("div");
  seccionResena.className = "seccion-resena";
  seccionResena.innerHTML = `
    <div class="entradas-resena">
      <input type="text" placeholder="Escribe tu reseña breve..." maxlength="100" class="texto-resena">
      <span class="contador-caracteres">0/100</span>
      <select class="entrada-puntaje">
        <option value="">Selecciona puntaje</option>
        ${OPCIONES_PUNTAJE}
      </select>
      <button onclick="guardarResena(this)" class="boton-guardar">Guardar</button>
    </div>
    <div class="resena-guardada" style="display: none;">
      <p class="texto-resena-guardado"></p>
      <p class="puntaje-resena-guardado"></p>
      <button onclick="editarResena(this)" class="boton-editar">Editar</button>
    </div>
  `;

  tarjeta.appendChild(seccionResena);

  const entradaResena = seccionResena.querySelector(".texto-resena");
  if (entradaResena) {
    entradaResena.addEventListener("input", () => actualizarContador(entradaResena));
  }

  if (resenaGuardada && resenaGuardada.texto && resenaGuardada.puntaje) {
    const entradasResena = seccionResena.querySelector(".entradas-resena");
    const resenaMostrada = seccionResena.querySelector(".resena-guardada");
    const textoResenaGuardado = seccionResena.querySelector(".texto-resena-guardado");
    const puntajeResenaGuardado = seccionResena.querySelector(".puntaje-resena-guardado");

    textoResenaGuardado.textContent = `"${resenaGuardada.texto}"`;
    puntajeResenaGuardado.textContent = `Puntaje: ${resenaGuardada.puntaje}/10`;
    entradasResena.style.display = "none";
    resenaMostrada.style.display = "block";
  }

  return tarjeta;
};

/**
 * Inserta todas las tarjetas de la colección en el DOM.
 */
const renderColeccion = () => {
  const contenedor = document.getElementById("lista-coleccion");
  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  coleccionActual.forEach(item => {
    const album = obtenerAlbumPorId(item.id);
    if (!album) {
      return;
    }
    const tarjeta = crearTarjetaColeccion(album, item.id, item.resena);
    contenedor.appendChild(tarjeta);
  });
};

/**
 * Actualiza la cifra visible de álbumes guardados.
 */
const actualizarContadorColeccion = () => {
  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = coleccionActual.length;
  }
};

/**
 * Sincroniza la vista de la colección con el estado actual.
 */
const actualizarVistaColeccion = () => {
  renderColeccion();
  actualizarContadorColeccion();
};

/**
 * Cambia la apariencia de las estrellas según si el álbum está guardado.
 */
const aplicarEstadoEstrellas = () => {
  document.querySelectorAll(".estrella").forEach(estrella => {
    const id = parseInt(estrella.getAttribute("data-id"), 10);
    if (Number.isNaN(id)) {
      return;
    }

    if (estaEnColeccion(id)) {
      estrella.classList.add("activo");
      estrella.textContent = "\u2605";
    } else {
      estrella.classList.remove("activo");
      estrella.textContent = "\u2606";
    }
  });
};

/**
 * Dibuja el catálogo principal, opcionalmente filtrado.
 * @param {Array<{nombre: string, artista: string, imagen: string}>} [lista=albumes] Lista personalizada.
 */
let mostrarCatalogo = (lista = albumes) => {
  const contenedor = document.getElementById("lista-albumes");
  if (!contenedor) {
    return;
  }

  let contenido = "";

  lista.forEach(album => {
    const albumId = albumes.indexOf(album);
    if (albumId === -1) {
      return;
    }

    contenido += `
      <div class="tarjeta-album" data-id="${albumId}">
        <img src="${obtenerRutaImagen(album.imagen)}" alt="${album.nombre}">
        <div class="info-album">
          <h3>${album.nombre}</h3>
          <p>${album.artista}</p>
          <span class="estrella" onclick="agregarAColeccion(this)" data-id="${albumId}">\u2606</span>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = contenido;
  aplicarEstadoEstrellas();
};

/**
 * Llena el select de artistas disponibles basándose en el catálogo.
 */
const cargarArtistas = () => {
  const filtro = document.getElementById("filtro-artista");
  if (!filtro) {
    return;
  }

  const artistasUnicos = [];
  albumes.forEach(album => {
    if (!artistasUnicos.includes(album.artista)) {
      artistasUnicos.push(album.artista);
    }
  });

  const valorSeleccionado = filtro.value;
  filtro.innerHTML = '<option value="">-- Filtrar por artista --</option>';

  artistasUnicos.forEach(artista => {
    const option = document.createElement("option");
    option.value = artista;
    option.textContent = artista;
    filtro.appendChild(option);
  });

  if (valorSeleccionado && artistasUnicos.includes(valorSeleccionado)) {
    filtro.value = valorSeleccionado;
  }
};

/**
 * Guarda los valores actuales de búsqueda y filtro en localStorage.
 */
const guardarFiltros = () => {
  const input = document.getElementById("busqueda");
  const filtro = document.getElementById("filtro-artista");

  if (!input || !filtro) {
    return;
  }

  const filtros = {
    busqueda: input.value,
    artista: filtro.value
  };

  guardarEnLocalStorage(STORAGE_KEYS.FILTROS, filtros);
};

/**
 * Recupera los filtros guardados y aplica la vista correspondiente.
 */
const cargarFiltros = () => {
  const input = document.getElementById("busqueda");
  const filtro = document.getElementById("filtro-artista");

  if (!input || !filtro) {
    return;
  }

  const filtros = cargarDesdeLocalStorage(STORAGE_KEYS.FILTROS, {});

  if (filtros && typeof filtros.busqueda === "string") {
    input.value = filtros.busqueda;
  }

  if (filtros && typeof filtros.artista === "string") {
    filtro.value = filtros.artista;
  }

  if (filtro.value) {
    filtrarPorArtista();
  } else if (input.value) {
    buscarAlbumes();
  } else {
    mostrarCatalogo();
  }
};

/**
 * Ejecuta una búsqueda por texto libre sobre nombre y artista.
 */
const buscarAlbumes = () => {
  const input = document.getElementById("busqueda");
  if (!input) {
    return;
  }

  const texto = input.value.trim().toLowerCase();
  const resultado = albumes.filter(album =>
    album.nombre.toLowerCase().includes(texto) ||
    album.artista.toLowerCase().includes(texto)
  );

  mostrarCatalogo(texto ? resultado : albumes);
  guardarFiltros();
};

/**
 * Aplica el filtro por artista seleccionado en el combo.
 */
const filtrarPorArtista = () => {
  const select = document.getElementById("filtro-artista");
  if (!select) {
    return;
  }

  const artista = select.value;
  const resultado = artista ? albumes.filter(album => album.artista === artista) : albumes;

  mostrarCatalogo(resultado);
  guardarFiltros();
};

/**
 * Registra listeners para guardar automáticamente los filtros.
 */
const registrarEventosDeFiltros = () => {
  const input = document.getElementById("busqueda");
  const select = document.getElementById("filtro-artista");

  if (input) {
    input.addEventListener("input", () => {
      clearTimeout(window.busquedaTimeout);
      window.busquedaTimeout = setTimeout(guardarFiltros, 500);
    });
  }

  if (select) {
    select.addEventListener("change", guardarFiltros);
  }
};

/**
 * Añade o quita un álbum de la colección a partir de la estrella clickeada.
 * @param {HTMLElement} estrella Elemento que disparó el evento.
 */
const agregarAColeccion = (estrella) => {
  const idAlbum = parseInt(estrella.getAttribute("data-id"), 10);
  if (Number.isNaN(idAlbum)) {
    return;
  }

  if (estrella.classList.contains("activo")) {
    estrella.classList.remove("activo");
    estrella.textContent = "\u2606";
    quitarAlbumDeEstado(idAlbum);
  } else {
    estrella.classList.add("activo");
    estrella.textContent = "\u2605";
    agregarAlbumAEstado(idAlbum);
  }

  actualizarVistaColeccion();
  aplicarEstadoEstrellas();
};

/**
 * Refresca el contador de caracteres de una reseña en edición.
 * @param {HTMLInputElement} entrada Campo de texto observado.
 */
const actualizarContador = (entrada) => {
  const contador = entrada.parentElement.querySelector(".contador-caracteres");
  const longitud = entrada.value.length;
  contador.textContent = `${longitud}/100`;

  if (longitud > 80) {
    contador.style.color = "#ff6b6b";
  } else if (longitud > 60) {
    contador.style.color = "#ffa500";
  } else {
    contador.style.color = "#666";
  }
};

/**
 * Valida y guarda la reseña escrita para un álbum.
 * @param {HTMLButtonElement} boton Botón que dispara el guardado.
 */
const guardarResena = (boton) => {
  const seccionResena = boton.closest(".seccion-resena");
  if (!seccionResena) {
    return;
  }

  const entradaresena = seccionResena.querySelector(".texto-resena");
  const entradaPuntaje = seccionResena.querySelector(".entrada-puntaje");
  const entradasresena = seccionResena.querySelector(".entradas-resena");
  const resenaGuardada = seccionResena.querySelector(".resena-guardada");
  const textoresenaGuardado = seccionResena.querySelector(".texto-resena-guardado");
  const puntajeresenaGuardado = seccionResena.querySelector(".puntaje-resena-guardado");

  if (!entradaresena || !entradaPuntaje || !entradasresena || !resenaGuardada) {
    return;
  }

  const textoresena = entradaresena.value.trim();
  const puntaje = entradaPuntaje.value;

  if (!textoresena) {
    alert("Por favor, escribe una resena");
    return;
  }

  if (!puntaje) {
    alert("Por favor, selecciona un puntaje del 1 al 10");
    return;
  }

  textoresenaGuardado.textContent = `"${textoresena}"`;
  puntajeresenaGuardado.textContent = `Puntaje: ${puntaje}/10`;

  entradasresena.style.display = "none";
  resenaGuardada.style.display = "block";

  entradaresena.value = "";
  entradaPuntaje.value = "";
  actualizarContador(entradaresena);

  const tarjeta = seccionResena.closest(".tarjeta-album");
  if (!tarjeta) {
    return;
  }

  const idAlbum = parseInt(tarjeta.getAttribute("data-id"), 10);
  if (Number.isNaN(idAlbum)) {
    return;
  }

  actualizarResenaEnEstado(idAlbum, { texto: textoresena, puntaje });
  actualizarVistaColeccion();
};

/**
 * Permite que la reseña guardada vuelva al modo edición.
 * @param {HTMLButtonElement} boton Botón de edición utilizado.
 */
const editarResena = (boton) => {
  const seccionresena = boton.closest(".seccion-resena");
  if (!seccionresena) {
    return;
  }

  const entradaresena = seccionresena.querySelector(".texto-resena");
  const entradaPuntaje = seccionresena.querySelector(".entrada-puntaje");
  const entradasresena = seccionresena.querySelector(".entradas-resena");
  const resenaGuardada = seccionresena.querySelector(".resena-guardada");
  const textoresenaGuardado = seccionresena.querySelector(".texto-resena-guardado");
  const puntajeresenaGuardado = seccionresena.querySelector(".puntaje-resena-guardado");

  if (!entradaresena || !entradaPuntaje || !entradasresena || !resenaGuardada) {
    return;
  }

  const textoActual = textoresenaGuardado.textContent.replace(/^"(.*)"$/, "$1");
  const puntajeActual = puntajeresenaGuardado.textContent.replace(/^Puntaje: (\d+)\/10$/, "$1");

  entradaresena.value = textoActual;
  entradaPuntaje.value = puntajeActual;
  actualizarContador(entradaresena);

  entradasresena.style.display = "block";
  resenaGuardada.style.display = "none";
};

/**
 * Borra la información persistida y vuelve la app a su estado inicial.
 */
const limpiarDatos = () => {
  if (!confirm("¿Estás seguro de que quieres limpiar todos los datos guardados? Esta acción no se puede deshacer.")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEYS.COLECCION);
  localStorage.removeItem(STORAGE_KEYS.FILTROS);

  coleccionActual = [];

  const inputBusqueda = document.getElementById("busqueda");
  const filtroArtista = document.getElementById("filtro-artista");

  if (inputBusqueda) {
    inputBusqueda.value = "";
  }

  if (filtroArtista) {
    filtroArtista.value = "";
  }

  actualizarVistaColeccion();

  if (document.getElementById("lista-albumes")) {
    mostrarCatalogo();
  }

  aplicarEstadoEstrellas();

  alert("Datos limpiados correctamente");
};

document.addEventListener("DOMContentLoaded", () => {
  cargarEstadoColeccion();

  if (document.getElementById("lista-albumes")) {
    mostrarCatalogo();
    cargarArtistas();
    cargarFiltros();
    registrarEventosDeFiltros();
  }

  actualizarVistaColeccion();
  aplicarEstadoEstrellas();
});
