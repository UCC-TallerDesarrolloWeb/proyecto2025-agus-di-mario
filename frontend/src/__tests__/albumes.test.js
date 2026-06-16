import {agregarAColeccion} from '@api/albumes'

const BASE_URL = 'http://localhost:3001'

const albumMock = {
	id: '99',
	nombre: 'Rumours',
	artista: 'Fleetwood Mac',
	imagen: '/albums/rumours.jpg',
}

describe('agregarAColeccion', () => {
	let fetchMock

	beforeEach(() => {
		fetchMock = jest.fn()
		global.fetch = fetchMock
	})

	afterEach(() => {
		delete global.fetch
	})

	// Test 5 — Que una operación CRUD llame al endpoint correcto
	test('hace POST a /coleccion con el cuerpo correcto cuando el álbum no existe', async () => {
		// agregarAColeccion hace 3 llamadas fetch: GET /coleccion, POST /coleccion, GET /coleccion
		fetchMock
			.mockResolvedValueOnce({ok: true, json: async () => []})
			.mockResolvedValueOnce({ok: true, json: async () => ({...albumMock, resena: null})})
			.mockResolvedValueOnce({ok: true, json: async () => [{...albumMock, resena: null}]})

		await agregarAColeccion(albumMock)

		expect(fetchMock).toHaveBeenCalledTimes(3)
		expect(fetchMock).toHaveBeenNthCalledWith(
			2,
			`${BASE_URL}/coleccion`,
			expect.objectContaining({
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({...albumMock, resena: null}),
			})
		)
	})
})
