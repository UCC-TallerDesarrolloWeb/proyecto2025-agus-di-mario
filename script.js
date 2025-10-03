// ===== LOCAL STORAGE FUNCTIONS =====

/**
 * Guarda datos en localStorage
 * @method guardarEnLocalStorage
 * @param {string} clave - La clave para identificar los datos
 * @param {any} datos - Los datos a guardar
 * @return {void}
 */
const guardarEnLocalStorage = (clave, datos) => {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

/**
 * Carga datos desde localStorage
 * @method cargarDesdeLocalStorage
 * @param {string} clave - La clave para identificar los datos
 * @param {any} valorPorDefecto - Valor por defecto si no hay datos guardados
 * @return {any} Los datos cargados o el valor por defecto
 */
const cargarDesdeLocalStorage = (clave, valorPorDefecto = null) => {
  try {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : valorPorDefecto;
  } catch (error) {
    console.error('Error al cargar desde localStorage:', error);
    return valorPorDefecto;
  }
};

/**
 * Guarda la colección de álbumes
 * @method guardarColeccion
 * @return {void}
 */
const guardarColeccion = () => {
  const coleccion = document.getElementById("lista-coleccion");
  const albumesEnColeccion = [];
  
  coleccion.querySelectorAll('.tarjeta-album').forEach(album => {
    const id = album.getAttribute('data-id');
    const reseña = album.querySelector('.reseña-guardada');
    
    let reseñaData = null;
    if (reseña && reseña.style.display !== 'none') {
      const texto = reseña.querySelector('.texto-reseña-guardado')?.textContent;
      const puntaje = reseña.querySelector('.puntaje-reseña-guardado')?.textContent;
      
      if (texto && puntaje) {
        reseñaData = {
          texto: texto.replace(/^"(.*)"$/, '$1'), // Remover comillas
          puntaje: puntaje.replace(/^Puntaje: (\d+)\/10$/, '$1') // Extraer solo el número
        };
      }
    }
    
    albumesEnColeccion.push({
      id: parseInt(id),
      reseña: reseñaData
    });
  });
  
  guardarEnLocalStorage('coleccionAlbumes', albumesEnColeccion);
};

/**
 * Carga la colección de álbumes guardada
 * @method cargarColeccion
 * @return {void}
 */
const cargarColeccion = () => {
  const coleccionGuardada = cargarDesdeLocalStorage('coleccionAlbumes', []);
  
  coleccionGuardada.forEach(albumData => {
    const estrella = document.querySelector(`[data-id="${albumData.id}"]`);
    if (estrella && !estrella.classList.contains('activo')) {
      // Simular click en la estrella para agregar a la colección
      agregarAColeccion(estrella);
      
      // Si hay reseña guardada, restaurarla
      if (albumData.reseña) {
        setTimeout(() => {
          const albumEnColeccion = document.querySelector(`#coleccion .tarjeta-album[data-id='${albumData.id}']`);
          if (albumEnColeccion) {
            const seccionReseña = albumEnColeccion.querySelector('.seccion-reseña');
            const entradasReseña = seccionReseña.querySelector('.entradas-reseña');
            const reseñaGuardada = seccionReseña.querySelector('.reseña-guardada');
            const textoReseñaGuardado = seccionReseña.querySelector('.texto-reseña-guardado');
            const puntajeReseñaGuardado = seccionReseña.querySelector('.puntaje-reseña-guardado');
            
            // Llenar los campos
            textoReseñaGuardado.textContent = `"${albumData.reseña.texto}"`;
            puntajeReseñaGuardado.textContent = `Puntaje: ${albumData.reseña.puntaje}/10`;
            
            // Ocultar inputs y mostrar reseña guardada
            entradasReseña.style.display = 'none';
            reseñaGuardada.style.display = 'block';
          }
        }, 100);
      }
    }
  });
};

/**
 * Guarda los filtros de búsqueda
 * @method guardarFiltros
 * @return {void}
 */
const guardarFiltros = () => {
  const filtros = {
    busqueda: document.getElementById('busqueda').value,
    artista: document.getElementById('filtro-artista').value
  };
  guardarEnLocalStorage('filtrosBusqueda', filtros);
};

/**
 * Carga los filtros de búsqueda guardados
 * @method cargarFiltros
 * @return {void}
 */
const cargarFiltros = () => {
  const filtros = cargarDesdeLocalStorage('filtrosBusqueda', {});
  
  filtros.busqueda && (document.getElementById('busqueda').value = filtros.busqueda);
  
  if (filtros.artista) {
    document.getElementById('filtro-artista').value = filtros.artista;
    filtrarPorArtista();
  }
};

// ===== DATOS DE ÁLBUMES =====

const albumes = [
  {
    nombre: "California",
    artista: "Blink-182",
    imagen: "Blink-182_-_Calfornia.jpg"
  },
  {
    nombre: "Neighborhoods",
    artista: "Blink-182",
    imagen: "Blink-182_-_Neighborhoods_cover.jpg"
  },
  {
    nombre: "Nine",
    artista: "Blink-182",
    imagen: "Blink-182_-_Nine.png"
  },
  {
    nombre: "Take Off Your Pants and Jacket",
    artista: "Blink-182",
    imagen: "Blink-182_-_Take_Off_Your_Pants_and_Jacket_cover.jpg"
  },
  {
    nombre: "The Mark, Tom and Travis Show",
    artista: "Blink-182",
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

/**
 * Guarda la reseña y puntaje de un álbum
 * @method guardarReseña
 * @param {HTMLElement} boton - El botón de guardar clickeado
 * @return {void}
 */
const guardarReseña = (boton) => {
  const seccionReseña = boton.closest('.seccion-reseña');
  const entradaReseña = seccionReseña.querySelector('.texto-reseña');
  const entradaPuntaje = seccionReseña.querySelector('.entrada-puntaje');
  const entradasReseña = seccionReseña.querySelector('.entradas-reseña');
  const reseñaGuardada = seccionReseña.querySelector('.reseña-guardada');
  const textoReseñaGuardado = seccionReseña.querySelector('.texto-reseña-guardado');
  const puntajeReseñaGuardado = seccionReseña.querySelector('.puntaje-reseña-guardado');

  const textoReseña = entradaReseña.value.trim();
  const puntaje = entradaPuntaje.value;

  // Validar que ambos campos estén completos
  if (!textoReseña) {
    alert('Por favor, escribe una reseña');
    return;
  }

  if (!puntaje) {
    alert('Por favor, selecciona un puntaje del 1 al 10');
    return;
  }

  // Guardar la reseña
  textoReseñaGuardado.textContent = `"${textoReseña}"`;
  puntajeReseñaGuardado.textContent = `Puntaje: ${puntaje}/10`;

  // Ocultar inputs y mostrar reseña guardada
  entradasReseña.style.display = 'none';
  reseñaGuardada.style.display = 'block';

  // Limpiar los campos para la próxima vez
  entradaReseña.value = '';
  entradaPuntaje.value = '';
  actualizarContador(entradaReseña);
  
  // Guardar en localStorage
  guardarColeccion();
};

/**
 * Habilita la edición de una reseña guardada
 * @method editarReseña
 * @param {HTMLElement} boton - El botón de editar clickeado
 * @return {void}
 */
const editarReseña = (boton) => {
  const seccionReseña = boton.closest('.seccion-reseña');
  const entradaReseña = seccionReseña.querySelector('.texto-reseña');
  const entradaPuntaje = seccionReseña.querySelector('.entrada-puntaje');
  const entradasReseña = seccionReseña.querySelector('.entradas-reseña');
  const reseñaGuardada = seccionReseña.querySelector('.reseña-guardada');
  const textoReseñaGuardado = seccionReseña.querySelector('.texto-reseña-guardado');
  const puntajeReseñaGuardado = seccionReseña.querySelector('.puntaje-reseña-guardado');

  // Obtener el texto y puntaje actuales (sin las comillas y el prefijo "Puntaje: ")
  const textoActual = textoReseñaGuardado.textContent.replace(/^"(.*)"$/, '$1');
  const puntajeActual = puntajeReseñaGuardado.textContent.replace(/^Puntaje: (\d+)\/10$/, '$1');

  // Llenar los campos con los valores actuales
  entradaReseña.value = textoActual;
  entradaPuntaje.value = puntajeActual;

  // Actualizar contador de caracteres
  actualizarContador(entradaReseña);

  // Mostrar inputs y ocultar reseña guardada
  entradasReseña.style.display = 'block';
  reseñaGuardada.style.display = 'none';
};

/**
 * Actualiza el contador de caracteres
 * @method actualizarContador
 * @param {HTMLElement} input - El input de texto
 * @return {void}
 */
const actualizarContador = (entrada) => {
  const contador = entrada.parentElement.querySelector('.contador-caracteres');
  const longitudActual = entrada.value.length;
  contador.textContent = `${longitudActual}/100`;
  
  // Cambiar color si se acerca al límite
  contador.style.color = longitudActual > 80 ? '#ff6b6b' : 
                         longitudActual > 60 ? '#ffa500' : '#666';
};

/**
 * Agrega o quita un álbum de la colección al hacer click en la estrella
 * @method agregarAColeccion
 * @param {HTMLElement} estrella - La estrellita clickeada
 * @return {void}
 */
const agregarAColeccion = (estrella) => {
  const coleccion = document.getElementById("lista-coleccion");
  const contador = document.getElementById("contador");

  if (estrella.classList.contains("activo")) {
    // Quitar de la colección
    estrella.classList.remove("activo");
    estrella.textContent = "☆";
    
    // Buscar y quitar el álbum en la colección
    const idAlbum = estrella.getAttribute("data-id");
    const albumEnColeccion = document.querySelector(`#coleccion .tarjeta-album[data-id='${idAlbum}']`);
    albumEnColeccion?.remove();

    // Actualizar contador
    contador.textContent = coleccion.children.length;
    
    // Guardar en localStorage
    guardarColeccion();
    
  } else {
    // Agregar a la colección
    estrella.classList.add("activo");
    estrella.textContent = "★";

    const idAlbum = estrella.getAttribute("data-id");
    const tarjetaAlbum = estrella.closest(".tarjeta-album").cloneNode(true);

    // Eliminar la estrella en el clon (para que no se vuelva a clickear)
    const estrellaClon = tarjetaAlbum.querySelector(".estrella");
    estrellaClon?.remove();

    // Agregar inputs de reseña
    const reseña = document.createElement("div");
    reseña.className = "seccion-reseña";
    reseña.innerHTML = `
      <div class="entradas-reseña">
        <input type="text" placeholder="Escribe tu reseña breve..." maxlength="100" class="texto-reseña">
        <span class="contador-caracteres">0/100</span>
        <select class="entrada-puntaje">
          <option value="">Selecciona puntaje</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button onclick="guardarReseña(this)" class="boton-guardar">Guardar</button>
      </div>
      <div class="reseña-guardada" style="display: none;">
        <p class="texto-reseña-guardado"></p>
        <p class="puntaje-reseña-guardado"></p>
        <button onclick="editarReseña(this)" class="boton-editar">Editar</button>
      </div>
    `;
    tarjetaAlbum.appendChild(reseña);

    // Marcar id en el clon
    tarjetaAlbum.setAttribute("data-id", idAlbum);

    // Insertar en la colección
    coleccion.appendChild(tarjetaAlbum);

    // Agregar evento para el contador de caracteres
    const entradaReseña = tarjetaAlbum.querySelector('.texto-reseña');
    entradaReseña?.addEventListener('input', () => actualizarContador(entradaReseña));

    // Actualizar contador
    contador.textContent = coleccion.children.length;
    
    // Guardar en localStorage
    guardarColeccion();
  }
};


/**
 * Muestra todos los álbumes en el catálogo
 * @method mostrarCatalogo
 * @param {Array} lista - Lista de álbumes a mostrar
 * @return {void}
 */
let mostrarCatalogo = (lista = albumes) => {
  let contenido = "";

  lista.forEach((album, id) => {
    contenido += `
      <div class="tarjeta-album" data-id="${id}">
        <img src="imagenes/${album.imagen}" alt="${album.nombre}">
        <div class="info-album">
          <h3>${album.nombre}</h3>
          <p>${album.artista}</p>
          <span class="estrella" onclick="agregarAColeccion(this)" data-id="${id}">☆</span>
        </div>
      </div>
    `;
  });

  document.getElementById("lista-albumes").innerHTML = contenido;
};

/**
 * Llena el select de artistas con las opciones únicas
 * @method cargarArtistas
 * @return {void}
 */
const cargarArtistas = () => {
  const filtro = document.getElementById("filtro-artista");
  const artistas = [...new Set(albumes.map(album => album.artista))]; // artistas únicos

  artistas.forEach(artista => {
    const option = document.createElement("option");
    option.value = artista;
    option.textContent = artista;
    filtro.appendChild(option);
  });
};

/**
 * Busca álbumes por texto en nombre o artista
 * @method buscarAlbumes
 * @return {void}
 */
const buscarAlbumes = () => {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const resultado = albumes.filter(album =>
    album.nombre.toLowerCase().includes(texto) ||
    album.artista.toLowerCase().includes(texto)
  );
  mostrarCatalogo(resultado);
  
  // Guardar filtros en localStorage
  guardarFiltros();
};

/**
 * Filtra álbumes por artista seleccionado
 * @method filtrarPorArtista
 * @return {void}
 */
const filtrarPorArtista = () => {
  const artista = document.getElementById("filtro-artista").value;
  const resultado = artista === "" ? albumes : albumes.filter(album => album.artista === artista);
  mostrarCatalogo(resultado);
  
  // Guardar filtros en localStorage
  guardarFiltros();
};

// Eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarCatalogo();
  cargarArtistas();
  
  // Cargar datos guardados
  cargarFiltros();
  cargarColeccion();
  
  // Agregar eventos para guardar automáticamente cuando cambien los filtros
  const inputBusqueda = document.getElementById('busqueda');
  const selectArtista = document.getElementById('filtro-artista');
  
  inputBusqueda.addEventListener('input', () => {
    // Guardar con un pequeño delay para evitar guardar en cada tecla
    clearTimeout(window.busquedaTimeout);
    window.busquedaTimeout = setTimeout(guardarFiltros, 500);
  });
  
  selectArtista.addEventListener('change', guardarFiltros);
});

/**
 * Limpia todos los datos guardados en localStorage
 * @method limpiarDatos
 * @return {void}
 */
const limpiarDatos = () => {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos guardados? Esta acción no se puede deshacer.')) {
    // Limpiar localStorage
    localStorage.removeItem('coleccionAlbumes');
    localStorage.removeItem('filtrosBusqueda');
    
    // Limpiar la interfaz
    document.getElementById('busqueda').value = '';
    document.getElementById('filtro-artista').value = '';
    
    // Limpiar colección
    document.getElementById('lista-coleccion').innerHTML = '';
    document.getElementById('contador').textContent = '0';
    
    // Limpiar estrellas activas
    document.querySelectorAll('.estrella.activo').forEach(estrella => {
      estrella.classList.remove('activo');
      estrella.textContent = '☆';
    });
    
    // Mostrar catálogo completo
    mostrarCatalogo();
    
    alert('Datos limpiados correctamente');
  }
};
