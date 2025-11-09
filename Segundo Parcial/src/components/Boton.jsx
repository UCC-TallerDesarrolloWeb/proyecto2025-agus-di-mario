import '@styles/Boton.scss'

/**
 * Botón genérico reutilizable con variantes semánticas.
 * @param {Object} props - Propiedades del componente.
 * @param {'primario'|'peligro'|'secundario'|'fantasma'} [props.variante='primario'] - Define la paleta del botón.
 * @param {React.ElementType} [props.as='button'] - Permite renderizar otro elemento (ej: Link).
 * @param {string} [props.className] - Clases adicionales personalizadas.
 * @param {React.ReactNode} props.children - Contenido del botón.
 * @returns {React.JSX.Element} Botón renderizado.
 */
function Boton({variante = 'primario', as: Componente = 'button', className = '', children, ...resto}) {
    const clases = ['boton', `boton--${variante}`, className].filter(Boolean).join(' ')

    if (Componente !== 'button') {
        return (
            <Componente className={clases} {...resto}>
                {children}
            </Componente>
        )
    }

    return (
        <button type="button" className={clases} {...resto}>
            {children}
        </button>
    )
}

export default Boton
