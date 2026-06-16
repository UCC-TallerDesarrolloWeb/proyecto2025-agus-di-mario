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
		jest.clearAllMocks()
		obtenerResena.mockResolvedValue(null)
	})

	// Test 2 — Que una validación muestre mensaje de error ante input inválido
	test('muestra mensaje de error al intentar guardar sin texto ni puntaje', async () => {
		render(<SeccionResena album={albumMock}/>)

		// Esperar que el useEffect async resuelva antes de interactuar
		await waitFor(() => {
			expect(screen.getByRole('button', {name: /guardar/i})).toBeInTheDocument()
		})

		fireEvent.click(screen.getByRole('button', {name: /guardar/i}))

		expect(screen.getByRole('alert')).toHaveTextContent(
			'Completá la reseña y elegí un puntaje.'
		)
	})
})
