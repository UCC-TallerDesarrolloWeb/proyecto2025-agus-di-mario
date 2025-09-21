const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const generarId = () => Math.random().toString(36).slice(2, 9);

let estado = { retos: [], subs: [], jugadores: {} };

// Seed inicial
estado.retos = [
    {
        id: generarId(),
        title: 'Logo minimalista para app sustentable',
        cat: 'Diseño',
        desc: 'SVG + guía de color',
        prize: 200,
        status: 'activo',
        tags: 'logo, diseño, svg, sustentable'
    },
    {
        id: generarId(),
        title: 'Plan TikTok para café de especialidad',
        cat: 'Marketing',
        desc: 'Calendario + hashtags',
        prize: 300,
        status: 'activo',
        tags: 'tiktok, marketing, café, redes sociales'
    },
    {
        id: generarId(),
        title: 'App móvil para delivery local',
        cat: 'Programación',
        desc: 'React Native + backend',
        prize: 500,
        status: 'activo',
        tags: 'react, mobile, delivery, app'
    },
    {
        id: generarId(),
        title: 'Investigación UX para fintech',
        cat: 'Investigación',
        desc: 'Entrevistas + análisis',
        prize: 400,
        status: 'activo',
        tags: 'ux, investigación, fintech, entrevistas'
    }
];

// ===== SISTEMA DE NOTIFICACIONES TOAST =====
/**
 * Muestra una notificación toast con animaciones de entrada y salida
 * @method mostrarNotificacion
 * @param {string} mensaje - El mensaje que se mostrará en la notificación
 * @param {string} tipo - El tipo de notificación (success, error, warning, info)
 * @param {number} duracion - Duración en milisegundos que permanecerá visible la notificación
 * @return {void}
 */
