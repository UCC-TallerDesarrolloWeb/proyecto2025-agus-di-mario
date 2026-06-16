import {Route, Routes} from 'react-router-dom'
import '@styles/global.scss'
import Layout from '@pages/Layout'
import Inicio from '@pages/Inicio'
import Coleccion from '@pages/Coleccion'

function Aplicacion() {
	return (
		<div className="app-shell">
			<Routes>
				<Route element={<Layout/>}>
					<Route path="/" element={<Inicio/>}/>
					<Route path="/mi-coleccion" element={<Coleccion/>}/>
				</Route>
			</Routes>
		</div>
	)
}

export default Aplicacion
