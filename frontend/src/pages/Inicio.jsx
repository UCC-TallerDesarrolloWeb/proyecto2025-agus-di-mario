import {useEffect, useState} from 'react'
import {useOutletContext} from 'react-router-dom'
import TarjetaAlbum from '@components/TarjetaAlbum'
import {agregarAColeccion, obtenerAlbumes, obtenerColeccion, quitarDeColeccion,} from '@api/albumes'

function Inicio() {
	const [albumes, setAlbumes] = useState([])
	const [coleccion, setColeccion] = useState([])
	const {limpiadoEn} = useOutletContext()

	useEffect(() => {
		let montado = true
		;(async () => {
			const datos = await obtenerAlbumes()
			if (montado) setAlbumes(datos)
		})()
		return () => {
			montado = false
		}
	}, [])

	useEffect(() => {
		let montado = true
		;(async () => {
			const datos = await obtenerColeccion()
			if (montado) setColeccion(datos)
		})()
		return () => {
			montado = false
		}
	}, [limpiadoEn])

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
