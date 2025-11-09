import {Link, useLocation, useNavigate} from 'react-router-dom'
import logo from '@assets/logo.png'
import Boton from './Boton'
import InterruptorTema from './InterruptorTema'
import '@styles/Encabezado.scss'

/**
 * Encabezado principal con navegación y controles de búsqueda/filtrado.
 * @param {Object} props - Propiedades del componente.
 * @param {'inicio'|'coleccion'} props.tipo - Variante de encabezado a mostrar.
 * @param {(valor: string) => void} [props.alBuscar] - Callback para actualizar búsqueda.
 * @param {() => void} [props.alLimpiar] - Callback que limpia filtros y datos guardados.
 * @param {(valor: string) => void} [props.alCambiarFiltro] - Cambia el filtro de artista.
 * @param {string[]} props.artistas - Listado de artistas disponibles.
 * @param {string} props.valorBusqueda - Valor actual del campo de búsqueda.
 * @param {string} props.valorArtista - Valor actual del filtro de artista.
 * @returns {JSX.Element} Encabezado renderizado.
 */
function Encabezado({
                        tipo = 'inicio',
                        alBuscar,
                        alLimpiar,
                        alCambiarFiltro,
                        artistas = [],
                        valorBusqueda = '',
                        valorArtista = ''
                    }) {
    const ubicacion = useLocation()
    const navigate = useNavigate()
    const esInicio = tipo === 'inicio' || ubicacion.pathname === '/'

    /**
     * Solicita confirmación y dispara la limpieza de datos persistidos.
     * @returns {void}
     */
    const manejarLimpiar = () => {
        if (!alLimpiar) return
        const confirmado = window.confirm('¿Estás seguro de que quieres limpiar todos los datos guardados? Esta acción no se puede deshacer.')
        if (confirmado) {
            alLimpiar()
        }
    }

    /**
     * Lanza la búsqueda manual usando el valor actual.
     * @returns {void}
     */
    const manejarBuscar = () => {
        alBuscar?.(valorBusqueda)
    }

    /**
     * Lleva a la persona usuaria a la página principal.
     * @returns {void}
     */
    const manejarIrAlCatalogo = () => {
        navigate('/')
    }

    return (
        <header className="app-header">
            <div className="app-header__branding">
                <img
                    src={logo}
                    alt="Logo de Mi Colección de Álbumes"
                    className="app-header__logo"
                    width="48"
                    height="48"
                />
                <div>
                    <p className="app-header__title">Mi Colección de Álbumes</p>
                    <span className="app-header__subtitle">Catálogo y reseñas personalizadas</span>
                </div>
            </div>
            <nav className="app-header__nav" aria-label="Navegación principal">
                {esInicio ? (
                    <>
                        <div className="app-header__field">
                            <label htmlFor="busqueda" className="sr-only">Buscar álbum o artista</label>
                            <input
                                type="text"
                                id="busqueda"
                                placeholder="Buscar álbum o artista"
                                size={30}
                                maxLength={60}
                                value={valorBusqueda}
                                onChange={(evento) => alBuscar?.(evento.target.value)}
                            />
                        </div>
                        <Boton id="boton-buscar" onClick={manejarBuscar}>Buscar</Boton>
                        <div className="app-header__field">
                            <label htmlFor="filtro-artista" className="sr-only">Filtrar por artista</label>
                            <select id="filtro-artista" value={valorArtista}
                                    onChange={(evento) => alCambiarFiltro?.(evento.target.value)}>
                                <option value="">-- Filtrar por artista --</option>
                                {artistas.map(artista => (
                                    <option key={artista} value={artista}>{artista}</option>
                                ))}
                            </select>
                        </div>
                        {alLimpiar && (
                            <Boton id="boton-limpiar" variante="peligro" onClick={manejarLimpiar}
                                   title="Limpiar todos los datos guardados">Limpiar</Boton>
                        )}
                        <Boton as={Link} to="/mi-coleccion">Mi colección</Boton>
                    </>
                ) : (
                    <>
                        <Boton variante="secundario" onClick={manejarIrAlCatalogo}>Volver al catálogo</Boton>
                        {alLimpiar && (
                            <Boton id="boton-limpiar" variante="peligro" onClick={manejarLimpiar}
                                   title="Limpiar todos los datos guardados">Limpiar</Boton>
                        )}
                    </>
                )}
                <InterruptorTema className="app-header__switch"/>
            </nav>
        </header>
    )
}

export default Encabezado
