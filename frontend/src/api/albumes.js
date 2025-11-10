import catalogoJSON from '@data/albumes.json'
import {escribirJSON, leerJSON} from '@utils/storage'

function normalizarImagen(imagen) {
    if (!imagen || /^(https?:|data:)/.test(imagen)) {
        return imagen ?? ''
    }
    let ruta = imagen.replace(/^\/+/, '')
    ruta = ruta.replace(/^public\/+/, '')
    ruta = ruta.replace(/\/+/g, '/')
    ruta = ruta.replace(/^(albums\/)+/, '')
    return ruta ? `/albums/${ruta}` : '/albums'
}

function normalizarAlbum(album) {
    if (!album) return album
    return {...album, imagen: normalizarImagen(album.imagen)}
}

const catalogo = catalogoJSON.map(normalizarAlbum)

const CLAVES_STORAGE = {
    coleccion: 'miColeccion',
    filtros: 'filtros',
}


export async function obtenerAlbumes() {
    return catalogo
}

/**
 * Obtiene la colección del usuario desde localStorage.
 */
export function obtenerColeccion() {
    return leerJSON(CLAVES_STORAGE.coleccion, []).map((item) => ({
        ...normalizarAlbum(item),
        resena: item?.resena ?? null,
    }))
}


export function agregarAColeccion(album) {
    const coleccionActual = obtenerColeccion()
    const existe = coleccionActual.some(item => item.id === album.id)
    if (!existe) {
        const preparado = normalizarAlbum(album)
        coleccionActual.push({...preparado, resena: null})
        escribirJSON(CLAVES_STORAGE.coleccion, coleccionActual)
    }
    return coleccionActual
}

/**
 * Quita un álbum específico de la colección.
 * @param {number} albumId - Identificador del álbum a eliminar.
 * @returns {Array} Colección resultante.
 */
export function quitarDeColeccion(albumId) {
    const coleccionActual = obtenerColeccion()
    const filtrada = coleccionActual.filter(item => item.id !== albumId)
    escribirJSON(CLAVES_STORAGE.coleccion, filtrada)
    return filtrada
}

/**
 * Guarda una reseña asociada a un álbum de la colección.
 * @param {number} albumId - Álbum objetivo.
 * @param {{texto:string,puntaje:number}} resena - Datos de la reseña.
 * @returns {{id:number,resena:{texto:string,puntaje:number}}|null} Registro actualizado o null si no existe.
 */
export function guardarResena(albumId, resena) {
    const coleccionActual = obtenerColeccion()
    const posicion = coleccionActual.findIndex(item => item.id === albumId)
    if (posicion === -1) {
        return null
    }
    coleccionActual[posicion] = {...coleccionActual[posicion], resena}
    escribirJSON(CLAVES_STORAGE.coleccion, coleccionActual)
    return {id: albumId, resena: coleccionActual[posicion].resena}
}

/**
 * Recupera la reseña guardada para un álbum.
 * @param {number} albumId - Álbum objetivo.
 * @returns {{texto:string,puntaje:number}|null} Datos guardados o null si no existe.
 */
export function obtenerResena(albumId) {
    const coleccionActual = obtenerColeccion()
    const registro = coleccionActual.find(item => item.id === albumId)
    return registro?.resena ?? null
}

/**
 * Devuelve los filtros persistidos en localStorage.
 * @returns {{busqueda:string,artista:string}|null} Valores guardados o null.
 */
export function obtenerFiltros() {
    return leerJSON(CLAVES_STORAGE.filtros, null)
}

/**
 * Persiste los filtros activos.
 * @param {{busqueda:string,artista:string}} filtros - Valores de búsqueda actuales.
 * @returns {void}
 */
export function guardarFiltros(filtros) {
    if (!filtros.busqueda && !filtros.artista) {
        localStorage.removeItem(CLAVES_STORAGE.filtros)
        return
    }
    escribirJSON(CLAVES_STORAGE.filtros, filtros)
}

/**
 * Limpia cualquier dato generado por la aplicación en localStorage.
 * @returns {void}
 */
export function limpiarDatos() {
    localStorage.removeItem(CLAVES_STORAGE.coleccion)
    localStorage.removeItem(CLAVES_STORAGE.filtros)
}
