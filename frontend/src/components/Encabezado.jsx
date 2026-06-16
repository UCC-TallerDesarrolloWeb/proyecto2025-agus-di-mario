import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@assets/logo.png'

function Encabezado({ onLimpiar }) {
	const [confirmando, setConfirmando] = useState(false)

	const pedirConfirmacion = () => {
		if (!onLimpiar) return
		setConfirmando(true)
	}

	const confirmar = () => {
		setConfirmando(false)
		onLimpiar()
	}

	const cancelar = () => setConfirmando(false)

	return (
		<header className="app-header">
			<div className="app-header__branding">
				<img src={logo} alt="Logo" className="app-header__logo" width="40" height="40" />
				<p className="app-header__title">Mi Colección de Álbumes</p>
			</div>
			<nav className="app-header__nav">
				<Link className="link" to="/">Inicio</Link>
				<Link className="link" to="/mi-coleccion">Mi colección</Link>
				{onLimpiar && !confirmando && (
					<button className="btn" onClick={pedirConfirmacion} id="boton-limpiar">Limpiar</button>
				)}
				{confirmando && (
					<span className="confirmacion-limpiar">
						<span>¿Limpiar todo?</span>
						<button className="btn" onClick={confirmar}>Sí</button>
						<button className="btn btn--neutro" onClick={cancelar}>No</button>
					</span>
				)}
			</nav>
		</header>
	)
}

export default Encabezado