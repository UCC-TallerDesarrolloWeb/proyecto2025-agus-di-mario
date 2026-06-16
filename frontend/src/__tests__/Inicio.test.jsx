import {render, screen} from '@testing-library/react'
import Inicio from '@pages/Inicio'
import {obtenerAlbumes, obtenerColeccion} from '@api/albumes'

jest.mock('@api/albumes', () => ({
	obtenerAlbumes: jest.fn(),
	obtenerColeccion: jest.fn(),
	agregarAColeccion: jest.fn(),
	quitarDeColeccion: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
	useOutletContext: jest.fn(() => ({limpiadoEn: null})),
}))

describe('Inicio', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	// Test 4 — Que datos provenientes de la API se rendericen en pantalla
	test('renderiza los títulos de los álbumes obtenidos desde la API', async () => {
		obtenerAlbumes.mockResolvedValue([
			{id: '1', nombre: 'Thriller', artista: 'Michael Jackson', imagen: ''},
			{id: '2', nombre: 'Abbey Road', artista: 'The Beatles', imagen: ''},
		])
		obtenerColeccion.mockResolvedValue([])

		render(<Inicio/>)

		expect(await screen.findByText('Thriller')).toBeInTheDocument()
		expect(screen.getByText('Abbey Road')).toBeInTheDocument()
		expect(obtenerAlbumes).toHaveBeenCalledTimes(1)
	})
})
