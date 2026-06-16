import {useEffect, useState} from 'react'
import {guardarResena, obtenerResena} from '@api/albumes'

function SeccionResena({ album }) {
	const [texto, setTexto] = useState('')
	const [puntaje, setPuntaje] = useState('')
	const [resenaGuardada, setResenaGuardada] = useState(null)
	const [estaEditando, setEstaEditando] = useState(true)
	const [mensajeError, setMensajeError] = useState('')
	const [mensajeExito, setMensajeExito] = useState('')
	const opcionesPuntaje = Array.from({ length: 10 }, (_, indice) => String(indice + 1))
	const idTexto = `resena-texto-${album.id}`
	const idPuntaje = `resena-puntaje-${album.id}`

	useEffect(() => {
		;(async () => {
			const almacenada = await obtenerResena(album.id)
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
		})()
	}, [album])

	async function guardar() {
		const textoLimpio = (texto || '').trim()
		if (!textoLimpio || !puntaje) {
			setMensajeError('Completá la reseña y elegí un puntaje.')
			setMensajeExito('')
			return
		}
		setMensajeError('')
		const puntajeNumero = Number(puntaje) || 1
		await guardarResena(album.id, {texto: textoLimpio, puntaje: puntajeNumero})
		setResenaGuardada({ texto: textoLimpio, puntaje: puntajeNumero })
		setEstaEditando(false)
		setMensajeExito('Reseña guardada.')
	}

	function editar() {
		if (!resenaGuardada) return
		setTexto(resenaGuardada.texto || '')
		setPuntaje(String(resenaGuardada.puntaje || ''))
		setEstaEditando(true)
		setMensajeError('')
		setMensajeExito('')
	}

	return (
		<div className="seccion-resena">
			{estaEditando ? (
				<div className="entradas-resena">
					<label htmlFor={idTexto} className="resena-label">Reseña</label>
					<textarea
						id={idTexto}
						className="texto-resena"
						placeholder="Escribe tu reseña..."
						value={texto}
						onChange={(e) => {
							setTexto(e.target.value);
							setMensajeError('')
						}}
					/>
					<label htmlFor={idPuntaje} className="resena-label">Puntaje</label>
					<select
						id={idPuntaje}
						className="entrada-puntaje"
						value={puntaje}
						onChange={(e) => {
							setPuntaje(e.target.value);
							setMensajeError('')
						}}
					>
						<option value="">Puntaje (1-10)</option>
						{opcionesPuntaje.map((valor) => (
							<option key={valor} value={valor}>{valor}</option>
						))}
					</select>
					{mensajeError && (
						<p role="alert" className="mensaje-inline mensaje-inline--error">{mensajeError}</p>
					)}
					{mensajeExito && (
						<p role="status" className="mensaje-inline mensaje-inline--exito">{mensajeExito}</p>
					)}
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
