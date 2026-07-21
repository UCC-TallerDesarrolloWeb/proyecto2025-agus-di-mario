import {useCallback, useEffect, useState} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import Encabezado from '@components/Encabezado'
import Pie from '@components/Pie'
import {limpiarDatos, obtenerColeccion} from '@api/albumes'

/**
 * Layout raíz de la aplicación: renderiza encabezado, mensaje global,
 * las rutas hijas vía Outlet y el pie de página.
 * @returns {JSX.Element}
 */
function Layout() {
	const navigate = useNavigate()
	const location = useLocation()
	const [limpiadoEn, setLimpiadoEn] = useState(null)
	const [mensajeGlobal, setMensajeGlobal] = useState('')
	const [conteoColeccion, setConteoColeccion] = useState(0)

	useEffect(() => {
		if (!mensajeGlobal) return
		const t = setTimeout(() => setMensajeGlobal(''), 3000)
		return () => clearTimeout(t)
	}, [mensajeGlobal])

	useEffect(() => {
		setMensajeGlobal('')
	}, [location.pathname])

	/* Carga inicial del conteo de la colección */
	useEffect(() => {
		obtenerColeccion()
			.then(c => setConteoColeccion(c.length))
			.catch(() => {})
	}, [])

	/**
	 * Callback que los hijos invocan cuando la colección cambia,
	 * para mantener actualizado el conteo en el Layout.
	 * @param {number} nuevoConteo - Cantidad de ítems en la colección.
	 */
	const actualizarConteo = useCallback((nuevoConteo) => {
		setConteoColeccion(nuevoConteo)
	}, [])

	/**
	 * Limpia todos los datos del servidor, muestra confirmación
	 * inline y navega a la página de inicio.
	 */
	async function manejarLimpiar() {
		try {
			await limpiarDatos()
			setMensajeGlobal('Datos limpiados correctamente.')
			setConteoColeccion(0)
			setLimpiadoEn(Date.now())
			navigate('/')
		} catch {
			setMensajeGlobal('No se pudieron limpiar los datos de la colección. Verificá que el servidor esté disponible.')
		}
	}

	return (
		<>
			<Encabezado onLimpiar={conteoColeccion > 0 ? manejarLimpiar : null}/>
			{mensajeGlobal && (
				<p role="status" className="mensaje-global">{mensajeGlobal}</p>
			)}
			<Outlet context={{limpiadoEn, actualizarConteo}}/>
			<Pie/>
		</>
	)
}

export default Layout
