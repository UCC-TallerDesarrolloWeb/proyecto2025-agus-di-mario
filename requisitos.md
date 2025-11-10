# proyecto2025

Estructura de Proyecto Taller de Desarrollo Web - 2025

## Requisitos del Primer Parcial

### Sobre el Repositorio

- [ ] El proyecto debe estar subido al repositorio adecuado "Proyecto2025-ApellidoAlumno"
- [ ] Modificar el Readme.MD y colocar información del proyecto/página (mínimamente: título del proyecto, autores con
  nombre y apellido, link de gh-pages, contenido de la página, listado de tecnologías usadas, etc)
- [ ] En el **readme.md** se debe emplear Markdown y aplicar negrita, titulo de orden 1, 2 y 3, link, items, tabla,
  index a cada sección
- [ ] El repositorio no debe contener archivos innecesarios (no debe contener .idea o .vsc ni .DS_Store, emplear *
  *.gitignore**)

### Sobre el Proyecto General

- [ ] La página principal debe llamarse index
- [ ] La estructura del proyecto debe ser adecuada
  - Crear una carpeta para las imágenes
  - Carpeta para los sketch
  - Carpeta para los mockups/Wireframes
  En una segunda etapa, al emplear **React**:
  - Carpeta de Componentes
  - Carpeta de Pages
  - Carpeta de Styles
- [ ] Identar correctamente el código
- [ ] No debe haber errores presentes (realizar *Code* > *Inspect Code* para verificar que no haya errores)
- [ ] Se debe emplear algún favicon
- [ ] Emplear fuente INTER
- [ ] Debe haber navegación entre todas las páginas
- [ ] No debe haber errores de ortografía en el contenido visual

### Sobre el HTML

- [ ] Todas las etiquetas deben estar en minúscula
- [ ] Poner comillas a todos los atributos
- [ ] Title debe contener el título de la página
- [ ] En el ```<head></head>``` incluir las etiquetas ```<meta>``` detallando: autor, descripcion y palabras clave
- [ ] Emplear al menos 3 etiquetas semánticas diferentes (header, nav, aside, main, section, article, footer)
- [ ] Emplear ```<header></header>```. En el contenido de la cabecera debe haber un título ```<h1></h1>```, puede tener
  color de fondo, algún logotipo, etc.
- [ ] Debe haber por lo menos una etiqueta ```<img>``` en la página.
- [ ] La estructura de la página debe estar definida con ```<div></div>```
- [ ] Debe contener al menos 3 elementos de tipo ```<input>``` o ```<select>``` ó ```<button>``` que le permitan al
  usuario ingresar valores para poder realizar un cálculo de un ejercicio.
- [ ] Emplear el atributo **placeholder** mínimamente en 1 input
- [ ] Emplear el atributo **size** para que el tamaño de los inputs sea prolijo
- [ ] Emplear el atributo **maxlength** para que el usurario no pueda ingresar valores "muy grandes"
- [ ] No espaciar con excesivos ```<br>```. Utilizar márgenes, paddings, etc.
- [ ] La anidación de etiquetas HTML debe ser correcta.
- [ ] No utilizar etiquetas deprecadas.
- [ ] Todas las etiquetas deben estar correctamente cerradas
- [ ] Los ids de los elementos deben ser unívocos

### Sobre las imágenes

- [ ] Debe contener por lo menos una etiqueta ```<img>``` en la página.
- [ ] Todas las imágenes deben ser incluidas en el repositorio dentro de una carpeta llamada **imagenes** (salvo que
  sean demasiado pesadas. En ese caso, se puede emplear un servidor externo).
- [ ] No se deben subir videos en el repositorio (excepto que sean MUY livianos).
- [ ] Toda imagen debe tener su atributo alt
- [ ] Las imágenes deben poseer un nombre representativo

### Sobre el CSS

- [ ] El estilo de los elementos debe establecerse en un archivo CSS (prohibido poner el atributo style a los elementos
  o emplear estilos incrustados).
- [ ] El CSS debe contar mínimo con un tipo de cada forma (por Tag, por ID y por clase).
- [ ] Se debe emplear pseudoclase
- [ ] No emplear !important
- [ ] El diseño de la página debe ser consistente
- [ ] En la primera etapa debe existir un único archivo CSS (se debe evitar código duplicado. Se debe aplicar
  re-utilización de código/estilos)

### Sobre Accesibilidad:

- [ ] Toda imagen debe tener su etiqueta alt
- [ ] Todo ```<input>``` o ```<select>``` debe tener su ```<label>```
- [ ] Los labels deben contener el atributo **for** (el for debe contener el id del input al cual se referencia)
- [ ] Si hay una tabla en la página, debe contener ```<caption></caption>```

### Sobre la funcionalidad JavaScript

Se debe agregar funcionalidad Js a la página HTML+CSS desarrollada

- [ ] Una función que compruebe si los valores ingresados son correctos, y si no lo son, que le indique al usuario por
  un alert o dialog, y que blanquee el contenido del campo.
- [ ] Una función que calcule/muestre algo en base a los valores ingresados por el usuario en los inputs.
- [ ] El código Js debe estar en un archivo externo
- [ ] Se debe emplear var, let o const según corresponda para mayor eficiencia
- [ ] No deben existir funciones innecesarias que no se llamen en ninguna sección del código
- [ ] Las funciones deben estar escritas cómo **función flecha**
- [ ] No debe haber errores JavaScript presentes (F12 > Consola)
- [ ] El funcionamiento de la página debe ser consistente.

### Sobre la documentación

- [ ] TODAS las funciones javaScript deben estar comentadas
  adecuadamente. [JsDoc](https://jsdoc.app/about-getting-started.html)
   ```/**
     * Descripción de que hace la función
     * @method Nombre de la función
     * @param {string} ParámetroA - Explicación de que valor almacena ParámetroA
     * @param {number} ParámetroB - Explicación de que valor almacena ParámetroB
     * @return Valor que retorna
     */
   ```

## Requisitos del Segundo Parcial

### Sobre React

- [ ] Se debe emplear **Vite** para instalar **React**
- [ ] Se debe emplear **Hooks**, useState, useEffect, useContext, useNavigate
- [ ] Se debe emplear **react-router-dom** para el enrutamiento a otras páginas
- [ ] Se debe emplear **outlet** para que un componente principal renderice componentes de rutas hijas.
- [ ] La estructura del proyecto (carpetas) debe ser el correcto: components, pages, styles
- [ ] Los **imports** deben ser usando con **alias**
- [ ] Validaciones en tiempo real con onChange + mensajes de error accesibles.
- [ ] Crear al menos un componente genérico (ej: Button, Card, Input) y reutilizarlo en varias páginas.
- [ ] Guardar algún dato en localStorage (ej: preferencias de tema o un carrito de compras).
- [ ] En caso de no contar con un servicio que nos provea la información necesaria, la misma debe ser leída en formato
  tipo Json local y renderizar listas dinámicas. Ejemplo:

````javascript
const activities = [
	{
		nombre: "taekwondo",
		descripcion: "Arte marcial coreana",
		horarios: [
			{dia: 2, "hora-inicio": "18:30", "hora-fin": "20:00"},
			{dia: 4, "hora-inicio": "18:30", "hora-fin": "20:00"}
		]
	},
	{
		nombre: "zumba",
		descripcion: "ritmos latinos",
		horarios: [
			{dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30"},
			{dia: 3, "hora-inicio": "19:30", "hora-fin": "20:30"}
		]
	}
];
````