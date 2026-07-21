// Tests de la página Coleccion. Además de mockear la API, se stubea el
// componente SeccionResena con un <div> vacío: la lógica de reseñas ya tiene
// su propio archivo de tests, y sin el stub cada tarjeta dispararía el fetch
// de obtenerResena, acoplando este test a un módulo que no le corresponde.
// También se mockea react-router-dom: Coleccion lee {actualizarConteo} vía
// useOutletContext, que solo existe si el componente está montado dentro del
// <Outlet> de Layout — mockearlo evita renderizar todo el árbol de rutas.
import {render, screen} from '@testing-library/react'
import Coleccion from '@pages/Coleccion'
import {obtenerColeccion} from '@api/albumes'

jest.mock('@api/albumes', () => ({
	obtenerColeccion: jest.fn(),
	quitarDeColeccion: jest.fn(),
}))

// actualizarConteo se crea una sola vez (fuera de la función que retorna
// useOutletContext): si se recreara en cada llamada, cambiaría de referencia
// en cada render y el useEffect que la tiene como dependencia se dispararía
// en bucle.
jest.mock('react-router-dom', () => {
	const actualizarConteo = jest.fn()
	return {
		useOutletContext: jest.fn(() => ({actualizarConteo})),
	}
})

jest.mock('@components/SeccionResena', () => ({
	__esModule: true,
	default: () => <div data-testid="seccion-resena"/>,
}))

const albumesMock = [
	{id: '1', nombre: 'Thriller', artista: 'Michael Jackson', imagen: '/t.jpg'},
	{id: '2', nombre: 'Abbey Road', artista: 'The Beatles', imagen: '/a.jpg'},
]

describe('Coleccion', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	// Requisito 4 de la consigna — que datos provenientes de la API se rendericen
	// en pantalla (acá, la colección guardada). findByText espera a que el
	// useEffect async resuelva y pinte las tarjetas.
	test('renderiza los álbumes de la colección obtenidos desde la API', async () => {
		obtenerColeccion.mockResolvedValue(albumesMock)

		render(<Coleccion/>)

		expect(await screen.findByText('Thriller')).toBeInTheDocument()
		expect(await screen.findByText('Abbey Road')).toBeInTheDocument()
		expect(obtenerColeccion).toHaveBeenCalledTimes(1)
	})

	// Complementario del requisito 4 — el estado vacío: con la API devolviendo []
	// la página debe mostrar el mensaje invitando a agregar álbumes, no una grilla
	// en blanco.
	test('muestra mensaje cuando la colección está vacía', async () => {
		obtenerColeccion.mockResolvedValue([])

		render(<Coleccion/>)

		expect(await screen.findByText(/Todavía no agregaste/)).toBeInTheDocument()
	})

	test('muestra mensaje de error si falla la carga de la colección', async () => {
		obtenerColeccion.mockRejectedValue(new Error('Error de conexión'))

		render(<Coleccion/>)

		expect(await screen.findByRole('alert')).toHaveTextContent(/No se pudo cargar tu colección/)
	})
})
