import {useEffect, useState} from 'react'

/**
 * Hook para cargar datos asíncronos con limpieza de efecto (evita
 * actualizar estado en componentes desmontados).
 * @param {Function} fn - Función async que retorna los datos a cargar.
 * @param {Array} deps - Dependencias del efecto (igual que en useEffect).
 * @returns {[any, Function]} Tuple con los datos cargados y su setter.
 */
export function useAsync(fn, deps) {
	const [datos, setDatos] = useState([])
	useEffect(() => {
		let montado = true
		;(async () => {
			const resultado = await fn()
			if (montado) setDatos(resultado)
		})()
		return () => {
			montado = false
		}
	}, deps) // eslint-disable-line react-hooks/exhaustive-deps
	return [datos, setDatos]
}
