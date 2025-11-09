import {useEffect, useMemo, useState} from 'react'
import Encabezado from '@components/Encabezado'
import Pie from '@components/Pie'
import TarjetaAlbum from '@components/TarjetaAlbum'
import {
    agregarAColeccion,
    guardarFiltros,
    limpiarDatos,
    obtenerAlbumes,
    obtenerColeccion,
    obtenerFiltros,
    quitarDeColeccion,
} from '@api/albumes'
import './Inicio.scss'

/**
 * Página principal con el catálogo y controles de filtrado/búsqueda.
 * @returns {JSX.Element} Vista del catálogo.
 */
function Inicio() {
    const [albumes, setAlbumes] = useState([])
    const [coleccion, setColeccion] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [filtroArtista, setFiltroArtista] = useState('')

    useEffect(() => {
        let montado = true
        ;(async () => {
            const datos = await obtenerAlbumes()
            if (montado) {
                setAlbumes(datos)
            }
        })()
        return () => {
            montado = false
        }
    }, [])

    useEffect(() => {
        const filtrosGuardados = obtenerFiltros()
        if (filtrosGuardados) {
            if (typeof filtrosGuardados.busqueda === 'string') setBusqueda(filtrosGuardados.busqueda)
            if (typeof filtrosGuardados.artista === 'string') setFiltroArtista(filtrosGuardados.artista)
        }
        setColeccion(obtenerColeccion())
    }, [])

    useEffect(() => {
        guardarFiltros({busqueda, artista: filtroArtista})
    }, [busqueda, filtroArtista])

    const artistasDisponibles = useMemo(() => {
        const conjunto = new Set(albumes.map(album => album.artista).filter(Boolean))
        return Array.from(conjunto).sort((a, b) => a.localeCompare(b))
    }, [albumes])

    const conjuntoColeccion = useMemo(() => new Set(coleccion.map(item => item.id)), [coleccion])

    const albumesFiltrados = useMemo(() => {
        const termino = busqueda.trim().toLowerCase()
        return albumes.filter(album => {
            const coincideBusqueda =
                !termino ||
                album.nombre.toLowerCase().includes(termino) ||
                album.artista.toLowerCase().includes(termino)
            const coincideArtista = !filtroArtista || album.artista === filtroArtista
            return coincideBusqueda && coincideArtista
        })
    }, [albumes, busqueda, filtroArtista])

    /**
     * Agrega o quita un álbum de la colección del usuario.
     * @param {{id:number,nombre:string}} album - Álbum objetivo.
     * @returns {void}
     */
    function manejarAlternarFavorito(album) {
        const actualizada = conjuntoColeccion.has(album.id)
            ? quitarDeColeccion(album.id)
            : agregarAColeccion(album)
        setColeccion(actualizada)
    }

    /**
     * Limpia filtros y datos persistidos.
     * @returns {void}
     */
    function manejarLimpiar() {
        limpiarDatos()
        setColeccion([])
        setBusqueda('')
        setFiltroArtista('')
        alert('Datos limpiados correctamente.')
    }

    return (
        <>
            <Encabezado
                alBuscar={setBusqueda}
                alLimpiar={manejarLimpiar}
                alCambiarFiltro={setFiltroArtista}
                artistas={artistasDisponibles}
                valorBusqueda={busqueda}
                valorArtista={filtroArtista}
            />
            <main>
                <section id="catalogo">
                    <h2>Álbumes disponibles</h2>
                    <div className="lista-albumes" id="lista-albumes">
                        {albumesFiltrados.map(album => (
                            <TarjetaAlbum
                                key={album.id}
                                album={album}
                                variante="catalogo"
                                esFavorito={conjuntoColeccion.has(album.id)}
                                alAlternarFavorito={manejarAlternarFavorito}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Pie/>
        </>
    )
}

export default Inicio
