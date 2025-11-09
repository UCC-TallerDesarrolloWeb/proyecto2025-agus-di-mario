import catalogoCrudo from './albumes.json'

const PLACEHOLDER = 'https://via.placeholder.com/600x600?text=Sin+imagen'
const CLAVE_BASE_ASSETS = '../assets/albums/'
const imagenesDisponibles = import.meta.glob('../assets/albums/*', {
  eager: true,
  import: 'default',
})

/**
 * Construye la URL pública hacia la carátula solicitada.
 * @param {string} nombreArchivo - Nombre del archivo dentro de public/albums.
 * @returns {string} Ruta lista para usarse en un <img>.
 */
function resolverImagen(nombreArchivo) {
  if (!nombreArchivo) {
    console.warn('No se proporcionó un nombre de archivo para la carátula.')
    return PLACEHOLDER
  }
  const clave = `${CLAVE_BASE_ASSETS}${nombreArchivo}`
  const recurso = imagenesDisponibles[clave]
  if (!recurso) {
    console.warn(`No se encontró la imagen ${nombreArchivo} en src/assets.`)
    return PLACEHOLDER
  }
  return recurso
}

/**
 * Catálogo completo de álbumes disponibles en la aplicación.
 * @type {Array<{id:number,nombre:string,artista:string,imagen:string}>}
 */
const catalogoBase = Array.isArray(catalogoCrudo) ? catalogoCrudo : []

export const albumes = catalogoBase.map(album => ({
  ...album,
  imagen: resolverImagen(album.imagen),
}))
