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

const STORAGE_KEYS = {
  COLECCION: "coleccionAlbumes",
  FILTROS: "filtrosBusqueda"
};

const OPCIONES_PUNTAJE = Array.from({ length: 10 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("");

let coleccionActual = [];

const guardarEnLocalStorage = (clave, datos) => {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
};

const cargarDesdeLocalStorage = (clave, valorPorDefecto = null) => {
  try {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : valorPorDefecto;
  } catch (error) {
    console.error("Error al cargar desde localStorage:", error);
    return valorPorDefecto;
  }
};

const cargarEstadoColeccion = () => {
  const datos = cargarDesdeLocalStorage(STORAGE_KEYS.COLECCION, []);
  coleccionActual = Array.isArray(datos) ? datos : [];
};

const obtenerAlbumPorId = (id) => albumes[id];

const estaEnColeccion = (id) => coleccionActual.some(item => item.id === id);

const guardarColeccion = () => guardarEnLocalStorage(STORAGE_KEYS.COLECCION, coleccionActual);

const agregarAlbumAEstado = (id) => {
  if (!estaEnColeccion(id)) {
    coleccionActual.push({ id, reseña: null });
    guardarColeccion();
  }
};

const quitarAlbumDeEstado = (id) => {
  const nuevaColeccion = coleccionActual.filter(item => item.id !== id);
  if (nuevaColeccion.length !== coleccionActual.length) {
    coleccionActual = nuevaColeccion;
    guardarColeccion();
  }
};

const actualizarReseñaEnEstado = (id, reseña) => {
  const entrada = coleccionActual.find(item => item.id === id);
  if (entrada) {
    entrada.reseña = reseña;
    guardarColeccion();
  }
};

const crearTarjetaColeccion = (album, id, reseñaGuardada) => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta-album";
  tarjeta.setAttribute("data-id", id);

  tarjeta.innerHTML = `
    <img src="imagenes/${album.imagen}" alt="${album.nombre}">
    <div class="info-album">
      <h3>${album.nombre}</h3>
      <p>${album.artista}</p>
    </div>
  `;

  const seccionReseña = document.createElement("div");
  seccionReseña.className = "seccion-reseña";
  seccionReseña.innerHTML = `
    <div class="entradas-reseña">
      <input type="text" placeholder="Escribe tu reseña breve..." maxlength="100" class="texto-reseña">
      <span class="contador-caracteres">0/100</span>
      <select class="entrada-puntaje">
        <option value="">Selecciona puntaje</option>
        ${OPCIONES_PUNTAJE}
      </select>
      <button onclick="guardarReseña(this)" class="boton-guardar">Guardar</button>
    </div>
    <div class="reseña-guardada" style="display: none;">
      <p class="texto-reseña-guardado"></p>
      <p class="puntaje-reseña-guardado"></p>
      <button onclick="editarReseña(this)" class="boton-editar">Editar</button>
    </div>
  `;

  tarjeta.appendChild(seccionReseña);

  const entradaReseña = seccionReseña.querySelector(".texto-reseña");
  if (entradaReseña) {
    entradaReseña.addEventListener("input", () => actualizarContador(entradaReseña));
  }

  if (reseñaGuardada && reseñaGuardada.texto && reseñaGuardada.puntaje) {
    const entradasReseña = seccionReseña.querySelector(".entradas-reseña");
    const reseñaMostrada = seccionReseña.querySelector(".reseña-guardada");
    const textoReseñaGuardado = seccionReseña.querySelector(".texto-reseña-guardado");
    const puntajeReseñaGuardado = seccionReseña.querySelector(".puntaje-reseña-guardado");

    textoReseñaGuardado.textContent = `"${reseñaGuardada.texto}"`;
    puntajeReseñaGuardado.textContent = `Puntaje: ${reseñaGuardada.puntaje}/10`;
    entradasReseña.style.display = "none";
    reseñaMostrada.style.display = "block";
  }

  return tarjeta;
};

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
    const tarjeta = crearTarjetaColeccion(album, item.id, item.reseña);
    contenedor.appendChild(tarjeta);
  });
};

const actualizarContadorColeccion = () => {
  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = coleccionActual.length;
  }
};

const actualizarVistaColeccion = () => {
  renderColeccion();
  actualizarContadorColeccion();
};

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
        <img src="imagenes/${album.imagen}" alt="${album.nombre}">
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

const guardarReseña = (boton) => {
  const seccionReseña = boton.closest(".seccion-reseña");
  if (!seccionReseña) {
    return;
  }

  const entradaReseña = seccionReseña.querySelector(".texto-reseña");
  const entradaPuntaje = seccionReseña.querySelector(".entrada-puntaje");
  const entradasReseña = seccionReseña.querySelector(".entradas-reseña");
  const reseñaGuardada = seccionReseña.querySelector(".reseña-guardada");
  const textoReseñaGuardado = seccionReseña.querySelector(".texto-reseña-guardado");
  const puntajeReseñaGuardado = seccionReseña.querySelector(".puntaje-reseña-guardado");

  if (!entradaReseña || !entradaPuntaje || !entradasReseña || !reseñaGuardada) {
    return;
  }

  const textoReseña = entradaReseña.value.trim();
  const puntaje = entradaPuntaje.value;

  if (!textoReseña) {
    alert("Por favor, escribe una reseña");
    return;
  }

  if (!puntaje) {
    alert("Por favor, selecciona un puntaje del 1 al 10");
    return;
  }

  textoReseñaGuardado.textContent = `"${textoReseña}"`;
  puntajeReseñaGuardado.textContent = `Puntaje: ${puntaje}/10`;

  entradasReseña.style.display = "none";
  reseñaGuardada.style.display = "block";

  entradaReseña.value = "";
  entradaPuntaje.value = "";
  actualizarContador(entradaReseña);

  const tarjeta = seccionReseña.closest(".tarjeta-album");
  if (!tarjeta) {
    return;
  }

  const idAlbum = parseInt(tarjeta.getAttribute("data-id"), 10);
  if (Number.isNaN(idAlbum)) {
    return;
  }

  actualizarReseñaEnEstado(idAlbum, { texto: textoReseña, puntaje });
  actualizarVistaColeccion();
};

const editarReseña = (boton) => {
  const seccionReseña = boton.closest(".seccion-reseña");
  if (!seccionReseña) {
    return;
  }

  const entradaReseña = seccionReseña.querySelector(".texto-reseña");
  const entradaPuntaje = seccionReseña.querySelector(".entrada-puntaje");
  const entradasReseña = seccionReseña.querySelector(".entradas-reseña");
  const reseñaGuardada = seccionReseña.querySelector(".reseña-guardada");
  const textoReseñaGuardado = seccionReseña.querySelector(".texto-reseña-guardado");
  const puntajeReseñaGuardado = seccionReseña.querySelector(".puntaje-reseña-guardado");

  if (!entradaReseña || !entradaPuntaje || !entradasReseña || !reseñaGuardada) {
    return;
  }

  const textoActual = textoReseñaGuardado.textContent.replace(/^"(.*)"$/, "$1");
  const puntajeActual = puntajeReseñaGuardado.textContent.replace(/^Puntaje: (\d+)\/10$/, "$1");

  entradaReseña.value = textoActual;
  entradaPuntaje.value = puntajeActual;
  actualizarContador(entradaReseña);

  entradasReseña.style.display = "block";
  reseñaGuardada.style.display = "none";
};

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
