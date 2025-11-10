import { Outlet } from 'react-router-dom'
import '@styles/LayoutPrincipal.scss'

/**
 * Contenedor principal que delega el render de las rutas hijas mediante <Outlet/>.
 * @returns {React.JSX.Element} Layout base de la aplicación.
 */
function LayoutPrincipal() {
	return (
		<div className="layout-principal">
			<Outlet />
		</div>
	)
}

export default LayoutPrincipal