import { Route, Routes } from 'react-router-dom'
import './App.css'
import '@styles/global.scss'
import Inicio from '@pages/Inicio'
import Coleccion from '@pages/Coleccion'

function Aplicacion() {
	return (
		<div className="app-shell">
			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="/mi-coleccion" element={<Coleccion />} />
			</Routes>
		</div>
	)
}

export default Aplicacion
