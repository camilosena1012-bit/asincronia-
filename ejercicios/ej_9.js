const axios = require('axios');

async function buscarNoticias(palabraClave) {
  try {
    const respuesta = await axios.get(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(palabraClave)}&tags=story`);
    const articulos = respuesta.data.hits;

    if (!articulos || articulos.length === 0) {
      console.log(`No se encontraron noticias para: ${palabraClave}`);
      return { totalResults: 0 };
    }

    console.log(`\n--- Noticias sobre: ${palabraClave} ---`);
    articulos.slice(0, 5).forEach((noticia, index) => {
      console.log(`${index + 1}. Título: ${noticia.title}`);
      console.log(`   Autor: ${noticia.author}`);
      console.log(`   Fecha: ${noticia.created_at}\n`);
    });

    return { totalResults: respuesta.data.nbHits };

  } catch (error) {
    console.error(`Error al buscar noticias para ${palabraClave}:`, error.message);
    return { totalResults: 0 };
  }
}

async function compararDosPalabras(palabra1, palabra2) {
  const [resultado1, resultado2] = await Promise.all([
    buscarNoticias(palabra1),
    buscarNoticias(palabra2)
  ]);

  console.log(`\n--- Resultado del Reto ---`);
  console.log(`"${palabra1}" obtuvo ${resultado1.totalResults} resultados totales.`);
  console.log(`"${palabra2}" obtuvo ${resultado2.totalResults} resultados totales.`);

  if (resultado1.totalResults > resultado2.totalResults) {
    console.log(`La palabra "${palabra1}" tiene más resultados.`);
  } else if (resultado2.totalResults > resultado1.totalResults) {
    console.log(`La palabra "${palabra2}" tiene más resultados.`);
  } else {
    console.log('Ambas palabras tienen la misma cantidad de resultados.');
  }
}

compararDosPalabras('tecnología', 'deportes');