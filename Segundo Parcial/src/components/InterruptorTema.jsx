import {useMemo} from 'react'
import {useTema} from '@context/TemaContext'
import '@styles/InterruptorTema.scss'

const OPCIONES = [
    {
        id: 'claro',
        etiqueta: 'Claro',
        titulo: 'Activar modo claro',
    },
    {
        id: 'oscuro',
        etiqueta: 'Oscuro',
        titulo: 'Activar modo oscuro',
    },
]

function IconoSol() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
            <line x1="12" x2="12" y1="1.5" y2="4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="12" x2="12" y1="19.5" y2="22.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="4.5" x2="7.5" y1="4.5" y2="7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="16.5" x2="19.5" y1="16.5" y2="19.5" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round"/>
            <line x1="1.5" x2="4.5" y1="12" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="19.5" x2="22.5" y1="12" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="4.5" x2="7.5" y1="19.5" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="16.5" x2="19.5" y1="7.5" y2="4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
    )
}

function IconoLuna() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M21 13.2A8.2 8.2 0 0 1 10.8 3a8.2 8.2 0 1 0 10.2 10.2z" fill="currentColor"/>
        </svg>
    )
}

const iconos = {
    claro: <IconoSol/>,
    oscuro: <IconoLuna/>,
}

/**
 * Interruptor accesible para alternar entre los modos claro y oscuro con mayor claridad visual.
 * @param {{className?:string}} props
 * @returns {JSX.Element}
 */
function InterruptorTema({className = ''}) {
    const {tema, alternarTema} = useTema()

    const clases = useMemo(() => ['interruptor-tema', className].filter(Boolean).join(' '), [className])

    const manejarSeleccion = (objetivo) => {
        if (objetivo !== tema) {
            alternarTema()
        }
    }

    return (
        <div className={clases} role="group" aria-label="Preferencia de tema">
            <span className="interruptor-tema__label">Tema</span>
            <div className="interruptor-tema__opciones">
                {OPCIONES.map((opcion) => {
                    const activo = opcion.id === tema
                    return (
                        <button
                            key={opcion.id}
                            type="button"
                            className={`interruptor-tema__opcion${activo ? ' interruptor-tema__opcion--activa' : ''}`}
                            aria-pressed={activo}
                            title={opcion.titulo}
                            onClick={() => manejarSeleccion(opcion.id)}
                        >
              <span className="interruptor-tema__icono" aria-hidden="true">
                {iconos[opcion.id]}
              </span>
                            <span>{opcion.etiqueta}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default InterruptorTema
