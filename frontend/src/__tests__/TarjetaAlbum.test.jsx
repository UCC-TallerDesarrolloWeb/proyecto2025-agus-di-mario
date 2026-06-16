import {fireEvent, render, screen} from '@testing-library/react'
import TarjetaAlbum from '@components/TarjetaAlbum'

const albumMock = {
	id: '1',
	nombre: 'Dark Side of the Moon',
	artista: 'Pink Floyd',
	imagen: '/albums/dark-side.jpg',
}

describe('TarjetaAlbum', () => {
	// Test 1 — Que un componente renderice texto esperado
	test('renderiza el nombre y el artista del álbum', () => {
		render(<TarjetaAlbum album={albumMock} variante="coleccion"/>)

		expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Dark Side of the Moon')
		expect(screen.getByText('Pink Floyd')).toBeInTheDocument()
	})

	// Test 3 — Que un botón ejecute la acción correcta al hacer click
	test('llama a onColeccionar con el álbum al hacer click en la estrella', () => {
		const onColeccionar = jest.fn()

		render(
			<TarjetaAlbum
				album={albumMock}
				variante="catalogo"
				esFavorito={false}
				onColeccionar={onColeccionar}
			/>
		)

		fireEvent.click(screen.getByRole('button', {name: 'Agregar a mi colección'}))

		expect(onColeccionar).toHaveBeenCalledTimes(1)
		expect(onColeccionar).toHaveBeenCalledWith(albumMock)
	})
})
