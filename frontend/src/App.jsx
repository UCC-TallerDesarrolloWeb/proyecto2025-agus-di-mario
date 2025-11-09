import {Route, Routes} from 'react-router-dom'
import './App.css'
import '@styles/global.scss'
import Inicio from '@pages/Inicio'
import Coleccion from '@pages/Coleccion'
import LayoutPrincipal from '@components/LayoutPrincipal'

/**
 * Define las rutas principales de la aplicación.
 * @returns {JSX.Element} Estructura de navegación.
 */
function Aplicacion() {
    return (
        <div className="app-shell">
            <Routes>
                <Route element={<LayoutPrincipal/>}>
                    <Route path="/" element={<Inicio/>}/>
                    <Route path="/mi-coleccion" element={<Coleccion/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default Aplicacion
