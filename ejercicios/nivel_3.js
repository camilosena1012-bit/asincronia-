//1. Versión con Callbacks

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

function obtenerVentas(callback) {
  setTimeout(() => {
    callback(null, ventas);
  }, 500);
}

function obtenerArticulo(idarticulo, callback) {
  setTimeout(() => {
    const articulo = articulos.find(a => a.idarticulo === idarticulo);
    if (!articulo) {
      callback(`El artículo ${idarticulo} no existe`);
    } else {
      callback(null, articulo);
    }
  }, 300);
}

function generarReporteCallbacks() {
  obtenerVentas((err, ventasData) => {
    if (err) return console.error(err);

    const resumen = ventasData.reduce((acc, venta) => {
      acc[venta.idarticulo] = (acc[venta.idarticulo] || 0) + venta.cantidad;
      return acc;
    }, {});

    const filtradosOrdenados = Object.entries(resumen)
      .map(([idarticulo, total]) => ({ idarticulo: Number(idarticulo), total }))
      .filter(item => item.total > 3)
      .sort((a, b) => b.total - a.total);

    let procesados = 0;
    const resultados = [];

    if (filtradosOrdenados.length === 0) return;

    filtradosOrdenados.forEach((item, index) => {
      obtenerArticulo(item.idarticulo, (errArt, articulo) => {
        if (errArt) return console.error(errArt);
        resultados[index] = { ...articulo, total: item.total };
        procesados++;

        if (procesados === filtradosOrdenados.length) {
          resultados.forEach(res => {
            console.log(`${res.nombre} (id=${res.idarticulo}) vendió ${res.total} unidades`);
          });
        }
      });
    });
  });
}

//Versión con Promesas 

/* function obtenerVentasPromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ventas), 500);
  });
}

function obtenerArticuloPromise(idarticulo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const articulo = articulos.find(a => a.idarticulo === idarticulo);
      if (!articulo) {
        reject(new Error(`El artículo ${idarticulo} no existe`));
      } else {
        resolve(articulo);
      }
    }, 300);
  });
}

function generarReportePromesas() {
  obtenerVentasPromise()
    .then(ventasData => {
      const resumen = ventasData.reduce((acc, venta) => {
        acc[venta.idarticulo] = (acc[venta.idarticulo] || 0) + venta.cantidad;
        return acc;
      }, {});

      const filtradosOrdenados = Object.entries(resumen)
        .map(([idarticulo, total]) => ({ idarticulo: Number(idarticulo), total }))
        .filter(item => item.total > 3)
        .sort((a, b) => b.total - a.total);

      const promesasArticulos = filtradosOrdenados.map(item =>
        obtenerArticuloPromise(item.idarticulo).then(articulo => ({
          ...articulo,
          total: item.total
        }))
      );

      return Promise.all(promesasArticulos);
    })
    .then(resultados => {
      resultados.forEach(res => {
        console.log(`${res.nombre} (id=${res.idarticulo}) vendió ${res.total} unidades`);
      });
    })
    .catch(error => {
      console.error(error.message);
    });
} */

//Versión con async/await y try/catch

/* async function generarReporteAsync() {
  try {
    const ventasData = await obtenerVentasPromise();

    const resumen = ventasData.reduce((acc, venta) => {
      acc[venta.idarticulo] = (acc[venta.idarticulo] || 0) + venta.cantidad;
      return acc;
    }, {});

    const filtradosOrdenados = Object.entries(resumen)
      .map(([idarticulo, total]) => ({ idarticulo: Number(idarticulo), total }))
      .filter(item => item.total > 3)
      .sort((a, b) => b.total - a.total);

    const promesasArticulos = filtradosOrdenados.map(async (item) => {
      const articulo = await obtenerArticuloPromise(item.idarticulo);
      return {
        ...articulo,
        total: item.total
      };
    });

    const resultados = await Promise.all(promesasArticulos);

    resultados.forEach(res => {
      console.log(`${res.nombre} (id=${res.idarticulo}) vendió ${res.total} unidades`);
    });

  } catch (error) {
    console.error(error.message);
  }
} */

// Prueba de Error con Promise.allSettled

/* const ventasConError = [
  ...ventas,
  { id: 11, idarticulo: 105, cantidad: 6, fecha: '2024-08-06' }
];

async function generarReporteConSettled() {
  try {
    const ventasData = ventasConError;

    const resumen = ventasData.reduce((acc, venta) => {
      acc[venta.idarticulo] = (acc[venta.idarticulo] || 0) + venta.cantidad;
      return acc;
    }, {});

    const filtradosOrdenados = Object.entries(resumen)
      .map(([idarticulo, total]) => ({ idarticulo: Number(idarticulo), total }))
      .filter(item => item.total > 3)
      .sort((a, b) => b.total - a.total);

    const promesasArticulos = filtradosOrdenados.map(async (item) => {
      const articulo = await obtenerArticuloPromise(item.idarticulo);
      return {
        ...articulo,
        total: item.total
      };
    });

    const resultadosSettled = await Promise.allSettled(promesasArticulos);

    resultadosSettled.forEach((resultado, index) => {
      if (resultado.status === 'fulfilled') {
        const res = resultado.value;
        console.log(`${res.nombre} (id=${res.idarticulo}) vendió ${res.total} unidades`);
      } else {
        const idFallido = filtradosOrdenados[index].idarticulo;
        console.log(`No se encontró el artículo ${idFallido}`);
      }
    });

  } catch (error) {
    console.error(error.message);
  }
} */