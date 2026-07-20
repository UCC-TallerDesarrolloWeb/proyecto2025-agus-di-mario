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
	const [coleccionVacia, setColeccionVacia] = useState(true)

	useEffect(() => {
		if (!mensajeGlobal) return
		const t = setTimeout(() => setMensajeGlobal(''), 3000)
		return () => clearTimeout(t)
	}, [mensajeGlobal])

	useEffect(() => {
		setMensajeGlobal('')
	}, [location.pathname])

	useEffect(() => {
		obtenerColeccion().then(coleccion => setColeccionVacia(coleccion.length === 0))
	}, [])

	/**
	 * Limpia todos los datos del servidor, muestra confirmación
	 * inline y navega a la página de inicio.
	 */
	async function manejarLimpiar() {
		await limpiarDatos()
		setMensajeGlobal('Datos limpiados correctamente.')
		setLimpiadoEn(Date.now())
		setColeccionVacia(true)
		navigate('/')
	}

	/**
	 * Actualiza si la colección está vacía a partir de la cantidad
	 * de elementos reportada por las páginas hijas.
	 * @param {number} cantidad - Cantidad actual de elementos en la colección.
	 */
	const actualizarConteoColeccion = useCallback((cantidad) => setColeccionVacia(cantidad === 0), [])

	return (
		<>
			<Encabezado onLimpiar={coleccionVacia ? undefined : manejarLimpiar}/>
			{mensajeGlobal && (
				<p role="status" className="mensaje-global">{mensajeGlobal}</p>
			)}
			<Outlet context={{limpiadoEn, actualizarConteoColeccion}}/>
			<Pie/>
		</>
	)
}

export default Layout
