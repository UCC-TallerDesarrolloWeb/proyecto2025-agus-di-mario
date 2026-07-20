// Tests de SeccionResena: el formulario de reseña con puntaje de cada álbum
// de la colección. Se mockea @api/albumes porque el componente llama a
// obtenerResena() al montar; sin el mock intentaría un fetch real contra
// json-server, que no existe en el entorno de test (jsdom).
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import SeccionResena from '@components/SeccionResena'
import {obtenerResena} from '@api/albumes'

jest.mock('@api/albumes', () => ({
	obtenerResena: jest.fn(),
	guardarResena: jest.fn(),
}))

const albumMock = {id: '1'}

describe('SeccionResena', () => {
	beforeEach(() => {
		// clearAllMocks limpia el registro de llamadas pero NO las implementaciones,
		// por eso hay que volver a declarar el valor resuelto en cada test.
		jest.clearAllMocks()
		// null = "este álbum todavía no tiene reseña" → el componente arranca en modo edición.
		obtenerResena.mockResolvedValue(null)
	})

	// Requisito 2 de la consigna — que una validación muestre un mensaje de error
	// ante input inválido. Se hace click en "Guardar" sin completar texto ni puntaje
	// y se espera el mensaje de error con role="alert" (la aserción verifica a la vez
	// el texto y la semántica ARIA correcta para errores).
	test('muestra mensaje de error al intentar guardar sin texto ni puntaje', async () => {
		render(<SeccionResena album={albumMock}/>)

		// Esperar que el useEffect async (obtenerResena) resuelva antes de interactuar:
		// recién ahí el formulario en modo edición está en pantalla.
		await waitFor(() => {
			expect(screen.getByRole('button', {name: /guardar/i})).toBeInTheDocument()
		})

		fireEvent.click(screen.getByRole('button', {name: /guardar/i}))

		expect(screen.getByRole('alert')).toHaveTextContent(
			'Completá la reseña y elegí un puntaje.'
		)
	})
})
