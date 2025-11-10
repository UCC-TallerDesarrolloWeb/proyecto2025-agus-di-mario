import { useEffect, useState } from 'react'
import { guardarResena, obtenerResena } from '@api/albumes'
import Boton from './Boton'
import '@styles/SeccionResena.scss'

const MAXIMO_CARACTERES = 100
const OPCIONES_PUNTAJE = Array.from({ length: 10 }, (_, indice) => indice + 1)
const ERRORES_INICIALES = { texto: '', puntaje: '' }

function SeccionResena({ album }) {
	const [texto, setTexto] = useState('')
	const [puntaje, setPuntaje] = useState('')
	const [resenaGuardada, setResenaGuardada] = useState(null)
	const [errores, setErrores] = useState(ERRORES_INICIALES)

	useEffect(() => {
		const almacenada = obtenerResena(album.id)
		if (almacenada) {
			setResenaGuardada(almacenada)
			setTexto(almacenada.texto)
			setPuntaje(String(almacenada.puntaje))
			setErrores(ERRORES_INICIALES)
		} else {
			setResenaGuardada(null)
			setTexto('')
			setPuntaje('')
			setErrores(ERRORES_INICIALES)
		}
	}, [album])

	const contador = `${texto.length}/${MAXIMO_CARACTERES}`
	const estaEditando = resenaGuardada === null
	const idResena = `texto-resena-${album.id}`
	const idPuntaje = `puntaje-resena-${album.id}`

	/**
	 * Actualiza el texto
	 * @param {string} valor - Contenido del textarea.
	 * @returns {void}
	 */
	function manejarCambioTexto(valor) {
		setTexto(valor)
		setErrores((previos) => ({ ...previos, texto: validarTexto(valor) }))
	}

	/**
	 * Actualiza el puntaje
	 * @param {string} valor - Puntaje seleccionado.
	 * @returns {void}
	 */
	function manejarCambioPuntaje(valor) {
		setPuntaje(valor)
		setErrores((previos) => ({ ...previos, puntaje: validarPuntaje(valor) }))
	}

	/**
	 * Guarda la reseña actual.
	 * @returns {void}
	 */
	function manejarGuardarResena() {
		const textoError = validarTexto(texto)
		const puntajeError = validarPuntaje(puntaje)
		setErrores({ texto: textoError, puntaje: puntajeError })

		if (textoError || puntajeError) {
			return
		}

		const textoLimpio = texto.trim()
		const puntajeNumero = Number(puntaje)
		const persistida = guardarResena(album.id, { texto: textoLimpio, puntaje: puntajeNumero })
		setResenaGuardada(persistida?.resena ?? { texto: textoLimpio, puntaje: puntajeNumero })
		setErrores(ERRORES_INICIALES)
	}

	/**
	 * Habilita la edición volviendo a mostrar el formulario.
	 * @returns {void}
	 */
	function editarResena() {
		if (!resenaGuardada) return
		setTexto(resenaGuardada.texto)
		setPuntaje(String(resenaGuardada.puntaje))
		setResenaGuardada(null)
		setErrores(ERRORES_INICIALES)
	}

	return (
		<div className="seccion-resena">
			{estaEditando ? (
				<div className="entradas-resena">
					<label htmlFor={idResena}
						className="sr-only">Escribe tu reseña breve</label>
					<textarea
						id={idResena}
						placeholder="Escribe tu reseña breve..."
						maxLength={MAXIMO_CARACTERES}
						className="texto-resena"
						value={texto}
						onChange={(evento) => manejarCambioTexto(evento.target.value)}
						aria-invalid={Boolean(errores.texto)}
						aria-describedby={errores.texto ? `${idResena}-error` : undefined}
					/>
					{errores.texto && (
						<p className="mensaje-error"
							role="alert"
							id={`${idResena}-error`}
							aria-live="polite">{errores.texto}</p>
					)}
					<div className="contador-caracteres">{contador}</div>
					<label htmlFor={idPuntaje}
						className="sr-only">Selecciona un puntaje del 1 al 10</label>
					<select
						id={idPuntaje}
						className="entrada-puntaje"
						value={puntaje}
						onChange={(evento) => manejarCambioPuntaje(evento.target.value)}
						aria-invalid={Boolean(errores.puntaje)}
						aria-describedby={errores.puntaje ? `${idPuntaje}-error` : undefined}
					>
						<option value="">Selecciona puntaje</option>
						{OPCIONES_PUNTAJE.map(valor => (
							<option key={valor}
								value={valor}>{valor}</option>
						))}
					</select>
					{errores.puntaje && (
						<p className="mensaje-error"
							role="alert"
							id={`${idPuntaje}-error`}
							aria-live="polite">{errores.puntaje}</p>
					)}
					<Boton type="button"
						className="boton-accion"
						onClick={manejarGuardarResena}>Guardar</Boton>
				</div>
			) : (
				<div className="resena-guardada">
					<p className="texto-resena-guardado">{`"${resenaGuardada?.texto}"`}</p>
					<p className="puntaje-resena-guardado">{`Puntaje: ${resenaGuardada?.puntaje}/10`}</p>
					<Boton type="button"
						variante="secundario"
						className="boton-accion"
						onClick={editarResena}>Editar</Boton>
				</div>
			)}
		</div>
	)
}

/**
 * Valida el campo de texto de la reseña.
 * @param {string} valor - Contenido actual del textarea.
 * @returns {string} Mensaje de error o cadena vacía si es válido.
 */
function validarTexto(valor) {
	const textoLimpio = valor.trim()
	if (!textoLimpio) {
		return 'La reseña no puede estar vacía.'
	}
	if (textoLimpio.length < 10) {
		return 'Escribe al menos 10 caracteres para tu reseña.'
	}
	return ''
}

/**
 * Valida el puntaje seleccionado.
 * @param {string} valor - Valor seleccionado.
 * @returns {string} Mensaje de error si corresponde.
 */
function validarPuntaje(valor) {
	if (!valor) {
		return 'Selecciona un puntaje del 1 al 10.'
	}
	const numero = Number(valor)
	if (!Number.isFinite(numero) || numero < 1 || numero > 10) {
		return 'El puntaje debe estar entre 1 y 10.'
	}
	return ''
}

export default SeccionResena