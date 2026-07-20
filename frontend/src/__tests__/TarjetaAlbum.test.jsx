// Tests de TarjetaAlbum: el componente de presentación que muestra un álbum
// (portada, nombre, artista) y un botón de acción según la variante.
// No necesita mocks de módulos: TarjetaAlbum no llama a la API por sí mismo,
// recibe todo por props, así que alcanza con un jest.fn() como callback.
import {fireEvent, render, screen} from '@testing-library/react'
import TarjetaAlbum from '@components/TarjetaAlbum'

const albumMock = {
	id: '1',
	nombre: 'Dark Side of the Moon',
	artista: 'Pink Floyd',
	imagen: '/albums/dark-side.jpg',
}

describe('TarjetaAlbum', () => {
	// Requisito 1 de la consigna — que un componente renderice el texto esperado.
	// Se consulta por rol semántico (heading nivel 3) en vez de por selector CSS:
	// así el test también verifica que el nombre esté en un <h3> real.
	test('renderiza el nombre y el artista del álbum', () => {
		render(<TarjetaAlbum album={albumMock} variante="coleccion"/>)

		expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Dark Side of the Moon')
		expect(screen.getByText('Pink Floyd')).toBeInTheDocument()
	})

	// Requisito 3 de la consigna — que un botón ejecute la acción correcta al hacer click.
	// jest.fn() registra sus llamadas; getByRole('button', {name}) localiza el botón
	// por su aria-label, verificando de paso que el label accesible es el correcto.
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
