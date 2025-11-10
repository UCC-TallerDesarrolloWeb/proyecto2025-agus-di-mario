export function leerJSON(clave, valorPorDefecto, storage = window.localStorage) {
	try {
		const texto = storage.getItem(clave)
		return texto ? JSON.parse(texto) : valorPorDefecto
	} catch (error) {
		console.error(`Error al leer ${clave} desde localStorage`, error)
		return valorPorDefecto
	}
}

export function escribirJSON(clave, valor, storage = window.localStorage) {
	try {
		storage.setItem(clave, JSON.stringify(valor))
	} catch (error) {
		console.error(`Error al guardar ${clave} en localStorage`, error)
	}
}