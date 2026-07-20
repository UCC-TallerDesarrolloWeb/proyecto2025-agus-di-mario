// Tests de la capa de API (src/api/albumes.js): el único módulo que habla con
// json-server. Acá no se mockea el módulo sino el fetch global de Node: así se
// verifica que cada función arme la request correcta (URL, método, headers, body)
// sin levantar un servidor real. Las respuestas se programan en cola con
// mockResolvedValueOnce porque cada función encadena varios fetch secuenciales.
import {agregarAColeccion, guardarResena, quitarDeColeccion} from '@api/albumes'

const BASE_URL = 'http://localhost:3001'

const albumMock = {
	id: '99',
	nombre: 'Rumours',
	artista: 'Fleetwood Mac',
	imagen: '/albums/rumours.jpg',
}

// Setup compartido por todos los describe: un fetch mock nuevo por test
// (no hace falta clearAllMocks porque el mock se recrea desde cero) y
// se elimina el global al terminar para no contaminar otros archivos.
let fetchMock

beforeEach(() => {
	fetchMock = jest.fn()
	global.fetch = fetchMock
})

afterEach(() => {
	delete global.fetch
})

describe('agregarAColeccion', () => {
	// Requisito 5 de la consigna — que una operación CRUD llame al endpoint correcto.
	// Se programan en cola las respuestas de los 3 fetch que hace la función
	// (GET para verificar duplicados, POST para crear, GET para retornar el estado
	// final) y se asegura que entre ellos hubo un POST a /coleccion con el body
	// esperado — sin fijar cuántas llamadas ni en qué orden, que es un detalle interno.
	test('hace POST a /coleccion con el cuerpo correcto cuando el álbum no existe', async () => {
		fetchMock
			.mockResolvedValueOnce({ok: true, json: async () => []})
			.mockResolvedValueOnce({ok: true, json: async () => ({...albumMock, resena: null})})
			.mockResolvedValueOnce({ok: true, json: async () => [{...albumMock, resena: null}]})

		await agregarAColeccion(albumMock)

		expect(fetchMock).toHaveBeenCalledWith(
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
	// Complementario del requisito 5 — la operación DELETE. Se verifica que se
	// borre el recurso correcto (/coleccion/:id) y que la función retorne la
	// colección actualizada que devuelve el GET posterior.
	test('hace DELETE a /coleccion/:id y retorna la colección actualizada', async () => {
		fetchMock
			.mockResolvedValueOnce({ok: true, json: async () => ({})})
			.mockResolvedValueOnce({ok: true, json: async () => []})

		const resultado = await quitarDeColeccion('99')

		expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/coleccion/99`, {method: 'DELETE'})
		expect(resultado).toEqual([])
	})
})

describe('guardarResena', () => {
	// Complementario del requisito 5 — la operación PATCH. PATCH (y no PUT) porque
	// solo se actualiza el campo resena del ítem, no el recurso completo.
	test('hace PATCH a /coleccion/:id con la reseña en el body', async () => {
		const resenaMock = {texto: 'Obra maestra', puntaje: 5}
		const respuestaMock = {...albumMock, resena: resenaMock}

		fetchMock.mockResolvedValueOnce({ok: true, json: async () => respuestaMock})

		const resultado = await guardarResena('99', resenaMock)

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

	// Camino de error: si el servidor responde con !ok, la función debe retornar
	// null en lugar de propagar una excepción (las páginas usan ese null para
	// mostrar un mensaje de error sin romper el render).
	test('retorna null si el servidor responde con error', async () => {
		fetchMock.mockResolvedValueOnce({ok: false, json: async () => null})

		const resultado = await guardarResena('99', {texto: 'x', puntaje: 1})

		expect(resultado).toBeNull()
	})
})
