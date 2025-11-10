import { useEffect, useState } from 'react'
import Encabezado from '@components/Encabezado'
import Pie from '@components/Pie'
import TarjetaAlbum from '@components/TarjetaAlbum'
import {
	agregarAColeccion,
	limpiarDatos,
	obtenerAlbumes,
	obtenerColeccion,
	quitarDeColeccion,
} from '@api/albumes'

function Inicio() {
	const [albumes, setAlbumes] = useState([])
	const [coleccion, setColeccion] = useState([])

	useEffect(() => {
		let montado = true
			; (async () => {
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
		setColeccion(obtenerColeccion())
	}, [])

	const conjuntoColeccion = new Set(coleccion.map(item => item.id))

	function setColeccionado(album) {
		const actualizada = conjuntoColeccion.has(album.id)
			? quitarDeColeccion(album.id)
			: agregarAColeccion(album)
		setColeccion(actualizada)
	}

	/**
	 * Limpia los datos persistidos.
	 * @returns {void}
	 */
	function manejarLimpiar() {
		limpiarDatos()
		setColeccion([])
		alert('Datos limpiados correctamente.')
	}

	return (
		<>
			<Encabezado onLimpiar={manejarLimpiar} />
			<main>
				<section id="catalogo">
					<h2>Álbumes disponibles</h2>
					<div className="lista-albumes"
						id="lista-albumes">
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
			<Pie />
		</>
	)
}

export default Inicio