import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { leerJSON, escribirJSON } from '@utils/storage'

const CLAVE_TEMA = 'preferenciaTema'

const TemaContexto = createContext(null)

/**
 * Proveedor global del tema seleccionado por la persona usuaria.
 * @param {{children: React.ReactNode}} props - Elementos que recibirán el contexto.
 * @returns {JSX.Element} Wrapper con el contexto de tema.
 */
export function TemaProvider({ children }) {
  const temaInicial = obtenerTemaInicial()
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    escribirJSON(CLAVE_TEMA, tema)
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.tema = tema
    }
  }, [tema])

  /**
   * Alterna entre los modos claro y oscuro y lo persiste.
   * @returns {void}
   */
  function alternarTema() {
    setTema((valorActual) => (valorActual === 'oscuro' ? 'claro' : 'oscuro'))
  }

  const valor = useMemo(() => ({ tema, alternarTema }), [tema])

  return <TemaContexto.Provider value={valor}>{children}</TemaContexto.Provider>
}

/**
 * Expone el contexto del tema. Debe usarse dentro de <TemaProvider/>.
 * @returns {{tema:'claro'|'oscuro',alternarTema:() => void}} Datos del contexto.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTema() {
  const contexto = useContext(TemaContexto)
  if (!contexto) {
    throw new Error('useTema debe utilizarse dentro de un TemaProvider')
  }
  return contexto
}

/**
 * Obtiene la preferencia inicial almacenada en localStorage (valor por defecto: claro).
 * @returns {'claro'|'oscuro'} Tema inicial.
 */
function obtenerTemaInicial() {
  if (typeof window === 'undefined') {
    return 'claro'
  }
  const almacenado = leerJSON(CLAVE_TEMA, 'claro')
  return almacenado === 'oscuro' ? 'oscuro' : 'claro'
}
