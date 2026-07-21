const BASE_URL = 'http://localhost:3001'

/**
 * Obtiene el catálogo completo de álbumes.
 * @returns {Promise<Array>} Lista de álbumes.
 */
export const obtenerAlbumes = async () => {
	const respuesta = await fetch(`${BASE_URL}/albumes`)
	if (!respuesta.ok) throw new Error('No se pudo obtener el catálogo de álbumes')
	return respuesta.json()
}

/**
 * Obtiene la colección del usuario desde el servidor.
 * @returns {Promise<Array>} Lista de álbumes en la colección.
 */
export const obtenerColeccion = async () => {
	const respuesta = await fetch(`${BASE_URL}/coleccion`)
	if (!respuesta.ok) throw new Error('No se pudo obtener la colección')
	return respuesta.json()
}

/**
 * Agrega un álbum a la colección si no existe ya.
 * Guarda el ID original del álbum en `albumId` porque json-server v1
 * sobreescribe el campo `id` con un UUID autogenerado.
 * @param {Object} album - Álbum a agregar.
 * @returns {Promise<Array>} Colección actualizada.
 */
export const agregarAColeccion = async (album) => {
	const actual = await obtenerColeccion()
	if (!actual.some(i => i.albumId === album.id)) { //agrega el album a la coleccion solo si no está ya en la coleccion
		const respuesta = await fetch(`${BASE_URL}/coleccion`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({albumId: album.id, nombre: album.nombre, artista: album.artista, imagen: album.imagen, resena: null}),
		})
		if (!respuesta.ok) throw new Error('No se pudo agregar a la colección')
	}
	return obtenerColeccion()
}

/**
 * Quita un álbum de la colección buscándolo por su albumId original.
 * @param {string} albumId - ID original del álbum a eliminar.
 * @returns {Promise<Array>} Colección resultante.
 */
export const quitarDeColeccion = async (albumId) => {
	const actual = await obtenerColeccion()
	const item = actual.find(i => i.albumId === albumId)
	if (!item) return obtenerColeccion()
	const respuesta = await fetch(`${BASE_URL}/coleccion/${item.id}`, {
		method: 'DELETE'
	})
	if (!respuesta.ok) throw new Error('No se pudo quitar de la colección')
	return obtenerColeccion()
}

/**
 * Guarda o actualiza la reseña de un álbum en la colección.
 * @param {string} albumId - ID original del álbum objetivo.
 * @param {{texto: string, puntaje: number}} resena - Datos de la reseña.
 * @returns {Promise<Object|null>} Registro actualizado o null si falla.
 */
export const guardarResena = async (albumId, resena) => {
	const actual = await obtenerColeccion()
	const item = actual.find(i => i.albumId === albumId)
	if (!item) return null
	const respuesta = await fetch(`${BASE_URL}/coleccion/${item.id}`, {
		method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({resena}),
	})
	if (!respuesta.ok) return null
	return respuesta.json()
}

/**
 * Recupera la reseña guardada de un álbum.
 * @param {string} albumId - ID original del álbum objetivo.
 * @returns {Promise<Object|null>} Reseña o null si no existe.
 */
export const obtenerResena = async (albumId) => {
	const actual = await obtenerColeccion()
	const item = actual.find(i => i.albumId === albumId)
	if (!item) return null
	return item?.resena ?? null
}

/**
 * Elimina todos los ítems de la colección del servidor.
 * @returns {Promise<void>}
 */
export const limpiarDatos = async () => {
	const coleccion = await obtenerColeccion()
	const respuestas = await Promise.all(coleccion.map(i => fetch(`${BASE_URL}/coleccion/${i.id}`, {method: 'DELETE'})))
	if (respuestas.some(r => !r.ok)) {
		throw new Error('No se pudieron limpiar todos los datos de la colección')
	}
}

