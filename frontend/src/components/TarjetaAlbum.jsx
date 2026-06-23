function TarjetaAlbum({
	                      album,
	                      variante = 'catalogo',
	                      esFavorito = false,
	                      onColeccionar,
	                      alAlternarFavorito,
	                      children: hijos,
                      }) {
	const alternarColeccion = onColeccionar ?? alAlternarFavorito

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
						onClick={() => alternarColeccion?.(album)}
					>
						{esFavorito ? '★' : '☆'}
					</button>
				)}
				{variante === 'coleccion' && (
					<button
						type="button"
						className="btn"
						onClick={() => alternarColeccion?.(album)}
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
