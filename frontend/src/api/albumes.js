const BASE_URL = 'http://localhost:3001'

/**
 * Obtiene el catálogo completo de álbumes desde el servidor.
 * @returns {Promise<Array>} Lista de álbumes.
 */
export const obtenerAlbumes = async () => {
	const r = await fetch(`${BASE_URL}/albumes`)
	return r.json()
}

/**
 * Obtiene la colección del usuario desde el servidor.
 * @returns {Promise<Array>} Lista de álbumes en la colección.
 */
export const obtenerColeccion = async () => {
	const r = await fetch(`${BASE_URL}/coleccion`)
	return r.json()
}

/**
 * Agrega un álbum a la colección si no existe ya.
 * @param {Object} album - Álbum a agregar.
 * @returns {Promise<Array>} Colección actualizada.
 */
export const agregarAColeccion = async (album) => {
	const actual = await obtenerColeccion()
	if (!actual.some(i => i.id === album.id)) {
		await fetch(`${BASE_URL}/coleccion`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({...album, resena: null}),
		})
	}
	return obtenerColeccion()
}

/**
 * Quita un álbum de la colección.
 * @param {number} albumId - ID del álbum a eliminar.
 * @returns {Promise<Array>} Colección resultante.
 */
export const quitarDeColeccion = async (albumId) => {
	await fetch(`${BASE_URL}/coleccion/${albumId}`, {method: 'DELETE'})
	return obtenerColeccion()
}

/**
 * Guarda o actualiza la reseña de un álbum en la colección.
 * @param {number} albumId - Álbum objetivo.
 * @param {{texto: string, puntaje: number}} resena - Datos de la reseña.
 * @returns {Promise<Object|null>} Registro actualizado o null si falla.
 */
export const guardarResena = async (albumId, resena) => {
	const r = await fetch(`${BASE_URL}/coleccion/${albumId}`, {
		method: 'PATCH',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({resena}),
	})
	if (!r.ok) return null
	return r.json()
}

/**
 * Recupera la reseña guardada de un álbum.
 * @param {number} albumId - Álbum objetivo.
 * @returns {Promise<Object|null>} Reseña o null si no existe.
 */
export const obtenerResena = async (albumId) => {
	const r = await fetch(`${BASE_URL}/coleccion/${albumId}`)
	if (!r.ok) return null
	const item = await r.json()
	return item?.resena ?? null
}

/**
 * Elimina todos los ítems de la colección del servidor.
 * @returns {Promise<void>}
 */
export const limpiarDatos = async () => {
	const coleccion = await obtenerColeccion()
	await Promise.all(
		coleccion.map(i => fetch(`${BASE_URL}/coleccion/${i.id}`, {method: 'DELETE'}))
	)
}
