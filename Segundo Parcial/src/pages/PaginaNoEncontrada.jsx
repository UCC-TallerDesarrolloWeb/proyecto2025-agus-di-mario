import {Link} from 'react-router-dom'
import Pie from '@components/Pie'
import Boton from '@components/Boton'
import '@styles/PaginaNoEncontrada.scss'

/**
 * Vista para rutas no existentes dentro del sitio.
 * @returns {JSX.Element} Contenido de error 404.
 */
function PaginaNoEncontrada() {
    return (
        <>
            <main className="not-found">
                <h2>Página no encontrada</h2>
                <p>La página que buscaste no existe o fue movida.</p>
                <Boton as={Link} to="/">Volver al catálogo</Boton>
            </main>
            <Pie/>
        </>
    )
}

export default PaginaNoEncontrada
