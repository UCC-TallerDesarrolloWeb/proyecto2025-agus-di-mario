const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const uid = () => Math.random().toString(36).slice(2, 9);

let state = { retos: [], subs: [], players: {} };

// Seed inicial
state.retos = [
    { id: uid(), title: 'Logo minimalista para app sustentable', cat: 'Diseño', desc: 'SVG + guía de color', prize: 200, status: 'activo', tags: 'logo, diseño, svg, sustentable' },
    { id: uid(), title: 'Plan TikTok para café de especialidad', cat: 'Marketing', desc: 'Calendario + hashtags', prize: 300, status: 'activo', tags: 'tiktok, marketing, café, redes sociales' },
    { id: uid(), title: 'App móvil para delivery local', cat: 'Programación', desc: 'React Native + backend', prize: 500, status: 'activo', tags: 'react, mobile, delivery, app' },
    { id: uid(), title: 'Investigación UX para fintech', cat: 'Investigación', desc: 'Entrevistas + análisis', prize: 400, status: 'activo', tags: 'ux, investigación, fintech, entrevistas' }
];

// ===== SISTEMA DE NOTIFICACIONES TOAST =====
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remover después del tiempo especificado
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== ANIMACIONES DE LOADING =====
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// ===== VALIDACIÓN CON ANIMACIONES =====
function validateField(field, errorMessage = '') {
    if (!field.value.trim()) {
        field.classList.add('shake');
        if (errorMessage) showToast(errorMessage, 'error');
        setTimeout(() => field.classList.remove('shake'), 500);
        return false;
    }
    return true;
}

function route() {
    const hash = location.hash || '#/explorar';
    const name = hash.split('/')[1];
    
    // Animar transición entre secciones
    $$('.section').forEach(s => {
        s.classList.remove('visible');
    });
    
    // Mostrar nueva sección con animación
    setTimeout(() => {
        if ($('#' + name)) {
            $('#' + name).classList.add('visible');
        }
    }, 150);
    
    // Actualizar navegación activa
    $$('.nav a').forEach(a => a.classList.remove('active'));
    const link = $$('.nav a').find(a => a.getAttribute('href') === hash);
    if (link) link.classList.add('active');
    
    // Renderizar contenido según la sección
    if (name === 'explorar') {
        setTimeout(() => renderLista(), 200);
    }
    if (name === 'leaderboard') {
        setTimeout(() => renderLeaderboard(), 200);
    }
}

function renderLista(retos = state.retos) {
    const grid = $('#listaRetos');
    
    if (retos.length === 0) {
        grid.innerHTML = '<div class="empty">No se encontraron retos</div>';
        return;
    }
    
    grid.innerHTML = retos.map(r => `
        <div class="card">
            <h3>${r.title}</h3>
            <p class="small muted">${r.desc}</p>
            <div class="row" style="margin: 8px 0;">
                ${r.tags ? r.tags.split(',').map(tag => 
                    `<span class="tag">${tag.trim()}</span>`
                ).join('') : ''}
            </div>
            <div class="bar">
                <span class="small">Premio: USD ${r.prize}</span>
                <a class="btn secondary" href="#/detalle/${r.id}">Ver reto</a>
            </div>
        </div>
    `).join('');
}

function renderLeaderboard() {
    const arr = Object.values(state.players);
    const container = $('#tablaLeaderboard');
    
    if (arr.length === 0) {
        container.innerHTML = '<div class="empty">No hay jugadores aún</div>';
        return;
    }
    
    container.innerHTML = arr.map(p => `
        <div>${p.name} – ${p.points} puntos</div>
    `).join('');
}

// ===== SISTEMA DE BÚSQUEDA EN TIEMPO REAL =====
function setupSearch() {
    const searchInput = $('#busqueda');
    const categoryFilter = $('#filtroCat');
    
    function filterRetos() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        
        let filteredRetos = state.retos.filter(reto => {
            const matchesSearch = !searchTerm || 
                reto.title.toLowerCase().includes(searchTerm) ||
                reto.desc.toLowerCase().includes(searchTerm) ||
                (reto.tags && reto.tags.toLowerCase().includes(searchTerm));
            
            const matchesCategory = !selectedCategory || reto.cat === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        renderLista(filteredRetos);
    }
    
    searchInput.addEventListener('input', filterRetos);
    categoryFilter.addEventListener('change', filterRetos);
}

// ===== FORMULARIO CON VALIDACIÓN Y ANIMACIONES =====
function setupForm() {
    const form = $('form');
    const btnPublicar = $('#btnPublicar');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titulo = $('#titulo');
        const categoria = $('#categoria');
        const descripcion = $('#descripcion');
        const premio = $('#premio');
        const dias = $('#dias');
        const tags = $('#tags');
        
        // Validar campos requeridos
        let isValid = true;
        
        if (!validateField(titulo, 'El título es requerido')) isValid = false;
        if (!validateField(descripcion, 'La descripción es requerida')) isValid = false;
        if (!validateField(premio, 'El premio es requerido')) isValid = false;
        if (!validateField(dias, 'La duración es requerida')) isValid = false;
        
        if (!isValid) return;
        
        // Mostrar loading
        showLoading(btnPublicar);
        btnPublicar.textContent = 'Publicando...';
        
        // Simular delay de publicación
        setTimeout(() => {
            const nuevoReto = {
                id: uid(),
                title: titulo.value,
                cat: categoria.value,
                desc: descripcion.value,
                prize: parseInt(premio.value),
                days: parseInt(dias.value),
                tags: tags.value,
                status: 'activo'
            };
            
            state.retos.unshift(nuevoReto); // Agregar al inicio
            
            // Limpiar formulario
            form.reset();
            
            // Ocultar loading
            hideLoading(btnPublicar);
            btnPublicar.textContent = 'Publicar reto';
            
            // Mostrar notificación y navegar
            showToast('¡Reto publicado exitosamente!', 'success');
            
            setTimeout(() => {
                location.hash = '#/explorar';
            }, 1000);
            
        }, 1500);
    });
}

// ===== INICIALIZACIÓN =====
function init() {
    // Configurar eventos
    setupSearch();
    setupForm();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showToast('¡Bienvenido a STOAN! 🚀', 'success', 4000);
    }, 1000);
}

// Event listeners
window.addEventListener('hashchange', route);

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', init);
route();