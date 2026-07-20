import {render, screen} from '@testing-library/react'
import Coleccion from '@pages/Coleccion'
import {obtenerColeccion} from '@api/albumes'

jest.mock('@api/albumes', () => ({
	obtenerColeccion: jest.fn(),
	quitarDeColeccion: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
	useOutletContext: jest.fn(() => ({actualizarConteoColeccion: jest.fn()})),
}))

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

	// Test 5 — Que datos provenientes de la API se rendericen en pantalla
	test('renderiza los álbumes de la colección obtenidos desde la API', async () => {
		obtenerColeccion.mockResolvedValue(albumesMock)

		render(<Coleccion/>)

		expect(await screen.findByText('Thriller')).toBeInTheDocument()
		expect(screen.getByText('Abbey Road')).toBeInTheDocument()
		expect(obtenerColeccion).toHaveBeenCalledTimes(1)
	})

	test('muestra mensaje cuando la colección está vacía', async () => {
		obtenerColeccion.mockResolvedValue([])

		render(<Coleccion/>)

		expect(await screen.findByText(/Todavía no agregaste/)).toBeInTheDocument()
	})
})
