const ventas = [
  { id: 1, idarticulo: 101, cantidad: 2, fecha: '2024-08-01' },
  { id: 2, idarticulo: 102, cantidad: 1, fecha: '2024-08-01' },
  { id: 3, idarticulo: 103, cantidad: 3, fecha: '2024-08-02' },
  { id: 4, idarticulo: 101, cantidad: 4, fecha: '2024-08-02' },
  { id: 5, idarticulo: 101, cantidad: 1, fecha: '2024-08-03' },
  { id: 6, idarticulo: 104, cantidad: 1, fecha: '2024-08-03' },
  { id: 7, idarticulo: 102, cantidad: 7, fecha: '2024-08-04' },
  { id: 8, idarticulo: 101, cantidad: 1, fecha: '2024-08-04' },
  { id: 9, idarticulo: 102, cantidad: 1, fecha: '2024-08-05' },
  { id: 10, idarticulo: 103, cantidad: 2, fecha: '2024-08-05' },
];

const articulos = [
  { idarticulo: 101, nombre: 'Artículo A' },
  { idarticulo: 102, nombre: 'Artículo B' },
  { idarticulo: 103, nombre: 'Artículo C' },
  { idarticulo: 104, nombre: 'Artículo D' },
];

function procesarTopVentas(listaVentas) {
  const agrupado = listaVentas.reduce((acc, v) => {
    acc[v.idarticulo] = (acc[v.idarticulo] || 0) + v.cantidad;
    return acc;
  }, {});
  return Object.entries(agrupado)
    .map(([id, total]) => ({ idarticulo: Number(id), total }))
    .filter((i) => i.total > 3)
    .sort((a, b) => b.total - a.total);
}

module.exports = { ventas, articulos, procesarTopVentas };