function mostrarNotificacion(mensaje, tipo = 'success', duracion = 3000) {
    const notificacion = document.createElement('div');
    notificacion.className = `toast ${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    // Animar entrada
    setTimeout(() => notificacion.classList.add('show'), 100);

    // Remover después del tiempo especificado
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => notificacion.remove(), 300);
    }, duracion);
}

// ===== ANIMACIONES DE LOADING =====
/**
 * Aplica la clase loading a un elemento para mostrar animación de carga
 * @method mostrarCargando
 * @param {HTMLElement} elemento - El elemento DOM al que se aplicará la clase loading
 * @return {void}
 */
function mostrarCargando(elemento) {
    elemento.classList.add('loading');
}

/**
 * Remueve la clase loading de un elemento para ocultar animación de carga
 * @method ocultarCargando
 * @param {HTMLElement} elemento - El elemento DOM del que se removerá la clase loading
 * @return {void}
 */
function ocultarCargando(elemento) {
    elemento.classList.remove('loading');
}

// ===== VALIDACIÓN CON ANIMACIONES =====
/**
 * Valida que un campo de formulario no esté vacío y muestra animación de error si es necesario
 * @method validarCampo
 * @param {HTMLInputElement} campo - El campo de entrada que se va a validar
 * @param {string} mensajeError - Mensaje de error que se mostrará si la validación falla
 * @return {boolean} True si el campo es válido, false si está vacío
 */
function validarCampo(campo, mensajeError = '') {
    if (!campo.value.trim()) {
        campo.classList.add('shake');
        if (mensajeError) mostrarNotificacion(mensajeError, 'error');
        setTimeout(() => campo.classList.remove('shake'), 500);
        return false;
    }
    return true;
}

/**
 * Maneja el enrutamiento de la aplicación basado en el hash de la URL
 * @method enrutar
 * @return {void}
 */
function enrutar() {
    const hash = location.hash || '#/explorar';
    const nombre = hash.split('/')[1];

    // Animar transición entre secciones
    $$('.section').forEach(seccion => {
        seccion.classList.remove('visible');
    });

    // Mostrar nueva sección con animación
    setTimeout(() => {
        if ($('#' + nombre)) {
            $('#' + nombre).classList.add('visible');
        }
    }, 150);

    // Actualizar navegación activa
    $$('.nav a').forEach(enlace => enlace.classList.remove('active'));
    const enlaceActivo = $$('.nav a').find(enlace => enlace.getAttribute('href') === hash);
    if (enlaceActivo) enlaceActivo.classList.add('active');

    // Renderizar contenido según la sección
    if (nombre === 'explorar') {
        setTimeout(() => renderizarLista(), 200);
    }
    if (nombre === 'leaderboard') {
        setTimeout(() => renderizarTablaClasificacion(), 200);
    }
}

/**
 * Renderiza la lista de retos en el grid de la interfaz
 * @method renderizarLista
 * @param {Array} retos - Array de objetos reto que se van a renderizar (por defecto usa estado.retos)
 * @return {void}
 */
function renderizarLista(retos = estado.retos) {
    const grid = $('#listaRetos');

    if (retos.length === 0) {
        grid.innerHTML = '<div class="empty">No se encontraron retos</div>';
        return;
    }

    grid.innerHTML = retos.map(reto => `
        <div class="card">
            <h3>${reto.title}</h3>
            <p class="small muted">${reto.desc}</p>
            <div class="row" style="margin: 8px 0;">
                ${reto.tags ? reto.tags.split(',').map(etiqueta =>
        `<span class="tag">${etiqueta.trim()}</span>`
    ).join('') : ''}
            </div>
            <div class="bar">
                <span class="small">Premio: USD ${reto.prize}</span>
                <a class="btn secondary" href="#/detalle/${reto.id}">Ver reto</a>
            </div>
        </div>
    `).join('');
}

/**
 * Renderiza la tabla de clasificación con los jugadores y sus puntos
 * @method renderizarTablaClasificacion
 * @return {void}
 */
function renderizarTablaClasificacion() {
    const arregloJugadores = Object.values(estado.jugadores);
    const contenedor = $('#tablaLeaderboard');

    if (arregloJugadores.length === 0) {
        contenedor.innerHTML = '<div class="empty">No hay jugadores aún</div>';
        return;
    }

    contenedor.innerHTML = arregloJugadores.map(jugador => `
        <div>${jugador.name} – ${jugador.points} puntos</div>
    `).join('');
}

// ===== SISTEMA DE BÚSQUEDA EN TIEMPO REAL =====
/**
 * Configura los event listeners para el sistema de búsqueda y filtrado en tiempo real
 * @method configurarBusqueda
 * @return {void}
 */
function configurarBusqueda() {
    const entradaBusqueda = $('#busqueda');
    const filtroCategoria = $('#filtroCat');

    /**
     * Filtra los retos basado en el término de búsqueda y la categoría seleccionada
     * @method filtrarRetos
     * @return {void}
     */
    function filtrarRetos() {
        const terminoBusqueda = entradaBusqueda.value.toLowerCase();
        const categoriaSeleccionada = filtroCategoria.value;

        let retosFiltrados = estado.retos.filter(reto => {
            const coincideBusqueda = !terminoBusqueda ||
                reto.title.toLowerCase().includes(terminoBusqueda) ||
                reto.desc.toLowerCase().includes(terminoBusqueda) ||
                (reto.tags && reto.tags.toLowerCase().includes(terminoBusqueda));

            const coincideCategoria = !categoriaSeleccionada || reto.cat === categoriaSeleccionada;

            return coincideBusqueda && coincideCategoria;
        });

        renderizarLista(retosFiltrados);
    }

    entradaBusqueda.addEventListener('input', filtrarRetos);
    filtroCategoria.addEventListener('change', filtrarRetos);
}

// ===== FORMULARIO CON VALIDACIÓN Y ANIMACIONES =====
/**
 * Configura los event listeners del formulario de creación de retos
 * @method configurarFormulario
 * @return {void}
 */
function configurarFormulario() {
    const formulario = $('form');
    const botonPublicar = $('#btnPublicar');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const campoTitulo = $('#titulo');
        const campoCategoria = $('#categoria');
        const campoDescripcion = $('#descripcion');
        const campoPremio = $('#premio');
        const campoDias = $('#dias');
        const campoTags = $('#tags');

        // Validar campos requeridos
        let esValido = true;

        if (!validarCampo(campoTitulo, 'El título es requerido')) esValido = false;
        if (!validarCampo(campoDescripcion, 'La descripción es requerida')) esValido = false;
        if (!validarCampo(campoPremio, 'El premio es requerido')) esValido = false;
        if (!validarCampo(campoDias, 'La duración es requerida')) esValido = false;

        if (!esValido) return;

        // Mostrar loading
        mostrarCargando(botonPublicar);
        botonPublicar.textContent = 'Publicando...';

        // Simular delay de publicación
        setTimeout(() => {
            const nuevoReto = {
                id: generarId(),
                title: campoTitulo.value,
                cat: campoCategoria.value,
                desc: campoDescripcion.value,
                prize: parseInt(campoPremio.value),
                days: parseInt(campoDias.value),
                tags: campoTags.value,
                status: 'activo'
            };

            estado.retos.unshift(nuevoReto); // Agregar al inicio

            // Limpiar formulario
            formulario.reset();

            // Ocultar loading
            ocultarCargando(botonPublicar);
            botonPublicar.textContent = 'Publicar reto';

            // Mostrar notificación y navegar
            mostrarNotificacion('¡Reto publicado exitosamente!', 'success');

            setTimeout(() => {
                location.hash = '#/explorar';
            }, 1000);

        }, 1500);
    });
}

// ===== INICIALIZACIÓN =====
/**
 * Inicializa la aplicación configurando todos los event listeners y mostrando mensaje de bienvenida
 * @method inicializar
 * @return {void}
 */
function inicializar() {
    // Configurar eventos
    configurarBusqueda();
    configurarFormulario();

    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        mostrarNotificacion('¡Bienvenido a STOAN! 🚀', 'success', 4000);
    }, 1000);
}

// Event listeners
window.addEventListener('hashchange', enrutar);

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', inicializar);
enrutar();