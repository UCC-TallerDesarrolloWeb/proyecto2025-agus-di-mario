import { useEffect, useState } from 'react'
import { guardarResena, obtenerResena } from '@api/albumes'

function SeccionResena({ album }) {
	const [texto, setTexto] = useState('')
	const [puntaje, setPuntaje] = useState('')
	const opcionesPuntaje = Array.from({ length: 10 }, (_, indice) => String(indice + 1))

	useEffect(() => {
		const almacenada = obtenerResena(album.id)
		if (almacenada) {
			setTexto(almacenada.texto || '')
			setPuntaje(String(almacenada.puntaje || ''))
		} else {
			setTexto('')
			setPuntaje('')
		}
	}, [album])

	function guardar() {
		const textoLimpio = (texto || '').trim()
		const puntajeNumero = Number(puntaje) || 1
		guardarResena(album.id, { texto: textoLimpio, puntaje: puntajeNumero })
		alert('Reseña guardada')
	}

	return (
		<div className="seccion-resena">
			<div className="entradas-resena">
				<textarea
					className="texto-resena"
					placeholder="Escribe tu reseña..."
					value={texto}
					onChange={(e) => setTexto(e.target.value)}
				/>
				<select
					className="entrada-puntaje"
					value={puntaje}
					onChange={(e) => setPuntaje(e.target.value)}
				>
					<option value="">Puntaje (1-10)</option>
					{opcionesPuntaje.map((valor) => (
						<option key={valor} value={valor}>{valor}</option>
					))}
				</select>
				<button type="button" className="boton-accion" onClick={guardar}>Guardar</button>
			</div>
		</div>
	)
}

export default SeccionResena
