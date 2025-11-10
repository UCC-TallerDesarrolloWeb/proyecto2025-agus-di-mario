import { Link } from 'react-router-dom'
import logo from '@assets/logo.png'

function Encabezado({ onLimpiar }) {
	const manejarLimpiar = () => {
		if (!onLimpiar) return
		if (window.confirm('¿Limpiar todos los datos guardados?')) onLimpiar()
	}

	return (
		<header className="app-header">
			<div className="app-header__branding">
				<img src={logo} alt="Logo" className="app-header__logo" width="40" height="40" />
				<p className="app-header__title">Mi Colección de Álbumes</p>
			</div>
			<nav className="app-header__nav">
				<Link className="link" to="/">Inicio</Link>
				<Link className="link" to="/mi-coleccion">Mi colección</Link>
				{onLimpiar && (
					<button className="btn" onClick={manejarLimpiar} id="boton-limpiar">Limpiar</button>
				)}
			</nav>
		</header>
	)
}

export default Encabezado