// Tests de la página Inicio (catálogo). Se mockea @api/albumes completo para no
// depender de json-server, y también react-router-dom: Inicio lee {limpiadoEn}
// vía useOutletContext, que solo existe si el componente está montado dentro
// del <Outlet> de Layout — mockearlo evita tener que renderizar todo el árbol
// de rutas solo para probar esta página.
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

	// Requisito 4 de la consigna — que datos provenientes de la API se rendericen
	// en pantalla. Los datos llegan después de que el useEffect async resuelve,
	// por eso ambos álbumes se consultan con findByText (asíncrono, espera a que
	// el elemento aparezca) y nunca con getByText, que fallaría si el render
	// todavía no ocurrió.
	test('renderiza los títulos de los álbumes obtenidos desde la API', async () => {
		obtenerAlbumes.mockResolvedValue([
			{id: '1', nombre: 'Thriller', artista: 'Michael Jackson', imagen: '/albums/thriller.jpg'},
			{id: '2', nombre: 'Abbey Road', artista: 'The Beatles', imagen: '/albums/abbey-road.jpg'},
		])
		obtenerColeccion.mockResolvedValue([])

		render(<Inicio/>)

		expect(await screen.findByText('Thriller')).toBeInTheDocument()
		expect(await screen.findByText('Abbey Road')).toBeInTheDocument()
		expect(obtenerAlbumes).toHaveBeenCalledTimes(1)
	})
})
