/**
 * Lee y parsea un valor JSON almacenado en localStorage.
 * @param {string} clave - Clave del ítem a leer.
 * @param {any} valorPorDefecto - Valor devuelto si la clave no existe o hay error.
 * @param {Storage} storage - Implementación de Storage (por defecto localStorage).
 * @returns {any} Valor parseado o valorPorDefecto.
 */
export function leerJSON(clave, valorPorDefecto, storage = window.localStorage) {
	try {
		const texto = storage.getItem(clave)
		return texto ? JSON.parse(texto) : valorPorDefecto
	} catch (error) {
		console.error(`Error al leer ${clave} desde localStorage`, error)
		return valorPorDefecto
	}
}

/**
 * Serializa y guarda un valor como JSON en localStorage.
 * @param {string} clave - Clave bajo la que almacenar el valor.
 * @param {any} valor - Valor a serializar y guardar.
 * @param {Storage} storage - Implementación de Storage (por defecto localStorage).
 * @returns {void}
 */
export function escribirJSON(clave, valor, storage = window.localStorage) {
	try {
		storage.setItem(clave, JSON.stringify(valor))
	} catch (error) {
		console.error(`Error al guardar ${clave} en localStorage`, error)
	}
}