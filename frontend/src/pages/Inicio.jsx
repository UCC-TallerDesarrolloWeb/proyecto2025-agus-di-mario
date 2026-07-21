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
	const {limpiadoEn, actualizarConteo} = useOutletContext()
	const [albumes, setAlbumes] = useState([])
	const [coleccion, setColeccion] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		async function cargarCatalogo() {
			try {
				setAlbumes(await obtenerAlbumes())
			} catch {
				setError('No se pudo cargar el catálogo. Verificá que el servidor esté disponible e intentá de nuevo.')
			}
		}
		cargarCatalogo()
	}, [])

	useEffect(() => {
		async function cargarColeccion() {
			try {
				const datos = await obtenerColeccion()
				setColeccion(datos)
				actualizarConteo(datos.length)
			} catch {
				setError('No se pudo cargar tu colección. Verificá que el servidor esté disponible e intentá de nuevo.')
			}
		}
		cargarColeccion()
	}, [limpiadoEn, actualizarConteo])

	const conjuntoColeccion = new Set(coleccion.map(item => item.albumId))

	/**
	 * Alterna un álbum entre agregado y quitado de la colección.
	 * @param {Object} album - Álbum a alternar.
	 */
	async function setColeccionado(album) {
		try {
			const actualizada = conjuntoColeccion.has(album.id)
				? await quitarDeColeccion(album.id)
				: await agregarAColeccion(album)
			setColeccion(actualizada)
			actualizarConteo(actualizada.length)
			setError('')
		} catch {
			setError('No se pudo actualizar tu colección. Intentá de nuevo.')
		}
	}

	return (
		<main>
			<section id="catalogo">
				<h2>Álbumes disponibles</h2>
				{error && (
					<p role="alert" className="mensaje-error">{error}</p>
				)}
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
