import { useEffect, useState } from 'react'
import Encabezado from '@components/Encabezado'
import Pie from '@components/Pie'
import TarjetaAlbum from '@components/TarjetaAlbum'
import SeccionResena from '@components/SeccionResena'
import { limpiarDatos, obtenerColeccion } from '@api/albumes'
import './Coleccion.scss'

/**
 * Presenta la colección personal con las reseñas guardadas.
 * @returns {JSX.Element} Vista de la colección.
 */
function Coleccion() {
  const [elementos, setElementos] = useState([])

  useEffect(() => {
    setElementos(obtenerColeccion())
  }, [])

  /**
   * Limpia los datos persistidos y resetea la lista local.
   * @returns {void}
   */
  function manejarLimpiar() {
    limpiarDatos()
    setElementos([])
    alert('Datos limpiados correctamente.')
  }

  return (
    <>
      <Encabezado tipo="coleccion" alLimpiar={manejarLimpiar} />
      <main>
        <section id="coleccion">
          <h2>
            Mi colección (<span id="contador">{elementos.length}</span>)
          </h2>
          {elementos.length === 0 ? (
            <p className="coleccion-vacia">Todavía no agregaste álbumes a tu colección.</p>
          ) : (
            <div className="lista-coleccion" id="lista-coleccion">
              {elementos.map(album => (
                <TarjetaAlbum key={album.id} album={album} variante="coleccion">
                  <SeccionResena album={album} />
                </TarjetaAlbum>
              ))}
            </div>
          )}
        </section>
      </main>
      <Pie />
    </>
  )
}

export default Coleccion
