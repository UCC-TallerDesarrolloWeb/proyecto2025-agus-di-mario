/**
 * Tarjeta visual de un álbum con acción de colección integrada.
 * @param {Object} props
 * @param {Object} props.album - Datos del álbum (id, nombre, artista, imagen).
 * @param {'catalogo'|'coleccion'} props.variante - Modo de visualización.
 * @param {boolean} props.esFavorito - Indica si el álbum está en la colección.
 * @param {Function} props.onColeccionar - Callback que recibe el álbum al hacer clic.
 * @param {React.ReactNode} props.children - Contenido extra (p.ej. SeccionResena).
 * @returns {JSX.Element}
 */
function TarjetaAlbum({
	                      album,
	                      variante = 'catalogo',
	                      esFavorito = false,
	                      onColeccionar,
	                      children: hijos,
                      }) {

	return (
		<div className="tarjeta-album">
			<img
				src={album.imagen}
				alt={`${album.nombre} - ${album.artista}`}
				className="tarjeta-album__imagen"
			/>
			<div className="info-album">
				<h3>{album.nombre}</h3>
				<p>{album.artista}</p>
				{variante === 'catalogo' && (
					<button
						type="button"
						className={`estrella${esFavorito ? ' activo' : ''}`}
						aria-pressed={esFavorito}
						aria-label={esFavorito ? 'Quitar de mi colección' : 'Agregar a mi colección'}
						onClick={() => onColeccionar?.(album)}
					>
						{esFavorito ? '★' : '☆'}
					</button>
				)}
				{variante === 'coleccion' && (
					<button
						type="button"
						className="btn"
						onClick={() => onColeccionar?.(album)}
					>
						Quitar
					</button>
				)}
				{hijos}
			</div>
		</div>
	)
}

export default TarjetaAlbum
