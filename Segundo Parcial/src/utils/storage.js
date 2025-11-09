/**
 * Lee y parsea un valor JSON del storage indicado.
 * @template T
 * @param {string} clave - Identificador del registro.
 * @param {T} valorPorDefecto - Valor devuelto si no existe información.
 * @param {Storage} [storage=localStorage] - Mecanismo de almacenamiento a consultar.
 * @returns {T} Contenido almacenado o el valor por defecto.
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
 * Serializa un objeto y lo guarda en el storage indicado.
 * @param {string} clave - Identificador a sobrescribir.
 * @param {unknown} valor - Información a persistir.
 * @param {Storage} [storage=localStorage] - Mecanismo de almacenamiento a utilizar.
 * @returns {void}
 */
export function escribirJSON(clave, valor, storage = window.localStorage) {
  try {
    storage.setItem(clave, JSON.stringify(valor))
  } catch (error) {
    console.error(`Error al guardar ${clave} en localStorage`, error)
  }
}
