import {useEffect, useState} from 'react'
import TarjetaAlbum from '@components/TarjetaAlbum'
import SeccionResena from '@components/SeccionResena'
import {obtenerColeccion} from '@api/albumes'

function Coleccion() {
	const [elementos, setElementos] = useState([])

	useEffect(() => {
		let montado = true
		;(async () => {
			const datos = await obtenerColeccion()
			if (montado) setElementos(datos)
		})()
		return () => {
			montado = false
		}
	}, [])

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
							<TarjetaAlbum key={album.id} album={album} variante="coleccion">
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
