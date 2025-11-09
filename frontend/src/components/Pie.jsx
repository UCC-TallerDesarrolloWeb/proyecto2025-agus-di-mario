import '@styles/Pie.scss'

/**
 * Pie de página con créditos y año dinámico.
 */
function Pie() {
    const anio = new Date().getFullYear()
    return (
        <footer className="app-footer">
            <p>&copy; {anio} Agustín Di Mario. Todos los derechos reservados.</p>
        </footer>
    )
}

export default Pie
