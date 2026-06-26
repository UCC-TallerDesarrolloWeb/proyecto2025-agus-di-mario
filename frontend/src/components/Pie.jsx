/**
 * Pie de página con copyright y año calculado dinámicamente.
 * @returns {JSX.Element}
 */
function Pie() {
	const anio = new Date().getFullYear()
	return (<footer className="app-footer">
		<p>&copy; {anio} Agustín Di Mario. Todos los derechos reservados.</p>
	</footer>)
}

export default Pie
