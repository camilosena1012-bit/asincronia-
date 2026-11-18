const { ventas, articulos, procesarTopVentas } = require('./datosVentas');
const ventasConError = [...ventas, { id: 11, idarticulo: 105, cantidad: 6, fecha: '2024-08-06' }];

const obtenerVentas = () => new Promise((res) => setTimeout(() => res(ventasConError), 500));
const obtenerArticulo = (id) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      const art = articulos.find((a) => a.idarticulo === id);
      if (!art) return rej(new Error(`El artículo ${id} no existe`));
      res(art);
    }, 300);
  });

async function reporteTolerante() {
  const v = await obtenerVentas();
  const top = procesarTopVentas(v);
  const resultados = await Promise.allSettled(top.map((i) => obtenerArticulo(i.idarticulo)));

  resultados.forEach((res, idx) => {
    const item = top[idx];
    if (res.status === 'fulfilled') {
      console.log(`${res.value.name || res.value.nombre} (id=${item.idarticulo}) vendió ${item.total} unidades`);
    } else {
      console.log(`No se encontró el artículo ${item.idarticulo}`);
    }
  });
}
reporteTolerante();