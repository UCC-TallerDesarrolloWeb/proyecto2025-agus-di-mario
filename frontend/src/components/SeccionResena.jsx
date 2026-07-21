import {useEffect, useState} from 'react'
import {guardarResena, obtenerResena} from '@api/albumes'

/**
 * Sección de reseña para un álbum: permite crear, ver y editar reseñas.
 * @param {Object} props
 * @param {Object} props.album - Álbum al que pertenece la reseña.
 * @returns {JSX.Element}
 */
function SeccionResena({album}) {
	const [texto, setTexto] = useState('')
	const [puntaje, setPuntaje] = useState('')
	const [resenaGuardada, setResenaGuardada] = useState(null)
	const [estaEditando, setEstaEditando] = useState(true)
	const [mensajeError, setMensajeError] = useState('')
	const [mensajeExito, setMensajeExito] = useState('')
	const opcionesPuntaje = Array.from({length: 10}, (_, indice) => String(indice + 1))
	const albumId = album.albumId || album.id
	const idTexto = `resena-texto-${albumId}`
	const idPuntaje = `resena-puntaje-${albumId}`

	useEffect(() => {
		;(async () => {
			try {
				const almacenada = await obtenerResena(albumId)
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
			} catch {
				setMensajeError('No se pudo cargar la reseña guardada.')
			}
		})()
	}, [album])

	/**
	 * Valida los campos y persiste la reseña en el servidor.
	 * @returns {Promise<void>}
	 */
	async function guardar() {
		const textoLimpio = (texto || '').trim()
		if (!textoLimpio || !puntaje) {
			setMensajeError('Completá la reseña y elegí un puntaje.')
			setMensajeExito('')
			return
		}
		setMensajeError('')
		const puntajeNumero = Number(puntaje) || 1
		try {
			const resultado = await guardarResena(albumId, {texto: textoLimpio, puntaje: puntajeNumero})
			if (!resultado) {
				setMensajeError('No se pudo guardar la reseña. Intentá de nuevo.')
				return
			}
			setResenaGuardada({texto: textoLimpio, puntaje: puntajeNumero})
			setEstaEditando(false)
			setMensajeExito('Reseña guardada.')
		} catch {
			setMensajeError('No se pudo guardar la reseña. Intentá de nuevo.')
		}
	}

	/**
	 * Vuelve al modo edición precargando los valores de la reseña guardada.
	 * @returns {void}
	 */
	function editar() {
		if (!resenaGuardada) return
		setTexto(resenaGuardada.texto || '')
		setPuntaje(String(resenaGuardada.puntaje || ''))
		setEstaEditando(true)
		setMensajeError('')
		setMensajeExito('')
	}

	return (<div className="seccion-resena">
		{estaEditando ? (<div className="entradas-resena">
			<label htmlFor={idTexto} className="resena-label">Reseña</label>
			<textarea
				id={idTexto}
				className="texto-resena"
				placeholder="Escribe tu reseña..."
				value={texto}
				onChange={(e) => {
					setTexto(e.target.value)
					setMensajeError('')
				}}
			/>
			<label htmlFor={idPuntaje} className="resena-label">Puntaje</label>
			<select
				id={idPuntaje}
				className="entrada-puntaje"
				value={puntaje}
				onChange={(e) => {
					setPuntaje(e.target.value)
					setMensajeError('')
				}}
			>
				<option value="">Puntaje (1-10)</option>
				{opcionesPuntaje.map((valor) => (<option key={valor} value={valor}>{valor}</option>))}
			</select>
			{mensajeError && (
				<p role="alert" className="mensaje-inline mensaje-inline--error">{mensajeError}</p>)}
			{mensajeExito && (
				<p role="status" className="mensaje-inline mensaje-inline--exito">{mensajeExito}</p>)}
			<button type="button" className="boton-accion" onClick={guardar}>Guardar</button>
		</div>) : (<div className="resena-guardada">
			<p className="texto-resena-guardado">{`"${resenaGuardada?.texto}"`}</p>
			<p className="puntaje-resena-guardado">{`Puntaje: ${resenaGuardada?.puntaje}/10`}</p>
			<button type="button" className="boton-accion" onClick={editar}>Editar</button>
		</div>)}
	</div>)
}

export default SeccionResena
