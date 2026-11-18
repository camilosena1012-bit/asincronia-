const axios = require('axios');

async function buscarPelicula(nombrePelicula) {
  try {
    const respuesta = await axios.get(`https://api.tvmaze.com/search/shows?q=${nombrePelicula}`);
    const resultados = respuesta.data;

    if (!resultados || resultados.length === 0) {
      console.log('No se encontró la película o serie');
      return;
    }

    const obra = resultados[0].show;
    const anio = obra.premiered ? obra.premiered.split('-')[0] : 'Desconocido';
    const sinopsis = obra.summary ? obra.summary.replace(/<[^>]*>?/gm, '') : 'Sin descripción';

    console.log(`Título: ${obra.name}`);
    console.log(`Año de estreno: ${anio}`);
    console.log(`Sinopsis: ${sinopsis}`);

  } catch (error) {
    console.error('Error de red o en la petición:', error.message);
  }
}

buscarPelicula('Breaking Bad');