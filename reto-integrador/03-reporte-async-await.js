const { ventas, articulos, procesarTopVentas } = require('./datosVentas');

const obtenerVentas = () => new Promise((res) => setTimeout(() => res(ventas), 500));
const obtenerArticulo = (id) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      const art = articulos.find((a) => a.idarticulo === id);
      if (!art) return rej(new Error(`El artículo ${id} no existe`));
      res(art);
    }, 300);
  });

async function generarReporte() {
  try {
    const v = await obtenerVentas();
    const top = procesarTopVentas(v);
    const arts = await Promise.all(top.map((i) => obtenerArticulo(i.idarticulo)));

    arts.forEach((art, idx) => {
      console.log(`${art.nombre} (id=${art.idarticulo}) vendió ${top[idx].total} unidades`);
    });
  } catch (err) {
    console.log('Error en reporte:', err.message);
  }
}
generarReporte();