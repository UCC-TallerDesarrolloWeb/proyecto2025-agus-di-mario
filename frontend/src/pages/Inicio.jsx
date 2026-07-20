import {useEffect, useState} from 'react'
import {useOutletContext} from 'react-router-dom'
import TarjetaAlbum from '@components/TarjetaAlbum'
import {agregarAColeccion, obtenerAlbumes, obtenerColeccion, quitarDeColeccion,} from '@api/albumes'

/**
 * Página de inicio: muestra el catálogo completo y permite agregar o
 * quitar álbumes de la colección del usuario.
 * @returns {JSX.Element}
 */
function Inicio() {
	const {limpiadoEn, actualizarConteoColeccion} = useOutletContext()
	const [albumes, setAlbumes] = useState([])
	const [coleccion, setColeccion] = useState([])

	useEffect(() => {
		obtenerAlbumes().then(setAlbumes)
	}, [])

	useEffect(() => {
		obtenerColeccion().then(data => {
			setColeccion(data)
			actualizarConteoColeccion?.(data.length)
		})
	}, [limpiadoEn, actualizarConteoColeccion])

	const conjuntoColeccion = new Set(coleccion.map(item => item.id))

	/**
	 * Alterna un álbum entre agregado y quitado de la colección.
	 * @param {Object} album - Álbum a alternar.
	 */
	async function setColeccionado(album) {
		const actualizada = conjuntoColeccion.has(album.id)
			? await quitarDeColeccion(album.id)
			: await agregarAColeccion(album)
		setColeccion(actualizada)
		actualizarConteoColeccion?.(actualizada.length)
	}

	return (
		<main>
			<section id="catalogo">
				<h2>Álbumes disponibles</h2>
				<div className="lista-albumes" id="lista-albumes">
					{albumes.map(album => (
						<TarjetaAlbum
							key={album.id}
							album={album}
							variante="catalogo"
							esFavorito={conjuntoColeccion.has(album.id)}
							onColeccionar={setColeccionado}
						/>
					))}
				</div>
			</section>
		</main>
	)
}

export default Inicio
