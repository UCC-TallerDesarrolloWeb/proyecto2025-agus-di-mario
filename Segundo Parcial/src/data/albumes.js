import catalogoJSON from './albumes.json'

const imagenes = import.meta.glob('../assets/albums/*', {eager: true, import: 'default'})

/**
 * Catálogo con rutas de imagen resueltas por Vite.
 * @type {Array<{id:number,nombre:string,artista:string,imagen:string}>}
 */
export const albumes = catalogoJSON.map(album => {
    const ruta = `../assets/albums/${album.imagen}`
    return {
        ...album,
        imagen: imagenes[ruta] ?? album.imagen,
    }
})
