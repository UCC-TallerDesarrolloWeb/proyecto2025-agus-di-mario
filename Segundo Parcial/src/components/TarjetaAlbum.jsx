import '@styles/TarjetaAlbum.scss'

/**
 * Tarjeta visual para mostrar los datos de un álbum.
 * @param {Object} props - Propiedades recibidas.
 * @param {{id:number,nombre:string,artista:string,imagen:string}} props.album - Álbum a renderizar.
 * @param {'catalogo'|'coleccion'} [props.variante] - Variante visual dependiendo de la vista.
 * @param {boolean} [props.esFavorito] - Indica si el álbum está en la colección.
 * @param {(album: {id:number}) => void} [props.alAlternarFavorito] - Handler para alternar favorito.
 * @returns {JSX.Element} Tarjeta renderizada.
 */
function TarjetaAlbum({album, variante = 'catalogo', esFavorito = false, alAlternarFavorito, children: hijos}) {
    /**
     * Reemplaza la imagen cuando ocurre un error de carga.
     * @param {React.SyntheticEvent<HTMLImageElement>} evento - Evento del navegador.
     * @returns {void}
     */
    function manejarErrorImagen(evento) {
        evento.currentTarget.src = 'https://via.placeholder.com/600x600?text=Album'
    }

    const mostrarFavorito = variante === 'catalogo'

    return (
        <div className="tarjeta-album">
            <img
                src={album.imagen}
                alt={`${album.nombre} - ${album.artista}`}
                onError={manejarErrorImagen} //a chequear
                className="tarjeta-album__imagen"
                loading="lazy" //mmmm
            />
            <div className="info-album">
                <h3>{album.nombre}</h3>
                <p>{album.artista}</p>
                {mostrarFavorito && (
                    <button
                        type="button"
                        className={`estrella${esFavorito ? ' activo' : ''}`}
                        aria-pressed={esFavorito}
                        aria-label={esFavorito ? 'Quitar de mi colección' : 'Agregar a mi colección'}
                        onClick={() => alAlternarFavorito?.(album)}
                    >
                        {esFavorito ? '★' : '☆'} // investigar si puedo usar otra cosa que no sea un caracter de
                        estrellita
                    </button>
                )}
                {hijos}
            </div>
        </div>
    )
}

export default TarjetaAlbum
