import '@styles/Boton.scss'

function Boton({ variante = 'primario', as: Componente = 'button', className = '', children, ...resto }) {
	const clases = ['boton', `boton--${variante}`, className].filter(Boolean).join(' ')

	if (Componente !== 'button') {
		return (
			<Componente className={clases} {...resto}>
				{children}
			</Componente>
		)
	}

	return (
		<button type="button"
			className={clases} {...resto}>
			{children}
		</button>
	)
}

export default Boton
