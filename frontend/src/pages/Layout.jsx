import {useEffect, useState} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import Encabezado from '@components/Encabezado'
import Pie from '@components/Pie'
import {limpiarDatos} from '@api/albumes'

function Layout() {
	const navigate = useNavigate()
	const location = useLocation()
	const [limpiadoEn, setLimpiadoEn] = useState(null)
	const [mensajeGlobal, setMensajeGlobal] = useState('')

	useEffect(() => {
		if (!mensajeGlobal) return
		const t = setTimeout(() => setMensajeGlobal(''), 3000)
		return () => clearTimeout(t)
	}, [mensajeGlobal])

	useEffect(() => {
		setMensajeGlobal('')
	}, [location.pathname])

	/**
	 * Limpia todos los datos del servidor, muestra confirmación
	 * inline y navega a la página de inicio.
	 */
	async function manejarLimpiar() {
		await limpiarDatos()
		setMensajeGlobal('Datos limpiados correctamente.')
		setLimpiadoEn(Date.now())
		navigate('/')
	}

	return (
		<>
			<Encabezado onLimpiar={manejarLimpiar}/>
			{mensajeGlobal && (
				<p role="status" className="mensaje-global">{mensajeGlobal}</p>
			)}
			<Outlet context={{limpiadoEn}}/>
			<Pie/>
		</>
	)
}

export default Layout
