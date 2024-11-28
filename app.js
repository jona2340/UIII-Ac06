let pagina = 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Eventos de los botones
btnSiguiente.addEventListener('click', () => {
    if (pagina<1000) {
        pagina+=1;
        cargarPeliculas(); // Recargar las películas con la nueva página
    }

});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina-=1; // Reducir la página solo si es mayor a 1
        cargarPeliculas();
    }
});

// Función para cargar películas
const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=665ce2ad1dfeec4409196e3d39bc705d&language=es-MX&page=${pagina}`);
        console.log(respuesta);
        //si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log(datos);

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>`;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            console.log('La película no existe');
        } else {
            console.log('Hubo un error desconocido');
        }

    } catch (error) {
        console.log('Error capturado:', error);
    }
};

// Cargar las películas iniciales
cargarPeliculas();
