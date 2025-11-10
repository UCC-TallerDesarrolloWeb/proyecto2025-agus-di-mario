import catalogoJSON from '@data/albumes.json'
import { escribirJSON, leerJSON } from '@utils/storage'

const catalogo = catalogoJSON

const CLAVES_STORAGE = {
	coleccion: 'miColeccion',
}


export const obtenerAlbumes = async () => catalogo

/**
 * Obtiene la colección del usuario desde localStorage.
 */
export const obtenerColeccion = () => leerJSON(CLAVES_STORAGE.coleccion, []).map((item) => ({
	...item,
	resena: item?.resena ?? null,
}))


export const agregarAColeccion = (album) => {
	const coleccionActual = obtenerColeccion()
	const existe = coleccionActual.some(item => item.id === album.id)
	if (!existe) {
		const preparado = { ...album }
		coleccionActual.push({ ...preparado, resena: null })
		escribirJSON(CLAVES_STORAGE.coleccion, coleccionActual)
	}
	return coleccionActual
}

/**
 * Quita un álbum específico de la colección.
 * @param {number} albumId - Identificador del álbum a eliminar.
 * @returns {Array} Colección resultante.
 */
export const quitarDeColeccion = (albumId) => {
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
export const guardarResena = (albumId, resena) => {
	const coleccionActual = obtenerColeccion()
	const posicion = coleccionActual.findIndex(item => item.id === albumId)
	if (posicion === -1) {
		return null
	}
	coleccionActual[posicion] = { ...coleccionActual[posicion], resena }
	escribirJSON(CLAVES_STORAGE.coleccion, coleccionActual)
	return { id: albumId, resena: coleccionActual[posicion].resena }
}

/**
 * Recupera la reseña guardada para un álbum.
 * @param {number} albumId - Álbum objetivo.
 * @returns {*|null} Datos guardados o null si no existe.
 */
export const obtenerResena = (albumId) => {
	const coleccionActual = obtenerColeccion()
	const registro = coleccionActual.find(item => item.id === albumId)
	return registro?.resena ?? null
}

/**
 * Limpia cualquier dato generado por la aplicación en localStorage.
 * @returns {void}
 */
export const limpiarDatos = () => {
	localStorage.removeItem(CLAVES_STORAGE.coleccion)
}
