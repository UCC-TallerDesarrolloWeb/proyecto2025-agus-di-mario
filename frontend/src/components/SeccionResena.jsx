import { useEffect, useState } from 'react'
import { guardarResena, obtenerResena } from '@api/albumes'

function SeccionResena({ album }) {
	const [texto, setTexto] = useState('')
	const [puntaje, setPuntaje] = useState('')
	const [resenaGuardada, setResenaGuardada] = useState(null)
	const [estaEditando, setEstaEditando] = useState(true)
	const opcionesPuntaje = Array.from({ length: 10 }, (_, indice) => String(indice + 1))

	useEffect(() => {
		const almacenada = obtenerResena(album.id)
		if (almacenada) {
			setResenaGuardada(almacenada)
			setTexto(almacenada.texto || '')
			setPuntaje(String(almacenada.puntaje || ''))
			setEstaEditando(false)
		} else {
			setResenaGuardada(null)
			setTexto('')
			setPuntaje('')
			setEstaEditando(true)
		}
	}, [album])

	function guardar() {
		const textoLimpio = (texto || '').trim()
		if (!textoLimpio || !puntaje) {
			alert('Completá la reseña y elegí un puntaje.')
			return
		}
		const puntajeNumero = Number(puntaje) || 1
		guardarResena(album.id, { texto: textoLimpio, puntaje: puntajeNumero })
		setResenaGuardada({ texto: textoLimpio, puntaje: puntajeNumero })
		setEstaEditando(false)
		alert('Reseña guardada')
	}

	function editar() {
		if (!resenaGuardada) return
		setTexto(resenaGuardada.texto || '')
		setPuntaje(String(resenaGuardada.puntaje || ''))
		setEstaEditando(true)
	}

	return (
		<div className="seccion-resena">
			{estaEditando ? (
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
			) : (
				<div className="resena-guardada">
					<p className="texto-resena-guardado">{`"${resenaGuardada?.texto}"`}</p>
					<p className="puntaje-resena-guardado">{`Puntaje: ${resenaGuardada?.puntaje}/10`}</p>
					<button type="button" className="boton-accion" onClick={editar}>Editar</button>
				</div>
			)}
		</div>
	)
}

export default SeccionResena
