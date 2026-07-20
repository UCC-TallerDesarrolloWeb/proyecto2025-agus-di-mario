import {useEffect, useState} from 'react'
import {useOutletContext} from 'react-router-dom'
import TarjetaAlbum from '@components/TarjetaAlbum'
import SeccionResena from '@components/SeccionResena'
import {obtenerColeccion, quitarDeColeccion} from '@api/albumes'

/**
 * Página Mi Colección: lista los álbumes guardados y permite
 * escribir o editar reseñas.
 * @returns {JSX.Element}
 */
function Coleccion() {
	const {actualizarConteoColeccion} = useOutletContext()
	const [elementos, setElementos] = useState([])

	useEffect(() => {
		obtenerColeccion().then(data => {
			setElementos(data)
			actualizarConteoColeccion?.(data.length)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps -- solo debe ejecutarse al montar
	}, [])

	/**
	 * Quita un álbum de la colección y actualiza la lista.
	 * @param {Object} album - Álbum a quitar.
	 * @returns {Promise<void>}
	 */
	const manejarQuitar = async (album) => {
		const actualizada = await quitarDeColeccion(album.id)
		setElementos(actualizada)
		actualizarConteoColeccion?.(actualizada.length)
	}

	return (
		<main>
			<section id="coleccion">
				<h2>
					Mi colección (<span id="contador">{elementos.length}</span>)
				</h2>
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
