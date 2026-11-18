require('dotenv').config();
const axios = require('axios');

async function buscarPelicula(nombre) {
  try {
    const res = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: { api_key: process.env.TMDB_API_KEY, query: nombre, language: 'es-MX' },
    });
    const pelicula = res.data.results[0];
    if (!pelicula) return console.log('No se encontró la película');
    console.log(`Película: ${pelicula.title} (${pelicula.release_date})`);
  } catch (err) {
    console.log('Error TMDB:', err.message);
  }
}
buscarPelicula('Avatar');