import {agregarAColeccion, guardarResena, quitarDeColeccion} from '@api/albumes'

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

describe('quitarDeColeccion', () => {
	let fetchMock

	beforeEach(() => {
		fetchMock = jest.fn()
		global.fetch = fetchMock
	})

	afterEach(() => {
		delete global.fetch
	})

	test('hace DELETE a /coleccion/:id y luego GET /coleccion', async () => {
		// quitarDeColeccion hace 2 llamadas: DELETE /coleccion/:id + GET /coleccion
		fetchMock
			.mockResolvedValueOnce({ok: true, json: async () => ({})})
			.mockResolvedValueOnce({ok: true, json: async () => []})

		const resultado = await quitarDeColeccion('99')

		expect(fetchMock).toHaveBeenCalledTimes(2)
		expect(fetchMock).toHaveBeenNthCalledWith(1, `${BASE_URL}/coleccion/99`, {method: 'DELETE'})
		expect(resultado).toEqual([])
	})
})

describe('guardarResena', () => {
	let fetchMock

	beforeEach(() => {
		fetchMock = jest.fn()
		global.fetch = fetchMock
	})

	afterEach(() => {
		delete global.fetch
	})

	test('hace PATCH a /coleccion/:id con la reseña en el body', async () => {
		const resenaMock = {texto: 'Obra maestra', puntaje: 5}
		const respuestaMock = {...albumMock, resena: resenaMock}

		fetchMock.mockResolvedValueOnce({ok: true, json: async () => respuestaMock})

		const resultado = await guardarResena('99', resenaMock)

		expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalledWith(
			`${BASE_URL}/coleccion/99`,
			expect.objectContaining({
				method: 'PATCH',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({resena: resenaMock}),
			})
		)
		expect(resultado).toEqual(respuestaMock)
	})

	test('retorna null si el servidor responde con error', async () => {
		fetchMock.mockResolvedValueOnce({ok: false, json: async () => null})

		const resultado = await guardarResena('99', {texto: 'x', puntaje: 1})

		expect(resultado).toBeNull()
	})
})
