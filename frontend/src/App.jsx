import {Route, Routes} from 'react-router-dom'
import './App.css'
import '@styles/global.scss'
import Inicio from '@pages/Inicio'
import Coleccion from '@pages/Coleccion'
import LayoutPrincipal from '@components/LayoutPrincipal'

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
