import {useEffect, useState} from 'react'
import TarjetaAlbum from '@components/TarjetaAlbum'
import SeccionResena from '@components/SeccionResena'
import {obtenerColeccion, quitarDeColeccion} from '@api/albumes'

/**
 * Página Mi Colección: lista los álbumes guardados y permite
 * escribir o editar reseñas.
 * @returns {JSX.Element}
 */
function Coleccion() {
	const [elementos, setElementos] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		async function cargarColeccion() {
			try {
				setElementos(await obtenerColeccion())
			} catch {
				setError('No se pudo cargar tu colección. Verificá que el servidor esté disponible e intentá de nuevo.')
			}
		}
		cargarColeccion()
	}, [])

	/**
	 * Quita un álbum de la colección y actualiza la lista.
	 * @param {Object} album - Álbum a quitar.
	 * @returns {Promise<void>}
	 */
	const manejarQuitar = async (album) => {
		try {
			const actualizada = await quitarDeColeccion(album.id)
			setElementos(actualizada)
			setError('')
		} catch {
			setError('No se pudo quitar el álbum de tu colección. Intentá de nuevo.')
		}
	}

	return (
		<main>
			<section id="coleccion">
				<h2>
					Mi colección (<span id="contador">{elementos.length}</span>)
				</h2>
				{error && (
					<p role="alert" className="mensaje-error">{error}</p>
				)}
				{elementos.length === 0 ? (
					<p className="coleccion-vacia">Todavía no agregaste álbumes a tu colección.</p>
				) : (
					<div className="lista-coleccion" id="lista-coleccion">
						{elementos.map(album => (
							<TarjetaAlbum key={album.id} album={album} variante="coleccion"
								onColeccionar={manejarQuitar}>
								<SeccionResena album={album}/>
							</TarjetaAlbum>
						))}
					</div>
				)}
			</section>
		</main>
	)
}

export default Coleccion
